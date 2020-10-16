import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import HostScreen from './views/HostScreen.vue';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/host', component: HostScreen }
    ]
})