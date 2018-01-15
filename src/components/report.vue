<template>
    <div class="box">
        <section class="flex">
            <article class="flex-content">

                <div class="form-group row">
                    <label class="col-4 control-label">投诉河道</label>
                    <div class="form-control select-control col-8">
                        <p class="label">{{riverName || '请选择（必填）'}}</p>
                        <button class="btn-map" @click="showRiver=!showRiver"></button>
                        <input type="hidden" :value="id" v-validate.require="validate('id')">
                    </div>
                    <span class="error-msg col-12" v-if="!id && invalid['id']">请选择投诉河道！</span>
                </div>

                <div class="form-group row">
                    <label class="col-4 control-label">举报位置</label>
                    <div class="form-control map-control col-8">
                        <p class="output text-clip">{{address}}</p>
                        <button class="btn-map" @click="openMap"></button>
                        <input type="hidden" :value="location" v-validate.require="validate('location')">
                    </div>
                    <span class="error-msg col-12" v-if="!location && invalid['location']">请选择举报位置！</span>
                </div>

                <div class="form-group row">
                    <div class="form-control col-12">
                        <textarea placeholder="请您具体填写一下报料的位置，如某大厦正南方100米，以便工作人员找到问题。"
                                  v-model="location_info" name="location_info" v-validate.require="validate('location_info')"></textarea>
                    </div>
                    <span class="error-msg col-12" v-if="invalid['location_info']">请您具体填写一下报料的位置！</span>
                </div>

                <div class="form-group row">
                    <label class="col-4 control-label">举报人</label>
                    <div class="form-control col-8">
                        <input type="text" name="user" v-model="reporter" v-validate.require.cn="validate('reporter')">
                    </div>
                    <span class="error-msg col-12" v-if="invalid['reporter'] === 'require'">举报人不能为空！</span>
                    <span class="error-msg col-12" v-if="invalid['reporter'] === 'cn'">请填写正确的名字！</span>
                </div>

                <div class="form-group row">
                    <label class="col-4 control-label">举报电话</label>
                    <div class="form-control col-8">
                        <input type="text" name="user" v-model="phone" v-validate.require.phone|tell="validate('phone')">
                    </div>
                    <span class="error-msg col-12" v-if="invalid['phone'] === 'require'">请填写举报电话！</span>
                    <span class="error-msg col-12" v-if="invalid['phone'] === 'phone|tell'">请填写正确的电话号码！</span>
                </div>

                <div class="form-group row">
                    <label class="col-4 control-label">治水大类</label>
                    <div class="form-control select-control col-8">
                        <p class="label">{{flood && floodType ? flood[floodType].name : '请选择（必填）'}}</p>
                        <select name="river" v-model="floodType" v-validate.require="validate('floodType')">
                            <option value="" disabled>请选择</option>
                            <option v-for="id in floodList" :value="id">{{flood[id].name}}</option>
                        </select>
                    </div>
                    <span class="error-msg col-12" v-if="invalid['floodType']">请选择治水大类！</span>
                </div>

                <div class="form-group row">
                    <label class="col-4 control-label">治水子类</label>
                    <div class="form-control select-control col-8">
                        <p class="label">{{subFlood && floodSubType && subFlood[floodSubType]? subFlood[floodSubType].name : '请选择（必填）'}}</p>
                        <select name="river" v-model="floodSubType" v-validate.require="validate('floodSubType')">
                            <option value="" disabled>请选择</option>
                            <option v-for="id in subFloodList" :value="id">{{subFlood[id].name}}</option>
                        </select>
                    </div>
                    <span class="error-msg col-12" v-if="invalid['floodSubType']">请选择治水子类！</span>
                </div>

                <div class="form-group row">
                    <label class="col-4 control-label">问题描述</label>
                    <div class="form-control col-8">
                        <textarea placeholder="请输入问题内容" v-model="description" v-validate.require="validate('description')"></textarea>
                    </div>
                    <span class="error-msg col-12" v-if="invalid['description']">请填写问题描述！</span>
                </div>

                <div class="form-group row">
                    <label class="col-4 control-label">照片集</label>
                    <div class="form-control file-control col-8">
                        <input type="file" v-file="getFile" multiple accept="image/*">
                        <input type="hidden" :value="!!picture.size ? picture.size : ''" v-validate.require="validate('picture')">
                    </div>
                    <span class="error-msg col-12" v-if="!picture.size && invalid['picture']">请至少上传一张照片！</span>
                </div>
                <div class="form-group row" v-if="picList.length">
                    <div class="form-control col-3"
                         v-for="pic in picList"
                         :key="pic.src"
                         @click="picReview(pic.src)"
                         :class="[currentPic === pic.src ? 'current-pic box' : 'img-control']">
                        <img :src="pic.src" alt="" @load="revoke(pic.src)">
                        <i class="icon-delete" @click="delPic(pic.md5)"></i>
                    </div>
                </div>

                <div class="form-group row">
                    <button class="btn-submit col-12" @click="submit">保存</button>
                </div>

            </article>
        </section>

        <div class="box amap-layer" v-if="showMap">
            <div class="flex">
                <el-amap
                    ref="map"
                    :amap-manager="amapManager"
                    :center="center"
                    :zoom="zoom"
                    :plugin="plugin"
                    :events="events"
                    class="flex-content">
                    <el-amap-marker v-if="marker" :position="marker.position" :content="marker.content"></el-amap-marker>
                </el-amap>
                <button class="btn-close-map" @click="showMap=!showMap">&times;</button>
            </div>
        </div>

        <select-river v-if="showRiver" @select="setRiver" @loading="loading" class="river-layer"></select-river>
    </div>
