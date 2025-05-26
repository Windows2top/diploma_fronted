import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import SvgIcon from '@jamescoyle/vue-icon'



const app = createApp(App)
const pinia = createPinia()

app.component('svg-icon', SvgIcon)

app.config.globalProperties.$axios = axios
axios.defaults.withCredentials = true

app.use(pinia)
app.use(router)
app.mount('#app')
    