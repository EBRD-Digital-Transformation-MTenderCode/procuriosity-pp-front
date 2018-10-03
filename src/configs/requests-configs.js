const baseURL = "http://dev.tender.solutions:8888";
const mTender1 = "https://public.api.mepps.openprocurement.net/api/2.3";
const mTender2 = "http://public.eprocurement.systems";

export const getListConfig = (entity, params = "") => {
  return {
    method: "get",
    url: `${baseURL}/rest-api/v1/${entity}/search${params}`
  };
};

export const getTenderConfig = (cdb, id) => {
  return {
    method: "get",
    url: `${cdb === "mtender1" ? mTender1: mTender2}/tenders/${id}`
  }
};

export const getMDMDirectoryConfig = (directory, params = "") => {
  return {
    method: "get",
    url: `${mTender2}/mdm/${directory}${params}`
  };
};
