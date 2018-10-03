<template>
  <el-main>
    <el-container>
      <el-row :gutter="30">
        <el-col>
          <list-tabs />
        </el-col>
      </el-row>
    </el-container>
  </el-main>
</template>

<script>
import { Main, Container, Row, Col } from "element-ui";

import ListTabs from "./ListTabs"

export default {
  name: "List",
  components: {
    "el-main": Main,
    "el-container": Container,
    "el-row": Row,
    "el-col": Col,
    "list-tabs": ListTabs
  }
};
</script>

<style lang="scss">

</style>
