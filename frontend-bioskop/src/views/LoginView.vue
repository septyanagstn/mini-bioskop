<script setup>
import { useHead } from '@vueuse/head';
import Image from '@/components/Image.vue';
import Input from '@/components/Input.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';

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
    <form class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-300" for="email"> Email address </label>
        <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" type="email" placeholder="you@example.com" id="email" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300" for="password"> Password </label>
        <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" type="password" placeholder="••••••••" id="password" />
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
      <button class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors" type="submit"> Sign in </button>
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