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
      if ((/\/en\/|\/ru\//).test(window.location)) {
        const lang = window.location.pathname.match(/\/en\/|\/ru\//)[0].replace(/\//g, "");
        this.$i18n.locale = lang;
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
