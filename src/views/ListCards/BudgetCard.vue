<template>
  <el-card
    shadow="hover"
  >
    Budget - {{ item.title }}
  </el-card>
</template>

<script>
  import { Card } from "element-ui";
  
export default {
  name: "BudgetItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    "el-card": Card
  }
};
</script>

<style scoped>

</style>
