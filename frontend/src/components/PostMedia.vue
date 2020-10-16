<template>
    <div v-if="type === 'video'">
        <video width="100%" autoplay controls>
            <source :src="url" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div v-else-if="type === 'image'">
        <img :src="url" width="100%"/>
    </div>
</template>

<script>
export default {
    props: ['media'],
    computed: {
        url() {
            return process.env.VUE_APP_MEDIA_BASE_URL + this.media.url
        },
        type() {
            switch(this.media.url.split('.').pop().toLowerCase()) {
                case 'mp4':
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

