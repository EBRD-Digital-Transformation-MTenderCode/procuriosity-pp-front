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
          {{$t("message.budget_card_last_modified_date")}} <span class="entity-update__date">{{ modifiedDate }}</span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <div class="entity-title">
            {{ title }}
          </div>
          <div class="entity-description">
            {{ description }}
          </div>
          <!--<div class="entity-links">
            <a :href="`https://achizitii.md/${$i18n.locale}/budgets/${id}`" target="_blank">
              <img src="@/assets/achizitii.md .png" alt="Achizitii logo" >
            </a>
            <a :href="`https://e-licitatie.md/${$i18n.locale}/budget/${id}`" target="_blank">
              <img src="@/assets/e-lici.png" alt="E-lici logo" >
            </a>
          </div>-->
        </el-col>
        <el-col :xs="24" :sm="6">
          <div class="entity-amount"
               v-if="amount">
            <div class="entity-amount__text">{{$t("message.budget_card_value")}}({{ currency }})</div>
            <div class="entity-amount__number">
              <span class="whole" :style="wholeAmount.length > 10 ? 'font-size: 30px': ''">{{ wholeAmount }}<span
                  v-if="fractionAmount">.</span></span>
              <span v-if="fractionAmount" class="fraction">{{ fractionAmount }}</span>
            </div>
          </div>
          <div class="entity-amount__number" v-else>
            {{$t("message.budget_card_no_sources")}}
          </div>
          <div>
            <div class="entity-period-planning">
              <div class="title">{{$t("message.budget_period_planning_from")}}</div>
              <div class="text">{{ periodPlanningFrom}}</div>
            </div>
            <div class="entity-period-planning">
              <div class="title">{{$t("message.budget_period_planning_to")}}</div>
              <div class="text">{{ periodPlanningTo}}</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="entity-pe-name">
            <div class="title">{{$t("message.budget_card_buyer_name")}}</div>
            <div class="text">{{ peName }}</div>
          </div>
          <div class="entity-buyer-id">
            <div class="title">{{$t("message.budget_card_buyer_id")}}</div>
            <div class="text">{{ buyerIdentifier }}</div>
          </div>
          <div class="entity-region">
            <div class="title">{{$t("message.budget_card_buyer_region")}}</div>
            <div class="text">{{ region }}</div>
          </div>
          <div class="entity-classifications">
            <div class="title">{{$t("message.budget_card_classifications")}}</div>
            <div class="text">{{ classifications }}</div>
          </div>
          <div class="entity-budget-id">
            <div class="title">{{$t("message.budget_card_budget_id")}}</div>
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
    name: "BudgetCard",
    props: {
      entity: {
        type: Object,
        required: true
      },
      needLink: {
        type: Boolean,
        default: false
      }
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
        const amountStr = getDataFromObject(this.entity, _ => _.amount, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
      },
      fractionAmount() {
        const amountStr = getDataFromObject(this.entity, _ => _.amount, 0).toString();
        return /\./.test(amountStr) ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1 ? amountStr.slice(amountStr.indexOf(".") + 1) + "0" : amountStr.slice(amountStr.indexOf(".") + 1) : "";
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
        return getDataFromObject(this.entity, _ => _.classifications).join(",");
      },
      periodPlanningFrom() {
        return formatDate(getDataFromObject(this.entity, _ => _.periodPlanningFrom));
      },
      periodPlanningTo() {
        return formatDate(getDataFromObject(this.entity, _ => _.periodPlanningTo));
      },
      id() {
        return getDataFromObject(this.entity, _ => _.id);
      }
    }
  };
</script>
