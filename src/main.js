import "@/styles/custom-reset.css";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/main.scss";

import "@/components/SearchForms/_search-form.scss";
import "@/views/ListCards/_card.scss";
import "@/views/EntitiesPages/_entity-info.scss";

import Vue from "vue";

import Element from "element-ui";

import i18n from "./i18n/index";
import router from "./router";
import store from "./store/index";

import App from "./App.vue";

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = true;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
