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
        <p>{{$t("message.about_p3_before")}}<span class="bold">{{$t("message.about_p3_bold")}}</span>{{$t("message.about_p3_after")}}</p>
        <p>{{$t("message.about_p4_before")}}<span class="bold">{{$t("message.about_p4_bold")}}</span>{{$t("message.about_p4_after")}}<span class="bold">{{$t("message.about_p4_bold2")}}</span>{{$t("message.about_p4_after2")}}</p>
        <p>{{$t("message.about_p5")}}</p>
        <ul>
          <li><a href="https://achizitii.md/" target="_blank">Achizitii</a></li>
          <li><a href="https://e-licitatie.md/" target="_blank">E-licitatie</a></li>
          <li><a href="https://yptender.md/" target="_blank">YTender</a></li>
        </ul>
        <h3>{{$t("message.about_h12")}}</h3>
        <p><span class="bold">{{$t("message.about_p6_bold")}}</span>{{$t("message.about_p6_after")}}</p>
        <p><span class="bold">{{$t("message.about_p7_bold")}}</span>{{$t("message.about_p7_after")}}<span class="bold">{{$t("message.about_p7_bold2")}}</span>{{$t("message.about_p7_after2")}}</p>
        <p>{{$t("message.about_p8")}}</p>
        <p><span class="bold">{{$t("message.about_p9_bold")}}</span>{{$t("message.about_p9_after")}}</p>
        <p><span class="bold">{{$t("message.about_p10_bold")}}</span>{{$t("message.about_p10_after")}}</p>
        <p><span class="bold">{{$t("message.about_p11_bold")}}</span>{{$t("message.about_p11_after")}}</p>
        <p><span class="bold">{{$t("message.about_p12_bold")}}</span>{{$t("message.about_p12_after")}}</p>
        <p>{{$t("message.about_p13_before")}}<span class="bold">{{$t("message.about_p13_bold")}}</span> {{$t("message.about_p13_after")}}</p>
      </section>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "Register"
  };
</script>
