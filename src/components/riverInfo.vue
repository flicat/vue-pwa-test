<template>
    <div class="box">
        <div class="top-menu row" v-if="data">
            <h2 class="title pull-left">{{data.name}}</h2>
            <button class="btn-search text-hide pull-right" @click="showSearch=!showSearch">搜索</button>
        </div>

        <section class="flex">
            <article class="flex-content" ref="wrap">
                <ul class="river-info" v-if="data">

                    <li class="river-item">
                        <i class="icon icon-river"></i>
                        <span class="label">河湖名称：</span>
                        <em class="text">{{data.name || '-'}}</em>
                    </li>

                    <li class="river-item">
                        <i class="icon icon-map"></i>
                        <span class="label">地图查询：</span>
                        <a href="javascript:;" class="btn-map" @click="showMap=!showMap">地图</a>
                    </li>

                    <li class="river-item">
                        <i class="icon icon-riverer"></i>
                        <span class="label">河长：</span>
                        <em class="text">{{data.riverLeader}}｜{{data.leaderDuty}}</em>
                    </li>

                    <li class="river-item" v-if="data.leaderTel">
                        <i class="icon icon-top-riverer"></i>
                        <span class="label">河长电话：</span>
                        <em class="text">{{data.leaderTel}}</em>
                    </li>

                    <li class="river-item" v-if="data.riverPolice">
                        <i class="icon icon-vice-riverer"></i>
                        <span class="label">河道警长：</span>
                        <em class="text">{{data.riverPolice}}</em>
                    </li>

                    <li class="river-item" v-if="data.policeTel">
                        <i class="icon icon-top-riverer"></i>
                        <span class="label">河道警长电话：</span>
                        <em class="text">{{data.policeTel}}</em>
                    </li>

                    <li class="river-item" v-if="data.contactPeople">
                        <i class="icon icon-vice-riverer"></i>
                        <span class="label">联系人：</span>
                        <em class="text">{{data.contactPeople}}</em>
                    </li>

                    <li class="river-item" v-if="data.contactDepartment">
                        <i class="icon icon-top-riverer"></i>
                        <span class="label">联系人部门：</span>
                        <em class="text">{{data.contactDepartment}}</em>
                    </li>

                    <li class="river-item" v-if="data.contactTel">
                        <i class="icon icon-vice-riverer"></i>
                        <span class="label">联系人电话：</span>
                        <em class="text">{{data.contactTel}}</em>
                    </li>

                    <li class="river-item">
                        <i class="icon icon-city-level"></i>
                        <span class="label">级别：</span>
                        <em class="text">{{level}}</em>
                    </li>

                    <!--<li class="river-item">-->
                        <!--<i class="icon icon-county-level"></i>-->
                        <!--<span class="label">县级：</span>-->
                        <!--<em class="text">{{data.countyLevel || '-'}}</em>-->
                    <!--</li>-->

                    <li class="river-item">
                        <i class="icon icon-river-range"></i>
                        <span class="label">河段起止：</span>
                        <em class="text">{{data.rvBeg || '-'}}，{{data.rvEnd || '-'}}</em>
                    </li>

                    <!--<li class="river-item">-->
                        <!--<i class="icon icon-river-land"></i>-->
                        <!--<span class="label">岸别：</span>-->
                        <!--<em class="text">{{data.land || '-'}}</em>-->
                    <!--</li>-->

                    <li class="river-item">
                        <i class="icon icon-collecting-area"></i>
                        <span class="label">河流集雨面积：</span>
                        <em class="text">{{data.rainArea ? data.rainArea + 'Km²' : '-'}}</em>
                    </li>

                    <li class="river-item">
                        <i class="icon icon-river-length"></i>
                        <span class="label">河段长度：</span>
                        <em class="text">{{data.length || '-'}}</em>
                    </li>

                    <!--<li class="river-item">-->
                        <!--<i class="icon icon-river-system"></i>-->
                        <!--<span class="label">水系：</span>-->
                        <!--<em class="text">{{data.system || '-'}}</em>-->
                    <!--</li>-->

                    <li class="river-item">
                        <i class="icon icon-river-remarks"></i>
                        <span class="label">备注：</span>
                        <em class="text">{{data.info || '-'}}</em>
                    </li>

                </ul>
                <div class="box" v-else-if="ready"><span>暂无数据</span></div>
            </article>
        </section>

        <div v-show="showSearch" class="search-form box" @click="showSearch=!showSearch">
            <div class="search-top row" @click.stop="">
                <h3 class="title pull-left">筛选查询</h3>
                <button class="pull-right btn-close text-hide" @click="showSearch=!showSearch">取消</button>
            </div>
            <div class="flex" @click.stop="">
                <div class="flex-content" v-if="data">
                    <div class="form-control">
                        <button @click="sameLevel" class="btn-same-level">同级</button>
                    </div>
                    <div class="form-control" v-if="data && data.supRiverId">
                        <button @click="topLevel" class="btn-sup-level">上级</button>
                    </div>
                    <div class="town-village row">
                        <button @click="townLevel" class="btn-town col-4"><i class="icon icon-town"></i>镇级</button>
                        <button @click="villageLevel" class="btn-village col-4"><i class="icon icon-village"></i>村级</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="box amap-layer" v-if="showMap">
            <div class="flex">
                <el-amap
                    ref="map"
                    :amap-manager="amapManager"
                    :center="center"
                    :zoom="zoom"
                    :plugin="plugin"
                    class="flex-content">
                    <el-amap-polyline :editable="false" :strokeWeight=" 8 - data.level * 2" :path="polylinePath" strokeColor="#0066ff" lineJoin="round"></el-amap-polyline>
                </el-amap>
                <button class="btn-close-map" @click="showMap=!showMap">&times;</button>
            </div>
        </div>

        <go-top :wrap="getWrap"></go-top>

    </div>
