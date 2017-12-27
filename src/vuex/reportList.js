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
        async getData ({commit, dispatch, state}, callback) {

            if(!state.pageTotal || state.pageIndex <= state.pageTotal) {

                let url = new URL('http://conf.free.ngrok.cc/weixinExposureInfoController.do');
                url.search = [
                    'baoliaoList',
                    ['functionType', 0].join('='),
                    ['pageIndex', state.pageIndex++].join('='),
                    ['pageSize', state.pageSize].join('=')].join('&');

                let res = await fetch(url);
                let data = await res.json();

                // 数据已经加载完成
                state.ready = true;

                // 关闭底部 loading
                callback && callback();

                if(data.state === 200) {
                    // 修改总页数
                    state.pageTotal = data.data.pageTotal;

                    if(Array.isArray(state.list)) {
                        // 数据拼接
                        state.list = state.list.concat(data.data.list);
                    } else {
                        state.list = data.data.list;
                    }
                } else {
                    alert('没有更多数据！');
                }

            } else {
                // 关闭底部 loading
                callback && callback();
                alert('没有更多数据！');
            }

        }

    }

});