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
      :value="values"
      @change="handleChange(name, $event)"
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
  methods: {
    handleChange(name, value) {
      const clearValue = [...new Set(value.map(val => val.replace(/"/g, "'").trim()).filter(val => val.length))];
      if (this.values.length || clearValue.length) this.setValues(name, clearValue);
    },
  },
};
</script>
