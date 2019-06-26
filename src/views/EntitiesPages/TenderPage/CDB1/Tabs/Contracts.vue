<template>
  <div class="info">
    <div id="contract-title" class="info__title info__title_with-action">
      {{ $t("tender.contract_award_notices") }}
    </div>
    <page-number
      v-if="needPagination"
      :current-page="currentPage"
      :elements-amount="itemsNumber"
      :page-size="pageSize"
    />
    <el-collapse accordion :value="gd(tender.contracts, _ => _[0].id, '0') + '0'" @change="changeActiveItem">
      <contract-item
        v-for="(contract, index) of needPagination
          ? tender.contracts.filter(
              (it, i) => i >= numberOfLastDisplayedContract - pageSize && i < numberOfLastDisplayedContract
            )
          : tender.contracts"
        :key="contract.id + index"
        :contract="contract"
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
import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";

import { getDataFromObject } from "../../../../../utils";

export default {
  name: "Contracts",
  components: {
    "contract-item": ContractItem,
    "list-pagination": ListPagination,
    "page-number": PageNumber,
  },
  props: {
    tender: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeItemId: "",
      pageSize: 25,
      numberOfLastDisplayedContract: 25,
      currentPage: 1,
    };
  },
  computed: {
    needPagination() {
      return this.itemsNumber > this.pageSize;
    },
    itemsNumber() {
      return this.tender.contracts.length;
    },
  },

  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    changeActiveItem(item) {
      this.activeItemId = item;
    },
    changePage(page) {
      this.numberOfLastDisplayedContract = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
