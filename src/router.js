import Vue from "vue";
import Router from "vue-router";

import List from "./views/List";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/:lang?/:entityName(budgets|plans|tenders|contracts)`,
      name: "list",
      component: List,
    },
    {
      path: `/:lang?/plans/:id`,
      name: "plan",
      component: () =>
        import(/* webpackChunkName: "PlanPage" */ "./views/EntitiesPages/PlanPage/ContainerPlanPage.vue"),
    },
    {
      path: "/:lang?/budgets/:id",
      name: "budget-page",
      component: () =>
        import(/* webpackChunkName: "BudgetPage" */ "./views/EntitiesPages/BudgetPage/ContainerBudgetPage.vue"),
    },
    {
      path: `/:lang?/tenders/:id`,
      name: "tender",
      component: () =>
        import(/* webpackChunkName: "TenderPage" */ "./views/EntitiesPages/TenderPage/ContainerTenderPage.vue"),
    },
    {
      path: `/:lang?/contracts/:id`,
      name: "contract",
      component: () => import(/* webpackChunkName: "ContractPage" */ "./views/EntitiesPages/ContractPage.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const linkFrom = document.querySelector(`.header-entity-nav a[href*=${from.name}]`);
  const linkTo = document.querySelector(`.header-entity-nav a[href*=${to.name}]`);

  if (process.env.NODE_ENV !== "development") {
    if (from.name && linkFrom && linkTo) {
      linkFrom.classList.remove("is-active");
      linkTo.classList.add("is-active");
    }
  }
  next();
});

export default router;
