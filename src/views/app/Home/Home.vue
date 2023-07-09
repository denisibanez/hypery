<template>
  <div
    v-if="!loaderLayout"
    class="home__wrapper"
  >
    <!-- Filter -->
    <div class="home__wrapper--filter pa-5">
      <v-card class="pa-5">
        <v-row>
          <v-col md="3">
            <h3 class="mb-3">Selecione o Período</h3>
            <v-select
              :items="itemsFilter"
              label="Período"
              outlined
              return-object
              v-model="selectPeriod"
              :item-text="'value'"
              :item-value="'key'"
              @change="getMovies('filter')"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!-- Grid -->
    <div class="home__wrapper--grid pa-5">
      <v-card class="pa-5">
        <v-row>
          <v-col v-for="(item, key) in movies" :key="key" md="2">
            <MoviesGrid :movie="item" />
          </v-col>
        </v-row>

        <!-- Pagination -->
        <div class="home__wrapper--pagination">
          <div class="d-flex justify-end mt-8">
            <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="8"
            ></v-pagination>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { movies } from '@/services';

export default {
  name: 'Home',

  components: {
    MoviesGrid: () => import('@/components/MoviesGrid.vue'),
  },

  data() {
    return {
      itemsFilter: [
        { key: 'day', value: 'Dia' },
        { key: 'week', value: 'Semana' },
      ],
      selectPeriod: { key: 'day', value: 'Dia' },
      movies: [],
      page: 1,
      totalPages: 10,
    };
  },

  computed: {
    ...mapGetters({
      loaderLayout: 'loaderLayout',
    }),
  },

  created() {
    this.getMovies();
  },

  methods: {
    ...mapActions([
      'generalChangeState',
    ]),

    async getMovies(filter) {
      if (filter) {
        this.page = 1;
      }
      const payload = {
        period: this.selectPeriod.key,
        page: this.page,
      };
      this.generalChangeState({ key: 'loaderLayout', payload: true });
      await movies.getMovies(payload, (r) => {
        console.log(r.data);
        this.movies = r.data.results;
        const result = Math.ceil(r.data.total_results / 20);
        this.totalPages = result === 0 ? result + 1 : result;
        setTimeout(() => {
          this.generalChangeState({ key: 'loaderLayout', payload: false });
        }, 2000);
      }, (e) => {
        this.generalChangeState({
          key: 'snackbar',
          payload: {
            model: true,
            timeout: 5000,
            bgColor: '#ca850e',
            fontColor: '#ffffff',
            text: e.response.data.status_message || 'Ocorreu um erro.',
          },
        });
      });
    },
  },

  watch: {
    page() {
      this.getMovies();
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../assets/scss/_global.scss';

.home__wrapper {
  .home__wrapper--pagination {
    ::v-deep .v-pagination__item, ::v-deep .v-pagination__navigation {
      border: 1px solid $primary;
    }
  }
}
</style>
