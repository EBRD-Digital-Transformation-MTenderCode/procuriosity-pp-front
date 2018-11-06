import idx from "idx";
import dayjs from "dayjs";

export function getDataFromObject(obj, getFunc, def = "") {
  return idx(obj, getFunc) || def;
}

export function convertStringDateToUTCDateObject(date) {
  const dateObject = new Date(date);

  return new Date(dateObject.getTime() + (dateObject.getTimezoneOffset() * 60000));
}

export function formatDate(date, formatType = "DD.MM.YYYY / HH:mm", def = "none") {
  if (date && dayjs(date).isValid()) {
    return dayjs(date).format(formatType);
  } else {
    return def;
  }
}

export const convertObjectToQueryParamsString = obj => {
  return Object.entries(obj).filter(([key, val]) => {
    return Array.isArray(val) ? !!val.length : !!val;
  }).reduce((accVal, [key, val], i) => {
    return `${accVal}${i !== 0 ? "&" : ""}${key}=${encodeURIComponent(Array.isArray(val) ? JSON.stringify(val) : val)}`;
  }, "?");
};
