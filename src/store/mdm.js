import axios from "axios";
import { getMDMDirectoryConfig } from "./../configs/requests-configs";

import { SET_DIRECTORY } from "./types/mutations-types";
import { FETCH_DIRECTORY } from "./types/actions-types";
import { REGIONS } from "./types/directories-types";

import { convertObjectToQueryParamsString } from "./../utils";

export default {
  state: {
    [REGIONS]: []
  },
  mutations: {
    [SET_DIRECTORY](state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value;
      });
    }
  },
  actions: {
    async [FETCH_DIRECTORY]({commit}, {directory, params}) {
      const res = await axios(getMDMDirectoryConfig(directory, convertObjectToQueryParamsString(params)));

      const list = res.data.data.items;

      if (directory === REGIONS) {
        commit(SET_DIRECTORY, {
          [directory]: list.map(it => {
            return {
              name: it.name,
              value: it.name
            };
          })
        });
      } else {
        commit(SET_DIRECTORY, {
          [directory]: list
        })
      }
    }
  }
};
