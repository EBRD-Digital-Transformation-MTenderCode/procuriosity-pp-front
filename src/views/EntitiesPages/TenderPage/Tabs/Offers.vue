<template>
  <div>
    <div class="info__title">Record of the opening of Electronic bids</div>
    <div class="info__sub-title">Information about Electronic bids (TED: V.2.2.)</div>
    <div class="info-blocks">
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">Number of tenders received:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">{{ gd(evRecord, _ => _.bids.details, []).length }} tenders</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">Number of tenders received after expiry of submission deadline:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">1 tenders</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">Number of tenders received from SMEs:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">1 tenders</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">Number of tenders received from tenderers from residents: </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">{{ gd(evRecord, _ => _.bids.details, []).length }} tenders</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">Number of tenders received from tenderers from non-residents: </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">0 tenders</div>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <div class="info__sub-title">Electronic bids received</div>
    <div
        v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
        :key="lot.id"
    >
      <div style="margin-bottom: 15px; font-size: 16px; font-weight: 700;">
        Lot {{ index + 1 }}: {{ lot.title }}
      </div>
      <table class="info-table offers-table">
        <tr>
          <th>Tenderer</th>
          <th>Submission date</th>
          <th>Initial offer</th>
          <!--<th>Self-declaration</th>-->
          <th>EOs docs</th>
        </tr>
        <tr
          v-for="bid of gd(evRecord, _ => _.bids.details, []).filter(_bid => _bid.relatedLots[0] === lot.id)"
          :key="bid.id"
        >
          <td>
            <div class="offers-table__tenderer-name">{{ gd(bid, _ => _.tenderers[0]).name }}</div>
            <div class="offers-table__tenderer-id">IDNO Code: {{ gd(bid, _ => _.tenderers[0]).id }}</div>
          </td>
          <td>
            <div class="offers-table__date">{{ fd(gd(bid, _ => _.date), "DD/MM/YYYY") }}</div>
            <div class="offers-table__time">{{ fd(gd(bid, _ => _.date), "HH:mm") }}</div>
          </td>
          <td>
            <div class="offers-table__amount">{{ fa(gd(bid, _ => _.value.amount)) }}</div>
            <div class="offers-table__currency">{{ gd(bid, _ => _.value.currency) }} exluding VAT</div>
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
