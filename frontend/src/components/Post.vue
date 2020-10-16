<template>
    <div class="shadow-post bg-black mx-4 my-8 rounded">
        <PostPerson :style="headerBG" class="bg-no-repeat bg-contain bg-right-top px-5 pt-5 pb-2" :person="post.Person"></PostPerson>
        
        <swiper class="p-5" ref="mySwiper" :options="swiperOptions">
            <swiper-slide 
            v-for="media in post.Media"
            :key="media.url">
                <PostMedia :media="media"/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-if="post.Media.length > 1"></div>
        </swiper>
        <p :style="footerBG" class="bg-no-repeat bg-contain bg-left-bottom px-5 pt-2 pb-5 text-xl font-light">{{post.Description}}</p>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import PostMedia from './PostMedia.vue';
import PostPerson from './PostPerson.vue';

const footerImages = [
    'footer6.png',
    'footer7.png',
    'footer10.png',
    'footer11.png',
    'footer12.png'
];

const headerImages = [
    'header8.png',
    'header9.png',
    'header13.png',
    'header14.png',
    'header15.png'
];

export default {
    components: {PostMedia, PostPerson},
    props: ['post'],
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                },
            }
        }
    },
    computed: {
        footerBG() {
            const image = footerImages[this.post.id % footerImages.length];
            return `background-image: url('${this.getImageUrl(image)}')`
        },
        headerBG() {
            const image = headerImages[this.post.id % headerImages.length];
            return `background-image: url('${this.getImageUrl(image)}')`
        }
    },
    methods: {
        getImageUrl(image) {
            return require('../assets/images/post/'+image)
        }
    }
};
</script>