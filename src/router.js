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
    /*{
      path: "/budgets/:id",
      name: "budget-page",
      component: () => import(/!* webpackChunkName: "BudgetPage" *!/ "./views/EntitiesPages/BudgetPage.vue")
    },*/
    {
      path: "/tenders/:id",
      name: "tender-page",
      component: () => import(/* webpackChunkName: "TenderPage" */ "./views/EntitiesPages/TenderPage.vue")
    },
    {
      path: "/news",
      name: "news",
      component: () => import(/* webpackChunkName: "News" */ "./views/NewsList.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "About" */ "./views/StaticPages/About.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import(/* webpackChunkName: "Register" */ "./views/StaticPages/Register.vue")
    },
    {
      path: "/legal-framework",
      name: "legal-framework",
      component: () => import(/* webpackChunkName: "LegalFramework" */ "./views/StaticPages/LegalFramework.vue")
    },
    {
      path: "/for-civil",
      name: "for-civil",
      component: () => import(/* webpackChunkName: "ForCivil" */ "./views/StaticPages/ForCivil.vue")
    },
    {
      path: "/security-and-confidentiality",
      name: "security-and-confidentiality",
      component: () => import(/* webpackChunkName: "SecurityAndConfidentiality" */ "./views/StaticPages/SecurityAndConfidentiality.vue")
    },
    {
      path: "/join-mtender",
      name: "join-mtender",
      component: () => import(/* webpackChunkName: "JoinMTender" */ "./views/StaticPages/JoinMTender.vue")
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
