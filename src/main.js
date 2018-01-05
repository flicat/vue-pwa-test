// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex';
import sw from '@/config/serviceWorker';

Vue.config.productionTip = false;


/* eslint-disable no-new */
let VM = new Vue({
    el: '#app',
    store,
    router,
    beforeCreate: sw,
    template: '<App/>',
    components: {App}
});

// 设置页面标题
router.beforeEach((to, from, next) => {
    VM.$store.commit('loading', true);
    next();
});

router.afterEach ((to, from) => {
    document.title = `${to.meta.title}`;
    VM.$store.commit('loading', false);
});


