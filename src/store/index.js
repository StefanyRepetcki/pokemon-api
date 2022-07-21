const store = {
  namespaced: true,
  state: {
    listPokemon: [],
  },
  mutations: {
    setListPokemon(state, payload) {
      state.listPokemon = payload;
    },
  },
  actions: {
    getPokemon({ commit }, data) {
      commit('setListPokemon', data);
    },
  },
};

export default store;
