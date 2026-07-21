import { ref, computed } from 'vue'

export function useTaskFilters(tasks) {
  const searchQuery = ref('')
  const statusFilter = ref('All')

  const filteredTasks = computed(() => {
    return tasks.value.filter((task) => {
      const matchesStatus =
        statusFilter.value === 'All' || task.status === statusFilter.value

      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.value.trim().toLowerCase())

      return matchesStatus && matchesSearch
    })
  })

  return {
    searchQuery,
    statusFilter,
    filteredTasks,
  }
}
