<template>
  <div>
    <div class="main-banner">
      <el-container direction="vertical">
        <div class="main-title">
          <div>MTender</div>
          Leading by example
        </div>
        <div class="main-count">
          <div class="main-count__number">12′256′413 <span class="main-count_currency">MDL</span></div>
          <div class="main-count__text">Total savings</div>
        </div>
        <router-link to="/join-mtender" class="main__join-button">Join</router-link>
      </el-container>
    </div>
    <el-container direction="vertical">
      <div class="main-news">
        <div class="main-news__title">
          News
        </div>
        <div class="main-news__cards-wp">
          <div class="main-news__card">
            <img src="@/assets/news1.jpg" alt="news1" class="main-news__img">
            <div class="main-news__text">
              New types of electronic tendering procedures are becoming available on the MTender, to suit different types of contracts and serve different public and commercial buyers, including state-owned enterprises. The Ministry of Finance of Moldova is first introducing electronic public procurement procedures of open tender, request for quotation, and negotiated procedure without publication of contract notice.
            </div>
          </div>
          <div class="main-news__card">
            <img src="@/assets/news2.jpg" alt="news2" class="main-news__img">
            <div class="main-news__text">
              On 22-26 October 2018, the Ministry of Finance of Moldova and the Speaker of the Parliament of Moldova are hosting the WTO Regional Seminar for GPA Parties and Observer Governments from Central Europe, Western Balkans, Caucasus and Central Asia, including a session on digital public procurement in Moldova. Register to attend the UNDP Open Government and Public Spending session on 22 October.
            </div>
          </div>
          <div class="main-news__card">
            <img src="@/assets/news3.jpg" alt="news3" class="main-news__img">
            <div class="main-news__text">
              From 26 October 2018, competitive and transparent but easy-to-use online bidding procedures, with lowest price and price and non-price selection criteria, will be offered to interested state-owned enterprises and commercial clients. State-owned enterprises and commercial clients may also use the MTender online contract signing service.
            </div>
          </div>
        </div>
      </div>
    </el-container>
    <div class="main-about">
      <el-container direction="vertical">
        <div class="main-about__title">
          What is M-Tender
        </div>
        <div class="main-about__text">
          The  Ministry of Finance of the Republic of Moldova is leading a transition to digital public procurement to ensure more transparent and efficient spending of the state budget of the Republic of Moldova. New digital government service – MTender - will support public
          procurement from planning the purchase to payment for public contracts. It will shorten time for tendering for public bodies and waiting time for payment for suppliers and contractors.
        </div>
        <div class="main-about__cards-wp">
          <div class="main-about__card">
            <img src="@/assets/main-ico1.png" alt="main ico 1" class="main-about__img">
            <div class="main-about__card-text">
              With MTender digital service, all public tenders are accessible online and every procurement decision transparently published online in real time. Citizens can watch government procurement decisions and how taxpayers money are spent on public services.
            </div>
          </div>
          <div class="main-about__card">
            <img src="@/assets/main-ico2.png" alt="main ico 2" class="main-about__img">
            <div class="main-about__card-text">
              On account of online and easy to participate tenders, the new fully digital procurement service will offer better access to opportunities in public procurement for business community, in particular local small and medium-sized enterprises.
            </div>
          </div>
          <div class="main-about__card">
            <img src="@/assets/main-ico3.png" alt="main ico 3" class="main-about__img">
            <div class="main-about__card-text">
              For public bodies, new digital service will also bring improved planning of spending, quicker purchases and better-quality as a result of ‘zero paper’ electronic bidding procedures.
            </div>
          </div>
        </div>
        <hr class="main-about__line">
        <div class="main-about__sub-title">
          The MTender is a multi-platform networking digital procurement service, consisting of  a government-operated web portal and Open Data central database unit and networking with several commercial electronic platforms certified to support electronic tendering procedures for public sector and commercial clients
        </div>
        <div class="main-about__sub-text">
          The MTender networking electronic procurement platform is a commercial electronic procurement platform, authorised and certified for networking with the MTender and providing digital electronic tendering services to public sector clients as well as commercial buyers. Each MTender networking platform is providing a help desk service to buyers and economic operators registered on this platform to access digital services of the MTender.
        </div>
        <div class="main-about__partners">
          <div class="main-about__partners_title">
            Presently the MTender is networking with the following platforms:
          </div>
          <div class="main-about__partners_links">
            <a href="https://yptender.md/" target="_blank">
              <img src="@/assets/yptender.png" alt="yptender">
            </a>
            <a href="https://e-licitatie.md/" target="_blank">
              <img src="@/assets/e-lici.png" alt="e-lici">
            </a>
            <a href="https://achizitii.md/" target="_blank">
              <img src="@/assets/achizitii.md .png" alt="achizitii">
            </a>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MainPage"
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
    &__join-button{
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
