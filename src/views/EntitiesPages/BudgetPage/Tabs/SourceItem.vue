<template>
  <el-collapse-item
      :name=" gd(fs, _ => _.compiledRelease.ocid)"
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
                {{ gd(fs, _ => _.compiledRelease.ocid) }}
              </div>
            </el-col>
            <el-col :sm="3">
              <div class="info-block__text info-block__text_bold">
                {{getSourceOfMoney(index)}}
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                {{ fd(gd(fs, _ => _.compiledRelease.planning.budget.period.startDate), "DD.MM.YYYY") }}
                -
                {{ fd(gd(fs, _ => _.compiledRelease.planning.budget.period.endDate), "DD.MM.YYYY") }}
              </div>
            </el-col>
            <el-col :sm="3">
              <div class="info-block__text info-block__text_bold">
                {{ fa(gd(fs, _ => _.compiledRelease.planning.budget.amount.amount)) }} {{ gd(fs, _ =>
                _.compiledRelease.planning.budget.amount.currency) }}
              </div>
            </el-col>
            <el-col :sm="2">
              <div class="info-block__text info-block__text_bold">
                <!--@TODO add translates -->
                {{ gd(fs, _ => _.compiledRelease.planning.budget.status)? "Verified" : "Not verified" }}
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
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.eu_funder")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              <!--@TODO add translates -->
              {{ gd(fs, _ => _.compiledRelease.planning.budget.isEuropeanUnionFunded)? "Yes": "No"}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15" v-if="gd(fs, _ => _.compiledRelease.planning.budget.projectID)">
          <el-col :sm="2">
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.project")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{ gd(fs, _ => _.compiledRelease.planning.budget.projectID)}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15" v-if=" gd(fs, _ => _.compiledRelease.planning.budget.project)">
          <el-col :sm="2">
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.details")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{ gd(fs, _ => _.compiledRelease.planning.budget.project)}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.payer_entity")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{getOrganizationName(gd(fs,_=>_.compiledRelease.parties,[]),"payer")}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.funding_entity")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{getOrganizationName(gd(fs,_=>_.compiledRelease.parties,[]), "funder")}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15" v-if="gd(fs, _ => _.compiledRelease.planning.budget.description)">
          <el-col :sm="2">
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.budget_description")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{gd(fs, _ => _.compiledRelease.planning.budget.description)}}
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
    formatAmount,
    getOrganizationName
  } from "./../../../../utils";

  export default {
    name: "SourceItem",
    props: {
      fs: {
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
      getOrganizationName(item, role) {
        return getOrganizationName(item, role);
      },
      getSourceOfMoney(index) {
        return this.$store.getters.getSourceOfMoney(index);
      }
    }
  };
</script>
