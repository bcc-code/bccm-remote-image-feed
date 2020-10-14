<template>
  <div class="bg-blue-900 w-screen h-screen">
    <Feed/>
  </div>
</template>

<script>
import Feed from './components/Feed.vue'

export default {
  name: 'App',
  components: {
    Feed
  }
}
</script>

<style>
@import 'assets/css/tailwind.css';
</style>