<template>
  <div>
    <main-search
      entityName="budgets"
      :titlesOrDescriptionsStrict="titlesOrDescriptionsStrict"
      :titlesOrDescriptions="titlesOrDescriptions"
    />
    <el-collapse-transition mode="in-out" name="el-zoom-in-top">
      <div v-show="isExpanded">
        <div class="search-form-more">
          <el-row :gutter="26">
            <el-col :sm="12">
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

            <el-col :sm="12">
              <div class="search-form__group">
                <div class="search-form__group-title">{{ $t("search.procedure_info") }}</div>
                <!-- Period Planning -->
                <div class="search-form-element">
                  <search-period
                    name="periodPlanning"
                    :value="periodPlanning"
                    :setValue="setFormParams"
                    :label="$t('search.planning_period')"
                  >
                    {{ $t("search.planning_period") }}
                  </search-period>
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

                <!-- id -->
                <div class="search-form-element">
                  <search-input-text
                    name="id"
                    :value="id"
                    :setValue="setFormParams"
                    :label="$t('search.id_placeholder')"
                    :placeholder="$t('search.id_placeholder')"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- Reset button -->
          <div class="search-form__btn_reset-wp">
            <reset-button entity="budgets" />
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
import MultipleInput from "../FormsComponents/MultipleInput";
import ResetButton from "../FormsComponents/ResetButton";

import buyersTypesList from "./../../store/types/buyers-types";
import mainGeneralActivityList from "./../../store/types/main-general-activity-types";
import mainSectoralActivityList from "./../../store/types/main-sectoral-activity";

export default {
  name: "BudgetsSearchForm",
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
    if (localStorageEntities.budgets.hasOwnProperty("isExpanded")) {
      this.moreCriterions = localStorageEntities.budgets.isExpanded;
    } else {
      localStorageEntities.budgets.isExpanded = this.moreCriterions;
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));
    }
  },
  data() {
    return {
      buyersTypesList,
      mainGeneralActivityList,
      mainSectoralActivityList,
    };
  },
  computed: {
    ...mapState({
      titlesOrDescriptions: state => state.entities.budgets.searchParams.titlesOrDescriptions,
      titlesOrDescriptionsStrict: state => state.entities.budgets.searchParams.titlesOrDescriptionsStrict,

      buyersRegions: state => state.entities.budgets.searchParams.buyersRegions,

      periodPlanning: state => state.entities.budgets.searchParams.periodPlanning,

      amountFrom: state => state.entities.budgets.searchParams.amountFrom,
      amountTo: state => state.entities.budgets.searchParams.amountTo,

      classifications: state => state.entities.budgets.searchParams.classifications,

      buyersNames: state => state.entities.budgets.searchParams.buyersNames,
      buyersIdentifiers: state => state.entities.budgets.searchParams.buyersIdentifiers,
      buyersTypes: state => state.entities.budgets.searchParams.buyersTypes,
      buyersMainGeneralActivities: state => state.entities.budgets.searchParams.buyersMainGeneralActivities,
      buyersMainSectoralActivities: state => state.entities.budgets.searchParams.buyersMainSectoralActivities,

      id: state => state.entities.budgets.searchParams.id,

      regionsList: state => state.mdm[REGIONS],
      CPVCodesList: state => state.mdm[CPV_CODES],
    }),
  },
  methods: {
    setFormParams(name, value) {
      this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
        entityName: "budgets",
        params: {
          [name]: value,
          ...this.initialParams,
        },
      });
    },
  },
};
</script>
