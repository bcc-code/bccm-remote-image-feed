<template>
    <div class="flex items-center">
        <img :src="url" class="inline object-cover w-12 h-12 mr-2 rounded-full"/>
        <div>
            <p class="text-xl font-medium leading-none">{{person.Username}}</p>
            <p class="text-lg">{{person.Location}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['person'],
    computed: {
        url() {
            return process.env.VUE_APP_MEDIA_BASE_URL + this.person.ProfilePicture.url
        }
    }
};
</script>

