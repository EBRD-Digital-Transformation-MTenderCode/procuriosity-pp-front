<template>
  <el-footer class="footer" height>
    <el-container>
      <el-row :gutter="30">
        <el-col>
          <div class="footer-logo">
            <router-link to="/">
              <img src="@/assets/logo-footer.png" alt="" class="footer-logo__img">
            </router-link>
            <div class="footer-logo__cr">
              {{$t("message.footer_logo_cr")}}
            </div>
          </div>
          <nav class="footer-nav">
            <a href="#">{{$t("message.footer_nav_electronic_tenders")}}</a><br>
            <a href="#">{{$t("message.footer_nav_for_contracting")}}</a><br>
            <a href="#">{{$t("message.footer_nav_for_state_owned")}}</a><br>
            <a href="#">{{$t("message.footer_nav_for_commercial")}}</a><br>
            <a href="#">{{$t("message.footer_nav_for_suppliers")}}</a><br>
            <a href="#">{{$t("message.footer_nav_for_civil")}}</a><br>
            <a href="#">{{$t("message.footer_nav_news")}}</a><br>
            <a href="#">{{$t("message.footer_nav_FAQ")}}</a><br>
            <a href="#">{{$t("message.footer_nav_vacancies")}}</a><br>
          </nav>
          <div class="footer-info">
            <div class="footer-info__text">
              {{$t("message.footer_info_text")}}
            </div>
            <div class="footer-info__tel">
              <a href="tel:+37322022789789">{{$t("message.footer_info_tel")}}</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </el-footer>
</template>

<script>
  import { Footer, Container, Row, Col } from "element-ui";

  export default {
    name: "AppFooter",
    components: {
      "el-footer": Footer,
      "el-container": Container,
      "el-row": Row,
      "el-col": Col
    }
  };
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    margin-top: 20px;
    padding: 20px 0 35px;
    background-color: #d9d9d9;
    .el-col {
      display: flex;
      @media (max-width: 768px) {
        flex-wrap: wrap;
      }
      @media (max-width: 640px) {
        justify-content: center;
        & > * {
          width: 100%;
          margin-left: 0;
          margin-right: 0;
          text-align: center;
        }
      }
    }
    &-logo {
      flex-shrink: 0;
      margin-right: 70px;
      @media (max-width: 768px) {
        margin-right: 30px;
        margin-bottom: 15px;
      }
      &__img {
        margin-bottom: 30px;
      }
      &__cr {
        font-size: 11px;
      }
    }
    &-nav {
      columns: 3;
      column-gap: 15px;
      line-height: 1.5;
      @media (max-width: 768px) {
        margin-bottom: 15px;
      }
      @media (max-width: 480px) {
        columns: 2;
      }
      a {
        font-size: 12px;
        box-shadow: 0 0 0 transparent;
        transition: 0.4s;
        &:hover {
          box-shadow: 0 1px 0 0 #323232;
        }
      }
    }
    &-info {
      flex-shrink: 0;
      align-self: flex-end;
      margin-left: 45px;
      @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
      }
      &__text {
        font-size: 12px;
      }
      &__tel {
        font-weight: 600;
        font-size: 35px;
        color: #5f5f5f;
      }
    }
  }
</style>
