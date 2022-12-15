import { createApp } from 'vue'

import 'normalize.css'
import './assets/css/index.less'
// 2.组件样式引入
import 'element-plus/theme-chalk/el-message.css'
import App from './App.vue'
import router from './router'
import pinia from '@/store/index'
createApp(App).use(router).use(pinia).mount('#app')
