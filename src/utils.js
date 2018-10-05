import idx from "idx";
import moment from "moment/moment";

export function getDataFromObject(obj, getFunc, def = "") {
  return idx(obj, getFunc) || def;
}

export function formatDate(date, formatType = "DD.MM.YYYY / HH:mm") {
  if (date && moment(date).isValid()) {
    return moment.utc(date).local().format(formatType);
  } else {
    return "udruchaet...!!!!";
  }
}

export const convertObjectToQueryParamsString = obj => {
  return Object.entries(obj).filter(([key, val]) => {
    return Array.isArray(val) ? !!val.length : !!val;
  }).reduce((accVal, [key, val], i) => {
    return `${accVal}${i !== 0 ? "&" : ""}${key}=${encodeURIComponent(Array.isArray(val) ? JSON.stringify(val) : val)}`;
  }, "?");
};
