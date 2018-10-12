<template>
  <el-container direction="vertical">

    <div
        :is="renderSearchForm"
        class="search-form"
    />
    <transition-group
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
    >
      <ul v-if="entities[entityName].loaded && entities[entityName].list.length"
          :key="'list'"
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
      <div class="list__no-data-title" v-if="entities[entityName].loaded && !entities[entityName].list.length"
           :key="'no-data'">
        {{$t("message.list_no_data")}}
      </div>
      <stub-card
          v-if="!entities[entityName].loaded"
          v-for="item of 3"
          :key="item"
      />
      <list-pagination
          v-if="needPagination"
          :total="entities[entityName].paginationInfo.totalCount"
          :pageCount="entities[entityName].paginationInfo.pageCount"
          :currentPage="entities[entityName].searchParams.page"
          :pageSize="entities[entityName].searchParams.pageSize"
          :changePage="changePage"
          :key="'pagination'"
      />
    </transition-group>
  </el-container>
</template>

<script>
  import Velocity from "velocity-animate";
  import { mapState } from "vuex";
  import { FETCH_ENTITY_LIST } from "./../store/types/actions-types";
  import { SET_ENTITY_SEARCH_PARAMS } from "../store/types/mutations-types";

  import BudgetsSearchForm from "./SearchForms/BudgetsSearchForm";
  import TendersSearchForm from "./SearchForms/TendersSearchForm";
  import PlansSearchForm from "./SearchForms/PlansSearchForm";
  import ContractsSearchForm from "./SearchForms/ContractsSearchForm";

  import StubCard from "./../views/ListCards/StubCard";
  import BudgetCard from "./../views/ListCards/BudgetCard";
  import TenderCard from "./../views/ListCards/TenderCard";
  import PlanCard from "./../views/ListCards/PlanCard";
  import ContractCard from "./../views/ListCards/ContractCard";

  import ListPagination from "./ListPagination";

  import { convertObjectToQueryParamsString } from "./../utils";

  export default {
    name: "List",
    components: {
      "budgets-search-form": BudgetsSearchForm,
      "tenders-search-form": TendersSearchForm,
      "plans-search-form": PlansSearchForm,
      "contracts-search-form": ContractsSearchForm,

      "stub-card": StubCard,
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
      },
      beforeEnter: function(el) {
        el.style.opacity = 0;
        el.style.height = 0;
      },
      enter: function(el, done) {
        const delay = el.dataset.index * 150;
        setTimeout(() => {
          Velocity(
              el,
              { opacity: 1, height: "100%" },
              { complete: done }
          );
        }, delay);
      },
      leave: function(el, done) {
        const delay = el.dataset.index * 150;
        setTimeout(() => {
          Velocity(
              el,
              { opacity: 0, height: 0 },
              { complete: done }
          );
        }, delay);
      }
    },
    watch: {
      "entityName": "getList"
    }
  };
</script>

<style lang="scss">
  .list__no-data-title {
    margin: 20px 0;
    text-align: center;
    font-size: 38px;
  }

</style>
