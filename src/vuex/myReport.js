/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/25
 * @description 我的爆料
 */

import Vue from 'vue'
import Vuex from 'vuex'

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
        async getData ({commit, dispatch, state}, callback) {

            if(!state.pageTotal || state.pageIndex <= state.pageTotal) {

                let url = new URL('http://conf.free.ngrok.cc/weixinExposureInfoController.do');
                url.search = [
                    'baoliaoList',
                    ['functionType', 1].join('='),
                    ['pageIndex', state.pageIndex++].join('='),
                    ['pageSize', state.pageSize].join('=')].join('&');

                let res = await fetch(url);
                let data = await res.json();

                // 数据已经加载完成
                state.ready = true;

                callback && callback();

                if(data.state === 200) {
                    state.userInfo = data.data.userInfo;
                    state.pageTotal= data.data.report.pageTotal;

                    if(Array.isArray(state.list)) {
                        state.list = state.list.concat(data.data.report.list);
                    } else {
                        state.list = data.data.report.list;
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
