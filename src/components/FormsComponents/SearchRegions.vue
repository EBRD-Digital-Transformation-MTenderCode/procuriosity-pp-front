<template>
  <div>
    <label class="search-form__label">{{ label }}</label>
    <el-select
      multiple
      :items="items"
      filterable
      data-fetch
      allow-create
      default-first-option
      :no-match-text="$t('search.auto_complete_not_found')"
      :popper-append-to-body="false"
      :placeholder="placeholder"
      @focus="getOptions"
      :value="values"
      @change="setValues(name, $event)"
    >
      <el-option v-for="option of items" :key="option.value" :label="option.name" :value="option.value" />
    </el-select>
  </div>
</template>

<script>
import { FETCH_REGIONS } from "./../../store/types/actions-types";

export default {
  name: "SearchRegions",
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
  methods: {
    getOptions() {
      this.$store.dispatch(FETCH_REGIONS, {
        country: "MD",
        lang: "ro",
      });
    },
  },
};
</script>
