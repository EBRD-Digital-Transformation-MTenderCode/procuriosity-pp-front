import Vue from "vue";

import { i18n } from "./i18n/index";
import router from "./router";
import store from "./store/index";

import App from "./App.vue";

import "./styles/custom-reset.css";
import "./styles/flags.scss"

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
