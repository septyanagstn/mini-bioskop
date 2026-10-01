<script setup>
import Icon from '@/components/Icon.vue';
import Link from '@/components/Link.vue';
import Text from '@/components/Text.vue';
</script>

<template>
  <footer class="border-t border-white/10 bg-neutral-900 pt-12 pb-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Browse</h2>
          <ul class="space-y-3">
            <li><Link class="text-base text-gray-300 transition-colors hover:text-white" href="browse.html">Movies</Link></li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h2>
          <ul class="space-y-3">
            <li><Link class="text-base text-gray-300 transition-colors hover:text-white" href="help.html#contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">About Us</h2>
          <ul class="space-y-3">
            <li><Link class="text-base text-gray-300 transition-colors hover:text-white" href="about.html">CinemaKu</Link></li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 md:flex-row">
        <div class="flex items-center gap-5">
          <Link class="text-gray-400 transition-colors hover:text-white" href="https://facebook.com" aria-label="Facebook">
            <Icon class="h-5 w-5"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd" /></Icon>
            <Text class="sr-only">Facebook</Text>
          </Link>
          <Link class="text-gray-400 transition-colors hover:text-white" href="https://instagram.com" aria-label="Instagram">
            <Icon class="h-5 w-5"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-3.5a1 1 0 110 2 1 1 0 010-2z" /></Icon>
            <Text class="sr-only">Instagram</Text>
          </Link>
          <Link class="text-gray-400 transition-colors hover:text-white" href="https://x.com" aria-label="X">
            <Icon class="h-5 w-5"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.4 6.9L18.9 2zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20z" /></Icon>
            <Text class="sr-only">X</Text>
          </Link>
        </div>
        <p class="text-sm text-gray-400">© 2026 CinemaKu. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
