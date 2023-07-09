export default {
  state: {
    screenWidth: 0,
    loaderLayout: false,
    snackbar: {
      model: false,
      timeout: 3000,
      bgColor: '#ca850e',
      fontColor: '#047C00',
      text: 'Processo efetuado com sucesso!',
    },
    drawer: false,
  },

  mutations: {
    generalChangeState(state, param) {
      state[param.key] = param.payload;
    },
  },

  actions: {
    generalChangeState(context, param) {
      context.commit('generalChangeState', param);
    },
  },

  getters: {
    screenWidth: (state) => state.screenWidth,
    loaderLayout: (state) => state.loaderLayout,
    snackbar: (state) => state.snackbar,
    drawer: (state) => state.drawer,
  },
};
