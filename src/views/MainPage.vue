<template>
  <div>
    <div class="main-banner">
      <el-container direction="vertical">
        <div class="main-title">
          <div>MTender</div>
          Leading by example
        </div>
        <div class="main-count">
          <div class="main-count__number">2 839 227</div>
          <div class="main-count__text">Total savings</div>
        </div>
      </el-container>
    </div>
    <el-container direction="vertical">
      <div class="main-organizations">
        <div>
          <img src="" alt="">
        </div>
        <div>
          <img src="" alt="">
        </div>
        <div>
          <img src="" alt="">
        </div>
        <div>
          <img src="" alt="">
        </div>
        <div>
          <img src="" alt="">
        </div>
        <div>
          <img src="" alt="">
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "MainPage"
  };
</script>

<style lang="scss" scoped>
  .main {
    &-banner {
      width: 100%;
      height: 610px;
      padding: 95px 0;
      background-image: url("./../assets/main-banner.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      @media (max-width: 768px) {
        height: 100%;
        text-align: center;
      }
    }
    &-title {
      margin-bottom: 35px;
      line-height: 1;
      font-family: serif;
      font-size: 47px;
      font-weight: 700;
      color: #fff;
      @media (max-width: 480px) {
        font-size: 9vw;
      }
    }
    &-count {
      &__number {
        line-height: 1.2;
        font-size: 141px;
        font-weight: 600;
        color: #fff;
        @media (max-width: 768px) {
          font-size: 18vw;
        }
      }
      &__text {
        font-family: serif;
        font-size: 37px;
        color: #fff;
        @media (max-width: 768px) {
          font-size: 28px;
        }
      }
    }
  }
</style>
