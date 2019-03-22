<template>
  <div class="entity-card">
    <el-card>
      <div slot="header">
        <div class="entity-status">
          <div class="entity-status__text">
            {{ parseBudgetStatusText }}
          </div>
        </div>
        <div class="entity-update">
          {{ $t("budget.last_modified_date") }}:
          <span class="entity-update__date">{{ modifiedDate }}</span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <div class="entity-title">
            <router-link
              :to="`${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/budgets/${id}`"
              data-link
              class="entity-title"
            >
              {{ title }}
            </router-link>
          </div>
          <div class="entity-description">
            {{ description }}
          </div>
        </el-col>
        <el-col :xs="24" :sm="6">
          <div class="entity-amount" v-if="amount">
            <div class="entity-amount__text">{{ $t("budget.value") }} ({{ currency ? currency : "MDL" }})</div>
            <div class="entity-amount__number">
              <span class="whole" :style="wholeAmount.length > 10 ? 'font-size: 30px' : ''"
                >{{ wholeAmount }}<span v-if="fractionAmount">.</span></span
              >
              <span v-if="fractionAmount" class="fraction">{{ fractionAmount }}</span>
            </div>
          </div>
          <div class="entity-amount__number" v-else>
            {{ $t("budget.no_finances_sources") }}
          </div>
          <div>
            <div class="entity-period-planning">
              <div class="title">{{ $t("budget.period_planning") }}</div>
              <div class="text">{{ periodPlanningFrom }} - {{ periodPlanningTo }}</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="entity-buyer-name">
            <div class="title">{{ $t("budget.buyer_name") }}:</div>
            <div class="text">{{ peName }}</div>
          </div>
          <div class="entity-buyer-id">
            <div class="title">{{ $t("budget.buyer_id") }}:</div>
            <div class="text">{{ buyerIdentifier }}</div>
          </div>
          <div class="entity-region">
            <div class="title">{{ $t("budget.buyer_region") }}:</div>
            <div class="text">{{ region }}</div>
          </div>
          <div class="entity-classifications">
            <div class="title">{{ $t("budget.procedure_cpv") }}:</div>
            <div class="text">{{ classifications }}</div>
          </div>
          <div class="entity-budget-id">
            <div class="title">{{ $t("budget.id") }}:</div>
            <div class="text">{{ id }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getDataFromObject, formatDate } from "../../utils";

export default {
  name: "BudgetsCard",
  props: {
    entity: {
      type: Object,
      required: true,
    },
    needLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    parseBudgetStatusText() {
      const status = getDataFromObject(this.entity, _ => _.budgetStatus);
      switch (status) {
        case "planning":
          return "Planning";
        default:
          return "";
      }
    },
    modifiedDate() {
      return formatDate(getDataFromObject(this.entity, _ => _.modifiedDate));
    },
    title() {
      return getDataFromObject(this.entity, _ => _.title);
    },
    description() {
      return getDataFromObject(this.entity, _ => _.description);
    },
    currency() {
      return getDataFromObject(this.entity, _ => _.currency);
    },
    amount() {
      return getDataFromObject(this.entity, _ => _.amount);
    },
    wholeAmount() {
      const amountStr = getDataFromObject(this.entity, _ => _.amount, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
    },
    fractionAmount() {
      const amountStr = getDataFromObject(this.entity, _ => _.amount, 0).toString();
      return /\./.test(amountStr)
        ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1
          ? amountStr.slice(amountStr.indexOf(".") + 1) + "0"
          : amountStr.slice(amountStr.indexOf(".") + 1)
        : "";
    },
    region() {
      return getDataFromObject(this.entity, _ => _.buyerRegion);
    },
    buyerIdentifier() {
      return getDataFromObject(this.entity, _ => _.buyerIdentifier);
    },
    peName() {
      return getDataFromObject(this.entity, _ => _.buyerName);
    },
    classifications() {
      return getDataFromObject(this.entity, _ => _.classifications, []).join(",");
    },
    periodPlanningFrom() {
      return formatDate(getDataFromObject(this.entity, _ => _.periodPlanningFrom));
    },
    periodPlanningTo() {
      return formatDate(getDataFromObject(this.entity, _ => _.periodPlanningTo));
    },
    id() {
      return getDataFromObject(this.entity, _ => _.id);
    },
  },
};
</script>
