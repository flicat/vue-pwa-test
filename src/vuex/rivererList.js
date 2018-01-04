/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/25
 * @description 河长列表
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@/config/fetch'
import Global from './index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ready: false,                   // 是否加载完成
        list: null,

        pageIndex: 1,                   // 分页
        pageSize: 10,                   // 分页
        pageTotal: null,                // 分页

        area: null,                    // 地区联动菜单-镇
        subArea: null,                 // 地区联动菜单-村

        current: null,                  // 当前查看河长

        showSearch: false,              // 搜索框显隐控制字段
        searchParam: {                 // 搜索字段
            name: '',                // 河长名称
            town: '',                // 所属镇
            village: ''              // 所属村
        }
    },
    getters: {
        townList (state) {
            if(state.area) {
                return Object.keys(state.area);
            } else {
                return [];
            }
        },
        villageList (state) {
            if(state.subArea) {
                return Object.keys(state.subArea);
            } else {
                return [];
            }
        }
    },
    actions: {
        init ({commit, dispatch, state}) {
            if(!state.ready) {
                dispatch('getData');       // 获取河湖列表
                dispatch('getArea');       // 获取村镇联动菜单
            }
        },
        // 点击搜索河流
        search ({commit, dispatch, state}) {
            state.list = [];
            state.showSearch = false;
            state.pageIndex = 1;
            state.ready = false;

            dispatch('getData');
        },
        // 镇-村联动菜单
        setArea ({commit, dispatch, state}, subArea) {
            state.subArea = subArea;
            state.searchParam.village = '';
        },
        // 获取地区联动菜单
        getArea ({commit, dispatch, state}) {

            ajax.areaLinkage({
                data: {
                    code: state.Global.code,
                    appid: state.Global.appid
                }
            }).then(data => {

                if(data && data.data) {

                    let list = data.data;
                    let area = {};

                    Object.keys(list).forEach(keys => {

                        let keyArr = keys.split('-');
                        let currentLevel = null;
                        let currentKey = [];

                        function * level () {
                            let key = yield area;

                            while (key) {

                                currentKey.push(key);

                                if(!currentLevel[key]) {
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

        // 搜索河长列表
        getData ({commit, dispatch, state}, callback) {

            if(!state.pageTotal || state.pageIndex <= state.pageTotal) {

                ajax.rivererList({
                    data: {
                        code: state.Global.code,
                        appid: state.Global.appid,
                        name: state.searchParam.name,
                        town: state.searchParam.town,
                        village: state.searchParam.village,
                        pageIndex: state.pageIndex++,
                        pageSize: state.pageSize
                    }
                }).then(data => {

                    // 数据已经加载完成
                    state.ready = true;

                    callback && callback();

                    if(data && data.data.userList && data.data.userList.length) {
                        state.pageTotal = data.data.pageTotal;

                        if(Array.isArray(state.list)) {
                            state.list = state.list.concat(data.data.userList);
                        } else {
                            state.list = data.data.userList;
                        }
                    }

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
