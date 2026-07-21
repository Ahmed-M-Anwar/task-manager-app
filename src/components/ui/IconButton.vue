<script setup>
import Button from 'primevue/button'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    default: undefined,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click']);
</script>

<template>
  <Button
    :icon="icon"
    :severity="severity"
    :aria-label="ariaLabel"
    text
    size="small"
    @click="emit('click')"
  />
</template>
