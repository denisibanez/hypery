/* eslint-disable */
import request from '@/services/plugins/request';

export default {
  async getMovies(payload, success, error, done) {
    return await request({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_PATH}3/trending/movie/${payload.period}?api_key=${process.env.VUE_APP_TOKEN}&page=${payload.page}`,
    }, success, error, done);
  },
}
/* eslint-enable */
