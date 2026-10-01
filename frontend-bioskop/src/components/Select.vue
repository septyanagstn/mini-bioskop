<script setup>
import { computed } from 'vue';

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type:  String, default: '' },
  contentKey: { type: String, default: '' },
});

</script>

<template>
  <select :class="props.class" v-bind="$attrs"><slot /></select>
</template>