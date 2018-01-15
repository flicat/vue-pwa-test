<template>
    <section class="flex">
        <article class="flex-content" ref="wrap">
            <ul v-if="list && list.length" class="river-list">
                <li class="river-item" v-for="river in list">
                    <router-link :to="'/river-info/' + river.id">
                        <img :src="river.thumb" alt="" @error="$event.target.src=require('../assets/images/default.png')" class="thumb">
                        <p class="name">{{river.name}}</p>
                        <div class="label-wrap clear">
                            <span v-if="river.area" class="label text-clip-2 area">{{river.area}}</span>
                            <span v-if="river.length" class="label text-clip-2 length">{{river.length}}Km</span>
                            <span v-if="river.decs" class="label text-clip-2 decs">{{river.decs}}</span>
                            <span v-if="river.from" class="label text-clip-2 from">起点：{{river.from}}</span>
                            <span v-if="river.end" class="label text-clip-2 end">终点：{{river.end}}</span>
                        </div>
                    </router-link>
                    <a href="javascript:;" class="btn-follow text-hide" @click="follow(river)"
                       :class="{active: river.follow===1}">关注</a>
                </li>
            </ul>
            <div class="box" v-else-if="ready"><span>暂无数据</span></div>
        </article>

        <loading @load="getData" :wrap="getWrap"></loading>
        <go-top :wrap="getWrap"></go-top>
    </section>
</template>

<script>
    import Vue from 'vue';
    import Loading from '@/widget/loading';
    import goTop from '@/widget/goTop';
    import ajax from '@/config/fetch'

    export default {
        name: 'allRiverList',
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
        created() {
            this.$store.dispatch('initAll');
        },
        data() {
            return this.$store.state.allRiver;
        },
        methods: {
            getData (callback) {
                this.$store.dispatch('getDataAll', callback);
            },
            // 点击收藏
            follow(river) {
                let follow = !(river.follow - 0) - 0;

                ajax.follow({
                    data: {
                        code: this.$store.state.Global.code,
                        appid: this.$store.state.Global.appid,
                        follow: follow,
                        river_id: river.id
                    }
                }).then(data => {
                    if (data) {
                        Vue.set(river, 'follow', follow);
                    }
                });

            },
            getWrap() {
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
            //height: (138 / @rem);
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
                line-height: (40 / @rem);
                max-width: 100%;
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
