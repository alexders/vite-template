import Axios from 'axios'
import {ElMessage} from 'element-plus'
import store from '@/store/index'
import router from '@/router/index'

const baseUrl='https://api.github.com'
const env =process.env.NODE_ENV
// 接口返回统一格式
type responseType={
    code:number
    success:boolean
    msg:string
    result:any
}

const axios=Axios.create({
    timeout:15000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
axios.defaults.baseURL=baseUrl
// 跨域请求，允许保存cookie
axios.defaults.withCredentials=true
// 请求拦截器
axios.interceptors.request.use(
    (config) =>{ 
    config.headers['systenNo']='111';
    const token=store.getters.access_token
    if (token) {
        config.headers['Authorization']='Bearer'+token
    }
    if (env === 'development') {
        config.headers['VERSION']='23'
    }else{
        config.headers['VERSION']=process.env.VUE_APP_VERSION
    }


        return config
    
    },
    (error) =>{  return Promise.reject(error)}
)
// 响应拦截器
axios.interceptors.response.use(
    (response)=>{
        const status=Number(response.status) ||200
        const message=response.data.msg
        if (status === 401) {
            ElMessage({
                message:message,
                type:'error'
            })
            store.dispatch('logout').then(()=>{
                router.push({
                    path:'/login'
                })
            })
        }

        return response
    },
    (error) =>{ return Promise.reject(error)}
)
export default axios 