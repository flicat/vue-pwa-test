<template>
    <div class="box">
        <section class="flex">
            <article class="flex-content" ref="wrap">
                <ul class="report-list" v-if="list && list.length">
                    <li class="report-item" v-for="item in list" :key="item.id">
                        <router-link :to="'/report-info/' + item.id">
                            <p class="decs">{{item.decs}}</p>
                            <p class="album clear" v-if="item.album && item.album.length">
                                <img v-for="src in item.album" :src="src" @error="$event.target.src=require('../assets/images/default.png')" alt="">
                            </p>
                        </router-link>
                        <p class="date">{{getDate(item.date)}}</p>
                        <p class="location">位置：{{item.location}}</p>
                        <i class="state" :class="{active: item.state==='process', done: item.state==='done'}"></i>
                    </li>
                </ul>
                <div class="box" v-else-if="ready"><span>暂无数据</span></div>
            </article>
        </section>
        <loading @load="getData" :wrap="getWrap"></loading>
        <go-top :wrap="getWrap"></go-top>
    </div>
</template>

<script>
    import Loading from '@/widget/loading';
    import goTop from '@/widget/goTop';
    import getTimeStr from '@/plugins/time_format.js';           // 时间字符串插件
    import store from '@/vuex/myReport';


    let mixin = {
        methods: {
            getDate (str) {
                let date = new Date(Number(str));
                return getTimeStr(date);
            },
            getWrap () {
                return this.$refs.wrap;
            }
        }
    };

    export default {
        name: 'myReport',
        store,
        mixins: [mixin],
        components: {
            'loading': Loading,
            'go-top': goTop
        },
        beforeMount () {
            this.$emit('loading', !(this.list && this.list.length || this.ready));
        },
        updated () {
            this.$emit('loading', !(this.list && this.list.length || this.ready));
        },
        created () {
            this.$store.dispatch('init');
        },
        data () {
            return this.$store.state;
        },

        methods: {
            getData (callback) {
                this.$store.dispatch('getData', callback);
            }
        }
    };

</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    .report-list {
        padding-left: (15 / @rem);

        .report-item {
            position: relative;
            padding: (30 / @rem) (105 / @rem) (30 / @rem) (15 / @rem);
            border-bottom: 1px solid #e5e5e7;

            &:last-child {
                border-bottom: 0 none;
            }

            a {
                text-decoration: none;
            }
            p {
                line-height: 1.3em;
                word-break: break-all;
            }
            .decs {
                font-size: (28 / @rem);
                color: #333;
            }

            .album {
                margin: (10 / @rem) 0;

                img {
                    float: left;
                    width: (174 / 538 * 100%);
                    height: auto;
                    margin-left: (8 / 538 * 100%);

                    &:nth-child(3n-2) {
                        margin-left: 0;
                    }

                    &:nth-child(n+4) {
                        margin-top: (8 / 538 * 100%);
                    }
                }
            }

            .location {
                font-size: (26 / @rem);
                color: #0168b7;
                line-height: 1.5em;
            }
            .date {
                font-size: (26 / @rem);
                color: #a6a6a6;
                line-height: 1em;
            }

            .state {
                position: absolute;
                right: (15 / @rem);
                top: (30 / @rem);
                display: block;
                width: (102 / @rem);
                height: (60 / @rem);

                &.active {
                    background: url(../assets/images/icon-state-active.png) no-repeat 0 0;
                    background-size: 100%;
                }

                &.done {
                    background: url(../assets/images/icon-state-done.png) no-repeat 0 0;
                    background-size: 100%;
                }
            }

        }
    }


</style>
