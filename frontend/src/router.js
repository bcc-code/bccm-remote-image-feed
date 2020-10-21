import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import ControlScreen from './views/ControlScreen.vue';
import LiveScreen from './views/LiveScreen.vue';
import api from './api';

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
router.beforeEach(async (to, from, next) => {
    if (to.query.pass) {
      await api.login('screens@bcc.online', to.query.pass);
      console.log("logged you in")
      return next();
    }
    else if (to.name !== 'Login' && !localStorage.getItem('STRAPI_TOKEN')){
        return next({ name: 'Login' })
    }
    else return next()
});