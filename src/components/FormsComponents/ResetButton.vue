<template>
  <el-button
      class = "search-form__reset-button"
      type="warning"
      plain
      @click="reset">
    {{$t("message.reset_button")}}
  </el-button>
</template>

<script>
  import { Button } from "element-ui";

  import { SET_INITIAL_SEARCH_PARAMS} from "./../../store/types/mutations-types";

  export default {
    name: "ResetButton",
    components: {
      "el-reset-button": Button
    },
    props: {
      entity: {
        type: String,
        required: true
      }
    },
    methods:{
      reset(){
        this.$store.commit(SET_INITIAL_SEARCH_PARAMS, {
          entity: this.entity
        });
      }
    }
  };
</script>

<style scoped>

</style>