import { createApp } from 'vue'
import App from './App.vue'
import "normalize.css"
import "./assets/css/index.css"
// import { Button } from 'vant';
//  引入组件样式
// import 'vant/lib/index.css';
import router from "./router";
import pinia from "./stores";

createApp(App).use(router).use(pinia).mount('#app')
