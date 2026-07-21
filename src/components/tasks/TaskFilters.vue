<script setup>
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const searchQuery = defineModel('searchQuery', { required: true })
const statusFilter = defineModel('statusFilter', { required: true })

const statusOptions = ['All', 'Pending', 'In Progress', 'Done']
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3 mb-6">
    <IconField class="flex-1">
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="searchQuery"
        placeholder="Search by title..."
        class="w-full"
      />
    </IconField>

    <Select
      v-model="statusFilter"
      :options="statusOptions"
      class="w-full sm:w-48"
    />
  </div>
</template>
