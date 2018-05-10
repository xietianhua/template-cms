// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import routes from './router/router'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false

const router =new VueRouter({
     routes
});

//为登陆页面做判断
router.beforeEach((to, from, next) => {
  if (to.path == '/mobileLogin') {
    sessionStorage.removeItem('user');
  }
  let user = sessionStorage.getItem('user');
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
