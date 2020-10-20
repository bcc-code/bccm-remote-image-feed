import Vue from 'vue'
import App from './App.vue'
import VueApollo from "vue-apollo";
import apolloClient from "./apollo/client";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import {router} from './router'
import VueRouter from 'vue-router';
import auth from './auth'

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VueApollo)
Vue.use(VueRouter)

Vue.prototype.$auth = auth;

console.log(Vue.prototype.$auth);

new Vue({
  apolloProvider,
  router,
  render: (h) => h(App)
}).$mount("#app");