<template>
  <div class="info">
    <div class="info__title">
      {{ $t("tender.procurement_record") }} № <procedure-id>{{ gd(tender, _ => _.tenderID, "###") }}</procedure-id>
    </div>
    <div class="info-blocks">
      <div class="info-block">
        <div>
          <span class="info-block__text">{{ $t("tender.electronic_tendering_procedure_started") }}:</span>
          <span class="info-block__value">{{ fd(gd(tender, _ => _.date), "DD/MM/YYYY, HH:mm") }}</span>
        </div>
        <div>
          <span class="info-block__text">{{ $t("tender.last_updated") }}:</span>{{ " " }}
          <span class="info-block__value">{{ fd(gd(tender, _ => _.dateModified), "DD/MM/YYYY, HH:mm") }}</span>
        </div>
        <br />
        <p class="info-block__value">
          {{ $t("tender.procurement_record_text") }}
        </p>
        <br />
      </div>
      <div class="info-block" />
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
              {{ gd(tender, _ => _.procuringEntity.name, "###") }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">
              {{ $t("tender.procuring_entity_identifier") }}
            </div>
            <div class="info-block__value">
              {{ gd(tender, _ => _.procuringEntity.identifier.id, "###") }}
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
            <div class="info-block__value">{{ gd(tender, _ => _.title, "###") }}</div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__text">
              {{
                tender.value.valueAddedTaxIncluded
                  ? $t("tender.estimated_total_value_including_VAT")
                  : $t("tender.estimated_total_value_excluding_VAT")
              }}
            </div>
            <div class="info-block__value">
              {{ fa(gd(tender, _ => _.value.amount)) }}
              {{ gd(tender, _ => _.value.currency) }}
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
              {{ gd(tender, _ => _.description, "###") }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="info__sub-title">{{ $t("tender.info_about_cn") }}</div>
    <ul class="info-list">
      <li>
        <button type="button" class="info-block__link" @click="selectTab('contract-notice')">
          {{ $t("tender.official_publication_procedure") }}
        </button>
      </li>
    </ul>

    <div class="info__sub-title">{{ $t("tender.clarifications_changes_and_cancellations") }}</div>
    <ul class="info-list">
      <li>
        <button type="button" class="info-block__link" @click="selectTab('clarification')">
          {{ $t("tender.clarifications_changes_and_cancellations_text") }}
        </button>
      </li>
    </ul>

    <div v-if="tender.bids">
      <div class="info__sub-title">{{ $t("tender.record_of_bids") }}</div>
      <ul class="info-list">
        <li>
          <button type="button" class="info-block__link" @click="selectTab('bids')">
            {{ $t("tender.record_of_bids_text") }}
          </button>
        </li>
      </ul>
    </div>

    <div v-if="tender.awards">
      <div class="info__sub-title">{{ $t("tender.information_about_evaluation_and_award") }}</div>
      <ul class="info-list">
        <li>
          <button type="button" class="info-block__link" @click="selectTab('awards')">
            {{ $t("tender.information_about_evaluation_and_award_text") }}
          </button>
        </li>
        <li v-if="tender.contracts">
          <button type="button" class="info-block__link" @click="selectTab('cans')">
            {{ $t("tender.report_on_recommended_awards") }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProcedureId from "../../../../../components/ProcedureId";
import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";

export default {
  name: "ProcurementRecord",
  props: {
    tender: {
      type: Object,
      required: true,
    },
    selectTab: {
      type: Function,
      required: true,
    },
    procedureType: {
      type: String,
      required: true,
    },
  },
  components: {
    "procedure-id": ProcedureId,
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
  },
};
</script>
