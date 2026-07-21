import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import router from './router'

const BrandPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: BrandPreset,
    options: { darkModeSelector: false },
  },
})

app.mount('#app')