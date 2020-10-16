<template>
    <div class="shadow-post bg-black mx-4 my-8 rounded">
        <PostPerson class="px-5 pt-5 pb-2" :person="post.Person"></PostPerson>
        
        <swiper class="p-5" ref="mySwiper" :options="swiperOptions">
            <swiper-slide 
            v-for="media in post.Media"
            :key="media.url">
                <PostMedia :media="media"/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-if="post.Media.length > 1"></div>
        </swiper>
        <p class="px-5 mt-2 mb-5 text-xl font-light">{{post.Description}}</p>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import PostMedia from './PostMedia.vue';
import PostPerson from './PostPerson.vue';

export default {
    components: {PostMedia, PostPerson},
    props: ['post'],
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                },
                // Some Swiper option/callback...
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
