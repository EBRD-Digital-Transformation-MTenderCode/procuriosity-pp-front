<template>
  <div class="info">
    <div id="contract-title" class="info__title">{{ $t("tender.contract_award_notices") }}</div>
    <page-number
      v-if="needPagination"
      :current-page="currentPage"
      :elements-amount="elementsAmount"
      :page-size="pageSize"
    />
    <el-collapse accordion :value="gd(evRecord, _ => _.tender.lots[0].id, '0') + '0'" @change="changeActiveItem">
      <contract-item
        v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
        v-if="index >= numberOfLastDisplayedLot - pageSize && index < numberOfLastDisplayedLot"
        :key="lot.id + index"
        :lot="lot"
        :index="index"
        :evRecord="evRecord"
        :activeItemId="activeItemId"
      />
    </el-collapse>
    <list-pagination
      v-if="needPagination"
      :total="elementsAmount"
      :pageCount="0"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :changePage="changePage"
      offsetTo="contract-title"
      :key="'pagination'"
    />
  </div>
</template>

<script>
import ContractItem from "./ContractItem";
import ListPagination from "./../../../../components/ListPagination";
import PageNumber from "./../../../../components/PageNumber";

import { getDataFromObject } from "./../../../../utils";

export default {
  name: "Contracts",
  components: {
    "contract-item": ContractItem,
    "list-pagination": ListPagination,
    "page-number": PageNumber,
  },
  props: {
    evRecord: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeItemId: "",
      pageSize: 25,
      numberOfLastDisplayedLot: 25,
      currentPage: 1,
    };
  },
  computed: {
    needPagination() {
      return this.elementsAmount > this.pageSize;
    },
    elementsAmount() {
      return this.gd(this.evRecord, _ => _.tender.lots, []).length;
    },
  },
  created() {
    this.changeActiveItem(this.gd(this.evRecord, _ => _.tender.lots[0].id, "0") + "0");
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    changeActiveItem(item) {
      this.activeItemId = item;
    },
    changePage(page) {
      this.numberOfLastDisplayedLot = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
