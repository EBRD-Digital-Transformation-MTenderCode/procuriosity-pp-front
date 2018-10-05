<template>
  <div>
    <el-select
        v-if="name === 'classifications'"
        :items="items"
        multiple
        filterable
        needFetch
        remote
        reserve-keyword
        :placeholder=placeholder
        :remote-method="getOptions"
        default-first-option
        :value="values"
        @change="setValues(name, $event)"
    >
      <el-option
          v-for="item of items"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-select
        v-else
        multiple
        filterable
        :no-match-text="$t('message.search_auto_complete_not_found')"
        :placeholder="placeholder"
        needFetch
        remote
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
  </div>
</template>

<script>
  import { FETCH_CPV_CODES, FETCH_REGIONS } from "./../../store/types/actions-types";

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
      needFetch: {
        type: Boolean
      },
      items: {
        type: Array
      },
      values: {
        type: Array,
        required: true
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
      getOptions(val) {
        if (this.needFetch) {
          if (this.name === "classifications") {
            if (val && val.length >= 3) {
              this.$store.dispatch(FETCH_CPV_CODES, {
                lang: this.$i18n.locale,
                idOrName: val
              });
            }
          } else {
              this.$store.dispatch(FETCH_REGIONS, {
                country: "MD",
                lang: this.$i18n.locale
              });
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>
