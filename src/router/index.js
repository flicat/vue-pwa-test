import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: '大埔河长制'
            },
            component: () => import('@/components/index')
        },
        {
            path: '/map-info',
            name: 'mapInfo',
            meta: {
                title: '地图信息'
            },
            component: () => import('@/components/mapInfo')
        },
        {
            path: '/river-list',
            name: 'riverList',
            meta: {
                title: '河湖名录'
            },
            component: () => import('@/components/riverList')
        },
        {
            path: '/my-report',
            name: 'myReport',
            meta: {
                title: '我的爆料'
            },
            component: () => import('@/components/myReport')
        },
        {
            path: '/article-list',
            name: 'articleList',
            meta: {
                title: '列表信息'
            },
            component: () => import('@/components/articleList')
        },
        {
            path: '/article-detail/:id',
            name: 'articleDetail',
            props: true,
            meta: {
                title: '详细信息'
            },
            component: () => import('@/components/articleDetail')
        }
    ]
});

// 设置页面标题
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router;
