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
                  <div> Estimated value excluding VAT</div>
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
                    <div class="entity-main-info__additional-title">Процедура закупки</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.procurementMethodDetails) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">Закупающая организация</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.MSRecord.compiledRelease.tender.procuringEntity.name) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">Регион</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(tender, _ => _.MSRecord.compiledRelease.parties, []).find(part => part.roles.some(role =>
                      role === "procuringEntity")).address.addressDetails.region.description }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">Number of notice</div>
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
                <el-tabs v-model="activeTab" stretch>
                  <el-tab-pane label="PN" name="pn" lazy>
                    <planning-notice />
                  </el-tab-pane>
                  <el-tab-pane label="Contract Notice" name="cn" lazy>
                    <contract-notice
                        :msRecord="gd(tender, _ => _.MSRecord.compiledRelease)"
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                    />
                  </el-tab-pane>
                  <el-tab-pane label="Clarification and review" name="clarification" lazy>
                    <clarification
                        :evRecord="gd(tender, _ => _.EVRecord.compiledRelease)"
                    />
                  </el-tab-pane>
                  <el-tab-pane label="e-Auction" name="auction" lazy>
                    <auction />
                  </el-tab-pane>
                  <el-tab-pane label="Received offers" name="offer" lazy>
                    <received-offers />
                  </el-tab-pane>
                  <el-tab-pane label="Evaluation" name="ev" lazy>
                    <evaluation />
                  </el-tab-pane>
                  <el-tab-pane label="Contracts" name="can" lazy>
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

  import PlanningNotice from "./Tabs/PlanningNotice";
  import ContractNotice from "./Tabs/ContractNotice";
  import Clarification from "./Tabs/Clarification";
  import Auction from "./Tabs/Auction";
  import ReceivedOffers from "./Tabs/ReceivedOffers";
  import Evaluation from "./Tabs/Evaluation";
  import Contracts from "./Tabs/Contracts";

  import { getDataFromObject, formatDate } from "../../../utils";

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
        activeTab: "clarification"
      };
    },
    created() {
      this.getTender();
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
      }
    },
    computed: {
      ...mapState({
        tender: state => state.entities.tenders.currentTender.tenderData,
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
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../styles/variables";

  .entity {
    &-main-info {
      padding-top: 45px;
      padding-bottom: 70px;
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
      .el-container>.el-row>.el-col {
        display: block;
      }
    }
    &-tabs {
      margin-bottom: -20px;
      background-color: #fff;
    }
  }

  .info {
    &__title {
      margin: 35px 0 30px;
      padding-bottom: 25px;
      border-bottom: 1px solid #d9d9d9;
      line-height: 1;
      font-size: 30px;
      font-weight: 700;
      color: $mainC;
    }

    &__sub-title {
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 700;
    }

    &-block {
      padding: 10px 0 5px;
      &:not(:last-child) {
        border-bottom: 1px solid #d9d9d9;
      }
      &__text {
        font-size: 13px;
        color: #525252;
      }
      &__value {
        line-height: 2;
        font-size: 15px;
        color: #000;
        &_name:first-letter {
          text-transform: uppercase;
        }
        &-platform {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 20px;
        }
        a {
          text-decoration: underline;
          &:hover {
            text-decoration: none;
          }
        }
        img {
          max-width: 150px;
        }
      }
      &__documents {
        padding-left: 41px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAYAAACKPxqrAAABl0lEQVRIS+2X3VXCQBCF72wD2oF0oFYgdmAHMpsCLEHowAayCxVoCdABdgAdUAHjmZwkJ8FN2ITk6AP7ms18udk7P0ve+wcR+QQwwQBLRDhJkuVpKHLO7QDcAdhcyNEP1TggomdmXlfjKUgUYq2dXgJK03RORO95jEMO2xYxxwCtALwCqMEGB6mS4/E4ISKfwx6ZeTcKSM/HOfcB4A3AVuGDgxrOeTsYyHs/FZEvADch2GCgJsc659TmT9GgNE1nRKRuKpeIrELJWd3TB1TNkyyWiCySJJm35d8VhJMSc/11zfb23t+KyH1ZfYlmIjKrlX6ipYiUvYeIvpn50NnezjkNUsudFiuvrLW1D9G90faOhAUhnUD55jZljZDOoBZYK6QXKAA7C+kNqsAQOviQUaLNcMnAclaRtgRjTDY6MfMiBqYlyhiTTVTVUatVUfFQAdZaigHlY9uv1vH/QDFqTrpurRlGKxoVpGboO/QbY9bRZuiqYtCZoS/8TxK2uB/V7jN9FQTe0+vQnvIbn46yWSUYYe2J6OUHjjTEmmNtDa4AAAAASUVORK5CYII=);
        background-position: left;
        background-repeat: no-repeat;
      }
    }

    ul,
    ol {
      margin-bottom: 10px;
      li {
        margin-bottom: 8px;
        font-size: 14px;
        color: #4c4c4c;
      }
    }

    ul {
      & > li {
        &:before {
          content: "■";
          color: $mainC;
          padding-right: 10px;
        }
      }
    }

    ol {
      li {
        list-style-position: inside;
      }
      & > li {
        list-style-type: decimal;
      }

      ol {
        padding-left: 15px;
        & > li {
          list-style-type: lower-latin;
        }
      }
    }

    p {
      margin-bottom: 15px;
      font-size: 14px;
      color: #4c4c4c;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .entity-nav {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;
    font-size: 15px;
    color: #727272;
    a {
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        color: $mainC;
      }
      &.active {
        color: $mainC;
      }
    }
  }
</style>
