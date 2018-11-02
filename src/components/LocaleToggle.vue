<template>
  <el-dropdown
      trigger="click"
      @command="toggleLocale"
      size="small"
      class="locale-toggle"
  >
    <span
        class="el-dropdown-link"
    >
      
      <EN v-if="this.$i18n.locale === 'en'" />
      <RO v-if="this.$i18n.locale === 'ro'" />
      <RU v-if="this.$i18n.locale === 'ru'" />
      <i class="el-icon-caret-bottom el-icon--right" />
    </span>
    <el-dropdown-menu class="locale-dropdown-menu" slot="dropdown">
      <el-dropdown-item
          v-for="(locale, i) of locales"
          :key="`locale${i}`"
          :command="locale"
          divided
      >
        <EN v-if="locale === 'en'" />
        <RO v-if="locale === 'ro'" />
        <RU v-if="locale === 'ru'" />
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import axios from "axios";
  
  import { defaultLocale } from "./../i18n";

  import EN from "./../views/flags/EN";
  import RU from "./../views/flags/RU";
  import RO from "./../views/flags/RO";

  export default {
    name: "LocaleToggle",
    data() {
      return { locales: Object.keys(this.$i18n.messages) };
    },
    components: {
      EN,
      RU,
      RO
    },
    methods: {
      toggleLocale: function(locale) {
        this.$i18n.locale = locale;

        this.$router.replace({
          params: {
            lang: locale !== defaultLocale ? locale : null
          }
        });

        axios.defaults.headers.common["Accept-Language"] = locale;
        document.querySelector("html").setAttribute("lang", locale);
      }
    }
  };
</script>

<style lang="scss">
  .locale {
    &-lang {
      color: #fff;
    }
    &-toggle {
      line-height: 1;
      @media (max-width: 570px) {
        margin-bottom: 10px;
      }
      .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .el-icon-caret-bottom {
        font-weight: 700;
        color: #fff;
      }
    }
    &-dropdown-menu {
      padding: 0;
      .el-dropdown-menu__item {
        margin: 5px 0;
        line-height: 2;
        .locale-lang {
          color: #000;
        }
      }
    }
  }
</style>
