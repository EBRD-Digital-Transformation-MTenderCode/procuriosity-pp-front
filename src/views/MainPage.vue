<template>
  <div class="main">
    <div class="main-banner">
      <el-container direction="vertical">
        <div class="main-title">
          {{$t("main.title")}}
          <span class="carousel-indicators">
            <span
                :class="activeSlide === 0 ? 'carousel-indicator is-active' : 'carousel-indicator'"
                @click="setActiveItem(0)"
            />
            <span
                :class="activeSlide === 1 ? 'carousel-indicator is-active' : 'carousel-indicator'"
                @click="setActiveItem(1)"
            />
            <span
                :class="activeSlide === 2 ? 'carousel-indicator is-active' : 'carousel-indicator'"
                @click="setActiveItem(2)"
            />
          </span>
        </div>
        <el-carousel
            ref="carousel"
            trigger="click"
            indicator-position="none"
            arrow="never"
            :interval="5000"
            @change="currentSlide"
        >
          <el-carousel-item>
            <div class="slide-item">
              <div class="slide-item__part">
                <div class="slide-item__ico slide-item__ico_active-procedures" />
                <div class="slide-item__number">933</div>
              </div>
              <i18n path="main.slide1_1" tag="div" class="slide-item__text">
                <div place="slide1_1_place">{{ $t("main.slide1_1_place") }}</div>
              </i18n>
            </div>
            <div class="slide-item">
              <div class="slide-item__part">
                <div class="slide-item__ico slide-item__ico_concluded-contracts" />
                <div class="slide-item__number">2’470</div>
              </div>
              <i18n path="main.slide1_2" tag="div" class="slide-item__text">
                <div place="slide1_2_place">{{ $t("main.slide1_2_place") }}</div>
              </i18n>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slide-item">
              <div class="slide-item__part">
                <div class="slide-item__ico slide-item__ico_contracting-entities" />
                <div class="slide-item__number">817</div>
              </div>
              <i18n path="main.slide2_1" tag="div" class="slide-item__text">
                <div place="slide2_1_place">{{ $t("main.slide2_1_place") }}</div>
              </i18n>
            </div>
            <div class="slide-item">
              <div class="slide-item__part">
                <div class="slide-item__ico slide-item__ico_economic-operators" />
                <div class="slide-item__number">1’860</div>
              </div>
              <i18n path="main.slide2_2" tag="div" class="slide-item__text">
                <div place="slide2_2_place">{{ $t("main.slide2_2_place") }}</div>
              </i18n>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slide-item">
              <div class="slide-item__part">
                <div class="slide-item__ico slide-item__ico_total-savings" />
                <div class="slide-item__number">12’150’000</div>
              </div>
              <i18n path="main.slide3_1" tag="div" class="slide-item__text">
                <div place="slide3_1_place">{{ $t("main.slide3_1_place") }}</div>
              </i18n>
            </div>
          </el-carousel-item>
        </el-carousel>
        <router-link to="/join-mtender" class="main__join-button">{{$t("main.join")}}</router-link>
      </el-container>
    </div>
    <el-container direction="vertical">
      <div class="main-news">
        <div class="main-news__title">
          {{$t("main.news")}}
        </div>
        <div class="main-news__cards-wp">
          <div class="main-news__card">
            <img src="@/assets/news_1.jpg" alt="news1" class="main-news__img">
            <div class="main-news__text">
              {{$t("main.news1")}}
            </div>
          </div>
          <div class="main-news__card">
            <img src="@/assets/news2.jpg" alt="news2" class="main-news__img">
            <div class="main-news__text">
              {{$t("main.news2")}}
            </div>
          </div>
          <div class="main-news__card">
            <img src="@/assets/news3.jpg" alt="news3" class="main-news__img">
            <div class="main-news__text">
              {{$t("main.news2")}}
            </div>
          </div>
        </div>
      </div>
    </el-container>
    <div class="main-about">
      <el-container direction="vertical">
        <div class="main-about__title">
          {{$t("main.h11")}}
        </div>
        <div class="main-about__text">
          {{$t("main.p1")}}
        </div>
        <div class="main-about__cards-wp">
          <div class="main-about__card">
            <img src="@/assets/main-ico1.png" alt="main ico 1" class="main-about__img">
            <div class="main-about__card-text">
              {{$t("main.ul1_li1")}}
            </div>
          </div>
          <div class="main-about__card">
            <img src="@/assets/main-ico2.png" alt="main ico 2" class="main-about__img">
            <div class="main-about__card-text">
              {{$t("main.ul1_li2")}}
            </div>
          </div>
          <div class="main-about__card">
            <img src="@/assets/main-ico3.png" alt="main ico 3" class="main-about__img">
            <div class="main-about__card-text">
              {{$t("main.ul1_li3")}}
            </div>
          </div>
        </div>
        <hr class="main-about__line">
        <div class="main-about__sub-title">
          {{$t("main.p2")}}
        </div>
        <div class="main-about__sub-text">
          {{$t("main.p3")}}
        </div>
        <div class="main-about__partners">
          <div class="main-about__partners_title">
            {{$t("main.p4")}}
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
        ],
        activeSlide: 0
      };
    },
    computed: {
      randomSortPlatforms() {
        return [...this.platforms].sort(() => 0.5 - Math.random());
      }
    },
    methods: {
      setActiveItem(index) {
        this.$refs.carousel.setActiveItem(index);
      },
      currentSlide(index) {
        this.activeSlide = index
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
      background-position: center left;
      background-repeat: no-repeat;
      @media (max-width: 768px) {
        height: 100%;
        text-align: center;
      }
    }
    &-title {
      margin-bottom: 28px;
      line-height: 1.2;
      font-size: 33px;
      font-weight: 400;
      color: #fff;
      @media (max-width: 480px) {
        font-size: 9vw;
      }
    }
    .el-carousel__indicators {
      position: absolute;
      top: 0;
      bottom: inherit;
    }
    .carousel-indicators {
      margin-left: 20px;
      .carousel-indicator {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid $secondaryC1;
        border-radius: 50%;
        background-color: transparent;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 10px;
        }
        &.is-active {
          background-color: $secondaryC1;
        }
      }
    }
    .el-carousel__item {
      display: flex;
      @media (max-width: 767px) {
        justify-content: center;
      }
      @media (max-width: 640px) {
        flex-wrap: wrap;
      }
      .slide-item {
        display: flex;
        align-items: center;
        @media (max-width: 570px) {
          flex-wrap: wrap;
          justify-content: center;
        }
        &:not(:last-child) {
          margin-right: 50px;
          @media (max-width: 640px) {
            margin-right: 0;
          }
        }
        &__part {
          display: flex;
          flex-direction: column;
          align-items: center;
          @media (max-width: 640px) {
            flex-direction: row;
          }
          @media (max-width: 570px) {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        &__ico {
          width: 85px;
          height: 85px;
          margin-bottom: 40px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          @media (max-width: 767px) {
            width: 65px;
            height: 65px;
            margin-bottom: 30px;
          }
          @media (max-width: 640px) {
            margin-bottom: 0;
            margin-right: 20px;
          }
          @media (max-width: 440px) {
            width: 45px;
            height: 45px;
          }
          &_active-procedures {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAECUlEQVR4Xu3dTVLbMBQHcD0xw7YcoOVj3YZJbwA3aDcwrEpPUDhB6QnKDYBVCRuOAJygaWnXNGkPAFs6WB2bmEIsxbKtJ/2txFuEI/0sPT0ptkOipUfneHggpLi43Fg8RGoCIVXGti4ZJontrDyJ90iorQN9gplfASDUVoFqMUeoKqH1H1svzm17OVe51oBOwhRCHF1uLt6HgMBHK0Dbgnkf0sGPNmHCg5ZgioTk658bz/tIfQK2h5ZhjhCvE5LrSKiQoJaYeceEQoUDrYgJhwoFWjYBJST3pUrSXPOZJm5C9FQY0DLMPM98efKni4wKAWqLmfdKZNTgoFUx0VGDgtbFREYNBtoUExU1CKgrTERU76CuMdFQvYJyYSKhegPlxkRB9QLqCxMBlR3UN2ZoVFbQso0OEqov55P1/tuVa449zRArKjbQMsz/X1jGhcoCaosZI6pz0M7JcFsocaAbwqRooEgtaf8WyfB3DppidXrD9PaYd2Nw3+bm79bu/s69MYJHgMoCqkHNMPPJZ2IvbjkqG+gj1O5jzLzXxorKCpridU+vFkxpUYyo7KBl+WVbUbtfrpb7Wyu/xtsXHDQLDZMyA8CY+lBfzV1/EKBtQi1c/DFUGNA2oEqRdLUp3yNUKFB0VCHEgmFOuJmbv1tOJ184UHBUnedNQnItv78KErRFqE8w03rDgqaVWz0e7Ciiz4Br/7RKBUxo0HRBkNzKMyWoa8plOfdTR3upZ4a4qcWEBbXB5Nz6q4sJCVoFkwO1CSYcqAXmkWZbMHN1MfybYkKBlmKOkmeuZaoLTBhQW0yurT9XmBCgVTFdo7rEDA5aF9MVqmvMoKBNMZuicmAGA3WFWReVCzMIqGvMqqicmN5BuTBtUZNE7pJUp1WXk6alr36PoUrpBmW5MW1QJ1TfuDav2mQvu02+MGuiOsP0MuR9Y1ZEdYrJDhoKM0dd7Q32lKCPhmHrHJMVNDQm92xuiq0sMXRaMVl66DRjOgcNjZk26NXx730i9UEzJFli5vjnOBvyCJgPM3zx/lQvmM56KBKmBtUbphNQRMwcNR3+StKhz5e8NBryyJhVl4yuytcGnWHqL0Et0BmmuT9XBp1hTg4OlUC5MbOviIuP47gKb+znSYTctQblxkxbW7KZwQ7S9APSd5hagfrAnBpQX5hTAeoTM3pQ35gTQC9IqODvVh6Pr7qNa2MMDYFpAiWhPn3fXNprOmG4/v9Ob6gKyLpJKRRmlKAhMaMDDY0ZFSgCZjSgKJjRgK72Bl+Nj654/o0N7dKTxLlSBJc2kVCFzCNLm4z3rHvGjCqxL3tk2XUOZzpfVJsjkx6qn4HaCRRWSqbXPtidrnmpqHpoc47mZxiNEoif8anTmoTkzj8V6S7SbLtx3AAAAABJRU5ErkJggg==");
          }
          &_concluded-contracts {
            background-image: url("data:image/png;base64,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");
          }
          &_contracting-entities {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABXCAYAAABBRMhNAAAEfklEQVR4Xu2cy1raQBTHzyTUr7vafQFZt1F8gtonaN0YXVXfwD6B+gTWJyhdWdjIG4hPIAW7RmL3tbteSKbfhACRQuZCJhn5zmzNnJz5OZd/zjkDAUNb9by31t6r3JroHjHRKebT+pf+YWe3/NFE/4yF5tS9lr3iv2tvV+5NA2cyNEoD8uZmr9hCaAIE2H7mW3aPAD3puOVjgS6ZPmLkTHt1frdFLHpJKTm72S0eZkpE4GVGQmOHACXkFACuum5pS2AcmT5iJrR6/5gCOSJA2x23vJkpEYGXGQnNqXs1AHjP/O+6JeN8NM4hBorJDQB4jdAEpv3okTg0e8V/bppWM3Kmrdf71xRIlUE0UasZBe1l43vVpv4GBcL2tGGjUAOL1Lo7xSuJyar10dyhhUKW2EdA4B0ArHJG26QBOcv7KyE3aNWL3qr/2z4FAvvS04JAKwDrw7edF23pvil0yAUaW4YWDS4AYG2RMRBCDzs75bNFbKj0zRya0/D2gcInFWdn9qFQ6+6WDlKzJ2AoU2ipA4sdFlmCywza6CNc4B+p9kiGMy4TaFGo51rgdFQDNum13XVLzUWN8PpnAs2pe2zTZ5JCd7u3V/yK7i8I7dCcusdgMWhZtWbXLW3rfFkW0HqLSgtZAAGxNnVqOK3QtJ2WfIqfu25JXjTz7YZP6IZ2CRRyibzagV/RlTfVBi1S/ezEzKXpTMpog7YehaxzIRYuIX2hcp3QxjGxvMDpCmBqgRZGMP7YP/KCNX4vgYPuTmkSm0vJIS3QtH8yiQ9eyymqBVosbyk+PD1Pasmb6oGW8yEw4q/rMNACzWl4TaDwVs/kkbOqI28qDI3tU2ANc5G8RoAyNb5QVJb3DtG/UyDCBTQ3bvFExK4wtLx1l8hgFn1GdFYitBhphKYw7VKHFkUstEUOFMaYehfRsi7h5Zm6h4/YoDS0eHFKNO5EAenUPRrnw4s+zDhwePbHFUbsPTz70/6o1IogNIViaISG0HB5jrZC3NN4GzUeBMP6WTw9UXIopPAQGkJTKoRGnYY6DXUa6rRYsiPxDifqNNRpw7mCkgMlR0aSo+HtE0rH6TlKyG1SvQTbo+JByCCwWknXdFiq0LKCcU0bzz4Lw8f94dmf9scKgppsHZu0TnvEUerUXCcz9qjUjC+poSuEJv+fRWjyzAChKUFjBcXEp7zLqQq2l7MLtcl9eHqGldhAn42GGQD5mXR5wWncPagesp8MviZdrQnvRtmFsrJ9f9CfJwvCUtW/hY34v2ieP7J+THOxIz9CaIuqfF7CVeF7UjhEPqtUdZ4/Cn7MTEQjtISf5ZmeTKOkEEJDaMOdDZcnp6gF97ToCJTJlSI0hDZRTgpHPUoOhDYj7o/idriqeOVND5YPQkNo480YvwjYT1v/f9GNt6Lw2xOhRYsIxS2K2yUXt9MhbxbSTYrchnc/Y63wdNDmRW4HUJgkmGXtw+A2KXI7+FUIf6l01Ob5wyK3Mn5McylEfpDpkO5yRvbTGxVLBWDeU54npvDkmWHeU4EZQlOC9g978ZFEvDTR+AAAAABJRU5ErkJggg==");
          }
          &_economic-operators {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAABQCAYAAAB773kdAAAEaElEQVR4Xu2dT1baUBTG7004trO6gII6rlh2YLqCykTqzK6g7qC4gtodMFOZSFdgWEGx2HFBu4B2WEve7bkBlAImgYTcCDfnMCJ533u/++X9Sd57QRA6Shc/1r07+yMA7AHAZlrZQKCWAatxXckfp6U5roNSwsX6zSUQOFL6RPj5+l3+SEJfBPqr+s+SRearRIFHNduVgkj5RUS3T28dtOhSGjoZfHN9kHfTzodCV+jpek6dni5vX02hD6Aj0PG3ykY1qRgUz2+4zt6dlp5CV+hJ+Wx6OkG9F3X6gtgr9AHY0umPTc/ObSyI83/JIpgSEZ5M1SKogYW1pPKBZE4IsDQtPUQ6IrBaSWkFpWN7vW7rYKvD5yA/AzF31uVjGUsjQyuk0WhXCmXcPrs9QaQPK1Rw2aIivMegLpVs7pZTnTsKCj3l2Cr0lIH7jag6PX3qCj195up0AeYKXaFLEBDQ1DpdoQsQEJBUp0tB3znrHhHiIQC8FsjDqkleAUD1fjZA/9Gu7fAEICR0CCmVx7xLTv2KCF1Ecu01z22Vt371R6WPHBqE2e2AhF1C4neyjVHI4ylFnvfCQTBo7ZGF/t0AAC9mz9ZyXXEPGcG1Pc8dvqQIK2Vk6OMJ8dQ423jOKgVhXsgTTuf3lTnodaJG6bEojgXhbVi0n8j/vwHBRUOuZ9nu9/2XsV7tMSO/Th95idEBAr/St4xpxg0CB9OyjEOAXBVNnXeSQfCJQ7bB2yXyGfBvPayf/hCENfNl2PLOCyrDQWgiUSMJJ/vtnmX1IaM/7359shGd4c0RT6YnQJfvBvuZ14wThMGCAIczh0jsgDTHCE0Eco2x3LgzdscgczlCFzeEOT3Q1E8oCFcI1EgEMq8e+WNzVbkH6FcXoZBjOT2sWhkuK0EEt72fb4adH/T/8E7gws0xUJs6IJknP34+GDKCg0DcPk2dPzNL2rGcHiqE4PZHYwkEIXi0nGnIC3V6lCDwbe6B3Yzb9eK6tAe5zdzzXitO28J5LtZvd4kffXDbksIaqMU6PTgK/AzC754mEYTQgI+ckDZkWacLBcEftD30lbkbJ3pIOj2s4J12pbAVdlLQ/4MVfLyYbKKvHCfduNdmGTrEXW6YlRV8Wa5eJgyk0OPeU3Ncr9DngJbAJeV2pdCYN52d826VAHnvgUwdma7TAaBj0CrP06cf1OcXWWtEOfpZhz50aAcQ/GUjkQ7yn4fM/EwkUtoJnPRUoCdQ1OwkodAFYqHQFboAAQFJdbpCFyAgIKlOV+gCBAQk1ekKXYCAgKQ6XaELEBCQVKcrdAECApLqdIUuQEBAUp2u0AUICEiq0xW6AAEBSXW6QhcgICCpTlfoAgQEJNXpCl2AgICkOl2hCxAQkPSdPtjZ6JOA/mpK8q7S/gLVv3YNCJZl54rMBnP46bbI+70Ebfmd9HcsskotZNvzZrtSiPQtPoU+Q4RThz5YTjI1kmSwGndHiRnKLnZqsX5zCAS8s9/kgVBr7xcifcvjH0fCDanIUPq4AAAAAElFTkSuQmCC");
          }
          &_total-savings {
            background-image: url("data:image/png;base64,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");
          }
        }
        &__number {
          line-height: 1;
          font-size: 90px;
          color: #fff;
          @media (max-width: 767px) {
            font-size: 72px;
          }
          @media (max-width: 440px) {
            margin: 15px 0;
            font-size: 52px;
          }
        }
        &__text {
          margin-top: 20px;
          margin-left: 16px;
          line-height: 1.1;
          font-size: 24px;
          color: $secondaryC1;
          @media (max-width: 767px) {
            font-size: 18px;
          }
          @media (max-width: 640px) {
            margin-top: 0;
            text-align: left;
          }
        }
      }
    }
    /*&-count {
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
    }*/
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
