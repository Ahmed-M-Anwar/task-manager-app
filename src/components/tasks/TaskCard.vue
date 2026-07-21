<script setup>
import BaseCard from '@/components/ui/BaseCard.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import IconButton from '@/components/ui/IconButton.vue'

const statusAccent = {
  Pending: 'bg-status-pending',
  'In Progress': 'bg-status-progress',
  Done: 'bg-status-done',
}

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete', 'view']);
</script>

<template>
  <BaseCard class="relative overflow-hidden pl-4">
    <!-- شريط الـ status اللوني المميز -->
    <span
      class="absolute inset-y-0 left-0 w-1"
      :class="statusAccent[task.status]"
    />

    <div class="p-4 flex flex-col gap-3">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-display font-semibold text-slate-800 line-clamp-1">
          {{ task.title }}
        </h3>
        <StatusBadge :status="task.status" />
      </div>

      <p class="text-sm text-slate-500 line-clamp-2">{{ task.description }}</p>

      <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
        <span class="text-xs font-mono text-slate-400">
          Due {{ task.dueDate }}
        </span>

        <div class="flex gap-1">
          <IconButton icon="pi pi-eye" ariaLabel="View task" @click="emit('view', task.id)" />
          <IconButton icon="pi pi-pencil" severity="secondary" ariaLabel="Edit task" @click="emit('edit', task.id)" />
          <IconButton icon="pi pi-trash" severity="danger" ariaLabel="Delete task" @click="emit('delete', task.id)" />
        </div>
      </div>
    </div>
  </BaseCard>
</template>
