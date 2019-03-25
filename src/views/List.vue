<template>
  <div class="list-page">
    <el-container direction="vertical">
      <div class="search-form-wp">
        <component :is="renderSearchForm" class="search-form" :isExpanded="isExpanded" :initialParams="initialParams" />
        <button class="search-form__btn search-form__btn_more" @click="actionExpand">
          {{ $t("search.moreCriterions") }}
          <i :class="['icon-left', isExpanded ? 'el-icon-close' : 'el-icon-arrow-down']" />
        </button>
      </div>
      <h1 class="list-title">
        {{ $t(`${entityName}${$route.query.procedures ? `_${$route.query.procedures}` : ""}  `) }}
      </h1>
      <search-status-bar :loaded="entities[entityName].loaded" :entity="entityName" :needPagination="needPagination" />
      <transition-group @before-enter="beforeEnter" @enter="enter" @leave="leave" id="transition-group">
        <ul v-if="entities[entityName].loaded && entities[entityName].list.length" :key="'list'" class="list">
          <component
            :is="renderCard"
            v-for="entity of entities[entityName].list"
            :entity="entity"
            needLink
            :key="entity.id"
          />
        </ul>
        <div
          class="list__no-data-title"
          v-if="entities[entityName].loaded && !entities[entityName].list.length && !entities[entityName].error.status"
          :key="'no-data'"
        >
          {{ $t("search.list_no_data") }}
        </div>
        <div class="list__error" v-if="entities[entityName].loaded && entities[entityName].error.status" :key="'error'">
          <div class="list__error-message">{{ entities[entityName].error.message }}</div>
          <button class="list__refresh-btn" @click="getList">{{ $t("search.list_refresh") }}</button>
        </div>
        <template v-if="!entities[entityName].loaded">
          <stub-card v-for="item of 3" :key="item" />
        </template>
      </transition-group>
      <list-pagination
        v-if="needPagination"
        :total="entities[entityName].paginationInfo.totalCount"
        :pageCount="entities[entityName].paginationInfo.pageCount"
        :currentPage="entities[entityName].searchParams.page"
        :pageSize="entities[entityName].searchParams.pageSize"
        :changePage="changePage"
        offsetTo="transition-group"
        :key="'pagination'"
      />
    </el-container>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import { mapState } from "vuex";
import { FETCH_ENTITY_LIST } from "../store/types/actions-types";
import { SET_ENTITY_SEARCH_PARAMS } from "../store/types/mutations-types";
import initialSearchProps from "./../store/types/initial-search-props.js";

import BudgetsSearchForm from "../components/SearchForms/BudgetsSearchForm";
import TendersSearchForm from "../components/SearchForms/TendersSearchForm";
import PlansSearchForm from "../components/SearchForms/PlansSearchForm";
import ContractsSearchForm from "../components/SearchForms/ContractsSearchForm";

import SearchStatusBar from "./../components/SearchStatusBar";

import StubCard from "../components/ListCards/StubCard";
import BudgetsCard from "../components/ListCards/BudgetsCard";
import TendersCard from "../components/ListCards/TendersCard";
import PlansCard from "../components/ListCards/PlansCard";
import ContractsCard from "../components/ListCards/ContractsCard";

import ListPagination from "../components/ListPagination";

import { convertObjectToQueryParamsString } from "../utils";

