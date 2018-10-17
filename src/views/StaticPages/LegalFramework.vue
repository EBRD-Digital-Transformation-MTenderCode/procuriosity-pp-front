<template>
  <el-container>
    <div class="static">
      <aside class="static-aside">
        <div class="static-aside__title">
          {{$t("message.legal_framework_title")}}
        </div>
      </aside>
      <section class="static-content">
        <h1> {{$t("message.legal_framework_h11")}}</h1>
        <p>{{$t("message.legal_framework_p1")}}</p>
        <ul>
          <li>{{$t("message.legal_framework_ul1_li1")}}</li>
          <li>{{$t("message.legal_framework_ul1_li2")}}</li>
          <li>{{$t("message.legal_framework_ul1_li3")}}</li>
          <li>{{$t("message.legal_framework_ul1_li4")}}</li>
        </ul>
      </section>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "LegalFramework"
};
</script>
