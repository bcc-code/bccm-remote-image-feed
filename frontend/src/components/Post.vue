<template>
    <div class="my-8" >
        <PostPerson class="px-2 pb-2" :person="post.Person"></PostPerson>
        
        <swiper ref="mySwiper" @slideChange="slideChange" :options="swiperOptions">
            <swiper-slide 
            v-for="media in post.Media"
            :key="media.url">
                <PostMedia :ref="'media'+media.url" :media="media" @play="play(media)"/>
            </swiper-slide>
            <div v-if="post.Media.length > 1" slot="pagination" :class="'swiper-pagination-'+post.id" class="mt-6 swiper-pagination" style="position:relative" ></div>
            <div v-else slot="pagination" class="mt-12 w-full h-1">a</div>
        </swiper>
        <div class="mx-4 mb-3">
            <div class="flex z-10 relative w-full" style="top: -2rem; margin-bottom: -2rem">
                <ClickableHeart class="mr-3" v-model="post.Liked"/>
                <Comment class="mr-3" />
                <Share class="flex-grow"/>
                <Bookmark class=""/>
            </div>
        </div>
        <div class="mx-4">
            <p class="text-xl mb-1" v-if="post.Likes">{{post.Likes}} likes</p>
            <PostComment class="mb-2" :hashtags="true" :comment="{ Username: post.Person.Username, Text: post.Description }"/>
            <PostComment
            v-for="comment in post.Comments"
            :key="comment.Text"
            :comment="comment"/>
            <p class="mt-2 text-sm">
                {{time}}
            </p>
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
import {getRelativeTime} from '../helpers/time';

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
    },
    methods: {
        slideChange() {
            var activeIndex = this.$refs.mySwiper.swiperInstance.activeIndex;
            this.$eventBus.$emit('slideChange', {postId: this.post.id, activeIndex});
        },
        play(media) {
            this.$eventBus.$emit('play', {postId: this.post.id, url: media.url});
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiperInstance
        },
        time() {
            console.log(this.post.Timestamp)
            return getRelativeTime(new Date(this.post.Timestamp));
        }
    }
};
</script>