<template>
  <el-container direction="vertical">
    <div
        :is="renderSearchForm"
        class="search-form"
    />
    <ul
        v-if="entities[entityName].list.length"
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
      <div class="list__no-data-title" v-else>No data (</div>
      <list-pagination
          v-if="entities[entityName].list.length"
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

  import BudgetCard from "../views/ListCards/BudgetCard";
  import TenderCard from "../views/ListCards/TenderCard";

  import ListPagination from "./ListPagination";

  export default {
    name: "List",
    components: {
      "el-main": Main,
      "el-container": Container,

      "budgets-search-form": BudgetsSearchForm,
      "tenders-search-form": TendersSearchForm,

      "budget-card": BudgetCard,
      "tender-card": TenderCard,

      "list-pagination": ListPagination
    },
    created() {
      this.$store.dispatch(FETCH_ENTITY_LIST, {
        entity: this.entityName
      });
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
            return "plan-item";
          case "tenders":
            return "tender-card";
          case "contracts":
            return "contract-item";
          default:
            return "li";
        }
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
      }
    }
  };
</script>

<style lang="scss">

</style>
