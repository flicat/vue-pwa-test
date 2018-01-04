/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/25
 * @description 曝光台
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@/config/fetch'
import Global from './index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ready: false,                   // 是否加载完成
        area: null,

        subArea: null,                 // 地区联动菜单-村
        tabType: 'all',

        showSearch: false,                              // 搜索框显隐控制字段
        searchParam: {                                  // 搜索字段
            name: '',                                   // 河流名称
            town: '',         // 所属镇
            village: ''    // 所属村
        },

        /* 所有河湖
        * ************************/
        allRiver: {
            ready: false,                   // 是否加载完成
            list: null,

            pageIndex: 1,                   // 分页
            pageSize: 10,                   // 分页
            pageTotal: null                 // 分页
        },

        /* 附近河湖
        * ************************/
        nearRiver: {
            ready: false,                   // 是否加载完成
            list: null,

            pageIndex: 1,                   // 分页
            pageSize: 10,                   // 分页
            pageTotal: null                 // 分页
        }
    },
    getters: {
        townList(state) {
            if (state.area) {
                return Object.keys(state.area);
            } else {
                return [];
            }
        },
        villageList(state) {
            if (state.subArea) {
                return Object.keys(state.subArea);
            } else {
                return [];
            }
        }
    },
    actions: {
        init({commit, dispatch, state}) {
            if (!state.ready) {
                dispatch('getArea');       // 获取治水大类联动菜单
            }
        },

        // 获取地区联动菜单
        getArea({commit, dispatch, state}) {
            ajax.areaLinkage({
                data: {
                    code: state.Global.code,
                    appid: state.Global.appid
                }
            }).then(data => {
                state.ready = true;

                if (data && data.data) {

                    let list = data.data;
                    let area = {};

                    Object.keys(list).forEach(keys => {

                        let keyArr = keys.split('-');
                        let currentLevel = null;
                        let currentKey = [];

                        function* level() {
                            let key = yield area;

                            while (key) {

                                currentKey.push(key);

                                if (!currentLevel[key]) {
                                    currentLevel[key] = {
                                        name: list[currentKey.join('-')],
                                        sub: {}
                                    };
                                }
                                key = yield currentLevel[key].sub;
                            }

                        }

                        let it = level();
                        currentLevel = it.next().value;

                        while (keyArr.length) {
                            currentLevel = it.next(keyArr.shift()).value;
                        }

                    });

                    state.area = area;

                }

            });
        },

        setTab({commit, dispatch, state}, type) {
            state.tabType = type;
        },
        // 镇-村联动菜单
        setArea({commit, dispatch, state}, subArea) {
            state.subArea = subArea;
            state.searchParam.village = '';
        },

        /* 所有河湖
        * ************************/
        initAll({commit, dispatch, state}) {
            if (!state.allRiver.ready) {
                dispatch('getDataAll');       // 获取治水大类联动菜单
            }
        },

        search({commit, dispatch, state}) {
            state.allRiver.pageIndex = 1;
            state.allRiver.ready = false;
            state.allRiver.list = [];
            state.tabType = 'all';
            state.showSearch = false;
            dispatch('getDataAll');       // 获取治水大类联动菜单
        },
        // 搜索河湖列表
        getDataAll({commit, dispatch, state}, callback) {

            if (!state.allRiver.pageTotal || state.allRiver.pageIndex <= state.allRiver.pageTotal) {

                ajax.riverList({
                    data: {
                        code: state.Global.code,
                        appid: state.Global.appid,
                        name: state.searchParam.name,
                        town: state.searchParam.town,
                        village: state.searchParam.village,
                        pageIndex: state.allRiver.pageIndex++,
                        pageSize: state.allRiver.pageSize
                    }
                }).then(data => {
                    // 数据已经加载完成
                    state.allRiver.ready = true;

                    callback && callback();

                    if (data && data.data.list && data.data.list.length) {
                        state.allRiver.pageTotal = data.data.pageTotal;

                        if (Array.isArray(state.allRiver.list)) {
                            state.allRiver.list = state.allRiver.list.concat(data.data.list);
                        } else {
                            state.allRiver.list = data.data.list;
                        }
                    }

                });

            } else {
                callback && callback();
                alert('没有更多数据！');
            }

        },

        /* 附近河湖
        * ************************/
        initNear({commit, dispatch, state}) {
            if (!state.nearRiver.ready) {
                dispatch('getDataNear');       // 获取治水大类联动菜单
            }
        },

        // 搜索河湖列表
        getDataNear({commit, dispatch, state}, callback) {
            let getRiver = function (lng, lat) {

                ajax.nearbyRiver({
                    data: {
                        code: state.Global.code,
                        appid: state.Global.appid,
                        range: 10000,
                        pageIndex: state.nearRiver.pageIndex++,
                        pageSize: state.nearRiver.pageSize,
                        lng,
                        lat
                    }
                }).then(data => {

                    // 数据已经加载完成
                    state.nearRiver.ready = true;

                    callback && callback();

                    if (data && data.data.list && data.data.list.length) {
                        state.nearRiver.pageTotal = data.data.pageTotal;

                        if (Array.isArray(state.nearRiver.list)) {
                            state.nearRiver.list = state.nearRiver.list.concat(data.data.list);
                        } else {
                            state.nearRiver.list = data.data.list;
                        }
                    }
                });
            };

            if (!state.nearRiver.pageTotal || state.nearRiver.pageIndex <= state.nearRiver.pageTotal) {

                navigator.geolocation.getCurrentPosition(function ({coords: {longitude, latitude}}) {
                    getRiver(longitude, latitude);
                }, function () {
                    getRiver(116.695195, 24.347783);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });


            } else {
                callback && callback();
                alert('没有更多数据！');
            }

        }

    },

    modules: {
        Global
    }
});
