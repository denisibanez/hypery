<template>
  <div class="footer__wrapper">
    <v-row>
      <v-col class="d-flex justify-center">
        <p @click="openExternalLink('https://hypery.co/')">
          <v-icon color="primary">mdi-copyright</v-icon> <span>Hypery.co | 2022</span>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Footer',

  methods: {
    openExternalLink($event) {
      window.open($event, '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_global.scss';

.footer__wrapper {
  position: static;
  width: 100%;
  bottom: 0;
  p {
    @include font-format($color: $primary);
    cursor: pointer;
    span {
      text-decoration: underline;
    }
  }
}
</style>
