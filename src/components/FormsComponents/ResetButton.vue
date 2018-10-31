<template>
  <el-button
      class="search-form__reset-button"
      type="warning"
      plain
      @click="reset">
    {{$t("search.reset_button")}}
  </el-button>
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
          entity: this.entity
        });
      }
    }
  };
</script>
