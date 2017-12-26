import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
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
            path: '/river-info/:id',
            name: 'riverInfo',
            props: true,
            meta: {
                title: '河湖详情'
            },
            component: () => import('@/components/riverInfo')
        },
        {
            path: '/riverer-list',
            name: 'rivererList',
            meta: {
                title: '河长信息'
            },
            component: () => import('@/components/rivererList')
        },
        {
            path: '/riverer-info',
            name: 'rivererInfo',
            meta: {
                title: '河长信息'
            },
            component: () => import('@/components/rivererInfo')
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
            path: '/report',
            name: 'report',
            meta: {
                title: '我要爆料'
            },
            component: () => import('@/components/report')
        },
        {
            path: '/article-list/:id',
            name: 'articleList',
            props: true,
            meta: {
                title: '文章列表'
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
        },
        {
            path: '/report-list',
            name: 'reportList',
            meta: {
                title: '曝光台'
            },
            component: () => import('@/components/reportList')
        },
        {
            path: '/report-info/:id',
            name: 'reportInfo',
            props: true,
            meta: {
                title: '爆料详情'
            },
            component: () => import('@/components/reportInfo')
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});
