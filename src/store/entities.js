import axios from "axios";
import { getListConfig, getTenderConfig } from "./../configs/requests-configs";

import {
  SET_ENTITY_LIST,
  SET_ENTITY_PAGINATION_INFO,
  SET_ENTITY_SEARCH_PARAMS,

  SET_CURRENT_TENDER_INFO
} from "./types/mutations-types";
import {
  FETCH_ENTITY_LIST,
  FETCH_CURRENT_TENDER_INFO
} from "./types/actions-types";

import { MTENDER1, MTENDER2 } from "./types/cbd-types";

import { convertObjectToQueryParamsString } from "./../utils";

export default {
  state: {
    budgets: {
      name: "message.entity_budgets",
      list: [],
      searchParams: {
        titlesOrDescriptions: "",
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
      currentTender: {
        cdb: "",
        tenderData: {},
        hasAuction: false,
        hasDocuments: false,
        hasContract: false
      },
      searchParams: {
        titlesOrDescriptions: "",
        titlesOrDescriptionsStrict: false,

        buyersRegions: [],
        deliveriesRegions: [],

        proceduresTypes: [],
        proceduresStatuses: [],

        entityId: "",

        amountFrom: null,
        amountTo: null,

        classifications: [],

        periodPublished: [],
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

        page: 1,
        pageSize: 25
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    },
    contracts: {
      name: "message.entity_contracts",
      list: [],
      searchParams: {
        titlesOrDescriptions: "",
        page: 1,
        pageSize: 25
      },
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

    [SET_ENTITY_SEARCH_PARAMS](state, {entity, params}) {
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
    },

    [SET_CURRENT_TENDER_INFO](state, {cdb, tenderData, hasAuction, hasDocuments}) {
      state.tenders.currentTender = {
        cdb,
        tenderData,
        hasAuction,
        hasDocuments
      };
    }
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

    async [FETCH_CURRENT_TENDER_INFO]({commit}, {cdb, id}) {
      try {
        const res = await axios(getTenderConfig(cdb, id));

        let hasAuction;
        let hasDocuments;

        if (cdb === MTENDER1) {
          const tender = res.data.data;

          hasAuction = tender.hasOwnProperty("auctionPeriod"); // @TODO need clarify condition
          hasDocuments = tender.hasOwnProperty("documents") && Array.isArray(tender.documents) && tender.documents.length;
        }

        commit(SET_CURRENT_TENDER_INFO, {
          cdb,
          tenderData: res.data,
          hasAuction,
          hasDocuments
        });
      }
      catch (e) {

      }
    }
  }
};
