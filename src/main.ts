import { createApp } from 'vue'
import { store } from '@/store';
import { router } from '@/router';
import { Icon } from '@iconify/vue';
import { i18n } from "@/locales"
import App from './App.vue'
import './index.css'
import './style/transition.css'
import './style/manage.css'
const app = createApp(App)
app.component("Icon", Icon)
app.use(router).use(store).use(i18n)
app.mount('#app')
