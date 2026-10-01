<script setup>
import { computed, onMounted, ref } from 'vue';
import { useHead } from '@vueuse/head';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Image from '@/components/Image.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import api from '@/lib/api.js';
import { currentUser } from '@/lib/auth.js';

useHead({
  title: 'CinemaKu',
  meta: [
    {
      name: 'description',
      content: 'Choose your favorite movie',
    },
  ],
});

const movies = ref([]);
const searchQuery = ref('');
const loadingMovies = ref(false);
const movieLoadError = ref('');
const filteredMovies = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('id');
  if (!query) return movies.value;

  return movies.value.filter((movie) => movie.title?.toLocaleLowerCase('id').includes(query));
});

async function loadMovies() {
  loadingMovies.value = true;
  movieLoadError.value = '';
  try {
    const response = await api.get('/movies');
    movies.value = response.data;
  } catch (error) {
    movieLoadError.value = error.response?.data?.message || error.message || 'Backend connection failed.';
  } finally {
    loadingMovies.value = false;
  }
}

onMounted(
  loadMovies
);

</script>

<template>
  <SiteHeader v-model:search-query="searchQuery" />
<!-- Hero Section -->
<div class="relative h-[85vh] w-full overflow-hidden">
  <div class="absolute inset-0">
    <Image variant="cover" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1600&q=80" alt="Hero Background" />
    <div class="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent"></div>
    <div class="absolute inset-0 hero-gradient"></div>
  </div>
  <div class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
    <div class="max-w-2xl pt-20">
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
         Cinema<Text class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Ku</Text>
      </h1>
      <p class="text-lg text-gray-300 mb-8 line-clamp-3">
         Choose your favorite movie, and be Happy. 
      </p>
    </div>
  </div>
</div>
<!-- Explore Movie -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-0 mb-16" id="explore_movie">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-white"> Explore Movie </h2>
    <Link class="text-sm text-purple-400 hover:text-purple-300 font-medium" href="browse.html"> View All </Link>
  </div>
  <p v-if="loadingMovies" class="py-12 text-center text-neutral-400" role="status">Menghubungkan ke server film...</p>
  <div v-else-if="movieLoadError" class="py-12 text-center text-red-300" role="alert">
    <p>{{ movieLoadError }}</p>
    <button class="mt-3 underline underline-offset-4" type="button" @click="loadMovies">Coba lagi</button>
  </div>
  <div v-else-if="filteredMovies.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <Link
      v-for="movie in filteredMovies"
      :key="movie.id"
      class="block group poster-hover relative rounded-lg overflow-hidden aspect-poster bg-neutral-800"
      :href="`/content-detail?id=${encodeURIComponent(movie.id)}`"
    >
      <Image
        v-if="movie.poster_url"
        variant="cover"
        class="w-full h-full object-cover"
        :src="movie.poster_url"
        :alt="`Poster ${movie.title}`"
      />
      <div v-else class="flex h-full items-end bg-gradient-to-br from-red-950 to-neutral-900 p-4">
        <span class="font-bold text-white">{{ movie.title }}</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 class="text-white font-bold text-sm">{{ movie.title }}</h3>
        <p class="mt-1 text-xs text-gray-300">{{ movie.director || 'Film pilihan' }}</p>
      </div>
    </Link>
  </div>
  <p v-else class="py-12 text-center text-neutral-400">
    {{ searchQuery ? 'Film tidak ditemukan.' : 'Belum ada film di katalog.' }}
  </p>
</section>
<!-- Watch Anywhere Cancel Anytime -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" id="watch_anywhere_cancel_anytime">
  <div class="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
    <div class="relative z-10 mb-8 md:mb-0 md:w-2/3">
      <h2 class="text-3xl font-bold text-white mb-4"> Choose your movie, and get your ticket. </h2>
      <p v-if="!currentUser" class="text-purple-200 text-lg"> 
         Login today and get your ticket. Experience unlimited entertainment. 
      </p>
      <p v-else="currentUser" class="text-purple-200 text-lg"> 
         Enjoy your day and get your ticket. Experience unlimited entertainment. 
      </p>
    </div>
    <div v-if="!currentUser" class="relative z-10">
      <Link variant="inline" content-key="cta_39" class="inline-block bg-white text-purple-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg" href="login.html"> Sign In </Link>
    </div>
    <div v-else="currentUser" class="relative z-10">
      <Link variant="inline" content-key="cta_39" class="inline-block bg-white text-purple-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg" href="browse.html"> Order </Link>
    </div>
  </div>
</section>
<SiteFooter />
</template>