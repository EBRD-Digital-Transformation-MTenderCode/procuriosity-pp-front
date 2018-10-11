<template>
  <div>
    <el-select
        multiple
        filterable
        allow-create
        remote
        default-first-option
        :popper-append-to-body="false"
        :placeholder="placeholder"
        :value="values"
        @change="setValues(name, $event)"
    >
    </el-select>
  </div>
</template>

<script>

  import { Select } from "element-ui";

  export default {
    name: "MultipleInput",
    components: {
      "el-select": Select
    },
    props: {
      name: {
        type: String,
        required: true
      },
      values: {
        type: Array,
        required: true
      },
      setValues: {
        type: Function,
        required: true
      },
      placeholder: {
        type: String
      }
    }
  };
</script>
