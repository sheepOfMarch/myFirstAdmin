import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localStorage.getItem('userInfo') || {},
    activeNav: 'index',
		usualData: []
  },
  getters: {
    userInfo: state => state.userInfo,
    activeNav: state => state.activeNav,
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', userInfo);
    },
    CLEAR_USERINFO(state) {
      state.userInfo = {};
      localStorage.removeItem('userInfo');
    },
    ACTIVE_NAV(state, module) {
      state.activeNav = module;
    },
		UPDATA_USUALDATA(state, da) {
			state.usualData = da;
		},
		CLEAR_USUALDATA(state) {
			state.usualData = [];
		}
  },
  actions: {
  
  }
})
