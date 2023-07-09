<template>
  <v-app>
    <DrawerComponent v-if="!loaderLayout"/>

    <!-- Sizes your content based upon application components -->
    <v-main class="layout-wrapper">
      <!-- Provides the application the proper gutter -->
      <AppToolbar v-if="!loaderLayout" />
      <v-container fluid>
        <!-- If using vue-router -->
        <v-row>
          <v-col class="pa-0">
            <div
              class="layout-content"
            >
              <router-view></router-view>

              <Footer v-if="!loaderLayout" />

              <v-snackbar
                v-if="snackbar"
                v-model="snackbar.model"
                :timeout="snackbar.timeout"
                :color="snackbar.bgColor"
              >
                <p
                  :style="`color: ${snackbar.fontColor}`"
                  class="mb-0"
                >{{ snackbar.text }}
                </p>

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="#ffffff"
                    text
                    v-bind="attrs"
                    @click="snackbarClose"
                    icon
                  >
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </template>
              </v-snackbar>

              <div
                class="layout-loader d-flex justify-center align-center"
              >
                <CustomLoader v-if="loaderLayout"/>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Layout',

  components: {
    DrawerComponent: () => import('@/components/shared/DrawerComponent.vue'),
    Footer: () => import('@/components/shared/Footer.vue'),
    CustomLoader: () => import('@/components/shared/CustomLoader.vue'),
    AppToolbar: () => import('@/components/shared/AppToolbar.vue'),
  },

  computed: {
    ...mapGetters({
      loaderLayout: 'loaderLayout',
      snackbar: 'snackbar',
    }),
  },

  methods: {
    ...mapActions([
      'generalChangeState',
    ]),

    snackbarClose() {
      this.generalChangeState({
        key: 'snackbar',
        payload: {
          model: false,
          timeout: 5000,
          bgColor: '#ca850e',
          fontColor: '#ffffff',
          text: '',
          type: null,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  .layout-content {
  }
}
</style>
