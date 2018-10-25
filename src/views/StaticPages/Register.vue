<template>
  <el-container>
    <div class="static">
      <aside class="static-aside">
        <div class="static-aside__title">
          {{$t("message.register_title")}}
        </div>
      </aside>
      <section class="static-content">
        <h1>{{$t("message.register_h11")}}</h1>
        <p>{{$t("message.register_p1")}}</p>
        <i18n path="message.register_p2" tag="p">
          <span class="underline" place="register_p2_place">{{ $t("message.register_p2_bold") }}</span>
        </i18n>
        <p>{{$t("message.register_p3")}}</p>
        <i18n path="message.register_p4" tag="p">
          <span place="register_p4_place">
          <a href="https://achizitii.md/" target="_blank">Achizitii</a>,
          <a href="https://e-licitatie.md/" target="_blank">E-licitatie</a>
          {{$t("message.register_p4_bold")}}
          <a href="https://yptender.md/" target="_blank">YPTender</a>
         </span>
        </i18n>
        <p>{{ $t("message.register_p4_1") }}</p>
        <p>{{$t("message.register_p5")}}</p>
      </section>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "Register"
  };
</script>
