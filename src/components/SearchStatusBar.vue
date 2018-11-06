<template>
  <div class="list-status-bar">
    <div class="list-status-bar__text">
      {{$t("search.list_total_found")}}: <span class="list-status-bar__count">{{ entities[entity].paginationInfo.totalCount }}</span>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  
  export default {
    name: "SearchStatusBar",
    props: {
      entity: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState(["entities"])
    }
  };
</script>

<style lang="scss" scoped>
  .list {
    &-status-bar {
      position: sticky;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      width: 100%;
      margin: 15px 0 0;
      padding: 14px 16px;
      background-color: #f7f7f7;
      box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.19);
      font-size: 16px;
      &__text {
      
      }
      &__count {
        font-weight: 700;
      }
    }
  }
</style>
