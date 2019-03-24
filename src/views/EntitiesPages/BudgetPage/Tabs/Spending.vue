<template>
  <div class="info">
    <div id="contract-title" class="info__title">{{ $t("budget.spending") }}</div>
    <div class="info-blocks">
      <div class="info-block table-header">
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text info-block__text_bold">
              №
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text info-block__text_bold">
              {{ $t("budget.tender_id") }}/{{ $t("budget.contract_id") }}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text info-block__text_bold">
              {{ $t("budget.budget_project_id") }}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text info-block__text_bold">
              {{ $t("budget.amount") }}
            </div>
          </el-col>
          <el-col :sm="3">
            <div class="info-block__text info-block__text_bold">
              {{ $t("budget.type") }}
            </div>
          </el-col>
          <el-col :sm="3">
            <div class="info-block__text info-block__text_bold">
              {{ $t("budget.status") }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-collapse accordion @change="changeActiveItem">
      <spending-item
        v-for="(procedure, index) of procedures"
        :key="procedure.id"
        :index="index"
        :activeItemId="activeItemId"
        :procedure="procedure"
      />
    </el-collapse>
  </div>
</template>

<script>
import SpendingItem from "./SpendingItem";

import { getDataFromObject } from "./../../../../utils";

export default {
  name: "Spanding",
  components: {
    "spending-item": SpendingItem,
  },
  props: {
    /*      relatedProcessesId: {
        type: Array,
        required: true
      },*/
  },
  data() {
    return {
      activeItemId: "",
      procedures: [],
    };
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    changeActiveItem(item) {
      this.activeItemId = item;
    },
  },
};
</script>
