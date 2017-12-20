<template>
    <div class="box">
        <section class="flex">
            <el-amap
                ref="map"
                vid="amapDemo"
                :amap-manager="amapManager"
                :center="center"
                :zoom="zoom"
                :plugin="plugin"
                :events="events"
                class="flex-content"></el-amap>
        </section>

        <section class="outlet box">

            <span class="icon-outlet">
                <i class="icon icon-location"></i>
                <em>排污口</em>
            </span>

            <div class="top-search">
                <input type="text" class="search" placeholder="请输入关键字">
                <i class="icon icon-search"></i>
            </div>

            <div class="outlet-wrap flex">
                <div class="flex-content">
                    <ul class="outlet-list">

                        <li class="outlet-item row">
                            <a href="" class="row">
                                <p class="col-2">
                                    <img src="../assets/images/pic-item.jpg" alt="">
                                </p>
                                <p class="col-10">浈江大埔区段</p>
                            </a>
                        </li>

                    </ul>
                    <loading></loading>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import AMap from 'vue-amap';
    import Loading from '@/widget/loading';

    Vue.use(AMap);

    // 初始化vue-amap
    AMap.initAMapApiLoader({
        // 申请的高德key
        key: 'db51a24a68281139bf38be69e9875b8f',
        // 插件集合
        plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar']
    });


    let amapManager = new AMap.AMapManager();

    export default {
        name: 'mapInfo',
        components: {
            'loading': Loading
        },
        data: function() {
            return {
                amapManager,
                zoom: 12,
                center: [112.865569,23.951898],
                events: {
                    init: (o) => {
//                        console.log(o.getCenter());
//                        console.log(this.$refs.map.$$getInstance());
//                        o.getCity(result => {
//                            console.log(result)
//                        });
                    },
                    'moveend': () => {

                    },
                    'zoomchange': () => {

                    },
                    'click': (e) => {
//                        alert('map clicked');
                    }
                },
                plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar']
            };
        },

        methods: {
            getMap() {
                // amap vue component
//                console.log(amapManager._componentMap);
                // gaode map instance
//                console.log(amapManager._map);
            }
        }
    }

</script>


<style lang="less" scoped>
    @import "../assets/css/base.less";

    .outlet {
        position: relative;
        height: (423 / @rem);
        background-color: #fff;

        .icon-outlet {
            position: absolute;
            right: (47 / @rem);
            top: (-82 / @rem);
            z-index: 10;
            display: block;
            width: (117 / @rem);
            height: (117 / @rem);
            border: 1px solid #c0c0c0;
            border-radius: 50%;
            box-shadow: 1px 1px 10px rgba(0,0,0,.3);
            background-color: #fff;
            text-align: center;
            line-height: 1.1em;

            .icon-location {
                display: block;
                width: (45 / @rem);
                height: (59 / @rem);
                background: url(../assets/images/icon-location.png) no-repeat 0 0;
                background-size: 100% 100%;
                margin: (15 / @rem) auto 0;
            }

            em {
                font-style: normal;
                font-size: (20 / @rem);
                color: #333;
            }
        }

        .top-search {
            box-sizing: border-box;
            width: 100%;
            padding: (23 / @rem) (226 / @rem) (6 / @rem) (15 / @rem);
            font-size: 0;

            input {
                box-sizing: border-box;
                width: (440 / @rem);
                height: (68 / @rem);
                line-height: (68 / @rem);
                border: 0 none;
                padding-left: (25 / @rem);
                border-radius: 4px 0 0 4px;
                background-color: #f2f2f2;
                font-size: (28 / @rem);
            }

            .icon-search {
                width: (68 / @rem);
                height: (68 / @rem);
                background: url(../assets/images/icon-search.png) no-repeat 50% 50% #f2f2f2;
                background-size: (26 / @rem);
                border-radius: 0 4px 4px 0;
            }
        }

        .outlet-list {
            padding: 0 (15 / @rem);

            .outlet-item {
                padding: (20 / @rem) 0;
                border-bottom: 1px solid #e5e5e7;
                line-height: (68 / @rem);

                a {
                    color: #333;
                }
                img {
                    height: (68 / @rem);
                    width: auto;
                    max-width: 100%;
                    vertical-align: top;
                }
            }
        }
    }
</style>
