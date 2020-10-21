<template>
    <div v-if="type === 'video'">
        <video @ended="playing = false" @pause="playing = false" ref="video" width="100%" playsinline>
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
        }
    },
    computed: {
        url() {
            return process.env.VUE_APP_MEDIA_BASE_URL + this.media.url
        },
        type() {
            switch(this.media.url.split('.').pop().toLowerCase()) {
                case 'mp4':
                case 'webm':
                case 'mov':
                case 'avi':
                case 'flv':
                case 'wmv':
                    return 'video';
                    break;
                default:
                    return 'image';
                    break;
            }
        }
    }
};
</script>


<style>
.filter-shadow {
    filter: drop-shadow( 0 0 0.5rem  rgba(0, 0, 0, .2));
}
</style>