</template>

<script>
    import Vue from 'vue';
    import selectRiver from './selectRiver';             // 河道选择
    import browserMd5File from 'browser-md5-file';             // 获取文件MD5
    import AMap from 'vue-amap';
    import store from '@/vuex/report';
    import ajax from '@/config/fetch';
    import imagemin from 'lrz';
    import fileInput from '../plugins/vue-file';
    import validate, {check} from '../plugins/vue-validate';

    Vue.use(AMap);
    Vue.use(fileInput);
    Vue.use(validate);

    // 初始化vue-amap
    AMap.initAMapApiLoader({
        // 申请的高德key
        key: 'db51a24a68281139bf38be69e9875b8f',
        // 插件集合
        plugin: ['AMap.ToolBar']
    });


    export default {
        name: 'report',
        store,
        components: {
            'select-river': selectRiver               // 所有河流
        },
        created () {
            this.$store.dispatch('init');
        },
        data() {
            let that = this;

            return {
                invalid: {},                // 验证失败的字段
                showMap: false,             // 地图显隐字段
                showRiver: false,           // 河流列表显隐字段

                id: null,                   // 投诉河道ID
                riverName: null,            // 河道名称
                address: null,              // 位置信息
                location: null,             // 举报位置经纬度
                location_info: null,        // 举报位置描述
                reporter: null,             // 举报人
                phone: null,                // 举报电话
                floodType: null,            // 治水大类ID
                floodSubType: null,         // 治水子类ID
                description: null,          // 问题描述
                picture: new Map(),         // 照片集
                picList: [],                // 照片预览
                currentPic: null,           // 当前预览照片

                amapManager: new AMap.AMapManager(),
                zoom: 12,
                center: [116.695195, 24.347783],
                marker: null,
                events: {
                    click(e) {

                        that.location = [e.lnglat.lng, e.lnglat.lat].join(',');
                        that.marker = {
                            position: [e.lnglat.lng, e.lnglat.lat],
                            content: '<span class="river-point"></span>'
                        };

                        let url = new URL('http://restapi.amap.com/v3/geocode/regeo');
                        url.search = [
                            ['radius', 1000].join('='),
                            ['extensions', 'all'].join('='),
                            ['key', 'db51a24a68281139bf38be69e9875b8f'].join('='),
                            ['location', that.location].join('=')
                        ].join('&');

                        fetch(url).then(res => res.json()).then(data => {
                            if(data.info === 'OK') {
                                that.address = data.regeocode.formatted_address;
                            }
                        });

                        that.showMap = false;
                    }
                },
                plugin: [{
                    pName: 'AMap.ToolBar',
                    position: 'LB',
                    locate: true,
                    liteStyle: true,
                    events: {
                        init(instance) {
                        }
                    }
                }]
            }
        },
        computed: {
            subFlood () {
                if(this.flood && this.floodType) {
                    return this.flood[this.floodType].sub;
                } else {
                    return null;
                }
            },
            floodList () {
                if(this.flood) {
                    return Object.keys(this.flood);
                } else {
                    return [];
                }
            },
            subFloodList () {
                if(this.subFlood) {
                    return Object.keys(this.subFlood);
                } else {
                    return [];
                }
            },
            flood () {
                return this.$store.state.flood;
            }
        },
        methods: {
            // 点击打开地图
            openMap() {
                let that = this;

                if(that.location) {
                    that.center = that.location.split(',');
                    that.showMap = true;
                } else {
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        let crd = pos.coords;
                        that.center = [crd.longitude, crd.latitude];
                        that.showMap = true;
                    }, function () {
                        that.showMap = true;
                    }, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    });
                }

            },

            // 上传图片文件
            getFile(files) {
                let that = this;

                [...files].forEach(file => {
                    if(/^image/.test(file.type) || /\.(jpe?g|png|gif|bmp)$/.test(file.name)) {

                        // 使用MD5文件去重
                        browserMd5File(file, (err, MD5) => {
                            if (!that.picture.has(MD5)) {

                                that.$emit('loading', true);

                                // 图片压缩
                                imagemin(file, {
                                    width: 750,
                                    height: 750,
                                    quality: 0.8,
                                    fieldName: MD5
                                }).then(result => {
                                    let newFile = new File([result.file], result.origin.name, { type: result.origin.type});
                                    that.picture.set(MD5, newFile);

                                    // 读取图片预览
                                    that.picList.push({
                                        src: (URL || webkitURL).createObjectURL(newFile),
                                        md5: MD5
                                    });

                                })
                                .catch(e => console.error(e))
                                .always(() => that.$emit('loading', false));

                            }
                        });

                    }
                });
            },
            // 选中河流
            setRiver (river) {
                this.showRiver = false;
                this.id = river.id;
                this.riverName = river.name;
            },

            // 释放图片内存
            revoke(src) {
                (URL || webkitURL).revokeObjectURL(src);
            },
            // 大图预览图片
            picReview (src) {
                if(this.currentPic === src) {
                    this.currentPic = null;
                } else {
                    this.currentPic = src;
                }
            },
            // 删除图片
            delPic (md5) {
                this.picture.delete(md5);
                this.picList = this.picList.filter(pic => pic.md5 !== md5);
            },

            // 校验表单是否通过验证
            validate (key) {
                return (result, rule, el) => {
                    if(!result) {
                        Vue.set(this.invalid, key, rule);
                    } else {
                        Vue.set(this.invalid, key, undefined);
                    }
                };
            },

            // 点击提交爆料
            submit() {
                let that = this;

                // 检测所有表单
                if(check()) {

                    let data = new FormData();

                    data.append('code', that.$store.state.Global.code);
                    data.append('appid', that.$store.state.Global.appid);

                    data.append('id', that.id);
                    data.append('location', that.location);
                    data.append('location_info', that.location_info);
                    data.append('reporter', that.reporter);
                    data.append('phone', that.phone);
                    data.append('floodType', that.floodType);
                    data.append('floodSubType', that.floodSubType);
                    data.append('description', that.description);
                    [...that.picture.values()].forEach(file => data.append('picture[]', file));

                    ajax.report({
                        type: 'POST',
                        upload (event) {
                            let rate = event.loaded / event.total;
                            that.$emit('progress', rate);
                        },
                        data,
                    }).then(data => {
                        if(data && data.data) {
                            alert(data.data);
                        }
                    });

                }
            },

            loading (isShow) {
                this.$emit('loading', isShow);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    .flex-content {
        box-sizing: border-box;
        padding: (10 / @rem) (15 / @rem) 0;
    }

    .form-group {
        padding: (20 / @rem) 0;
        font-size: (32 / @rem);
        line-height: 2em;
        color: #000;
        border-bottom: 1px solid #e5e5e7;

        .form-control {
            box-sizing: border-box;
            position: relative;
            min-height: 2em;

            &.select-control {
                padding-right: (50 / @rem);

                &::before {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: (15 / @rem);
                    display: block;
                    width: (22 / @rem);
                    height: (22 / @rem);
                    border-top: 2px solid #c4c4c4;
                    border-right: 2px solid #c4c4c4;
                    transform: rotate(45deg);
                    transform-origin: 0 0;
                }
            }

            &.map-control {
                background: url(../assets/images/icon-location.png) no-repeat 100% 50%;
                background-size: (34 / @rem);
            }

            &.file-control {
                height: 2em;
                background: url(../assets/images/icon-img.png) no-repeat 98% 50%;
                background-size: (41 / @rem);
            }

            &.img-control {
                padding: 0.3em;

                img {
                    width: 100%;
                    height: 3em;
                }
            }

            &.current-pic {
                font-size: 0;
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                text-align: center;
                background-color: rgba(0,0,0,0.5);

                img {
                    width: 80%;
                    height: auto;
                    max-height: 80%;
                    vertical-align: top;
                }
                .icon-delete {
                    display: inline-block;
                    width: 80%;
                    height: 2rem;
                    background: url(../assets/images/icon-delete.png) no-repeat 50% 50% #eee;
                    background-size: auto 70%;
                    vertical-align: top;
                }
            }

            .btn-map,
            input[type="file"],
            select {
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 100%;
                height: 100%;
                opacity: 0;
            }

            input,
            textarea {
                width: 100%;
                border: 0 none;
                background: none;
                line-height: 2em;
                padding: 0;
            }

            textarea {
                height: 5em;
                resize: none;
            }

            .label {
                text-align: right;
                color: #333;
            }

            .output {
                width: 90%;
            }

        }

        .error-msg {
            color: #f00;
            font-size: (30 / @rem);
            font-weight: 400;
            line-height: 1em;
            margin-top: 0.5em;
        }

        .btn-submit {
            height: (72 / @rem);
            line-height: (72 / @rem);
            font-size: (30 / @rem);
            color: #fff;
            text-align: center;
            background: #0168b7;
            border: 0 none;
            padding: 0;
            margin: 2em 0 0;
            border-radius: 5px;
        }
    }

    .amap-layer {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;

        .flex-content {
            padding: 0;
        }

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
            box-shadow: 1px 1px 10px rgba(0, 0, 0, .3);
            color: #fff;
            font-size: (60 / @rem);
            text-align: center;
        }
    }

    .river-layer {
        background-color: #fff;
        &:extend(.amap-layer);
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
