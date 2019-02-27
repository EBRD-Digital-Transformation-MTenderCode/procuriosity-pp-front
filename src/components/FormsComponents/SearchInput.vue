<template>
  <div class="search-form-field-wp">
    <label class="search-form__label">{{ label }}</label>
    <el-input
      v-if="type === 'text'"
      :type="type"
      :placeholder="placeholder"
      clearable
      maxlength="255"
      v-model="localValue"
      @change="handleChange(type, name, $event)"
    />
    <el-input
      v-if="type === 'number'"
      :type="type"
      :placeholder="placeholder"
      controls-position="right"
      :min="min"
      :max="max"
      v-model="localValue"
      @change="handleChange(type, name, $event)"
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
      validator: value =>
        typeof value === "string" ||
        typeof value === "number" ||
        value === null,
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
    label: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      localValue: this.value || null
    };
  },
  methods: {
    handleChange(type, name, value) {
      if (type === "text") {
        this.setValue(name, value.trim());
      }
      if (type === "number") {
        this.setValue(name, !isNaN(Number(value)) ? Number(value): null);
      }
    }
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    }
  }
};
</script>