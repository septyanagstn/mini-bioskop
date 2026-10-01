<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import api from '@/lib/api.js';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const movie = ref(null);
const showtime = ref(null);
const loading = ref(false);
const error = ref('');
const selectedSeats = ref([]);
const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5'];
const availableSeats = computed(() => showtime.value?.available_seats ?? []);
const totalPrice = computed(() => (showtime.value?.price ?? 0) * selectedSeats.value.length);

function toggleSeat(seat) {
  if (!availableSeats.value.includes(seat)) return;

  selectedSeats.value = selectedSeats.value.includes(seat)
    ? selectedSeats.value.filter((selectedSeat) => selectedSeat !== seat)
    : [...selectedSeats.value, seat];
}

async function loadShowtimeDetail() {
  const movieId = route.query.movieId;
  const showtimeId = route.query.showtimeId;

  if (typeof movieId !== 'string' || !movieId || typeof showtimeId !== 'string' || !showtimeId) {
    await router.replace({ name: '404' });
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const [movieResponse, showtimeResponse] = await Promise.all([
      api.get(`/movies/${encodeURIComponent(movieId)}`),
      api.get('/showtimes/detail', { params: { movieId, showtimeId } }),
    ]);
    movie.value = movieResponse.data;
    showtime.value = showtimeResponse.data;
  } catch (cause) {
    if (cause.response?.status === 404) {
      await router.replace({ name: '404' });
      return;
    }
    error.value = cause.response?.data?.message || cause.message || 'Failed to load showtime details.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadShowtimeDetail);
</script>

<template>
  <SiteHeader v-model:search-query="searchQuery" />
  <main class="mx-auto grid min-h-[70vh] max-w-7xl grid-cols-1 gap-8 px-4 pb-16 pt-28 text-white sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 lg:px-8">
    <p v-if="loading" class="py-12 text-center text-gray-400 lg:col-span-2" role="status">Loading order details...</p>
    <p v-else-if="error" class="py-12 text-center text-red-300 lg:col-span-2" role="alert">{{ error }}</p>
    <template v-else-if="showtime && movie">
      <section class="min-w-0">
        <p class="text-xs font-bold uppercase tracking-[0.18em] bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Seat Layout</p>
        <h1 class="mt-2 text-3xl font-bold">Choose your seats</h1>
        <p class="mt-2 text-sm text-gray-400">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(showtime.price) }} / seat</p>

        <div class="mt-8 rounded border border-white/10 bg-neutral-900/60 px-4 py-8 sm:px-8">
          <div class="mx-auto mb-10 h-1.5 w-4/5 max-w-md rounded-full bg-neutral-600 shadow-[0_8px_24px_rgba(255,255,255,0.12)]"></div>
          <div class="mx-auto grid w-full max-w-md grid-cols-5 gap-3 sm:gap-4">
            <button
              v-for="seat in seats"
              :key="seat"
              class="flex aspect-square items-center justify-center border text-sm font-semibold transition-colors disabled:cursor-not-allowed"
              :class="!availableSeats.includes(seat)
                ? 'border-red-800/60 bg-red-950/40 text-red-300'
                : selectedSeats.includes(seat)
                  ? 'border-amber-400 bg-amber-500 text-neutral-950'
                  : 'border-emerald-700/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/70'"
              :disabled="!availableSeats.includes(seat)"
              :aria-pressed="selectedSeats.includes(seat)"
              :aria-label="`Seat ${seat}: ${!availableSeats.includes(seat) ? 'occupied' : selectedSeats.includes(seat) ? 'selected' : 'available'}`"
              type="button"
              @click="toggleSeat(seat)"
            >
              {{ seat }}
            </button>
          </div>
          <div class="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-300">
            <span class="inline-flex items-center gap-2"><span class="h-3 w-3 border border-emerald-700 bg-emerald-950"></span>Available</span>
            <span class="inline-flex items-center gap-2"><span class="h-3 w-3 border border-amber-400 bg-amber-500"></span>Selected</span>
            <span class="inline-flex items-center gap-2"><span class="h-3 w-3 border border-red-800 bg-red-950"></span>Occupied</span>
          </div>
        </div>
      </section>

      <aside class="h-fit border border-white/10 bg-neutral-900/60 p-5 sm:p-6 lg:mt-1">
        <p class="text-xs font-bold uppercase tracking-[0.16em] bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Order details</p>
        <h2 class="mt-3 text-xl font-bold">{{ movie.title }}</h2>
        <p class="mt-2 text-sm text-gray-400">{{ movie.director || 'Movie screening' }}</p>
        <div class="my-5 border-t border-white/10"></div>
        <dl class="space-y-3 text-sm">
          <div class="flex justify-between gap-4"><dt class="text-gray-400">Date</dt><dd class="text-right">{{ showtime.show_date?.slice(0, 10) }}</dd></div>
          <div class="flex justify-between gap-4"><dt class="text-gray-400">Time</dt><dd>{{ showtime.start_time }}</dd></div>
          <div class="flex justify-between gap-4"><dt class="text-gray-400">Auditorium</dt><dd>{{ showtime.audi }}</dd></div>
          <div class="flex justify-between gap-4"><dt class="text-gray-400">Seats</dt><dd class="text-right">{{ selectedSeats.length ? selectedSeats.join(', ') : 'None selected' }}</dd></div>
          <div class="flex justify-between gap-4"><dt class="text-gray-400">Tickets</dt><dd>{{ selectedSeats.length }}</dd></div>
        </dl>
        <div class="my-5 border-t border-white/10"></div>
        <div class="flex items-center justify-between gap-4">
          <span class="font-semibold">Total</span>
          <span class="text-lg font-bold text-red-300">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalPrice) }}</span>
        </div>
        <div class="mt-10 flex justify-center">
            <RouterLink
              v-if="selectedSeats.length"
              class="inline-block rounded-full bg-white px-8 py-3 font-bold text-purple-900 shadow-lg transition hover:bg-gray-100 hover:scale-105"
              :to="{
                name: 'payment-order',
                query: {
                  movieId: route.query.movieId,
                  showtimeId: route.query.showtimeId,
                  seat_numbers: selectedSeats.join(','),
                  total_price: String(totalPrice),
                },
              }"
            >
              Order
            </RouterLink>
            <button v-else class="inline-block cursor-not-allowed rounded-full bg-neutral-700 px-8 py-3 font-bold text-neutral-400" type="button" disabled>Select seats to continue</button>
        </div>
      </aside>
    </template>
  </main>
  <SiteFooter />
</template>
