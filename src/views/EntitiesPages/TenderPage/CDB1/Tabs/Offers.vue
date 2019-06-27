<template>
  <div class="info">
    <div class="info__title">{{ $t("tender.record_opening_electronic_bids") }}</div>
    <div class="info__sub-title">{{ $t("tender.information_about_electronic_bids") }}</div>
    <div class="info-blocks">
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">
              {{ gd(tender, _ => _.bids, []).length }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div id="sub-title" class="info__sub-title">{{ $t("tender.electronic_bids_received") }}</div>
    <div v-if="tender.lots">
      <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="elementsAmount"
        :page-size="pageSize"
      />
      <div
        v-for="(lot, index) of gd(tender, _ => _.lots, [])"
        v-if="index >= numberOfLastDisplayedElement - pageSize && index < numberOfLastDisplayedElement"
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
        <bids-table :bids="gd(tender, _ => _.bids, [])" :lotId="lot.id" />
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
        offsetTo="sub-title"
        :key="'pagination'"
      />
    </div>
    <div v-else>
      <bids-table :bids="gd(tender, _ => _.bids, [])" />
    </div>
  </div>
</template>

<script>
import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";
import BidsTable from "./BidsTable";

import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";

export default {
  name: "Offers",
  components: {
    "list-pagination": ListPagination,
    "page-number": PageNumber,
    "bids-table": BidsTable,
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
      numberOfLastDisplayedElement: 25,
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
      this.numberOfLastDisplayedElement = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
