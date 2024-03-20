import '../style.css';
import 'virtual:uno.css';
import '../assets/css/font.css';
import 'aos/dist/aos.css';
import '@arco-design/web-vue/dist/arco.css';
import { requestXhReport, PKG, TOKEN, APP_VERSION } from '@/api'

export function setupAssets(app) {
    requestXhReport.init({
        pkg: PKG,
        tk: TOKEN,
        version: APP_VERSION,
      
        isDev: import.meta.env.VITE_APP_ENV !== 'production' // 线上环境必须isDev: false
    })
    //
}