<template>
  <div id="app">
    <el-main>
      <transition name="fade" mode="out-in" appear>
        <router-view />
      </transition>
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

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
