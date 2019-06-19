<template>
  <el-collapse-item :name="gd(MS, _ => _.compiledRelease.ocid)">
    <template slot="title">
      <div class="info-block accordion-header">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budget.contracting_process_id") }}</div>
            <div class="info-block__value info-block__value_bold">
              <procedure-id>{{ gd(MS, _ => _.compiledRelease.ocid, "") }}</procedure-id>
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budget.contracting_status") }}</div>
            <div class="info-block__value info-block__value_bold">
              {{ $t(`budget.contracting_state_${gd(MS, _ => _.compiledRelease.tender.status, "")}`) }}
            </div>
          </el-col>
          <el-col v-if="EV" :sm="4">
            <div class="info-block__text">{{ $t("budget.contracting_status_detail") }}</div>
            <div class="info-block__value info-block__value_bold">{{ mapTenderStatus }}</div>
          </el-col>
        </el-row>
      </div>
    </template>

    <div class="info-blocks">
      <div v-if="PN" class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budget.prior_notice") }}</div>
            <div class="info-block__value info-block__value">
              <a
                :href="
                  `${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/plans/${gd(MS, _ => _.compiledRelease.ocid)}`
                "
                target="_blank"
                >{{ gd(PN, _ => _.compiledRelease.ocid, "").toUpperCase() }}</a
              >
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budget.contracting_publication_date") }}</div>
            <div class="info-block__value">{{ fd(procedure.publishedDate, "DD.MM.YYYY") }}</div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budget.contracting_last_update_date") }}</div>
            <div class="info-block__value">{{ fd(gd(PN, _ => _.compiledRelease.date)) }}</div>
          </el-col>
        </el-row>
      </div>

      <div v-if="EV" class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budget.contract_notice") }}</div>
            <div class="info-block__value info-block__value">
              <a
                :href="
                  `${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/tenders/${gd(MS, _ => _.compiledRelease.ocid)}`
                "
                target="_blank"
                >{{ gd(EV, _ => _.compiledRelease.ocid, "").toUpperCase() }}</a
              >
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budget.contracting_publication_date") }}</div>
            <div class="info-block__value">
              {{ fd(gd(EV, _ => _.compiledRelease.tender.enquiryPeriod.startDate), "DD.MM.YYYY") }}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budget.contracting_last_update_date") }}</div>
            <div class="info-block__value">{{ fd(gd(EV, _ => _.compiledRelease.date)) }}</div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budget.procuring_entity") }}</div>
            <div class="info-block__value info-block__value">
              {{ gd(getOrganizationObject(gd(MS, _ => _.compiledRelease.parties), "procuringEntity"), _ => _.name) }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budget.registration_number") }}</div>
            <div class="info-block__value">
              {{
                gd(
                  getOrganizationObject(gd(MS, _ => _.compiledRelease.parties), "procuringEntity"),
                  _ => _.identifier.id
                )
              }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="24">
            <div class="info-block__text">{{ $t("budget.contracting_cpv") }}</div>
            <div class="info-block__value info-block__value">
              {{ gd(MS, _ => _.compiledRelease.tender.classification.id) }} -
              {{ gd(MS, _ => _.compiledRelease.tender.classification.description) }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budget.contracting_method") }}</div>
            <div class="info-block__value info-block__value">
              {{
                selectProcedure(
                  gd(MS, _ => _.compiledRelease.tender.mainProcurementCategory),
                  gd(MS, _ => _.compiledRelease.tender.value.amount, 0)
                )
              }}
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budget.contracting_type") }}</div>
            <div class="info-block__value">{{ getMainProcurementCategory }}</div>
          </el-col>
        </el-row>
      </div>

      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budget.contracting_scope") }}</div>
            <div class="info-block__value info-block__value">{{ gd(MS, _ => _.compiledRelease.tender.title) }}</div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">{{ $t("budget.contracting_amount") }}</div>
            <div class="info-block__value">
              {{ fa(gd(MS, _ => _.compiledRelease.tender.value.amount, 0)) }}
              {{ gd(MS, _ => _.compiledRelease.tender.value.currency) }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div v-if="ACs.length" class="info-blocks">
      <div class="info__sub-title">{{ $t("budget.awarded_contracts") }}</div>
      <div v-for="AC of ACs" :key="gd(AC, _ => _.compiledRelease.ocid)" class="info-block">
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">{{ $t("budget.awarded_contracts_id") }}</div>
            <div class="info-block__value info-block__value">
              {{ gd(AC, _ => _.compiledRelease.ocid, "").toUpperCase() }}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budget.awarded_contracts_amount") }}</div>
            <div class="info-block__value">
              <template v-if="gd(AC, _ => _.compiledRelease.contranst[0].value.amount)">
                {{ fa(gd(AC, _ => _.compiledRelease.contracts[0].value.amount, 0)) }}
                {{ gd(MS, _ => _.compiledRelease.contracts[0].value.currency) }}
              </template>
              <template v-else>
                Pending
              </template>
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">{{ $t("budget.contracting_status") }}</div>
            <div class="info-block__value">
              {{ $t(`budget.awarded_contracts_status_${gd(AC, _ => _.compiledRelease.contracts[0].status, "")}`) }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-collapse-item>
</template>

<script>
import {
  getDataFromObject,
  formatDate,
  formatAmount,
  getOrganizationObject,
  selectProcedure,
  mapTenderStatus,
} from "./../../../../../utils";

import mainProcurementCategory from "./../../../../../store/types/main-procurement-category";

import ProcedureId from "../../../../../components/ProcedureId";

export default {
  name: "ExecutionItem",
  props: {
    procedure: {
      type: Object,
      required: true,
    },
    activeItemId: {
      type: String,
      required: true,
    },
  },
  components: {
    "procedure-id": ProcedureId,
  },
  computed: {
    MS() {
      return this.procedure.MS;
    },
    PN() {
      return this.procedure.PN;
    },
    EV() {
      return this.procedure.EV;
    },
    ACs() {
      return this.procedure.ACs;
    },
    mapTenderStatus() {
      const tender = this.gd(this.EV, _ => _.compiledRelease.tender);
      if (!tender) {
        return "";
      }
      return mapTenderStatus(tender.status, tender.statusDetails);
    },
    getMainProcurementCategory() {
      return mainProcurementCategory[this.gd(this.MS, _ => _.compiledRelease.tender.mainProcurementCategory)][
        this.$i18n.locale
      ];
    },
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(...args) {
      return formatDate(...args);
    },
    fa(amount) {
      return formatAmount(amount);
    },
    getOrganizationObject(parties, role) {
      return getOrganizationObject(parties, role);
    },
    selectProcedure(category, amount) {
      return selectProcedure(category, amount);
    },
  },
};
</script>
