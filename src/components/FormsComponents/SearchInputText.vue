<template>
  <div class="search-form-field-wp">
    <label class="search-form__label">{{ label }}</label>
    <el-input
      type="text"
      :placeholder="placeholder"
      clearable
      maxlength="255"
      v-model="localValue"
      @change="handleChange(name, $event)"
    />
  </div>
</template>

<script>
export default {
  name: "SearchInputText",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    setValue: {
      type: Function,
      required: true
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      localValue: this.value
    };
  },
  methods: {
    handleChange(name, value) {
      this.setValue(name, value.trim());
    }
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    }
  }
};
</script>