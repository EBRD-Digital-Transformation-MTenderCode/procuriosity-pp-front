<template>
  <div>
    <div class="main-search">
      <search-switch
          name="titlesOrDescriptionsStrict"
          :value="titlesOrDescriptionsStrict"
          :setValue="setFormParams"
          entity="budgets"
          :label="$t('search.strict')"
      />
      <search-input
          name="titlesOrDescriptions"
          :value="titlesOrDescriptions"
          :setValue="setFormParams"
          prefixIcon
          :placeholder="$t('search.titles_or_descriptions')"
      />
      <button class="search-form__btn search-form__btn_search" />
      <button
          @click="actionExpand"
          :class="moreCriterions ? 'search-form__btn search-form__btn_more search-form__btn_more_close': 'search-form__btn search-form__btn_more search-form__btn_more_open'"
      />
    </div>

    <el-collapse-transition name="el-zoom-in-top">
      <div v-show="moreCriterions">
        <div class="search-form-more">
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12">

              <!-- Buyers names -->
              <div class="search-form-element">
                <multiple-input
                    name="buyersNames"
                    :values="buyersNames"
                    :setValues="setFormParams"
                    :placeholder="$t('search.buyers_names_placeholder')"
                />
              </div>

              <!-- Buyers identifiers -->
              <div class="search-form-element">
                <multiple-input
                    name="buyersIdentifiers"
                    :values="buyersIdentifiers"
                    :setValues="setFormParams"
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
                    :placeholder="$t('search.buyers_main_sectoral_activity_placeholder')"
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
                    :placeholder="$t('search.buyers_region_placeholder')"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12">

              <!-- Period Planning -->
              <div class="search-form-element">
                <search-period
                    name="periodPlanning"
                    :value="periodPlanning"
                    :setValue="setFormParams"
                >
                  {{$t("search.planning_period")}}
                </search-period>
              </div>

              <!-- Amount from -->
              <div class="search-form-element">
                <search-input
                    name="amountFrom"
                    type="number"
                    prefixIcon
                    :value="amountFrom"
                    :setValue="setFormParams"
                    :placeholder="$t('search.amount_from')"
                />
              </div>

              <!-- Amount to -->
              <div class="search-form-element">
                <search-input
                    name="amountTo"
                    type="number"
                    prefixIcon
                    :value="amountTo"
                    :setValue="setFormParams"
                    :placeholder="$t('search.amount_to')"
                />
              </div>

              <!-- Classifications -->
              <div class="search-form-element">
               <search-classifications
                    name="classifications"
                    :items="CPVCodesList"
                    :values="classifications"
                    :setValues="setFormParams"
                    :placeholder="$t('search.classifications_placeholder')"
                />
              </div>

              <!-- id -->
              <div class="search-form-element">
                <search-input
                    name="id"
                    :value="id"
                    :setValue="setFormParams"
                    :placeholder="$t('search.id_placeholder')"
                    prefixIcon=""
                />
              </div>
            </el-col>
          </el-row>
          <!-- Reset button -->
          <div class=" search-form__reset-button-wp">
            <reset-button
                entity="budgets"
            />
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

  import SearchInput from "./../FormsComponents/SearchInput";
  import SearchSwitch from "../FormsComponents/SearchStrictButton";
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
      "search-input": SearchInput,
      "search-switch": SearchSwitch,
      "search-auto-complete-input": SearchAutoCompleteInput,
      "search-regions": SearchRegions,
      "search-classifications": SearchClassifications,
      "search-period": SearchPeriods,
      "multiple-input": MultipleInput,
      "reset-button": ResetButton
    },
    created() {
      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
      if (localStorageEntities.budgets.hasOwnProperty("isExpanded")) {
        this.moreCriterions = localStorageEntities.budgets.isExpanded;
      }
      else {
        localStorageEntities.budgets.isExpanded = this.moreCriterions;
        localStorage.setItem("entities", JSON.stringify(localStorageEntities));
      }
    },
    data() {
      return {
        moreCriterions: false,
        buyersTypesList,
        mainGeneralActivityList,
        mainSectoralActivityList
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
        CPVCodesList: state => state.mdm[CPV_CODES]
      })
    },
    methods: {
      setFormParams(name, value) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entityName: "budgets",
          params: {
            page: 1,
            [name]: value
          }
        });
      },
      actionExpand() {
        this.moreCriterions = !this.moreCriterions;

        const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
        localStorageEntities.budgets.isExpanded = this.moreCriterions;
        localStorage.setItem("entities", JSON.stringify(localStorageEntities));
      }
    }
  };
</script>
