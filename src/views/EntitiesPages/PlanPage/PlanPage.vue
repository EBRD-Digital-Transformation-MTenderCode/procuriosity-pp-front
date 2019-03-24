<template>
  <div class="entity-wp">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <div v-else-if="loaded && Object.keys(plan).length" key="info">
        <div class="entity-main-info entity-main-info__plan ">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__title">
                  {{ gd(plan, _ => _.MSRecord.compiledRelease.tender.title) }}
                </div>
                <div class="entity-main-info__description">
                  {{ gd(plan, _ => _.MSRecord.compiledRelease.tender.description) }}
                </div>
                <div class="entity-main-info__timeline"></div>
              </el-col>
              <el-col :xs="22" :sm="6" :offset="2">
                <div class="entity-main-info__value">
                  <div>{{ $t("plan.estimated_value_excluding_VAT") }}</div>
                  <span class="entity-main-info__amount">
                    <span class="whole">{{ wholeAmount }} </span>
                    <span class="fraction"> <span class="dot">.</span>{{ fractionAmount }}</span>
                    <span class="entity-main-info__currency">
                      {{ gd(plan, _ => _.MSRecord.compiledRelease.tender.value.currency) }}
                    </span>
                  </span>
                </div>
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("plan.procedure_type") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{
                        selectProcedure(
                          gd(plan, _ => _.MSRecord.compiledRelease.tender.mainProcurementCategory),
                          gd(plan, _ => _.MSRecord.compiledRelease.tender.value.amount)
                        )
                      }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("plan.buyer_name") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(plan, _ => _.MSRecord.compiledRelease.tender.procuringEntity.name) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("plan.region") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{
                        gd(plan, _ => _.MSRecord.compiledRelease.parties, []).find(part =>
                          part.roles.some(role => role === "procuringEntity")
                        ).address.addressDetails.region.description
                      }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("plan.number_of_notice") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(plan, _ => _.MSRecord.compiledRelease.ocid) }}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </div>
        <div class="entity-tabs">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24">
                <el-tabs v-model="activeTab" :before-leave="checkTab">
                  <el-tab-pane :label="$t('tender.procurement_plan')" name="pn" lazy>
                    <span slot="label" v-html="$t('tender.procurement_plan')" />
                  </el-tab-pane>
                  <el-tab-pane :disabled="!hasTender" name="cn" lazy>
                    <a
                      :href="`${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/tenders/${plan.MSRecord.ocid}`"
                      slot="label"
                      v-html="$t('tender.contract_notice')"
                    />
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
            <contract-notice
              :msRecord="gd(plan, _ => _.MSRecord.compiledRelease)"
              :pnRecord="gd(plan, _ => _.PNRecord.compiledRelease)"
              :procedureType="
                selectProcedure(
                  gd(plan, _ => _.MSRecord.compiledRelease.tender.mainProcurementCategory),
                  gd(plan, _ => _.MSRecord.compiledRelease.tender.value.amount)
                )
              "
              :hasTender="hasTender"
            />
          </el-container>
        </div>
      </div>
      <el-container class="error" key="error" v-else>
        <div class="error-message">{{ error.message }}</div>
        <button class="refresh-btn" @click="getPlan">
          {{ $t("refresh") }}
        </button>
        <button class="back-btn" @click="$router.go(-1)">{{ $t("back") }}</button>
      </el-container>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_CURRENT_PLAN_INFO } from "../../../store/types/actions-types";

import ContractNotice from "./Tabs/ContractNotice";

import { getDataFromObject, selectProcedure } from "../../../utils";

export default {
  name: "PlanPage",
  components: {
    "contract-notice": ContractNotice,
  },
  data() {
    return {
      activeTab: "pn",
    };
  },
  created() {
    this.getPlan();
  },
  computed: {
    ...mapState({
      plan: state => state.entities.plans.currentEntity.entityData,
      loaded: state => state.entities.plans.loaded,
      error: state => state.entities.plans.error,
    }),
    wholeAmount() {
      const amountStr = this.gd(this.plan, _ => _.MSRecord.compiledRelease.tender.value.amount, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
    },
    fractionAmount() {
      const amountStr = this.gd(this.plan, _ => _.MSRecord.compiledRelease.tender.value.amount, 0).toString();
      return /\./.test(amountStr)
        ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1
          ? amountStr.slice(amountStr.indexOf(".") + 1) + "0"
          : amountStr.slice(amountStr.indexOf(".") + 1)
        : "00";
    },
    hasTender() {
      return this.gd(this.plan, _ => _.MSRecord.compiledRelease.relatedProcesses, []).some(process =>
        this.gd(process, _ => _.relationship, []).some(it => it === "x_evaluation")
      );
    },
  },
  methods: {
    async getPlan() {
      await this.$store.dispatch(FETCH_CURRENT_PLAN_INFO, {
        id: this.$route.params.id,
      });

      console.log(this.plan);
    },
    gd(...args) {
      return getDataFromObject(...args);
    },
    selectProcedure(category, amount) {
      return selectProcedure(category, amount);
    },
    checkTab(tab) {
      if (tab === "cn") {
        return false;
      }
    },
  },
};
</script>
