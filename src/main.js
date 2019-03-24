import Vue from "vue";

import {
  Container,
  Row,
  Col,
  Form,
  FormItem,
  Pagination,
  Dialog,
  Autocomplete,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Button,
  ButtonGroup,
  Tabs,
  TabPane,
  Tag,
  Icon,
  Card,
  Collapse,
  CollapseItem,
  Main,
} from "element-ui";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

import locale from "element-ui/lib/locale";
import langEN from "element-ui/lib/locale/lang/en";
import langRU from "element-ui/lib/locale/lang/ru-RU";
import langRO from "element-ui/lib/locale/lang/ro";

import scrollSpy, { Easing } from "vue2-scrollspy/dist/index.js";

import i18n from "./i18n/index";
import router from "./router";
import store from "./store/index";

import App from "./App.vue";

import "@/styles/element-variables.scss";
import "@/styles/main.scss";

import "@/components/SearchForms/_search-form.scss";
import "@/components/ListCards/_card.scss";
import "@/views/EntitiesPages/_entity-info.scss";

if (process.env.NODE_ENV === "development") {
  import("@/styles/for-dev.scss").then(() => {
    for (let i = 0; i < 3; i++) {
      document.head.insertBefore(document.head.lastChild, document.head.firstChild);
    }
  });
}

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(DatePicker);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Container);
Vue.use(Main);
Vue.component(CollapseTransition.name, CollapseTransition);

if (/^(\/en\/|\/ru\/)/.test(window.location.pathname)) {
  i18n.locale = window.location.pathname.match(/^(\/en\/|\/ru\/)/)[0].replace(/\//g, "");
}

switch (i18n.locale) {
  case "en":
    locale.use(langEN);
    break;
  case "ru":
    locale.use(langRU);
    break;
  case "ro":
    locale.use(langRO);
    break;
  default:
    locale.use(langEN);
}

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
