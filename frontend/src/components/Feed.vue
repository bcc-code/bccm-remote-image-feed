<template>
    <div style="position: absolute; top: 100px; left: 1000px; width:414px;"
    class="w-24 m-8 bg-white bg-opacity-25 rounded-xl">
        <a href="#" @click="pre = !pre">feed object</a> <pre v-if="pre">{{feed}}</pre>
        <div class="flex flex-col text-white">
            <Post
            v-for="post in feed.Posts"
            :key="post.id"
            :post="post"/>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Post from './Post.vue';

export default {
    components: {Post},
    props: ['feed'],
    data() {
        return {
            pre: false
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
