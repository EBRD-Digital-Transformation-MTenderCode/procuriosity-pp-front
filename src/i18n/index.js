import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./messages/index";

import axios from "axios";

import Element from "element-ui";

Vue.use(VueI18n);

const defaultLocale = "en";

if (!localStorage.getItem("locale")) {
  localStorage.setItem("locale", defaultLocale);
}

const savedLocale = localStorage.getItem("locale");

export const i18n = new VueI18n({
  locale: savedLocale,
  messages
});

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});

axios.defaults.headers.common["Accept-Language"] = savedLocale;
document.querySelector("html").setAttribute("lang", savedLocale);
