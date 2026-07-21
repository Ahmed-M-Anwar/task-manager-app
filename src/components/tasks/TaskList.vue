<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete', 'view'])
</script>

<template>
  <div
    v-if="tasks.length > 0"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @view="emit('view', $event)"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />
  </div>

  <div v-else class="text-center py-16">
    <i class="pi pi-inbox text-4xl text-slate-300" />
    <p class="mt-3 text-slate-500 font-medium">No tasks found</p>
    <p class="text-sm text-slate-400">Try adjusting your filters or add a new task.</p>
  </div>
</template>
