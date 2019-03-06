<template>
  <div>
    <main-search
      entityName="tenders"
      :titlesOrDescriptionsStrict="titlesOrDescriptionsStrict"
      :titlesOrDescriptions="titlesOrDescriptions"
    />

    <el-collapse-transition mode="in-out" name="el-zoom-in-top">
      <div v-show="isExpanded">
        <div class="search-form-more">
          <el-row :gutter="26">
            <el-col :sm="8">
              <div class="search-form__group">
                <div class="search-form__group-title">Byuer's info</div>

                <!-- Buyers names -->
                <div class="search-form-element">
                  <multiple-input
                    name="buyersNames"
                    :values="buyersNames"
                    :setValues="setFormParams"
                    :label="$t('search.buyers_names_placeholder')"
                    :placeholder="$t('search.buyers_names_placeholder')"
                  />
                </div>

                <!-- Buyers regions -->
                <div class="search-form-element">
                  <search-regions
                    name="buyersRegions"
                    :items="regionsList"
                    :values="buyersRegions"
                    :setValues="setFormParams"
                    needFetch
                    :label="$t('search.buyers_region_placeholder')"
                    :placeholder="$t('search.buyers_region_placeholder')"
                  />
                </div>

                <!-- Buyers identifiers -->
                <div class="search-form-element">
                  <multiple-input
                    name="buyersIdentifiers"
                    :values="buyersIdentifiers"
                    :setValues="setFormParams"
                    :label="$t('search.buyers_identifiers_placeholder')"
                    :placeholder="$t('search.buyers_identifiers_placeholder')"
                  />
                </div>

                <!-- Types of buyers -->
                <div class="search-form-element">
                  <search-auto-complete-input
                    name="buyersTypes"
                    :items="buyersTypesList"
                    :values="buyersTypes"
                    :setValues="setFormParams"
                    :label="$t('search.buyers_types_placeholder')"
                    :placeholder="$t('search.buyers_types_placeholder')"
                  />
                </div>

                <!-- Main general activity -->
                <div class="search-form-element">
                  <search-auto-complete-input
                    name="buyersMainGeneralActivities"
                    :items="mainGeneralActivityList"
                    :values="buyersMainGeneralActivities"
                    :setValues="setFormParams"
                    :label="$t('search.buyers_main_general_activity_placeholder')"
                    :placeholder="$t('search.buyers_main_general_activity_placeholder')"
                  />
                </div>

                <!-- Main sectoral activity -->
                <div class="search-form-element">
                  <search-auto-complete-input
                    name="buyersMainSectoralActivities"
                    :items="mainSectoralActivityList"
                    :values="buyersMainSectoralActivities"
                    :setValues="setFormParams"
                    :label="$t('search.buyers_main_sectoral_activity_placeholder')"
                    :placeholder="$t('search.buyers_main_sectoral_activity_placeholder')"
                  />
                </div>
              </div>
            </el-col>

            <el-col :sm="8">
              <div class="search-form__group">
                <div class="search-form__group-title">Procedure info</div>

                <!-- id -->
                <div class="search-form-element">
                  <search-input-text
                    name="entityId"
                    :value="entityId"
                    :setValue="setFormParams"
                    :label="$t('search.id_placeholder')"
                    :placeholder="$t('search.id_placeholder')"
                  />
                </div>

                <!-- Procedure types -->
                <div class="search-form-element">
                  <search-auto-complete-input
                    name="proceduresTypes"
                    :items="proceduresTypesList"
                    :values="proceduresTypes"
                    :setValues="setFormParams"
                    :label="$t('search.types_procedures_placeholder')"
                    :placeholder="$t('search.types_procedures_placeholder')"
                  />
                </div>

                <!-- Procedure statuses -->
                <div class="search-form-element" v-if="procedures === 'all'">
                  <search-auto-complete-input
                    name="proceduresStatuses"
                    :items="proceduresStatusesList"
                    :values="proceduresStatuses"
                    :setValues="setFormParams"
                    :label="$t('search.statuses_procedures_placeholder')"
                    :placeholder="$t('search.statuses_procedures_placeholder')"
                  />
                </div>

                <el-row :gutter="15" style="margin: 20px -7.5px">
                  <el-col :sm="12">
                    <!-- Amount from -->
                    <div class="search-form-element">
                      <search-input-number
                        name="amountFrom"
                        :value="amountFrom"
                        :setValue="setFormParams"
                        :label="$t('search.amount_from')"
                        :placeholder="$t('search.amount_from')"
                      />
                    </div>
                  </el-col>
                  <el-col :sm="12">
                    <!-- Amount to -->
                    <div class="search-form-element">
                      <search-input-number
                        name="amountTo"
                        :value="amountTo"
                        :setValue="setFormParams"
                        :label="$t('search.amount_to')"
                        :placeholder="$t('search.amount_to')"
                      />
                    </div>
                  </el-col>
                </el-row>

                <!-- Classifications -->
                <div class="search-form-element">
                  <search-classifications
                    name="classifications"
                    :items="CPVCodesList"
                    :values="classifications"
                    :setValues="setFormParams"
                    :label="$t('search.classifications_placeholder')"
                    :placeholder="$t('search.classifications_placeholder')"
                  />
                </div>

                <!-- Delivery regions -->
                <div class="search-form-element">
                  <search-regions
                    name="deliveriesRegions"
                    :items="regionsList"
                    :values="deliveriesRegions"
                    :setValues="setFormParams"
                    needFetch
                    :label="$t('search.deliveries_regions_placeholder')"
                    :placeholder="$t('search.deliveries_regions_placeholder')"
                  />
                </div>
              </div>
            </el-col>

            <el-col :sm="8">
              <div class="search-form__group">
                <div class="search-form__group-title">Periods</div>

                <!-- Period published -->
                <div class="search-form-element">
                  <search-period
                    name="periodPublished"
                    :value="periodPublished"
                    :setValue="setFormParams"
                    :label="$t('search.published_period')"
                  />
                </div>

                <!-- Period delivery -->
                <div class="search-form-element">
                  <search-period
                    name="periodDelivery"
                    :value="periodDelivery"
                    :setValue="setFormParams"
                    :label="$t('search.delivery_period')"
                  />
                </div>

                <!-- Period enquiry -->
                <div class="search-form-element">
                  <search-period
                    name="periodEnquiry"
                    :value="periodEnquiry"
                    :setValue="setFormParams"
                    :label="$t('search.enquiry_period')"
                  />
                </div>

                <!-- Period auction -->
                <div class="search-form-element">
                  <search-period
                    name="periodAuction"
                    :value="periodAuction"
                    :setValue="setFormParams"
                    :label="$t('search.auction_period')"
                  />
                </div>

                <!-- Period offer -->
                <div class="search-form-element">
                  <search-period
                    name="periodOffer"
                    :value="periodOffer"
                    :setValue="setFormParams"
                    :label="$t('search.offer_period')"
                  />
                </div>

                <!-- Period Award -->
                <div class="search-form-element">
                  <search-period
                    name="periodAward"
                    :value="periodAward"
                    :setValue="setFormParams"
                    :label="$t('search.award_period')"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- Reset button -->
          <div class="search-form__btn_reset-wp">
            <reset-button entity="tenders" />
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SET_ENTITY_SEARCH_PARAMS } from "./../../store/types/mutations-types";
import { REGIONS, CPV_CODES } from "./../../store/types/directories-types";

