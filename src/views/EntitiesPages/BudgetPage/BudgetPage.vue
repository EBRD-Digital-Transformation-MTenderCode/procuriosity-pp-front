<template>
  <div class="entity-wp">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <div v-else-if="loaded && Object.keys(EI).length" key="info">
        <div class="entity-main-info entity-main-info__budget ">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__title">
                  {{ gd(EI, _ => _.tender.title) }}
                </div>
                <div class="entity-main-info__description">
                  {{ gd(EI, _ => _.tender.classification.description) }}
                </div>
                <div class="entity-main-info__timeline"></div>
              </el-col>
              <el-col :xs="22" :sm="6" :offset="2">
                <div class="entity-main-info__value">
                  <div v-if="gd(EI, _ => _.planning.budget, {}).hasOwnProperty('amount')">
                    <div>{{ $t("budget.estimated_value_excluding_VAT") }}</div>
                    <span class="entity-main-info__amount">
                      <span class="whole">{{ wholeAmount }} </span>
                      <span class="fraction"> <span class="dot">.</span>{{ fractionAmount }}</span>
                      <span class="entity-main-info__currency">
                        {{ gd(EI, _ => _.planning.budget.amount.currency) }}
                      </span>
                    </span>
                  </div>
                  <div v-else>
                    {{ $t("budget.no_finances_sources") }}
                  </div>
                </div>
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.buyer_name") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(EI, _ => _.buyer.name) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.region") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{
                        gd(EI, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")).address
                          .addressDetails.region.description
                      }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.number_of_notice") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(EI, _ => _.ocid) }}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </div>
        <div class="entity-tabs entity-tabs_budget">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24">
                <el-tabs v-model="activeTab">
                  <el-tab-pane name="sourceOfFinancing" lazy key="sourceOfFinancing">
                    <span slot="label" v-html="$t('budget.source_of_financing')" />
                    <source-of-financing :FSs="FSs" />
                  </el-tab-pane>
                  <el-tab-pane name="execution" lazy key="execution" :disabled="!getExecutionsId.length">
                    <span slot="label" v-html="$t('budget.execution')" />
                    <execution :getExecutionsId="getExecutionsId" />
                  </el-tab-pane>
                  <el-tab-pane name="spending" lazy key="spending" disabled>
                    <span slot="label" v-html="$t('budget.spending')" />
                    <spending />
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </el-container>
        </div>
      </div>
      <el-container class="error" key="error" v-else>
        <div class="error-message">{{ error.message }}</div>
        <button class="refresh-btn" @click="getBudget">
          {{ $t("refresh") }}
        </button>
        <button class="back-btn" @click="$router.go(-1)">{{ $t("back") }}</button>
      </el-container>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_CURRENT_BUDGET_INFO } from "../../../store/types/actions-types";

import Execution from "./Tabs/Execution";
import Spending from "./Tabs/Spending";
import SourceOfFinancing from "./Tabs/SourceOfFinancing";

import { getDataFromObject } from "../../../utils";

export default {
  name: "BudgetPage",
  components: {
    spending: Spending,
    execution: Execution,
    "source-of-financing": SourceOfFinancing,
  },
  data() {
    return {
      activeTab: "sourceOfFinancing",
    };
  },
  created() {
    this.getBudget();
  },
  computed: {
    ...mapState({
      EI: state => state.entities.budgets.currentEntity.entityData.EI.compiledRelease,
      FSs: state => state.entities.budgets.currentEntity.entityData.FSs,
      loaded: state => state.entities.budgets.loaded,
      error: state => state.entities.budgets.error,
    }),
    wholeAmount() {
      const amountStr = this.gd(this.EI, _ => _.planning.budget.amount.amount, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
    },
    fractionAmount() {
      const amountStr = this.gd(this.EI, _ => _.planning.budget.amount.amount, 0).toString();
      return /\./.test(amountStr)
        ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1
          ? amountStr.slice(amountStr.indexOf(".") + 1) + "0"
          : amountStr.slice(amountStr.indexOf(".") + 1)
        : "00";
    },
    getExecutionsId() {
      return this.gd(this.EI, _ => _.relatedProcesses, [])
        .filter(relatedProcesses => relatedProcesses.relationship.find(value => value === "x_execution"))
        .map(process => process.identifier);
    },
  },
  methods: {
    async getBudget() {
      await this.$store.dispatch(FETCH_CURRENT_BUDGET_INFO, {
        id: this.$route.params.id,
      });
    },
    gd(...args) {
      return getDataFromObject(...args);
    },
  },
};
</script>
