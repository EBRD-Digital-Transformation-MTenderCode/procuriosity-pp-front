<template>
  <div>test</div>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_CURRENT_BUDGET_INFO } from "./../../store/types/actions-types";

  import BudgetCard from "./../ListCards/BudgetCard";

  import { getDataFromObject, formatDate } from "./../../utils";


  export default {
    name: "BudgetPage",
    components: {
      "budget-card": BudgetCard
    },
    created: function() {
      const id = this.$route.params.id;

      this.$store.dispatch(FETCH_CURRENT_BUDGET_INFO, {
        id
      });
    }
    /*computed: {
     ...mapState({
     budget: state => state.entities.budgets.currentTender.tenderData
     }),
     entity() {
     const budget = this.budget.data;
     return {
     procedureStatus: getDataFromObject(budget, _ => _.status),
     modifiedDate: getDataFromObject(budget, _ => _.dateModified),
     title: getDataFromObject(budget, _ => _.title),
     description: getDataFromObject(budget, _ => _.description),
     currency: getDataFromObject(budget, _ => _.value.currency),
     amount: getDataFromObject(budget, _ => _.value.amount),
     buyerRegion: getDataFromObject(budget, _ => _.procuringEntity.address.region),
     procedureType: getDataFromObject(budget, _ => _.procurementMethodType),
     buyerName: getDataFromObject(budget, _ => _.procuringEntity.name),
     entityId: getDataFromObject(budget, _ => _.budgetID)
     };
     },
     procuringEntity() {
     const budget = this.budget.data;
   
     return {
     fullName: getDataFromObject(budget, _ => _.procuringEntity.name),
     identifier: `${getDataFromObject(budget, _ => _.procuringEntity.identifier.scheme)}
     ${getDataFromObject(budget, _ => _.procuringEntity.identifier.id)} -
     ${getDataFromObject(budget, _ => _.procuringEntity.identifier.legalName)}`,
     address: `${getDataFromObject(budget, _ => _.procuringEntity.address.postalCode)},
     ${getDataFromObject(budget, _ => _.procuringEntity.address.countryName)},
     ${getDataFromObject(budget, _ => _.procuringEntity.address.region)},
     ${getDataFromObject(budget, _ => _.procuringEntity.address.locality)},
     ${getDataFromObject(budget, _ => _.procuringEntity.address.streetAddress)}`,
     responsiblePerson: `${getDataFromObject(budget, _ => _.procuringEntity.contactPoint.name)} /
     ${getDataFromObject(budget, _ => _.procuringEntity.contactPoint.email)} /
     ${getDataFromObject(budget, _ => _.procuringEntity.contactPoint.telephone)}`
     };
     },
     procurementInfo() {
     const budget = this.budget.data;
   
     const calculateMinStepPercent = () => {
     const amount = getDataFromObject(budget, _ => _.value.amount);
     const minStep = getDataFromObject(budget, _ => _.minimalStep.amount);
     return Math.round(((minStep / amount) * 100) * 100) / 100;
     };
   
     return {
     currency: getDataFromObject(budget, _ => _.value.currency),
     amount: getDataFromObject(budget, _ => _.value.amount),
     minStep: this.hasAuction ? `${getDataFromObject(tender, _ => _.minimalStep.amount)} (${calculateMinStepPercent()} %)` : ""
     };
   
     },
     dates() {
     const budget = this.budget.data;
   
     return {
     enquiry: `${formatDate(getDataFromObject(budget, _ => _.enquiryPeriod.startDate))} - ${formatDate(getDataFromObject(budget, _ => _.enquiryPeriod.endDate))}`,
     tendering: `${formatDate(getDataFromObject(budget, _ => _.tenderPeriod.startDate))} - ${formatDate(getDataFromObject(budget, _ => _.tenderPeriod.endDate))}`,
     auction: this.hasAuction ? `${formatDate(getDataFromObject(budget, _ => _.auctionPeriod.startDate))} - ${formatDate(getDataFromObject(budget, _ => _.auctionPeriod.endDate))}` : ""
     };
     },
     documents() {
     const budget = this.budget.data;
   
     return getDataFromObject(budget, _ => _.documents, []).map(doc => {
     return {
     name: getDataFromObject(doc, _ => _.title),
     url: getDataFromObject(doc, _ => _.url),
     datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
     id: getDataFromObject(doc, _ => _.id)
     };
     });
     }
     }*/
  };
</script>
