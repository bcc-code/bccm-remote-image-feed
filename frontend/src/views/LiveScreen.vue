<template>
  <div style="width: 1920px; height: 1080px;">
    <div class="w-full h-full flex align-center">
      <Feed v-if="authenticated && feed"
      :feed="feed"
      style="transform: scale(1.44)"
      class="m-auto"
      ref="feed"/>
    </div>
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';
import gql from 'graphql-tag';
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
    if(this.$api.token) {
      await this.$api.ensureSocket();
      this.$api.socket.on('scroll', this.scrollHandler);
      this.$api.socket.on('slideChange', this.slideChangeHandler);
      this.$api.socket.on('play', this.playHandler);
      this.authenticated = true;
    }
  },
  destroyed() {
    this.$api.socket.off('scroll', this.scrollHandler);
    this.$api.socket.off('slideChange', this.slideChangeHandler);
    this.$api.socket.off('play', this.playHandler);
  },
  methods: {
      scrollHandler(v) {
        this.$refs.feed.$el.scrollTop = v;
      },
      slideChangeHandler(e) {
        this.$refs.feed.$refs['post' + e.postId][0].swiper.slideTo(e.activeIndex)
      },
      playHandler(e) {
        this.$refs.feed.$refs['post' + e.postId][0].$refs['media'+e.url][0].play()
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