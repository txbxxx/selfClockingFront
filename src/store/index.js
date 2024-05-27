import { createApp } from 'vue'
import { createStore } from 'vuex'


const store = createStore({
  state: {
    saToken: ""
  },
  mutations: {
    //获取Token
    getSaToken(state, token) {
      state.saToken = token
      localStorage.token = token
    },
    //删除Token
    delSaToken (state) {
      state.saToken = ""
      localStorage.removeItem('token')
    }
  },
})
export  default store