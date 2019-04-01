<template>
  <div>
    <label class="search-form__label">{{ label }}</label>
    <el-select
      multiple
      filterable
      allow-create
      class="multiple_input"
      remote
      default-first-option
      :popper-append-to-body="false"
      :placeholder="placeholder"
      :value="clearValues"
      @change="setValues(name, $event)"
    ></el-select>
  </div>
</template>

<script>
export default {
  name: "MultipleInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    setValues: {
      type: Function,
      required: true,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    clearValues() {
      return [...new Set(this.values.map(val => val.trim()))];
    },
  },
};
</script>
