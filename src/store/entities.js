import axios from "axios";
import VueI18n from "./../i18n/index";

import {
  getListConfig,
  getBudgetConfig,
  getTenderConfig,
  getContractConfig,
  getPlanConfig,

} from "./../configs/requests-configs";

import initialSearchProps from "./types/initial-search-props";

import {
  SET_ENTITY_LOADED,
  SET_ENTITY_LOADED_ERROR,
  SET_ENTITY_LIST,
  SET_ENTITY_PAGINATION_INFO,
  SET_ENTITY_SEARCH_PARAMS,
  SET_CURRENT_ENTITY_INFO,
  SET_INITIAL_SEARCH_PARAMS,
} from "./types/mutations-types";
import {
  FETCH_ENTITY_LIST,
  FETCH_CURRENT_TENDER_INFO,
  FETCH_CURRENT_CONTRACT_INFO,
  FETCH_CURRENT_BUDGET_INFO,
  FETCH_CURRENT_PLAN_INFO,
} from "./types/actions-types";

import { MTENDER1, MTENDER2 } from "./types/cbd-types";

import { convertObjectToQueryParamsString } from "./../utils";

if (!localStorage.getItem("entities")) {
  const entities = {
    budgets: {
      searchParams: initialSearchProps.budgets,
    },
    plans: {
      searchParams: initialSearchProps.plans,
    },
    tenders: {
      searchParams: initialSearchProps.tenders,
    },
    contracts: {
      searchParams: initialSearchProps.contracts,
    },
  };

  localStorage.setItem("entities", JSON.stringify(entities));
}

const localStorageEntities = JSON.parse(localStorage.getItem("entities"));

