import axios from "axios";
import VueI18n  from "./../i18n/index";

import { getBudgetConfig, getListConfig, getTenderConfig, getContractConfig } from "./../configs/requests-configs";

import initialSearchProps from "./types/initial-search-props";

import {
  SET_ENTITY_LOADED,
  SET_ENTITY_LOADED_ERROR,

  SET_ENTITY_LIST,
  SET_ENTITY_PAGINATION_INFO,
  SET_ENTITY_SEARCH_PARAMS,

  SET_CURRENT_TENDER_INFO,
  SET_CURRENT_BUDGET_INFO,
  SET_CURRENT_CONTRACT_INFO,

  SET_INITIAL_SEARCH_PARAMS
} from "./types/mutations-types";
import {
  FETCH_ENTITY_LIST,
  FETCH_CURRENT_TENDER_INFO,
  FETCH_CURRENT_BUDGET_INFO, FETCH_CURRENT_CONTRACT_INFO
} from "./types/actions-types";

import { MTENDER1, MTENDER2 } from "./types/cbd-types";

import { convertObjectToQueryParamsString } from "./../utils";

if (!localStorage.getItem("entities")) {
  const entities = {
    "budgets": {
      searchParams: initialSearchProps.budgets
    },
    "plans": {
      searchParams: initialSearchProps.plans
    },
    "tenders": {
      searchParams: initialSearchProps.tenders
    },
    "contracts": {
      searchParams: initialSearchProps.contracts
    }
  };

  localStorage.setItem("entities", JSON.stringify(entities));
}

const localStorageEntities = JSON.parse(localStorage.getItem("entities"));

