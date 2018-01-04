<template>
    <div class="box">
        <div class="top-menu row">
            <h2 class="title pull-left">河长信息</h2>
            <button class="btn-search text-hide pull-right" @click="showSearch=!showSearch">搜索</button>
        </div>

        <section class="flex">
            <article class="flex-content" ref="wrap">
                <ul class="riverer-info" v-if="list && list.length">

                    <li class="riverer-item row" v-for="riverer in list" :key="riverer.id">
                        <router-link :to="{name: 'rivererInfo', query: riverer}">
                            <span class="label col-4" :data-title="shortName(riverer.uname)"><em class="text-clip">{{riverer.uname}}</em></span>
                            <em class="decs col-8"><em class="text-clip">{{riverer.dname}}</em></em>
                        </router-link>
                    </li>
                </ul>
                <div class="box" v-else-if="ready"><span>暂无数据</span></div>
            </article>
        </section>

        <div class="search-form box" v-show="showSearch" @click="showSearch=!showSearch">
            <div class="search-top row" @click.stop="">
                <h3 class="title pull-left">筛选查询</h3>
                <button class="pull-right btn-close text-hide" @click="showSearch=!showSearch">取消</button>
            </div>
            <div class="flex" @click.stop="">
                <div class="flex-content">
                    <div class="form-control">
                        <label class="title">1.名字</label>
                        <div class="control-item clear">
                            <input type="text" class="search-name" v-model="searchParam.name" placeholder="请输入名字">
                        </div>
                    </div>
                    <div class="form-control">
                        <label class="title">2.镇级</label>
                        <div class="control-item clear">
                            <label class="checkbox">
                                <input type="radio" checked name="town" value="" @click="setArea(null)" v-model="searchParam.town">
                                <span>全部</span>
                            </label>
                            <label class="checkbox" v-for="town in townList">
                                <input type="radio" name="town" :value="town" @click="setArea(area[town].sub)" v-model="searchParam.town">
                                <span>{{area[town].name}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-control">
                        <label class="title">3.村级</label>
                        <div class="control-item clear">
                            <label class="checkbox">
                                <input type="radio" checked name="village" value="" v-model="searchParam.village">
                                <span>全部</span>
                            </label>
                            <label class="checkbox" v-for="village in villageList">
                                <input type="radio" name="village" :value="village" v-model="searchParam.village">
                                <span>{{subArea[village].name}}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-wrap" @click.stop="">
                <button class="btn-submit" @click="search">确定</button>
            </div>
        </div>

        <loading @load="getData" :wrap="getWrap"></loading>
        <go-top :wrap="getWrap"></go-top>

    </div>
</template>

<script>
    import Loading from '@/widget/loading';
    import goTop from '@/widget/goTop';
    import store from '@/vuex/rivererList';

    let mixin = {
        methods: {
            // 名字截取
            shortName (name) {
                return String(name).substr(-2);
            },
            getWrap () {
                return this.$refs.wrap;
            }
        }
    };

    export default {
        name: 'riverList',
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
        computed: {
            townList () {
                return this.$store.getters.townList;
            },
            villageList () {
                return this.$store.getters.villageList;
            }
        },
        methods: {
            getData (callback) {
                this.$store.dispatch('getData', callback);
            },
            // 点击搜索河流
            search () {
                this.$store.dispatch('search');
            },
            // 镇-村联动菜单
            setArea (subArea) {
                this.$store.dispatch('setArea', subArea);
            }
        }
    };
</script>


<style lang="less" scoped>
    @import "../assets/css/base.less";

    .top-menu {
        position: relative;
        z-index: 10;
        box-sizing: border-box;
        padding: (17 / @rem) (15 / @rem);
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2);

        .title {
            font-size: (40  / @rem);
            color: #333;
            line-height: (71 / @rem);
        }

        button {
            background: none;
            border: 0 none;
            padding: 0;
        }

        .btn-search {
            width: (104 / @rem);
            height: (56 / @rem);
            margin-top: ((71 - 56) / 2 / @rem);
            background: url(../assets/images/icon-search-lg.png) no-repeat 50% 50% #0168b7;
            background-size: (33 / 104 * 100%);
            border-radius: (56 / @rem);
        }
    }

    .riverer-info {
        padding: 0 0 0 (116 / @rem);

        .riverer-item {
            height: (124 / @rem);
            line-height: (124 / @rem);
            border-bottom: 1px solid #e5e5e7;
            font-size: (34  / @rem);

            .label {
                color: #333;
                position: relative;

                &::before {
                    content: attr(data-title);
                    position: absolute;
                    left: (-102 / @rem);
                    top: (28 / @rem);
                    display: block;
                    width: (82 / @rem);
                    height: (82 / @rem);
                    line-height: (82 / @rem);
                    text-align: center;
                    font-size: (28  / @rem);
                    color: #fff;
                    border-radius: 9999px;
                    background-color: #0168b7;
                    overflow: hidden;
                }
            }
            .decs {
                color: #acacac;
                font-style: normal;
            }

            em {
                font-style: normal;
                display: block;
            }
        }
    }

    .search-form {
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        padding-left: (153 / 750 * 100%);
        background: rgba(0, 0, 0, 0.2);

        .search-top,
        .flex-content {
            background-color: #fff;
        }

        .search-top {
            box-sizing: border-box;
            padding: (10 / @rem) (15 / @rem);
            background-color: #f2f2f2;

            .title {
                font-size: (32 / @rem);
                color: #0168b7;
                line-height: (66 / @rem);
            }
            .btn-close {
                position: relative;
                width: (66 / @rem);
                height: (66 / @rem);
                border-radius: 999px;
                border: 0 none;
                background: #0168b7;

                &::before,
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                }
                &::before {
                    width: (35 / @rem);
                    height: 2px;
                    border-top: 2px solid #fff;
                    left: 18%;
                    top: 44%;
                }
                &::after {
                    width: (18 / @rem);
                    height: (18 / @rem);
                    left: 55%;
                    top: 24.4%;
                    border-top: 2px solid #fff;
                    border-right: 2px solid #fff;
                    transform-origin: 0 0;
                    transform: rotate(45deg);
                }
            }
        }

        .form-control {
            padding: 0 (30 / @rem);

            .title {
                font-size: (32 / @rem);
                color: #000;
                line-height: 3em;
            }

            .search-name {
                box-sizing: border-box;
                width: 100%;
                font-size: (28 / @rem);
                height: 2.4em;
                padding: 0 2em 0 0.5em;
                border: 0 none;
                border-bottom: 1px solid #cdcdcd;
                background: url(../assets/images/icon-search.png) no-repeat 98% 50%;
                background-size: 1em;
            }

            .checkbox {
                position: relative;
                float: left;

                span {
                    display: block;
                    font-size: (30 / @rem);
                    color: #333;
                    padding: (13 / @rem) (36 / @rem);
                    min-width: 3.2em;
                    text-align: center;
                    line-height: 1em;
                }

                input[type="radio"] {
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    opacity: 0;
                }
                input:checked + span {
                    color: #fff;
                    background-color: #0168b7;
                    border-radius: 5px;
                }
            }

        }
        .btn-wrap {
            box-sizing: border-box;
            width: 100%;
            padding: 1rem (15 / @rem);
            background-color: #fff;

            .btn-submit {
                display: block;
                width: 100%;
                height: (72 / @rem);
                line-height: (72 / @rem);
                text-align: center;
                font-size: (30 / @rem);
                color: #fff;
                padding: 0;
                border: 0 none;
                background: #0168b7;
                border-radius: 5px;
            }
        }

    }
</style>
