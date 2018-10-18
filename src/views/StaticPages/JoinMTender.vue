<template>
  <el-container>
    <div class="static">
      <aside class="static-aside">
        <div class="static-aside__title">
          {{$t("message.join_title")}}
        </div>
      </aside>
      <section class="static-content">
        <h1>{{$t("message.join_h11")}}</h1>
        <p>{{$t("message.join_p1")}}</p>
        <p>{{$t("message.join_p2")}}</p>
        <h3>{{$t("message.join_h31")}}</h3>
        <p>{{$t("message.join_p3")}}</p>
        <ul>
          <li>{{$t("message.join_ul1li1")}}</li>
          <i18n path="message.join_ul1li2" tag="li">
            <span class="bold" place="join_ul1li2_place">{{$t("message.join_ul1li2_bold")}}</span>
          </i18n>
        </ul>
        <h3>{{$t("message.join_h32")}}</h3>
        <p>{{$t("message.join_p4")}}</p>
        <p>{{$t("message.join_p4")}}</p>
        <p>{{$t("message.join_p5")}}</p>
        <p>{{$t("message.join_p6")}}</p>
        <h3>{{$t("message.join_h33")}}</h3>
        <p>{{$t("message.join_p7")}}</p>
        <h3>{{$t("message.join_h34")}}</h3>
        <p>{{$t("message.join_p8")}}</p>
      </section>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "JoinMTender"
  };
</script>
