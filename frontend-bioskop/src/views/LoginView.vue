<script setup>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import { useRoute, useRouter } from 'vue-router';
import Image from '@/components/Image.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { login } from '@/lib/auth.js';

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

async function submitLogin() {
  submitting.value = true;
  error.value = '';
  try {
    await login({ email: email.value, password: password.value });
    const redirect = route.query.redirect;
    await router.replace(typeof redirect === 'string' ? redirect : { name: 'home' });
  } catch (cause) {
    const message = cause.response?.data?.message || cause.message || 'Sign in failed.';
    error.value = Array.isArray(message) ? message.join(', ') : message;
  } finally {
    submitting.value = false;
  }
}

useHead({
  title: 'CinemaKu',
  meta: [
    {
      name: 'description',
      content: 'Choose your favorite movie',
    },
  ],
});

</script>

<template>
<SiteHeader/>
<div class="pointer-events-none fixed inset-0 z-0">
  <Image variant="cover" class="w-full h-full object-cover opacity-30" src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1600&q=80" />
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
</div>
<div class="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pb-12 pt-24">
  <div class="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-800/80 p-8 shadow-2xl backdrop-blur-md" id="login-form">
    <div class="text-center mb-8">
      <Link variant="inline" class="inline-block" href="index.html"><Text variant="bold" class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"> CinemaKu </Text></Link>
      <h2 class="text-2xl font-bold mt-6"> Welcome Back </h2>
      <p class="text-gray-400 mt-2"> Sign in to continue watching </p>
    </div>
    <form class="space-y-6" @submit.prevent="submitLogin">
      <div>
        <label class="block text-sm font-medium text-gray-300" for="email"> Email address </label>
        <input v-model.trim="email" class="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" placeholder="you@example.com" id="email" autocomplete="email" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300" for="password"> Password </label>
        <input v-model="password" class="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500" type="password" placeholder="••••••••" id="password" autocomplete="current-password" minlength="8" maxlength="12" required />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Input variant="text" class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded bg-neutral-700" type="checkbox" id="remember-me" />
          <label class="ml-2 block text-sm text-gray-300" for="remember-me"> Remember me </label>
        </div>
        <div class="text-sm">
          <Link class="font-medium text-purple-400 hover:text-purple-300" href="help.html"> Forgot password? </Link>
        </div>
      </div>
      <p v-if="error" class="text-sm text-red-300" role="alert">{{ error }}</p>
      <button class="flex w-full justify-center rounded-lg border border-transparent bg-purple-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-wait disabled:opacity-60" type="submit" :disabled="submitting">{{ submitting ? 'Signing in...' : 'Sign in' }}</button>
    </form>
    <p class="mt-8 text-center text-sm text-gray-400">
      New to CinemaKu? 
      <Link class="font-medium text-purple-400 hover:text-purple-300" href="signup.html">Sign up now</Link>
    </p>
  </div>
</div>
<div class="relative z-10">
  <SiteFooter />
</div>
</template>