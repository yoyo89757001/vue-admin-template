import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store

// 使用下面这两种方法存储数据：
// dispatch：异步操作，写法： this.$store.dispatch('mutations方法名',值)
// commit：同步操作，写法：this.$store.commit('mutations方法名',值)
