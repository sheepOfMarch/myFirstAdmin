import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import axios from './utils/axios';
import ElementUI from 'element-ui';
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

router.beforeEach((to, from, next) => {
	if(to.meta.isLogin) {
		if(localStorage.userInfo) {
			next();
		}else{
			Message.error("登录过期");
			router.push('/');
		}
	}else{
		let module = to.path.split('/')[1] ? to.path.split('/')[1] : 'index';
		store.commit('ACTIVE_NAV', module);
		next()
	}
})
	
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
