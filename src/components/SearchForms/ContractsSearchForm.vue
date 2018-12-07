<template>
  <div>
    <div class="main-search">
      <!-- Strict search -->
      <search-switch
        name="titlesOrDescriptionsStrict"
        entity="contracts"
        :value="titlesOrDescriptionsStrict"
        :setValue="setFormParams"
        :label="$t('search.strict')"
      />

      <!-- Titles or descriptions -->
      <search-input
        name="titlesOrDescriptions"
        :value="titlesOrDescriptions"
        :setValue="setFormParams"
        prefixIcon
        :placeholder="$t('search.titles_or_descriptions')"
      />
      <button class="search-form__btn search-form__btn_search" tabindex="-1" />

      <!-- @TODO need write more readable classes -->
      <button
        tabindex="-1"
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

            </el-col>
            <el-col :xs="24" :sm="12">

               <!-- Delivery regions -->
              <div class="search-form-element">
                <search-regions
                    name="deliveriesRegions"
                    :items="regionsList"
                    :values="deliveriesRegions"
                    :setValues="setFormParams"
                    needFetch
                    :placeholder="$t('search.deliveries_regions_placeholder')"
                />
              </div>
              
              <!-- Procedure types -->
              <div class="search-form-element">
                <search-auto-complete-input
                  name="proceduresTypes"
                  :items="proceduresTypesList"
                  :values="proceduresTypes"
                  :setValues="setFormParams"
                  :placeholder="$t('search.types_procedures_placeholder')"
                />
              </div>

              <!-- Procedure statuses -->
              <div class="search-form-element">
                <search-auto-complete-input
                  name="proceduresStatuses"
                  :items="proceduresStatusesList"
                  :values="proceduresStatuses"
                  :setValues="setFormParams"
                  :placeholder="$t('search.statuses_procedures_placeholder')"
                />
              </div>

              <!-- Period published -->
              <div class="search-form-element">
                <search-period
                  name="periodPublished"
                  :value="periodPublished"
                  :setValue="setFormParams"
                >
                  {{$t("search.published_period")}}:
                </search-period>
              </div>

              <!-- Period delivery -->
              <div class="search-form-element">
                <search-period
                  name="periodDelivery"
                  :value="periodDelivery"
                  :setValue="setFormParams"
                >
                  {{$t("search.delivery_period")}}:
                </search-period>
              </div>

              <!-- Period enquiry -->
              <!--<div class="search-form-element">
                <search-period
                    name="periodEnquiry"
                    :value="periodEnquiry"
                    :setValue="setFormParams"
                >
                  {{$t("search.enquiry_period")}}:
                </search-period>
              </div>-->

              <!-- Period offer -->
              <!--<div class="search-form-element">
                <search-period
                    name="periodOffer"
                    :value="periodOffer"
                    :setValue="setFormParams"
                >
                  {{$t("search.offer_period")}}:
                </search-period>
              </div>-->

              <!-- Period auction -->
              <!--<div class="search-form-element">
                <search-period
                    name="periodAuction"
                    :value="periodAuction"
                    :setValue="setFormParams"
                >
                  {{$t("search.auction_period")}}:
                </search-period>
              </div>-->

              <!-- Period Award -->
              <!--<div class="search-form-element">
                <search-period
                    name="periodAward"
                    :value="periodAward"
                    :setValue="setFormParams"
                >
                  {{$t("search.award_period")}}:
                </search-period>
              </div>-->

              <!-- id -->
              <div class="search-form-element">
                <search-input
                  name="entityId"
                  :value="entityId"
                  :setValue="setFormParams"
                  :placeholder="$t('search.id_placeholder')"
                  prefixIcon=""
                />
              </div>

              <!-- Classifications -->
              <div class="search-form-element">
                <search-classifications
                  name="classifications"
                  :items="CPVCodesList"
                  :values="classifications"
                  :setValues="setFormParams"
                  needFetch
                  :placeholder="$t('search.classifications_placeholder')"
                />
              </div>
            </el-col>
          </el-row>
          <!-- Reset button -->
          <div class=" search-form__reset-button-wp">
            <reset-button entity="contracts" />
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
  import MultipleInput from "./../FormsComponents/MultipleInput";
  import ResetButton from "./../FormsComponents/ResetButton";

  import proceduresTypesList from "./../../store/types/procedures-types";
  import proceduresStatusesList from "./../../store/types/procedure-status-types";
  import buyersTypesList from "./../../store/types/buyers-types";
  import mainGeneralActivityList from "./../../store/types/main-general-activity-types";
  import mainSectoralActivityList from "./../../store/types/main-sectoral-activity";

  export default {
    name: "ContractsSearchForm",
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
    data() {
      return {
        moreCriterions: false,
        proceduresTypesList: proceduresTypesList["contracts"],
        proceduresStatusesList: proceduresStatusesList["contracts"],
        buyersTypesList,
        mainGeneralActivityList,
        mainSectoralActivityList
      };
    },
    computed: {
      ...mapState({
        /* + */
        titlesOrDescriptions: state => state.entities.contracts.searchParams.titlesOrDescriptions,
        /* + */
        titlesOrDescriptionsStrict: state => state.entities.contracts.searchParams.titlesOrDescriptionsStrict,

        /* + */
        buyersRegions: state => state.entities.contracts.searchParams.buyersRegions,
        /* + */
        deliveriesRegions: state => state.entities.contracts.searchParams.deliveriesRegions,

        /* + */
        proceduresTypes: state => state.entities.contracts.searchParams.proceduresTypes,
        /* + */
        proceduresStatuses: state => state.entities.contracts.searchParams.proceduresStatuses,

        /* + */
        entityId: state => state.entities.contracts.searchParams.entityId,

        /* + */
        amountFrom: state => state.entities.contracts.searchParams.amountFrom,
        /* + */
        amountTo: state => state.entities.contracts.searchParams.amountTo,

        /* + */
        classifications: state => state.entities.contracts.searchParams.classifications,

        /* + */
        periodPublished: state => state.entities.contracts.searchParams.periodPublished,
        /* + */
        periodDelivery: state => state.entities.contracts.searchParams.periodDelivery,
        /* + */
        periodEnquiry: state => state.entities.contracts.searchParams.periodEnquiry,
        /* + */
        periodOffer: state => state.entities.contracts.searchParams.periodOffer,
        /* + */
        periodAuction: state => state.entities.contracts.searchParams.periodAuction,
        /* + */
        periodAward: state => state.entities.contracts.searchParams.periodAward,

        /* + */
        buyersNames: state => state.entities.contracts.searchParams.buyersNames,
        /* + */
        buyersIdentifiers: state => state.entities.contracts.searchParams.buyersIdentifiers,
        /* + */
        buyersTypes: state => state.entities.contracts.searchParams.buyersTypes,
        /* + */
        buyersMainGeneralActivities: state => state.entities.contracts.searchParams.buyersMainGeneralActivities,
        /* + */
        buyersMainSectoralActivities: state => state.entities.contracts.searchParams.buyersMainSectoralActivities,

        regionsList: state => state.mdm[REGIONS],
        CPVCodesList: state => state.mdm[CPV_CODES]
      })
    },
    methods: {
      setFormParams(name, value) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entityName: "contracts",
          params: {
            page: 1,
            [name]: value
          }
        });
      },
      actionExpand() {
        this.moreCriterions = !this.moreCriterions;

        const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
        localStorageEntities.contracts.isExpanded = this.moreCriterions;
        localStorage.setItem("entities", JSON.stringify(localStorageEntities));
      }
    },
    created() {
      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
      if (localStorageEntities.contracts.hasOwnProperty("isExpanded")) {
        this.moreCriterions = localStorageEntities.contracts.isExpanded;
      }
      else {
        localStorageEntities.contracts.isExpanded = this.moreCriterions;
        localStorage.setItem("entities", JSON.stringify(localStorageEntities));
      }
    }
  };
</script>
