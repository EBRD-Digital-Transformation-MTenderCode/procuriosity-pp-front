<template>
  <el-collapse-item
      :name=" gd(item, _ => _.compiledRelease.ocid) + index"
  >
    <template slot="title">

      <div class="info-blocks accordion-header">
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="2">
              <div class="info-block__text info-block__text_bold">
                {{index+1}}
              </div>
            </el-col>
            <el-col :sm="10">
              <div class="info-block__text info-block__text_bold">
                {{ gd(item, _ => _.compiledRelease.ocid) }}
              </div>
            </el-col>
            <el-col :sm="3">
              <div class="info-block__text info-block__text_bold">
                {{getSourceOfMoney(index)}}
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                {{ fd(gd(item, _ => _.compiledRelease.planning.budget.period.startDate), "DD.MM.YYYY") }}
                -
                {{ fd(gd(item, _ => _.compiledRelease.planning.budget.period.endDate), "DD.MM.YYYY") }}
              </div>
            </el-col>
            <el-col :sm="3">
              <div class="info-block__text info-block__text_bold">
                {{ fa(gd(item, _ => _.compiledRelease.planning.budget.amount.amount)) }} {{ gd(item, _ =>
                _.compiledRelease.planning.budget.amount.currency) }}
              </div>
            </el-col>
            <el-col :sm="2">
              <div class="info-block__text info-block__text_bold">
                {{ gd(item, _ => _.compiledRelease.planning.budget.status)? "Verified" : "Not verified" }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>

    <transition name="fade" mode="out-in" appear>

      <div class="info-blocks">
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              EU Funded
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{ gd(item, _ => _.compiledRelease.planning.budget.isEuropeanUnionFunded)? "Yes": "No"}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15" v-if="gd(item, _ => _.compiledRelease.planning.budget.projectID)">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              Project
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{ gd(item, _ => _.compiledRelease.planning.budget.projectID)}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15" v-if=" gd(item, _ => _.compiledRelease.planning.budget.project)">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              Details
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{ gd(item, _ => _.compiledRelease.planning.budget.project)}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              Payer Entity
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{getOrganizationName(index,"payer")}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              Funding Entity
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{getOrganizationName(index, "funder")}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15" v-if="gd(item, _ => _.compiledRelease.planning.budget.description)">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              Budget Description
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{gd(item, _ => _.compiledRelease.planning.budget.description)}}
            </div>
          </el-col>
        </el-row>
      </div>

    </transition>
  </el-collapse-item>
</template>

<script>
  import {
    getDataFromObject,
    formatDate,
    formatAmount
  } from "./../../../../utils";

  export default {
    name: "SourceItem",
    props: {
      FS: {
        type: Array,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      activeItemId: {
        type: String,
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
      getOrganizationName(index, role) {
        return this.$store.getters.getOrganizationName(index, role);
      },
      getSourceOfMoney(index) {
        return this.$store.getters.getSourceOfMoney(index);
      }
    }
  };
</script>