export default {
  name: "List",
  components: {
    "budgets-search-form": BudgetsSearchForm,
    "tenders-search-form": TendersSearchForm,
    "plans-search-form": PlansSearchForm,
    "contracts-search-form": ContractsSearchForm,

    "search-status-bar": SearchStatusBar,

    "stub-card": StubCard,
    "budgets-card": BudgetsCard,
    "tenders-card": TendersCard,
    "plans-card": PlansCard,
    "contracts-card": ContractsCard,

    "list-pagination": ListPagination,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  created() {
    const { entityName } = this;

    const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
    if (localStorageEntities[entityName].hasOwnProperty("isExpanded")) {
      this.isExpanded = localStorageEntities[entityName].isExpanded;
    } else {
      localStorageEntities[entityName].isExpanded = this.isExpanded;
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));
    }

    const { query } = this.$route;

    switch (entityName) {
      case "budgets":
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entityName,
          params: { page: 1 },
        });
        break;
      case "plans":
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entityName,
          params: { page: 1, pins: query.procedures && query.procedures === "pin" ? ["true"] : ["false"] },
        });
        break;
      case "tenders":
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entityName,
          params: {
            page: 1,
            proceduresOwnerships:
              query.procedures && query.procedures === "commercial" ? ["commercial"] : ["government"],
          },
        });
        break;
      case "contracts":
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entityName,
          params: {
            page: 1,
            proceduresStatuses:
              query.procedures && query.procedures === "signing"
                ? ["pending", "pending.signing"]
                : ["active", "terminated"],
          },
        });
        break;
      default:
        this.getList();
    }
  },
  computed: {
    ...mapState(["entities"]),
    entityName() {
      return this.$route.params.entityName;
    },
    renderSearchForm() {
      const mappedEntitiesForms = {
        budgets: "budgets-search-form",
        plans: "plans-search-form",
        tenders: "tenders-search-form",
        contracts: "contracts-search-form",
      };

      return mappedEntitiesForms[this.entityName] || "div";
    },
    renderCard() {
      const mappedEntitiesCard = {
        budgets: "budgets-card",
        plans: "plans-card",
        tenders: "tenders-card",
        contracts: "contracts-card",
      };

      return mappedEntitiesCard[this.entityName] || "li";
    },
    needPagination() {
      const entityInfoObj = this.entities[this.entityName];
      return !!(entityInfoObj.paginationInfo.pageCount !== 1 && entityInfoObj.list.length);
    },
    initialParams() {
      const { entityName } = this;
      const { query } = this.$route;

      switch (entityName) {
        case "budgets":
          return { page: 1 };
        case "plans":
          if (query.procedures && query.procedures === "pin") {
            initialSearchProps.plans.pins = ["true"];
            return { page: 1, pins: ["true"] };
          } else {
            initialSearchProps.plans.pins = ["false"];
            return { page: 1, pins: ["false"] };
          }
        case "tenders":
          if (query.procedures && query.procedures === "commercial") {
            initialSearchProps.tenders.proceduresOwnerships = ["commercial"];
            return { page: 1, proceduresOwnerships: ["commercial"] };
          } else {
            initialSearchProps.tenders.proceduresOwnerships = ["government"];
            return { page: 1, proceduresOwnerships: ["government"] };
          }
        case "contracts":
          if (query.procedures && query.procedures === "signing") {
            initialSearchProps.contracts.proceduresStatuses = ["pending", "pending.signing"];
            return { page: 1, proceduresStatuses: ["pending", "pending.signing"] };
          } else {
            initialSearchProps.contracts.proceduresStatuses = ["active", "terminated"];
            return { page: 1, proceduresStatuses: ["active", "terminated"] };
          }
        default:
          return { page: 1 };
      }
    },
  },
  methods: {
    getList() {
      this.$store.dispatch(FETCH_ENTITY_LIST, {
        params: convertObjectToQueryParamsString(this.$store.state.entities[this.entityName].searchParams),
        entityName: this.entityName,
      });
    },

    actionExpand() {
      this.isExpanded = !this.isExpanded;

      const localStorageEntities = JSON.parse(localStorage.getItem("entities"));
      localStorageEntities[this.entityName].isExpanded = this.isExpanded;
      localStorage.setItem("entities", JSON.stringify(localStorageEntities));
    },

    changePage(page) {
      this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
        entityName: this.entityName,
        params: {
          page,
        },
      });
    },

    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },

    enter: function(el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(el, { opacity: 1, height: "100%" }, { complete: done });
      }, delay);
    },

    leave: function(el, done) {
      const delay = el.dataset.index * 150;
      setTimeout(() => {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    },
  },
  watch: {
    entityName: "getList",
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables";

.list {
  margin-bottom: -20px;
  padding-bottom: 20px;
  background-color: #efefef;
  &-title {
    padding: 15px 0;
    color: #225aa5;
    font-size: 33px;
    font-weight: 700;
  }
  &-page {
    flex: 1;
    margin-bottom: -20px;
    padding-bottom: 20px;
    background-color: #efefef;
  }
  &__no-data-title,
  &__error {
    margin: 20px 0;
    text-align: center;
    font-size: 38px;
  }
  &__error {
    &-message {
      margin-bottom: 20px;
    }
  }
  &__refresh-btn {
    position: relative;
    padding: 15px 10px 15px 45px;
    border-radius: 3px;
    background-color: $mainC;
    font-size: 18px;
    color: #fff;
    transition: 0.4s;
    &:before {
      content: "";
      position: absolute;
      left: 10px;
      width: 25px;
      height: 25px;
      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQzOC41MjkgNDM4LjUyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjUyOSA0MzguNTI4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQzMy4xMDksMjMuNjk0Yy0zLjYxNC0zLjYxMi03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRjLTQuOTQ4LDAtOS4yMjYsMS44MTItMTIuODQ3LDUuNDI0bC0zNy4xMTMsMzYuODM1ICAgIGMtMjAuMzY1LTE5LjIyNi00My42ODQtMzQuMTIzLTY5Ljk0OC00NC42ODRDMjc0LjA5MSw1LjI4MywyNDcuMDU2LDAuMDAzLDIxOS4yNjYsMC4wMDNjLTUyLjM0NCwwLTk4LjAyMiwxNS44NDMtMTM3LjA0Miw0Ny41MzYgICAgQzQzLjIwMyw3OS4yMjgsMTcuNTA5LDEyMC41NzQsNS4xMzcsMTcxLjU4N3YxLjk5N2MwLDIuNDc0LDAuOTAzLDQuNjE3LDIuNzEyLDYuNDIzYzEuODA5LDEuODA5LDMuOTQ5LDIuNzEyLDYuNDIzLDIuNzEyaDU2LjgxNCAgICBjNC4xODksMCw3LjA0Mi0yLjE5LDguNTY2LTYuNTY1YzcuOTkzLTE5LjAzMiwxMy4wMzUtMzAuMTY2LDE1LjEzMS0zMy40MDNjMTMuMzIyLTIxLjY5OCwzMS4wMjMtMzguNzM0LDUzLjEwMy01MS4xMDYgICAgYzIyLjA4Mi0xMi4zNzEsNDUuODczLTE4LjU1OSw3MS4zNzYtMTguNTU5YzM4LjI2MSwwLDcxLjQ3MywxMy4wMzksOTkuNjQ1LDM5LjExNWwtMzkuNDA2LDM5LjM5NyAgICBjLTMuNjA3LDMuNjE3LTUuNDIxLDcuOTAyLTUuNDIxLDEyLjg1MWMwLDQuOTQ4LDEuODEzLDkuMjMxLDUuNDIxLDEyLjg0N2MzLjYyMSwzLjYxNyw3LjkwNSw1LjQyNCwxMi44NTQsNS40MjRoMTI3LjkwNiAgICBjNC45NDksMCw5LjIzMy0xLjgwNywxMi44NDgtNS40MjRjMy42MTMtMy42MTYsNS40Mi03Ljg5OCw1LjQyLTEyLjg0N1YzNi41NDJDNDM4LjUyOSwzMS41OTMsNDM2LjczMywyNy4zMTIsNDMzLjEwOSwyMy42OTR6IiBmaWxsPSIjRkZGRkZGIi8+CgkJPHBhdGggZD0iTTQyMi4yNTMsMjU1LjgxM2gtNTQuODE2Yy00LjE4OCwwLTcuMDQzLDIuMTg3LTguNTYyLDYuNTY2Yy03Ljk5LDE5LjAzNC0xMy4wMzgsMzAuMTYzLTE1LjEyOSwzMy40ICAgIGMtMTMuMzI2LDIxLjY5My0zMS4wMjgsMzguNzM1LTUzLjEwMiw1MS4xMDZjLTIyLjA4MywxMi4zNzUtNDUuODc0LDE4LjU1Ni03MS4zNzgsMTguNTU2Yy0xOC40NjEsMC0zNi4yNTktMy40MjMtNTMuMzg3LTEwLjI3MyAgICBjLTE3LjEzLTYuODU4LTMyLjQ1NC0xNi41NjctNDUuOTY2LTI5LjEzbDM5LjExNS0zOS4xMTJjMy42MTUtMy42MTMsNS40MjQtNy45MDEsNS40MjQtMTIuODQ3YzAtNC45NDgtMS44MDktOS4yMzYtNS40MjQtMTIuODQ3ICAgIGMtMy42MTctMy42Mi03Ljg5OC01LjQzMS0xMi44NDctNS40MzFIMTguMjc0Yy00Ljk1MiwwLTkuMjM1LDEuODExLTEyLjg1MSw1LjQzMUMxLjgwNywyNjQuODQ0LDAsMjY5LjEzMiwwLDI3NC4wOHYxMjcuOTA3ICAgIGMwLDQuOTQ1LDEuODA3LDkuMjMyLDUuNDI0LDEyLjg0N2MzLjYxOSwzLjYxLDcuOTAyLDUuNDI4LDEyLjg1MSw1LjQyOGM0Ljk0OCwwLDkuMjI5LTEuODE3LDEyLjg0Ny01LjQyOGwzNi44MjktMzYuODMzICAgIGMyMC4zNjcsMTkuNDEsNDMuNTQyLDM0LjM1NSw2OS41MjMsNDQuODIzYzI1Ljk4MSwxMC40NzIsNTIuODY2LDE1LjcwMSw4MC42NTMsMTUuNzAxYzUyLjE1NSwwLDk3LjY0My0xNS44NDUsMTM2LjQ3MS00Ny41MzQgICAgYzM4LjgyOC0zMS42ODgsNjQuMzMzLTczLjA0Miw3Ni41Mi0xMjQuMDVjMC4xOTEtMC4zOCwwLjI4MS0xLjA0NywwLjI4MS0xLjk5NWMwLTIuNDc4LTAuOTA3LTQuNjEyLTIuNzE1LTYuNDI3ICAgIEM0MjYuODc0LDI1Ni43Miw0MjQuNzMxLDI1NS44MTMsNDIyLjI1MywyNTUuODEzeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
      background-position: 0 center;
      background-repeat: no-repeat;
      transition: 0.4s;
    }
    &:hover {
      background-color: lighten($mainC, 8%);
    }
    &:hover:before {
      transform: rotate(180deg);
    }
  }
}
</style>
