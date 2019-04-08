<template>
  <div class="entity-wp">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <div v-else-if="loaded && EI" key="info">
        <div class="entity-main-info entity-main-info__budget ">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__subtitle">
                  <procedure-id>{{ gd(EI, _ => _.ocid).toUpperCase() }}</procedure-id> {{ $t("budget.from") }}
                  {{ fd(gd(EI, _ => _.date), "DD.MM.YYYY, HH:mm") }}
                </div>
              </el-col>
              <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 6, offset: 2 }">
                <div class="entity-main-info__value entity-main-info__value_budget">
                  <div v-if="gd(EI, _ => _.planning.budget, {}).hasOwnProperty('amount')">
                    <div>{{ $t("budget.estimated_value_excluding_VAT") }}</div>
                    <span class="entity-main-info__amount">
                      <span class="whole" :style="wholeAmount.length > 8 ? 'font-size: 26px' : ''"
                        >{{ wholeAmount }}
                      </span>
                      <span class="fraction-currency_wp">
                        <span class="fraction" :style="wholeAmount.length > 8 ? 'font-size: 14px' : ''">
                          <span class="dot">.</span>{{ fractionAmount }}</span
                        >
                        <span
                          class="entity-main-info__currency"
                          :style="wholeAmount.length > 8 ? 'font-size: 10px' : ''"
                        >
                          {{ gd(EI, _ => _.planning.budget.amount.currency) }}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div style="height: 72px" v-else>
                    {{ $t("budget.no_finances_sources") }}
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__title entity-main-info__title_budget">
                  {{ gd(EI, _ => _.tender.title) }}
                </div>
              </el-col>
              <el-col :sm="24">
                <div class="entity-main-info__description">
                  {{ gd(EI, _ => _.tender.classification.description) }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.buyer_name") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(EI, _ => _.buyer.name) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.buyer_id") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(getOrganizationObject(gd(EI, _ => _.parties, []), "buyer"), _ => _.identifier.id) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.region") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{
                        gd(
                          getOrganizationObject(gd(EI, _ => _.parties, []), "buyer"),
                          _ => _.address.addressDetails.region.description
                        )
                      }}
                    </div>
                  </div>
                </div>
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.type_of_buyer") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ getTypeOfBuyer }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.main_activity") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ getMainGeneralActivity }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.sectoral_activity") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ getMainSectoralActivity }}
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 6, offset: 2 }">
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.period_of_need") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ fd(gd(EI, _ => _.planning.budget.period.startDate), "DD.MM.YYYY") }} -
                      {{ fd(gd(EI, _ => _.planning.budget.period.endDate), "DD.MM.YYYY") }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.main_cpv") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(EI, _ => _.tender.classification.id) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("budget.main_procurement_category") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ getMainProcurementCategory }}
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
                    <source-of-financing
                      :FSs="FSs"
                      :buyer="getOrganizationObject(gd(EI, _ => _.parties, []), 'buyer')"
                    />
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
        <error :message="error.message"></error>
      </el-container>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_CURRENT_BUDGET_INFO } from "../../../store/types/actions-types";
import mainProcurementCategory from "./../../../store/types/main-procurement-category";
import typesOfBuyers from "./../../../store/types/buyers-types";
import mainGeneralActivites from "./../../../store/types/main-general-activity-types";
import mainSectoralActivites from "./../../../store/types/main-sectoral-activity";

import Execution from "./Tabs/Execution";
import Spending from "./Tabs/Spending";
import SourceOfFinancing from "./Tabs/SourceOfFinancing";
import ProcedureId from "../../../components/ProcedureId";
import Error from "./../../Error";

import { getDataFromObject, formatDate, getOrganizationObject } from "../../../utils";

export default {
  name: "BudgetPage",
  components: {
    spending: Spending,
    execution: Execution,
    "source-of-financing": SourceOfFinancing,
    "procedure-id": ProcedureId,
    error: Error,
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
    getTypeOfBuyer() {
      if (
        !this.gd(
          this.gd(this.EI, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
          _ => _.details.typeOfBuyer
        )
      ) {
        return this.$t("n/a");
      }

      return typesOfBuyers.find(
        type =>
          type.value ===
          this.gd(
            this.gd(this.EI, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
            _ => _.details.typeOfBuyer
          )
      ).name[this.$i18n.locale];
    },
    getMainGeneralActivity() {
      if (
        !this.gd(
          this.gd(this.EI, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
          _ => _.details.mainGeneralActivity
        )
      ) {
        return this.$t("n/a");
      }

      return mainGeneralActivites.find(
        activity =>
          activity.value ===
          this.gd(
            this.gd(this.EI, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
            _ => _.details.mainGeneralActivity
          )
      ).name[this.$i18n.locale];
    },
    getMainSectoralActivity() {
      if (
        !this.gd(
          this.gd(this.EI, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
          _ => _.details.mainSectoralActivity
        )
      ) {
        return this.$t("n/a");
      }

      return mainSectoralActivites.find(
        activity =>
          activity.value ===
          this.gd(
            this.gd(this.EI, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
            _ => _.details.mainSectoralActivity
          )
      ).name[this.$i18n.locale];
    },
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
    getMainProcurementCategory() {
      return mainProcurementCategory[this.gd(this.EI, _ => _.tender.mainProcurementCategory)][this.$i18n.locale];
    },
  },
  methods: {
    async getBudget() {
      await this.$store.dispatch(FETCH_CURRENT_BUDGET_INFO, {
        id: this.$route.params.id,
      });
    },
    getOrganizationObject(parties, role) {
      return getOrganizationObject(parties, role);
    },
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(date, type) {
      return formatDate(date, type);
    },
  },
};
</script>
