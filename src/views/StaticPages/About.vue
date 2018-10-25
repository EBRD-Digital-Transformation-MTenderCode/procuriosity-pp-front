<template>
  <el-container>
    <div class="static">
      <aside class="static-aside">
        <div class="static-aside__title">
          {{$t("message.about_title")}}
        </div>
      </aside>
      <section class="static-content">
        <h1>{{$t("message.about_h11")}}</h1>
        <p>{{$t("message.about_p1")}}</p>
        <p>{{$t("message.about_p2")}}</p>
        <ul>
          <li>{{$t("message.about_ul1_li1")}}</li>
          <li>{{$t("message.about_ul1_li2")}}</li>
          <li>{{$t("message.about_ul1_li3")}}</li>
        </ul>
        <i18n path="message.about_p3" tag="p">
          <span class="bold" place="about_p3_place">{{ $t("message.about_p3_bold") }}</span>
        </i18n>
        <i18n path="message.about_p4" tag="p">
          <span class="bold" place="about_p4_place1">{{ $t("message.about_p4_bold1") }}</span>
          <span class="bold" place="about_p4_place2">{{ $t("message.about_p4_bold2") }}</span>
        </i18n>
        <p>{{$t("message.about_p5")}}</p>
        <div class="about__partners">
          <div class="about__partners_links">
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
        <h3>{{$t("message.about_h12")}}</h3>
        <i18n path="message.about_p6" tag="p">
          <span class="bold" place="about_p6_place">{{ $t("message.about_p6_bold") }}</span>
        </i18n>
        <i18n path="message.about_p7" tag="p">
          <span class="bold" place="about_p7_place1">{{ $t("message.about_p7_bold1") }}</span>
          <span class="bold" place="about_p7_place2">{{ $t("message.about_p7_bold2") }}</span>
        </i18n>
        <p>{{$t("message.about_p8")}}</p>
        <i18n path="message.about_p9" tag="p">
          <span class="bold" place="about_p9_place">{{ $t("message.about_p9_bold") }}</span>
        </i18n>
        <i18n path="message.about_p10" tag="p">
          <span class="bold" place="about_p10_place">{{ $t("message.about_p10_bold") }}</span>
        </i18n>
        <i18n path="message.about_p11" tag="p">
          <span class="bold" place="about_p11_place">{{ $t("message.about_p11_bold") }}</span>
        </i18n>
        <i18n path="message.about_p12" tag="p">
          <span class="bold" place="about_p12_place">{{ $t("message.about_p12_bold") }}</span>
        </i18n>
        <i18n path="message.about_p13" tag="p">
          <span class="bold" place="about_p13_place">{{ $t("message.about_p13_bold") }}</span>
        </i18n>
      </section>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "About",
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
      }
    },
    computed: {
      randomSortPlatforms() {
        return [...this.platforms].sort(() => 0.5 - Math.random());
      }
    },
  };
</script>

<style lang="scss" scoped>
  .about {
    &__partners {
      padding: 30px 0;
      &_links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 768px) {
          flex-wrap: wrap;
          justify-content: center;
        }
        a {
          max-width: 30%;
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
</style>
