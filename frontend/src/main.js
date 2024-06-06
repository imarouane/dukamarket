import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import Toast, { POSITION } from 'vue-toastification'

import App from './App.vue'
import mitt from 'mitt'
import router from './router'
import 'vue-toastification/dist/index.css'

const emitter = mitt()
const app = createApp(App)

app.provide('emitter', emitter)
app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(Toast, {
  position: POSITION.TOP_RIGHT
})
app.mount('#app')
