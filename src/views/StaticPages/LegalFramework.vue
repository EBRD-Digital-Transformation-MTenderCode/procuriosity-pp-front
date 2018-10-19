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
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=360122" target="_blank">{{$t("message.legal_framework_ul1_li1")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377584" target="_blank">{{$t("message.legal_framework_ul1_li2")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377585" target="_blank">{{$t("message.legal_framework_ul1_li3")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377586" target="_blank">{{$t("message.legal_framework_ul1_li4")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377587" target="_blank">{{$t("message.legal_framework_ul1_li5")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377588" target="_blank">{{$t("message.legal_framework_ul1_li6")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377589" target="_blank">{{$t("message.legal_framework_ul1_li7")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377590" target="_blank">{{$t("message.legal_framework_ul1_li8")}};</a>
          </li>
          <li>
            <a href="http://lex.justice.md/index.php?action=view&view=doc&lang=1&id=377591" target="_blank">{{$t("message.legal_framework_ul1_li9")}}.</a>
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
