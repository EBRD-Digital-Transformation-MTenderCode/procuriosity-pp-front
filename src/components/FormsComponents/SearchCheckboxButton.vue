<template>
  <el-checkbox-button
      :checked="value"
      @change="setValue(name, $event)"
  >
    {{ value ?  $t("message.search_strict") : $t("message.search_no_strict")}}
  </el-checkbox-button>
</template>

<script>
  export default {
    name: "SearchSwitch",
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
