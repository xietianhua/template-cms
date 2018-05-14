// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import routes from './router/router'
import axios from 'axios';


Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false

// 路由拦截设置
axios.interceptors.request.use(function (settings) {
  const token = sessionStorage.getItem('token')
  if (token) {
    settings.headers.Authorization = 'Bearer ' + token
  }
  return settings
}, function (error) {
  return Promise.reject(error)
});

const router =new VueRouter({
    mode:"history",
     routes
});

//为登陆页面做判断
router.beforeEach((to, from, next) => {
  if (to.path == '/mobileLogin') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/mobileLogin') {
    next({path: '/mobileLogin'})
  } else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
