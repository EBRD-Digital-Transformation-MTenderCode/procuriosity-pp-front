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
      <i class="el-icon-arrow-down el-icon--right"></i>
      <EN v-if="this.$i18n.locale === 'en'" />
      <RU v-if="this.$i18n.locale === 'ru'" />
      <RO v-if="this.$i18n.locale === 'ro'" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(locale, i) of locales"
        :key="`locale${i}`"
        :command="locale"
        divided
      >
        <EN v-if="locale === 'en'" />
        <RU v-if="locale === 'ru'" />
        <RO v-if="locale === 'ro'" />
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import axios from "axios";

  import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";
  import EN from "./../views/flags/EN";
  import RU from "./../views/flags/RU";
  import RO from "./../views/flags/RO";

  export default {
    name: "LocaleToggle",
    data() {
      return {locales: Object.keys(this.$i18n.messages)};
    },
    components: {
      "el-dropdown": Dropdown,
      "el-dropdown-menu": DropdownMenu,
      "el-dropdown-item": DropdownItem,
      EN,
      RU,
      RO
    },
    methods: {
      toggleLocale: function(locale) {
        this.$i18n.locale = locale;
        axios.defaults.headers.common["Accept-Language"] = locale;
        document.querySelector("html").setAttribute("lang", locale);
        localStorage.setItem("locale", locale);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .locale-toggle {
    line-height: 1;
    svg {
      display: inline-block;
      width: auto;
    }
    .el-dropdown-link {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-arrow-down {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
      }
    }
    .el-icon-arrow-down {
      margin-right: 10px;
    }
    .el-dropdown-menu__item {
      padding: 0 10px;
      margin: 10px 0;
    }
  }
</style>
