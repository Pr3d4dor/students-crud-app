import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions,
    mutations,
    getters,
    state: {
        currentStudent: {},
        students: [],
        loading: false,
    }
});

export default store;
