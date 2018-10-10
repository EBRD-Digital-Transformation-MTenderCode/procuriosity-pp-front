import Vue from "vue";
import Router from "vue-router";
import List from "./components/List.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/(budgets|tenders|plans|contracts)",
      name: "list",
      component: List
    },
    {
      path: "/budgets/:id",
      name: "budget-page",
      component: () => import(/* webpackChunkName: "BudgetPage" */ "./views/EntitiesPages/BudgetPage.vue")
    },
    {
      path: "/tenders/:id",
      name: "tender-page",
      component: () => import(/* webpackChunkName: "TenderPage" */ "./views/EntitiesPages/TenderPage.vue")
    }
  ]
});
