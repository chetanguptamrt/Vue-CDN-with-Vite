import './assets/css/bootstrap-grid@5.3.3.css';
import './assets/css/style.css';
import template from './app.template.js';
import TheHeader from './components/header/TheHeader.js';
import VueRouter from "@vue-router";
import axios from '@axios';

const { createApp } = Vue;
const { RouterView, createWebHistory, createRouter } = VueRouter;

const app = createApp({
    name: 'app',
    components: {
        RouterView,
        TheHeader
    },
    setup() { },
    template: template
});

app.config.errorHandler = async (error, info) => {
    console.error(error)
    // save error on server using axios
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'HOME', component: () => import('./components/home/Home.js') },
        { path: '/about', name: 'ABOUT', component: () => import('./components/about-us/AboutUs.js') },
    ],
    scrollBehavior() {
        return { top: 0 }
    },
});

router.onError(async (error, to, from) => {
    console.error(error)
    // save error on server using axios
});
app.use(router)

app.mount('#app');