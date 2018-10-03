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
          placeholder="search"
      />
      <button class="search-form__btn search-form__btn_search" />
      
      <!-- @TODO need write more readable classes -->
       <button
           @click="moreCriterions = !moreCriterions"
           :class="moreCriterions ? 'search-form__btn search-form__btn_more search-form__btn_more_close': 'search-form__btn search-form__btn_more search-form__btn_more_open'"
       />
    </div>
    <el-collapse-transition name="el-zoom-in-top">
      <div v-show="moreCriterions">
        <div class="search-form-more">
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12">
              <!-- Buyers regions -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersRegions"
                    :directory="regionsDirectory"
                    :items="regionsList"
                    :values="buyersRegions"
                    :setValues="setFormParams"
                    remote
                    :placeholder="$t('message.search_region_placeholder')"
                    :params="{country: 'MD'}"
                />
              </div>
              
              <!-- Delivery regions -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="deliveriesRegions"
                    :directory="regionsDirectory"
                    :items="regionsList"
                    :values="deliveriesRegions"
                    :setValues="setFormParams"
                    remote
                    :placeholder="$t('message.search_deliveries_regions_placeholder')"
                    :params="{country: 'MD'}"
                />
              </div>
              
              <!-- Procedure types -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="proceduresTypes"
                    :items="proceduresTypesList"
                    :values="proceduresTypes"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_procedures_types_placeholder')"
                />
              </div>
              
              <!-- Procedure statuses -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="proceduresStatuses"
                    :items="proceduresStatusesList"
                    :values="proceduresStatuses"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_procedures_statuses_placeholder')"
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
              
              <!-- Buyers names -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersNames"
                    :values="buyersNames"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_procedures_buyers_names_placeholder')"
                />
              </div>

              <!-- Buyers identifiers -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersIdentifiers"
                    :values="buyersIdentifiers"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_procedures_buyers_identifiers_placeholder')"
                />
              </div>

              <!-- Types of buyers -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersTypes"
                    :items="buyersTypesList"
                    :values="buyersTypes"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_procedures_types_of_buyers_placeholder')"
                />
              </div>

              <!-- Main general activity -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersMainGeneralActivities"
                    :items="mainGeneralActivityList"
                    :values="buyersMainGeneralActivities"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_procedures_buyers_main_general_activity_placeholder')"
                />
              </div>

              <!-- Main sectoral activity -->
              <div class="search-form-element">
                <search-auto-complete-input
                    name="buyersMainSectoralActivities"
                    :items="mainSectoralActivityList"
                    :values="buyersMainSectoralActivities"
                    :setValues="setFormParams"
                    :placeholder="$t('message.search_procedures_buyers_main_sectoral_activity_placeholder')"
                />
              </div>
            </el-col>
            <el-col :xs="24" :sm="12">
               <!-- Period published -->
              <div class="search-form-element">
                <search-period
                    name="periodPublished"
                    :value="periodPublished"
                    :setValue="setFormParams"
                >
                  Published Period:
                </search-period>
              </div>
              
              <!-- Period delivery -->
              <div class="search-form-element">
                <search-period
                    name="periodDelivery"
                    :value="periodDelivery"
                    :setValue="setFormParams"
                >
                  Delivery Period:
                </search-period>
              </div>
              
              <!-- Period enquiry -->
              <div class="search-form-element">
                <search-period
                    name="periodEnquiry"
                    :value="periodEnquiry"
                    :setValue="setFormParams"
                >
                  Enquiry Period:
                </search-period>
              </div>
              
              <!-- Period offer -->
              <div class="search-form-element">
                <search-period
                    name="periodOffer"
                    :value="periodOffer"
                    :setValue="setFormParams"
                >
                  Offer Period:
                </search-period>
              </div>
              
              <!-- Period auction -->
              <div class="search-form-element">
                <search-period
                    name="periodAuction"
                    :value="periodAuction"
                    :setValue="setFormParams"
                >
                  Auction Period:
                </search-period>
              </div>
              
              <!-- Period Award -->
              <div class="search-form-element">
                <search-period
                    name="periodAward"
                    :value="periodAward"
                    :setValue="setFormParams"
                >
                  Award Period:
                </search-period>
              </div>
              
              <!-- id -->
              <div class="search-form-element">
                <search-input
                    name="entityId"
                    :value="entityId"
                    :setValue="setFormParams"
                    placeholder="ID"
                    prefixIcon=""
                />
              </div>
            </el-col>
          </el-row>

        </div>
        <!--
        <search-cpv
            name="classification"
            :directory="cpvCodesDirectory"
            :values="classification"
            :setValues="setFormParams"
        >
          CPV codes
        </search-cpv>
        -->
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { SET_ENTITY_SEARCH_PARAMS } from "../../store/types/mutations-types";
  import { REGIONS, CPV_CODES } from "./../../store/types/directories-types";

  import { Row, Col } from "element-ui";
  import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

  import SearchInput from "./../FormsComponents/SearchInput";
  import SearchSwitch from "../FormsComponents/SearchCheckboxButton";
  import SearchAutoCompleteInput from "./../FormsComponents/SearchAutoCompleteInput";
  import SearchCPV from "./../FormsComponents/SearchCPV";
  import SearchPeriods from "./../FormsComponents/SearchPeriods";

  import proceduresTypesList from "./../../store/types/procedures-types";
  import proceduresStatusesList from "./../../store/types/procedure-status-types";
  import buyersTypesList from "./../../store/types/buyers-types";
  import mainGeneralActivityList from "./../../store/types/main-general-activity-types";
  import mainSectoralActivityList from "./../../store/types/main-sectoral-activity";

  export default {
    name: "TendersSearchForm",
    components: {
      "el-collapse-transition": CollapseTransition,
      "el-row": Row,
      "el-col": Col,
      "search-input": SearchInput,
      "search-switch": SearchSwitch,
      "search-auto-complete-input": SearchAutoCompleteInput,
      "search-cpv": SearchCPV,
      "search-period": SearchPeriods
    },
    data() {
      return {
        moreCriterions: false,
        regionsDirectory: REGIONS,
        cpvCodesDirectory: CPV_CODES,
        proceduresTypesList: proceduresTypesList["tenders"],
        proceduresStatusesList: proceduresStatusesList["tenders"],
        buyersTypesList,
        mainGeneralActivityList,
        mainSectoralActivityList
      };
    },
    computed: {
      ...mapState({
        /* + */titlesOrDescriptions: state => state.entities.tenders.searchParams.titlesOrDescriptions,
        /* + */titlesOrDescriptionsStrict: state => state.entities.tenders.searchParams.titlesOrDescriptionsStrict,
  
        /* + */buyersRegions: state => state.entities.tenders.searchParams.buyersRegions,
        /* + */deliveriesRegions: state => state.entities.tenders.searchParams.deliveriesRegions,
  
        /* + */proceduresTypes: state => state.entities.tenders.searchParams.proceduresTypes,
        /* + */proceduresStatuses: state => state.entities.tenders.searchParams.proceduresStatuses,
  
        /* + */entityId: state => state.entities.tenders.searchParams.entityId,
  
        /* + */amountFrom: state => state.entities.tenders.searchParams.amountFrom,
        /* + */amountTo: state => state.entities.tenders.searchParams.amountTo,
      
        classifications: state => state.entities.tenders.searchParams.classifications,
      
        /* + */periodPublished: state => state.entities.tenders.searchParams.periodPublished,
        /* + */periodDelivery: state => state.entities.tenders.searchParams.periodDelivery,
        /* + */periodEnquiry: state => state.entities.tenders.searchParams.periodEnquiry,
        /* + */periodOffer: state => state.entities.tenders.searchParams.periodOffer,
        /* + */periodAuction: state => state.entities.tenders.searchParams.periodAuction,
        /* + */periodAward: state => state.entities.tenders.searchParams.periodAward,
  
        /* + */buyersNames: state => state.entities.tenders.searchParams.buyersNames,
        /* + */buyersIdentifiers: state => state.entities.tenders.searchParams.buyersIdentifiers,
        /* + */buyersTypes: state => state.entities.tenders.searchParams.buyersTypes,
        /* + */buyersMainGeneralActivities: state => state.entities.tenders.searchParams.buyersMainGeneralActivities,
        /* + */buyersMainSectoralActivities: state => state.entities.tenders.searchParams.buyersMainSectoralActivities,
      
        regionsList: state => state.mdm[REGIONS]
      })
    },
    methods: {
      setFormParams(name, value) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entity: "tenders",
          params: {
            [name]: value
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