export default {
  state: {
    budgets: {
      name: "entities.budgets",
      loaded: false,
      error: {
        status: false,
        message: "",
      },
      list: [],
      searchParams: { ...localStorageEntities.budgets.searchParams },
      currentEntity: {
        cdb: "",
        entityData: {
          EI: {},
          FSs: []
        },
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0,
      },
    },
    plans: {
      name: "entities.plans",
      loaded: false,
      error: {
        status: false,
        message: "",
      },
      list: [],
      searchParams: { ...localStorageEntities.plans.searchParams },
      currentEntity: {
        cdb: "",
        entityData: {},
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0,
      },
    },
    tenders: {
      name: "entities.tenders",
      loaded: false,
      error: {
        status: false,
        message: "",
      },
      list: [],
      searchParams: { ...localStorageEntities.tenders.searchParams },
      currentEntity: {
        cdb: "",
        entityData: {},
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0,
      },
    },
    contracts: {
      name: "entities.contracts",
      loaded: false,
      error: {
        status: false,
        message: "",
      },
      list: [],
      searchParams: { ...localStorageEntities.contracts.searchParams },
      currentEntity: {
        cdb: "",
        entityData: {},
      },
      paginationInfo: {
        totalCount: 0,
        pageCount: 0,
      },
    },
  },
  getters: {
    getSourceOfMoney: store => index => {
      const parties = store.budgets.currentEntity.entityData.FSs[index].compiledRelease.parties;
      const buyerId = store.budgets.currentEntity.entityData.EI.compiledRelease.buyer.id;

      let source = "";
      for (let part of parties) {
        if (part.roles.find(role => role === "funder")) {
          if (part.id === buyerId) {
            source = VueI18n.t("budget.own_money");
            break;
          }
          else source = VueI18n.t("budget.donors_money");
        }
      }
      return source || VueI18n.t("budget.state_money");
    },

  },
  mutations: {
    [SET_ENTITY_LOADED](state, { entityName, loaded }) {
      state[entityName].loaded = loaded;
    },

    [SET_ENTITY_LOADED_ERROR](state, { entityName, error }) {
      state[entityName].error = {
        status: error.status,
        message: error.message,
      };
    },

    [SET_ENTITY_LIST](state, { entityName, list }) {
      state[entityName] = {
        ...state[entityName],
        list,
      };
    },

    [SET_ENTITY_PAGINATION_INFO](state, { entityName, totalCount, pageCount }) {
      state[entityName] = {
        ...state[entityName],
        paginationInfo: {
          totalCount,
          pageCount,
        },
      };
    },

    [SET_ENTITY_SEARCH_PARAMS](state, { entityName, params }) {
      state[entityName] = {
        ...state[entityName],
        searchParams: {
          ...state[entityName].searchParams,
          ...params,
        },
      };

      this.dispatch(FETCH_ENTITY_LIST, {
        entityName,
        params: convertObjectToQueryParamsString(state[entityName].searchParams),
      });

      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
      localStorageEntities[entityName].searchParams = {
        ...localStorageEntities[entityName].searchParams,
        ...params,
      };
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));
    },

    [SET_CURRENT_ENTITY_INFO](state, { entityName, cdb, entityData }) {
      state[entityName] = {
        ...state[entityName],
        currentEntity: {
          ...state[entityName].currentEntity,
          cdb,
          entityData,
        },
      };
    },

    [SET_INITIAL_SEARCH_PARAMS](state, { entityName }) {
      state[entityName].searchParams = initialSearchProps[entityName];

      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));

      localStorageEntities[entityName].searchParams = initialSearchProps[entityName];
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));

      this.dispatch(FETCH_ENTITY_LIST, {
        entityName,
        params: convertObjectToQueryParamsString(state[entityName].searchParams),
      });
    },
  },
  actions: {
    async [FETCH_ENTITY_LIST]({ commit }, { entityName, params }) {
      commit(SET_ENTITY_LOADED, {
        entityName,
        loaded: false,
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entityName,
        error: {
          status: false,
          message: "",
        },
      });

      try {
        const res = await axios(getListConfig(entityName, params));

        commit(SET_ENTITY_LIST, {
          entityName,
          list: res.data.data,
        });

        commit(SET_ENTITY_PAGINATION_INFO, {
          entityName,
          totalCount: res.data._meta.totalCount,
          pageCount: res.data._meta.pageCount,
        });

        commit(SET_ENTITY_LOADED, {
          entityName,
          loaded: true,
        });
      } catch (e) {
        commit(SET_ENTITY_LOADED, {
          entityName,
          loaded: true,
        });

        commit(SET_ENTITY_LOADED_ERROR, {
          entityName,
          error: {
            status: true,
            message: e.message,
          },
        });
      }
    },

    async [FETCH_CURRENT_BUDGET_INFO]({ commit }, { id }) {
      const entityName = "budgets";
      commit(SET_ENTITY_LOADED, {
        entityName,
        loaded: false,
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entityName,
        error: {
          status: false,
          message: "",
        },
      });
      try {
        const { data } = await axios(getBudgetConfig(id));
        const entityData = data.records.reduce((acc, record) => {
          if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/)) {
            return {
              ...acc,
              EI: record
            };
          }
          else {
            return {
              ...acc,
              FSs: [
                ...acc.FSs,
                record
              ]
            };
          }
        }, {
          EI: {},
          FSs: []
        });
        commit(SET_CURRENT_ENTITY_INFO, {
          entityName,
          cdb: MTENDER2,
          entityData
        });

        commit(SET_ENTITY_LOADED_ERROR, {
          entityName,
          error: {
            status: false,
            message: "",
          },
        });
      }
      catch (e) {
        commit(SET_ENTITY_LOADED_ERROR, {
          entityName,
          error: {
            status: true,
            message: e.message,
          },
        });
      }
      finally {
        commit(SET_ENTITY_LOADED, {
          entityName,
          loaded: true,
        });
      }
    },

    async [FETCH_CURRENT_PLAN_INFO]({ commit }, { id }) {
      const entityName = "plans";
      const regexMtender1Id = /^MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]$/;
      const regexMtender2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;

      let cdb = "";

      commit(SET_ENTITY_LOADED, {
        entityName,
        loaded: false,
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entityName,
        error: {
          status: false,
          message: "",
        },
      });

      if (regexMtender1Id.test(id)) {
        cdb = MTENDER1;

        try {
          const elasticRes = await axios(getListConfig(entityName, `?entityId=${id}`));
          const requestId = elasticRes.data.data[0].id;

          const res = await axios(getPlanConfig(cdb, requestId));
          const planData = res.data.data;

          commit(SET_CURRENT_ENTITY_INFO, {
            entityName,
            cdb,
            entityData: planData,
          });

          commit(SET_ENTITY_LOADED, {
            entityName,
            loaded: true,
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entityName,
            error: {
              status: false,
              message: "",
            },
          });
        } catch (e) {
          commit(SET_ENTITY_LOADED, {
            entityName,
            loaded: true,
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entityName,
            error: {
              status: true,
              message: e.message,
            },
          });
        }
      } else if (regexMtender2Id.test(id)) {
        cdb = MTENDER2;

        try {
          const res = await axios(getPlanConfig(cdb, id));

          if (!Object.keys(res.data).length) {
            throw new Error(VueI18n.t("invalid-id"));
          }
          const planData = {};

          const MSRecord = {};
          const PNRecord = {};
          const EVRecord = {};

          if (Object.keys(res.data).length) {
            const tenderRecords = res.data.records;

            tenderRecords.forEach((record) => {
              if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/) !== -1) {
                Object.assign(MSRecord, record);
              }
              if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-PN-[0-9]{13}$/) !== -1) {
                Object.assign(PNRecord, record);
              }
              if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-EV-[0-9]{13}$/) !== -1) {
                Object.assign(EVRecord, record);
              }
            });

            Object.assign(planData, {
              MSRecord,
              PNRecord,
              EVRecord,
            });

            commit(SET_CURRENT_ENTITY_INFO, {
              entityName,
              cdb,
              entityData: planData,
            });

            commit(SET_ENTITY_LOADED, {
              entityName,
              loaded: true,
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entityName,
              error: {
                status: false,
                message: "",
              },
            });
          }
        } catch (e) {
          commit(SET_ENTITY_LOADED, {
            entityName,
            loaded: true,
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entityName,
            error: {
              status: true,
              message: e.message,
            },
          });
        }
      } else {
        commit(SET_ENTITY_LOADED, {
          entityName,
          loaded: true,
        });

        commit(SET_ENTITY_LOADED_ERROR, {
          entityName,
          error: {
            status: true,
            message: VueI18n.t("invalid-id"),
          },
        });
      }
    },

    async [FETCH_CURRENT_TENDER_INFO]({ commit }, { id }) {
      const entityName = "tenders";
      const regexMtender1Id = /^MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]$/;
      const regexMtender2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;

      let cdb = "";

      commit(SET_ENTITY_LOADED, {
        entityName,
        loaded: false,
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entityName,
        error: {
          status: false,
          message: "",
        },
      });

      if (regexMtender1Id.test(id)) {
        cdb = MTENDER1;

        try {
          const elasticRes = await axios(getListConfig(entityName, `?entityId=${id}`));
          const requestId = elasticRes.data.data[0].id;

          const res = await axios(getTenderConfig(cdb, requestId));
          const tenderData = res.data.data;

          commit(SET_CURRENT_ENTITY_INFO, {
            entityName,
            cdb,
            entityData: tenderData,
          });

          commit(SET_ENTITY_LOADED, {
            entityName,
            loaded: true,
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entityName,
            error: {
              status: false,
              message: "",
            },
          });
        } catch (e) {
          commit(SET_ENTITY_LOADED, {
            entityName,
            loaded: true,
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entityName,
            error: {
              status: true,
              message: e.message,
            },
          });
        }
      } else if (regexMtender2Id.test(id)) {
        cdb = MTENDER2;

        try {
          const res = await axios(getTenderConfig(cdb, id));

          if (!Object.keys(res.data).length) {
            throw new Error(VueI18n.t("invalid-id"));
          }

          const tenderData = {};

          const MSRecord = {};
          const PNRecord = {};
          const EVRecord = {};

          if (Object.keys(res.data).length) {
            const tenderRecords = res.data.records;

            tenderRecords.forEach((record) => {
              if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/) !== -1) {
                Object.assign(MSRecord, record);
              }
              if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-PN-[0-9]{13}$/) !== -1) {
                Object.assign(PNRecord, record);
              }
              if (record.ocid.search(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-EV-[0-9]{13}$/) !== -1) {
                Object.assign(EVRecord, record);
              }
            });

            Object.assign(tenderData, {
              MSRecord,
              PNRecord,
              EVRecord,
            });

            commit(SET_CURRENT_ENTITY_INFO, {
              entityName,
              cdb,
              entityData: tenderData,
            });
            commit(SET_ENTITY_LOADED, {
              entityName,
              loaded: true,
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entityName,
              error: {
                status: false,
                message: "",
              },
            });
          }
        } catch (e) {
          commit(SET_ENTITY_LOADED, {
            entityName,
            loaded: true,
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entityName,
            error: {
              status: true,
              message: e.message,
            },
          });
        }
      } else {
        commit(SET_ENTITY_LOADED, {
          entityName,
          loaded: true,
        });

        commit(SET_ENTITY_LOADED_ERROR, {
          entityName,
          error: {
            status: true,
            message: VueI18n.t("invalid-id"),
          },
        });
      }
    },

    async [FETCH_CURRENT_CONTRACT_INFO]({ commit }, { cdb, id }) {
      const entityName = "contracts";

      commit(SET_ENTITY_LOADED, {
        entityName,
        loaded: false,
      });

      commit(SET_ENTITY_LOADED_ERROR, {
        entityName,
        error: {
          status: false,
          message: "",
        },
      });
      if (cdb === MTENDER1) {
        try {
          const elasticRes = await axios(getListConfig(entityName, `?entityId=${id}`));
          if (elasticRes.data.data.length) {
            const requestId = elasticRes.data.data[0].id;

            const res = await axios(getContractConfig(cdb, requestId));

            const contractData = res.data.data;

            commit(SET_CURRENT_ENTITY_INFO, {
              entityName,
              cdb,
              entityData: contractData,
            });

            commit(SET_ENTITY_LOADED, {
              entityName,
              loaded: true,
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entityName,
              error: {
                status: false,
                message: "",
              },
            });
          } else {
            commit(SET_ENTITY_LOADED, {
              entityName,
              loaded: true,
            });

            commit(SET_ENTITY_LOADED_ERROR, {
              entityName,
              error: {
                status: true,
                message: VueI18n.t("invalid-id"),
              },
            });
          }
        } catch (e) {
          commit(SET_ENTITY_LOADED, {
            entityName,
            loaded: true,
          });

          commit(SET_ENTITY_LOADED_ERROR, {
            entityName,
            error: {
              status: true,
              message: e.message,
            },
          });
        }
      }
    },
  },
};
