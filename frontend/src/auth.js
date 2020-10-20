import Vue from 'vue';
import axios from 'axios';
export default new Vue({
    data: {
      socket: null,
      token: localStorage.getItem('STRAPI_TOKEN')
    },
    created() {
      console.log("created $auth");
    },
    methods: {
      async login(password) {
        console.log("login function in $auth");
        const { data } = await axios.post(process.env.VUE_APP_STRAPI_API_URL + '/auth/local', {
          identifier: 'screens@bcc.online',
          password: password,
        });
        localStorage.setItem('STRAPI_TOKEN', data.jwt);
        this.$apollo.queries.feeds.refetch();
      }
    },
  })