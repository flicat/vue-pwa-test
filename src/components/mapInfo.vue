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

        <router-link to="/">
            <span class="icon-outlet">
                <i class="icon icon-location"></i>
                <em>排污口</em>
            </span>
        </router-link>
    </div>
</template>

<script>
    import Vue from 'vue';
    import AMap from 'vue-amap';

    Vue.use(AMap);

    // 初始化vue-amap
    AMap.initAMapApiLoader({
        // 申请的高德key
        key: 'db51a24a68281139bf38be69e9875b8f',
        // 插件集合
        plugin: ['AMap.ToolBar']
    });

    let amapManager = new AMap.AMapManager();

    export default {
        name: 'mapInfo',

        data: function() {

            return {
                amapManager,
                zoom: 12,
                center: [112.865569,23.951898],
                events: {
                    init: (o) => {
                        console.log(o.getCenter());
//                        console.log(this.$refs.map.$$getInstance());
//                        o.getCity(result => {
//                            console.log(result)
//                        });
                    },
                    'moveend': (e) => {
                        console.log(e)
                    },
                    'zoomchange': (e) => {
                        console.log(e)
                    },
                    'click': (e) => {
                        console.log(e)
                    }
                },
                plugin: [
                    {
                        pName: 'AMap.ToolBar',
                        position: 'LB',
                        locate: true,
                        liteStyle: true,
                        events: {
                            init(instance) {
                                console.log(instance);
                            }
                        }
                    }
                ]
            };
        },

        methods: {
            getMap() {
                // amap vue component
                console.log(amapManager._componentMap);
                // gaode map instance
//                console.log(amapManager._map);
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../assets/css/base.less";

    .icon-outlet {
        position: absolute;
        right: (20 / @rem);
        bottom: (28 / @rem);
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
</style>
