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
              2018 ©, {{ $t("footer.logo_cr") }}
            </div>
          </div>
          <nav class="footer-nav">
            <div>
              <!--<router-link to="/news">{{$t("footer.nav_news")}}</router-link><br>-->
              <router-link active-class="footer-nav_active" to="/about">
                {{$t("footer.nav_about_MTender")}}
              </router-link><br>
              <router-link active-class="footer-nav_active" to="/register">
                {{$t("footer.nav_register")}}
              </router-link><br>
            </div>
            <div>
              <router-link active-class="footer-nav_active" to="/legal-framework">
                {{$t("footer.nav_legal_framework")}}
              </router-link><br>
              <router-link active-class="footer-nav_active" to="/security-and-confidentiality">
                {{$t("footer.nav_security_and_confidentiality")}}
              </router-link><br>
              <router-link active-class="footer-nav_active" to="/join-mtender">
                {{$t("footer.nav_join_MTender")}}
              </router-link><br>
            </div>
            <div>
              <router-link active-class="footer-nav_active" to="/accreditation">
                {{$t("footer.nav_accreditation")}}
              </router-link><br>
              <router-link active-class="footer-nav_active" to="/for-civil">
                {{$t("footer.nav_for_civil")}}
              </router-link><br>
              <router-link active-class="footer-nav_active" to="/faq">
                {{$t("footer.nav_FAQ")}}
              </router-link><br>
            </div>
          </nav>
          <div class="footer-info">
            <div class="footer-info__text">
              {{$t("footer.info_text")}}:
            </div>
            <div class="footer-info__tel">
              <a v-if="isMobileDevice" href="tel:+373022822038">022 822 038</a>
              <div v-else>022 822 038</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </el-footer>
</template>

<script>
  import { isMobileDevice } from "./../utils";

  export default {
    name: "AppFooter",
    computed: {
      isMobileDevice
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
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      line-height: 1.5;
      @media (max-width: 845px) {
        justify-content: center;
      }
      @media (max-width: 480px) {
        columns: 2;
      }
      &_active {
        color: #000 !important;
      }
      div:not(:last-child) {
        margin-right: 20px;
        @media (max-width: 845px) {
          margin-right: 0;
          text-align: center;
        }
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
