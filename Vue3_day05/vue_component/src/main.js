import { createApp } from 'vue'
// import App from './App.vue'
import App from './01_mixin和extends/App.vue'

//导入全局混入的js
// import {overallMixin} from "@/01_mixin和extends/mixin/overallMixin";

const app = createApp(App);
//全局混入
// app.mixin(overallMixin)
app.mount('#app');

// createApp(App).mount('#app')
