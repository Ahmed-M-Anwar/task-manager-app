import { defineStore } from 'pinia'
import { tasksApi } from '@/api/tasksApi'
import { randomFutureDate } from '@/utils/dateHelpers'
import { generateLocalId } from '@/utils/idGenerator'

const STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find((task) => String(task.id) === String(id))
    },
  },

  actions: {
    // يجيب البيانات الأولية من JSONPlaceholder ويحولها لشكل الـ Task بتاعنا
    async fetchTasks() {
      this.isLoading = true
      this.error = null

      try {
        const response = await tasksApi.getAll(10)
        this.tasks = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: 'No description provided.',
          status: item.completed ? STATUS.DONE : STATUS.PENDING,
          dueDate: randomFutureDate(),
        }))
      } catch (err) {
        this.error = 'Failed to load tasks. Please try again.'
        console.error('[tasksStore] fetchTasks error:', err)
      } finally {
        this.isLoading = false
      }
    },

    async addTask(newTask) {
      this.error = null
      try {
        await tasksApi.create(newTask) // simulate الـ API call (فيك API وهمي، الرد ثابت)
        this.tasks.unshift({
          id: generateLocalId(), // مش بنستخدم الـ id الراجع من JSONPlaceholder لأنه ثابت (201) دايمًا
          ...newTask,
        })
      } catch (err) {
        this.error = 'Failed to add task. Please try again.'
        console.error('[tasksStore] addTask error:', err)
        throw err
      }
    },

    async updateTask(id, updatedFields) {
      this.error = null
      try {
        await tasksApi.update(id, updatedFields)
        const index = this.tasks.findIndex((t) => String(t.id) === String(id))
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...updatedFields }
        }
      } catch (err) {
        this.error = 'Failed to update task. Please try again.'
        console.error('[tasksStore] updateTask error:', err)
        throw err
      }
    },

    async deleteTask(id) {
      this.error = null
      try {
        await tasksApi.remove(id)
        this.tasks = this.tasks.filter((t) => String(t.id) !== String(id))
      } catch (err) {
        this.error = 'Failed to delete task. Please try again.'
        console.error('[tasksStore] deleteTask error:', err)
        throw err
      }
    },
  },
})

export { STATUS }