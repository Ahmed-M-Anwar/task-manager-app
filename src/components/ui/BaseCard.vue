<script setup>
defineProps({
  hoverable: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div
    class="bg-white rounded-lg border border-slate-200 shadow-sm"
    :class="{ 'hover:shadow-md transition-shadow duration-200': hoverable }"
  >
    <slot />
  </div>
</template>
