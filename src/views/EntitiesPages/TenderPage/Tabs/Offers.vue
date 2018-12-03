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
            <div class="info-block__value info-block__value_bold">3 tenders</div>
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
            <div class="info-block__value info-block__value_bold">2 tenders</div>
          </el-col>
        </el-row>
        
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">Number of tenders received from tenderers from non-residents: </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">1 tenders</div>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <div class="info__sub-title">Electronic bids received</div>
    <div
        v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
        :key="lot.id"
    >
      <div style="margin-bottom: 10px; font-size: 16px; font-weight: 700;">
        Lot {{ index + 1 }}: {{ lot.title }}
      </div>
      <table></table>
    </div>
  </div>
</template>

<script>
  import {
    getDataFromObject,
    formatDate,
    convertCamelCaseToTitleCase,
    addDay,
    formatAmount
  } from "./../../../../utils";

  export default {
    name: "Offers",
    props: {
      evRecord: {
        type: Object,
        required: true
      }
    },
    methods: {
      gd(...args) {
        return getDataFromObject(...args);
      }
    }
  };
</script>
