<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input @keydown.enter="login()" v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
                    </div>
                    <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input @keydown.enter="login()" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
                    </div>
                    <div class="flex items-center justify-between">
                        <button @click="login()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                    </div>
                    <p v-if="error" class="mt-4 text-red-500 text-xs">
                        {{error}}
                    </p>
            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
        try {
            await this.$api.login(this.username, this.password);
            this.$router.push('/');
        } catch (e) {
            this.error = e
        }
    },
  },
}
</script>

<style>

</style>