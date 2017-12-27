/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/27
 * @description 所有河湖
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ready: false,                   // 是否加载完成
        list: null,

        pageIndex: 1,                   // 分页
        pageSize: 10,                   // 分页
        pageTotal: null                 // 分页
    }

});
