<template>
  <div>
    <div id="evaluation-title" class="info__title">{{ $t("tender.evaluation_of_winning_bid") }}</div>
    <div v-if="tender.lots" class="info">
      <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="elementsAmount"
        :page-size="pageSize"
      />
      <div
        v-for="(lot, index) of gd(tender, _ => _.lots, [])"
        v-if="index >= numberOfLastDisplayedLot - pageSize && index < numberOfLastDisplayedLot"
        :key="lot.id"
      >
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="16">
              <div class="info-block__text">
                {{ $t("tender.lot") }}
              </div>
              <div class="info-block__value info-block__value_bold">
                {{ lot.title }}
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                {{ $t("tender.lot_identifier") }}
              </div>
              <div class="info-block__value">
                {{ lot.id }}
              </div>
            </el-col>
          </el-row>
        </div>
        <evaluation-table
          v-if="
            gd(gd(tender, _ => _.awards, []).find(award => award.lotID === lot.id), _ => _, {}).hasOwnProperty('bid_id')
          "
          :awards="gd(tender, _ => _.awards, [])"
          :bids="gd(tender, _ => _.bids, [])"
          :lotId="lot.id"
        />

        <div v-else style="margin-top: 15px">
          {{ $t("tender.lot_is_not_awarded") }}
        </div>
        <hr
          v-if="!((index !== 0 && index % 24 === 0) || index === gd(tender, _ => _.lots, []).length - 1)"
          style="margin-bottom: 25px;"
        />
      </div>
      <list-pagination
        v-if="needPagination"
        :total="elementsAmount"
        :pageCount="0"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :changePage="changePage"
        offsetTo="evaluation-title"
        :key="'pagination'"
      />
    </div>
    <div v-else class="info">
      <evaluation-table :awards="gd(tender, _ => _.awards, [])" :bids="gd(tender, _ => _.bids, [])" />
    </div>
  </div>
</template>

<script>
import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";
import EvaluationTable from "./EvaluationTable";

import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";
export default {
  name: "Evaluation",
  components: {
    "list-pagination": ListPagination,
    "page-number": PageNumber,
    "evaluation-table": EvaluationTable,
  },
  props: {
    tender: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
      return this.gd(this.tender, _ => _.lots, []).length;
    },
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(...ars) {
      return formatDate(...ars);
    },
    fa(amount) {
      return formatAmount(amount);
    },
    changePage(page) {
      this.numberOfLastDisplayedLot = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
