/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/25
 * @description 我的爆料
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@/config/fetch'
import Global from './index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ready: false,                   // 是否加载完成
        userInfo: null,
        list: null,

        pageIndex: 1,
        pageSize: 10,
        pageTotal: null
    },
    actions: {
        init ({commit, dispatch, state}) {
            if(!state.ready) {
                dispatch('getData');       // 获取河湖列表
            }
        },
        // 获取数据
        getData ({commit, dispatch, state}, callback) {

            if(!state.pageTotal || state.pageIndex <= state.pageTotal) {

                ajax.reportList({
                    data: {
                        code: state.Global.code,
                        appid: state.Global.appid,
                        functionType: 1,
                        pageIndex: state.pageIndex++,
                        pageSize: state.pageSize
                    }
                }).then(data => {

                    // 数据已经加载完成
                    state.ready = true;

                    callback && callback();

                    if(data) {
                        state.userInfo = data.data.userInfo;
                        state.pageTotal= data.data.report.pageTotal;

                        if(Array.isArray(state.list)) {
                            state.list = state.list.concat(data.data.report.list);
                        } else {
                            state.list = data.data.report.list;
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
