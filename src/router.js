import Vue from "vue";
import Router from "vue-router";

import List from "./views/List";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/:lang(en|ro|ru)?/plans/:id`,
      name: "plan",
      component: () =>
        import(/* webpackChunkName: "PlanPage" */ "./views/EntitiesPages/PlanPage/ContainerPlanPage.vue"),
    },
    {
      path: "/:lang(en|ro|ru)?/budgets/:id",
      name: "budget-page",
      component: () => import(/* webpackChunkName: "BudgetPage" */ "./views/EntitiesPages/BudgetPage/BudgetPage.vue"),
    },
    {
      path: `/:lang(en|ro|ru)?/tenders/:id`,
      name: "tender",
      component: () =>
        import(/* webpackChunkName: "TenderPage" */ "./views/EntitiesPages/TenderPage/ContainerTenderPage.vue"),
    },
    {
      path: `/:lang(en|ro|ru)?/contracts/:id`,
      name: "contract",
      component: () => import(/* webpackChunkName: "ContractPage" */ "./views/EntitiesPages/ContractPage.vue"),
    },
    {
      path: `/:lang(en|ro|ru)?/:entityName(budgets|plans|tenders|contracts)`,
      name: "list",
      component: List,
    },
    {
      path: `*`,
      name: "error",
      component: () => import(/* webpackChunkName: "Error" */ "./views/Error.vue"),
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
  if (process.env.NODE_ENV !== "development") {
    if (
      from.name &&
      document.querySelector(`.header-entity-nav a[href*=${from.name}]`) &&
      document.querySelector(`.header-entity-nav a[href*=${to.name}]`)
    ) {
      document.querySelector(`.header-entity-nav a[href*=${from.name}]`).classList.remove("is-active");
      document.querySelector(`.header-entity-nav a[href*=${to.name}]`).classList.add("is-active");
    }
  } else {
    if (
      document.querySelector(`.header-entity-nav a[href*=${from.name}]`) &&
      document.querySelector(`.header-entity-nav a[href*=${to.name}]`)
    ) {
      document.querySelector(`.header-entity-nav a[href*=${from.name}]`).classList.remove("is-active");
      document.querySelector(`.header-entity-nav a[href*=${to.name}]`).classList.add("is-active");
    }
  }
  next();
});

export default router;
