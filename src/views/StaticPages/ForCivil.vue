<template>
 <el-container>
    <div class="static">
      <aside class="static-aside">
        <div class="static-aside__title">
          {{$t("message.for_civil_title")}}
        </div>
      </aside>
      <section class="static-content">
        <h1>{{$t("message.for_civil_h11")}}</h1>
        <p>{{$t("message.for_civil_p1")}}</p>
        <p>{{$t("message.for_civil_p2")}}</p>
        <p>{{$t("message.for_civil_p3")}}</p>
        <p>{{$t("message.for_civil_p4_before")}}<a href="https://www.open-contracting.org/" target="_blank">{{$t("message.for_civil_p4_bold")}}</a>{{$t("message.for_civil_p4_after")}}</p>
        <p>{{$t("message.for_civil_p5")}}</p>
        <p>{{$t("message.for_civil_p6")}}</p>
        <p><span class="bold">{{$t("message.for_civil_p7")}}</span></p>
        <div class="organizations">
          <div class="organizations-item">
            <div class="organizations-item__img">
              <img src="@/assets/organizations/1.png" alt="organization 1">
            </div>
            <div class="organizations-item__name"><p>{{$t("message.for_civil_organization1")}}</p></div>
          </div>
          <div class="organizations-item">
            <div class="organizations-item__img">
              <img src="@/assets/organizations/2.png" alt="organization 2">
            </div>
            <div class="organizations-item__name">{{$t("message.for_civil_organization2")}}</div>
          </div>
          <div class="organizations-item">
            <div class="organizations-item__img">
              <img src="@/assets/organizations/3.png" alt="organization 1">
            </div>
            <div class="organizations-item__name">{{$t("message.for_civil_organization3")}}</div>
          </div>
          <div class="organizations-item">
            <div class="organizations-item__img">
              <img src="@/assets/organizations/4.png" alt="organization 1">
            </div>
            <div class="organizations-item__name">{{$t("message.for_civil_organization4")}}</div>
          </div>
          <div class="organizations-item">
            <div class="organizations-item__img">
              <img src="@/assets/organizations/5.png" alt="organization 1">
            </div>
            <div class="organizations-item__name">{{$t("message.for_civil_organization5")}}</div>
          </div>
          <div class="organizations-item">
            <div class="organizations-item__img">
              <img src="@/assets/organizations/6.png" alt="organization 1">
            </div>
            <div class="organizations-item__name">{{$t("message.for_civil_organization6")}}</div>
          </div>
        </div>
      </section>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: "ForCivil"
  };
</script>
