<template>
  <el-collapse-item :name="budgetBreakdown.ocid">
    <template slot="title">
      <div class="info-block accordion-header">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.funding_source_id") }}</div>
            <div class="info-block__value info-block__value_bold ">
              {{ budgetBreakdown.ocid.toUpperCase() }}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budgetBreakdown.amount") }}</div>
            <div class="info-block__value info-block__value_bold">
              {{ fa(budgetBreakdown.value.amount) }}
              {{ budgetBreakdown.value.currency }}
            </div>
          </el-col>
          <el-col :sm="4" v-if="budgetBreakdown.status !== null">
            <div class="info-block__text">{{ $t("budgetBreakdown.status") }}</div>
            <div class="info-block__value info-block__value_bold">
              {{ budgetBreakdown.status ? $t("budgetBreakdown.verified") : $t("budgetBreakdown.not_verified") }}
            </div>
          </el-col>
        </el-row>
      </div>
    </template>

    <div class="info-blocks">
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.budget_details_rationale") }}</div>
            <div class="info-block__value">{{ budgetBreakdown.description }}</div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budgetBreakdown.validity_period") }}</div>
            <div class="info-block__value">
              {{ fd(budgetBreakdown.period.startDate, "DD.MM.YYYY") }}
              -
              {{ fd(budgetBreakdown.period.endDate, "DD.MM.YYYY") }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.source_of_money") }}</div>
            <div class="info-block__value">{{ budgetBreakdown.sourceOfMoney }}</div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budgetBreakdown.budget_ID") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.budgetLineId }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="info-block" v-if="budgetBreakdown.EIocid">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.expenditure_item_name") }}</div>
            <div class="info-block__value">{{ budgetBreakdown.EIname }}</div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budgetBreakdown.expenditure_item_id") }}</div>
            <div class="info-block__value">
              <div class="info-block__value">
                <a
                  :href="`${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/budgets/${budgetBreakdown.EIocid}`"
                  target="_blank"
                  data-link
                  class="info-block__text_link"
                >
                  {{ budgetBreakdown.EIocid }}
                </a>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.budget_project") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.project }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budgetBreakdown.project_ID") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.projectId }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.budget_owner") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.buyer.name }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budgetBreakdown.procuring_entity_identifier") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.buyer.id }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.payer_entity") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.payer.name }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budgetBreakdown.procuring_entity_identifier") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.payer.id }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block" v-if="budgetBreakdown.funder.id">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budgetBreakdown.funding_entity") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.funder.name }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budgetBreakdown.procuring_entity_identifier") }}</div>
            <div class="info-block__value">
              {{ budgetBreakdown.funder.id }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-collapse-item>
</template>

<script>
import { formatDate, formatAmount } from "../utils";

export default {
  name: "SourceItem",
  props: {
    budgetBreakdown: {
      type: Object,
      required: true,
    },
  },
  methods: {
    fd(...ars) {
      return formatDate(...ars);
    },
    fa(amount) {
      return formatAmount(amount);
    },
  },
};
</script>
