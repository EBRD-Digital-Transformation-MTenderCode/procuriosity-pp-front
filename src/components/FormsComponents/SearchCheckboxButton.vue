<template>
  <el-checkbox-button
    :checked="value"
    @change="setValue(name, $event)"
  >
    {{ value ? "Strict" : "No strict"}}
  </el-checkbox-button>
</template>

<script>
  import { CheckboxButton } from "element-ui";

  export default {
    name: "SearchSwitch",
    components: {
      "el-checkbox-button": CheckboxButton
    },
    props: {
      name: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        required: true
      },
      setValue: {
        type: Function,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>
