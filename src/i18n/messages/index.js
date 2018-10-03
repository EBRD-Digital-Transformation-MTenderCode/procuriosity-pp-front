import en from "./en.json";
import ru from "./ru.json";
import ro from "./ro.json";

import enLocale from "element-ui/lib/locale/lang/en";
import ruLocale from "element-ui/lib/locale/lang/ru-RU";
import roLocale from "element-ui/lib/locale/lang/ro";

export default {
  en: {
    ...enLocale,
    ...en
  },
  ru: {
    ...ruLocale,
    ...ru
  },
  ro: {
    ...roLocale,
    ...ro
  }
}
