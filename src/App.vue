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
  import { defaultLocale } from "./i18n"
  
  import AppHeader from "./views/AppHeader";
  import AppFooter from "./views/AppFooter";

  export default {
    name: "App",
    components: {
      "app-header": AppHeader,
      "app-footer": AppFooter
    },
    beforeCreate() {
      this.$route.params.lang ? this.$i18n.locale = this.$route.params.lang : this.$i18n.locale = defaultLocale;
    }
  };
</script>
