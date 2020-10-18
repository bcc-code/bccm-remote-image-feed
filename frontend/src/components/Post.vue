<template>
    <div class="my-8" >
        <PostPerson class="px-2 pb-2" :person="post.Person"></PostPerson>
        
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide 
            v-for="media in post.Media"
            :key="media.url">
                <PostMedia :media="media"/>
            </swiper-slide>
            <div v-if="post.Media.length > 1" slot="pagination" :class="'swiper-pagination-'+post.id" class="mt-6 swiper-pagination" style="position:relative" ></div>
            <div v-else slot="pagination" class="mt-12 w-full h-1">a</div>
        </swiper>
        <div class="mx-4">
            <div class="flex z-10 relative w-full" style="top: -2rem">
                <ClickableHeart class="mr-3" v-model="post.Liked"/>
                <Comment class="mr-3" />
                <Share class="flex-grow"/>
                <Bookmark class=""/>
            </div>
            <p class="text-xl" v-if="post.Likes">{{post.Likes}} likes</p>
            <PostComment :hashtags="true" :comment="{ Username: post.Person.Name, Text: post.Description }"/>
            <p class="text-sm">A few days ago</p>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import PostMedia from './PostMedia.vue';
import PostPerson from './PostPerson.vue';
import PostComment from './PostComment.vue';
import ClickableHeart from './icons/ClickableHeart';
import Comment from './icons/Comment';
import Share from './icons/Share';
import Bookmark from './icons/Bookmark';
import RichText from './RichText';

export default {
    components: {PostMedia, PostPerson, PostComment, ClickableHeart, Comment, Share, Bookmark, RichText},
    props: ['post'],
    data() {
        return {
            liked: this.post.Liked ?? false,
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination-'+this.post.id
                },
            }
        }
    }
};
</script>