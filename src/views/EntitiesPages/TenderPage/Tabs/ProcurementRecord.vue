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
      {{ $t("tender.PP_Buyer_profile_PIN") }}
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
      @change="getFS"
    >
      <el-collapse-item
        v-for="(budgetBreakdown, index) of gd(msRecord, _ => _.planning.budget.budgetBreakdown, [])"
        :key="budgetBreakdown.id + index"
        :name="budgetBreakdown.id"
      >
        <template slot="title">
          <div class="info-block accordion-header">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.budgetline_id") }}</div>
                <div class="info-block__value">
                  {{ gd(budgetBreakdown, _ => _.id) }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.amount") }}</div>
                <div class="info-block__value">
                  {{ fa(gd(budgetBreakdown, _ => _.amount.amount)) }}
                  {{ gd(budgetBreakdown, _ => _.amount.currency) }}
                </div>
              </el-col>
              <!--<el-col :sm="4">
                <div class="info-block__text">Status</div>
                <div class="info-block__value">
                  ???Verified
                </div>
              </el-col>-->
            </el-row>
          </div>
        </template>

        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.budget_details_rationale") }}</div>
                <div class="info-block__value">{{ gd(budgetBreakdown, _ => _.description, "n/a") }}</div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.validity_period") }}</div>
                <div class="info-block__value">
                  {{ $t("tender.start_date") }}: {{ fd(gd(budgetBreakdown, _ => _.period.startDate), "DD.MM.YYYY") }} -
                  {{ $t("tender.end_date") }}: {{ fd(gd(budgetBreakdown, _ => _.period.endDate), "DD.MM.YYYY") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.budget_project") }}</div>
                <div class="info-block__value">
                  {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].project, "n/a") }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.project_ID") }}</div>
                <div class="info-block__value">
                  {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].projectId, "n/a") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.budget_owner") }}</div>
                <div class="info-block__value">
                  {{ gd(gd(msRecord, _ => _.parties, []).find(part => gd(part, _ => _.roles, []).some(role => role === "buyer")), _ => _.name) }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.procuring_entity_identifier") }}</div>
                <div class="info-block__value">
                  {{ gd(gd(msRecord, _ => _.parties, []).find(part => gd(part, _ => _.roles, []).some(role => role === "buyer")), _ => _.id) }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.payer_entity") }}</div>
                <div class="info-block__value">
                  {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].payer.name, "n/a") }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.procuring_entity_identifier") }}</div>
                <div class="info-block__value">
                  {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].payer.id, "n/a") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.funding_entity") }}</div>
                <div class="info-block__value">
                  {{ FSs.hasOwnProperty(gd(budgetBreakdown, _ => _.id)) ? gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].funder.name, $t("tender.state_money")): "n/a" }}
                </div>
              </el-col>
              <el-col :sm="8" v-if="gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].funder.id)">
                <div class="info-block__text">{{ $t("tender.procuring_entity_identifier") }}</div>
                <div class="info-block__value">
                  {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].funder.id) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-item>
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
  import axios from "axios";

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
      }
    },
    data() {
      return {
        FSs: {}
      };
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
      async getFS(ocidFS) {
        if (!ocidFS || this.FSs.hasOwnProperty(ocidFS)) {
          return false;
        }

        const cpidEI = ocidFS.replace(/-FS-[0-9]{13}$/, "");

        try {
          const responseFS = await axios({
            method: "get",
            url: `https://public.mtender.gov.md/budgets/${cpidEI}/${ocidFS}`
          });

          const FS = responseFS.data.releases[0];

          const payer = FS.parties.find(part => part.roles.some(role => role === "payer"));
          const funder = FS.parties.find(part => part.roles.some(role => role === "funder"));

          this.FSs = Object.assign({}, this.FSs, {
            [FS.ocid]: {
              project: FS.planning.project,
              projectId: FS.planning.projectId,
              payer: {
                name: payer.name,
                id: payer.id
              },
              funder: {
                name: funder ? funder.name : null,
                id: funder ? funder.id : null
              }
            }
          });

        } catch (e) {
          console.log(e);
        }
      }
    }
  };
</script>
