<template>
  <el-container>
    <div class="static">
      <aside class="static-aside">
        <div class="static-aside__title">
          {{$t("message.security_title")}}
        </div>
      </aside>
      <section class="static-content">
        <h1>{{$t("message.security_h11")}}</h1>
        <p>{{$t("message.security_p1")}}</p>
        <p>{{$t("message.security_p2")}}</p>
        <p>{{$t("message.security_p3")}}</p>
      </section>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "SecurityAndConfidentiality"
  };
</script>
