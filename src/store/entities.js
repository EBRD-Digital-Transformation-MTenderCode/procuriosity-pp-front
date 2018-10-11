import axios from "axios";
import { getBudgetConfig, getListConfig, getTenderConfig } from "./../configs/requests-configs";

import initialSearchProps from "./types/initial-search-props"

import {
  SET_ENTITY_LIST,
  SET_ENTITY_PAGINATION_INFO,
  SET_ENTITY_SEARCH_PARAMS,

  SET_CURRENT_TENDER_INFO,
  SET_CURRENT_BUDGET_INFO,

  SET_INITIAL_SEARCH_PARAMS
} from "./types/mutations-types";
import {
  FETCH_ENTITY_LIST,
  FETCH_CURRENT_TENDER_INFO,
  FETCH_CURRENT_BUDGET_INFO
} from "./types/actions-types";

import { MTENDER1, MTENDER2 } from "./types/cbd-types";

import { convertObjectToQueryParamsString } from "./../utils";


if(!localStorage.getItem("entities")){
  const entities = {
    "budgets":{
      searchParams: {}
    },
    "plans":{
      searchParams: {}
    },
    "tenders":{
      searchParams: {}
    },
    "contracts":{
      searchParams: {}
    }};
  localStorage.setItem("entities", JSON.stringify(entities));
}

const localStorageEntities =  JSON.parse(localStorage.getItem("entities"));

Object.entries(localStorageEntities).forEach(([key,val]) => {
  switch (key) {
    case "tenders":
      if(val.hasOwnProperty("searchParams") && !Object.keys(val.searchParams).length){
        val.searchParams= initialSearchProps.tenders;
      }
      break;

    case "budgets":
      if(val.hasOwnProperty("searchParams") && !Object.keys(val.searchParams).length) {
        val.searchParams = initialSearchProps.budgets;
      }
      break;


    case "plans":
      if(val.hasOwnProperty("searchParams") && !Object.keys(val.searchParams).length) {
        val.searchParams = initialSearchProps.plans;
      }
      break;

    case "contracts":
      if(val.hasOwnProperty("searchParams") && !Object.keys(val.searchParams).length) {
        val.searchParams = initialSearchProps.contracts;
      }
      break;

    default:
      return;

  }
});
localStorage.setItem("entities", JSON.stringify(localStorageEntities));

export default {
  state: {
    budgets: {
      name: "message.entity_budgets",
      list: [],
      searchParams: {
        titlesOrDescriptions: "",
        titlesOrDescriptionsStrict: false,

        buyersRegions: [],
        budgetStatuses:[],

        id: "",

        amountFrom: null,
        amountTo: null,

        classifications: [],

        periodPlanning: [],

        buyersNames: [],
        buyersIdentifiers: [],
        buyersTypes: [],
        buyersMainGeneralActivities: [],
        buyersMainSectoralActivities: [],

        page: 1,
        pageSize: 25
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    },
    plans: {
      name: "message.entity_plans",
      list: [],
      searchParams: {
        titlesOrDescriptions: "",
        titlesOrDescriptionsStrict: false,

        entityId: "",

        buyersRegions:[],
        deliveriesRegions: [],
        proceduresTypes: [],
        proceduresStatuses:[],

        amountFrom: null,
        amountTo: null,

        classifications: [],

        periodPublished:[],
        periodDelivery: [],
        periodEnquiry: [],
        periodOffer: [],
        periodAuction: [],
        periodAward: [],

        buyersNames: [],
        buyersIdentifiers: [],
        buyersTypes: [],
        buyersMainGeneralActivities: [],
        buyersMainSectoralActivities: [],

        tags: [],

        page: 1,
        pageSize: 25
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    },
    tenders: {
      name: "message.entity_tenders",
      list: [],
      searchParams:{...localStorageEntities.tenders.searchParams},
      currentTender: {
        cdb: "",
        tenderData: {}
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    },
    contracts: {
      name: "message.entity_contracts",
      list: [],
      searchParams:{...localStorageEntities.contracts.searchParams},
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    }
  },
  mutations: {
    [SET_ENTITY_LIST](state, payload) {
      state[payload.entity] = {
        ...state[payload.entity],
        list: payload.list
      };
    },

    [SET_ENTITY_PAGINATION_INFO](state, payload) {
      state[payload.entity] = {
        ...state[payload.entity],
        paginationInfo: {
          totalCount: payload.totalCount,
          pageCount: payload.pageCount
        }
      };
    },

    [SET_ENTITY_SEARCH_PARAMS](state, { entity, params }) {
      state[entity] = {
        ...state[entity],
        searchParams: {
          ...state[entity].searchParams,
          ...params
        }
      };

      this.dispatch(FETCH_ENTITY_LIST, {
        entity: entity,
        params: convertObjectToQueryParamsString(state[entity].searchParams)
      });
      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
      localStorageEntities[entity].searchParams = {
        ...localStorageEntities[entity].searchParams,
        ...params
      };
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));
    },

    [SET_CURRENT_BUDGET_INFO](state, { budgetData }) {
      state.tenders.currentTender = {
        budgetData
      };
    },

    [SET_CURRENT_TENDER_INFO](state, {cdb, tenderData}) {
      state.tenders.currentTender = {
        cdb,
        tenderData
      };
    },
    [SET_INITIAL_SEARCH_PARAMS](state, { entity }) {
      state[entity].searchParams = initialSearchProps[entity];
      const localStorageEntities =  JSON.parse(localStorage.getItem("entities"));
      localStorageEntities[entity].searchParams = initialSearchProps[entity];
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));


    },
  },
  actions: {
    async [FETCH_ENTITY_LIST]({commit}, {entity, params}) {
      try {
        const res = await axios(getListConfig(entity, params));

        commit(SET_ENTITY_LIST, {
          entity,
          list: res.data.data
        });

        commit(SET_ENTITY_PAGINATION_INFO, {
          entity,
          totalCount: res.data._meta.totalCount,
          pageCount: res.data._meta.pageCount
        });
      }
      catch (e) {
        console.log(e.message);
      }
    },
    async [FETCH_CURRENT_BUDGET_INFO]({commit}, {id}) {
      try {
        const res = await axios(getBudgetConfig(id));
        console.log(res);

        commit(SET_CURRENT_BUDGET_INFO, {
          budgetData: res.data
        });
      }
      catch (e) {
    console.log(e);
      }
    },

    async [FETCH_CURRENT_TENDER_INFO]({commit}, {cdb, id}) {
      try {
        const res = await axios(getTenderConfig(cdb, id));

        const tenderData = {};

        const MSRecord = {};
        const EVRecord = {};

        if (cdb === MTENDER1) {
          Object.assign(tenderData, res.data.data);

        }

        if (cdb === MTENDER2){
          const tenderRecords = res.data.records;
          tenderRecords.forEach(record => {
            if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/) !== -1) {
              Object.assign(MSRecord, record);
            }
            if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-EV-[0-9]{13}$/) !== -1) {
              Object.assign(EVRecord, record);
            }
          });

          Object.assign(tenderData, {
            MSRecord,
            EVRecord
          })
        }

        commit(SET_CURRENT_TENDER_INFO, {
          cdb,
          tenderData
        });
      }
      catch (e) {
        // @TODO need add catching errors
        console.log(e);
      }
    }
  }
};
