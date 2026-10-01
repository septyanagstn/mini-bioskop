<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Image from '@/components/Image.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
import { currentUser, logout } from '@/lib/auth.js';

const searchQuery = defineModel('searchQuery', { type: String, default: '' });
const mobileMenuOpen = ref(false);
const router = useRouter();

async function signOut() {
  await logout();
  await router.push({ name: 'login' });
}
</script>

<template>
  <header>
    <nav class="fixed z-50 w-full border-b border-white/10 bg-neutral-900/90 backdrop-blur-md">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <Link class="flex-shrink-0" href="index.html">
              <Text variant="bold" class="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">CinemaKu</Text>
            </Link>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <Link class="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:text-purple-400" href="index.html">Home</Link>
                <Link class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white" href="browse.html">Movies</Link>
                <Link class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white" href="profile.html">My List</Link>
              </div>
            </div>
          </div>

          <div class="hidden items-center space-x-4 md:flex">
            <label class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon class="h-5 w-5 text-gray-400"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></Icon>
              </span>
              <input
                v-model="searchQuery"
                class="w-64 rounded-full bg-neutral-800 py-1.5 pl-10 pr-4 text-sm text-white transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search movies"
                type="search"
                aria-label="Search movies"
              />
            </label>
            <div v-if="currentUser" class="group relative">
              <button id="user-menu" aria-haspopup="true" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                <Text class="sr-only">Open user menu</Text>
                <Image variant="cover" class="h-8 w-8 rounded-full border-2 border-purple-500 object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User profile" />
              </button>
              <div aria-labelledby="user-menu" class="absolute right-0 mt-2 hidden w-48 origin-top-right rounded-md bg-neutral-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block" role="menu">
                <Link class="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white" href="profile.html">Your Profile</Link>
                <button class="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-neutral-700 hover:text-white" type="button" @click="signOut">Sign Out</button>
              </div>
            </div>
          <div v-else class="flex items-center gap-3">
            <Link class="text-sm text-gray-300 hover:text-white" href="login.html">Sign In</Link>
            <Link class="rounded bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-500" href="signup.html">Sign Up</Link>
          </div>
          </div>

          <Button
            variant="outline"
            class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white md:hidden"
            type="button"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Open navigation"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Icon class="h-6 w-6"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></Icon>
          </Button>
        </div>
      </div>
      <div v-if="mobileMenuOpen" id="mobile-menu" class="border-t border-white/10 px-2 pb-3 pt-2 md:hidden">
        <Link class="block rounded-md px-3 py-2 text-base font-medium text-white" href="index.html">Home</Link>
        <Link class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white" href="browse.html">Movies</Link>
        <Link v-if="currentUser" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white" href="profile.html">My List</Link>
        <button v-if="currentUser" class="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:text-white" type="button" @click="signOut">Sign Out</button>
        <template v-else>
          <Link class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white" href="login.html">Sign In</Link>
          <Link class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white" href="signup.html">Sign Up</Link>
        </template>
        <input
          v-model="searchQuery"
          class="mt-2 w-full rounded bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search movies"
          type="search"
          aria-label="Search movies"
        />
      </div>
    </nav>
  </header>
</template>
