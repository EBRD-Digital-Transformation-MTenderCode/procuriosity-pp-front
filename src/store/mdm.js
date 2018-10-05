import axios from "axios";
import { getCPVCodesConfig, getRegionsConfig } from "./../configs/requests-configs";

import { SET_CPV_CODES, SET_REGIONS } from "./types/mutations-types";
import { FETCH_CPV_CODES, FETCH_REGIONS } from "./types/actions-types";
import { CPV_CODES, REGIONS } from "./types/directories-types";

export default {
  state: {
    [REGIONS]: [],
    [CPV_CODES]: []
  },
  mutations: {
    [SET_CPV_CODES](state, { CPVCodes }) {
      state[CPV_CODES] = CPVCodes;
    },
    [SET_REGIONS](state, { regions }) {
      state[REGIONS] = regions;
    }
  },
  actions: {
    async [FETCH_REGIONS]({ commit }, { lang, country }) {
      const res = await axios(getRegionsConfig(lang, country));

      commit(SET_REGIONS, {
        regions: res.data.data.items.map(it => {
          return {
            name: it.name,
            value: it.name
          };
        })
      });
    },
    async [FETCH_CPV_CODES]({ commit }, { lang, idOrName }) {
      const res = await axios(getCPVCodesConfig(lang, idOrName));

      commit(SET_CPV_CODES, {
        CPVCodes: res.data.data.map(item => {
          return {
            value: `${item.id}`,
            label: `${item.id} ${item.name}`
          };
        })
      });
    }
  }
};
