import Vuex from 'vuex';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Layout from './Layout';
import Store from '@/store/mock/Index';

const localVue = createLocalVue();
localVue.use(Vuex);

Vue.use(Vuetify);

const stubs = [
  'router-view',
];

const store = new Vuex.Store({
  modules: Store,
});

describe('Layout', () => {
  let WRAPPER;
  window.screen = jest.fn();
  beforeEach(() => {
    WRAPPER = shallowMount(
      Layout, {
        localVue,
        store,
        stubs,
        vuetify: new Vuetify(),
        mocks: {
          $router: {
            currentRoute: {
              path: '/',
              name: 'Layout',
            },
            push: jest.fn(),
          },
        },
        propsData: {
          snackbar: {
            model: false,
          },
        },
      },
    );
  });

  test('Component exists', () => {
    expect(WRAPPER.exists()).toBe(true);
  });

  test('SnackbarClose test', async () => {
    WRAPPER.vm.snackbarClose();
    await WRAPPER.vm.$nextTick();
    WRAPPER.vm.generalChangeState({
      key: 'snackbar',
      payload: {
        model: false,
        timeout: 5000,
        bgColor: '#841e97',
        fontColor: '#ffffff',
        text: '',
      },
    });
  });
});
