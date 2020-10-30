<template>
  <div class="w-full h-full bg-gray-900">
    <div class="w-full h-full flex align-center">
      <Feed v-if="authenticated && feed"
      :feed="feed"
      class="m-auto rounded-xl "
      ref="feed"
      @scroll.native="(e) => $api.socket.emit('scroll', $refs.feed.$el.scrollTop)"/>
    </div>
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';
import gql from 'graphql-tag';
import axios from 'axios';
import * as mediaHelper from '../helpers/mediaHelper';

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
      },
      getValidMedia(medias) {
        return medias.filter(m => !mediaHelper.isVideo(m) || mediaHelper.hasVp9(m));
      },
      getValidPosts(posts) {
        return posts.filter(p => {
          p.Media = this.getValidMedia(p.Media);
          return p.Media && p.Media.length > 0
        });
      }
  },
  computed: {
    feed() {
      if(!this.feeds || !this.feeds[0])
        return undefined;

      let clone = JSON.parse(JSON.stringify(this.feeds[0]));
      clone.Posts = this.getValidPosts(clone.Posts);
      return clone;
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
                Media {name, width, height, url, formats, ext},
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