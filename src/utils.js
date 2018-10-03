import idx from "idx";
import moment from "moment/moment";

export function getDataFromObject(obj, getFunc, def) {
  return idx(obj, getFunc) || def;
}

export function formatDate(date, formatType = "DD.MM.YYYY / HH:mm", addDay) {
  if (moment(date).isValid()) {
    if (addDay) {
      return moment(date).add(addDay, "days").format(formatType);
    } else {
      return moment(date).format(formatType);
    }
  } else {
    return "Waiting...";
  }
}

// @TODO need refactoring
export const convertObjectToQueryParamsString = obj => Object.entries(obj)
  .filter(([key, value]) => Array.isArray(value) ? !!value.length : !!value)
  .reduce((accVal, [key, value], i) => `${accVal}${i !== 0 ? "&" : ""}${key}=${encodeURIComponent(Array.isArray(value) ? JSON.stringify(value) : value)}`, "?");

