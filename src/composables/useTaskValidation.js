import { reactive } from 'vue'
import { isFutureDate } from '@/utils/dateHelpers'

export function useTaskValidation() {
  const errors = reactive({
    title: '',
    dueDate: '',
  })

  function validate(form) {
    errors.title = ''
    errors.dueDate = ''

    if (!form.title || !form.title.trim()) {
      errors.title = 'Title is required.'
    }

    if (!form.dueDate) {
      errors.dueDate = 'Due date is required.'
    } else if (!isFutureDate(form.dueDate)) {
      errors.dueDate = 'Due date must be in the future.'
    }

    return !errors.title && !errors.dueDate
  }

  return { errors, validate }
}
