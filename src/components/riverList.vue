<template>
    <div class="box">
        <div class="top-menu row">
            <button class="btn-tab all-river pull-left" :class="{current: tabType==='all'}" @click="setTab('all')">所有河流</button>
            <button class="btn-tab nearly-river pull-left" :class="{current: tabType==='near'}" @click="setTab('near')">附近河流</button>
            <button class="btn-search text-hide pull-right" @click="showSearch=!showSearch">搜索</button>
        </div>

        <component :is="tabType" :searchParam="searchParam" ref="list"></component>

        <div v-show="showSearch" class="search-form box">
            <div class="search-top row">
                <h3 class="title pull-left">筛选查询</h3>
                <button class="pull-right btn-close text-hide" @click="showSearch=!showSearch">取消</button>
            </div>
            <div class="flex">
                <div class="flex-content">
                    <div class="form-control">
                        <label class="title">1.河流名称</label>
                        <div class="control-item clear">
                            <input type="text" class="search-name" v-model="searchParam.name" placeholder="请输入河流名称">
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
                    <div class="form-control">
                        <button class="btn-submit" @click="search">确定</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import store from '@/vuex/riverList';

    export default {
        name: 'riverList',
        store,
        components: {
            'all': () => import('./allRiverList.vue'),           // 所有河流列表
            'near': () => import('./nearRiverList.vue')          // 附近河流列表
        },
        created () {
            this.$store.dispatch('init');
        },
        data () {

            return {
                subArea: null,                 // 地区联动菜单-村
                tabType: 'all',

                showSearch: false,                              // 搜索框显隐控制字段
                searchParam: {                                  // 搜索字段
                    name: '',                                   // 河流名称
                    town: this.$route.query.town || '',         // 所属镇
                    village: this.$route.query.village || ''    // 所属村
                }
            };
        },
        computed: {
            townList () {
                if(this.area) {
                    return Object.keys(this.area);
                } else {
                    return [];
                }
            },
            villageList () {
                if(this.subArea) {
                    return Object.keys(this.subArea);
                } else {
                    return [];
                }
            },
            area () {
                return this.$store.state.area;            // 地区联动菜单-镇
            }
        },
        methods: {
            search () {
                this.showSearch = false;
                this.tabType = 'all';

                setTimeout(() => {
                    if(this.$refs.list.search) {
                        this.$refs.list.search();
                    }
                }, 10);

            },
            setTab (type) {
                this.tabType = type;
            },
            // 镇-村联动菜单
            setArea (subArea) {
                this.subArea = subArea;
                this.searchParam.village = '';
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
        box-shadow: 0 1px 5px rgba(0,0,0,.2);

        button {
            background: none;
            border: 0 none;
            padding: 0;
        }
        .btn-tab {
            width: (167 / @rem);
            height: (71 / @rem);
            line-height: (71 / @rem);
            text-align: center;
            color: #333;
            font-size: (32 / @rem);
            border-radius: 5px;

            &.current {
                color: #fff;
                background-color: #0168b7;
            }
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

    .search-form {
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        padding-left: (153 / 750 * 100%);
        background: rgba(0,0,0,0.2);

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
                margin-top: 4em;
            }
        }
    }
</style>
