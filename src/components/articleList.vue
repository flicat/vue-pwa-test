<template>
    <div class="wrap box">
        <header>
            <h1>{{title}}</h1>
            <a href="javascript:;" class="btn-menu"></a>
        </header>
        <section class="flex">
            <div class="flex-content" ref="wrap">
                <ul class="news-list" v-if="list && list.length">
                    <li class="news-item" v-for="item in list" :key="item.id" :class="{'no-pic': !item.album}">
                        <router-link :to="'/article-detail/' + item.id">
                            <img :src="item.album" v-if="item.album" alt="" class="photo">
                            <p v-if="item.title" class="title text-clip">{{item.title}}</p>
                            <p v-if="item.decs" class="decs text-clip-2">{{item.decs}}</p>
                            <p v-if="item.date" class="time text-clip">{{getDate(item.date)}}</p>
                        </router-link>
                    </li>
                </ul>
                <div class="box" v-else-if="ready"><span>暂无数据</span></div>
                <full-loading v-else></full-loading>
            </div>
        </section>
        <loading @load="getData" :wrap="getWrap"></loading>
        <go-top :wrap="getWrap"></go-top>
    </div>
</template>

<script>
    import Loading from '@/widget/loading';
    import FullLoading from '@/widget/full-loading';             // loading遮罩
    import goTop from '@/widget/goTop';

    // 获取栏目列表
    async function getColumn () {
        let url = new URL('http://conf.free.ngrok.cc/cmsMenuController.do?cmsMenuList');

        let res = await fetch(url);
        let data = await res.json();

        if(data && data.state === 200) {
            let current = data.data.find(item => {
                return item.id === this.id;
            });
            if(current) {
                this.title = current.name;
                document.title = current.name;
            }
        }
    }

    // 获取文章列表
    async function getData (callback) {

        if(!this.pageTotal || this.pageIndex <= this.pageTotal) {

            let url = new URL('http://conf.free.ngrok.cc/cmsArticleController.do');
            url.search = [
                'cmsArticleList',
                ['columnId', this.id].join('='),
                ['pageIndex', this.pageIndex++].join('='),
                ['pageSize', this.pageSize].join('=')
            ].join('&');

            let res = await fetch(url);
            let data = await res.json();

            // 数据已经加载完成
            this.ready = true;

            callback && callback();

            if(data.state === 200 && data.data.list && data.data.list.length) {
                this.pageTotal = data.data.pageTotal;

                if(Array.isArray(this.list)) {
                    this.list = this.list.concat(data.data.list);
                } else {
                    this.list = data.data.list;
                }
            } else {
                alert('没有更多数据！');
            }

        } else {
            callback && callback();
            alert('没有更多数据！');
        }

    }

    export default {
        name: 'articleList',
        props: ['id'],
        components: {
            'loading': Loading,
            'full-loading': FullLoading,               // loading遮罩
            'go-top': goTop
        },
        created () {
            getData.bind(this)();
            getColumn.bind(this)();
        },
        data () {
            return {
                ready: false,                   // 是否加载完成
                list: null,
                title: null,

                pageIndex: 1,
                pageSize: 10,
                pageTotal: null
            };
        },
        methods: {
            getData,
            getDate (str) {
                let date = new Date(Number(str));
                return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
            },
            getWrap () {
                return this.$refs.wrap;
            }
        }
    };

</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    header {
        position: relative;
        width: 100%;
        height: (90 / @rem);
        line-height: (90 / @rem);
        background-color: #0168b7;

        h1 {
            margin: 0;
            padding: 0;
            color: #fff;
            font-size: (40 / @rem);
            margin-left: (15 / @rem);
        }

        .btn-menu {
            position: absolute;
            z-index: 1;
            right: 0;
            top: 0;
            display: block;
            width: (90 / @rem);
            height: (90 / @rem);
            background: url(../assets/images/icon-menu.png) no-repeat 50% 50%;
            background-size: (36 / @rem);
        }
    }
    .news-list {
        margin: 0;
        padding: 0 0 0 (15 / @rem);
        list-style: none;

        .news-item {
            position: relative;
            display: block;
            padding: (30 / @rem) 0 (30 / @rem) (280 / @rem);
            border-bottom: 1px solid #e5e5e7;

            &.no-pic {
                padding-left: 0;
            }

            &:last-child {
                border-bottom: 0 none;
            }
            .photo {
                position: absolute;
                left: 0;
                top: (30 / @rem);
                width: (240 / @rem);
                height: (162 / @rem);
            }

            a {
                text-decoration: none;
            }
            p {
                margin: 0;
            }
            .title {
                font-size: (32 / @rem);
                color: #000;
                line-height: 1.8em;
            }
            .decs {
                font-size: (26 / @rem);
                color: #636363;
                line-height: 1.3em;
            }
            .time {
                font-size: (24 / @rem);
                color: #a6a6a6;
                line-height: 2em;
            }
        }
    }



</style>
