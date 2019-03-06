<template>
  <div class="main-search">
    <el-checkbox-button class="search-form__btn search-form__btn_strict" v-model="currentStrictSearhcValue">{{
      currentStrictSearhcValue ? $t("search.strict") : $t("search.no_strict")
    }}</el-checkbox-button>

    <el-input
      type="text"
      maxlength="255"
      :placeholder="$t('search.titles_or_descriptions')"
      v-model="currentSearchValue"
      @change="handleChangeSearch"
      clearable
    />

    <el-button type="warning" class="search-form__btn search-form__btn_search" @click="doSearch">
      {{ $t("search.action_of_search") }}
      <i class="el-icon-back" />
    </el-button>
  </div>
</template>

<script>
import { SET_ENTITY_SEARCH_PARAMS } from "./../../store/types/mutations-types";

export default {
  name: "MainSearch",
  props: {
    entityName: {
      type: String,
      required: true,
    },
    titlesOrDescriptionsStrict: {
      type: Boolean,
      required: true,
    },
    titlesOrDescriptions: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentStrictSearhcValue: this.titlesOrDescriptionsStrict,
      currentSearchValue: this.titlesOrDescriptions,
    };
  },
  methods: {
    handleChangeSearch(val) {
      this.currentSearchValue = val;
      this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
        entityName: this.entityName,
        params: {
          titlesOrDescriptionsStrict: this.currentStrictSearhcValue,
          titlesOrDescriptions: val.trim(),
        },
      });
    },
    doSearch() {
      this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
        entityName: this.entityName,
        params: {
          ...this.$store.state.entities[this.entityName].searchParams,
        },
      });
    },
  },
  watch: {
    currentStrictSearhcValue(newVal) {
      if (this.currentSearchValue) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entityName: this.entityName,
          params: {
            titlesOrDescriptionsStrict: newVal,
          },
        });
      }

      setTimeout(() => {
        const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
        localStorageEntities[this.entityName].searchParams = {
          ...localStorageEntities[this.entityName].searchParams,
          titlesOrDescriptionsStrict: newVal,
        };
        localStorage.setItem("entities", JSON.stringify(localStorageEntities));
      }, 0);
    },
  },
};
</script>
