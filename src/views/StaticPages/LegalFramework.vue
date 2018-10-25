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
        <h3>{{$t("message.legal_framework_h3_1")}}</h3>
        <ul>
          <li>
            <a :href="$t('message.legal_framework_ul1_li1_link')" target="_blank">{{$t("message.legal_framework_ul1_li1")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li2_link')" target="_blank">{{$t("message.legal_framework_ul1_li2")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li3_link')" target="_blank">{{$t("message.legal_framework_ul1_li3")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li4_link')" target="_blank">{{$t("message.legal_framework_ul1_li4")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li5_link')" target="_blank">{{$t("message.legal_framework_ul1_li5")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li6_link')" target="_blank">{{$t("message.legal_framework_ul1_li6")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li7_link')" target="_blank">{{$t("message.legal_framework_ul1_li7")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li8_link')" target="_blank">{{$t("message.legal_framework_ul1_li8")}};</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul1_li9_link')" target="_blank">{{$t("message.legal_framework_ul1_li9")}}.</a>
          </li>
        </ul>
        <h3>{{ $t("message.legal_framework_h3_2") }}</h3>
        <ul>
          <li>
            <a :href="$t('message.legal_framework_ul2_li1_link')" target="_blank">{{ $t("message.legal_framework_ul2_li1") }}</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul2_li2_link')" target="_blank">{{ $t("message.legal_framework_ul2_li2") }}</a>
          </li>
          <li>
            <a :href="$t('message.legal_framework_ul2_li3_link')" target="_blank">{{ $t("message.legal_framework_ul2_li3") }}</a>
          </li>
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
