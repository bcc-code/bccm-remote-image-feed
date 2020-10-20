<template>
  <div class="flex flex-col w-full h-full bg-white-100">
    <div class="absolute right-0 p-12">
      <button @click="$router.push({ path: '/login'})" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Login
      </button>
    </div>
    <div class="w-full h-full flex items-center justify-center">
      <div v-for="feed in feeds" :key="feed.Identifier"
      class="my-6 ">
        <p class="text-2xl">{{feed.Identifier}}</p>
        <button @click="$router.push({ path: feed.Identifier + '/control'})" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Control
        </button>
        <button @click="$router.push({ path: feed.Identifier + '/control'})" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Live
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import gql from 'graphql-tag';
export default {
  name: 'Home',
  data() {
    return {
      password: '',
      authenticated: !!this.$api.token,
    }
  },
  methods: {
    async login() {
        await this.$api.login(this.password);
        this.authenticated = true;
    },
  },
  apollo: {
      feeds: {
        query: gql`
          query Feeds {
            feeds {
              Identifier
            } 
          }
        `
      }
  }
}
</script>
