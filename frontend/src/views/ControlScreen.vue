<template>
  <div class="w-full h-full bg-gray-900">
    <div class="w-full h-full flex align-center">
      <Feed v-if="authenticated && feeds"
      :feed="feeds[0]"
      class="m-auto"
      ref="feed"
      @scroll.native="(e) => $api.socket.emit('scroll', $refs.feed.$el.scrollTop)"/>
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
      identifier: this.$route.params.feedIdentifier,
      password: '',
      authenticated: false
    }
  },
  components: {
    Feed
  },
  async mounted() {
    if (this.$api.token) {
      await this.$api.ensureSocket();
      this.$eventBus.$on('slideChange', this.slideChangeHandler);
      this.$eventBus.$on('play', this.playHandler);
      this.authenticated = true;
    }
  },
  destroyed() {
    this.$eventBus.$off('slideChange', this.slideChangeHandler);
    this.$eventBus.$off('play', this.playHandler);
  },
  methods: {
      slideChangeHandler(state) {
        console.log("control: slideChangeHandler");
        this.$api.socket.emit('slideChange', state);
      },
      playHandler(state) {
        console.log("control: playHandler");
        this.$api.socket.emit('play', state);
      }
  },
  apollo: {
      feeds: {
        variables() {
          return {
            identifier: this.identifier
          }
        },
        query: gql`
          query Feed ($identifier: String!) {
            feeds(where: {Identifier: $identifier}) {
              Identifier,
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
}
</script>