<template>
  <div class="list__status-bar">
    <div class="list__status-bar__text">
      {{ $t("search.list_total_found") }}:
      <transition name="fade" mode="out-in" appear>
        <span class="list__status-bar_count" v-if="loaded" key="content">{{
          entities[entity].paginationInfo.totalCount
        }}</span>
        <div v-else class="loading loading_status" key="loading"></div>
      </transition>
    </div>
    <transition name="fade" mode="out-in" appear>
      <page-number
        class="list__status-bar__page"
        v-if="needPagination && loaded"
        :current-page="entities[entity].searchParams.page"
        :elements-amount="entities[entity].paginationInfo.totalCount"
        :page-size="entities[entity].searchParams.pageSize"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

import PageNumber from "./PageNumber";

export default {
  name: "SearchStatusBar",
  props: {
    entity: {
      type: String,
      required: true,
    },
    needPagination: {
      type: Boolean,
      required: true,
    },
    loaded: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    "page-number": PageNumber,
  },
  computed: {
    ...mapState(["entities"]),
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__status-bar {
    position: sticky;
    display: flex;
    justify-content: space-between;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    width: 100%;
    margin: 15px 0 0;
    padding: 14px 16px;
    background-color: #f7f7f7;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.19);
    font-size: 16px;
    @media (max-width: 480px) {
      display: block;
    }
    &__text {
      text-align: center;
    }
    &__page {
      margin: 0;
    }
    &_count {
      font-weight: 700;
    }
  }
}
</style>