import MainSearch from "./../FormsComponents/MainSearch";
import SearchInputText from "./../FormsComponents/SearchInputText";
import SearchInputNumber from "./../../components/FormsComponents/SearchInputNumber";
import SearchAutoCompleteInput from "./../FormsComponents/SearchAutoCompleteInput";
import SearchRegions from "./../FormsComponents/SearchRegions";
import SearchClassifications from "./../FormsComponents/SearchClassifications";
import SearchPeriods from "./../FormsComponents/SearchPeriods";
import MultipleInput from "./../FormsComponents/MultipleInput";
import ResetButton from "./../FormsComponents/ResetButton";

import initialSearchProps from "./../../store/types/initial-search-props.js";
import proceduresTypesList from "./../../store/types/procedures-types";
import proceduresStatusesList from "./../../store/types/procedure-status-types";
import buyersTypesList from "./../../store/types/buyers-types";
import mainGeneralActivityList from "./../../store/types/main-general-activity-types";
import mainSectoralActivityList from "./../../store/types/main-sectoral-activity";
import entities from "./../../store/entities";

export default {
  name: "TendersSearchForm",
  components: {
    "main-search": MainSearch,
    "search-input-text": SearchInputText,
    "search-input-number": SearchInputNumber,
    "search-auto-complete-input": SearchAutoCompleteInput,
    "search-regions": SearchRegions,
    "search-classifications": SearchClassifications,
    "search-period": SearchPeriods,
    "multiple-input": MultipleInput,
    "reset-button": ResetButton,
  },
  props: {
    isExpanded: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    if (
      this.$route.query.procedures &&
      (this.$route.query.procedures === "new" || this.$route.query.procedures === "bidding")
    ) {
      this.procedures = this.$route.query.procedures;

      if (this.$route.query.procedures === "new") {
        initialSearchProps.tenders.proceduresStatuses = ["published", "clarification", "suspended"];
      }

      if (this.$route.query.procedures === "bidding") {
        initialSearchProps.tenders.proceduresStatuses = ["tendering"];
      }
    }
  },
  data() {
    return {
      procedures: "all",
      proceduresTypesList: proceduresTypesList["tenders"],
      proceduresStatusesList: proceduresStatusesList["tenders"],
      buyersTypesList,
      mainGeneralActivityList,
      mainSectoralActivityList,
    };
  },
  computed: {
    ...mapState({
      /* + */ titlesOrDescriptions: state => state.entities.tenders.searchParams.titlesOrDescriptions,
      /* + */ titlesOrDescriptionsStrict: state => state.entities.tenders.searchParams.titlesOrDescriptionsStrict,

      /* + */ buyersRegions: state => state.entities.tenders.searchParams.buyersRegions,
      /* + */ deliveriesRegions: state => state.entities.tenders.searchParams.deliveriesRegions,

      /* + */ proceduresTypes: state => state.entities.tenders.searchParams.proceduresTypes,
      /* + */ proceduresStatuses: state => state.entities.tenders.searchParams.proceduresStatuses,

      /* + */ entityId: state => state.entities.tenders.searchParams.entityId,

      /* + */ amountFrom: state => state.entities.tenders.searchParams.amountFrom,
      /* + */ amountTo: state => state.entities.tenders.searchParams.amountTo,

      /* + */ classifications: state => state.entities.tenders.searchParams.classifications,

      /* + */ periodPublished: state => state.entities.tenders.searchParams.periodPublished,
      /* + */ periodDelivery: state => state.entities.tenders.searchParams.periodDelivery,
      /* + */ periodEnquiry: state => state.entities.tenders.searchParams.periodEnquiry,
      /* + */ periodOffer: state => state.entities.tenders.searchParams.periodOffer,
      /* + */ periodAuction: state => state.entities.tenders.searchParams.periodAuction,
      /* + */ periodAward: state => state.entities.tenders.searchParams.periodAward,

      /* + */ buyersNames: state => state.entities.tenders.searchParams.buyersNames,
      /* + */ buyersIdentifiers: state => state.entities.tenders.searchParams.buyersIdentifiers,
      /* + */ buyersTypes: state => state.entities.tenders.searchParams.buyersTypes,
      /* + */ buyersMainGeneralActivities: state => state.entities.tenders.searchParams.buyersMainGeneralActivities,
      /* + */ buyersMainSectoralActivities: state => state.entities.tenders.searchParams.buyersMainSectoralActivities,

      regionsList: state => state.mdm[REGIONS],
      CPVCodesList: state => state.mdm[CPV_CODES],
    }),
  },
  methods: {
    setFormParams(name, value) {
      let params = {};

      switch (this.procedures) {
        case "new":
          params = {
            page: 1,
            [name]: value,
            proceduresStatuses: ["published", "clarification", "suspended"],
          };
          break;
        case "bidding":
          params = {
            page: 1,
            [name]: value,
            proceduresStatuses: ["tendering"],
          };
          break;
        default:
          params = {
            page: 1,
            [name]: value,
          };
      }

      this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
        entityName: "tenders",
        params,
      });
    },
  },
  destroyed() {
    if (this.procedures !== "all") {
      initialSearchProps.tenders.proceduresStatuses = [];

      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
      localStorageEntities.tenders.proceduresStatuses = [];
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));
    }
  },
};
</script>
