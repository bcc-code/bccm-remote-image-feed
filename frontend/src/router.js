import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import ControlScreen from './views/ControlScreen.vue';
import LiveScreen from './views/LiveScreen.vue';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/control', component: ControlScreen },
        { path: '/live', component: LiveScreen },
    ]
})