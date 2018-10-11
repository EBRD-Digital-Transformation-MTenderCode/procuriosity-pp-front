<template>
  <div>
    <div class="main-banner">
      <img src="@/assets/main-banner.jpg" alt="Main Banner">
    </div>
    <el-container direction="vertical" fluid>
    
    </el-container>
  </div>
</template>

<script>
  import { Container } from "element-ui";
  
  export default {
    name: "MainPage",
    components: {
      "el-container": Container
    }
  };
</script>

<style lang="scss" scoped>
  .main {
    &-banner {
      width: 100%;
      text-align: center;
    }
  }
</style>
