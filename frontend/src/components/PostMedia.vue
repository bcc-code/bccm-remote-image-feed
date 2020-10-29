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
        file() {
            if (!this.type === 'video' || !this.media.formats?.vp9)
                return this.media;

            var html5Video = document.createElement('video');
            const browser_supports_canPlayType = html5Video.canPlayType;
            if (browser_supports_canPlayType) {
                var canPlayVp9 = html5Video.canPlayType( 'video/webm; codecs="vp9"' );
                var canPlayh264 = html5Video.canPlayType( 'video/mp4; codecs="avc1.42E01E"' );
                console.log('canPlayVp9:', canPlayVp9);
                console.log('canPlayh264:', canPlayh264);
                if (canPlayVp9 === "probably") {
                    return this.media.formats.vp9;
                } else if (canPlayVp9 === "maybe" && canPlayh264 === "") {
                    return this.media.formats.vp9;
                }
            }
            console.log('browser doesnt support video.canPlayType');
            return this.media;
        },
        url() {
            if(this.file.url.indexOf('https://') !== -1 || this.file.url.indexOf('http://') !== -1) {
                return this.file.url;
            }
            return process.env.VUE_APP_MEDIA_BASE_URL + this.file.url
        },
        type() {
            switch(this.media.name.split('.').pop().toLowerCase()) {
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