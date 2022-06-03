import { createApp } from 'vue'
import { store } from '@/store';
import { router } from '@/router';
import { Icon } from '@iconify/vue';
import App from './App.vue'
import './index.css'
const app = createApp(App)
app.component("Icon", Icon)
app.use(router).use(store)
app.mount('#app')
