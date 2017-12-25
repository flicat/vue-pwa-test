<template>
    <div class="box">
        <section class="flex">
            <el-amap
                ref="map"
                :amap-manager="amapManager"
                :center="center"
                :zoom="zoom"
                :plugin="plugin"
                :events="events"
                class="flex-content">
                <el-amap-marker v-for="marker in markers" :position="marker.position" :content="marker.content" :events="marker.events"></el-amap-marker>
            </el-amap>
        </section>

        <router-link to="/report-list">
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

    // 获取坐标点
    async function getData (vm, param) {
        let markers = [];

        let url = new URL('http://192.168.199.248:2001/data/report-point.json');

        url.search = [
            ['location', param.location].join('='),
            ['range', param.range].join('=')
        ].join('&');

        let res = await fetch(url);
        let data = await res.json();

        if(data.state === 200 && data.data && data.data.length) {

            data.data.forEach(item => markers.push({
                position: item.location.split(','),
                content: '<button type="button" class="btn-map-report">坐标点</button>',
                events: {
                    click () {
                        vm.$router.push({ path: `/report-info/${item.reportId}`})
                    }
                }
            }));
        }

        vm.markers = markers;
    }


    export default {
        name: 'mapInfo',

        data: function() {

            return {
                markers: [],

                amapManager,
                zoom: 12,
                center: [112.865569,23.951898],
                events: {
                    init: (o) => {

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
//                                console.log(instance);
                            }
                        }
                    }
                ]
            };
        },

        created () {
            getData(this, {
                location: this.center.join(','),
                range: 1000
            });
        },

        methods: {
            handler(id) {
                console.log(id);
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
            background: url(../assets/images/icon-point.png) no-repeat 0 0;
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
<style>
    .btn-map-report {
        position: relative;
        z-index: 99999;
    }
</style>
