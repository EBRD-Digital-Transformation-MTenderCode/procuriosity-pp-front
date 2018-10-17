<template>
  <div>
    <div class="main-search">
      <!-- Strict search -->
      <search-switch
          name="titlesOrDescriptionsStrict"
          :value="titlesOrDescriptionsStrict"
          :setValue="setFormParams"
          :label="$t('message.search_strict')"
      />

      <!-- Titles or descriptions -->
      <search-input
          name="titlesOrDescriptions"
          :value="titlesOrDescriptions"
          :setValue="setFormParams"
          prefixIcon
          :placeholder="$t('message.search_titles_or_descriptions')"
      />
      <button class="search-form__btn search-form__btn_search" />

      <!-- @TODO need write more readable classes -->
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
                    :placeholder="$t('message.search_buyers_names_placeholder')"
                />
              </div>
              
              <!-- Buyers regions -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersRegions"
                    :items="regionsList"
                    :values="buyersRegions"
                    :setValues="setFormParams"
                    needFetch
                    :placeholder="$t('message.search_buyers_region_placeholder')"
                />
              </div>
  
              <!-- Buyers identifiers -->
              <div class="search-form-element">
                <multiple-input
                    name="buyersIdentifiers"
                    :values="buyersIdentifiers"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_buyers_identifiers_placeholder')"
                />
              </div>
  
              <!-- Types of buyers -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersTypes"
                    :items="buyersTypesList"
                    :values="buyersTypes"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_buyers_types_placeholder')"
                />
              </div>
  
              <!-- Main general activity -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersMainGeneralActivities"
                    :items="mainGeneralActivityList"
                    :values="buyersMainGeneralActivities"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_buyers_main_general_activity_placeholder')"
                />
              </div>
  
              <!-- Main sectoral activity -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersMainSectoralActivities"
                    :items="mainSectoralActivityList"
                    :values="buyersMainSectoralActivities"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_buyers_main_sectoral_activity_placeholder')"
                />
              </div>

              <!-- Amount from -->
              <div class="search-form-element">
                <search-input
                    name="amountFrom"
                    type="number"
                    prefixIcon
                    :value="amountFrom"
                    :setValue="setFormParams"
                    :placeholder="$t('message.search_amount_from')"
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
                    :placeholder="$t('message.search_amount_to')"
                />
              </div>
            </el-col>
            <el-col :xs="24" :sm="12">

              <!-- Procedure types -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="proceduresTypes"
                    :items="proceduresTypesList"
                    :values="proceduresTypes"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_types_procedures_placeholder')"
                />
              </div>
  
              <!-- Procedure statuses -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="proceduresStatuses"
                    :items="proceduresStatusesList"
                    :values="proceduresStatuses"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_statuses_procedures_placeholder')"
                />
              </div>
  
              <!-- Delivery regions -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="deliveriesRegions"
                    :items="regionsList"
                    :values="deliveriesRegions"
                    :setValues="setFormParams"
                    needFetch
                    :placeholder="$t('message.search_deliveries_regions_placeholder')"
                />
              </div>
              
              <!-- Period published -->
              <div class="search-form-element">
                <search-period
                    name="periodPublished"
                    :value="periodPublished"
                    :setValue="setFormParams"
                >
                  {{$t("message.search_published_period")}}:
                </search-period>
              </div>

              <!-- Period delivery -->
              <div class="search-form-element">
                <search-period
                    name="periodDelivery"
                    :value="periodDelivery"
                    :setValue="setFormParams"
                >
                  {{$t("message.search_delivery_period")}}:
                </search-period>
              </div>

              <!-- id -->
              <div class="search-form-element">
                <search-input
                    name="entityId"
                    :value="entityId"
                    :setValue="setFormParams"
                    :placeholder="$t('message.search_id_placeholder')"
                    prefixIcon=""
                />
              </div>

              <!-- Classifications -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="classifications"
                    :items="CPVCodesList"
                    :values="classifications"
                    :setValues="setFormParams"
                    needFetch
                    :placeholder="$t('message.search_classifications_placeholder')"
                />
              </div>
            </el-col>
          </el-row>
          <!-- Reset button -->
          <div class=" search-form__reset-button-wp">
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

  import SearchInput from "./../FormsComponents/SearchInput";
  import SearchSwitch from "../FormsComponents/SearchCheckboxButton";
  import SearchAutoCompleteInput from "./../FormsComponents/SearchAutoCompleteInput";
  import SearchPeriods from "./../FormsComponents/SearchPeriods";

  import proceduresTypesList from "./../../store/types/procedures-types";
  import proceduresStatusesList from "./../../store/types/procedure-status-types";
  import buyersTypesList from "./../../store/types/buyers-types";
  import mainGeneralActivityList from "./../../store/types/main-general-activity-types";
  import mainSectoralActivityList from "./../../store/types/main-sectoral-activity";
  import MultipleInput from "../FormsComponents/MultipleInput";
  import ResetButton from "../FormsComponents/ResetButton"

  export default {
    name: "PlansSearchForm",
    components: {
      "search-input": SearchInput,
      "search-switch": SearchSwitch,
      "search-auto-complete-input": SearchAutoCompleteInput,
      "search-period": SearchPeriods,
      "multiple-input": MultipleInput,
      "reset-button": ResetButton
    },
    data() {
      return {
        moreCriterions: false,
        proceduresTypesList: proceduresTypesList["plans"],
        proceduresStatusesList: proceduresStatusesList["plans"],
        buyersTypesList,
        mainGeneralActivityList,
        mainSectoralActivityList
      };
    },
    computed: {
      ...mapState({
        /* + */titlesOrDescriptions: state => state.entities.plans.searchParams.titlesOrDescriptions,
        /* + */titlesOrDescriptionsStrict: state => state.entities.plans.searchParams.titlesOrDescriptionsStrict,

        /* + */buyersRegions: state => state.entities.plans.searchParams.buyersRegions,
        /* + */deliveriesRegions: state => state.entities.plans.searchParams.deliveriesRegions,

        /* + */proceduresTypes: state => state.entities.plans.searchParams.proceduresTypes,
        /* + */proceduresStatuses: state => state.entities.plans.searchParams.proceduresStatuses,

        /* + */entityId: state => state.entities.plans.searchParams.entityId,

        /* + */amountFrom: state => state.entities.plans.searchParams.amountFrom,
        /* + */amountTo: state => state.entities.plans.searchParams.amountTo,

        /* + */ classifications: state => state.entities.plans.searchParams.classifications,

        /* + */periodPublished: state => state.entities.plans.searchParams.periodPublished,
        /* + */periodDelivery: state => state.entities.plans.searchParams.periodDelivery,

        /* + */buyersNames: state => state.entities.plans.searchParams.buyersNames,
        /* + */buyersIdentifiers: state => state.entities.plans.searchParams.buyersIdentifiers,
        /* + */buyersTypes: state => state.entities.plans.searchParams.buyersTypes,
        /* + */buyersMainGeneralActivities: state => state.entities.plans.searchParams.buyersMainGeneralActivities,
        /* + */buyersMainSectoralActivities: state => state.entities.plans.searchParams.buyersMainSectoralActivities,

        regionsList: state => state.mdm[REGIONS],
        CPVCodesList: state => state.mdm[CPV_CODES]
      })
    },
    methods: {
      setFormParams(name, value) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entity: "plans",
          params: {
            page: 1,
            [name]: value
          }
        });
      },
      actionExpand() {
        this.moreCriterions = !this.moreCriterions;

        const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
        localStorageEntities.plans.isExpanded = this.moreCriterions;
        localStorage.setItem("entities", JSON.stringify(localStorageEntities));
      }
    },
    created() {
      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
      if (localStorageEntities.plans.hasOwnProperty("isExpanded")) {
        this.moreCriterions = localStorageEntities.plans.isExpanded;
      }
      else {
        localStorageEntities.plans.isExpanded = this.moreCriterions;
        localStorage.setItem("entities", JSON.stringify(localStorageEntities));
      }
    }
  };
</script>
