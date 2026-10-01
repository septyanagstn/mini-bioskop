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

useHead({
  title: 'Streamflow - Free Tailwind Template',
  meta: [
    {
      name: 'description',
      content: 'Download this free Tailwind CSS Video Streaming website template for Streamflow. Features a vibrant block based design, fully responsive layout, and includes 10 pre-built pages like profile.html, help.html, legal.html.',
    },
  ],
});

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
          <label class="block text-sm font-medium text-gray-400"> Full Name </label>
          <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" value="John Doe" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400"> Email </label>
          <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" value="john.doe@example.com" />
        </div>
        <Button content-key="cta_27" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"> Save Changes </Button>
      </div>
    </div>
  </div>
  <div class="bg-neutral-800 rounded-lg p-8 mb-8">
    <h2 class="text-xl font-bold mb-6"> My Orders </h2>
    <div class="flex items-center justify-between p-4 bg-neutral-900 rounded-lg border border-neutral-700">
      <div>
        <p class="font-bold text-lg"> Premium Plan (4K) </p>
        <p class="text-gray-400 text-sm"> Next billing date: Nov 24, 2025 </p>
      </div>
      <div class="flex items-center space-x-4">
        <Text class="text-green-400 font-medium"> Active </Text>
        <Button class="text-purple-400 hover:text-purple-300 font-medium"> Manage </Button>
      </div>
    </div>
  </div>
</div>
<SiteFooter/>
</template>