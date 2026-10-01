<script setup>
import { useHead } from '@vueuse/head';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Image from '@/components/Image.vue';
import Input from '@/components/Input.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { currentUser } from '@/lib/auth.js';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
const router = useRouter();
const orders = ref([]);
const loading = ref(false);
const error = ref('');

async function getOrders() {
  const userId = currentUser.value?.user_id;
  if (!userId) {
    await router.replace({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const orderResponse = await api.get(`/orders/user/${encodeURIComponent(userId)}`);
    orders.value = orderResponse.data;
    console.log(orders);
  } catch (cause) {
    error.value = cause.response?.data?.message || cause.message || 'Failed to load orders.';
  } finally {
    loading.value = false;
  }
}

onMounted(getOrders);

</script>

<template>
<SiteHeader/>
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <h1 class="text-3xl font-bold mt-10 mb-8"> Account Settings </h1>
  <div class="bg-neutral-800 rounded-lg p-8 mb-8">
    <h2 class="text-xl font-bold mb-6"> Profile Details </h2>
    <div class="flex items-start space-x-8">
      <div class="flex-shrink-0">
        <Image variant="cover" class="h-24 w-24 rounded-full object-cover border-4 border-purple-500" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" />
        <Button class="mt-2 text-sm text-purple-400 hover:text-purple-300 block w-full text-center"> Change Photo </Button>
      </div>
      <div class="flex-1 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400" > Full Name </label>
          <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" value="John Doe" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400"> Email </label>
          <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" :value="currentUser?.email || ''" readonly />
        </div>
        <Button content-key="cta_27" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"> Save Changes </Button>
      </div>
    </div>
  </div>
  <div class="bg-neutral-800 rounded-lg p-8 mb-8">
    <h2 class="text-xl font-bold mb-6"> My Orders </h2>
    <p v-if="loading" class="py-8 text-center text-sm text-gray-400" role="status">Loading your orders...</p>
    <p v-else-if="error" class="py-8 text-center text-sm text-red-300" role="alert">{{ error }}</p>
    <div v-else-if="orders.length" class="space-y-4">
      <article v-for="order in orders" :key="order.id" class="rounded-lg border border-neutral-700 bg-neutral-900 p-4 sm:p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Image
            v-if="order.showtime?.movie?.poster_url"
            variant="cover"
            class="h-28 w-20 shrink-0 rounded object-cover"
            :src="order.showtime.movie.poster_url"
            :alt="`Poster for ${order.showtime.movie.title}`"
          />
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold">{{ order.showtime?.movie?.title || 'Movie' }}</h3>
                <p class="mt-1 text-sm text-gray-400">{{ order.showtime?.show_date?.slice(0, 10) }} · {{ order.showtime?.start_time }} · {{ order.showtime?.audi }}</p>
              </div>
              <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="order.status === 'PAID' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'">{{ order.status }}</span>
            </div>
            <div class="mt-4 flex flex-wrap justify-between gap-3 border-t border-neutral-800 pt-3 text-sm">
              <p class="text-gray-400">Seats: <span class="text-gray-200">{{ order.seat_numbers?.join(', ') }}</span></p>
              <p class="font-semibold text-white">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.total_price) }}</p>
            </div>
          </div>
          <div v-if="order.status === 'PENDING'" class="min-w-0 flex-1">
            <Link>
              <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold">{{ order.showtime?.movie?.title || 'Movie' }}</h3>
                <p class="mt-1 text-sm text-gray-400">{{ order.showtime?.show_date?.slice(0, 10) }} · {{ order.showtime?.start_time }} · {{ order.showtime?.audi }}</p>
              </div>
                <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="order.status === 'PAID' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'">{{ order.status }}</span>
              </div>
              <div class="mt-4 flex flex-wrap justify-between gap-3 border-t border-neutral-800 pt-3 text-sm">
                <p class="text-gray-400">Seats: <span class="text-gray-200">{{ order.seat_numbers?.join(', ') }}</span></p>
                <p class="font-semibold text-white">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.total_price) }}</p>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </div>
    <p v-else class="py-8 text-center text-sm text-gray-400">You have no orders yet.</p>
  </div>
</div>
<SiteFooter/>
</template>