import {defineStore} from 'pinia'
import { asyncRoutes, constantRoutes,notFoundRouter } from '@/router/index'
import {filterAsyncRoutes} from "@/utils/routers"
import {filterKeepAlive} from "../../utils/routers";

export const userPermissionStore=defineStore({
    //id: 必须的，在所有 Store 中唯一
    id:'permissionState',
    state: ()=>({
        // 路由
        routes:[],
        // 动态路由
        addRoutes:[],
        // 缓存路由
        cacheRoutes:{},
    }),
    getters:{
        permission_routes:state=> {
            return state.routes
        },
        keepAliveRoutes: state=>{
            return filterKeepAlive(asyncRoutes)
        }
    },
    actions:{
        // 生成路由
        generateRoutes(roles){
            return new Promise((resolve, reject) => {
                // 在这判断是否有权限，哪些角色拥有哪些权限
                let accessedRoutes
                if (roles&&roles.length&&!roles.includes('admin')) {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }else{
                    /*
                        只要“||”前面为false,不管“||”后面是true还是false，都返回“||”后面的值。

                        只要“||”前面为true,不管“||”后面是true还是false，都返回“||”前面的值。
                    */ 
                    accessedRoutes = asyncRoutes || []
                }
                accessedRoutes=accessedRoutes.concat(notFoundRouter)
                this.routes=constantRoutes.concat(accessedRoutes)
                this.addRoutes=accessedRoutes
                resolve(accessedRoutes)
            })
        },
        // 清楚路由
        clearRoutes(){
            this.routes = []
            this.addRoutes = []
            this.cacheRoutes = []
        },
        getCacheRoutes(){
            this.cacheRoutes = filterKeepAlive(asyncRoutes)
            return this.cacheRoutes
        }
    }
})