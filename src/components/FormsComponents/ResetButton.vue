<template>
  <el-button
    class="search-form__btn search-form__btn_reset"
    type="danger"
    @click="reset"
  >{{$t("search.reset_button")}}</el-button>
</template>

<script>
import { SET_INITIAL_SEARCH_PARAMS } from "./../../store/types/mutations-types";

export default {
  name: "ResetButton",
  props: {
    entity: {
      type: String,
      required: true
    }
  },
  methods: {
    reset() {
      this.$store.commit(SET_INITIAL_SEARCH_PARAMS, {
        entityName: this.entity
      });
    }
  }
};
</script>
