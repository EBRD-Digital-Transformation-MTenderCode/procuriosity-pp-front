<template>
  <div>
    <label class="search-form__label">{{ label }}</label>
    <el-select
      :items="items"
      multiple
      filterable
      default-first-option
      :no-match-text="$t('search.auto_complete_not_found')"
      :popper-append-to-body="false"
      :placeholder="placeholder"
      :value="values"
      @change="setValues(name, $event)"
    >
      <el-option v-for="item of items" :key="item.value" :label="item.name[$i18n.locale]" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SearchAutoCompleteInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
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
};
</script>
