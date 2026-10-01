<script setup>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import { useRoute, useRouter } from 'vue-router';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { signup } from '@/lib/auth.js';

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
const email = ref('');
const password = ref('');
const submitting = ref(false);
const error = ref('');

async function submitSignup() {
  submitting.value = true;
  error.value = '';
  try {
    await signup({ email: email.value, password: password.value });
    const redirect = route.query.redirect;
    await router.replace(typeof redirect === 'string' ? redirect : { name: 'home' });
  } catch (cause) {
    const message = cause.response?.data?.message || cause.message || 'Account creation failed.';
    error.value = Array.isArray(message) ? message.join(', ') : message;
  } finally {
    submitting.value = false;
  }
}

useHead({
  title: 'Sign Up | CinemaKu',
  meta: [{ name: 'description', content: 'Create your CinemaKu account.' }],
});
</script>

<template>
  <SiteHeader />
  <div class="pointer-events-none fixed inset-0 z-0">
    <img class="h-full w-full object-cover opacity-30" src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1600&q=80" alt="" />
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  </div>
  <main class="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pb-12 pt-24">
    <section class="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-800/80 p-8 shadow-2xl backdrop-blur-md">
      <div class="mb-8 text-center">
        <Link variant="inline" class="inline-block" href="index.html">
          <Text variant="bold" class="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">CinemaKu</Text>
        </Link>
        <h1 class="mt-6 text-2xl font-bold">Create Account</h1>
        <p class="mt-2 text-gray-400">Sign up to start booking your movie tickets.</p>
      </div>
      <form class="space-y-6" @submit.prevent="submitSignup">
        <div>
          <label class="block text-sm font-medium text-gray-300" for="signup-email">Email address</label>
          <input id="signup-email" v-model.trim="email" class="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" placeholder="you@example.com" autocomplete="email" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300" for="signup-password">Password</label>
          <input id="signup-password" v-model="password" class="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500" type="password" placeholder="Create a password" autocomplete="new-password" minlength="8" maxlength="12" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,12}" title="Use 8-12 characters with uppercase, lowercase, number, and symbol." required />
        </div>
        <p v-if="error" class="text-sm text-red-300" role="alert">{{ error }}</p>
        <button class="flex w-full justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-wait disabled:opacity-60" type="submit" :disabled="submitting">{{ submitting ? 'Creating account...' : 'Create Account' }}</button>
      </form>
      <p class="mt-8 text-center text-sm text-gray-400">
        Already have an account?
        <Link class="font-medium text-purple-400 hover:text-purple-300" href="login.html">Sign in</Link>
      </p>
    </section>
  </main>
  <div class="relative z-10">
    <SiteFooter />
  </div>
</template>
