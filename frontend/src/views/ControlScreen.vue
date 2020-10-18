<template>
  <div class="w-full h-full bg-gray-900">
    <div style="position: absolute">
      <input placeholder="Enter password" v-model="password" @keydown.enter="login()" type="password"/>
      <a href="#" @click="pre = !pre">feeds object</a>
      <pre class="text-white" v-if="pre">{{feeds}}</pre>
    </div>
    <div class="w-full h-full flex align-center">
      <Feed v-if="authenticated && feeds"
      :feed="feeds[0]"
      class="m-auto"
      ref="feed"
      @scroll.native="(e) => socket.emit('scroll', $refs.feed.$el.scrollTop)"/>
    </div>
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';
import gql from 'graphql-tag';
import axios from 'axios';
import io from 'socket.io-client';
import {createSocket} from '../helpers/createSocket'

export default {
  name: 'App',
  data() {
    return {
      pre: false,
      password: '',
      authenticated: false,
      socket: null
    }
  },
  components: {
    Feed
  },
  async mounted() {
    if(this.$auth.token) {
      this.socket = await createSocket();
      this.authenticated = true;
    }
  },
  async login() {
      await this.$auth.login(this.password);
      this.authenticated = true;
  },
  apollo: {
      feeds: gql`
          query {
              feeds {
                  Posts {
                    id,
                    Person {Username, Location, ProfilePicture {name, width, height, url}},
                    Description,
                    Media {name, width, height, url},
                    Comments {Username, Text},
                    Likes,
                    Liked,
                    Timestamp
                  }
              } 
          }
      `
  }
}
</script>