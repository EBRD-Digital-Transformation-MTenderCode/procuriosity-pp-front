<template>
  <div class="info" v-if="FS.length !== 0">
    <div id="contract-title" class="info__title">{{ $t("budget.source_of_financing") }}</div>
    <div class="info-blocks">
      <div class="info-block table-header">
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text info-block__text_bold">
              №
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text info-block__text_bold">
              ProjectID
            </div>
          </el-col>
          <el-col :sm="3">
            <div class="info-block__text info-block__text_bold">
              Source of Money
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text info-block__text_bold">
              Validity period
            </div>
          </el-col>
          <el-col :sm="3">
            <div class="info-block__text info-block__text_bold">
              Amount
            </div>
          </el-col>
          <el-col :sm="2">
            <div class="info-block__text info-block__text_bold">
              Status
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
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
  <div v-else> Bugetul nu are încă surse de finanțare</div>
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
      },
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

