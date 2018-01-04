/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/28
 * @description 全局 vuex
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rate: 0,                                     // 全局下载/上传进度条
        showLoading: false,                          // 页面切换全局loading

        code: localStorage['code'] || '',                  // 微信公众号 code
        appid: localStorage['appid'] || ''                 // 微信公众号 appid
    },
    mutations: {
        rate (state, rate) {
            state.rate = rate;
        },
        loading (state, isShow) {
            state.showLoading = !!isShow;
        },
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
