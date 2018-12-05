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

export function addDay(date) {
  // @TODO need test parameter
  if (!date && !dayjs(date).isValid()) {
    console.warn("date is not valid");
  }
  return dayjs(date).add(1, "day");
}

export function formatAmount(amount, def = "0.00") {
  if (typeof amount === "number" && !isNaN(amount)) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& ");
  }
  else return def;
}

export const convertObjectToQueryParamsString = obj => {
  if (!obj && typeof obj !== "object") {
    console.warn("data is not valid");
  }
  else {
    return Object.entries(obj).filter(([key, val]) => {
      return Array.isArray(val) ? !!val.length : !!val;
    }).reduce((accVal, [key, val], i) => {
      return `${accVal}${i !== 0 ? "&" : ""}${key}=${encodeURIComponent(Array.isArray(val) ? JSON.stringify(val) : val)}`;
    }, "?");
  }
};

export const convertCamelCaseToTitleCase = str => {
  if (!str && typeof str !== "string") {
    throw new Error;
  }

  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const transformSpecialSymbols = str => {
  if (!str && typeof str !== "string") {
    throw new Error;
  }
  const parser = new DOMParser;
  return parser.parseFromString(`<!doctype html><html><body> ${str}</body></html>`, "text/html").body.textContent;
};
