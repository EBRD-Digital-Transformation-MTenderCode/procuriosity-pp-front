import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./messages/index";

import axios from "axios";

Vue.use(VueI18n);

export const defaultLocale = "ro";

export default new VueI18n({
  locale: defaultLocale,
  messages,
});

axios.defaults.headers.common["Accept-Language"] = defaultLocale;
document.querySelector("html").setAttribute("lang", defaultLocale);
