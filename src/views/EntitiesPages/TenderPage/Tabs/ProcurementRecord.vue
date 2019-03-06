<template>
  <div class="info">
    <div class="info__title">{{ $t("tender.procurement_record") }} № {{ gd(msRecord, _ => _.ocid) }}</div>
    <div class="info-blocks">
      <div class="info-block">
        <div>
          <span class="info-block__text">{{ $t("tender.electronic_tendering_procedure_started") }}:</span>{{ " " }}
          <span class="info-block__value">{{ fd(gd(evRecord, _ => _.tender.enquiryPeriod.startDate), "DD/MM/YYYY, HH:mm") }}</span>
        </div>
        <div>
          <span class="info-block__text">{{ $t("tender.last_updated") }}:</span>{{ " " }}
          <span class="info-block__value">{{ fd(gd(msRecord, _ => _.date), "DD/MM/YYYY, HH:mm") }}</span>
        </div>
        <br />
        <p class="info-block__value">
          {{ $t("tender.procurement_record_text") }}
        </p>
        <br>
      </div>
      <div class="info-block" />
    </div>

    <div class="info__sub-title">{{ $t("tender.procurement_plan_buyers_profile_PIN") }}</div>
    <div class="info-block__text">{{ $t("tender.previous_publication_concerning_procedure") }}</div>
    <div class="info-block__value">
      {{ $t("tender.PP_Buyer_profile_PIN") }} №
      <a
        :href="`/${$i18n.locale !== 'ro' ? $i18n.locale + '/' : ''}plans/${gd(msRecord, _ => _.ocid)}`"
      >
        {{ gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === "planning")), _ => _.identifier) }}
      </a>
    </div>

    <div class="info__sub-title">{{ $t("tender.contracting_authority") }}</div>
    <div class="info-blocks">
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">
              {{ $t("tender.procuring_entity_full_name") }}
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
              _.name) }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">
              {{ $t("tender.procuring_entity_identifier") }}
            </div>
            <div class="info-block__value">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
              _.identifier.scheme) }}:
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
              _.identifier.id) }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="info__sub-title">{{ $t("tender.general_info_about_electronic_procedure") }}</div>
    <div class="info-blocks">
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="24">
            <div class="info-block__text">{{ $t("tender.title") }}</div>
            <div class="info-block__value">{{ gd(msRecord, _ => _.tender.title) }}</div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.main_CPV") }}</div>
            <div class="info-block__value">
              {{ gd(msRecord, _ => _.tender.classification.id) }} -
              {{ gd(msRecord, _ => _.tender.classification.description) }}
            </div>
          </el-col>
          <!--<el-col :sm="6">
            <div class="info-block__text">Supplementary CPV code</div>
            <div class="info-block__value">???n/a</div>
          </el-col>-->
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.type_of_contract") }}</div>
            <div class="info-block__value info-block__value_name">
              {{ getMainProcurementCategory }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.estimated_total_value_excluding_VAT") }}</div>
            <div class="info-block__value">
              {{ fa(gd(msRecord, _ => _.tender.value.amount)) }}{{ " " }}
              {{ gd(msRecord, _ => _.tender.value.currency) }}
            </div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.type_of_procedure") }}</div>
            <div class="info-block__value">
              {{ procedureType }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="24">
            <div class="info-block__text">{{ $t("tender.short_description") }}</div>
            <div class="info-block__value">
              {{ gd(msRecord, _ => _.tender.description) }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="info__sub-title">{{ $t("tender.budget") }}</div>
    <el-collapse
      accordion
      @change="getFSRecord"
    >
      <budget-breakdown
          v-for="(budgetBreakdown, index) of breakdowns"
          :key="budgetBreakdown.ocid"
          :budgetBreakdown="budgetBreakdown"
          :index="index"
      />
    </el-collapse>

    <div class="info__sub-title">{{ $t("tender.info_about_cn") }}</div>
    <ul class="info-list">
      <li>
        <button
          type="button"
          class="info-block__link"
          @click="selectTab('cn')"
        >
          {{ $t("tender.official_publication_procedure") }}
        </button>
      </li>
    </ul>

    <div class="info__sub-title">{{ $t("tender.clarifications_changes_and_cancellations") }}</div>
    <ul class="info-list">
      <li>
        <button
          type="button"
          class="info-block__link"
          @click="selectTab('clarification')"
        >
          {{ $t("tender.clarifications_changes_and_cancellations_text") }}
        </button>
      </li>
    </ul>

    <div v-if="hasBids">
      <div class="info__sub-title">{{ $t("tender.record_of_bids") }}</div>
      <ul class="info-list">
        <li>
          <button
            type="button"
            class="info-block__link"
            @click="selectTab('offers')"
          >
            {{ $t("tender.record_of_bids_text") }}
          </button>
        </li>
      </ul>
    </div>

    <div v-if="hasAwards">
      <div class="info__sub-title">{{ $t("tender.information_about_evaluation_and_award") }}</div>
      <ul class="info-list">
        <!--<li>Record of Electronic auction</li>-->
        <li>
          <button
            type="button"
            class="info-block__link"
            @click="selectTab('ev')"
          >
            {{ $t("tender.information_about_evaluation_and_award_text") }}
          </button>
        </li>
        <li v-if="hasCANs">
          <button
            type="button"
            class="info-block__link"
            @click="selectTab('cans')"
          >
            {{ $t("tender.report_on_recommended_awards") }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BudgetBreakdown from "../../../../components/BudgetBreakdown"
  import mainProcurementCategory from "./../../../../store/types/main-procurement-category";
  import { getDataFromObject, formatDate, formatAmount } from "./../../../../utils";

  export default {
    name: "ProcurementRecord",
    props: {
      msRecord: {
        type: Object,
        required: true
      },
      evRecord: {
        type: Object,
        required: true
      },
      procedureType: {
        type: String,
        required: true
      },
      selectTab: {
        type: Function,
        required: true
      },
      hasBids: {
        type: Boolean,
        required: true
      },
      hasAwards: {
        type: Boolean,
        required: true
      },
      hasCANs: {
        type: Boolean,
        required: true
      },
      getFS: {
        type: Function,
        required: true
      },
      breakdowns: {
        type: Array,
        required: true
      },
    },
    components: {
      "budget-breakdown": BudgetBreakdown
    },
    computed: {
      getMainProcurementCategory() {
        return mainProcurementCategory[this.gd(this.msRecord, _ => _.tender.mainProcurementCategory)][this.$i18n.locale];
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
      getFSRecord(ocid){
        this.getFS(ocid)
      }
    }
  };
</script>
