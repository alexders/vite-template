import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
// 权限路由
import './permission.ts'
import ElementPlus from 'element-plus'
const app =createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
