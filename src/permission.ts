import router from "@/router/index";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {userStore} from "@/store/modules/user"
import {userPermissionStore} from "@/store/modules/permission"

NProgress.configure({showSpinner:false})// NProgress Configuration

/*设置白名单*/ 
const whiteList=['/login','auth-redirect']
// 记录路由
let hasRoles = true

router.beforeEach(async (to,from,next)=>{
    // 开启进度条
  NProgress.start()
  if (typeof(to.meta.title) === 'string') {
    document.title = to.meta.title ||'vue-admin-perfect'
  }
  const UserStore = userStore();
  const hastToken=UserStore.token
    if (hastToken) {
        // 如果已登录，请重定向到主页
      if (to.path === '/login') {
            next({ path: '/' })
        }else{
            try{
               const PermissionStore= userPermissionStore()
               if (!PermissionStore.routes.length) {
                 // 获取权限列表进行接口访问 因为这里页面要切换权限
                const accessRoutes=await PermissionStore.generateRoutes(UserStore.roles)
                hasRoles = false
                accessRoutes.forEach(item => router.addRoute(item))// 动态添加访问路由表
                next({ ...to, replace: true }) // 这里相当于push到一个页面 不在进入路由拦截
            }else{
                next() // // 如果不传参数就会重新执行路由拦截，重新进到这里
            }
        }catch(error){
            next(`/login?redirect=${to.path}`)
        }
    }
    }else{
        // 在白名单的直接放行，不在的先登录再放行
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})
router.afterEach(() => {
    NProgress.done();
});