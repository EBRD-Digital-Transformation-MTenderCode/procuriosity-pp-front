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
                  {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.title) }}
                </div>
                <div class="entity-main-info__description">
                  {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.description) }}
                </div>
                <div class="entity-main-info__timeline">

                </div>
              </el-col>
              <el-col :sm="6" :offset="2" :xs=({span:22,offset:0})>
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
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24">
                <el-tabs
                    v-model="activeTab"
                    stretch
                    :before-leave="checkTab"
                >
                  <el-tab-pane
                      :disabled="!gd(tender, _ => _.EVRecord.compiledRelease.hasPreviousNotice)"
                      name="pn"
                      lazy
                      key="pn"
                  >
                    <span slot="label" v-html="$t('tender.procurement_plan')" />
                  </el-tab-pane>
                  <el-tab-pane
                      name="cn"
                      lazy
                      key="cn"
                  >
                    <span slot="label" v-html="$t('tender.contract_notice')" />
                    <contract-notice
                        :msRecord="gd(tender, _ => _.MSRecord.compiledRelease)"
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                        :procedureType="selectProcedure(gd(tender, _ =>
                      _.MSRecord.compiledRelease.tender.mainProcurementCategory),gd(tender, _ =>
                      _.MSRecord.compiledRelease.tender.value.amount))"
                    />
                  </el-tab-pane>
                  <el-tab-pane
                      name="clarification"
                      lazy
                      key="clarification"
                  >
                    <span slot="label" v-html="$t('tender.clarification_and_changes')" />
                    <clarification
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                    />
                  </el-tab-pane>
                  <el-tab-pane
                      disabled
                      name="review"
                      lazy
                      key="review"
                  >
                    <span slot="label" v-html="$t('tender.review_procedures')" />
                  </el-tab-pane>
                  <el-tab-pane
                      :disabled="!gd(tender,_=>_.EVRecord.compiledRelease.tender.electronicAuctions.details).length"
                      :label='$t("tender.electronic_auction")'
                      name="auction"
                      lazy
                      key="auction"
                  >
                    <auction  :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)" />
                  </el-tab-pane>
                  <el-tab-pane
                      :disabled="!gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('bids')"
                      name="offers"
                      lazy
                      key="offers"
                  >
                    <span slot="label" v-html="$t('tender.electronic_bids')"></span>
                    <offers
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                    />
                  </el-tab-pane>
                  <el-tab-pane
                      :disabled="!gd(tender, _ => _.EVRecord.compiledRelease.tender, {}).hasOwnProperty('awardPeriod')"
                      name="ev"
                      lazy
                      key="ev"
                  >
                    <span slot="label" v-html="$t('tender.evaluation_of_bids')"></span>
                    <evaluation
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                    />
                  </el-tab-pane>
                  <el-tab-pane
                      :disabled="!gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('contracts')"
                      name="cans"
                      lazy
                      key="cans"
                  >
                    <span slot="label" v-html="$t('tender.contract_award')"></span>
                    <contracts
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                    />
                  </el-tab-pane>
                  <el-tab-pane
                      name="pr"
                      lazy
                      key="pr"
                  >
                    <span slot="label" v-html="$t('tender.procurement_record_title')"/>
                    <procurement-record
                        :msRecord="gd(tender, _ => _.MSRecord.compiledRelease)"
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                        :procedureType="selectProcedure(gd(tender, _ => _.MSRecord.compiledRelease.tender.mainProcurementCategory),gd(tender, _ => _.MSRecord.compiledRelease.tender.value.amount))"
                        :selectTab="selectTab"
                        :hasBids="gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('bids')"
                        :hasAwards="gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('awards')"
                        :hasCANs="gd(tender, _ => _.EVRecord.compiledRelease, {}).hasOwnProperty('contracts')"
                    />
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

  import ContractNotice from "./Tabs/ContractNotice";
  import Clarification from "./Tabs/Clarification";
  import Auction from "./Tabs/Auction";
  import Offers from "./Tabs/Offers";
  import Evaluation from "./Tabs/Evaluation";
  import Contracts from "./Tabs/Contracts";
  import ProcurementRecord from "./Tabs/ProcurementRecord";

  import { getDataFromObject, selectProcedure } from "./../../../utils";

  export default {
    name: "TenderPage",
    components: {
      "contract-notice": ContractNotice,
      clarification: Clarification,
      auction: Auction,
      "offers": Offers,
      evaluation: Evaluation,
      contracts: Contracts,
      "procurement-record": ProcurementRecord
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
        console.log(this.tender);
      },
      gd(...args) {
        return getDataFromObject(...args);
      },
      selectTab(tab) {
        this.activeTab = tab;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      },
      checkTab(tab) {
        if (tab === "pn") {
          this.$router.push({ path: `${this.$i18n.locale !== "ro" ? `/${this.$i18n.locale}` : ""}/plans/${this.tender.MSRecord.ocid}` });
        }
      },
      selectProcedure(category, amount){
        return selectProcedure(category, amount)
      }
    }
  };
</script>
