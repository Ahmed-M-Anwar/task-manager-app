<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/tasks'
import BaseCard from '@/components/ui/BaseCard.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})

const router = useRouter()
const tasksStore = useTasksStore()
const isEditDialogOpen = ref(false)

// لو المستخدم عمل refresh على الصفحة دي مباشرة، الـ store هيبقى فاضي
// فبنجيب البيانات تاني لو لسه معملناش fetch
onMounted(() => {
  if (tasksStore.tasks.length === 0) {
    tasksStore.fetchTasks()
  }
})

const task = computed(() => tasksStore.getTaskById(props.id))

async function handleDelete() {
  await tasksStore.deleteTask(props.id)
  router.push({ name: 'task-list' })
}

async function handleFormSubmit(payload) {
  await tasksStore.updateTask(props.id, payload)
  isEditDialogOpen.value = false
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <button
      class="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 mb-4"
      @click="router.push({ name: 'task-list' })"
    >
      <i class="pi pi-arrow-left" /> Back to tasks
    </button>

    <div v-if="tasksStore.isLoading" class="text-center py-16">
      <i class="pi pi-spin pi-spinner text-3xl text-brand-600" />
      <p class="mt-3 text-slate-500">Loading task…</p>
    </div>

    <div v-else-if="!task" class="text-center py-16">
      <i class="pi pi-question-circle text-4xl text-slate-300" />
      <p class="mt-3 text-slate-500 font-medium">Task not found.</p>
    </div>

    <BaseCard v-else class="p-6">
      <div class="flex items-start justify-between gap-3 mb-4">
        <h1 class="font-display text-xl font-bold text-slate-800">{{ task.title }}</h1>
        <StatusBadge :status="task.status" />
      </div>

      <p class="text-slate-600 mb-4">{{ task.description }}</p>

      <p class="text-sm font-mono text-slate-400 mb-6">Due {{ task.dueDate }}</p>

      <div class="flex gap-2 pt-4 border-t border-slate-100">
        <Button label="Edit" icon="pi pi-pencil" severity="secondary" @click="isEditDialogOpen = true" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="handleDelete" />
      </div>
    </BaseCard>

    <Dialog v-model:visible="isEditDialogOpen" header="Edit Task" modal class="w-full max-w-md">
      <TaskForm :initial-task="task" @submit="handleFormSubmit" @cancel="isEditDialogOpen = false" />
    </Dialog>
  </div>
</template>
