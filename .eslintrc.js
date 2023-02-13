module.exports = {
    env: {
        es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
        node: true // Node.js 全局变量和 Node.js 作用域
    },
    extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'plugin:prettier/recommended'],
    settings: {
        // 解决vite+airbnb导致eslint报错import/no-unresolved，和使用别名报错
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
        },
    rules: {
         // 解决vite+airbnb导致eslint报错import/extensions
         'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['vite.config.ts'] }]
    }
}