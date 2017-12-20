import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/components/index')
        },
        {
            path: '/map-info',
            name: 'mapInfo',
            component: () => import('@/components/mapInfo')
        },
        {
            path: '/river-list',
            name: 'riverList',
            component: () => import('@/components/riverList')
        },
        {
            path: '/my-report',
            name: 'myReport',
            component: () => import('@/components/myReport')
        },
        {
            path: '/article-list',
            name: 'articleList',
            component: () => import('@/components/articleList')
        },
        {
            path: '/article-detail/:id',
            name: 'articleDetail',
            props: true,
            component: () => import('@/components/articleDetail')
        }
    ]
});
