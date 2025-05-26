import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'



const app = createApp(App)

app.config.globalProperties.$axios = axios
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://api.localhost'

app.use(router).mount('#app')
    