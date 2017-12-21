// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;


/* eslint-disable no-new */
let VM = new Vue({
    el: '#app',
    router,
    data: {
        showLoading: false
    },
    template: '<App :loading="showLoading"/>',
    components: {App}
});

// 设置页面标题
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    VM.showLoading = true;
    next();
});

router.afterEach ((to, from) => {
    VM.showLoading = false;
});


