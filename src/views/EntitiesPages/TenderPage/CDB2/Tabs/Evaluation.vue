<template>
  <div class="info">
    <div id="evaluation-title" class="info__title">{{ $t("tender.evaluation_of_winning_bid") }}</div>
    <page-number
      v-if="needPagination"
      :current-page="currentPage"
      :elements-amount="elementsAmount"
      :page-size="pageSize"
    />
    <div
      v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
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
      <table
        v-if="
          gd(gd(evRecord, _ => _.awards, []).find(award => award.relatedLots[0] === lot.id), _ => _, {}).hasOwnProperty(
            'relatedBid'
          )
        "
        class="info-table evaluation-table"
      >
        <tr>
          <th>{{ $t("tender.tenderer") }}</th>
          <th>{{ $t("tender.bids_final_amount") }}</th>
          <th>{{ $t("tender.self_declaration") }}</th>
          <th>{{ $t("tender.eos_docs") }}</th>
          <!--<th>Declaration of no<br/>conflict of interets</th>-->
          <th v-html="$t('tender.status_and_resolution_tc')"></th>
        </tr>
        <tr
          v-for="award of gd(evRecord, _ => _.awards, [])
            .filter(_award => _award.relatedLots[0] === lot.id)
            .sort((awardA, awardB) => awardA.value.amount - awardB.value.amount)"
          :key="award.id"
        >
          <td :data-th="$t('tender.tenderer')">
            <div class="evaluation-table__supplier-name">{{ gd(award, _ => _.suppliers[0]).name }}</div>
            <div class="evaluation-table__supplier-id">
              {{ $t("tender.awards_supplier_identifier") }}: {{ gd(award, _ => _.suppliers[0]).id }}
            </div>
          </td>
          <td :data-th="$t('tender.bids_final_amount')">
            <div class="evaluation-table__amount">{{ fa(gd(award, _ => _.value.amount, 0)) }}</div>
            <div class="evaluation-table__currency">
              {{ gd(award, _ => _.value.currency) }} {{ $t("tender.value_excluding_VAT") }}
            </div>
          </td>
          <td :data-th="$t('tender.mtender_espd')">
            <button
              v-if="
                bidForCurrentAward(award.relatedBid).hasOwnProperty('documents')
                  ? bidForCurrentAward(award.relatedBid).documents.length
                  : false
              "
              type="button"
              @click="$refs[award.id + 'eligibilityDocuments'][0].show = true"
              class="evaluation-table__docs-espd-button"
            >
              {{ $t("tender.mtender_espd") }}
            </button>
            <div class="evaluation-table__docs-espd-text">
              {{ $t("tender.self_declaration") }}
            </div>
            <documents-modal
              :ref="award.id + 'eligibilityDocuments'"
              :documents="getEspdDocuments(award)"
              :datePublished="bidForCurrentAward(award.relatedBid).date"
              :noItemsText="$t('tender.no_documents_submitted')"
              :cdbType="cdbType"
            />
          </td>
          <td class="evaluation-table__docs-eos" :data-th="$t('tender.eos_docs')">
            <button
              v-if="
                bidForCurrentAward(award.relatedBid).hasOwnProperty('documents')
                  ? bidForCurrentAward(award.relatedBid).documents.length
                  : 0
              "
              type="button"
              @click="$refs[award.id][0].show = true"
              class="evaluation-table__docs-button"
            />
            <div class="evaluation-table__docs-eos-text" v-else>{{ $t("tender.no_documents") }}</div>
            <documents-modal
              :ref="award.id"
              :documents="getEosDocuments(award)"
              :datePublished="bidForCurrentAward(award.relatedBid).date"
              :noItemsText="$t('tender.no_documents')"
              :cdbType="cdbType"
            />
          </td>
          <!--<td>
            Declaration
          </td>-->
          <td :data-th="$t('tender.status_and_resolution_tc_withoutBreak')">
            <button
              v-if="!(gd(award, _ => _.status) === 'pending' && gd(award, _ => _.statusDetails) === 'empty')"
              type="button"
              @click="$refs[award.id + 'info'][0].show = true"
              class="evaluation-table__status"
            >
              {{ parseStatus(gd(award, _ => _.status), gd(award, _ => _.statusDetails)) }}
            </button>
            <div v-else>{{ parseStatus(gd(award, _ => _.status), gd(award, _ => _.statusDetails)) }}</div>
            <award-info-modal
              v-if="!(gd(award, _ => _.status) === 'pending' && gd(award, _ => _.statusDetails) === 'empty')"
              :ref="award.id + 'info'"
              :award="award"
              :cdbType="cdbType"
            />
            <div
              class="evaluation-table__status-time"
              v-if="!(gd(award, _ => _.status) === 'pending' && gd(award, _ => _.statusDetails) === 'empty')"
            >
              {{ fd(gd(award, _ => _.date), "DD.MM.YYYY / HH:mm", "") }}
            </div>
          </td>
        </tr>
      </table>

      <div v-else style="margin-top: 15px">
        {{ $t("tender.lot_is_not_awarded") }}
      </div>
      <hr
        v-if="!((index !== 0 && index % 24 === 0) || index === gd(evRecord, _ => _.tender.lots, []).length - 1)"
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
</template>

