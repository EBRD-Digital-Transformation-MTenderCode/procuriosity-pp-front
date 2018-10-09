<template>
  <div id="app">
      <app-header />
      <el-main>
        <router-view />
      </el-main>
      <app-footer />
  </div>
</template>

<script>
  import AppHeader from "./views/AppHeader";
  import AppFooter from "./views/AppFooter";
  import entities from "./store/entities";

  export default {
    name: "App",
    components: {
      "app-header": AppHeader,
      "app-footer": AppFooter
    },
    created: () => {
      const entities = {
        "budgets":{
        },
        "plans":{
        },
        "tenders":{
        },
        "contracts":{
        }};
      const localStorageEntities = localStorage.getItem("entities");
      if(!localStorageEntities){
        localStorage.setItem("entities", JSON.stringify(entities));
      }
    }


  };
</script>

<style lang="scss">
  @import "./styles/element-variables.scss";
  @import "./styles/main.scss";

  #app {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    min-height: 100vh;
  }
</style>
