<template>
  <div class="info">
    <div id="auction-title" class="info__title">{{ $t("tender.e_auction") }}</div>
    <page-number
      v-if="needPagination"
      :current-page="currentPage"
      :elements-amount="elementsAmount"
      :page-size="pageSize"
    />
    <el-collapse accordion :value="mapObject[0].id" @change="changeActiveItem">
      <auction-item
        v-for="(lot, index) of mapObject"
        v-if="index >= numberOfLastDisplayedAuction - pageSize && index < numberOfLastDisplayedAuction"
        :key="lot.id + index"
        :lot="lot"
      />
    </el-collapse>
    <list-pagination
      v-if="needPagination"
      :total="elementsAmount"
      :pageCount="0"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :changePage="changePage"
      offsetTo="auction-title"
      :key="'pagination'"
    />
  </div>
</template>

<script>
import AuctionItem from "./AuctionItem";
import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";
import { getDataFromObject } from "../../../../../utils";

export default {
  name: "Auction",
  components: {
    "auction-item": AuctionItem,
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
      numberOfLastDisplayedAuction: 25,
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
    mapObject() {
      return this.gd(this.tender, _ => _.lots, []).map(lot => ({
        id: this.gd(lot, _ => _.id, "###"),
        title: this.gd(lot, _ => _.title, "###"),
        minimalStep: {
          amount: this.gd(lot, _ => _.minimalStep.amount, "###"),
          currency: this.gd(lot, _ => _.minimalStep.currency, "###"),
        },
        status: this.gd(lot, _ => _.status, "###"),
        description: this.gd(lot, _ => _.description, "###"),
        auctionPeriod: {
          startDate: this.gd(lot, _ => _.auctionPeriod.startDate),
          endDate: this.gd(lot, _ => _.auctionPeriod.endDate),
        },
        url: lot.auctionUrl,
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
      this.numberOfLastDisplayedAuction = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
