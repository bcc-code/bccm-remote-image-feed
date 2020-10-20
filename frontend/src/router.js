import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import ControlScreen from './views/ControlScreen.vue';
import LiveScreen from './views/LiveScreen.vue';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', name: 'Login', component: Login },
        { path: '/:feedIdentifier', component: LiveScreen },
        { path: '/:feedIdentifier/control', component: ControlScreen },
        { path: '/:feedIdentifier/live', component: LiveScreen },
        { path: '*', redirect: '/' },
    ],
});
router.external = (s) => window.location.href=s;
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem('STRAPI_TOKEN')) next({ name: 'Login' })
    else next()
});