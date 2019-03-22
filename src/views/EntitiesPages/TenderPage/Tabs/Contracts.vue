<template>
  <div class="info">
    <div id="contract-title" class="info__title info__title_with-action">
      {{ $t("tender.contract_award_notices") }}
      <el-radio-group v-model="cansView" size="medium" class="info__radio-group">
        <el-radio-button label="all">{{ $t("tender.all_lots") }}</el-radio-button>
        <el-radio-button label="successful">{{ $t("tender.successful_lots") }}</el-radio-button>
        <el-radio-button label="unsuccessful">{{ $t("tender.unsuccessful_lots") }}</el-radio-button>
      </el-radio-group>
    </div>
    <page-number
      v-if="needPagination"
      :current-page="currentPage"
      :elements-amount="itemsNumber"
      :page-size="pageSize"
    />
    <el-collapse accordion :value="gd(lotsList, _ => _[0].id, '0') + '0'" @change="changeActiveItem">
      <contract-item
        v-for="(lot, index) of needPagination
          ? lotsList.filter((it, i) => i >= numberOfLastDisplayedLot - pageSize && i < numberOfLastDisplayedLot)
          : lotsList"
        :key="lot.id + index"
        :lot="lot"
        :index="index"
        :evRecord="evRecord"
        :activeItemId="activeItemId"
      />
    </el-collapse>
    <list-pagination
      v-if="needPagination"
      :total="itemsNumber"
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
      cansView: "all",
    };
  },
  computed: {
    needPagination() {
      return this.itemsNumber > this.pageSize;
    },
    lotsList() {
      const initialLotsList = this.gd(this.evRecord, _ => _.tender.lots, []);

      switch (this.cansView) {
        case "successful":
          return initialLotsList.filter(lot => lot.status === "complete");
        case "unsuccessful":
          return initialLotsList.filter(lot => lot.status === "unsuccessful");
        default:
          return initialLotsList;
      }
    },
    itemsNumber() {
      return this.lotsList.length;
    },
  },
  created() {
    this.changeActiveItem(this.gd(this.lotsList, _ => _[0].id, "0") + "0");
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
