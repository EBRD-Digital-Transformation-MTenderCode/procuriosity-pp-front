<template>
  <div>
    <div class="info__title">Evaluation of winning bid</div>
    <div
        v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
        :key="lot.id"
    >
      <div style="margin-bottom: 15px; font-size: 16px; font-weight: 700;">
        Lot {{ index + 1 }}: {{ lot.title }}
      </div>
      <table class="info-table evaluation-table">
        <tr>
          <th>Supplier</th>
          <th>Final offer</th>
          <!--<th>MTender ESPD</th>-->
          <th>EO docs</th>
          <!--<th>Declaration of no<br/>conflict of interets</th>-->
          <th>Status and<br/>resolution of TC</th>
        </tr>
        <tr
            v-for="award of gd(evRecord, _ => _.awards, []).filter(_award => _award.relatedLots[0] === lot.id)"
            :key="award.id"
        >
          <td>
            <div class="evaluation-table__supplier-name">{{ gd(award, _ => _.suppliers[0]).name }}</div>
            <div class="evaluation-table__supplier-id">IDNO Code: {{ gd(award, _ => _.suppliers[0]).id }}</div>
          </td>
          <td>
            <div class="evaluation-table__amount">{{ fa(gd(award, _ => _.value.amount)) }}</div>
            <div class="evaluation-table__currency">{{ gd(award, _ => _.value.currency) }} exluding VAT</div>
          </td>
          <!--<td>???</td>-->
          <td>
            <button
                v-if="gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents ? gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents.length : 0"
                type="button"
                @click="$refs[award.id][0].open = true"
                class="evaluation-table__docs-button"
            />
            <documents-modal
                :ref="award.id"
                :open="false"
                :documents="gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents ? gd(evRecord, _ => _.bids.details, []).find(bid => bid.id === award.relatedBid).documents : []"
            />
          </td>
          <!--<td>
            Declaration
          </td>-->
          <td>
            <div class="evaluation-table__status">{{ gd(award, _ => _.status) }}</div>
            <div class="evaluation-table__status-time">time</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    import DocumentsModal from "./../DocumentsModal";

    import {
      getDataFromObject,
      formatDate,
      formatAmount
    } from "./../../../../utils";
  
  export default {
    name: "Evaluation",
    components: {
      "documents-modal": DocumentsModal
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
      }
    }
  };
</script>
