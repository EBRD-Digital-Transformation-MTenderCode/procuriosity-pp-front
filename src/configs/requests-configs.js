import { MTENDER1, MTENDER2 } from "./../store/types/cbd-types";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://dev.tender.solutions:1111";
}

const mTender1PublicPointURL = "https://public.api.mepps.openprocurement.net/api/2.3";
const mTender2PublicPointURL = "https://public.mtender.gov.md";

export const getListConfig = (entity, params = "") => {
  return {
    method: "get",
    url: `${baseURL}/search/${entity}${params}`,
  };
};

export const getBudgetConfig = id => {
  return {
    method: "get",
    url: `${mTender2PublicPointURL}/budgets/${id}`,
  };
};

export const getPlanConfig = (cdb, id) => {
  if (cdb === MTENDER1) {
    return {
      method: "get",
      url: `${mTender1PublicPointURL}/plans/${id}`,
    };
  } else if (cdb === MTENDER2) {
    return {
      method: "get",
      url: `${mTender2PublicPointURL}/tenders/${id}`,
    };
  } else return {};
};

export const getTenderConfig = (cdb, id) => {
  if (cdb === MTENDER1) {
    return {
      method: "get",
      url: `${mTender1PublicPointURL}/tenders/${id}`,
    };
  } else if (cdb === MTENDER2) {
    return {
      method: "get",
      url: `${mTender2PublicPointURL}/tenders/${id}`,
    };
  } else return {};
};

export const getContractConfig = (cdb, id) => {
  if (cdb === MTENDER1) {
    return {
      method: "get",
      url: `${mTender1PublicPointURL}/contracts/${id}`,
    };
  } else if (cdb === MTENDER2) {
    return {
      method: "get",
      url: `${mTender2PublicPointURL}/tenders/${id}`,
    };
  } else return {};
};

export const getRegionsConfig = (language, country) => {
  return {
    method: "get",
    url: `${mTender2PublicPointURL}/mdm/region?lang=${language}&country=${country}`,
  };
};

export const getCPVCodesConfig = (language, idOrName = "") => {
  return {
    method: "get",
    url: `${baseURL}/search/cpv?language=${language}&idOrName=${idOrName}`,
  };
};
