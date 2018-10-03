<template>
  <el-footer class="footer" height>
    <el-container>
      <el-row :gutter="30">
        <el-col>
          <div class="footer-logo">
            <img src="@/assets/logo-footer.png" alt="" class="footer-logo__img">
            <div class="footer-logo__cr">
              2018 ©,  All rights reserved
            </div>
          </div>
          <nav class="footer-nav">
            <a href="#">Electronic tenders</a><br>
            <a href="#">For Contracting Authorities</a><br>
            <a href="#">For State-Owned Enterprises</a><br>
            <a href="#">For Commercial Buyers</a><br>
            <a href="#">For Suppliers</a><br>
            <a href="#">For Civil Society</a><br>
            <a href="#">News</a><br>
            <a href="#">FAQ</a><br>
            <a href="#">Vacancies</a><br>
          </nav>
          <div class="footer-info">
            <div class="footer-info__text">
              Info Line:
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
