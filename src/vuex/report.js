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
        flood: null
    },
    actions: {
        init ({commit, dispatch, state}) {
            if(!state.ready) {
                dispatch('getFloodType');       // 获取治水大类联动菜单
            }
        },

        // 获取治水大类联动菜单
        getFloodType ({commit, dispatch, state}) {

            ajax.floodLinkage({
                data: {
                    code: state.Global.code,
                    appid: state.Global.appid
                }
            }).then(data => {
                // 数据已经加载完成
                state.ready = true;

                if(data && data.data) {

                    let list = data.data;
                    let flood = {};

                    Object.keys(list).forEach(keys => {

                        let keyArr = keys.split('-');
                        let currentLevel = null;
                        let currentKey = [];

                        function * level () {
                            let key = yield flood;

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

                    state.flood = flood;

                }

            });

        }

    },

    modules: {
        Global
    }


});
