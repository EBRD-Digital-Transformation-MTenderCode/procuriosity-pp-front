<template>
  <div class="search-form-field-wp">
    <label class="search-form__label">{{ label }}</label>
    <el-input-number
      :min="0"
      :max="10000000000"
      controls-position="right"
      v-model="localValue"
      @change="handleChange(name, $event)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "SearchInputNumber",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    setValue: {
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
  data() {
    return {
      localValue: this.value || undefined,
    };
  },
  methods: {
    handleChange(name, value) {
      this.setValue(name, value);
    },
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
  },
};
</script>
