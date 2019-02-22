<template>
  <div class="info">
    <div id="contract-title" class="info__title">{{ $t("budget.source_of_financing") }}</div>
    <el-collapse
        accordion
        :value="FS[0].ocid"
        @change="changeActiveItem"
    >
      <source-item
          v-for="(item, index) of FS"
          :key="item.ocid + index"
          :item="item"
          :index="index"
          :FS="FS"
          :activeItemId="activeItemId"
      />
    </el-collapse>
  </div>
</template>

<script>
  import SourceItem from "./SourceItem";

  import {
    getDataFromObject
  } from "./../../../../utils";

  export default {
    name: "SourceItem",
    components: {
      "source-item": SourceItem,
    },
    props: {
      FS: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        activeItemId: "",
      };
    },
    methods: {
      gd(...args) {
        return getDataFromObject(...args);
      },
      changeActiveItem(item) {
        this.activeItemId = item;
      },
    }
  };
</script>

