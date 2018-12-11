<template>
  <div>
    <div class="info__title">{{ $t("tender.evaluation_of_winning_bid")}}</div>
    <div
        v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
        :key="lot.id"
    >
      <div style="font-size: 16px; font-weight: 700;">
        {{ $t("tender.lot")}} {{ index + 1 }}: {{ lot.title }}
      </div>
      <table
          v-if="gd(evRecord, _ => _.awards, []).find(award => award.relatedLots[0] === lot.id).hasOwnProperty('relatedBid')"
          class="info-table evaluation-table"
      >
        <tr>
          <th>{{ $t("tender.tenderer")}}</th>
          <th>{{ $t("tender.bids_final_amount")}}</th>
          <th> {{ $t("tender.mtender_espd")}}</th>
          <th>{{ $t("tender.eos_docs")}}</th>
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
            <div class="evaluation-table__amount">{{ fa(gd(award, _ => _.value.amount, 0)) }}&#8194;</div>
            <div class="evaluation-table__currency">{{ gd(award, _ => _.value.currency) }} {{
              $t("tender.excluding_vat")}}
            </div>
          </td>
          <td :data-th="$t('tender.mtender_espd')">
            <button
                v-if="gd(gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid), _ => _.documents) ? gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents.length : false"
                type="button"
                @click="$refs[award.id + 'eligibilityDocuments'][0].open = true"
                class="evaluation-table__docs-espd-button"
            >
              {{ $t("tender.mtender_espd")}}
            </button>
            <div class="evaluation-table__docs-espd-text">&#8194;{{ $t("tender.self_declaration")}}</div>
            <documents-modal
                :ref="award.id + 'eligibilityDocuments'"
                :open="false"
                :documents="gd(gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid), _ => _.documents) ? gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents.filter(_doc => _doc.documentType === 'x_eligibilityDocuments') : []"
                noItemsText="No documents submitted"
            />
          </td>
          <td :data-th="$t('tender.eos_docs')">
            <button
                v-if="gd(gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid), _ => _.documents) ? gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents.length : 0"
                type="button"
                @click="$refs[award.id][0].open = true"
                class="evaluation-table__docs-button"
            />
            <documents-modal
                :ref="award.id"
                :open="false"
                :documents="gd(gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid), _ => _.documents) ? gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents.filter(_doc => _doc.documentType !== 'x_eligibilityDocuments') : []"
            />
          </td>
          <!--<td>
            Declaration
          </td>-->
          <td :data-th="$t('tender.status_and_resolution_tc_withoutBreak')">
            <button
              type="button"
              @click="$refs[award.id + 'info'][0].open = true"
              class="evaluation-table__status"
            >
              {{ parseStatus(gd(award, _ => _.status), gd(award, _ => _.statusDetails)) }}
            </button>
            <award-info-modal
              :ref="award.id + 'info'"
              :open="false"
              :award="award"
            />
            <div class="evaluation-table__status-time">
              &#8194;{{ fd(gd(award, _ => _.date)) }}
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
          return "Pending";
        } else if (status === "pending" && statusDetails === "consideration") {
          return "Consideration";
        } else if ((status === "pending" && statusDetails === "active") || (status === "active" && statusDetails === "empty")) {
          return "Winner";
        } else if ((status === "pending" && statusDetails === "unsuccessful") || (status === "unsuccessful" && statusDetails === "empty")) {
          return "Disqualified";
        } else {
          return "Pending";
        }
      }
    }
  };
</script>
