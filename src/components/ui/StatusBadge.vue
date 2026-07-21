<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const config = computed(() => {
  const map = {
    Pending: { dot: 'bg-status-pending', text: 'text-slate-600', bg: 'bg-slate-100' },
    'In Progress': { dot: 'bg-status-progress', text: 'text-amber-700', bg: 'bg-amber-50' },
    Done: { dot: 'bg-status-done', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  }
  return map[props.status] ?? map.Pending
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
    :class="[config.bg, config.text]"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="config.dot" />
    {{ status }}
  </span>
</template>
