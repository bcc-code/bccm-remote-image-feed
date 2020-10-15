import Vue from 'vue'
import App from './App.vue'
import VueApollo from "vue-apollo";
import apolloClient from "./apolloClient";
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo)

new Vue({
    apolloProvider,
    render: (h) => h(App)
}).$mount("#app");