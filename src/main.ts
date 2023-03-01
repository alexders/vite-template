import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
import {registerElIcons} from "@/plugins/ElIcons"
// 权限路由
import './permission.ts'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg component
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/styles/index.scss";
// 引入暗黑模式 element-plus 2.2 内置暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义暗黑模式
import "@/styles/element-dark.scss"
// 引入阿里图标库
import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";
const app =createApp(App)
registerElIcons(app)

app.component('svg-icon',SvgIcon)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
