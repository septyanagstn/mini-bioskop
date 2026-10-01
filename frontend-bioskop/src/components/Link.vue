<script setup>
import { computed } from 'vue';
import Link from '@/components/Link.vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type:  String, default: '' },
  contentKey: { type: String, default: '' },
  href: { type: String, default: '' },
});

const isExternal = computed(() => {
  return props.href?.startsWith('http') || props.href?.startsWith('mailto:') || props.href?.startsWith('#');
});

const computedHref = computed(() => {
  if (!props.href) return "/";
  if (props.href.endsWith('.html')) {
    if (props.href === 'index.html') return '/';
    const path = props.href.slice(0, -5);
    return path.startsWith('/') ? path : '/' + path;
  }
  return props.href;
});

</script>

<template>
  <a
    v-if="isExternal"
    :href="href"
    :class="props.class"
    target="_blank"
    rel="noopener noreferrer"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <RouterLink
    v-else
    :to="computedHref"
    :class="props.class"
    v-bind="$attrs"
  >
    <slot />
  </RouterLink>
</template>