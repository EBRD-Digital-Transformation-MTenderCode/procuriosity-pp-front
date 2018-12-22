<template>
  <div class="info">
    <div class="info__title">{{ $t("tender.evaluation_of_winning_bid")}}</div>
    <div
      v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
      :key="lot.id"
    >
      <div style="font-size: 16px; font-weight: 700;">
        {{ $t("tender.lot")}} {{ index + 1 }}: {{ lot.title }}
      </div>
      <table
        v-if="gd(gd(evRecord, _ => _.awards, []).find(award => award.relatedLots[0] === lot.id),_=>_,{}).hasOwnProperty('relatedBid')"
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
          v-for="award of gd(evRecord, _ => _.awards, []).filter(_award => _award.relatedLots[0] === lot.id).sort((awardA, awardB) => awardA.value.amount - awardB.value.amount)"
          :key="award.id"
        >
          <td :data-th="$t('tender.tenderer')">
            <div class="evaluation-table__supplier-name">{{ gd(award, _ => _.suppliers[0]).name }}</div>
            <div class="evaluation-table__supplier-id">{{ $t("tender.awards_supplier_identifier")}}: {{ gd(award, _ =>
              _.suppliers[0]).id }}
            </div>
          </td>
          <td :data-th="$t('tender.bids_final_amount')">
            <div class="evaluation-table__amount">{{ fa(gd(award, _ => _.value.amount, 0)) }}</div>
            <div class="evaluation-table__currency">{{ gd(award, _ => _.value.currency) }} {{
              $t("tender.value_excluding_VAT")}}
            </div>
          </td>
          <td :data-th="$t('tender.mtender_espd')">
            <button
              v-if="bidForCurrentAward(award.relatedBid).hasOwnProperty('documents') ? bidForCurrentAward(award.relatedBid).documents.length : false"
              type="button"
              @click="$refs[award.id + 'eligibilityDocuments'][0].show = true"
              class="evaluation-table__docs-espd-button"
            >
              {{ $t("tender.mtender_espd")}}
            </button>
            <div class="evaluation-table__docs-espd-text">
              {{ $t("tender.self_declaration") }}
            </div>
            <documents-modal
              :ref="award.id + 'eligibilityDocuments'"
              :documents="bidForCurrentAward(award.relatedBid).hasOwnProperty('documents') ? bidForCurrentAward(award.relatedBid).documents.filter(_doc => _doc.documentType === 'x_eligibilityDocuments') : []"
              :noItemsText="$t('tender.no_documents_submitted')"
            />
          </td>
          <td class="evaluation-table__docs-eos" :data-th="$t('tender.eos_docs')">
            <button
              v-if="bidForCurrentAward(award.relatedBid).hasOwnProperty('documents') ? bidForCurrentAward(award.relatedBid).documents.length : 0"
              type="button"
              @click="$refs[award.id][0].show = true"
              class="evaluation-table__docs-button"
            />
            <div class="evaluation-table__docs-eos-text" v-else> {{$t("tender.no_documents")}}</div>
            <documents-modal
              :ref="award.id"
              :documents="bidForCurrentAward(award.relatedBid).hasOwnProperty('documents') ? bidForCurrentAward(award.relatedBid).documents.filter(_doc => _doc.documentType !== 'x_eligibilityDocuments') : []"
              :noItemsText="$t('tender.no_documents')"
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
            />
            <div class="evaluation-table__status-time"
                 v-if="!(gd(award, _ => _.status) === 'pending' && gd(award, _ => _.statusDetails) === 'empty')">
              {{ fd(gd(award, _ => _.date), "DD.MM.YYYY / HH:mm", "") }}
            </div>
          </td>
        </tr>
      </table>
      <div
        v-else
        style="margin-bottom: 25px"
      >
        {{$t("tender.lot_is_not_awarded")}}
      </div>
    </div>
  </div>
</template>

<script>
  import DocumentsModal from "./../DocumentsModal";
  import AwardInfoModal from "./../AwardInfoModal";

  import {
    getDataFromObject,
    formatDate,
    formatAmount
  } from "./../../../../utils";

  import awardsStatuses from "./../../../../store/types/awards-statuses";

  export default {
    name: "Evaluation",
    components: {
      "documents-modal": DocumentsModal,
      "award-info-modal": AwardInfoModal
    },
    props: {
      evRecord: {
        type: Object,
        required: true
      }
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

        } else if ((status === "pending" && statusDetails === "active") || (status === "active" && statusDetails === "empty")) {
          return awardsStatuses["winner"][this.$i18n.locale];

        } else if ((status === "pending" && statusDetails === "unsuccessful") || (status === "unsuccessful" && statusDetails === "empty")) {
          return awardsStatuses["disqualified"][this.$i18n.locale];

        } else {
          return awardsStatuses["pending"][this.$i18n.locale];
        }
      },
      bidForCurrentAward(bidId) {
        const currentBid = this.gd(this.evRecord, _ => _.bids.details, []).find(bid => bid.id === bidId);
        return  currentBid ? currentBid : {}
      },
    }
  };
</script>
