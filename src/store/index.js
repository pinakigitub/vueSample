import Vue from 'vue'
import Vuex from 'vuex'
import players from './modules/players.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    players
  },
  strict: debug
})