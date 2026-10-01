<script setup>
import { computed, onMounted, ref } from 'vue';
import { useHead } from '@vueuse/head';
import Link from '@/components/Link.vue';
import api from '@/lib/api.js';

const movies = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const error = ref('');
useHead({ title: 'Daftar Film | CinemaKu' });

const filteredMovies = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('id');
  if (!query) return movies.value;
  return movies.value.filter((movie) => movie.title?.toLocaleLowerCase('id').includes(query));
});

async function loadMovies() {
  loading.value = true;
  error.value = '';
  try {
    const response = await api.get('/movies');
    movies.value = response.data;
  } catch (cause) {
    error.value = cause.response?.data?.message || cause.message || 'Tidak dapat terhubung ke backend.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadMovies);
</script>

<template>
  <main class="min-h-screen bg-neutral-950 px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
    <section class="mx-auto max-w-7xl">
      <div class="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.18em] bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">CinemaKu</p>
          <h1 class="mt-2 text-3xl font-bold">Movies</h1>
        </div>
        <input
          v-model="searchQuery"
          class="w-full rounded border border-white/15 bg-neutral-900 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-red-500 sm:max-w-sm"
          type="search"
          placeholder="Cari judul film"
          aria-label="Cari judul film"
        />
      </div>

      <p v-if="loading" class="py-12 text-center text-neutral-400" role="status">Loading movies...</p>
      <div v-else-if="error" class="py-12 text-center text-red-300" role="alert">
        <p>{{ error }}</p>
        <button class="mt-3 underline underline-offset-4" type="button" @click="loadMovies">Try again</button>
      </div>
      <div v-else-if="filteredMovies.length" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
        <Link
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="group min-w-0"
          :href="`/content-detail?id=${encodeURIComponent(movie.id)}`"
        >
          <div class="aspect-[2/3] overflow-hidden rounded bg-neutral-900">
            <img v-if="movie.poster_url" class="h-full w-full object-cover transition group-hover:scale-[1.03]" :src="movie.poster_url" :alt="`Poster ${movie.title}`" loading="lazy" />
            <div v-else class="flex h-full items-end bg-gradient-to-br from-red-950 to-neutral-900 p-4">
              <span class="font-bold">{{ movie.title }}</span>
            </div>
          </div>
          <h2 class="mt-3 truncate font-semibold group-hover:text-red-300">{{ movie.title }}</h2>
          <p class="mt-1 text-sm text-neutral-400">{{ movie.director || 'Film pilihan' }}</p>
        </Link>
      </div>
      <p v-else class="py-12 text-center text-neutral-400">
        {{ searchQuery ? 'Film tidak ditemukan.' : 'Belum ada film di katalog.' }}
      </p>
    </section>
  </main>
</template>
