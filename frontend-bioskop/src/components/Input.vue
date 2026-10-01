<script setup>
import { computed } from 'vue';

const props = defineProps({
  class: { type: String, default: '' },
  variant: { type:  String, default: '' },
  contentKey: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  value: { type: String, default:  '' },
  name: { type: String, default: '' },
  modelValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

</script>

<template>
  <input :class="props.class" v-bind="$attrs" />
</template>