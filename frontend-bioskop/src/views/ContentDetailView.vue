<script setup>
import { onMounted, ref, watch } from 'vue';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Image from '@/components/Image.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import api from '@/lib/api.js';

useHead({
  title: 'CinemaKu',
  meta: [
    {
      name: 'description',
      content: 'Choose your favorite movie',
    },
  ],
});

const route = useRoute();
const movie = ref(null);
const searchQuery = ref('');
const loadingMovie = ref(false);
const movieLoadError = ref('');
const showtimes = ref([]);
const showtimeDate = ref(new Date().toLocaleDateString('en-CA'));
const loadingShowtimes = ref(false);
const showtimeLoadError = ref('');

async function loadShowtimes() {
  const movieId = route.query.id;
  if (typeof movieId !== 'string' || !movieId) return;

  loadingShowtimes.value = true;
  showtimeLoadError.value = '';
  try {
    const response = await api.get('/showtimes', {
      params: { movieId, date: showtimeDate.value },
    });
    showtimes.value = response.data;
  } catch (error) {
    showtimeLoadError.value = error.response?.data?.message || error.message || 'Failed to load showtimes.';
  } finally {
    loadingShowtimes.value = false;
  }
}

async function loadMoviesDetail() {
  const movieId = route.query.id;
  if (typeof movieId !== 'string' || !movieId) {
    movieLoadError.value = 'Movie ID is missing.';
    return;
  }

  loadingMovie.value = true;
  movieLoadError.value = '';
  try {
    const response = await api.get(`/movies/${encodeURIComponent(movieId)}`);
    movie.value = response.data;
  } catch (error) {
    movieLoadError.value = error.response?.data?.message || error.message || 'Backend connection failed.';
  } finally {
    loadingMovie.value = false;
  }
}

onMounted(
  loadMoviesDetail
);

watch(
  showtimeDate, 
  loadShowtimes
);

onMounted(
  loadShowtimes
);

</script>

<template>
  <SiteHeader v-model:search-query="searchQuery" />
<!-- Hero Backdrop -->
<div class="relative min-h-[70vh] w-full">
  <div class="absolute inset-0">
    <Image variant="cover" class="w-full h-full object-cover" :src="movie?.poster_url || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1600&q=80'" :alt="movie ? `Poster ${movie.title}` : 'Movie backdrop'" />
    <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent"></div>
  </div>
  <div class="relative min-h-[70vh] max-w-7xl mx-auto px-4 pt-24 pb-12 sm:px-6 lg:px-8 flex items-end">
    <div class="max-w-3xl">
      <p v-if="loadingMovie" class="mb-3 text-sm text-gray-300" role="status">Loading movie details...</p>
      <p v-else-if="movieLoadError" class="mb-3 text-sm text-red-300" role="alert">{{ movieLoadError }}</p>
      <h1 class="text-5xl md:text-6xl font-extrabold mb-4">{{ movie?.title || 'Movie details' }}</h1>
      <p class="text-lg text-gray-300 mb-8 leading-relaxed">
        {{ movie?.synopsis || 'Synopsis is not available.' }}
      </p>
      <div class="mt-12">
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-gray-400"> Director </dt>
            <dd class="text-white">{{ movie?.director || 'Not available' }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-400"> Starring </dt>
            <dd class="text-white"> {{ movie?.starring }} </dd>
          </div>
        </dl> 
      </div>
    </div>
  </div>
</div>
<!-- Content -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
    <!-- Main Info -->
    <div class="lg:col-span-3">
      <!-- Showtimes -->
      <div class="mt-12 pt-8 border-t border-neutral-800">
        <div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-xl font-bold">Showtimes</h2>
            <p class="mt-1 text-sm text-gray-400">Choose a date to see available screenings.</p>
          </div>
          <label class="text-sm text-gray-300">
            <span class="mb-1 block">Screening date</span>
            <input
              v-model="showtimeDate"
              class="border border-white/15 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-red-500 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
              type="date"
              aria-label="Screening date"
            />
          </label>
        </div>

        <p v-if="loadingShowtimes" class="py-8 text-sm text-gray-400" role="status">Loading showtimes...</p>
        <p v-else-if="showtimeLoadError" class="py-6 text-sm text-red-300" role="alert">{{ showtimeLoadError }}</p>
        <div v-else-if="showtimes.length" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link v-for="showtime in showtimes" :key="showtime.id" :href="`/view-seat?movieId=${encodeURIComponent(movie.id)}&showtimeId=${encodeURIComponent(showtime.id)}`" class="flex items-center justify-between gap-4 border border-white/10 bg-neutral-900 px-4 py-4 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors">
            <div>
              <p class="text-2xl font-bold text-white">{{ showtime.start_time }}</p>
              <p class="mt-1 text-sm text-gray-400">{{ showtime.audi }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold text-red-300">
                {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(showtime.price) }}
              </p>
              <p class="mt-1 text-sm text-green-500">{{ showtime.available_seats?.length ?? 0 }} <span class="text-gray-400">/ 10 available</span></p>
            </div>
          </Link>
        </div>
        <p v-else class="border-y border-white/10 py-8 text-sm text-gray-400">No showtimes are available for this date.</p>
      </div>
    </div>
  </div>
</div>
  <SiteFooter/>
</template>