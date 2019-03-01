<template>
  <div class="info">
    <div id="auction-title" class="info__title">{{$t("tender.e_auction")}}</div>
    <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="elementsAmount"
        :page-size="pageSize"
    />
    <el-collapse
        accordion
        :value="mapObject[0].id"
        @change="changeActiveItem"
    >
      <auction-item
          v-for="(auction, index) of mapObject"
          v-if ="index >= numberOfLastDisplayedAuction - pageSize &&  index < numberOfLastDisplayedAuction"
          :key="auction.id + index"
          :auction="auction"
          :index="index"
          :activeItemId="activeItemId"
      />
    </el-collapse>
    <list-pagination
        v-if="needPagination"
        :total="elementsAmount"
        :pageCount="0"
        :currentPage=currentPage
        :pageSize=pageSize
        :changePage="changePage"
        offsetTo="auction-title"
        :key="'pagination'"
    />
  </div>

</template>

<script>
  import AuctionItem from "./AuctionItem";
  import ListPagination from "./../../../../components/ListPagination";
  import PageNumber  from "./../../../../components/PageNumber"
  import {
    getDataFromObject,
    formatDate,
    formatAmount
  } from "./../../../../utils";

  export default {
    name: "Auction",
    components: {
      "auction-item": AuctionItem,
      "list-pagination": ListPagination,
      "page-number": PageNumber
    },
    props: {
      evRecord: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeItemId: "",
        pageSize: 25,
        numberOfLastDisplayedAuction: 25,
        currentPage: 1
      };
    },
    computed: {
      needPagination(){
        return this.elementsAmount > this.pageSize
      },
      elementsAmount() {
        return this.gd(this.evRecord, _ => _.tender.electronicAuctions.details, []).length;
      },
      mapObject() {
        return this.gd(this.evRecord,_=>_.tender.electronicAuctions.details,[]).map(auction => ({
          id: this.gd(auction,_=>_.id),
          lotTitle: this.getLotTitle(this.gd(auction,_=>_.relatedLot)),
          minimalStep: {
            amount: this.gd(auction, _ => _.electronicAuctionModalities[0].eligibleMinimumDifference.amount),
            currency: this.gd(auction, _ => _.electronicAuctionModalities[0].eligibleMinimumDifference.currency)
          },
          rounds: this.gd(auction, _ => _.electronicAuctionProgress).length,
          participants: this.gd(auction, _ => _.electronicAuctionProgress[0].breakdown).length,
          auctionPeriod: {
            startDate: this.gd(auction, _ => _.auctionPeriod.startDate),
            endDate: this.gd(auction, _ => _.auctionPeriod.endDate),
          },
          auctionProgress: this.getAuctionProgress(this.gd(auction,_=>_.electronicAuctionProgress,[])),
          results: this.getResults(this.gd(auction,_=>_.electronicAuctionResult,[]))
        }));
      },
    },
    methods: {
      getLotTitle(id) {
        return this.gd(this.gd(this.evRecord,_=>_.tender.lots,[]).find(lot => id === lot.id),_=>_.title);
      },
      getAuctionProgress(progresses) {
        return progresses.map(progress => ({
          round: this.gd(progress, _ => _.id),
          period: {
            startDate: this.gd(progress, _ => _.period.startDate),
            endDate: this.gd(progress, _ => _.period.endDate),
          },
          breakdowns: this.getBreakdowns(this.gd(progress,_=>_.breakdown,[]))
        }));
      },
      getBreakdowns(breakdowns) {
        return breakdowns.map(breakdown => ({
          value: {
            amount: this.gd(breakdown, _ => _.value.amount),
            currency: this.gd(breakdown, _ => _.value.currency)
          },
          dateMet: this.gd(breakdown, _ => _.dateMet),
          tenderer: this.getTenderer(this.gd(breakdown,_=>_.relatedBid))
        }));
      },
      getTenderer(id) {
        const tenderer = this.gd(this.gd(this.evRecord, _ => _.bids.details, []).find(bid => id === bid.id), _ => _.tenderers[0]);
        return {
          id: tenderer.id,
          name: tenderer.name
        };
      },
      getResults(results) {
        return results.map(result => ({
          value: {
            amount: this.gd(result, _ => _.value.amount),
            currency: this.gd(result, _ => _.value.currency)
          },
          tenderer: this.getTenderer(this.gd(result,_=>_.relatedBid))
        }));
      },
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
        this.numberOfLastDisplayedAuction =  page * this.pageSize;
        this.currentPage = page;
      }
    },
  };

</script>
