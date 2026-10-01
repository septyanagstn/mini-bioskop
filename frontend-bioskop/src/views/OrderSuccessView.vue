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
      <h1 class="text-6xl font-bold text-purple-600 mb-8"> ORDER SUCCESS </h1>
      <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
         See you there, have a nice day. 
      </p>
      <div class="flex justify-center gap-4">
        <div class="flex justify-center gap-4">
            <Link content-key="cta_16" class="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors flex items-center gap-2" href="index.html"><Icon class="w-5 h-5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon>
            Back Home </Link>
        </div>
        <div class="flex justify-center gap-4">
            <Link content-key="cta_16" class="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors flex items-center gap-2" href="profile.html"><Icon class="w-5 h-5"><path d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon>
            See Order </Link>
        </div>
      </div>
      
    </div>
  </div>
</div>
  <SiteFooter/>
</template>