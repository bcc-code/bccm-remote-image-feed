<template>
    <div v-if="type === 'video'">
        <video @ended="playing = false" @pause="playing = false" :autoplay="!!media.autoplay" ref="video" width="100%" playsinline>
            <source :src="url" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div v-if="!playing" @click="play()" class="absolute text-white hover:text-gray-200 cursor-pointer" style="top:50%; left: 50%; transform:translate(-50%, -50%);">
            <svg class="fill-current filter-shadow" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>
        </div>
    </div>
    <div v-else-if="type === 'image'">
        <img :src="url" width="100%"/>
    </div>
</template>

<script>
import * as mediaHelper from '../helpers/mediaHelper';
export default {
    props: ['media'],
    data() {
        return {
            playing: false
        }
    },
    methods: {
        play() {
            this.$refs.video.play();
            this.playing = true;
            this.$emit('play');
            console.log("playing video");
            console.log(this.url)
        }
    },
    computed: {
        file() {
            if (this.type !== 'video')
                return this.media;
            
            if (!this.$route.path.toLowerCase().includes("/live")) {
                return this.media;
            }

            // show vp9 for caspar
            return this.media.formats.vp9;
        },
        url() {
            if(this.file.url.indexOf('https://') !== -1 || this.file.url.indexOf('http://') !== -1) {
                return this.file.url;
            }
            return process.env.VUE_APP_MEDIA_BASE_URL + this.file.url
        },
        type() {
            console.log(this.media.ext);
            return mediaHelper.isVideo(this.media) ? 'video' : 'image';
        }
    }
};
</script>


<style>
.filter-shadow {
    filter: drop-shadow( 0 0 0.5rem  rgba(0, 0, 0, .2));
}
</style>