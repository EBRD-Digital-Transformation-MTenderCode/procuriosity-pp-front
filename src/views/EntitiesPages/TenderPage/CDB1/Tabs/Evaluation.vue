<template>
  <div v-if="tender.lots" class="info">
    <div id="evaluation-title" class="info__title">{{ $t("tender.evaluation_of_winning_bid") }}</div>
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
      <table
        v-if="
          gd(gd(tender, _ => _.awards, []).find(award => award.lotID === lot.id), _ => _, {}).hasOwnProperty('bid_id')
        "
        class="info-table evaluation-table"
      >
        <tr>
          <th>{{ $t("tender.tenderer") }}</th>
          <th>{{ $t("tender.bids_final_amount") }}</th>
          <th>{{ $t("tender.self_declaration") }}</th>
          <th>{{ $t("tender.eos_docs") }}</th>
          <th v-html="$t('tender.status_and_resolution_tc')"></th>
        </tr>
        <tr
          v-for="award of gd(tender, _ => _.awards, [])
            .filter(_award => _award.lotID === lot.id)
            .sort((awardA, awardB) => awardA.value.amount - awardB.value.amount)"
          :key="award.id"
        >
          <td :data-th="$t('tender.tenderer')">
            <div class="evaluation-table__supplier-name">{{ gd(award, _ => _.suppliers[0]).name }}</div>
            <div class="evaluation-table__supplier-id">
              {{ $t("tender.awards_supplier_identifier") }}: {{ gd(award, _ => _.suppliers[0]).identifier.id }}
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
              v-if="getEspdDocuments(award).find(obj => obj.values.length)"
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
              :noItemsText="$t('tender.no_documents_submitted')"
            />
          </td>
          <td class="evaluation-table__docs-eos" :data-th="$t('tender.eos_docs')">
            <button
              v-if="getEosDocuments(award).find(obj => obj.values.length)"
              type="button"
              @click="$refs[award.id][0].show = true"
              class="evaluation-table__docs-button"
            />
            <div class="evaluation-table__docs-eos-text" v-else>{{ $t("tender.no_documents") }}</div>
            <documents-modal
              :ref="award.id"
              :documents="getEosDocuments(award)"
              :noItemsText="$t('tender.no_documents')"
            />
          </td>
          <td :data-th="$t('tender.status_and_resolution_tc_withoutBreak')">
            <button
              v-if="!(gd(award, _ => _.status) === 'pending')"
              type="button"
              @click="$refs[award.id + 'info'][0].show = true"
              class="evaluation-table__status"
            >
              {{ parseStatus(gd(award, _ => _.status)) }}
            </button>
            <div v-else>{{ parseStatus(gd(award, _ => _.status)) }}</div>
            <award-info-modal
              v-if="!(gd(award, _ => _.status) === 'pending')"
              :ref="award.id + 'info'"
              :award="award"
              :cdbType="cdbType"
            />
            <div class="evaluation-table__status-time" v-if="!(gd(award, _ => _.status) === 'pending')">
              {{ fd(gd(award, _ => _.date), "DD.MM.YYYY / HH:mm", "") }}
            </div>
          </td>
        </tr>
      </table>

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
    <div class="info__title">{{ $t("tender.evaluation_of_winning_bid") }}</div>
    <table class="info-table evaluation-table">
      <tr>
        <th>{{ $t("tender.tenderer") }}</th>
        <th>{{ $t("tender.bids_final_amount") }}</th>
        <th>{{ $t("tender.self_declaration") }}</th>
        <th>{{ $t("tender.eos_docs") }}</th>
        <th v-html="$t('tender.status_and_resolution_tc')"></th>
      </tr>
      <tr
        v-for="award of [...gd(tender, _ => _.awards, [])].sort(
          (awardA, awardB) => awardA.value.amount - awardB.value.amount
        )"
        :key="award.id"
      >
        <td :data-th="$t('tender.tenderer')">
          <div class="evaluation-table__supplier-name">{{ gd(award, _ => _.suppliers[0]).name }}</div>
          <div class="evaluation-table__supplier-id">
            {{ $t("tender.awards_supplier_identifier") }}: {{ gd(award, _ => _.suppliers[0]).identifier.id }}
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
            v-if="getEspdDocuments(award).find(obj => obj.values.length)"
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
            :noItemsText="$t('tender.no_documents_submitted')"
          />
        </td>
        <td class="evaluation-table__docs-eos" :data-th="$t('tender.eos_docs')">
          <button
            v-if="getEosDocuments(award).find(obj => obj.values.length)"
            type="button"
            @click="$refs[award.id][0].show = true"
            class="evaluation-table__docs-button"
          />
          <div class="evaluation-table__docs-eos-text" v-else>{{ $t("tender.no_documents") }}</div>
          <documents-modal
            :ref="award.id"
            :documents="getEosDocuments(award)"
            :noItemsText="$t('tender.no_documents')"
          />
        </td>
        <td :data-th="$t('tender.status_and_resolution_tc_withoutBreak')">
          <button
            v-if="!(gd(award, _ => _.status) === 'pending')"
            type="button"
            @click="$refs[award.id + 'info'][0].show = true"
            class="evaluation-table__status"
          >
            {{ parseStatus(gd(award, _ => _.status)) }}
          </button>
          <div v-else>{{ parseStatus(gd(award, _ => _.status)) }}</div>
          <award-info-modal
            v-if="!(gd(award, _ => _.status) === 'pending')"
            :ref="award.id + 'info'"
            :award="award"
            :cdbType="cdbType"
          />
          <div class="evaluation-table__status-time" v-if="!(gd(award, _ => _.status) === 'pending')">
            {{ fd(gd(award, _ => _.date), "DD.MM.YYYY / HH:mm", "") }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import DocumentsModal from "../../DocumentsModal";
import AwardInfoModal from "../../AwardInfoModal";

import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";

import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";

import awardsStatuses from "../../../../../store/types/awards-statuses";
import { MTENDER1 } from "../../../../../store/types/cbd-types";

export default {
  name: "Evaluation",
  components: {
    "documents-modal": DocumentsModal,
    "award-info-modal": AwardInfoModal,
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
    cdbType() {
      return MTENDER1;
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
    parseStatus(status) {
      if (status === "active") {
        return awardsStatuses["winner"][this.$i18n.locale];
      } else if (status === "unsuccessful") {
        return awardsStatuses["disqualified"][this.$i18n.locale];
      } else if (status === "pending") {
        return awardsStatuses["pending"][this.$i18n.locale];
      } else {
        return "###";
      }
    },
    bidForCurrentAward(bidId) {
      const currentBid = this.gd(this.tender, _ => _.bids, []).find(bid => bid.id === bidId);
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
          values: this.bidForCurrentAward(award.bid_id).hasOwnProperty("documents")
            ? this.bidForCurrentAward(award.bid_id).documents.filter(
                _doc => _doc.documentType === "eligibilityDocuments"
              )
            : [],
        },
        {
          title: this.$t("tender.modal_documents"),
          values: this.bidForCurrentAward(award.bid_id).hasOwnProperty("documents")
            ? this.bidForCurrentAward(award.bid_id).documents.filter(
                _doc => _doc.documentType !== "eligibilityDocuments"
              )
            : [],
        },
      ];
    },
    getEspdDocuments(award) {
      return [
        {
          title: this.$t("tender.espd_docs"),
          values: this.bidForCurrentAward(award.bid_id).hasOwnProperty("documents")
            ? this.bidForCurrentAward(award.bid_id).documents.filter(
                _doc => _doc.documentType === "eligibilityDocuments"
              )
            : [],
        },
      ];
    },
  },
};
</script>
