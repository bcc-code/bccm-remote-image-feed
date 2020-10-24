<template>
    <div 
    class="m-8 bg-white overflow-scroll no-scrollbar" style="width:375px; height: 750px">
        <div class="flex flex-col pt-8">
            <Post
            v-for="(post, index) in feed.Posts"
            :key="post.id"
            :post="post"
            :index="index"
            :ref="'post'+post.id"/>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Post from './Post.vue';

export default {
    components: {Post},
    props: ['feed', 'post-states']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
