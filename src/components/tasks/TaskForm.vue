<script setup>
import { reactive, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import { useTaskValidation } from '@/composables/useTaskValidation'

const props = defineProps({
  initialTask: {
    type: Object,
    default: null, // null = وضع "إضافة"، Object = وضع "تعديل"
  },
})

const emit = defineEmits(['submit', 'cancel'])

const statusOptions = ['Pending', 'In Progress', 'Done']

const form = reactive({
  title: '',
  description: '',
  status: 'Pending',
  dueDate: null,
})

// لو فيه initialTask (يعني إحنا في وضع تعديل)، نملأ الفورم بيها
watch(
  () => props.initialTask,
  (task) => {
    if (task) {
      form.title = task.title
      form.description = task.description
      form.status = task.status
      form.dueDate = task.dueDate ? new Date(task.dueDate) : null
    }
  },
  { immediate: true },
)

const { errors, validate } = useTaskValidation()

function handleSubmit() {
  const payload = {
    ...form,
    dueDate: form.dueDate instanceof Date
      ? form.dueDate.toISOString().split('T')[0]
      : form.dueDate,
  }

  if (!validate(payload)) return

  emit('submit', payload)
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-slate-700">Title</label>
      <InputText v-model="form.title" :invalid="!!errors.title" placeholder="Task title" />
      <span v-if="errors.title" class="text-xs text-rose-500">{{ errors.title }}</span>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-slate-700">Description</label>
      <Textarea v-model="form.description" rows="3" autoResize placeholder="Task description" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-slate-700">Status</label>
      <Select v-model="form.status" :options="statusOptions" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium text-slate-700">Due date</label>
      <DatePicker v-model="form.dueDate" :invalid="!!errors.dueDate" dateFormat="yy-mm-dd" showIcon />
      <span v-if="errors.dueDate" class="text-xs text-rose-500">{{ errors.dueDate }}</span>
    </div>

    <div class="flex justify-end gap-2 mt-2">
      <Button label="Cancel" text severity="secondary" type="button" @click="emit('cancel')" />
      <Button :label="initialTask ? 'Save changes' : 'Add task'" type="submit" />
    </div>
  </form>
</template>
