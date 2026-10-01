<script setup>
import { useHead } from '@vueuse/head';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
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
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div class="max-w-3xl mx-auto">
    <div class="text-center py-20">
      <h1 class="text-9xl font-bold text-purple-600 mb-8"> 404 </h1>
      <h2 class="text-4xl font-bold text-white mb-6"> Page Not Found </h2>
      <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
         Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
      </p>
      <div class="flex justify-center gap-4">
        <Link content-key="cta_16" class="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors flex items-center gap-2" href="index.html"><Icon class="w-5 h-5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon>
         Back to Home </Link>
      </div>
    </div>
  </div>
</div>
  <SiteFooter/>
</template>