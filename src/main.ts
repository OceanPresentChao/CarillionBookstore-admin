import { createApp } from 'vue'
import { store } from '@/store/index';
import { router } from '@/router';
import { Icon } from '@iconify/vue';
import { i18n } from "@/locales"

import App from './App.vue'
import './index.css'
import './style/transition.css'
import './style/manage.css'
import './style/index.css'
import './style/element.css'
const app = createApp(App)
app.component("Icon", Icon)

app.use(i18n).use(router).use(store)
app.mount('#app')
