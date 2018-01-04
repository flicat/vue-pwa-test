<template>
    <div class="box">
        <section class="flex">
            <article class="flex-content" ref="wrap">
                <ul class="report-list" v-if="list && list.length">
                    <li class="report-item" v-for="item in list" :key="item.id">
                        <router-link :to="'/report-info/' + item.id">
                            <img class="user-photo"
                                 :src="item.userInfo ? item.userInfo.headImage : require('../assets/images/icon-riverer.png')"
                                 @error="$event.target.src=require('../assets/images/icon-riverer.png')" />
                            <p class="user-name">{{item.userInfo ? item.userInfo.name : ''}}</p>
                            <p class="decs">{{item.decs}}</p>
                            <p class="album clear" v-if="item.album && item.album.length">
                                <img v-for="src in item.album" :src="src" @error="$event.target.src=require('../assets/images/default.png')" alt="">
                            </p>
                        </router-link>
                        <div class="location-action clear">
                            <p class="location pull-left">位置：{{item.location}}</p>

                            <!--TODO 评论&点赞-->
                            <div class="btn-action pull-right" @click="$refs['act-popup-' + item.id][0].classList.toggle('hide')">
                                <p class="action-wrap row hide" :ref="'act-popup-' + item.id">
                                    <span class="btn-like col-6"><i class="icon"></i>赞</span>
                                    <span class="btn-comment col-6"><i class="icon"></i>评论</span>
                                </p>
                            </div>

                        </div>

                        <div class="comment-wrap" v-if="(item.likes && item.likes.length) || (item.comment && item.comment.length)">
                            <div class="likes clear" v-if="item.likes && item.likes.length">
                                <i class="icon icon-like pull-left"></i>
                                <span class="like pull-left" v-for="(like, i) in item.likes">
                                        {{like}}
                                        {{i === item.likes.length - 1 ? '' : ','}}
                                    </span>
                            </div>
                            <ul class="comments" v-if="item.comment && item.comment.length">
                                <li class="comment-item" v-for="comment in item.comment">
                                    <template v-if="comment.reply">
                                        <em>{{comment.user}}</em> 回复 <em>{{comment.reply}}</em>: {{comment.message}}
                                    </template>
                                    <template v-else>
                                        <em>{{comment.user}}</em>: {{comment.message}}
                                    </template>
                                </li>
                            </ul>
                        </div>

                        <p class="date">{{getDate(item.date)}}</p>
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
    import Loading from '@/widget/loading';                      // 下拉加载loading
    import goTop from '@/widget/goTop';                          // 返回顶部按钮
    import getTimeStr from '@/plugins/time_format.js';           // 时间字符串插件
    import store from '@/vuex/reportList';

    let mixin = {
        methods: {
            getDate (str) {
                let date = new Date(str);
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
            'loading': Loading,                        // 下拉加载loading
            'go-top': goTop                           // 返回顶部按钮
        },
        beforeMount () {
            this.$emit('loading', !(this.list && this.list.length || this.ready));
        },
        updated () {
            this.$emit('loading', !(this.list && this.list.length || this.ready));
        },
        created () {
            this.$store.dispatch('init');// 初始化加载数据
        },
        data () {
            return this.$store.state;
        },

        methods: {
            getData (callback) {
                this.$store.dispatch('getData', callback);
            },
        }
    };

</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    .report-list {
        padding-left: (15 / @rem);

        .report-item {
            position: relative;
            padding: (30 / @rem) (15 / @rem) (30 / @rem) (92 / @rem);
            border-bottom: 1px solid #e5e5e7;

            &:last-child {
                border-bottom: 0 none;
            }

            a {
                text-decoration: none;
            }
            .user-photo {
                position: absolute;
                left: 0;
                top: (30 / @rem);
                display: block;
                width: (72 / @rem);
                height: (72 / @rem);
                vertical-align: top;
            }

            p {
                line-height: 1.3em;
                word-break: break-all;
            }
            .user-name {
                font-size: (34 / @rem);
                color: #3f5a6e;
            }
            .decs {
                font-size: (26 / @rem);
                color: #333;
            }

            .album {
                margin: (10 / @rem) 0;

                img {
                    float: left;
                    width: (174 / @rem);
                    height: (144 / @rem);
                    margin-left: (8 / @rem);

                    &:nth-child(3n-2) {
                        margin-left: 0;
                    }

                    &:nth-child(n+4) {
                        margin-top: (8 / @rem);
                    }
                }
            }

            .location {
                font-size: (28 / @rem);
                color: #0168b7;
                line-height: 1.5em;
            }
            .date {
                position: absolute;
                right: (128 / @rem);
                top: (40 / @rem);
                font-size: (26 / @rem);
                color: #a6a6a6;
                line-height: 1em;
            }

            .state {
                position: absolute;
                right: (15 / @rem);
                top: (10 / @rem);
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

            .btn-action {
                position: relative;
                z-index: 10;
                width: (60 / @rem);
                height: (48 / @rem);
                background: url(../assets/images/icon-action.png) no-repeat 100% 50%;
                background-size: (40 / @rem);

                .action-wrap {
                    position: absolute;
                    z-index: 11;
                    top: (-10 / @rem);
                    right: (56 / @rem);
                    width: (278 / @rem);
                    padding: (13 / @rem) 0;
                    background-color: #3c5162;
                    border-radius: 5px;

                    .btn-like,
                    .btn-comment {
                        .icon {
                            display: inline-block;
                            margin-right: 0.3em;
                            vertical-align: middle;
                        }

                        height: (40 / @rem);
                        line-height: (40 / @rem);
                        font-size: (26 / @rem);
                        text-align: center;
                        color: #fff;
                    }

                    .btn-like {
                        border-right: 1px solid #202c37;
                        .icon {
                            width: (30 / @rem);
                            height: (28 / @rem);
                            background: url(../assets/images/icon-likes.png) no-repeat 0 0;
                            background-size: 100%;
                        }
                    }
                    .btn-comment {
                        .icon {
                            width: (34 / @rem);
                            height: (30 / @rem);
                            background: url(../assets/images/icon-comment.png) no-repeat 0 0;
                            background-size: 100%;
                        }
                    }
                }
            }

            .comment-wrap {
                width: 100%;
                position: relative;
                background-color: #f3f3f5;

                &::before {
                    content: '';
                    position: absolute;
                    left: (27 / @rem);
                    top: 0;
                    display: block;
                    width: (10 / @rem);
                    height: (10 / @rem);
                    background-color: #f3f3f5;
                    transform: rotate(-45deg);
                    transform-origin: 0 0;
                }

                .likes,
                .comments {
                    padding: (8 / @rem) (20 / @rem);
                    line-height: (36 / @rem);
                }
                .likes + .comments {
                    border-top: 1px solid #dfdfdf;
                }
                .likes {
                    .like {
                        font-size: (28 / @rem);
                        color: #5c83a0;
                    }
                    .icon-like {
                        width: (22 / @rem);
                        height: (20 / @rem);
                        background: url(../assets/images/icon-like-sm.png) no-repeat 0 0;
                        background-size: 100% 100%;
                        margin: (8 / @rem) (10 / @rem) 0 0;
                    }
                }

                .comments {
                    font-size: (28 / @rem);
                    color: #333;

                    em {
                        font-style: normal;
                        color: #5c83a0;
                    }
                }
            }
        }
    }


</style>
