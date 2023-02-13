import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    // 别名
    alias:{
      '@':resolve(__dirname,'src') //设置 `@` 指向 `src` 目录
    }
  },
  //打包路径
  base:'./',
  server:{
    port:4000,
    open:true,
    hmr:true,
    cors:true,
    // 设置代理
    proxy:{
      '/api':{
        target:'http://xxx.xxx.xxx.xxx:8080',
        changeOrigin: true,
        secure:false,
        rewrite:(path)=>path.replace('/api/','/')
        //rewrite的作用就是将axios请求地址的/api去掉，如果不需要去掉api的话，不写rewrite就行。
      }
    },
  }
})
