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
  export default {
    name: "App",
    beforeCreate() {
      if ((/\/en\/|\/ru\//).test(window.location.pathname)) {
        const lang = window.location.pathname.match(/\/en\/|\/ru\//)[0].replace(/\//g, "");
        this.$i18n.locale = lang;
      }

      if ((/^#\/tenders\/ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/).test(window.location.hash) ||
        (/^#\/tenders\/MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]{1}$/).test(window.location.hash)) {
        this.$router.replace(window.location.hash.replace("#", ""))
      }

      if ((/^#\/contracts\/ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/).test(window.location.hash) ||
        (/^#\/contracts\/MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]{1}-[0-9]{2}$/).test(window.location.hash)) {
        this.$router.replace(window.location.hash.replace("#", ""))
      }
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
