<script setup>
import Button from 'primevue/button'
import StatusBadge from '@/components/ui/StatusBadge.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete', 'view'])
</script>

<template>
  <div
    class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
  >
    <div class="flex items-start justify-between gap-2">
      <h3 class="font-semibold text-gray-800 line-clamp-1">{{ task.title }}</h3>
      <StatusBadge :status="task.status" />
    </div>

    <p class="text-sm text-gray-500 line-clamp-2">{{ task.description }}</p>

    <div class="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
      <span class="text-xs text-gray-400">
        Due: {{ task.dueDate }}
      </span>

      <div class="flex gap-1">
        <Button
          icon="pi pi-eye"
          text
          size="small"
          @click="emit('view', task.id)"
        />
        <Button
          icon="pi pi-pencil"
          text
          size="small"
          severity="secondary"
          @click="emit('edit', task.id)"
        />
        <Button
          icon="pi pi-trash"
          text
          size="small"
          severity="danger"
          @click="emit('delete', task.id)"
        />
      </div>
    </div>
  </div>
</template>
