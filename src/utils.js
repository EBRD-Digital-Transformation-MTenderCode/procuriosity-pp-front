import idx from "idx";
import dayjs from "dayjs";
import documentsTypes from "./store/types/documents-types";

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

export function addPeriod(date, timePeriod, count) {
  if (!date || !dayjs(date).isValid()) {
    console.warn(`date ${ date } is not valid`);
    return date;
  } else if (!timePeriod || timePeriod !== "day" && timePeriod !== "month" && timePeriod !== "year" && timePeriod !== "week") {
    console.warn(`period ${timePeriod} is not valid `);
    return date;
  } else if (!count || typeof count !== "number" && isNaN(count)) {
    console.warn(`count ${count} is not valid`);
    return date;
  } else {
    return dayjs(date).add(count, timePeriod);
  }
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

export const transformSpecialSymbols = str => {
  if (!str && typeof str !== "string") {
    throw new Error;
  }
  const parser = new DOMParser;
  return parser.parseFromString(`<!doctype html><html><body> ${str}</body></html>`, "text/html").body.textContent;
};
export function parseDocumentType(documentsType, lang) {
  if (documentsTypes.hasOwnProperty(documentsType)) {
    return documentsTypes[documentsType][lang];
  } else {
    if (!documentsType && typeof documentsType !== "string") {
      throw new Error;
    }
    const result = documentsType.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
export function transformDocumentation(docs) {
  const obj = {};
  for (const doc of [...docs].sort((doc1, doc2) => new Date(doc2.datePublished) - new Date(doc1.datePublished))) {
    const idDoc = doc.id.replace(/-[0-9]{13}$/, "");
    const timestamp = doc.id.replace(idDoc, "");
    if (!obj.hasOwnProperty(idDoc)) {
      obj[idDoc] = {
        title:doc.title,
        url:doc.url,
        datePublished:doc.datePublished,
        documentType: doc.documentType,
        id: idDoc + timestamp,
        oldVersions: []
      };
    } else {
      obj[idDoc].oldVersions.push({
        title:doc.title,
        url:doc.url,
        datePublished:doc.datePublished,
        documentType:doc.documentType,
        id: idDoc + timestamp,
      });
    }
  }
  return Object.values(obj);
}
