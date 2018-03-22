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
                <em>曝光台</em>
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

    // 获取曝光点
    function getData() {
        let that = this;

        let markers = [];

        ajax.mapReview({
            data: {
                code: that.$store.state.code,
                appid: that.$store.state.appid,
                longitude: that.center[0],
                latitude: that.center[1],
                distance: that.distance
            }
        }).then(data => {

            if (data && data.data && data.data.length) {

                data.data.forEach(item => markers.push({
                    position: [item.longitude, item.latitude],
                    content: '<a href="javascript:;" class="btn-map-report"></a>',
                    events: {
                        click() {
                            that.$router.push({name: 'reportInfo', params: {id: item.id}})
                        }
                    }
                }));
            }

            that.markers = markers;
        });

    }

    // 获取地图中心点与范围
    function getBounds () {
        if (this.$refs.map) {

            // 计算地图直径范围
            let bounds = this.$refs.map.$amap.getBounds();
            let lnglat = new window.AMap.LngLat(bounds.northeast.lng, bounds.northeast.lat);

            this.center = this.$refs.map.$$getCenter();
            this.distance = Math.floor(lnglat.distance([bounds.southwest.lng, bounds.southwest.lat]));
            getData.bind(this)();
        }
    }

    export default {
        name: 'mapInfo',
        data: function () {

            return {
                markers: [],

                amapManager,
                zoom: 14,
                center: [116.695195, 24.347782],
                distance: 1000,
                events: {
                    init: getBounds.bind(this),
                    moveend: getBounds.bind(this),
                    zoomchange: getBounds.bind(this)
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
