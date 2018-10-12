<template>
  <div class="search-form-field-wp">
    <el-input
        v-if="type === 'text'"
        :type="type"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        :placeholder="placeholder"
        clearable
        maxlength="255"
        :value="value"
        @input="checkValue(type, name, $event)"
    />
    <el-input
        v-if="type === 'number'"
        :type="type"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        controls-position="right"
        :min="min"
        :max="max"
        :value="value"
        :placeholder="placeholder"
        @change="checkValue(type, name, $event)"
    />
  </div>
</template>

<script>
  export default {
    name: "SearchInput",
    props: {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: "text"
      },
      value: {
        validator: value => typeof value === "string" || typeof value === "number" || value === null,
        required: true
      },
      setValue: {
        type: Function,
        required: true
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 10000000
      },
      prefixIcon: {
        type: String,
        default: "el-icon-search"
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String
      }
    },
    methods: {
      checkValue(type, name, value) {
        if (type === "text") {
          const clearValue = value.trim();
          if (clearValue && clearValue.length > 2) {
            this.setValue(name, clearValue);
          }
          if (value === "") {
            this.setValue(name, value);
          }
        }
        if (type === "number") {
          if (value > 0 && value < 100000000) {
            this.setValue(name, value);
          }
        }
      }
    }
  };
</script>
