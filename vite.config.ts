import { defineConfig, ConfigEnv, UserConfig,} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// vite.config.ts中无法使用import.meta.env 所以需要引入
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 增加 vue文件 script name值
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 生产gz文件
import viteCompression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return{
  plugins: [vue(),
     vueSetupExtend(),
     createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // gzip压缩 生产环境生成 .gz 文件
      mode==='production'&&viteCompression({
         verbose: true,
         disable: false,
         threshold: 10240,
         algorithm: 'gzip',
         ext: '.gz',
       }),
  ],
  // 加载css文件
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/index.scss" as *;`
      }
    }
  },
  resolve:{
    // 别名
    alias:{
      '@':path.resolve(__dirname,'src') //设置 `@` 指向 `src` 目录
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
}
})
