import en from "./en";
import ru from "./ru";
import ro from "./ro";

import enLocale from "element-ui/lib/locale/lang/en";
import ruLocale from "element-ui/lib/locale/lang/ru-RU";
import roLocale from "element-ui/lib/locale/lang/ro";

export default {
  en: {
    ...enLocale,
    ...en,
  },
  ro: {
    ...roLocale,
    ...ro,
  },
  ru: {
    ...ruLocale,
    ...ru,
  },
};
