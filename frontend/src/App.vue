<template>
  <div style="width: 1920px; height: 1920px; background: #777777">
    <input placeholder="Enter password" v-model="password" @keydown.enter="login()" type="password"/>
    <Feed v-if="authenticated && feeds" :feed="feeds[0]"/>
  </div>
</template>

<script>
import Feed from './components/Feed.vue';
import gql from 'graphql-tag';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      password: '',
      authenticated: localStorage.getItem('STRAPI_TOKEN')
    }
  },
  components: {
    Feed
  },
  methods: {
    async login() {
      const { data } = await axios.post(process.env.VUE_APP_STRAPI_API_URL + '/auth/local', {
        identifier: 'screens@bcc.online',
        password: this.password,
      });
      localStorage.setItem('STRAPI_TOKEN', data.jwt)
      this.authenticated = true;
      this.$apollo.queries.feeds.refetch();
    }
  },
  apollo: {
      feeds: gql`
          query {
              feeds {
                  Posts {id, Description, Media {name, width, height, url}}
              } 
          }
      `
  }
}
</script>

<style>
@import 'assets/css/tailwind.css';
</style>