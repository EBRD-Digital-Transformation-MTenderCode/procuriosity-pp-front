<template>
  <div>
    <div v-if="elementsAmount" class="info">
      <div id="auction-title" class="info__title">{{ $t("tender.e_auction") }}</div>
      <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="elementsAmount"
        :page-size="pageSize"
      />
      <el-collapse accordion :value="mapLots[0].id" @change="changeActiveItem">
        <auction-item
          v-for="(lot, index) of mapLots"
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
    <div class="info" v-else>
      <div class="info__title">{{ $t("tender.e_auction") }}</div>
      <div>
        <div class="info-blocks">
          <div v-if="mapAuction.auctionPeriod.endDate">
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.auction_period") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fd(mapAuction.auctionPeriod.startDate) }} - {{ fd(mapAuction.auctionPeriod.endDate) }}
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.start_date") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fd(mapAuction.auctionPeriod.startDate) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.minimal_eligible_difference") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{ fa(mapAuction.minimalStep.amount) }} {{ mapAuction.minimalStep.currency }}
            </div>
          </el-col>
        </el-row>
        <el-row v-if="mapAuction.url" :gutter="15">
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.link_to_auction") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__link">
              <a :href="mapAuction.url" target="_blank">{{ $t("tender.go_to_auction") }}</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import AuctionItem from "./AuctionItem";
import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";
import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";

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
    mapLots() {
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
    mapAuction() {
      return {
        minimalStep: {
          amount: this.gd(this.tender, _ => _.minimalStep.amount, "###"),
          currency: this.gd(this.tender, _ => _.minimalStep.currency, "###"),
        },
        auctionPeriod: {
          startDate: this.gd(this.tender, _ => _.auctionPeriod.startDate),
          endDate: this.gd(this.tender, _ => _.auctionPeriod.endDate),
        },
        url: this.tender.auctionUrl,
      };
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
