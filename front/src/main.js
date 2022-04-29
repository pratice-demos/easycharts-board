import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import {createPinia} from "pinia"
import router from './router/index'
import {Icon} from '@iconify/vue'
import 'element-plus/theme-chalk/el-message.css'
import './styles/index.css'

const app = createApp(App)
const pinia = createPinia()

app.config.productionTip = false

app
  .use(Icon)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
