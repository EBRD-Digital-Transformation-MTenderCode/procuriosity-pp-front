<template>
  <div>
    <el-select
        v-if="name === 'classifications'"
        :items="items"
        multiple
        data-classifications
        filterable
        remote
        reserve-keyword
        :placeholder=placeholder
        :remote-method="getOptions"
        default-first-option
        :popper-append-to-body="false"
        :value="values"
        @blur="clearItems"
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
        v-else-if="needFetch"
        multiple
        :items="items"
        filterable
        data-fetch
        allow-create
        default-first-option
        :no-match-text="$t('message.search_auto_complete_not_found')"
        :popper-append-to-body="false"
        :placeholder="placeholder"
        @focus="getOptions"
        :value="values"
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
        :items="items"
        multiple
        filterable
        data-local
        default-first-option
        :no-match-text="$t('message.search_auto_complete_not_found')"
        :popper-append-to-body="false"
        :placeholder="placeholder"
        :value="values"
        @focus="getOptions"
        @change="setValues(name, $event)"
    >
      <el-option
          v-for="option of items"
          :key="option.value"
          :label="option.name[$i18n.locale]"
          :value="option.value"
      />
    </el-select>
  </div>
</template>

<script>
  import { FETCH_CPV_CODES, FETCH_REGIONS } from "./../../store/types/actions-types";

  import { Select, Option } from "element-ui";
  import { SET_CPV_CODES } from "../../store/types/mutations-types";

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
        type: Boolean,
        default: false
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
              lang: "ro"
            });
          }
        }
      },
      clearItems() {
        this.$store.commit(SET_CPV_CODES, {
          CPVCodes: []
        });
      }
    }
  }
  ;
</script>
