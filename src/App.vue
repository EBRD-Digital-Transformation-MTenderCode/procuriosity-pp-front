<template>
  <div id="app">
    <div v-if="dev">
      <el-header class="header" height>
        <div class="header-second">
          <el-container direction="vertical">
            <nav class="header-entity-nav">
              <router-link
                v-for="(entity, key) in {
                  budgets: { name: 'Budgets' },
                  plans: { name: 'Plans' },
                  tenders: { name: 'Tenders' },
                  contracts: { name: 'Contracts' },
                }"
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
    if (/\/en\/|\/ru\//.test(window.location.pathname)) {
      this.$i18n.locale = window.location.pathname.match(/\/en\/|\/ru\//)[0].replace(/\//g, "");
    }
  },
  data() {
    return {
      dev: false,
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "development") {
      this.dev = true;
    }
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
