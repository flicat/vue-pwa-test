<template>
    <section class="flex">
        <article class="flex-content" ref="wrap">
            <ul v-if="list && list.length" class="river-list">
                <li class="river-item" v-for="river in list" :key="river.id">
                    <router-link :to="'/river-info/' + river.id">
                        <img :src="river.thumb" alt="" class="thumb">
                        <p class="name">{{river.name}}</p>
                        <div class="label-wrap clear">
                            <span class="label area">{{river.area}}</span>
                            <span class="label length">{{river.length}}</span>
                            <span class="label decs">{{river.decs}}</span>
                            <span class="label from">起点：{{river.from}}</span>
                            <span class="label end">终点：{{river.end}}</span>
                        </div>
                    </router-link>
                    <a href="javascript:;" class="btn-follow text-hide" @click="follow(river)" :class="{active: river.follow===1}">关注</a>
                </li>
            </ul>
            <div class="box" v-else-if="ready"><span>暂无数据</span></div>
            <full-loading v-else></full-loading>
        </article>

        <loading @load="getData" :wrap="getWrap"></loading>
        <go-top :wrap="getWrap"></go-top>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Loading from '@/widget/loading';
    import FullLoading from '@/widget/full-loading';             // loading遮罩
    import goTop from '@/widget/goTop';
    import store from '@/vuex/allRiverList';


    // 搜索河湖列表
    async function getData (callback) {

        if(!this.pageTotal || this.pageIndex <= this.pageTotal) {

            let url = new URL('http://192.168.199.248:2001/data/river-list.json');
            url.search = [
                ['name', this.searchParam.name].join('='),
                ['town', this.searchParam.town].join('='),
                ['village', this.searchParam.village].join('='),
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
        name: 'allRiverList',
        store,
        props: ['searchParam'],
        components: {
            'loading': Loading,
            'full-loading': FullLoading,               // loading遮罩
            'go-top': goTop
        },
        created () {
            if(!this.ready) {
                getData.bind(this)();
            }
        },
        data () {
            return this.$store.state;
        },
        methods: {
            getData,

            // 父层搜索事件
            search () {
                this.pageIndex = 1;
                this.list = [];
                getData.bind(this)();
            },

            // 点击收藏
            async follow (river) {
                let follow = !(river.follow - 0) - 0;
                let url = new URL('http://192.168.199.248:2001/data/follow-result.json');

                url.search = [
                    ['follow', follow].join('='),
                    ['id', river.id].join('=')
                ].join('&');

                let res = await fetch(url);
                let data = await res.json();

                if(data.state === 200) {
                    Vue.set(river, 'follow', follow);
                }
            },
            getWrap () {
                return this.$refs.wrap;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";
    .river-list {
        padding: 0 (15 / @rem);

        .river-item {
            position: relative;
            padding: (30 / @rem) 0 (30 / @rem) (168 / @rem);
            border-bottom: 1px solid #e5e5e7;
            height: (138 / @rem);
            overflow: hidden;

            &:last-child {
                border-bottom: 0 none;
            }

            a {
                text-decoration: none;
                color: #333;
            }

            .thumb {
                position: absolute;
                left: 0;
                top: (30 / @rem);
                z-index: 1;
                width: (156 / @rem);
                height: (138 / @rem);
                vertical-align: top;
            }

            .name {
                font-size: (34 / @rem);
                font-weight: 700;
            }

            .label-wrap .label {
                float: left;
                font-size: (28 / @rem);
                height: (40 / @rem);
                line-height: (40 / @rem);
                padding: 0 0.3em;
                background-color: #eee;
                border-radius: 4px;
                margin: 0 (24 / @rem) (12 / @rem) 0;
            }

            .btn-follow {
                position: absolute;
                right: 0;
                top: (20 / @rem);
                z-index: 1;
                display: block;
                width: (60 / @rem);
                height: (60 / @rem);
                background: url(../assets/images/icon-star-gray.png) no-repeat 100% 50%;
                background-size: 52%;

                &.active {
                    background-image: url(../assets/images/icon-star.png);
                }
            }
        }
    }
</style>
