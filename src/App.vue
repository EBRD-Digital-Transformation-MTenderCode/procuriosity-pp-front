<template>
  <div id="app">
    <template v-if="dev">
      <header class="header">
        <div class="header-second">
          <el-container direction="vertical">
            <nav class="header-entity-nav">
              <a
                :href="`${$route.fullPath.replace(/^(\/en|\/ru|\/ro)/, '')}`"
                :class="!$route.path.match(/^(\/en|\/ru)/) ? 'is-active' : ''"
              >
                RO
              </a>
              <a
                :href="`${$route.fullPath.replace(/^(\/en|\/ru|\/ro)/, '').replace(/^\//, '/en/')}`"
                :class="$route.path.match(/^\/en/) ? 'is-active' : ''"
              >
                EN
              </a>
              <a
                :href="`${$route.fullPath.replace(/^(\/en|\/ru|\/ro)/, '').replace(/^\//, '/ru/')}`"
                :class="$route.path.match(/^\/ru/) ? 'is-active' : ''"
              >
                RU
              </a>
            </nav>
            <nav class="header-entity-nav">
              <a
                :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}budgets`"
                :class="
                  $route.fullPath === `/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}budgets` ? 'is-active' : ''
                "
              >
                Budgets
              </a>
              <a
                :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}plans`"
                :class="
                  $route.fullPath === `/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}plans` ? 'is-active' : ''
                "
              >
                Plans
              </a>
              <a
                :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}plans?procedures=pin`"
                :class="
                  $route.fullPath === `/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}plans?procedures=pin`
                    ? 'is-active'
                    : ''
                "
              >
                PINs
              </a>
              <a
                :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders`"
                :class="
                  $route.fullPath === `/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders` ? 'is-active' : ''
                "
              >
                Tenders
              </a>
              <a
                :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders?procedures=commercial`"
                :class="
                  $route.fullPath === `/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders?procedures=commercial`
                    ? 'is-active'
                    : ''
                "
              >
                Com. Tenders
              </a>
              <a
                :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}contracts?procedures=signing`"
                :class="
                  $route.fullPath === `/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}contracts?procedures=signing`
                    ? 'is-active'
                    : ''
                "
              >
                Contracts Signing
              </a>
              <a
                :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}contracts`"
                :class="
                  $route.fullPath === `/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}contracts` ? 'is-active' : ''
                "
              >
                Contracts Implementstion
              </a>
            </nav>
          </el-container>
        </div>
      </header>
    </template>
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
  data() {
    return {
      dev: process.env.NODE_ENV === "development",
    };
  },
};
</script>
