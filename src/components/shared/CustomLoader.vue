<template>
  <v-row class="customloader__wrapper">
    <div class="d-flex justify-center align-center customloader__box">
      <h1 class="ml15">
        <span class="word">Hype</span>
        <span class="word">ry</span>
      </h1>
    </div>
  </v-row>
</template>

<script>
import anime from 'animejs/lib/anime.es';

export default {
  name: 'CustomLoader',

  mounted() {
    anime.timeline({ loop: true })
      .add({
        targets: '.ml15 .word',
        scale: [3, 1],
        opacity: [0, 1],
        easing: 'easeOutCirc',
        duration: 800,
        delay: (el, i) => 800 * i,
      }).add({
        targets: '.ml15',
        opacity: 0,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 1000,
      });
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/_global.scss';

.customloader__wrapper {
  height: 100vh;
  overflow: none;
  background: #121212;

  .customloader__box{
    overflow: none;
    width: 100%;
    .ml15 {
      font-size: 6.5em;
    }

    .ml15 .word {
      display: inline-block;
      color: $primary;
      font-weight: bold;
    }
  }
}

</style>
