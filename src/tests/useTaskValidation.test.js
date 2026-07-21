import { describe, it, expect } from 'vitest'
import { useTaskValidation } from '@/composables/useTaskValidation'

describe('useTaskValidation', () => {
  it('rejects a task with an empty title', () => {
    const { validate, errors } = useTaskValidation()

    const isValid = validate({
      title: '   ',
      dueDate: '2099-01-01',
    })

    expect(isValid).toBe(false)
    expect(errors.title).toBe('Title is required.')
  })

  it('rejects a due date in the past', () => {
    const { validate, errors } = useTaskValidation()

    const isValid = validate({
      title: 'Valid title',
      dueDate: '2020-01-01',
    })

    expect(isValid).toBe(false)
    expect(errors.dueDate).toBe('Due date must be in the future.')
  })

  it('accepts a task with a valid title and future due date', () => {
    const { validate, errors } = useTaskValidation()

    const isValid = validate({
      title: 'Finish the report',
      dueDate: '2099-01-01',
    })

    expect(isValid).toBe(true)
    expect(errors.title).toBe('')
    expect(errors.dueDate).toBe('')
  })
})
