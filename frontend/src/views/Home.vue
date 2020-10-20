<template>
  <div class="w-full h-full bg-gray-900">
      <input placeholder="Enter password" v-model="password" @keydown.enter="login()" type="password"/>
      <button @click="$router.push('control')" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Control
      </button>
      <button @click="$router.push('live')" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Live
      </button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      password: '',
      authenticated: !!this.$auth.token,
    }
  },
  methods: {
    async login() {
        await this.$auth.login(this.password);
        this.authenticated = true;
    },
  }
}
</script>
