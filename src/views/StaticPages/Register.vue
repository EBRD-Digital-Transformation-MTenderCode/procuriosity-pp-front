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
        <p><span class="underline">{{$t("message.register_p2_bold")}}</span>{{$t("message.register_p2_after")}}</p>
        <p>{{$t("message.register_p3")}}</p>
        <p>{{$t("message.register_p4_before")}}
          <a href="https://achizitii.md/" target="_blank">achizitii</a>,
          <a href="https://e-licitatie.md/" target="_blank">e-licitatie</a>, {{$t("message.register_p4_bold")}} <a
              href="https://yptender.md/" target="_blank">YTender</a> {{$t("message.register_p4_after")}}</p>
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
