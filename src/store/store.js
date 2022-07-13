import Vue from 'vue';
import Vuex from 'vuex'
import * as kpi from '@/store/modules/kpi.js';
import * as value from '@/store/modules/value.js';
import * as notification from '@/store/modules/notification.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        kpi,
        value,
        notification
    },
    state: {},
    getters : {},
    mutations: {},
    actions : {}
})
