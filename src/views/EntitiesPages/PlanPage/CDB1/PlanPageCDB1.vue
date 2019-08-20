<template>
  <div class="entity-wp">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <div v-else-if="loaded && Object.keys(plan).length" key="info">
        <div class="entity-main-info entity-main-info__plan ">
          <el-container direction="vertical">
            <el-row>
              <el-col :xs="24" :sm="14">
                <div class="entity-main-info__title">
                  {{ gd(plan, _ => _.budget.description) }}
                </div>
                <div class="entity-main-info__timeline"></div>
              </el-col>
              <el-col :xs="22" :sm="6" :offset="2">
                <div class="entity-main-info__value">
                  <div>{{ $t("plan.estimated_value_excluding_VAT") }}</div>
                  <span class="entity-main-info__amount">
                    <span class="whole" :style="wholeAmount.length > 8 ? 'font-size: 26px' : ''"
                      >{{ wholeAmount }}
                    </span>
                    <span class="fraction-currency_wp">
                      <span class="fraction" :style="wholeAmount.length > 8 ? 'font-size: 14px' : ''">
                        <span class="dot">.</span>{{ fractionAmount }}</span
                      >
                      <span class="entity-main-info__currency" :style="wholeAmount.length > 8 ? 'font-size: 10px' : ''">
                        {{ gd(plan, _ => _.budget.currency) }}
                      </span>
                    </span>
                  </span>
                </div>
                <div class="entity-main-info__additional">
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("plan.procedure_type") }}</div>
                    <div class="entity-main-info__additional-value">
                      <!--@TODO need clarification-->
                      {{ getProcedureType }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("plan.buyer_name") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(plan, _ => _.procuringEntity.name) }}
                    </div>
                  </div>
                  <div class="entity-main-info__additional-block">
                    <div class="entity-main-info__additional-title">{{ $t("plan.number_of_notice") }}</div>
                    <div class="entity-main-info__additional-value">
                      {{ gd(plan, _ => _.planID) }}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-container>
        </div>
        <el-container direction="vertical">
          <div
            class="entity-nav"
            data-scroll-spy-id="cn"
            v-scroll-spy-active="{ selector: 'a', class: 'active' }"
            v-scroll-spy-link
          >
            <a>{{ $t("plan.contracting_authority") }}</a>
            <a>{{ $t("plan.object") }}</a>
            <a>{{ $t("plan.complementary_information") }}</a>
          </div>
          <div class="info" data-scroll-spy-id="cn" v-scroll-spy="{ offset: 75, allowNoActive: true }">
            <!-- Contracting authority -->
            <div>
              <div class="info__title">{{ $t("plan.contracting_authority") }}</div>
              <div class="info__sub-title">{{ $t("plan.name_and_address") }}</div>
              <div class="info-blocks">
                <div class="info-block">
                  <el-row :gutter="15">
                    <el-col :sm="8">
                      <div class="info-block__text">
                        {{ $t("plan.official_name") }}
                      </div>
                      <div class="info-block__value">
                        {{ gd(plan, _ => _.procuringEntity.name, "") }}
                      </div>
                    </el-col>
                    <el-col :sm="8">
                      <div class="info-block__text">
                        {{ $t("plan.national_registration_number") }}
                      </div>
                      <div class="info-block__value">
                        {{ gd(plan, _ => _.procuringEntity.identifier.id, "") }}
                      </div>
                    </el-col>
                    <el-col :sm="8">
                      <div class="info-block__text">
                        {{ $t("plan.legal_name") }}
                      </div>
                      <div class="info-block__value">
                        {{ gd(plan, _ => _.procuringEntity.identifier.legalName, "") }}:
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="info__sub-title">{{ $t("plan.communication") }}</div>
              <div class="info-blocks">
                <div class="info-block">
                  <el-row :gutter="15">
                    <el-col :sm="24">
                      <div class="info-block__text">{{ $t("plan.must_be_submitted") }}:</div>
                      <div class="info-block__value info-block__value-platform">
                        <a
                          class="platform-link"
                          v-for="platform of randomSortPlatforms"
                          :key="platform.name"
                          :href="
                            `${platform.href}${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}plans/${gd(
                              plan,
                              _ => _.planID
                            )}`
                          "
                          :title="platform.name"
                          target="_blank"
                        >
                          <img :src="platform.src" :alt="platform.name" class="platform-img" />
                        </a>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>

            <!-- Object -->
            <div>
              <div class="info__title">{{ $t("plan.object") }}</div>
              <div class="info__sub-title">{{ $t("plan.items") }}</div>
              <div class="info-blocks">
                <div class="info-block">
                  <el-row :gutter="15">
                    <el-col :sm="24">
                      <div class="info-block__text">{{ $t("plan.title") }}</div>
                      <div class="info-block__value">{{ gd(plan, _ => _.budget.notes) }}</div>
                    </el-col>
                  </el-row>
                </div>

                <div class="info-block">
                  <el-row :gutter="15">
                    <el-col :sm="16">
                      <div class="info-block__text">{{ $t("plan.main_CPV") }}</div>
                      <div class="info-block__value">
                        {{ gd(plan, _ => _.classification.id) }} -
                        {{ gd(plan, _ => _.classification.description) }}
                      </div>
                    </el-col>
                    <el-col :sm="8">
                      <div class="info-block__text">{{ $t("plan.type_of_contract") }}</div>
                      <div class="info-block__value info-block__value_name">
                        {{ getMainProcurementCategory }}
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <div class="info-block">
                  <el-row :gutter="15">
                    <el-col :sm="24">
                      <div class="info-block__text">{{ $t("plan.estimated_total_value_excluding_VAT") }}</div>
                      <div class="info-block__value">
                        {{ fa(gd(plan, _ => _.budget.amount)) }}
                        {{ gd(plan, _ => _.budget.currency) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="info__sub-title">{{ $t("plan.description") }}</div>
              <page-number
                v-if="needPagination"
                :current-page="currentPage"
                :elements-amount="elementsAmount"
                :page-size="pageSize"
              />
              <el-collapse
                accordion
                v-if="plan.hasOwnProperty('items')"
                :value="gd(plan, _ => _.items[0].id, '0') + '0'"
              >
                <el-collapse-item
                  v-for="(item, index) of gd(plan, _ => _.items, [])"
                  v-if="index >= numberOfLastDisplayedLot - pageSize && index < numberOfLastDisplayedLot"
                  :key="item.id + index"
                  :name="item.id + index"
                >
                  <template slot="title">
                    <div class="info-block accordion-header">
                      <el-row :gutter="15">
                        <el-col :sm="16">
                          <div class="info-block__text">{{ $t("plan.title") }}</div>
                          <div class="info-block__value info-block__value__bold">
                            {{ gd(item, _ => _.description) }}
                          </div>
                        </el-col>
                        <el-col :sm="8">
                          <div class="info-block__text">{{ $t("plan.item_identifier") }}</div>
                          <div class="info-block__value">
                            {{ gd(item, _ => _.id) }}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </template>

                  <div class="info-blocks">
                    <div class="info-block">
                      <div class="info-block__text">{{ $t("plan.description_of_procurement") }}:</div>
                      <el-row :gutter="15">
                        <el-col :sm="16">
                          <div class="info-block__value">
                            <div class="info-block__text_small">
                              {{ gd(item, _ => _.classification.id) }}
                              {{ gd(item, _ => _.classification.description) }}
                            </div>
                          </div>
                        </el-col>
                        <el-col :sm="8">
                          <div class="info-block__value">
                            {{ gd(item, _ => _.quantity) }} {{ gd(item, _ => _.unit.name) }}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <div v-else>{{ $t("plan.no_items") }}</div>
              <list-pagination
                v-if="needPagination"
                :total="elementsAmount"
                :pageCount="0"
                :currentPage="currentPage"
                :pageSize="pageSize"
                :changePage="changePage"
                offsetTo="scrollToDescription"
                :key="'pagination'"
              />
            </div>

            <!-- Complementary information -->
            <div>
              <div class="info__title">{{ $t("plan.complementary_information") }}</div>
              <div class="info__sub-title">{{ $t("plan.additional_information") }}</div>
              <ul class="info-list">
                <li>{{ $t("plan.complementary_information_list2_p1") }}</li>
              </ul>

              <div class="info__sub-title">{{ $t("plan.procedure_documents") }}</div>
              <div v-if="plan.hasOwnProperty('documents')" class="info-blocks">
                <div class="info-block">
                  <div class="info-block__documents" v-for="(doc, index) of documents" :key="doc.id + index">
                    <div class="info-block__document">
                      <el-row :gutter="15">
                        <el-col :sm="24">
                          <div class="info-block__value ">
                            <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="15">
                        <el-col :sm="16">
                          <div class="info-block__text info-block__text_small">
                            {{ $t("plan.id") }}: {{ gd(doc, _ => _.id) }}
                          </div>
                        </el-col>
                        <el-col :sm="8">
                          <div class="info-block__text info-block__text_small">
                            {{ $t("plan.published") }}: {{ fd(gd(doc, _ => _.datePublished)) }}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div
                      v-for="(oldDoc, index) of gd(doc, _ => _.oldVersions, [])"
                      :key="oldDoc.id + index"
                      class="info-block__document info-block__document_old"
                    >
                      <el-row :gutter="15">
                        <el-col :sm="24">
                          <div class="info-block__value">
                            <a :href="gd(oldDoc, _ => _.url)">{{ gd(oldDoc, _ => _.title) }}</a>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="15">
                        <el-col :sm="16" class="info-block__text_oldDoc">
                          <div class="info-block__text info-block__text_small">
                            {{ $t("plan.id") }}: {{ gd(oldDoc, _ => _.id) }}
                          </div>
                        </el-col>
                        <el-col :sm="8">
                          <div class="info-block__text info-block__text_small">
                            {{ $t("plan.published") }}: {{ fd(gd(oldDoc, _ => _.datePublished)) }}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>{{ $t("plan.no_documents") }}</div>
            </div>
            <div class="info__sub-title">
              {{ $t("plan.date_online_publication") }}:
              {{ fd(gd(plan, _ => _.datePublished), "DD/MM/YYYY") }}
            </div>
          </div>
        </el-container>
      </div>
      <el-container key="error" v-else>
        <error :message="error.message"></error>
      </el-container>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_CURRENT_PLAN_INFO } from "../../../../store/types/actions-types";
import mainProcurementCategory from "../../../../store/types/main-procurement-category";
import proceduresTypes from "../../../../store/types/procedures-types";
import platforms from "../../../../store/types/platforms";

import ListPagination from "../../../../components/ListPagination";
import PageNumber from "../../../../components/PageNumber";

import Error from "../../../Error";

import { getDataFromObject, selectProcedure, formatAmount, formatDate } from "../../../../utils";

export default {
  name: "PlanPageCDB1",
  components: {
    "list-pagination": ListPagination,
    "page-number": PageNumber,
    error: Error,
  },
  data() {
    return {
      pageSize: 25,
      numberOfLastDisplayedLot: 25,
      currentPage: 1,
    };
  },
  created() {
    this.getPlan();
  },
  computed: {
    ...mapState({
      plan: state => state.entities.plans.currentEntity.entityData,
      loaded: state => state.entities.plans.loaded,
      error: state => state.entities.plans.error,
    }),
    wholeAmount() {
      const amountStr = this.gd(this.plan, _ => _.budget.amount, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
    },
    fractionAmount() {
      const amountStr = this.gd(this.plan, _ => _.budget.amount, 0).toString();
      return /\./.test(amountStr)
        ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1
          ? amountStr.slice(amountStr.indexOf(".") + 1) + "0"
          : amountStr.slice(amountStr.indexOf(".") + 1)
        : "00";
    },
    randomSortPlatforms() {
      return [...platforms].sort(() => 0.5 - Math.random());
    },
    needPagination() {
      return this.elementsAmount > this.pageSize;
    },
    documents() {
      const plan = this.plan;

      const obj = {};

      for (const doc of [...getDataFromObject(plan, _ => _.documents, [])].sort(
        (doc1, doc2) => new Date(doc2.dateModified) - new Date(doc1.dateModified)
      )) {
        if (!obj.hasOwnProperty(doc.id)) {
          obj[doc.id] = {
            name: doc.title,
            url: doc.url,
            datePublished: doc.datePublished,
            id: doc.id,
          };
          obj[doc.id].oldVersions = [];
        } else {
          obj[doc.id].oldVersions.push({
            name: doc.title,
            url: doc.url,
            datePublished: doc.datePublished,
            id: doc.id,
          });
        }
      }

      return Object.values(obj);
    },
    getMainProcurementCategory() {
      const cpv = +this.gd(this.plan, _ => _.classification.id, "").slice(0, 2);

      if ((cpv >= 3 && cpv <= 44) || cpv === 48) return mainProcurementCategory.goods[this.$i18n.locale];
      if (cpv === 45) return mainProcurementCategory.works[this.$i18n.locale];
      if (cpv >= 50 && cpv <= 98) return mainProcurementCategory.services[this.$i18n.locale];
      return this.$t("n/a");
    },
    getProcedureType() {
      const type = this.gd(this.plan, _ => _.tender.procurementMethodType, "");

      switch (type) {
        case "belowThreshold":
          return proceduresTypes.plans.find(type => type.value === "mv").name[this.$i18n.locale];
        case "priceProposals":
          return proceduresTypes.plans.find(type => type.value === "sv").name[this.$i18n.locale];
        case "aboveThreshold":
          return proceduresTypes.plans.find(type => type.value === "ot").name[this.$i18n.locale];
        case "priceProposalsNoPublication":
          return proceduresTypes.plans.find(type => type.value === "priceProposalsNoPublication").name[
            this.$i18n.locale
          ];
        case "negotiation":
          return proceduresTypes.plans.find(type => type.value === "negotiation").name[this.$i18n.locale];
        case "negotiationNoPublication":
          return proceduresTypes.plans.find(type => type.value === "negotiationNoPublication").name[this.$i18n.locale];
        default:
          return "";
      }
    },
  },

  methods: {
    async getPlan() {
      await this.$store.dispatch(FETCH_CURRENT_PLAN_INFO, {
        id: this.$route.params.id,
      });

      console.log(this.plan);
    },
    gd(...args) {
      return getDataFromObject(...args);
    },
    fa(amount) {
      return formatAmount(amount);
    },
    fd(...ars) {
      return formatDate(...ars);
    },
    selectProcedure(category, amount) {
      return selectProcedure(category, amount);
    },
    changePage(page) {
      this.numberOfLastDisplayedLot = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
