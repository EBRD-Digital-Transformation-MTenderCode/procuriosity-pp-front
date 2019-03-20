if (process.env.NODE_ENV === "development") {
  import("@/styles/custom-reset.css").then(() => {
    import("@/styles/for-dev.scss");
  });
}

import "element-ui/lib/theme-chalk/index.css";
import "@/styles/main.scss";

import "@/components/SearchForms/_search-form.scss";
import "@/components/ListCards/_card.scss";
import "@/views/EntitiesPages/_entity-info.scss";

import Vue from "vue";

import Element from "element-ui";
import scrollSpy, { Easing } from "vue2-scrollspy/dist/index.js";

import i18n from "./i18n/index";
import router from "./router";
import store from "./store/index";

import App from "./App.vue";

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
});

Vue.use(scrollSpy, {
  easing: Easing.Circular.InOut,
});

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount("#app");
