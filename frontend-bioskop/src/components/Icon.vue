<script setup>
import { computed } from 'vue';

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type:  String, default: '' },
  contentKey: { type: String, default: '' },
});

</script>

<template>
  <svg fill="none" stroke="currentColor" viewbox="0 0 24 24" :class="props.class" v-bind="$attrs"><slot /></svg>
</template>