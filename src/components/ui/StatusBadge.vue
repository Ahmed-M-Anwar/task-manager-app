<script setup>
import { computed } from 'vue'
import Tag from 'primevue/tag'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

// بنحول الـ status لـ "severity" عشان PrimeVue Tag يلوّنه تلقائيًا
const severity = computed(() => {
  switch (props.status) {
    case 'Done':
      return 'success'
    case 'In Progress':
      return 'warn'
    case 'Pending':
    default:
      return 'secondary'
  }
})
</script>

<template>
  <Tag :value="status" :severity="severity" />
</template>
