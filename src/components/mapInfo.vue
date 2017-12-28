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
                <el-amap-marker v-for="marker in markers" :position="marker.position" :content="marker.content"
                                :events="marker.events"></el-amap-marker>
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
    import ajax from '@/config/fetch'

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
    function getData() {
        let that = this;

        let markers = [];

        ajax.mapReview({
            param: {
                'longitude': that.center[0],
                'latitude': that.center[1],
                'distance': 1000
            }
        }).then(data => {

            if (data && data.state === 200 && data.data && data.data.length) {

                data.data.forEach(item => markers.push({
                    position: item.location.split(','),
                    content: '<a href="javascript:;" class="btn-map-report"></a>',
                    events: {
                        click() {
                            that.$router.push({name: 'reportInfo', params: {id: item.reportId}})
                        }
                    }
                }));
            }

            that.markers = markers;
        });

    }

    export default {
        name: 'mapInfo',

        created: getData,

        data: function () {

            return {
                markers: [],

                amapManager,
                zoom: 12,
                center: [112.865569, 23.951898],
                events: {
                    moveend: (e) => {
                        if (this.$refs.map) {
                            this.center = this.$refs.map.$$getCenter();
                            getData.bind(this)();
                        }
                    },
                    zoomchange: (e) => {
                        if (this.$refs.map) {
                            this.center = this.$refs.map.$$getCenter();
                            getData.bind(this)();
                        }
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
                            }
                        }
                    }
                ]
            };
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
        box-shadow: 1px 1px 10px rgba(0, 0, 0, .3);
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
<style lang="less">
    @import "../assets/css/base.less";
    .btn-map-report {
        position: relative;
        z-index: 99999;
        display: block;
        width: (45 / @rem);
        height: (59 / @rem);
        background: url(../assets/images/icon-point.png) no-repeat 0 0;
        background-size: 100%;
    }
</style>
