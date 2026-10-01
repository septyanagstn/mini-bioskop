<script setup>
import { useHead } from '@vueuse/head';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Input from '@/components/Input.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';

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
  <header>
  <nav class="fixed w-full z-50 bg-neutral-900/90 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <Link class="flex-shrink-0" href="index.html"><Text variant="bold" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"> StreamFlow </Text></Link>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <Link class="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors" href="index.html"> Home </Link>
              <Link class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" href="browse.html"> Movies </Link>
              <Link class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" href="browse.html"> Series </Link>
              <Link class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" href="browse.html"> New & Popular </Link>
              <Link class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" href="profile.html"> My List </Link>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-4">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link href="browse.html"><Icon class="h-5 w-5 text-gray-400"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon></Link>
              </div>
              <Input variant="text" class="bg-neutral-800 text-white rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-64 transition-all" type="text" placeholder="Titles, people, genres" />
            </div>
            <!-- Mobile Toggle -->
            <Button variant="outline" content-key="cta_13" class="bg-neutral-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"><Text class="sr-only"> View notifications </Text>
            <Icon class="h-6 w-6"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon></Button>
            <div class="relative ml-3 group">
              <div>
                <button aria-haspopup="true" class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu">
                  <Text class="sr-only"> Open user menu </Text>
                  <img alt="" class="h-8 w-8 rounded-full object-cover border-2 border-purple-500" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                </button>
              </div>
              <div aria-labelledby="user-menu" aria-orientation="vertical" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-neutral-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block" role="menu">
                <Link content-key="cta_15" class="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white" href="profile.html"> Your Profile </Link>
                <Link content-key="cta_16" class="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white" href="profile.html"> History </Link>
                <Link content-key="cta_17" class="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white" href="profile.html"> Settings </Link>
                <Link content-key="cta_18" class="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white" href="login.html"> Sign out </Link>
              </div>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <Button variant="outline" content-key="cta_19" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white md:hidden" type="button"><Text class="sr-only"> Open main menu </Text>
          <Icon class="block h-6 w-6"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon></Button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div class="md:hidden hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link class="text-white block px-3 py-2 rounded-md text-base font-medium" href="index.html"> Home </Link>
        <Link class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="browse.html"> Movies </Link>
        <Link class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="browse.html"> Series </Link>
        <Link class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="browse.html"> New & Popular </Link>
        <Link class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="profile.html"> My List </Link>
      </div>
    </div>
  </nav>
</header>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-center"> Contact Us </h1>
    <p class="text-gray-400 text-center mb-12 text-lg">
       Have questions? We're here to help. Fill out the form below and we'll get back to you as soon as possible. 
    </p>
    <div class="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 shadow-xl">
      <form class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300" for="first-name"> First Name </label>
            <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" id="first-name" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300" for="last-name"> Last Name </label>
            <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" id="last-name" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300" for="email"> Email Address </label>
          <Input variant="text" class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" id="email" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300" for="subject"> Subject </label>
          <select class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" id="subject">
            <option> General Inquiry </option>
            <option> Technical Support </option>
            <option> Billing Issue </option>
            <option> Content Request </option>
            <option> Partnership </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300" for="message"> Message </label>
          <textarea class="mt-1 block w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" id="message" rows="4"></textarea>
        </div>
        <button class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors" type="submit"> Send Message </button>
      </form>
    </div>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <div class="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500">
          <Icon class="w-6 h-6"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon>
        </div>
        <h3 class="font-bold mb-2"> Email Us </h3>
        <p class="text-gray-400"> support@streamflow.com </p>
      </div>
      <div>
        <div class="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500">
          <Icon class="w-6 h-6"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon>
        </div>
        <h3 class="font-bold mb-2"> Call Us </h3>
        <p class="text-gray-400"> +1 (555) 123-4567 </p>
      </div>
      <div>
        <div class="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500">
          <Icon class="w-6 h-6"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></Icon>
        </div>
        <h3 class="font-bold mb-2"> Visit Us </h3>
        <p class="text-gray-400"> 123 Stream Ave, Tech City </p>
      </div>
    </div>
  </div>
</div>
<footer class="bg-neutral-900 border-t border-white/10 pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div>
        <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4"> Browse </h3>
        <ul class="space-y-3">
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="browse.html"> Movies </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="browse.html"> TV Shows </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="browse.html"> New Releases </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="browse.html"> Trending </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4"> Support </h3>
        <ul class="space-y-3">
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="help.html"> Help Center </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="help.html#contact"> Contact Us </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="help.html"> Supported Devices </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="help.html"> Activate Device </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4"> Company </h3>
        <ul class="space-y-3">
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="about.html"> About Us </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="about.html"> Careers </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="about.html"> Press </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="about.html"> Investors </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4"> Legal </h3>
        <ul class="space-y-3">
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="legal.html#privacy"> Privacy Policy </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="legal.html"> Terms of Service </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="legal.html#privacy"> Cookie Preferences </Link>
          </li>
          <li>
            <Link class="text-base text-gray-300 hover:text-white transition-colors" href="about.html"> Corporate Information </Link>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
      <div class="flex items-center space-x-6 mb-4 md:mb-0">
        <Link class="text-gray-400 hover:text-white" href="https://facebook.com"><Text class="sr-only"> Facebook </Text>
        <Icon class="h-6 w-6"><path clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd"></path></Icon></Link>
        <Link class="text-gray-400 hover:text-white" href="https://instagram.com"><Text class="sr-only"> Instagram </Text>
        <Icon class="h-6 w-6"><path clip-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.535c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill-rule="evenodd"></path></Icon></Link>
        <Link class="text-gray-400 hover:text-white" href="https://twitter.com"><Text class="sr-only"> Twitter </Text>
        <Icon class="h-6 w-6"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></Icon></Link>
      </div>
      <p class="text-base text-gray-400"> © 2025 StreamFlow. All rights reserved. </p>
    </div>
  </div>
</footer>
</template>