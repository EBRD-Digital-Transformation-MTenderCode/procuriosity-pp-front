<template>
  <el-collapse-item
      :name="gd(ms, _ => _.ocid)"
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
                {{ gd(ms, _ => _.tender.classification.id)}},
                {{ gd(ms, _ => _.tender.classification.description)}}
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                {{selectProcedure(gd(ms, _ => _.tender.mainProcurementCategory), gd(ms, _ => _.tender.value.amount))}}
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                {{mapProcedureStatus}}
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                {{ fa(gd(ms, _ => _.tender.value.amount)) }} {{ gd(ms, _ => _.tender.value.currency) }}
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
              {{$t("budget.procedure_id")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              <router-link :to="`${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/${getEntityName}/${gd(ms, _ => _.ocid)}`" data-link class="info-block__text_link">
                {{ gd(ms, _ => _.ocid)}}
              </router-link>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.title")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{ gd(ms, _ => _.tender.title)}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text"/>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              {{$t("budget.procuring_entity")}}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">
              {{getOrganizationName(gd(ms, _ => _.parties, []), "procuringEntity")}}
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
              {{getOrganizationName(gd(ms, _ => _.parties, []), "payer")}}
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
    formatAmount,
    getOrganizationName, selectProcedure
  } from "./../../../../utils";

  import procedureStatusType from "./../../../../store/types/procedure-status-types";

  export default {
    name: "ExecutionItem",
    props: {
      procedure: {
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
    computed: {
      ms() {
        return this.gd(this.procedure.MS, _ => _.compiledRelease);
      },
      activeStage() {
        return this.procedure.hasOwnProperty("EV") ? this.gd(this.procedure, _ => _.EV) : this.gd(this.procedure, _ => _.PN);
      },
      mapProcedureStatus() {
        if (this.activeStage.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-PN-[0-9]{13}$/)) {
          return procedureStatusType.plans.find(val => val.value === "planning notice").name[this.$i18n.locale];
        }
        else {
          const status = `${this.activeStage.compiledRelease.tender.status}.${this.activeStage.compiledRelease.tender.statusDetails}`;
          switch (status) {
            case "active.clarification":
              return procedureStatusType.tenders.find(val => val.value === "clarification").name[this.$i18n.locale];
            case "active.tendering":
              return procedureStatusType.tenders.find(val => val.value === "tendering").name[this.$i18n.locale];
            case "active.auction":
              return procedureStatusType.tenders.find(val => val.value === "auction").name[this.$i18n.locale];
            case "unsuccessful.empty":
              return procedureStatusType.tenders.find(val => val.value === "unsuccessful").name[this.$i18n.locale];
            case "active.awarding":
              return procedureStatusType.tenders.find(val => val.value === "awarding").name[this.$i18n.locale];
            case "active.awardedContractPreparation":
              return procedureStatusType.tenders.find(val => val.value === "awarded ").name[this.$i18n.locale];
            case "active.suspended":
              return procedureStatusType.tenders.find(val => val.value === "suspended ").name[this.$i18n.locale];
            case "complete.empty":
              return procedureStatusType.tenders.find(val => val.value === "complete ").name[this.$i18n.locale];
            case "cancelled.empty":
              return procedureStatusType.tenders.find(val => val.value === "cancelled ").name[this.$i18n.locale];
          }
        }
      },
      getEntityName(){
         return this.activeStage.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-PN-[0-9]{13}$/) ? "plans" : "tenders"
      }
    },
    methods: {
      gd(...args) {
        return getDataFromObject(...args);
      },
      fa(amount) {
        return formatAmount(amount);
      },
      getOrganizationName(item, role) {
        return getOrganizationName(item, role);
      },
      selectProcedure(category, amount) {
        return selectProcedure(category, amount);
      },
    }
  };
</script>
