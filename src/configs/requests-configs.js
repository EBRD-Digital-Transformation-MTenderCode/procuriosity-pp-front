const baseURL = "http://dev.tender.solutions:1111";
const mTender1 = "https://public.api.mepps.openprocurement.net/api/2.3";
const mTender2 = "http://public.mtender.gov.md";
const mTender2Sendbox = "http://dev.tender.solutions:1111/public";

const tempMtender2 = "http://10.0.10.116:9111";

export const getListConfig = (entity, params = "") => {
  return {
    method: "get",
    url: `${baseURL}/search/${entity}${params}`
  };
};

export const getBudgetConfig = id => {
  return {
    method: "get",
    url: `${mTender2Sendbox}/budgets/${id}`,
  };
};

export const getTenderConfig = (cdb, id) => {
  return {
    method: "get",
    url: `${cdb === "mtender1" ? mTender1 : tempMtender2}/tenders/${id}`
  };
};

export const getRegionsConfig = (lang, country) => {
  return {
    method: "get",
    url: `${mTender2}/mdm/region?lang=${lang}&country=${country}`
  };
};

export const getCPVCodesConfig = (language, idOrName = "") => {
  return {
    method: "get",
    url: `${baseURL}/search/cpv?language=${language}&idOrName=${idOrName}`
  };
};



