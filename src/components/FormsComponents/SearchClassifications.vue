<template>
  <div>
    <label class="search-form__label">{{ label }}</label>
    <el-select
      v-if="name === 'classifications'"
      :items="items"
      multiple
      data-classifications
      filterable
      remote
      :loading="loading"
      :placeholder="placeholder"
      :remote-method="getOptions"
      default-first-option
      :popper-append-to-body="false"
      :value="values"
      @blur="clearItems"
      @change="handleChange($event)"
    >
      <el-option v-for="item of items" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
import { FETCH_CPV_CODES } from "./../../store/types/actions-types";

import { SET_CPV_CODES } from "../../store/types/mutations-types";

export default {
  name: "SearchClassifications",
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
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async getOptions(val) {
      if (val && val.length >= 3) {
        this.loading = true;
        await this.$store.dispatch(FETCH_CPV_CODES, {
          lang: this.$i18n.locale,
          idOrName: val,
        });
        this.loading = false;
      }
    },
    clearItems() {
      this.$store.commit(SET_CPV_CODES, {
        CPVCodes: [],
      });
    },
    handleChange(event) {
      this.setValues(this.name, event);
      this.clearItems();
    },
  },
};
</script>
