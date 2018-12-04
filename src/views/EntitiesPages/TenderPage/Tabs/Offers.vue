<template>
  <div>
    <div class="info__title">{{ $t("tender.record_opening_electronic_bids")}}</div>
    <div class="info__sub-title">{{ $t("tender.information_about_electronic_bids")}} </div>
    <div class="info-blocks">
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received")}}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">{{ gd(evRecord, _ => _.bids.details, []).length }} {{$t("tender.tenders")}}</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_after_deadline")}}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">1 {{ $t("tender.tenders")}}</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_from_SMEs")}}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">1 {{ $t("tender.tenders")}}</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_from_residents")}}: </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">{{ gd(evRecord, _ => _.bids.details, []).length }} {{ $t("tender.tenders")}}</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_from_non-residents")}}: </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">0 {{ $t("tender.tenders")}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <div class="info__sub-title">{{ $t("tender.electronic_bids_received")}}</div>
    <div
        v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
        :key="lot.id"
    >
      <div style="margin-bottom: 15px; font-size: 16px; font-weight: 700;">
        {{ $t("tender.lot")}} {{ index + 1 }}: {{ lot.title }}
      </div>
      <table class="info-table offers-table">
        <tr>
          <th>{{ $t("tender.tenderer")}}</th>
          <th>{{ $t("tender.submission_date")}}</th>
          <th>{{ $t("tender.initial_offer")}}</th>
          <!--<th>Self-declaration</th>-->
          <th>{{ $t("tender.eos_docs")}}</th>
        </tr>
        <tr
          v-for="bid of gd(evRecord, _ => _.bids.details, []).filter(_bid => _bid.relatedLots[0] === lot.id)"
          :key="bid.id"
        >
          <td>
            <div class="offers-table__tenderer-name">{{ gd(bid, _ => _.tenderers[0]).name }}</div>
            <div class="offers-table__tenderer-id">{{ $t("tender.idno_code")}}: {{ gd(bid, _ => _.tenderers[0]).id }}</div>
          </td>
          <td>
            <div class="offers-table__date">{{ fd(gd(bid, _ => _.date), "DD/MM/YYYY") }}</div>
            <div class="offers-table__time">{{ fd(gd(bid, _ => _.date), "HH:mm") }}</div>
          </td>
          <td>
            <div class="offers-table__amount">{{ fa(gd(bid, _ => _.value.amount)) }}</div>
            <div class="offers-table__currency">{{ gd(bid, _ => _.value.currency) }} {{ $t("tender.exluding_vat")}}</div>
          </td>
          <!--<td>
            ???
          </td>-->
          <td>
            <button
                v-if="bid.documents.length"
                type="button"
                @click="$refs[bid.id][0].open = true"
                class="offers-table__docs-button"
            />
            <documents-modal
                :ref="bid.id"
                :open="false"
                :documents="bid.documents"
            />
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
    convertCamelCaseToTitleCase,
    addDay,
    formatAmount
  } from "./../../../../utils";

  export default {
    name: "Offers",
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
      fa(amount){
        return formatAmount(amount)
      },
    }
  };
</script>
