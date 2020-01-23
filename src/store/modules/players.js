// initial state
const state = {
    allPlayers: []
  }
  
  // getters
  const getters = {
    allPlayers: state => state.allPlayers
  }
  
  // actions
  const actions = {
    fetchPlayersfromDB ({ commit ,state },playerList) {
        commit('setAllPlayers', playerList)
    }
  }
  
  // mutations
  const mutations = {
    setAllPlayers (state, products) {
      state.allPlayers = products
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }