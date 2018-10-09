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

  export default {
    name: "App",
    components: {
      "app-header": AppHeader,
      "app-footer": AppFooter
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
