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
        <ul>
          <li><a href="https://achizitii.md/" target="_blank">Achizitii</a></li>
          <li><a href="https://e-licitatie.md/" target="_blank">E-licitatie</a></li>
          <li><a href="https://yptender.md/" target="_blank">YPTender</a></li>
        </ul>
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
    name: "Register"
  };
</script>
