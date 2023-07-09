<template>
  <v-toolbar elevation="0" class="toolbar__wrapper">
    <v-app-bar-nav-icon
      @click="generalChangeState({ key: 'drawer', payload: true })"
      v-if="mini"
    ></v-app-bar-nav-icon>
    <v-toolbar-title> Trending </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppToolbar',

  data() {
    return {
      mini: (this.screen < 1024),
      screen: window.screen.width,
    };
  },

  created() {
    this.setScreenWidth();

    window.addEventListener('resize', () => {
      this.setScreenWidth();
    });
  },

  methods: {
    ...mapActions([
      'generalChangeState',
    ]),
    setScreenWidth() {
      this.screen = window.screen.width;
      this.mini = this.screen < 1024;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/scss/_global.scss';

.toolbar__wrapper {
  ::v-deep.v-toolbar__title {
    @include font-format(
      $weight: 900,
      $size: 18px,
      $color:  $primary,
      $transform: uppercase
    );
  }
}
</style>
