<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="screen <= 1023"
    :permanent="screen >= 1024"
    :mini-variant.sync="mini"
    app
    v-click-outside="hideDrawer"
    color="black"
    class="menu"
  >
    <v-list-item style="height: 64px;" class="px-2">
      <v-list-item-avatar style="border-radius: 0">
        <v-img
          src="@/assets/img/logo.png"
          lazy-src="@/assets/img/logo.png"
          style="cursor: pointer;"
          width="100%"
          height="100%"
        />
      </v-list-item-avatar>

      <v-list-item-title>
        Hypery
      </v-list-item-title>

      <v-btn
        v-if="screen >= 1024"
        icon
        @click.stop="[
          mini = !mini,
        ]"
      >
        <v-icon color="primaru">
          mdi-chevron-left-circle
        </v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </template>

    <div
      v-for="(item, key) in items"
      :key="key"
    >
      <v-list-item
        @click="navigate(item)"
        v-if="item.enable"
      >
        <template>
          <div class="custom">
            <v-list-item-icon
              class="mr-3"
              color="white"
            >
              <v-icon
                v-text="item.icon"
                color="primary"
                class="mr-0"
              />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                v-text="item.title"
              />
            </v-list-item-content>
          </div>
        </template>
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DrawerComponent',

  data() {
    return {
      mini: true,
      screen: window.screen.width,
      items: [
        {
          icon: 'mdi-trending-up',
          enable: true,
          link: '/trending',
          title: 'Trending',
          id: 'Home',
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      drawer: 'drawer',
    }),
  },

  created() {
    this.setScreenWidth();

    window.addEventListener('resize', () => {
      this.setScreenWidth();
    });

    if (this.screen <= 1023) {
      this.mini = false;
    }
  },

  methods: {
    ...mapActions([
      'generalChangeState',
    ]),
    navigate(item) {
      if (this.$router.currentRoute.path !== item.link) {
        this.$router.push(item.link);
      }
    },

    hideDrawer(e) {
      if (e.target.className === 'v-overlay__scrim') {
        this.generalChangeState({
          key: 'drawer',
          payload: false,
        });
      }
    },

    setScreenWidth() {
      this.screen = window.screen.width;
    },
  },

  watch: {
    $route() {
      this.mini = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_global.scss';

.menu {
  min-height: 100vh;
  height: 100% !important;

  ::v-deep.v-list-item__icon {
    &:first-child {
      margin-right: 11px;
    }
  }

  ::v-deep.v-list-item {
    text-align: left;
    padding: 0;
    min-height: 20px;
  }

  ::v-deep.v-icon {
    color: $primary;
  }

  ::v-deep.v-list-group {
    width: 100%;
  }

  ::v-deep.v-list-group__header {
    padding: 0 16px;

    .v-list-item__title {
      text-align: left;
      padding: 0;
      @include font-format(
        $weight: 600,
        $size: 14px,
        $color: $white,
      );
    }
  }

  ::v-deep.v-navigation-drawer__content {
    border-right: 1px solid $gray;
  }

  .custom {
    width: 100%;
    display: flex;
    padding: 0 16px;
  }
  ::v-deep.v-list-item__title {
    padding: 0 16px;
    @include font-format(
      $weight: 600,
      $size: 14px,
      $color: $white,
    );
  }
  ::v-deep.v-divider {
    border-color: $gray;
  }
}
</style>
