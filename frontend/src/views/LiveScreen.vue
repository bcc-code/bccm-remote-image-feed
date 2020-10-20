<template>
  <div style="width: 1920px; height: 1080px;">
    <div class="w-full h-full flex align-center">
      <Feed v-if="authenticated && feeds"
      :feed="feeds[0]"
      class="m-auto"
      ref="feed"/>
    </div>
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';
import gql from 'graphql-tag';

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
    if (this.$route.query.pass) {
      await this.$api.login('screens@bcc.online', this.$route.query.pass);
    }
    if(this.$api.token) {
      await this.$api.ensureSocket();
      this.$api.socket.on('scroll', this.scrollHandler);
      this.$api.socket.on('slideChange', this.slideChangeHandler);
      this.authenticated = true;
    }
  },
  destroyed() {
    this.$api.socket.off('scroll', this.scrollHandler);
    this.$api.socket.off('slideChange', this.slideChangeHandler);
  },
  methods: {
      scrollHandler(v) {
        console.log("live: scrollHandler");
        this.$refs.feed.$el.scrollTop = v
      },
      slideChangeHandler(e) {
        console.log("live: slideChangeHandler");
        this.$refs.feed.$refs['post' + e.postId][0].swiper.slideTo(e.activeIndex)
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