<template>
  <div style="width: 1920px; height: 1080px;" class="bg-gray-900">
    <div style="position: absolute ">
      <input placeholder="Enter password" v-model="password" @keydown.enter="login()" type="password"/>
      <a href="#" @click="pre = !pre">feeds object</a>
      <pre class="text-white" v-if="pre">{{feeds}}</pre>
    </div>
    <div class="w-full h-full flex align-center">
      <Feed v-if="authenticated && feeds"
      :feed="feeds[0]"
      class="m-auto"/>
    </div>
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';
import gql from 'graphql-tag';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      pre: false,
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
                  Posts {
                    id,
                    Person {Name, City, Country},
                    Description,
                    Media {name, width, height, url},
                    Comments {Username, Text},
                    Likes,
                    Liked
                  }
              } 
          }
      `
  }
}
</script>