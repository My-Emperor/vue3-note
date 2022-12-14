import { createApp } from 'vue'

import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import pinia from '@/store/index'
createApp(App).use(router).use(pinia).mount('#app')
