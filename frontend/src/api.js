import Vue from 'vue';
import axios from 'axios';
import {createSocket} from './helpers/createSocket';
export default new Vue({
    data: {
      socket: null,
      token: localStorage.getItem('STRAPI_TOKEN')
    },
    created() {
      console.log("created $api");
    },
    methods: {
      async login(username = "screens@bcc.online", password) {
        console.log("login function in $api");
        const { data } = await axios.post(process.env.VUE_APP_STRAPI_API_URL + '/auth/local', {
          identifier: username,
          password: password,
        });
        localStorage.setItem('STRAPI_TOKEN', data.jwt);
      },
      async ensureSocket() {
        if(!this.socket) {
          this.socket = await createSocket();
        }
      }
    },
  })