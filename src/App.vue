<template>
  <div id="app">
    <div v-if="dev">
      <el-header class="header" height="">
        <div class="header-second">
          <el-container direction="vertical">
            <nav class="header-entity-nav">
              <router-link
                  v-for="(entity, key) in {budgets: {name: 'Budgets'}, plans: {name: 'Plans'}, tenders: {name: 'Tenders'}, contracts: {name: 'Contracts'}}"
                  :key="entity.name"
                  :to="`/${key}`"
                  active-class="is-active"
              >
                {{ entity.name }}
              </router-link>
            </nav>
          </el-container>
        </div>
      </el-header>
    </div>
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
        this.$i18n.locale = window.location.pathname.match(/\/en\/|\/ru\//)[0].replace(/\//g, "");
      }

      if ((/^#\/tenders\/ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/).test(window.location.hash) ||
        (/^#\/tenders\/MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]$/).test(window.location.hash)) {
        this.$router.replace(window.location.hash.replace("#", ""))
      }

      if ((/^#\/contracts\/ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/).test(window.location.hash) ||
        (/^#\/contracts\/MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]-[0-9]{2}$/).test(window.location.hash)) {
        this.$router.replace(window.location.hash.replace("#", ""))
      }
    },
    data() {
      return {
        dev: false
      }
    },
    mounted() {
      if (process.env.NODE_ENV === "development") {
        this.dev = true
      }
    }
  };
</script>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
