<template>
  <div class="info info_budget" v-if="FSs.length">
    <page-number
      v-if="needPagination"
      :current-page="currentPage"
      :elements-amount="elementsAmount"
      :page-size="pageSize"
    />
    <el-collapse accordion :value="mapFSs[0].ocid" @change="changeActiveItem">
      <budget-breakdown
        v-for="(budgetBreakdown, index) of mapFSs"
        v-if="index >= numberOfLastDisplayedSource - pageSize && index < numberOfLastDisplayedSource"
        :key="budgetBreakdown.ocid"
        :budgetBreakdown="budgetBreakdown"
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
  <div class="info__no-data" v-else>{{ $t("budget.no_finances_sources") }}</div>
</template>

<script>
import BudgetBreakdown from "../../../../components/BudgetBreakdown";
import ListPagination from "./../../../../components/ListPagination";
import PageNumber from "./../../../../components/PageNumber";

import { getDataFromObject, getOrganizationObject, getSourceOfMoney } from "./../../../../utils";

export default {
  name: "SourceItem",
  components: {
    "budget-breakdown": BudgetBreakdown,
    "list-pagination": ListPagination,
    "page-number": PageNumber,
  },
  props: {
    FSs: {
      type: Array,
      required: true,
    },
    buyer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeItemId: "",
      pageSize: 25,
      numberOfLastDisplayedSource: 25,
      currentPage: 1,
    };
  },
  computed: {
    needPagination() {
      return this.elementsAmount > this.pageSize;
    },
    elementsAmount() {
      return this.FSs.length;
    },
    mapFSs() {
      return this.FSs.map(fs => ({
        ocid: this.gd(fs, _ => _.compiledRelease.ocid),
        value: {
          amount: this.gd(fs, _ => _.compiledRelease.planning.budget.amount.amount),
          currency: this.gd(fs, _ => _.compiledRelease.planning.budget.amount.currency),
        },
        sourceOfMoney: getSourceOfMoney(
          this.gd(fs, _ => _.compiledRelease.parties, []),
          this.gd(this.buyer, _ => _.id)
        ),
        status: this.gd(fs, _ => _.compiledRelease.planning.budget.verified),
        budgetLineId: this.gd(fs, _ => _.compiledRelease.planning.budget.id, this.$t("n/a")),
        description: this.gd(fs, _ => _.compiledRelease.planning.budget.description, this.$t("n/a")),
        period: {
          startDate: this.gd(fs, _ => _.compiledRelease.planning.budget.period.startDate),
          endDate: this.gd(fs, _ => _.compiledRelease.planning.budget.period.endDate),
        },
        project: this.gd(fs, _ => _.compiledRelease.planning.budget.project, this.$t("n/a")),
        projectId: this.gd(fs, _ => _.compiledRelease.planning.budget.projectID, this.$t("n/a")),
        buyer: {
          name: this.gd(this.buyer, _ => _.name),
          id: this.gd(this.buyer, _ => _.id),
        },
        funder: {
          name: this.gd(getOrganizationObject(this.gd(fs, _ => _.compiledRelease.parties, []), "funder"), _ => _.name),
          id: this.gd(getOrganizationObject(this.gd(fs, _ => _.compiledRelease.parties, []), "funder"), _ => _.id),
        },
        payer: {
          name: this.gd(getOrganizationObject(this.gd(fs, _ => _.compiledRelease.parties, []), "payer"), _ => _.name),
          id: this.gd(getOrganizationObject(this.gd(fs, _ => _.compiledRelease.parties, []), "payer"), _ => _.id),
        },
      }));
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
      this.numberOfLastDisplayedSource = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
