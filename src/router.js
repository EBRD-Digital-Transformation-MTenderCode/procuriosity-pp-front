import Vue from "vue";
import Router from "vue-router";
import MainPage from "./views/MainPage";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main-page",
      component: MainPage
    },
    {
      path: "/(budgets|tenders|plans|contracts)",
      name: "list",
      component: () => import(/* webpackChunkName: "List" */ "./components/List.vue")
    },
    {
      path: "/tenders/:id",
      name: "tender-page",
      component: () => import(/* webpackChunkName: "TenderPage" */ "./views/EntitiesPages/TenderPage.vue")
    }
  ]
});
