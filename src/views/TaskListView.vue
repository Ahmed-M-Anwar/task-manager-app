<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import { useTaskFilters } from '@/composables/useTaskFilters'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskFilters from '@/components/tasks/TaskFilters.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'

const router = useRouter()
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const { searchQuery, statusFilter, filteredTasks } = useTaskFilters(tasks)

const isDialogOpen = ref(false)
const editingTask = ref(null) // null = إضافة، Object = تعديل

onMounted(() => {
  tasksStore.fetchTasks()
})

function openAddDialog() {
  editingTask.value = null
  isDialogOpen.value = true
}

function handleEdit(id) {
  editingTask.value = tasksStore.getTaskById(id)
  isDialogOpen.value = true
}

function handleView(id) {
  router.push({ name: 'task-detail', params: { id } })
}

async function handleDelete(id) {
  await tasksStore.deleteTask(id)
}

async function handleFormSubmit(payload) {
  if (editingTask.value) {
    await tasksStore.updateTask(editingTask.value.id, payload)
  } else {
    await tasksStore.addTask(payload)
  }
  isDialogOpen.value = false
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-display text-2xl font-bold text-slate-800">Task Manager</h1>
      <Button label="Add Task" icon="pi pi-plus" @click="openAddDialog" />
    </div>

    <TaskFilters v-model:search-query="searchQuery" v-model:status-filter="statusFilter" />

    <!-- Loading state -->
    <div v-if="tasksStore.isLoading" class="text-center py-16">
      <i class="pi pi-spin pi-spinner text-3xl text-brand-600" />
      <p class="mt-3 text-slate-500">Loading tasks…</p>
    </div>

    <!-- Error state -->
    <div v-else-if="tasksStore.error" class="text-center py-16">
      <i class="pi pi-exclamation-triangle text-3xl text-rose-500" />
      <p class="mt-3 text-slate-600 font-medium">{{ tasksStore.error }}</p>
      <button
        class="mt-4 text-sm text-brand-600 font-medium hover:underline"
        @click="tasksStore.fetchTasks()"
      >
        Try again
      </button>
    </div>

    <!-- Content -->
    <TaskList
      v-else
      :tasks="filteredTasks"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <Dialog
      v-model:visible="isDialogOpen"
      :header="editingTask ? 'Edit Task' : 'Add Task'"
      modal
      class="w-full max-w-md"
    >
      <TaskForm :initial-task="editingTask" @submit="handleFormSubmit" @cancel="isDialogOpen = false" />
    </Dialog>
  </div>
</template>
