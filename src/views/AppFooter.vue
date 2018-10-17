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
              2018 ©, {{$t("message.footer_logo_cr")}}
            </div>
          </div>
          <nav class="footer-nav">
            <div>
              <!--<router-link to="/news">{{$t("message.footer_nav_news")}}</router-link><br>-->
              <router-link to="/about">{{$t("message.footer_nav_about_MTender")}}</router-link>
              <router-link to="/register">{{$t("message.footer_nav_register")}}</router-link><br>
            </div>
            <div>
              <a href="#">{{$t("message.footer_nav_legal_framework")}}</a><br>
              <a href="#">{{$t("message.footer_nav_for_civil")}}</a><br>
              <a href="#">{{$t("message.footer_nav_security_and_confidentiality")}}</a><br>
            </div>
            <div>
              <a href="#">{{$t("message.footer_nav_join_MTender")}}</a><br>
              <!--<a href="#">{{$t("message.footer_nav_FAQ")}}</a><br>-->
            </div>
          </nav>
          <div class="footer-info">
            <div class="footer-info__text">
              {{$t("message.footer_info_text")}}:
            </div>
            <div class="footer-info__tel">
              <a href="tel:+37322022789789">022 789 789</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </el-footer>
</template>

<script>
  export default {
    name: "AppFooter"
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
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      line-height: 1.5;
      @media (max-width: 768px) {
        margin-bottom: 15px;
      }
      @media (max-width: 480px) {
        columns: 2;
      }
      div:not(:last-child) {
        margin-right: 20px;
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
