<template>
  <el-header class="header" height="">
    <div class="header-first">
      <el-container>
        <el-row :gutter="30">
          <el-col>
            <div class="header-logo-ebrd">
              <img src="@/assets/logo-ebrd.png" class="header-logo-ebrd__img" alt="EBRD">
              <div class="header-logo-ebrd__text">
                <div>eProcurement Pilot Project funded by the European Bank</div>
                <div>for Reconstruction and Development</div>
              </div>
            </div>
            <locale-toggle />
          </el-col>
        </el-row>
      </el-container>
    </div>
    <div class="header-second">
      <el-container>
        <el-row :gutter="30">
          <el-col>
            <img src="@/assets/logo.png" class="header-logo-mtender__img" alt="MTender">
            <nav class="header-nav">
              <a href="#">News</a>
              <a href="#">For Contracting Authorities</a>
              <a href="#">For State-Owned Enterprises</a>
              <a href="#">For Commercial Buyers</a>
              <a href="#">For Suppliers</a>
              <a href="#">For Civil Society</a>
              <a href="#">Vacancies</a>
              <a href="#">FAQ</a>
            </nav>
          </el-col>
        </el-row>
      </el-container>
    </div>
  </el-header>
</template>

<script>
  import { Header, Container, Row, Col } from "element-ui";
  import LocaleToggle from "./../components/LocaleToggle";

  import "./../assets/logo.png";

  export default {
    name: "AppHeader",
    components: {
      "el-header": Header,
      "el-container": Container,
      "el-row": Row,
      "el-col": Col,
      "locale-toggle": LocaleToggle
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../styles/variables";

  .header {
    padding: 0;
    .el-col {
      display: flex;
      justify-content: space-between;
      align-items: center;

    }
    &-first {
      padding: 15px 0;
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
      padding-bottom: 70px;
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
        &__img {
          height: 30px;
          margin-right: 15px;
          @media (max-width: 400px) {
            height: 40px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 5px;
          }
        }
        &__text {
          font-size: 11px;
          @media (max-width: 400px) {
            width: 100%;
            text-align: center;
          }
        }
      }
      &-mtender {
        &__img {
          align-self: flex-start;
          margin-right: 20px;
          @media (max-width: 640px) {
            margin: 0 auto 15px;
          }
        }
      }
    }
    &-nav {
      display: flex;
      justify-content: flex-end;
      align-self: flex-start;
      flex-wrap: wrap;
      max-width: 50%;
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
  }
</style>
