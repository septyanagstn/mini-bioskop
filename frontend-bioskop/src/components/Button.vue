<script setup>
import { computed } from 'vue';

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type:  String, default: '' },
  contentKey: { type: String, default: '' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
});

</script>

<template>
  <button :class="props.class" v-bind="$attrs"><slot /></button>
</template>