</template>

<script>
    import Vue from 'vue';
    import goTop from '@/widget/goTop';
    import AMap from 'vue-amap';
    import ajax from '@/config/fetch'

    Vue.use(AMap);

    // 初始化vue-amap
    AMap.initAMapApiLoader({
        // 申请的高德key
        key: 'db51a24a68281139bf38be69e9875b8f',
        // 插件集合
        plugin: ['AMap.ToolBar']
    });


    // 获取数据
    function getDate (data) {
        // 获取数据
        return ajax.riverInfo({
            data,
        });
    }

    export default {
        name: 'riverInfo',
        props: ['id'],
        components: {
            'go-top': goTop
        },
        beforeMount () {
            this.$emit('loading', !(this.data || this.ready));
        },
        updated () {
            this.$emit('loading', !(this.data || this.ready));
        },
        created () {
            getDate({
                code: this.$store.state.code,
                appid: this.$store.state.appid,
                id: this.id
            }).then(data => {
                // 数据已经加载完成
                this.ready = true;

                if (data) {
                    this.data = data.data;
                }
            });
        },
        data() {
            return {
                ready: false,                   // 是否加载完成
                data: null,

                showSearch: false,
                showMap: false,

                amapManager: new AMap.AMapManager(),
                zoom: 12,
                plugin: [{
                    pName: 'AMap.ToolBar',
                    position: 'LB',
                    locate: true,
                    liteStyle: true,
                    events: {
                        init(instance) {}
                    }
                }],

                // 河流区域描绘
                polyline: {
                    path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
                    editable: false
                }
            };
        },
        computed: {
            // 地图中点
            center () {
                if(this.data && this.data.latitude && this.data.longitude) {
                    return [this.data.longitude, this.data.latitude]
                } else {
                    return [0, 0];
                }
            },
            polylinePath () {
                if(this.data && this.data.coordinates && this.data.coordinates.length) {
                    return this.data.coordinates;
                } else {
                    return [];
                }
            },
            // 河流等级
            level () {
                if(this.data && this.data.manaLevel) {
                    return ['', '区管','镇管', '村管'][Number(this.data.manaLevel)]
                }
            }
        },
        methods: {
            // 同级
            sameLevel() {
                this.$router.push({name: 'riverList', query: {town: this.data.townId, village: this.data.villageId}});
            },
            // 上级
            topLevel() {
                this.showSearch = false;
                this.$router.replace({name: 'riverInfo', params: {id: this.data.supRiverId}});

                getDate({
                    code: this.$store.state.code,
                    appid: this.$store.state.appid,
                    id: this.data.supRiverId
                }).then(data => {
                    if (data) {
                        this.data = data.data;
                    }
                });
            },
            // 镇级
            townLevel() {
                this.$router.push({name: 'riverList'});
            },
            // 村级
            villageLevel() {
                this.$router.push({name: 'riverList', query: {town: this.data.townId}});
            },
            getWrap () {
                return this.$refs.wrap;
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

    .river-info {
        padding: (30 / @rem) (15 / @rem);

        .river-item {
            margin-bottom: (22 / @rem);
            font-size: (30 / @rem);
            line-height: (48 / @rem);

            .label {
                color: #000;
            }
            .text {
                color: #666;
                font-style: normal;
            }
            .btn-map {
                display: inline-block;
                width: (96 / @rem);
                height: (46 / @rem);
                line-height: (46 / @rem);
                vertical-align: top;
                text-align: center;
                color: #fff;
                text-decoration: none;
                background-color: #0077d2;
                border-radius: 5px;
            }

            .icon {
                width: (48 / @rem);
                height: (48 / @rem);
                margin-right: (20 / @rem);
                vertical-align: top;
                background-size: 100%;
                background-position: 0 0;
                background-repeat: no-repeat;
            }

            .icon-river {
                background-image: url(../assets/images/icon-river.png)
            }
            .icon-map {
                background-image: url(../assets/images/icon-map.png)
            }
            .icon-top-riverer {
                background-image: url(../assets/images/icon-top-riverer.png)
            }
            .icon-vice-riverer {
                background-image: url(../assets/images/icon-vice-riverer.png)
            }
            .icon-riverer {
                background-image: url(../assets/images/icon-riverer.png)
            }
            .icon-city-level {
                background-image: url(../assets/images/icon-city-level.png)
            }
            .icon-county-level {
                background-image: url(../assets/images/icon-county-level.png)
            }
            .icon-river-range {
                background-image: url(../assets/images/icon-river-range.png)
            }
            .icon-river-land {
                background-image: url(../assets/images/icon-river-land.png)
            }
            .icon-collecting-area {
                background-image: url(../assets/images/icon-collecting-area.png)
            }
            .icon-river-length {
                background-image: url(../assets/images/icon-river-length.png)
            }
            .icon-river-system {
                background-image: url(../assets/images/icon-river-system.png)
            }
            .icon-river-remarks {
                background-image: url(../assets/images/icon-river-remarks.png)
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

        button {
            box-sizing: border-box;
            padding: 0;
            border: 0 none;
            background: none;
        }

        .form-control {
            padding: 0 (30 / @rem);
            font-size: (30  / @rem);

            .btn-same-level,
            .btn-sup-level {
                width: 100%;
                height: (68 / @rem);
                line-height: (68 / @rem);
                text-align: center;
                border-radius: 5px;
            }

            .btn-same-level {
                color: #666;
                border: 1px solid #d3d3d3;
                margin-top: (48 / @rem);
            }
            .btn-sup-level {
                color: #fff;
                background-color: #0168b7;
                margin-top: (23 / @rem);
            }
        }

        .town-village {
            margin-top: (44 / @rem);
            padding-top: (44 / @rem);
            border-top: 1px solid #e5e5e7;

            .btn-town,
            .btn-village {
                text-align: center;
            }
            .btn-town {
                color: #0168b7;
            }
            .btn-village {
                color: #333;
            }
            .icon-town,
            .icon-village {
                box-sizing: border-box;
                width: (125 / @rem);
                height: (125 / @rem);
                display: block;
                margin: 0 auto 0.4em;
                border-radius: 50%;
            }
            .icon-town {
                background: url(../assets/images/icon-town.png) no-repeat 50% 50% #0168b7;
                background-size: (61 / @rem);
            }
            .icon-village {
                border: 1px solid #d8d8d8;
                background: url(../assets/images/icon-village.png) no-repeat 50% 50%;
                background-size: (46 / @rem);
            }
        }
    }

    .amap-layer {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;

        .btn-close-map {
            position: absolute;
            right: (20 / @rem);
            top: (28 / @rem);
            z-index: 10;
            display: block;
            width: 1.2em;
            height: 1.2em;
            line-height: 1em;
            border-radius: 999px;
            border: 0 none;
            background: #666;
            box-shadow: 1px 1px 10px rgba(0,0,0,.3);
            color: #fff;
            font-size: (60 / @rem);
            text-align: center;
        }
    }
</style>

<style lang="less">
    @import "../assets/css/base.less";

    .river-point {
        display: block;
        width: (45 / @rem);
        height: (59 / @rem);
        background: url(../assets/images/icon-point.png) no-repeat 0 0;
        background-size: 100%;
    }
</style>
