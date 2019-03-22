<template>
  <div>
    <main-search
      entityName="plans"
      :titlesOrDescriptionsStrict="titlesOrDescriptionsStrict"
      :titlesOrDescriptions="titlesOrDescriptions"
    />
    <el-collapse-transition mode="in-out" name="el-zoom-in-top">
      <div v-show="isExpanded">
        <div class="search-form-more">
          <el-row :gutter="26">
            <el-col :sm="8">
              <div class="search-form__group">
                <div class="search-form__group-title">{{ $t("search.buyers_info") }}</div>
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
                <div class="search-form__group-title">{{ $t("search.procedure_info") }}</div>
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
                <!-- id -->
                <div class="search-form-element">
                  <search-input-text
                    name="entityId"
                    :value="entityId"
                    :setValue="setFormParams"
                    :placeholder="$t('search.id_placeholder')"
                    :label="$t('search.id_placeholder')"
                  />
                </div>

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
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="search-form__group">
                <div class="search-form__group-title">{{ $t("search.periods") }}</div>
                <!-- Period published -->
                <div class="search-form-element">
                  <search-period
                    name="periodPublished"
                    :value="periodPublished"
                    :setValue="setFormParams"
                    :label="$t('search.published_period')"
                  >
                    {{ $t("search.published_period") }}:
                  </search-period>
                </div>

                <!-- Period delivery -->
                <div class="search-form-element">
                  <search-period
                    name="periodDelivery"
                    :value="periodDelivery"
                    :setValue="setFormParams"
                    :label="$t('search.delivery_period')"
                  >
                    {{ $t("search.delivery_period") }}:
                  </search-period>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- Reset button -->
          <div class="search-form__btn_reset-wp">
            <reset-button entity="plans" />
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SET_ENTITY_SEARCH_PARAMS } from "../../store/types/mutations-types";
import { REGIONS, CPV_CODES } from "./../../store/types/directories-types";

import MainSearch from "./../FormsComponents/MainSearch";
import SearchInputText from "./../FormsComponents/SearchInputText";
import SearchInputNumber from "./../../components/FormsComponents/SearchInputNumber";
import SearchAutoCompleteInput from "./../FormsComponents/SearchAutoCompleteInput";
import SearchRegions from "./../FormsComponents/SearchRegions";
import SearchClassifications from "./../FormsComponents/SearchClassifications";
import SearchPeriods from "./../FormsComponents/SearchPeriods";

import proceduresTypesList from "./../../store/types/procedures-types";
import buyersTypesList from "./../../store/types/buyers-types";
import mainGeneralActivityList from "./../../store/types/main-general-activity-types";
import mainSectoralActivityList from "./../../store/types/main-sectoral-activity";
import MultipleInput from "./../FormsComponents/MultipleInput";
import ResetButton from "./../FormsComponents/ResetButton";

export default {
  name: "PlansSearchForm",
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
    initialParams: {
      type: Object,
      required: true,
    },
    isExpanded: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
    if (localStorageEntities.plans.hasOwnProperty("isExpanded")) {
      this.moreCriterions = localStorageEntities.plans.isExpanded;
    } else {
      localStorageEntities.plans.isExpanded = this.moreCriterions;
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));
    }
  },
  data() {
    return {
      moreCriterions: false,
      proceduresTypesList: proceduresTypesList["plans"],
      buyersTypesList,
      mainGeneralActivityList,
      mainSectoralActivityList,
    };
  },
  computed: {
    ...mapState({
      /* + */ titlesOrDescriptions: state => state.entities.plans.searchParams.titlesOrDescriptions,
      /* + */ titlesOrDescriptionsStrict: state => state.entities.plans.searchParams.titlesOrDescriptionsStrict,

      /* + */ buyersRegions: state => state.entities.plans.searchParams.buyersRegions,
      /* + */ deliveriesRegions: state => state.entities.plans.searchParams.deliveriesRegions,

      /* + */ proceduresTypes: state => state.entities.plans.searchParams.proceduresTypes,

      /* + */ entityId: state => state.entities.plans.searchParams.entityId,

      /* + */ amountFrom: state => state.entities.plans.searchParams.amountFrom,
      /* + */ amountTo: state => state.entities.plans.searchParams.amountTo,

      /* + */ classifications: state => state.entities.plans.searchParams.classifications,

      /* + */ periodPublished: state => state.entities.plans.searchParams.periodPublished,
      /* + */ periodDelivery: state => state.entities.plans.searchParams.periodDelivery,

      /* + */ buyersNames: state => state.entities.plans.searchParams.buyersNames,
      /* + */ buyersIdentifiers: state => state.entities.plans.searchParams.buyersIdentifiers,
      /* + */ buyersTypes: state => state.entities.plans.searchParams.buyersTypes,
      /* + */ buyersMainGeneralActivities: state => state.entities.plans.searchParams.buyersMainGeneralActivities,
      /* + */ buyersMainSectoralActivities: state => state.entities.plans.searchParams.buyersMainSectoralActivities,

      regionsList: state => state.mdm[REGIONS],
      CPVCodesList: state => state.mdm[CPV_CODES],
    }),
  },
  methods: {
    setFormParams(name, value) {
      this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
        entityName: "plans",
        params: {
          page: 1,
          [name]: value,
          ...this.initialParams,
        },
      });
    },
  },
};
</script>
