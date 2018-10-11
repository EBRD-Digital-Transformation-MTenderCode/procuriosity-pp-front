<template>
  <el-container direction="vertical">
    <div
        :is="renderSearchForm"
        class="search-form"
    />
    <ul
        v-if="entities[entityName].list.length"
        id="entity-list"
        class="list"
    >
      <li
          :is="renderCard"
          v-for="entity of entities[entityName].list"
          :entity="entity"
          needLink
          :key="entity.id"
      />
    </ul>
      <div class="list__no-data-title" v-else>  {{$t("message.list_no_data")}}</div>
      <list-pagination
          v-if="needPagination"
          :total="entities[entityName].paginationInfo.totalCount"
          :pageCount="entities[entityName].paginationInfo.pageCount"
          :currentPage="entities[entityName].searchParams.page"
          :pageSize="entities[entityName].searchParams.pageSize"
          :changePage="changePage"
      />
  </el-container>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_ENTITY_LIST } from "./../store/types/actions-types";
  import { SET_ENTITY_SEARCH_PARAMS } from "../store/types/mutations-types";

  import { Main, Container } from "element-ui";

  import BudgetsSearchForm from "./SearchForms/BudgetsSearchForm";
  import TendersSearchForm from "./SearchForms/TendersSearchForm";
  import PlansSearchForm from "./SearchForms/PlansSearchForm";
  import ContractsSearchForm from "./SearchForms/ContractsSearchForm";

  import BudgetCard from "../views/ListCards/BudgetCard";
  import TenderCard from "../views/ListCards/TenderCard";
  import PlanCard from "../views/ListCards/PlanCard";
  import ContractCard from "../views/ListCards/ContractCard";

  import ListPagination from "./ListPagination";

  import { convertObjectToQueryParamsString } from "./../utils";


  export default {
    name: "List",
    components: {
      "el-main": Main,
      "el-container": Container,

      "budgets-search-form": BudgetsSearchForm,
      "tenders-search-form": TendersSearchForm,
      "plans-search-form": PlansSearchForm,
      "contracts-search-form": ContractsSearchForm,

      "budget-card": BudgetCard,
      "tender-card": TenderCard,
      "plan-card": PlanCard,
      "contract-card": ContractCard,

      "list-pagination": ListPagination
    },
    created() {
      this.getList();
    },
    computed: {
      ...mapState(["entities"]),
      entityName() {
        return this.$route.params[0];
      },
      renderSearchForm() {
        switch (this.entityName) {
          case "budgets":
            return "budgets-search-form";
          case "plans":
            return "plans-search-form";
          case "tenders":
            return "tenders-search-form";
          case "contracts":
            return "contracts-search-form";
          default:
            return "div";
        }
      },
      renderCard() {
        switch (this.entityName) {
          case "budgets":
            return "budget-card";
          case "plans":
            return "plan-card";
          case "tenders":
            return "tender-card";
          case "contracts":
            return "contract-card";
          default:
            return "li";
        }
      },
      needPagination() {
        const entityInfoObj = this.entities[this.entityName];

        return entityInfoObj.paginationInfo.pageCount !== 1 && entityInfoObj.list.length;
      }
    },
    methods: {
      changePage(page) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entity: this.entityName,
          params: {
            page
          }
        });
      },
      getList() {
        this.$store.dispatch(FETCH_ENTITY_LIST, {
          params: convertObjectToQueryParamsString(this.$store.state.entities[this.entityName].searchParams),
          entity: this.entityName
        });
      }
    },
    watch: {
      "entityName": "getList"
    }
  };
</script>
