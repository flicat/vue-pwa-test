/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/25
 * @description 所有河流
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ready: false,                   // 是否加载完成
        list: null,

        pageIndex: 1,                   // 分页
        pageSize: 20,                   // 分页
        pageTotal: null,                 // 分页

        current: null,                  // 当前选中河流

        area: null,                    // 地区联动菜单-镇
        subArea: null,                 // 地区联动菜单-村

        showSearch: false,                              // 搜索框显隐控制字段
        searchParam: {                                  // 搜索字段
            name: '',                                   // 河流名称
            town: '',         // 所属镇
            village: ''    // 所属村
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

            dispatch('getData');
        },
        // 镇-村联动菜单
        setArea ({commit, dispatch, state}, subArea) {
            state.subArea = subArea;
            state.searchParam.village = '';
        },
        // 获取地区联动菜单
        async getArea ({commit, dispatch, state}) {
            let res = await fetch('http://www.keepsoft.cn/wxpt/hehumingluController.do?getDistList.action');
            let data = await res.json();

            if(data.state === 200 && data.data) {

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
        },

        // 搜索河长列表
        async getData ({commit, dispatch, state}, callback) {

            if(!state.pageTotal || state.pageIndex <= state.pageTotal) {

                let url = new URL('http://192.168.199.248:2001/data/river-list.json');
                url.search = [
                    ['name', state.searchParam.name].join('='),
                    ['town', state.searchParam.town].join('='),
                    ['village', state.searchParam.village].join('='),
                    ['pageIndex', state.pageIndex++].join('='),
                    ['pageSize', state.pageSize].join('=')
                ].join('&');

                let res = await fetch(url);
                let data = await res.json();

                // 数据已经加载完成
                state.ready = true;

                callback && callback();

                if(data.state === 200 && data.data.list && data.data.list.length) {
                    state.pageTotal = data.data.pageTotal;

                    if(Array.isArray(state.list)) {
                        state.list = state.list.concat(data.data.list);
                    } else {
                        state.list = data.data.list;
                    }
                } else {
                    alert('没有更多数据！');
                }
            } else {
                callback && callback();
                alert('没有更多数据！');
            }

        }

    }

});