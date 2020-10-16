<template>
    <div style="position: absolute; top: 50px; left: 1000px; width:414px; height: 750px"
    class="w-24 m-8 bg-white bg-opacity-25 rounded-xl overflow-scroll no-scrollbar">
        <div class="flex flex-col text-white pt-8">
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
