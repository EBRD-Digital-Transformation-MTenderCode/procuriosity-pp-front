<template>
  <table v-if="getAwards.length" class="info-table evaluation-table">
    <tr>
      <th>{{ $t("tender.tenderer") }}</th>
      <th>{{ $t("tender.bids_final_amount") }}</th>
      <th>{{ $t("tender.self_declaration") }}</th>
      <th>{{ $t("tender.eos_docs") }}</th>
      <th v-html="$t('tender.status_and_resolution_tc')"></th>
    </tr>
    <tr
      v-for="award of [...getAwards].sort((awardA, awardB) => awardA.value.amount - awardB.value.amount)"
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
          {{ gd(award, _ => _.value.currency) }}
          {{ award.value.valueAddedTaxIncluded ? $t("tender.value_including_VAT") : $t("tender.value_excluding_VAT") }}
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
          :cdbType="cdbType"
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
          :cdbType="cdbType"
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
</template>

<script>
import DocumentsModal from "../../DocumentsModal";
import AwardInfoModal from "../../AwardInfoModal";

import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";

import awardsStatuses from "../../../../../store/types/awards-statuses";
import { MTENDER1 } from "../../../../../store/types/cbd-types";

export default {
  name: "Evaluation",
  components: {
    "documents-modal": DocumentsModal,
    "award-info-modal": AwardInfoModal,
  },
  props: {
    awards: {
      type: Array,
      required: true,
    },
    bids: {
      type: Array,
      required: true,
    },
    lotId: {
      type: String,
      required: false,
    },
  },
  computed: {
    cdbType() {
      return MTENDER1;
    },
    getAwards() {
      return this.lotId ? this.gd(this.awards.filter(award => award.lotID === this.lotId), _ => _, []) : this.awards;
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
    bidForCurrentAward(bidId) {
      const currentBid = this.bids.find(bid => bid.id === bidId);
      return currentBid ? currentBid : {};
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
