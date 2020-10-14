import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import 'lib-flexible'
import './styles/base.less'
import './styles/iconfont.css'
import App from './App.vue'
import router from './router/index'
import DemoHeader from './components/DemoHeader.vue'
import DemoLogo from './components/DemoLogo.vue'
import DemoButton from './components/DemoButton.vue'
import {
  Field,
  Toast,
  Cell,
  CellGroup,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  List,
} from 'vant'
Vue.use(Field)
Vue.use(Toast)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
Vue.use(List)

// 将axios添加到vue原型对象上，避免每次都引入发请求
Vue.prototype.$axios = axios
//设置基地址
axios.defaults.baseURL = 'http://localhost:3000'

//设置请求拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

//设置响应拦截器
axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }
  return res
})
Vue.config.productionTip = false
Vue.component('demo-header', DemoHeader)
Vue.component('demo-logo', DemoLogo)
Vue.component('demo-button', DemoButton)

Vue.filter('time', (val, str) => {
  return moment(val).format(str)
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
