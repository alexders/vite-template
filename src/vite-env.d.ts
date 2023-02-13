/// <reference types="vite/client" />
// 识别vue文件
    declare module '*.vue' {
        import type { DefineComponent } from 'vue';
        const vueComponent: DefineComponent<{}, {}, any>;
        export default vueComponent;
    
 }