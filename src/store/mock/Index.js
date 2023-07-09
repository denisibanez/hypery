export default {
  HelpersStore: {
    actions: {
      generalChangeState: jest.fn(),
    },
    state: {
      screenWidth: 0,
      loaderLayout: false,
      drawer: false,
      snackbar: {
        model: false,
        timeout: 3000,
        bgColor: '#E4F5E4',
        fontColor: '#047C00',
        text: 'Processo efetuado com sucesso!',
      },
      yearSelect: 2022,
    },
    getters: {
      screenWidth: jest.fn(),
      loaderLayout: jest.fn(),
      snackbar: jest.fn(),
      drawer: jest.fn(),
    },
  },
};