<script>
import DocumentsModal from "../../DocumentsModal";
import AwardInfoModal from "../../AwardInfoModal";

import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";

import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";

import awardsStatuses from "../../../../../store/types/awards-statuses";
import { MTENDER2 } from "../../../../../store/types/cbd-types";

export default {
  name: "Evaluation",
  components: {
    "documents-modal": DocumentsModal,
    "award-info-modal": AwardInfoModal,
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
    cdbType() {
      return MTENDER2;
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
    parseStatus(status, statusDetails) {
      if (status === "pending" && statusDetails === "empty") {
        return awardsStatuses["pending"][this.$i18n.locale];
      } else if (status === "pending" && statusDetails === "consideration") {
        return awardsStatuses["consideration"][this.$i18n.locale];
      } else if (
        (status === "pending" && statusDetails === "active") ||
        (status === "active" && statusDetails === "empty")
      ) {
        return awardsStatuses["winner"][this.$i18n.locale];
      } else if (
        (status === "pending" && statusDetails === "unsuccessful") ||
        (status === "unsuccessful" && statusDetails === "empty")
      ) {
        return awardsStatuses["disqualified"][this.$i18n.locale];
      } else {
        return awardsStatuses["pending"][this.$i18n.locale];
      }
    },
    bidForCurrentAward(bidId) {
      const currentBid = this.gd(this.evRecord, _ => _.bids.details, []).find(bid => bid.id === bidId);
      return currentBid ? currentBid : {};
    },
    changePage(page) {
      this.numberOfLastDisplayedLot = page * this.pageSize;
      this.currentPage = page;
    },
    getEosDocuments(award) {
      return [
        {
          title: this.$t("tender.espd_docs"),
          values: this.bidForCurrentAward(award.relatedBid).hasOwnProperty("documents")
            ? this.bidForCurrentAward(award.relatedBid).documents.filter(
                _doc => _doc.documentType === "x_eligibilityDocuments"
              )
            : [],
        },
        {
          title: this.$t("tender.modal_documents"),
          values: this.bidForCurrentAward(award.relatedBid).hasOwnProperty("documents")
            ? this.bidForCurrentAward(award.relatedBid).documents.filter(
                _doc => _doc.documentType !== "x_eligibilityDocuments"
              )
            : [],
        },
      ];
    },
    getEspdDocuments(award) {
      return [
        {
          title: this.$t("tender.espd_docs"),
          values: this.bidForCurrentAward(award.relatedBid).hasOwnProperty("documents")
            ? this.bidForCurrentAward(award.relatedBid).documents.filter(
                _doc => _doc.documentType === "x_eligibilityDocuments"
              )
            : [],
        },
      ];
    },
  },
};
</script>
