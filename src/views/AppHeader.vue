<template>
  <el-header class="header" height="">
    <div class="header-first">
      <el-container>
        <el-row :gutter="30">
          <el-col>
            <div class="header-logo-ebrd">
              <a href="/" class="header-logo-ebrd__link">
                <img src="@/assets/logo-ebrd.png" class="header-logo-ebrd__img" alt="EBRD">
              </a>
              <div class="header-logo-ebrd__text">
                <div>{{$t("message.header_ebrd_line1")}}</div>
                <div>{{$t("message.header_ebrd_line2")}}</div>
              </div>
            </div>
            <!--<locale-toggle />-->
          </el-col>
        </el-row>
      </el-container>
    </div>
    <div class="header-second">
      <el-container direction="vertical">
        <el-row :gutter="30">
          <el-col>
            <router-link to="/" class="header-logo-mtender__link">
              <img src="@/assets/logo.png" class="header-logo-mtender__img" alt="MTender">
            </router-link>
            <nav class="header-static-nav">
              <a href="#">{{$t("message.header_static_nav_news")}}</a>
              <a href="#">{{$t("message.header_static_nav_about_MTender")}}</a>
              <a href="#">{{$t("message.header_static_nav_register")}}</a>
              <a href="#">{{$t("message.header_static_nav_legal_framework")}}</a>
              <a href="#">{{$t("message.header_static_nav_for_civil")}}</a>
              <a href="#">{{$t("message.header_static_nav_security_and_confidentiality")}}</a>
              <a href="#">{{$t("message.header_static_nav_join_MTender")}}</a>
              <a href="#">{{$t("message.header_static_nav_FAQ")}}</a>
            </nav>
          </el-col>
        </el-row>
        <nav class="header-entity-nav">
          <router-link
              v-for="(entity, key) in entities"
              :key="entity.name"
              :to="`/${key}`"
              active-class="is-active"
          >
            {{ $t(entity.name) }}
          </router-link>
        </nav>
      </el-container>
    </div>
  </el-header>
</template>

<script>
  import { mapState } from "vuex";

  /*import LocaleToggle from "./../components/LocaleToggle";*/

  import "./../assets/logo.png";

  export default {
    name: "AppHeader",
    components: {
      /*"locale-toggle": LocaleToggle*/
    },
    computed: {
      ...mapState(["entities"])
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../styles/variables";

  .header {
    padding: 0;
    width: 100%;
    .el-col {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-first {
      padding: 9px 0 5px;
      background-color: $mainC;
      color: #fff;
      .el-col {
        @media (max-width: 570px) {
          flex-wrap: wrap;
          justify-content: center;
        }
      }
    }
    &-second {
      padding-top: 25px;
      background-color: #fff;
      .el-col {
        @media (max-width: 640px) {
          flex-wrap: wrap;
        }
      }
    }
    &-logo {
      &-ebrd {
        display: flex;
        align-items: center;
        @media (max-width: 570px) {
          margin-bottom: 10px;
        }
        @media (max-width: 400px) {
          flex-wrap: wrap;
        }
        &__link {
          flex-shrink: 0;
        }
        &__img {
          height: 30px;
          margin-right: 20px;
          @media (max-width: 400px) {
            height: 40px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 5px;
          }
        }
        &__text {
          line-height: 1.1;
          font-size: 11px;
          @media (max-width: 400px) {
            width: 100%;
            text-align: center;
          }
        }
      }
      &-mtender {
        &__link {
          flex-shrink: 0;
          @media (max-width: 640px) {
            width: 100%;
            text-align: center;
          }
        }
        &__img {
          align-self: flex-start;
          margin-right: 20px;
          @media (max-width: 640px) {
            margin: 0 auto 15px;
          }
        }
      }
    }
    &-static-nav {
      display: flex;
      justify-content: flex-end;
      align-self: flex-start;
      flex-wrap: wrap;
      max-width: 43%;
      text-align: right;
      @media (max-width: 900px) {
        max-width: 100%;
      }
      @media (max-width: 640px) {
        width: 100%;
        flex-grow: 1;
        justify-content: center;
      }
      a {
        display: inline-block;
        height: 12px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #838383;
        transition: 0.4s;
        &:hover {
          color: #323232;
        }
        &:not(:last-child) {
          margin-right: 10px;
          padding-right: 10px;
          border-right: 1px solid #838383;
        }
      }
    }
    &-entity-nav {
      display: flex;
      justify-content: space-between;
      margin-top: 22px;
      @media (max-width: 860px) {
        flex-direction: column;
      }
      a {
        flex-grow: 1;
        margin: 0 10px;
        padding: 14px;
        border: none;
        border-radius: 3px 3px 0 0;
        background-color: #efefef;
        white-space: nowrap;
        text-align: center;
        line-height: 1;
        font-size: 20px;
        color: #323232;
        transition: 0.4s;
        @media (max-width: 860px) {
          margin: 5px 0;
          border-radius: 0;
        }
        &:hover {
          box-shadow: 0 -2px 4px #e2e2e2;
          @media (max-width: 860px) {
            box-shadow: none;
          }
        }
        &.is-active {
          background-color: $mainC;
          color: #fff;
        }
        &:first-child {
          margin-left: 0;
          @media (max-width: 860px) {
            margin-top: 0;
            border-radius: 3px 3px 0 0;
          }
        }
        &:last-child {
          margin-right: 0;
          @media (max-width: 860px) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
