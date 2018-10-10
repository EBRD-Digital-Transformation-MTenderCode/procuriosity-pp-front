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
      currentTender: {
        cdb: "",
        tenderData: {}
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

    [SET_CURRENT_TENDER_INFO](state, {cdb, tenderData}) {
      state.tenders.currentTender = {
        cdb,
        tenderData
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
