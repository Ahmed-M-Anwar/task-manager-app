import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useTaskFilters } from '@/composables/useTaskFilters'

const sampleTasks = [
  { id: 1, title: 'Write report', status: 'Pending' },
  { id: 2, title: 'Fix bug in login', status: 'In Progress' },
  { id: 3, title: 'Deploy release', status: 'Done' },
]

describe('useTaskFilters', () => {
  it('filters tasks by status', () => {
    const tasks = ref(sampleTasks)
    const { statusFilter, filteredTasks } = useTaskFilters(tasks)

    statusFilter.value = 'Done'

    expect(filteredTasks.value).toHaveLength(1)
    expect(filteredTasks.value[0].title).toBe('Deploy release')
  })

  it('filters tasks by search query (case-insensitive)', () => {
    const tasks = ref(sampleTasks)
    const { searchQuery, filteredTasks } = useTaskFilters(tasks)

    searchQuery.value = 'bug'

    expect(filteredTasks.value).toHaveLength(1)
    expect(filteredTasks.value[0].title).toBe('Fix bug in login')
  })
})
