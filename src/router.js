import Vue from "vue";
import Router from "vue-router";

import List from "./views/List";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/:lang?/(budgets|plans|tenders|contracts)`,
      name: "list",
      component: List
    },
    /*{
     path: "/budgets/:id",
     name: "budget-page",
     component: () => import(/!* webpackChunkName: "BudgetPage" *!/ "./views/EntitiesPages/BudgetPage.vue")
     },*/
    {
      path: `/:lang?/tenders/:id`,
      name: "tender-page",
      component: () => import(/* webpackChunkName: "TenderPage" */ "./views/EntitiesPages/TenderPage/ContainerTenderPage.vue")
    },
    {
      path: `/:lang?/contracts/:id`,
      name: "contract-page",
      component: () => import(/* webpackChunkName: "ContractPage" */ "./views/EntitiesPages/ContractPage.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
