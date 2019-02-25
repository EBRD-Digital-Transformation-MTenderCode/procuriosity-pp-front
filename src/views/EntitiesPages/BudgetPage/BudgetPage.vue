<template>
  <div class="entity-wp">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <div v-else-if="loaded && Object.keys(budget).length" key="info">
        <div class="entity-main-info entity-main-info__budget ">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__title">
                  {{ gd(budget, _ => _.EI.compiledRelease.tender.title) }}
                </div>
                <div class="entity-main-info__description">
                  {{ gd(budget, _ => _.EI.compiledRelease.tender.classification.description) }}
                </div>
                <div class="entity-main-info__timeline">

                </div>
              </el-col>
              <el-col :xs=22 :sm="6" :offset="2">
                <div class="entity-main-info__value">
                  <div v-if="this.gd(this.budget, _ => _.EI.compiledRelease.planning.budget.amount.amount, 0)">
                    <div> {{ $t("budget.estimated_value_excluding_VAT") }}</div>
                    <span class="entity-main-info__amount">
                    <span class="whole">{{ wholeAmount }} </span>
                    <span class="fraction"> <span class="dot">.</span>{{ fractionAmount }}</span>
                    <span class="entity-main-info__currency">
                      {{ gd(budget, _ => _.EI.compiledRelease.tender.value.currency) }}
                    </span>
                  </span>
                  </div>
                  <div v-else>
                    {{$t("budget.no_finances_sources")}}
                  </div>
                </div>
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.procuring_entity_name") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(budget, _ => _.EI.compiledRelease.buyer.name) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.region") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(budget, _ => _.EI.compiledRelease.parties, []).find(part => part.roles.some(role =>
                      role === "buyer")).address.addressDetails.region.description }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.number_of_notice") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(budget, _ => _.EI.compiledRelease.ocid) }}
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
                <el-tabs
                    v-model="activeTab"
                >
                  <el-tab-pane
                      name="sourceOfFinancing"
                      lazy
                      key="sourceOfFinancing"
                  >
                    <span slot="label" v-html="$t('budget.source_of_financing')" />
                    <sourceOfFinancing
                        :FS="gd(budget, _ => _.FS)"
                    />
                  </el-tab-pane>
                  <el-tab-pane
                      name="execution"
                      lazy
                      key="execution"
                  >
                    <span slot="label" v-html="$t('budget.execution')" />
                    <execution />
                  </el-tab-pane>
                  <el-tab-pane
                      name="spending"
                      lazy
                      key="spending"
                  >
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
        <div class="error-message"> {{error.message}}</div>
        <button
            class="refresh-btn"
            @click="getBudget"
        >
          {{$t("refresh")}}
        </button>
        <button class="back-btn" @click="$router.go(-1)">{{$t("back")}}</button>
      </el-container>
    </transition>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_CURRENT_BUDGET_INFO } from "../../../store/types/actions-types";

  import { getDataFromObject } from "../../../utils";
  import Execution from "./Tabs/Execution";
  import Spending from "./Tabs/Spending";
  import SourceOfFinancing from "./Tabs/SourceOfFinancing";

  export default {
    name: "BudgetPage",
    components: {
      spending: Spending,
      execution: Execution,
      sourceOfFinancing: SourceOfFinancing
    },
    data() {
      return {
        activeTab: "sourceOfFinancing"
      };
    },
    created() {
      this.getBudget();
    },
    computed: {
      ...mapState({
        budget: state => state.entities.budgets.currentEntity.entityData,
        loaded: state => state.entities.budgets.loaded,
        error: state => state.entities.budgets.error
      }),
      wholeAmount() {
        const amountStr = this.gd(this.budget, _ => _.EI.compiledRelease.planning.budget.amount.amount, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
      },
      fractionAmount() {
        const amountStr = this.gd(this.budget, _ => _.EI.compiledRelease.planning.budget.amount.amount, 0).toString();
        return /\./.test(amountStr) ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1 ? amountStr.slice(amountStr.indexOf(".") + 1) + "0" : amountStr.slice(amountStr.indexOf(".") + 1) : "00";
      },
      hasTender() {
        return this.gd(this.budget, _ => _.EI.compiledRelease.relatedProcesses, []).some(process => this.gd(process, _ => _.relationship, []).some(it => it === "x_evaluation"));
      }
    },
    methods: {
      async getBudget() {
        await this.$store.dispatch(FETCH_CURRENT_BUDGET_INFO, {
          id: this.$route.params.id
        });
        console.log(this.budget);
      },
      gd(...args) {
        return getDataFromObject(...args);
      },
    }
  };
</script>
