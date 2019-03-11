import idx from "idx";
import dayjs from "dayjs";
import documentsTypes from "./store/types/documents-types";
import VueI18n from "./i18n";

export function getDataFromObject(obj, getFunc, def = "") {
  return idx(obj, getFunc) || def;
}

export function convertStringDateToUTCDateObject(date) {
  const dateObject = new Date(date);

  return new Date(dateObject.getTime() + dateObject.getTimezoneOffset() * 60000);
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
    console.warn(`date ${date} is not valid`);
    return date;
  } else if (
    !timePeriod ||
    (timePeriod !== "day" && timePeriod !== "month" && timePeriod !== "year" && timePeriod !== "week")
  ) {
    console.warn(`period ${timePeriod} is not valid `);
    return date;
  } else if (!count || (typeof count !== "number" && isNaN(count))) {
    console.warn(`count ${count} is not valid`);
    return date;
  } else {
    return dayjs(date).add(count, timePeriod);
  }
}

export function formatAmount(amount, def = "0.00") {
  if (typeof amount === "number" && !isNaN(amount)) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& ");
  } else return def;
}

export const convertObjectToQueryParamsString = obj => {
  if (!obj && typeof obj !== "object") {
    console.warn("data is not valid");
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
  return parser.parseFromString(`<!doctype html><html><body> ${str}</body></html>`, "text/html").body.textContent;
};

export function parseDocumentType(documentsType, lang) {
  if (documentsTypes.hasOwnProperty(documentsType)) {
    return documentsTypes[documentsType][lang];
  } else {
    if (!documentsType && typeof documentsType !== "string") {
      throw new Error();
    }
    const result = documentsType.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}

export function transformDocumentation(docs) {
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
}

export function getOrganizationObject(parties, organizationRole) {
  for (let part of parties) {
    if (part.roles.find(role => role === organizationRole)) {
      return {
        name: part.name,
        id: part.id,
      };
    } else {
      if (organizationRole === "funder")
        return {
          name: "State money",
          id: undefined,
        };
    }
  }
}

export function selectProcedure(category, amount) {
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
}

export function getSourceOfMoney(parties, buyerId) {
  let source = "";
  for (let part of parties) {
    if (part.roles.find(role => role === "funder")) {
      if (part.id === buyerId) {
        source = VueI18n.t("budget.own_money");
        break;
      } else source = VueI18n.t("budget.donors_money");
    }
  }
  return source || VueI18n.t("budget.state_money");
}
