<template>
  <div>
    <div class="main-banner">
      <el-container direction="vertical">
        <div class="main-title">
          <div>MTender</div>
          {{$t("message.main_title")}}
        </div>
        <div class="main-count">
          <div class="main-count__number">12′256′413 <span class="main-count_currency">MDL</span></div>
          <div class="main-count__text">{{$t("message.main_total_saving")}}</div>
        </div>
        <a href="/" class="main__join-button">{{$t("message.main_join")}}</a>
      </el-container>
    </div>
    <el-container direction="vertical">
      <div class="main-news">
        <div class="main-news__title">
          {{$t("message.main_news")}}
        </div>
        <div class="main-news__cards-wp">
          <div class="main-news__card">
            <img src="@/assets/news1.jpg" alt="news1" class="main-news__img">
            <div class="main-news__text">
              {{$t("message.main_news1")}}
            </div>
          </div>
          <div class="main-news__card">
            <img src="@/assets/news2.jpg" alt="news2" class="main-news__img">
            <div class="main-news__text">
              {{$t("message.main_news2")}}
            </div>
          </div>
          <div class="main-news__card">
            <img src="@/assets/news3.jpg" alt="news3" class="main-news__img">
            <div class="main-news__text">
              {{$t("message.main_news2")}}
            </div>
          </div>
        </div>
      </div>
    </el-container>
    <div class="main-about">
      <el-container direction="vertical">
        <div class="main-about__title">
          {{$t("message.main_h11")}}
        </div>
        <div class="main-about__text">
          {{$t("message.main_p1")}}
        </div>
        <div class="main-about__cards-wp">
          <div class="main-about__card">
            <img src="@/assets/main-ico1.png" alt="main ico 1" class="main-about__img">
            <div class="main-about__card-text">
              {{$t("message.main_ul1_li1")}}
            </div>
          </div>
          <div class="main-about__card">
            <img src="@/assets/main-ico2.png" alt="main ico 2" class="main-about__img">
            <div class="main-about__card-text">
              {{$t("message.main_ul1_li2")}}
            </div>
          </div>
          <div class="main-about__card">
            <img src="@/assets/main-ico3.png" alt="main ico 3" class="main-about__img">
            <div class="main-about__card-text">
              {{$t("message.main_ul1_li3")}}
            </div>
          </div>
        </div>
        <hr class="main-about__line">
        <div class="main-about__sub-title">
          {{$t("message.main_p2")}}
        </div>
        <div class="main-about__sub-text">
          {{$t("message.main_p3")}}
        </div>
        <div class="main-about__partners">
          <div class="main-about__partners_title">
            {{$t("message.main_p4")}}
          </div>
          <div class="main-about__partners_links">
            <a
                v-for="platform of randomSortPlatforms"
                :key="platform.link"
                :href="platform.link"
                target="_blank"
            >
              <img :src="platform.img" :alt="platform.alt">
            </a>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MainPage",
    data() {
      return {
        platforms: [
          {
            link: "https://yptender.md/",
            img: "../img/yptender.png",
            alt: "yptender"
          },
          {
            link: "https://e-licitatie.md/",
            img: "../img/e-lici.png",
            alt: "e-lici"
          },
          {
            link: "https://achizitii.md/",
            img: "../img/achizitii.md .png",
            alt: "achizitii"
          }
        ]
      };
    },
    computed: {
      randomSortPlatforms() {
        return [...this.platforms].sort(() => 0.5 - Math.random());
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../styles/variables";

  .main {
    &-banner {
      display: flex;
      width: 100%;
      height: 610px;
      margin-bottom: 25px;
      padding: 63px 0;
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
      margin-bottom: 28px;
      line-height: 1.2;
      font-size: 47px;
      font-weight: 400;
      color: #fff;
      @media (max-width: 480px) {
        font-size: 9vw;
      }
    }
    &-count {
      margin-bottom: 120px;
      &__number {
        display: flex;
        align-items: flex-start;
        margin-bottom: 5px;
        line-height: 0.8;
        letter-spacing: 7px;
        font-size: 125px;
        font-weight: 700;
        color: #fff;
        @media (max-width: 800px) {
          font-size: 12vw;
        }
        @media (max-width: 768px) {
          justify-content: center;
        }
        @media (max-width: 380px) {
          font-size: 8vw;
        }
      }
      &_currency {
        align-self: flex-start;
        font-size: 18px;
        font-weight: 400;
      }
      &__text {
        font-size: 36px;
        font-weight: 700;
        color: #fff;
        @media (max-width: 768px) {
          font-size: 28px;
        }
      }
    }
    &__join-button {
      align-self: flex-start;
      padding: 14px 58px;
      border: none;
      border-radius: 3px;
      background-color: $secondaryC2;
      font-size: 25px;
      color: #fff;
      transition: 0.4s;
      &:hover {
        background-color: lighten($secondaryC2, 8%);
      }
      @media (max-width: 768px) {
        align-self: center;
      }
    }
    &-news {
      padding-bottom: 52px;
      &__title {
        margin-bottom: 18px;
        font-size: 30px;
        font-weight: 700;
      }
      &__cards-wp {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        @media (max-width: 940px) {
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      &__card {
        max-width: 289px;
        margin: 0 20px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        @media (max-width: 940px) {
          margin: 20px;
        }
      }
      &__img {
        margin-bottom: 22px;
      }
      &__text {
        line-height: 1.65;
        font-size: 13px;
      }
    }
    &-about {
      margin-bottom: -20px;
      padding-top: 35px;
      background-color: #fff;
      &__title {
        text-align: center;
        margin-bottom: 25px;
        font-size: 30px;
        font-weight: 700;
      }
      &__text {
        max-width: 70%;
        margin-bottom: 50px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        line-height: 1.75;
        font-size: 15px;
      }
      &__cards-wp {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 105px;
        @media (max-width: 940px) {
          flex-wrap: wrap;
          justify-content: center;
        }
      }
      &__card {
        max-width: 30%;
        text-align: center;
        @media (max-width: 768px) {
          max-width: 100%;
          &:not(:last-child) {
            margin-bottom: 20px;
          }
        }
      }
      &__img {
        margin-bottom: 30px;
      }
      &__card-text {
        font-size: 13px;
      }
      &__line {
        display: block;
        width: 70%;
        height: 1px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50px;
      }
      &__sub-title {
        width: 70%;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        @media (max-width: 768px) {
          width: 100%;
        }
      }
      &__sub-text {
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 35px;
        text-align: justify;
        @media (max-width: 768px) {
          width: 100%;
        }
      }
      &__partners {
        padding-bottom: 90px;
        &_title {
          margin-bottom: 80px;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          color: $secondaryC1;
        }
        &_links {
          display: flex;
          justify-content: space-between;
          align-items: center;
          @media (max-width: 768px) {
            flex-wrap: wrap;
            justify-content: center;
          }
          a {
            max-width: 20%;
            @media (max-width: 768px) {
              max-width: 50%;
              margin: 20px;
            }
            @media (max-width: 768px) {
              min-width: 200px;
            }
          }
        }
      }
    }
  }
</style>
