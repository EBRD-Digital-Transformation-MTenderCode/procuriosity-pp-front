import Vue from 'vue';
import Vuex from 'vuex';

import entities from "./entities";
import mdm from "./mdm";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    entities,
    mdm
  }
});
