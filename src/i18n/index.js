import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./messages/index";

import axios from "axios";

Vue.use(VueI18n);

const defaultLocale = "ro";

if (!localStorage.getItem("locale")) {
  localStorage.setItem("locale", defaultLocale);
}

const savedLocale = localStorage.getItem("locale");

export default new VueI18n({
  locale: savedLocale,
  messages
});

axios.defaults.headers.common["Accept-Language"] = savedLocale;
document.querySelector("html").setAttribute("lang", savedLocale);
