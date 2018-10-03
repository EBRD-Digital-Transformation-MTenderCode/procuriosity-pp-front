<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    @tab-click="changeTab"
    stretch
    class="list__tabs"
  >
    <el-tab-pane
      v-for="(tab, key) in entities"
      :label="$t(tab.name)"
      :name="key"
      :key="key"
      lazy
    >
      <div
          :is="renderSearchForm"
          class="search-form"
      ></div>
      <ul
        v-if="entities[key].list.length"
        class="list"
      >
        <li
          :is="renderCard"
          v-for="entity of entities[key].list"
          :entity="entity"
          :key="entity.id"
        ></li>
      </ul>
      <div class="list__no-data-title" v-else>No data (</div>
      <list-pagination
        v-if="entities[key].list.length"
        :total="tab.paginationInfo.totalCount"
        :pageCount="tab.paginationInfo.pageCount"
        :currentPage="tab.searchParams.page"
        :pageSize="tab.searchParams.pageSize"
        :changePage="changePage"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { mapState } from "vuex";
  import { SET_ENTITY_SEARCH_PARAMS } from "../store/types/mutations-types";
  import { FETCH_ENTITY_LIST } from "../store/types/actions-types";

  import { Tabs, TabPane } from "element-ui";

  import BudgetsSearchForm from "./SearchForms/BudgetsSearchForm";
  import TendersSearchForm from "./SearchForms/TendersSearchForm";
  
  import BudgetItem from "../views/ListCards/BudgetItem";
  import TenderCard from "../views/ListCards/TenderCard";

  import ListPagination from "./ListPagination";

  export default {
    name: "ListTabs",
    components: {
      "el-tabs": Tabs,
      "el-tab-pane": TabPane,
  
      "budgets-search-form": BudgetsSearchForm,
      "tenders-search-form": TendersSearchForm,
    
      "budget-item": BudgetItem,
      "tender-card": TenderCard,
    
      "list-pagination": ListPagination
    },
    data() {
      return {
        activeTab: ""
      };
    },
    computed: {
      ...mapState(["entities"]),
      renderSearchForm() {
        switch (this.activeTab) {
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
        switch (this.activeTab) {
          case "budgets":
            return "budget-item";
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
    mounted() {
      if (!this.$route.query.tab) {
        this.$router.push({path: "", query: {tab: "budgets"}});
      }
      this.activeTab = this.$route.query.tab;
  
      this.$store.dispatch(FETCH_ENTITY_LIST, {
        entity: this.activeTab
      });
    },
    methods: {
      changeTab(tab) {
        this.$router.push({path: "", query: {tab: tab.name}});
        this.$store.dispatch(FETCH_ENTITY_LIST, {
          entity: this.activeTab
        });
      },
      changePage(page) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entity: this.activeTab,
          params: {
            page
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "./../styles/variables";
  
  .list {
    &__tabs {
      width: 100%;
      position: relative;
      top: -48px;
      .el-tabs__nav-wrap {
        margin-bottom: 0;
      }
      .el-tabs__content {
        overflow: inherit;
      }
      .el-tabs__header {
        margin: 0;
        border: none !important;
      }
      .el-tabs__nav {
        border: none !important;
      }
      .el-tabs__item {
        margin: 0 10px;
        padding-top: 14px !important;
        padding-bottom: 14px !important;
        border: none !important;
        border-radius: 3px 3px 0 0;
        background-color: #efefef;
        line-height: 1;
        font-size: 20px !important;
        color: #323232 !important;
        transition: 0.4s !important;
        &:hover {
          box-shadow: 0 0 12px #a0a0a0;
        }
        &.is-active {
          background-color: $mainC;
          color: #fff !important;
        }
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
      .el-tabs__item {
        height: auto;
        padding: 10px 20px;
        font-size: 25px;
        user-select: none;
      }
    }
    &__no-data-title {
      margin: 20px 0;
      text-align: center;
      font-size: 28px;
    }
  }
</style>
