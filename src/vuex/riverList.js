/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/25
 * @description 曝光台
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ready: false,                   // 是否加载完成
        area: null
    },

    actions: {
        init ({commit, dispatch, state}) {
            if(!state.ready) {
                dispatch('getArea');       // 获取治水大类联动菜单
            }
        },

        // 获取地区联动菜单
        async getArea ({commit, dispatch, state}) {
            let res = await fetch('http://192.168.199.248:2001/data/area-linkage.json');
            let data = await res.json();

            state.ready = true;

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
        }

    }

});
