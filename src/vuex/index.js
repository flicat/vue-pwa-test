import Vue from 'vue'
import Vuex from 'vuex'
import rivererList from './rivererList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        rivererList,
    }

});
