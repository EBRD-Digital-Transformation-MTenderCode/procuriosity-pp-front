import idx from "idx";
import dayjs from "dayjs";
import documentsTypes from "./store/types/documents-types";
import VueI18n from "./i18n";

export const getDataFromObject = (obj, getFunc, def = "") => idx(obj, getFunc) || def;

export const convertStringDateToUTCDateObject = date => {
  const dateObject = new Date(date);

  return new Date(dateObject.getTime() + dateObject.getTimezoneOffset() * 60000);
};

export const formatDate = (date, formatType = "DD.MM.YYYY / HH:mm", def = "none") => {
  if (date && dayjs(date).isValid()) {
    return dayjs(date).format(formatType);
  } else {
    return def;
  }
};

export const addPeriod = (date, timePeriod, count) => {
  const timePeriods = ["day", "month", "year", "week"];

  if (!date || !dayjs(date).isValid()) {
    console.warn(`Date ${date} is not valid`);
    return date;
  } else if (!timePeriod || !timePeriods.includes(timePeriod)) {
    console.warn(`Period ${timePeriod} is not valid `);
    return date;
  } else if (!count || (typeof count !== "number" && isNaN(count))) {
    console.warn(`count ${count} is not valid`);
    return date;
  } else {
    return dayjs(date).add(count, timePeriod);
  }
};

export const formatAmount = (amount, def = "0.00") => {
  if (typeof amount === "number" && !isNaN(amount)) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& ");
  } else return def;
};

export const convertObjectToQueryParamsString = obj => {
  if (!obj && typeof obj !== "object") {
    console.warn(`Object ${obj} is not valid`);
  } else {
    return Object.entries(obj)
      .filter(([key, val]) => {
        return Array.isArray(val) ? !!val.length : !!val;
      })
      .reduce((accVal, [key, val], i) => {
        return `${accVal}${i !== 0 ? "&" : ""}${key}=${encodeURIComponent(
          Array.isArray(val) ? JSON.stringify(val) : val
        )}`;
      }, "?");
  }
};

export const transformSpecialSymbols = str => {
  if (!str && typeof str !== "string") {
    throw new Error();
  }
  const parser = new DOMParser();
  return parser.parseFromString(`<!doctype html><html><body>${str}</body></html>`, "text/html").body.textContent;
};

export const parseDocumentType = (documentsType, lang) => {
  if (documentsTypes.hasOwnProperty(documentsType)) {
    return documentsTypes[documentsType][lang];
  } else {
    if (!documentsType && typeof documentsType !== "string") {
      throw new Error();
    }
    const result = documentsType.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
};

export const transformDocumentation = docs => {
  const transformDocId = doc => ({
    docId: doc.id.replace(/-[0-9]{13}$/, ""),
    timestamp: doc.id.replace(doc.id.replace(/-[0-9]{13}$/, ""), ""),
  });

  return Object.values(
    [...docs]
      .sort((doc1, doc2) => transformDocId(doc1).timestamp - transformDocId(doc2).timestamp)
      .reduce((obj, doc) => {
        const transformedDoc = transformDocId(doc);
        const docObj = {
          title: doc.title,
          url: doc.url,
          datePublished: doc.datePublished,
          documentType: doc.documentType,
          id: transformedDoc.docId + transformedDoc.timestamp,
        };

        if (!obj.hasOwnProperty(transformedDoc.docId)) {
          obj[transformedDoc.docId] = {
            oldVersions: [],
            ...docObj,
          };
        } else {
          obj[transformedDoc.docId].oldVersions = [
            ...obj[transformedDoc.docId].oldVersions,
            {
              ...docObj,
            },
          ];
        }
        return obj;
      }, {})
  );
};

export const getOrganizationName = (parties, organizationRole) => {
  for (let part of parties) {
    if (part.roles.find(role => role === organizationRole)) {
      return part.name;
    } else {
      if (organizationRole === "funder") return "State money";
    }
  }
};

export const selectProcedure = (category, amount) => {
  if (category === "goods" || category === "services") {
    if (amount < 80000) {
      switch (VueI18n.locale) {
        case "en":
          return "Low value procedure";
        case "ro":
          return "Procedură de valoare mică";
        case "ru":
          return "Закупка малой стоимости";
        default:
          return "Low value procedure";
      }
    } else if (amount <= 400000) {
      switch (VueI18n.locale) {
        case "en":
          return "Request for Proposals";
        case "ro":
          return "COP";
        case "ru":
          return "Запрос ценовых предложений";
        default:
          return "Request for Proposals";
      }
    } else {
      switch (VueI18n.locale) {
        case "en":
          return "Open Tender";
        case "ro":
          return "Licitație deschisă";
        case "ru":
          return "Открытые торги";
        default:
          return "Open Tender";
      }
    }
  } else if (category === "works") {
    if (amount < 100000) {
      switch (VueI18n.locale) {
        case "en":
          return "Low value procedure";
        case "ro":
          return "Procedură de valoare mică";
        case "ru":
          return "Закупка малой стоимости";
        default:
          return "Low value procedure";
      }
    } else if (amount <= 1500000) {
      switch (VueI18n.locale) {
        case "en":
          return "Request for Proposals";
        case "ro":
          return "COP";
        case "ru":
          return "Запрос ценовых предложений";
        default:
          return "Request for Proposals";
      }
    } else {
      switch (VueI18n.locale) {
        case "en":
          return "Open tender";
        case "ro":
          return "Licitație deschisă";
        case "ru":
          return "Открытые торги";
        default:
          return "Open Tender";
      }
    }
  }
};
