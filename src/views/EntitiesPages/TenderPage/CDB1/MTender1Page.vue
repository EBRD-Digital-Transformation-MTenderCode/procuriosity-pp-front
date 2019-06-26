<template>
  <div class="entity-wp entity__tender">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <div v-else-if="loaded && Object.keys(tender).length" key="info">
        <div class="entity-main-info">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__title">
                  {{ gd(tender, _ => _.title, "###") }}
                </div>
                <div class="entity-main-info__description">
                  {{ gd(tender, _ => _.description, "###") }}
                </div>
                <div class="entity-main-info__timeline"></div>
              </el-col>
              <el-col :sm="6" :offset="2" :xs="{ span: 22, offset: 0 }">
                <div class="entity-main-info__value">
                  <div>{{ $t("tender.estimated_value_excluding_VAT") }}</div>
                  <span class="entity-main-info__amount">
                    <span class="whole" :style="wholeAmount.length > 8 ? 'font-size: 26px' : ''"
                      >{{ wholeAmount }}
                    </span>
                    <span class="fraction-currency_wp">
                      <span class="fraction" :style="wholeAmount.length > 8 ? 'font-size: 14px' : ''">
                        <span class="dot">.</span>{{ fractionAmount }}</span
                      >
                      <span class="entity-main-info__currency" :style="wholeAmount.length > 8 ? 'font-size: 10px' : ''">
                        {{ gd(tender, _ => _.value.currency, "###") }}
                      </span>
                    </span>
                  </span>
                </div>
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.procedure_type") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ getProcedureType }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.procedure_status") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ mapTenderStatus }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.buyer_name") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.procuringEntity.name, "###") }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.buyer_region") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.procuringEntity.address.region, "###") }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.tender_id") }}</div>
                    <div class="entity-main-info__additional-value">
                      <procedure-id>{{ gd(tender, _ => _.tenderID, "###") }}</procedure-id>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </div>
        <div class="entity-tabs">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24">
                <el-tabs v-model="activeTab" stretch>
                  <el-tab-pane name="contract-notice" lazy>
                    <span slot="label" v-html="$t('tender.contract_notice')" />
                    <contract-notice :tender="tender" :procedureType="getProcedureType" />
                  </el-tab-pane>
                  <el-tab-pane name="clarification" lazy>
                    <span slot="label" v-html="$t('tender.clarification_and_changes')" />
                    <clarification :tender="tender" />
                  </el-tab-pane>
                  <el-tab-pane name="review" lazy>
                    <span slot="label" v-html="$t('tender.review_procedures')" />
                    <review :id="gd(tender, _ => _.tenderID)" />
                  </el-tab-pane>

                  <el-tab-pane :disabled="!tender.lots" name="auctions" lazy>
                    <span slot="label" v-html="$t('tender.electronic_auction')"></span>
                    <auction :tender="tender" />
                  </el-tab-pane>

                  <el-tab-pane :disabled="!tender.bids" name="bids" lazy>
                    <span slot="label" v-html="$t('tender.electronic_bids')"></span>
                    <offers :tender="tender" />
                  </el-tab-pane>

                  <el-tab-pane :disabled="!tender.awards" name="awards" lazy>
                    <span slot="label" v-html="$t('tender.evaluation_of_bids')"></span>
                    <evaluation :tender="tender" />
                  </el-tab-pane>
                  <el-tab-pane :disabled="!tender.contracts" name="cans" lazy>
                    <span slot="label" v-html="$t('tender.contract_award')"></span>
                    <contracts :tender="tender" />
                  </el-tab-pane>
                  <!--<el-tab-pane name="procurement-record" lazy>
                  <span slot="label" v-html="$t('tender.procurement_record_title')" />
                  <procurement-record
                  :msRecord="gd(tender, _ => _.MSRecord.compiledRelease)"
                  :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                  :getFS="getFS"
                  :breakdowns="breakdowns"
                  :procedureType="
                  selectProcedure(
                  gd(tender, _ => _.MSRecord.compiledRelease.tender.mainProcurementCategory),
                  gd(tender, _ => _.MSRecord.compiledRelease.tender.value.amount)
                  )
                  "
                  :selectTab="selectTab"
                  :hasBids="gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('bids')"
                  :hasAwards="gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('awards')"
                  :hasCANs="gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('contracts')"
                  />
                  </el-tab-pane>-->
                </el-tabs>
              </el-col>
            </el-row>
          </el-container>
        </div>
      </div>
      <el-container key="error" v-else>
        <error :message="error.message"></error>
      </el-container>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_CURRENT_TENDER_INFO } from "../../../../store/types/actions-types";

import TenderCard from "../../../../components/ListCards/TendersCard";
import ContractNotice from "./Tabs/ContractNotice";
import Clarification from "./Tabs/Clarification";
import Review from "./Tabs/Review";
import Auction from "./Tabs/Auction";
import Offers from "./Tabs/Offers";
import Evaluation from "./Tabs/Evaluation";
import Contracts from "./Tabs/Contracts";

import { getDataFromObject, mapTenderStatus } from "../../../../utils";
import ProcedureId from "../../../../components/ProcedureId";
import Error from "../../../Error";
import proceduresTypes from "./../../../../store/types/procedures-types";

export default {
  name: "TenderPage",
  components: {
    "tender-card": TenderCard,
    "procedure-id": ProcedureId,
    "contract-notice": ContractNotice,
    clarification: Clarification,
    auction: Auction,
    offers: Offers,
    review: Review,
    evaluation: Evaluation,
    contracts: Contracts,
    error: Error,
  },
  data() {
    return {
      activeTab: "contract-notice",
    };
  },
  created() {
    this.getTender();
  },
  methods: {
    getTender() {
      this.$store.dispatch(FETCH_CURRENT_TENDER_INFO, {
        id: this.$route.params.id,
      });
    },
    gd(...args) {
      return getDataFromObject(...args);
    },
  },
  computed: {
    ...mapState({
      cdb: state => state.entities.tenders.currentEntity.cdb,
      tender: state => state.entities.tenders.currentEntity.entityData,
      loaded: state => state.entities.tenders.loaded,
      error: state => state.entities.tenders.error,
    }),
    wholeAmount() {
      console.log(this.tender);
      const amountStr = this.gd(this.tender, _ => _.value.amount, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
    },
    fractionAmount() {
      const amountStr = this.gd(this.tender, _ => _.value.amount, 0).toString();
      return /\./.test(amountStr)
        ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1
          ? amountStr.slice(amountStr.indexOf(".") + 1) + "0"
          : amountStr.slice(amountStr.indexOf(".") + 1)
        : "00";
    },
    getProcedureType() {
      const type = this.gd(this.tender, _ => _.procurementMethodType, "");

      switch (type) {
        case "reporting":
          return proceduresTypes.tenders.find(type => type.value === "reporting").name[this.$i18n.locale];
        case "belowThreshold":
          return proceduresTypes.tenders.find(type => type.value === "mv").name[this.$i18n.locale];
        default:
          return "";
      }
    },
    mapTenderStatus() {
      return mapTenderStatus(this.gd(this.tender, _ => _.status));
    },
    selectTab(tab) {
      this.activeTab = tab;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
