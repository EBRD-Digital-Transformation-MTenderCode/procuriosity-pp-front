<template>
  <div>
    <div class="main-banner">
      <el-container direction="vertical">
        <div class="main-title">
          <div>MTender</div>
          Leading by example
        </div>
        <div class="main-count">
          <div class="main-count__number">12′25′413 <span class="main-count__number__index">MDL</span></div>
          <div class="main-count__text">Total savings</div>
        </div>
      </el-container>
      <el-button class="main__button"> Join </el-button>
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
      display: flex;
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
      font-family: "Open Sans";
      font-size: 47px;
      font-weight: 400;
      color: #fff;
      @media (max-width: 480px) {
        font-size: 9vw;
      }
    }
    &-count {
      &__number {
        line-height: 0.8;
        font-family: "Open Sans";font-family: "Open Sans";
        font-size: 92px;
        font-weight: 700;
        color: #fff;
        display: flex;
        align-items: flex-start;
        @media (max-width: 768px) {
          font-size: 18vw;
        }
        &__index{
          font-size: 18px;
          align-self: flex-end;
        }
      }
      &__text {
        font-size: 36px;
        font-weight: 700;
        font-family: "Open Sans";
        color: #fff;
        padding-top: 19px;
        @media (max-width: 768px) {
          font-size: 28px;
        }
      }
    }
    &__button{
      align-self: flex-end;
      padding: 16px 58px;
      border-radius: 3px;
      background-color: #97ca63;
      color: #ffffff;
      font-family: "Open Sans";
      font-size: 25px;
      font-weight: 400;
    }
  }
</style>
