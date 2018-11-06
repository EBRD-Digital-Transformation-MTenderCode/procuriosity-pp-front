<template>
  <div id="app">
      <el-main>
        <router-view />
      </el-main>
  </div>
</template>

<script>
  import { defaultLocale } from "./i18n";

  export default {
    name: "App",
    beforeCreate() {
      this.$route.params.lang ? this.$i18n.locale = this.$route.params.lang : this.$i18n.locale = defaultLocale;
    }
  };
</script>
