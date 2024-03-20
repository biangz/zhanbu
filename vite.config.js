import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import postCssPxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      resolvers: [ArcoResolver()],
      eslintrc: {
        enabled: true, // <-- this
      },
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
          importStyle: 'less',
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#FFFFFF',
          'orange-6': '#66F132',
          // 'color-primary-6': '#13c2c2',
          // 'color-primary-6': `rgb(var(~'@{arco-cssvars-prefix}-green-6'))`
        },
        javascriptEnabled: true,
      }
    },
    postcss:{
      plugins:[
        postCssPxToRem({
          rootValue: 50,
          propList:['*'],
          exclude: /node_modules/i
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') 
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/localapi': {
        target: "http://192.168.1.102:8088",
        // target: "https://yuantao.xyz",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localapi/, '')
      },
      '/localwss': {
        target: "ws://localhost:8888",
        // target: "wss://eli-api.fenus.xyz",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localapi/, '')
      },
    }
  }, 
})
