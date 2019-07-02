<template>
  <div>
    <table class="info-table offers-table" v-if="getBids.length">
      <tr>
        <th>{{ $t("tender.tenderer") }}</th>
        <th>{{ $t("tender.discloser_date") }}</th>
        <th>{{ $t("tender.initial_offer") }}</th>
        <th>{{ $t("tender.self_declaration") }}</th>
        <th>{{ $t("tender.eos_docs") }}</th>
      </tr>
      <tr v-for="bid of getBids" :key="bid.id">
        <td :data-th="$t('tender.tenderer')">
          <div class="offers-table__tenderer-name">{{ gd(bid, _ => _.tenderers[0].name, "###") }}</div>
          <div class="offers-table__tenderer-id">
            {{ $t("tender.idno_code") }}: {{ gd(bid, _ => _.tenderers[0].identifier.id, "###") }}
          </div>
        </td>
        <td :data-th="$t('tender.discloser_date')">
          <div class="offers-table__date">{{ fd(gd(bid, _ => _.date), "DD/MM/YYYY") }}</div>
          <div class="offers-table__time">{{ fd(gd(bid, _ => _.date), "HH:mm") }}</div>
        </td>
        <td v-if="lotId" :data-th="$t('tender.initial_offer')">
          <div class="offers-table__amount">
            {{ fa(gd(bid, _ => _.lotValues).find(value => value.relatedLot === lotId).value.amount) }}
          </div>
          <div class="offers-table__currency">
            {{ gd(bid, _ => _.lotValues).find(value => value.relatedLot === lotId).value.currency }}
            {{ $t("tender.exluding_vat") }}
          </div>
        </td>
        <td v-else :data-th="$t('tender.initial_offer')">
          <div class="offers-table__amount">
            {{ fa(gd(bid, _ => _.value.amount)) }}
          </div>
          <div class="offers-table__currency">
            {{ gd(bid, _ => _.value.currency) }}
            {{ $t("tender.exluding_vat") }}
          </div>
        </td>
        <td :data-th="$t('tender.self_declaration')">
          <button
            type="button"
            @click="$refs[bid.id + 'eligibilityDocuments'][0].show = true"
            class="offers-table__docs-espd-button"
          >
            {{ $t("tender.mtender_espd") }}
          </button>
          <documents-modal
            :ref="bid.id + 'eligibilityDocuments'"
            :documents="getEspdDocuments(bid)"
            :datePublished="bid.date"
            :noItemsText="$t('tender.no_documents_submitted')"
            :cdb-type="cdbType"
          />
          <div class="offers-table__docs-espd-text">{{ $t("tender.self_declaration") }}</div>
        </td>
        <td :data-th="$t('tender.eos_docs')">
          <button type="button" @click="$refs[bid.id][0].show = true" class="offers-table__docs-button" />
          <documents-modal
            :ref="bid.id"
            :documents="getEosDocuments(bid)"
            :datePublished="bid.date"
            :noItemsText="$t('tender.no_documents')"
            :cdb-type="cdbType"
          />
        </td>
      </tr>
    </table>

    <div v-else style="margin-top: 15px">
      {{ $t("tender.no_bids_received") }}
    </div>
  </div>
</template>

<script>
import DocumentsModal from "../../DocumentsModal";

import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";
import { MTENDER1 } from "../../../../../store/types/cbd-types";

export default {
  name: "BidsTable",
  components: {
    "documents-modal": DocumentsModal,
  },
  props: {
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
    getBids() {
      return this.lotId
        ? this.bids.filter(_bid => _bid.lotValues.find(value => value.relatedLot === this.lotId))
        : this.bids;
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
    getEosDocuments(bid) {
      return [
        {
          title: this.$t("tender.espd_docs"),
          values: bid.hasOwnProperty("documents")
            ? bid.documents.filter(_doc => _doc.documentType === "eligibilityDocuments")
            : [],
        },
        {
          title: this.$t("tender.modal_documents"),
          values: bid.hasOwnProperty("documents")
            ? bid.documents.filter(_doc => _doc.documentType !== "eligibilityDocuments")
            : [],
        },
      ];
    },
    getEspdDocuments(bid) {
      return [
        {
          title: this.$t("tender.espd_docs"),
          values: bid.hasOwnProperty("documents")
            ? bid.documents.filter(_doc => _doc.documentType === "eligibilityDocuments")
            : [],
        },
      ];
    },
  },
};
</script>
