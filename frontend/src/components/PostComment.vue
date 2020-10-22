<template>
    <p class="text-2xl leading-tight">
        <span class="font-medium mr-1">{{comment.Username}}</span>
        <RichText :hashtags="hashtags" :input="comment.Text" class="font-light"></RichText>
    </p>
</template>

<script>
import RichText from './RichText';
export default {
    props: ['comment', 'hashtags'],
    components: { RichText }
}
</script>