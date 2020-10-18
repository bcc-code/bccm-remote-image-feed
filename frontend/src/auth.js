import Vue from 'vue';
import axios from 'axios';
export default new Vue({
    data: {
      socket: null,
      token: localStorage.getItem('STRAPI_TOKEN')
    },
    methods: {
      async login(password) {
        const { data } = await axios.post(process.env.VUE_APP_STRAPI_API_URL + '/auth/local', {
          identifier: 'screens@bcc.online',
          password: password,
        });
        localStorage.setItem('STRAPI_TOKEN', data.jwt);
        this.$apollo.queries.feeds.refetch();
      }
    },
  })