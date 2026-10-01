<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const movie = ref(null);
const showtime = ref(null);
const loading = ref(false);
const error = ref('');
const selectedSeats = ref([]);
const selectedPaymentMethod = ref('');
const submittingOrder = ref(false);
const submissionError = ref('');
const completedOrder = ref(null);
const pendingOrderId = ref('');
const paymentMethods = [
  { id: 'credit-card', name: 'Credit / Debit Card', description: 'Pay securely with your card' },
  { id: 'e-wallet', name: 'E-Wallet', description: 'Pay using your preferred digital wallet' },
  { id: 'bank-transfer', name: 'Bank Transfer', description: 'Pay through your banking app' },
];
const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5'];
const availableSeats = computed(() => showtime.value?.available_seats ?? []);
const totalPrice = computed(() => (showtime.value?.price ?? 0) * selectedSeats.value.length);

async function submitOrder() {
  if (!selectedPaymentMethod.value || !selectedSeats.value.length || submittingOrder.value || completedOrder.value) return;
  if (!currentUser.value?.user_id) {
    await router.replace({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }

  submittingOrder.value = true;
  submissionError.value = '';
  try {
    if (!pendingOrderId.value) {
      const orderResponse = await api.post('/orders', {
        user_id: currentUser.value.user_id,
        showtime_id: String(showtime.value.id),
        seat_numbers: selectedSeats.value,
      });
      pendingOrderId.value = orderResponse.data.id;
    }

    const paymentResponse = await api.patch(`/orders/${encodeURIComponent(pendingOrderId.value)}`);
    completedOrder.value = paymentResponse.data;
    await router.replace({ name: 'success-order' });
  } catch (cause) {
    const message = cause.response?.data?.message || cause.message || 'Failed to submit order.';
    submissionError.value = Array.isArray(message) ? message.join(', ') : message;
  } finally {
    submittingOrder.value = false;
  }
}

function toggleSeat(seat) {
  if (!availableSeats.value.includes(seat)) return;

  selectedSeats.value = selectedSeats.value.includes(seat)
    ? selectedSeats.value.filter((selectedSeat) => selectedSeat !== seat)
    : [...selectedSeats.value, seat];
}

async function loadShowtimeDetail() {
  const movieId = route.query.movieId;
  const showtimeId = route.query.showtimeId;
  const seatNumbers = typeof route.query.seat_numbers === 'string'
    ? route.query.seat_numbers.split(',').filter(Boolean)
    : [];

  if (typeof movieId !== 'string' || !movieId || typeof showtimeId !== 'string' || !showtimeId || !seatNumbers.length) {
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
    if (seatNumbers.some((seat) => !showtimeResponse.data.available_seats?.includes(seat))) {
      error.value = 'One or more selected seats are no longer available. Please select seats again.';
      return;
    }
    selectedSeats.value = seatNumbers;
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
        <p class="text-xs font-bold uppercase tracking-[0.18em] bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Payment</p>
        <h1 class="mt-2 text-3xl font-bold">Choose a payment method</h1>
        <p class="mt-2 text-sm text-gray-400">Select how you would like to pay for your order.</p>

        <div class="mt-8 space-y-3">
          <label
            v-for="method in paymentMethods"
            :key="method.id"
            class="flex cursor-pointer items-start gap-4 rounded border p-5 transition-colors"
            :class="selectedPaymentMethod === method.id ? 'border-purple-400 bg-purple-950/30' : 'border-white/10 bg-neutral-900/60 hover:border-white/30'"
          >
            <input v-model="selectedPaymentMethod" class="mt-1 accent-purple-500" type="radio" name="payment-method" :value="method.id" />
            <span>
              <span class="block font-semibold">{{ method.name }}</span>
              <span class="mt-1 block text-sm text-gray-400">{{ method.description }}</span>
            </span>
          </label>
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
          <button
            class="rounded-full px-8 py-3 font-bold shadow-lg transition-colors"
            :class="selectedPaymentMethod && selectedSeats.length && !submittingOrder && !completedOrder
              ? 'bg-white text-purple-900 hover:bg-gray-100'
              : 'cursor-not-allowed bg-neutral-700 text-neutral-400'"
            :disabled="!selectedPaymentMethod || !selectedSeats.length || submittingOrder || Boolean(completedOrder)"
            type="button"
            @click="submitOrder"
          >
            {{ submittingOrder ? 'Processing...' : completedOrder ? 'Order Paid' : 'Payment' }}
          </button>
        </div>
        <p v-if="submissionError" class="mt-4 text-center text-sm text-red-300" role="alert">{{ submissionError }}</p>
        <p v-if="completedOrder" class="mt-4 text-center text-sm text-emerald-300" role="status">
          Payment complete. Order #{{ completedOrder.id }} is {{ completedOrder.status }}.
        </p>
      </aside>
    </template>
  </main>
  <SiteFooter />
</template>
