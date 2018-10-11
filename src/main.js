import "@/styles/custom-reset.css";
import "@/styles/element-variables.scss";
import "@/styles/main.scss";

import "@/components/SearchForms/_search-form.scss";
import "@/views/ListCards/_card.scss";
import "@/views/EntitiesPages/_entity-info.scss";

import Vue from "vue";

import { i18n } from "./i18n/index";
import router from "./router";
import store from "./store/index";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
