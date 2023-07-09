<template>
  <div class="moviesgrid">
    <v-card color="white">
      <v-img
        v-if="movie.backdrop_path"
        :lazy-src="`${returnPath()}`"
        max-height="350px"
        max-width="100%"
        :src="returnPath()"
      ></v-img>

      <v-img
        v-else
        lazy-src="@/assets/img/not-found.jpg"
        max-height="350px"
        max-width="100%"
        src="@/assets/img/not-found.jpg"
      ></v-img>
    </v-card>

    <div class="moviesgrid__avarage" v-if="returnAvarage(movie.vote_average) !== 9999">
      <p>
        {{ returnAvarage(movie.vote_average) }}
      </p>
    </div>

    <div class="moviesgrid__text">
      <p class="moviesgrid__title">
        {{ movie.title }}
      </p>

      <p class="moviesgrid__release">
        {{ moment(movie.release_date).format('DD/MM/YYYY') }} <br>
      </p>

    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MoviesGrid',

  data() {
    return {
      moment,
    };
  },

  props: {
    movie: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  methods: {
    returnPath() {
      return process.env.VUE_APP_IMG_PATH + this.movie.backdrop_path;
    },

    returnAvarage(number) {
      if (number) {
        const array = JSON.stringify(number).split('.');
        const parse = array[1] ? parseFloat(array[1], 10) : 0;
        const firstNAround = Math.round((parse / 100).toFixed(2));
        const avarage = `${array[0]}${firstNAround === 10 ? 1 : firstNAround}`;
        return avarage;
      }

      return 9999;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_global.scss';

.moviesgrid {
  position: relative;
  .moviesgrid__avarage {
    position: absolute;
    top: -5px;
    display: flex;
    right: -15px;
    background-color: $primary;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border: 4px solid #1ed5a9;

    p {
      @include font-format($color: $white, $size: 20px, $line-height: 20px, $weight: bold);
      position: relative;
      left: 7px;
      top: 10px;

      &::after {
        content: "%";
        font-size: 10px;
        position: relative;
        bottom: 7px;
        right: 6px;
      }
    }
  }

  .moviesgrid__text {
    height: 80px;
    position: absolute;
    bottom: 0;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5); /* Black see-through */
    width: 100%;
    opacity:1;
    padding: 20px;

    .moviesgrid__title {
      margin: 0;
      @include font-format($color: $white, $size: 15px, $line-height: 15px);
    }

    .moviesgrid__release {
      @include font-format($color: $primary, $size: 12px, $weight: 800);
      position: absolute;
      bottom: 0;
      height: 15px;
    }
  }
}
</style>
