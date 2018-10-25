<template>
  <el-checkbox-button
      :checked="value"
      @change="setValue(name, $event)"
  >
    {{ value ?  $t("search.strict") : $t("search.no_strict")}}
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
