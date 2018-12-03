<template>
  <div class="entity-wp">
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
                  {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.title) }}
                </div>
                <div class="entity-main-info__description">
                  {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.description) }}
                </div>
                <div class="entity-main-info__timeline">

                </div>
              </el-col>
              <el-col :xs=24 :sm="8" :offset="2">
                <div class="entity-main-info__value">
                  <div>{{ $t("tender.estimated_value_excluding_VAT") }}</div>
                  <span class="entity-main-info__amount">
                    <span class="whole">{{ wholeAmount }} </span>
                    <span class="fraction"> <span class="dot">.</span>{{ fractionAmount }}</span>
                    <span class="entity-main-info__currency">
                      {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.value.currency) }}
                    </span>
                  </span>
                </div>
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.procedure_type") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ selectProcedure(gd(tender, _ =>
                      _.MSRecord.compiledRelease.tender.mainProcurementCategory),gd(tender, _ =>
                      _.MSRecord.compiledRelease.tender.value.amount)) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.procuring_entity_name") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.procuringEntity.name) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.buyer_region") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.MSRecord.compiledRelease.parties, []).find(part => part.roles.some(role =>
                      role === "procuringEntity")).address.addressDetails.region.description }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("tender.tender_id") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.MSRecord.compiledRelease.ocid) }}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </div>
        <div class="entity-tabs">
          <el-container>
            <el-row>
              <el-col :xs="24">
                <el-tabs v-model="activeTab" stretch @tab-click="checkTab">
                  <el-tab-pane :label='$t("tender.procurement_plan")' name="pn" lazy>
                    <planning-notice />
                  </el-tab-pane>
                  <el-tab-pane :label='$t("tender.contract_notice")' name="cn" lazy>
                    <contract-notice
                      :msRecord="gd(tender, _ => _.MSRecord.compiledRelease)"
                      :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                      :procedureType="selectProcedure(gd(tender, _ =>
                      _.MSRecord.compiledRelease.tender.mainProcurementCategory),gd(tender, _ =>
                      _.MSRecord.compiledRelease.tender.value.amount))"
                    />
                  </el-tab-pane>
                  <el-tab-pane
                    :disabled="!gd(tender, _ => _.EVRecord.compiledRelease.tender.hasEnquiries)"
                    :label='$t("tender.clarification_and_changes")'
                    name="clarification"
                    lazy
                  >
                    <clarification
                      :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                    />
                  </el-tab-pane>
                  <el-tab-pane disabled :label='$t("tender.review_procedures")' name="auction" lazy>
                    <auction />
                  </el-tab-pane>
                  <el-tab-pane disabled :label='$t("tender.electronic_auction")' name="offer" lazy>
                    <received-offers />
                  </el-tab-pane>
                  <el-tab-pane disabled :label='$t("tender.electronic_bids")' name="ev" lazy>
                    <evaluation />
                  </el-tab-pane>
                  <el-tab-pane disabled :label='$t("tender.evaluation_of_bids")' name="can" lazy>
                    <contracts />
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
          @click="getTender"
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
  import { FETCH_CURRENT_TENDER_INFO } from "../../../store/types/actions-types";

  import procedureTypes from "./../../../store/types/procedures-types";

  import PlanningNotice from "./Tabs/PlanningNotice";
  import ContractNotice from "./Tabs/ContractNotice";
  import Clarification from "./Tabs/Clarification";
  import Auction from "./Tabs/Auction";
  import ReceivedOffers from "./Tabs/ReceivedOffers";
  import Evaluation from "./Tabs/Evaluation";
  import Contracts from "./Tabs/Contracts";

  import { getDataFromObject } from "../../../utils";

  export default {
    name: "TenderPage",
    components: {
      "planning-notice": PlanningNotice,
      "contract-notice": ContractNotice,
      clarification: Clarification,
      auction: Auction,
      "received-offers": ReceivedOffers,
      evaluation: Evaluation,
      contracts: Contracts
    },
    data() {
      return {
        activeTab: "cn"
      };
    },
    created() {
      this.getTender();
    },
    computed: {
      ...mapState({
        tender: state => state.entities.tenders.currentEntity.entityData,
        loaded: state => state.entities.tenders.loaded,
        error: state => state.entities.tenders.error
      }),
      wholeAmount() {
        const amountStr = this.gd(this.tender, _ => _.MSRecord.compiledRelease.tender.value.amount, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
      },
      fractionAmount() {
        const amountStr = this.gd(this.tender, _ => _.MSRecord.compiledRelease.tender.value.amount, 0).toString();
        return /\./.test(amountStr) ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1 ? amountStr.slice(amountStr.indexOf(".") + 1) + "0" : amountStr.slice(amountStr.indexOf(".") + 1) : "00";
      }
    },
    methods: {
      async getTender() {
        await this.$store.dispatch(FETCH_CURRENT_TENDER_INFO, {
          id: this.$route.params.id
        });

      },
      gd(...args) {
        return getDataFromObject(...args);
      },
      selectProcedure(category, amount) {
        if (category === "goods" || category === "services") {
          if (amount < 80000) {
            switch (this.$i18n.locale) {
              case "en":
                return "Low value procedure";
              case "ro":
                return "Procedură de valoare mică";
              case "ru":
                return "Закупка малой стоимости";
              default:
                return "Low value procedure";
            }
          } else if (amount <= 400000) {
            switch (this.$i18n.locale) {
              case "en":
                return "Request for Proposals";
              case "ro":
                return "COP";
              case "ru":
                return "Запрос ценовых предложений";
              default:
                return "Request for Proposals";
            }
          } else {
            switch (this.$i18n.locale) {
              case "en":
                return "Open Tender";
              case "ro":
                return "Licitație deschisă";
              case "ru":
                return "Открытые торги";
              default:
                return "Open Tender";
            }
          }
        } else if (category === "works") {
          if (amount < 100000) {
            switch (this.$i18n.locale) {
              case "en":
                return "Low value procedure";
              case "ro":
                return "Procedură de valoare mică";
              case "ru":
                return "Закупка малой стоимости";
              default:
                return "Low value procedure";
            }
          } else if (amount <= 1500000) {
            switch (this.$i18n.locale) {
              case "en":
                return "Request for Proposals";
              case "ro":
                return "COP";
              case "ru":
                return "Запрос ценовых предложений";
              default:
                return "Request for Proposals";
            }
          } else {
            switch (this.$i18n.locale) {
              case "en":
                return "Open tender";
              case "ro":
                return "Licitație deschisă";
              case "ru":
                return "Открытые торги";
              default:
                return "Open Tender";
            }
          }
        }
      },
      checkTab(tab) {
        if (tab.name === "pn") {
          this.$router.push({path: `${this.$i18n.locale !== "ro" ? `/${this.$i18n.locale}` : ""}/plans/${this.tender.MSRecord.ocid}`})
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../styles/variables";

  .entity {
    &-main-info {
      padding-top: 45px;
      padding-bottom: 90px;
      background-color: $mainC;
      &__title {
        margin-bottom: 33px;
        color: #fff;
        font-size: 30px;
      }
      &__description {
        margin-bottom: 40px;
        font-size: 14px;
        font-weight: 300;
        color: #fff;
      }
      &__value {
        margin-bottom: 70px;
        font-size: 13px;
        font-weight: 400;
        color: #fff;
      }
      &__amount {
        position: relative;
        display: inline-block;
        margin-top: 6px;
        padding-right: 35px;
        color: #fff;
        .whole {
          display: inline-block;
          margin-right: 2px;
          line-height: 0.8;
          font-size: 44px;
        }
        .fraction {
          position: absolute;
          top: 0;
          right: 0;
          display: inline-block;
          font-size: 22px;
          line-height: 1;
        }
        .dot {
          margin-right: 2px;
        }
      }
      &__currency {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 13px;
        font-weight: 400;
        text-transform: uppercase;
        color: #2da9e2;
      }
      &__additional {
        &-block {
          margin-bottom: 10px;
        }
        &-title {
          margin-bottom: 2px;
          font-size: 13px;
          color: #2da9e2;
        }
        &-value {
          font-size: 15px;
          font-weight: 400;
          color: #fff;
        }
      }
      .el-container > .el-row > .el-col {
        display: block;
      }
    }
    &-tabs {
      margin-bottom: -20px;
    }
  }

</style>
