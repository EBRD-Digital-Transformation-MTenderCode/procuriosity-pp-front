<template>
  <div>
    <el-select
        v-if="items"
        multiple
        filterable
        :no-match-text="$t('message.search_auto_complete_not_found')"
        :placeholder="placeholder"
        :remote="remote"
        :value="values"
        @focus="getOptions"
        @change="setValues(name, $event)"
    >
      <el-option
          v-for="option of items"
          :key="option.value"
          :label="option.name"
          :value="option.value"
      />
    </el-select>
    <el-select
        v-else
        multiple
        filterable
        allow-create
        default-first-option
        :placeholder="placeholder"
        :value="values"
        @focus="getOptions"
        @change="setValues(name, $event)"
    >
      <el-option
          v-for="option of values"
          :key="option"
          :label="option"
          :value="option"
      />
    </el-select>
  </div>
</template>

<script>
  import { FETCH_DIRECTORY } from "./../../store/types/actions-types";

  import { Select, Option } from "element-ui";

  export default {
    name: "SearchAutoCompleteInput",
    components: {
      "el-select": Select,
      "el-option": Option
    },
    props: {
      name: {
        type: String,
        required: true
      },
      directory: {
        type: String
      },
      remote: {
        type: Boolean
      },
      items: {
        type: Array
      },
      values: {
        type: Array,
        required: true
      },
      params: {
        type: Object
      },
      setValues: {
        type: Function,
        required: true
      },
      placeholder: {
        type: String
      }
    },
    methods: {
      getOptions() {
        if(this.remote) {
          this.$store.dispatch(FETCH_DIRECTORY, {
            directory: this.directory,
            params: {
              ...this.params,
              lang: this.$i18n.locale
            }
          });
        }
      }
    }
  };
</script>

<style scoped>

</style>
