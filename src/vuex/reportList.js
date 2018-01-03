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
        list: null,                     // 数据列表

        pageIndex: 1,                  // 当前页
        pageSize: 10,                  // 每页数量
        pageTotal: null                // 总页数
    },
    actions: {
        init ({commit, dispatch, state}) {
            if(!state.ready) {
                dispatch('getData');       // 获取治水大类联动菜单
            }
        },

        // 获取列表数据
        getData ({commit, dispatch, state}, callback) {

            if(!state.pageTotal || state.pageIndex <= state.pageTotal) {

                ajax.reportList({
                    data: {
                        code: state.Global.code,
                        appid: state.Global.appid,
                        functionType: 0,
                        pageIndex: state.pageIndex++,
                        pageSize: state.pageSize
                    }
                }).then(data => {

                    // 数据已经加载完成
                    state.ready = true;

                    // 关闭底部 loading
                    callback && callback();

                    if(data) {
                        // 修改总页数
                        state.pageTotal = data.data.pageTotal;

                        if(Array.isArray(state.list)) {
                            // 数据拼接
                            state.list = state.list.concat(data.data.list);
                        } else {
                            state.list = data.data.list;
                        }
                    }

                });

            } else {
                // 关闭底部 loading
                callback && callback();
                alert('没有更多数据！');
            }

        }

    },

    modules: {
        Global
    }

});
