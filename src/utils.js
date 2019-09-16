import idx from "idx";
import dayjs from "dayjs";
import documentsTypes from "./store/types/documents-types";
import proceduresTypes from "./store/types/procedures-types";
import procedureStatusType from "./store/types/procedure-status-types";
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
  const timePeriods = ["day", "week", "month", "year"];

  if (!date || !dayjs(date).isValid()) {
    console.warn(`date ${date} is not valid`);
    return date;
  } else if (!timePeriod || timePeriods.includes(timePeriod)) {
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

export function transformDocumentationFromCDB1(docs) {
  return Object.values(
    [...docs]
      .sort((doc1, doc2) => new Date(doc2.dateModified) - new Date(doc1.dateModified))
      .reduce((obj, doc) => {
        const docObj = {
          title: doc.title,
          url: doc.url,
          datePublished: doc.datePublished,
          documentType: doc.documentType,
          id: doc.id,
        };

        if (!obj.hasOwnProperty(doc.id)) {
          obj[doc.id] = {
            oldVersions: [],
            ...docObj,
          };
        } else {
          obj[doc.id].oldVersions = [
            ...obj[doc.id].oldVersions,
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
      return part;
    } else {
      if (organizationRole === "funder")
        return {
          name: VueI18n.t("budgetBreakdown.state_money"),
        };
    }
  }
}

export function selectProcedure(pmd, category, amount) {
  // fucking crutch
  if (pmd === "Procedura micro-valorii") {
    pmd = "microValue";
  }

  if (pmd === "Procedură de valoare mică") {
    pmd = "smallValue";
  }

  if (pmd === "Licitație deschisă") {
    pmd = "openTender";
  }

  return (
    proceduresTypes.tenders.find(procedure => procedure.value === calculateProcedureType(pmd, category, amount)) &&
    proceduresTypes.tenders.find(procedure => procedure.value === calculateProcedureType(pmd, category, amount)).name[
      VueI18n.locale
    ]
  );
}

function calculateProcedureType(pmd, category, amount) {
  if (pmd === "smallValue") {
    if (
      ((category === "goods" || category === "services") && amount >= 800000) ||
      (category === "works" && amount >= 2000000)
    ) {
      return "openTender";
    } else {
      return pmd;
    }
  } else {
    return pmd;
  }
}

export function mapTenderStatus(status, statusDetails) {
  const statusFull = statusDetails ? `${status}.${statusDetails}` : status;
  switch (statusFull) {
    case "active.clarification":
    case "active.enquiries":
      return procedureStatusType.tenders.find(val => val.value === "clarification").name[VueI18n.locale];
    case "active.tendering":
      return procedureStatusType.tenders.find(val => val.value === "tendering").name[VueI18n.locale];
    case "active.auction":
      return procedureStatusType.tenders.find(val => val.value === "auction").name[VueI18n.locale];
    case "unsuccessful.empty":
    case "unsuccessful":
      return procedureStatusType.tenders.find(val => val.value === "unsuccessful").name[VueI18n.locale];
    case "active.awarding":
    case "active.qualification":
      return procedureStatusType.tenders.find(val => val.value === "awarding").name[VueI18n.locale];
    case "active.awardedContractPreparation":
    case "active.awarded":
      return procedureStatusType.tenders.find(val => val.value === "awarded").name[VueI18n.locale];
    case "active.suspended":
      return procedureStatusType.tenders.find(val => val.value === "suspended").name[VueI18n.locale];
    case "complete.empty":
    case "complete":
      return procedureStatusType.tenders.find(val => val.value === "complete").name[VueI18n.locale];
    case "cancelled.empty":
    case "cancelled":
      return procedureStatusType.tenders.find(val => val.value === "cancelled").name[VueI18n.locale];
    case "active":
      return procedureStatusType.tenders.find(val => val.value === "published").name[VueI18n.locale];
  }
}

export function getSourceOfMoney(parties, buyerId) {
  let source = "";
  for (let part of parties) {
    if (part.roles.find(role => role === "funder")) {
      if (part.id === buyerId) {
        source = VueI18n.t("budgetBreakdown.own_money");
        break;
      } else source = VueI18n.t("budgetBreakdown.donors_money");
    }
  }
  return source || VueI18n.t("budgetBreakdown.state_money");
}

export function objectsIsEqual(obj1, obj2) {
  let differences = 0;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    console.log("Objects have a different number of keys");
    ++differences;
  }
  for (const keyOfObj1 in obj1) {
    if (!obj2.hasOwnProperty(keyOfObj1)) {
      console.log(`Second object hasn't key - ${keyOfObj1}`);
      ++differences;
    } else {
      if (Array.isArray(obj1[keyOfObj1])) {
        if (!Array.isArray(obj2[keyOfObj1])) {
          console.log(`Key - ${keyOfObj1} not array in first object`);
          ++differences;
        } else {
          if (obj1[keyOfObj1].length !== obj2[keyOfObj1].length) {
            console.log(`Array length with key - ${keyOfObj1} from first object not equal in second object`);
            ++differences;
          }
        }
      } else {
        if (obj1[keyOfObj1] !== obj2[keyOfObj1]) {
          console.log(`Key - ${keyOfObj1} not equal in objects`);
          ++differences;
        }
      }
    }
  }
  return differences;
}
