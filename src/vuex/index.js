/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/28
 * @description 全局 vuex
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@/config/fetch'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        code: localStorage['code'],                  // 微信公众号 code
        appid: localStorage['appid']                 // 微信公众号 appid
    },
    mutations: {
        appCode (state, {code, appid}) {
            if(code && appid) {
                state.code = code;
                state.appid = appid;

                localStorage['code'] = code;
                localStorage['appid'] = appid;
            }
        }
    }
});
