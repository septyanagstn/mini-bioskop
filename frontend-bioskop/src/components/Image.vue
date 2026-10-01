<script setup>
import { computed } from 'vue';

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type:  String, default: '' },
  contentKey: { type: String, default: '' },
  src: { type: String, default: '' },
  alt: { type: String, default:  '' },
  width: { type: [Number, String], default: undefined },
  height: { type: [Number, String], default: undefined },
});

</script>

<template>
  <img
  :src="src"
  :alt="alt"
  :width="width"
  :height="height"
  :class="props.class"
  v-bind="$attrs"
/>
</template>