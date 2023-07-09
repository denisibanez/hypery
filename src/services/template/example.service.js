/* eslint-disable */
import request from '@/services/plugins/request';

export default {
  async getExample(payload, success, error, done) {
    return await request({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_PATH_EXAMPLE}mock`,
    }, success, error, done);
  },

  async postExample(payload, success, error, done) {
    return await request({
      method: 'post',
      url: `${process.env.VUE_APP_BASE_PATH_EXAMPLE}mock`,
      body: payload,
    }, success, error, done);
  },
};
/* eslint-enable */