export default {
  state: {
    /*budgets: {
     name: "entities.budgets",
     loaded: false,
     list: [],
     searchParams: {...localStorageEntities.budgets.searchParams},
     paginationInfo: {
     totalCount: 0, pageCount: 0
     }
     },*/
    plans: {
      name: "entities.plans",
      loaded: false,
      error: {
        status: false,
        message: ""
      },
      list: [],
      searchParams: { ...localStorageEntities.plans.searchParams },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    },
    tenders: {
      name: "entities.tenders",
      loaded: false,
      error: {
        status: false,
        message: ""
      },
      list: [],
      searchParams: { ...localStorageEntities.tenders.searchParams },
      currentTender: {
        cdb: "",
        tenderData: {},
        loaded: false,
        error: {
          status: false,
          message: ""
        }
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    },
    contracts: {
      name: "entities.contracts",
      loaded: false,
      error: {
        status: false,
        message: ""
      },
      list: [],
      searchParams: { ...localStorageEntities.contracts.searchParams },
      currentContract: {
        cdb: "",
        contractData: {},
        loaded: false,
        error: {
          status: false,
          message: ""
        }
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0
      }
    }
  },
  mutations: {
    [SET_ENTITY_LOADED](state, { entity, loaded }) {
      state[entity].loaded = loaded;
    },

    [SET_ENTITY_LOADED_ERROR](state, { entity, error }) {
      state[entity].error = {
        status: error.status,
        message: error.message
      };
    },

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

    [SET_CURRENT_TENDER_INFO](state, { entity, cdb, tenderData }) {
      state.tenders.currentTender = {
        cdb,
        tenderData
      };
    },

    [SET_CURRENT_CONTRACT_INFO](state, { cdb, contractData }) {
      state.contracts.currentContract = {
        cdb,
        contractData
      };
    },

    [SET_INITIAL_SEARCH_PARAMS](state, { entity }) {
      state[entity].searchParams = initialSearchProps[entity];

      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));

      localStorageEntities[entity].searchParams = initialSearchProps[entity];
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));

      this.dispatch(FETCH_ENTITY_LIST, {
        entity: entity,
        params: convertObjectToQueryParamsString(state[entity].searchParams)
      });
    }
  },
  actions: {
    async [FETCH_ENTITY_LIST]({ commit }, { entity, params }) {
      commit(SET_ENTITY_LOADED, {
        entity,
        loaded: false
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entity,
        error: {
          status: false,
          message: ""
        }
      });

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

        commit(SET_ENTITY_LOADED, {
          entity,
          loaded: true
        });
      }
      catch (e) {
        commit(SET_ENTITY_LOADED, {
          entity,
          loaded: true
        });

        commit(SET_ENTITY_LOADED_ERROR, {
          entity,
          error: {
            status: true,
            message: e.message
          }
        });
      }
    },

    async [FETCH_CURRENT_BUDGET_INFO]({ commit }, { id }) {
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

    async [FETCH_CURRENT_TENDER_INFO]({ commit }, { cdb, id }) {

      const entity = "tenders";

      commit(SET_ENTITY_LOADED, {
        entity,
        loaded: false
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entity,
        error: {
          status: false,
          message: ""
        }
      });
      if (cdb === MTENDER1) {
        try {
          const elasticRes = await axios(getListConfig("tenders", `?entityId=${id}`));

          if (elasticRes.data.data.length) {
            const requestId = elasticRes.data.data[0].id;

            const res = await axios(getTenderConfig(cdb, requestId));

            const tenderData = res.data.data;

            commit(SET_CURRENT_TENDER_INFO, {
              cdb,
              tenderData
            });
            commit(SET_ENTITY_LOADED, {
              entity,
              loaded: true
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entity,
              error: {
                status: false,
                message: ""
              }
            });
          } else {
            commit(SET_ENTITY_LOADED, {
              entity,
              loaded: true
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entity,
              error: {
                status: true,
                message:  VueI18n.t("invalid-id")
              }
            });
          }
        }
        catch (e) {
          commit(SET_ENTITY_LOADED, {
            entity,
            loaded: true
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entity,
            error: {
              status: true,
              message: e.message
            }
          });
        }
      } else {
        try {
          const res = await axios(getTenderConfig(cdb, id));
          const tenderData = {};

          const MSRecord = {};
          const EVRecord = {};

          if (cdb === MTENDER2) {
            if (Object.keys(res.data).length) {
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
              });

              commit(SET_CURRENT_TENDER_INFO, {
                cdb,
                tenderData
              });
              commit(SET_ENTITY_LOADED, {
                entity,
                loaded: true
              });

              commit(SET_ENTITY_LOADED_ERROR, {
                entity,
                error: {
                  status: false,
                  message: ""
                }
              });
            }
            else {
              commit(SET_ENTITY_LOADED, {
                entity,
                loaded: true
              });

              commit(SET_ENTITY_LOADED_ERROR, {
                entity,
                error: {
                  status: true,
                  message:  VueI18n.t("invalid-id")
                }
              });
            }
          }

        }
        catch (e) {
          commit(SET_ENTITY_LOADED, {
            entity,
            loaded: true
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entity,
            error: {
              status: true,
              message: e.message
            }
          });
        }
      }
    },

    async [FETCH_CURRENT_CONTRACT_INFO]({ commit }, { cdb, id }) {
      const entity = "contracts";

      commit(SET_ENTITY_LOADED, {
        entity,
        loaded: false
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entity,
        error: {
          status: false,
          message: ""
        }
      });
      if (cdb === MTENDER1) {
        try {
          const elasticRes = await axios(getListConfig("contracts", `?entityId=${id}`));
          if (elasticRes.data.data.length) {
            const requestId = elasticRes.data.data[0].id;

            const res = await axios(getContractConfig(cdb, requestId));

            const contractData = res.data.data;

            commit(SET_CURRENT_CONTRACT_INFO, {
              cdb,
              contractData
            });
            commit(SET_ENTITY_LOADED, {
              entity,
              loaded: true
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entity,
              error: {
                status: false,
                message: ""
              }
            });
          } else {
            commit(SET_ENTITY_LOADED, {
              entity,
              loaded: true
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entity,
              error: {
                status: true,
                message: VueI18n.t("invalid-id")
              }
            });
          }

        }
        catch (e) {
          commit(SET_ENTITY_LOADED, {
            entity,
            loaded: true
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entity,
            error: {
              status: true,
              message: e.message
            }
          });
        }
      }
    }
  }
};
