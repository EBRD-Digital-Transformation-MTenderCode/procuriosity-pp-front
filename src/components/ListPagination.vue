<template>
  <div class="text-center">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pageCount"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"

      @prev-click="_changePage"
      @next-click="_changePage"
      @current-change="_changePage"
    />
  </div>
</template>

<script>
  import { Pagination } from "element-ui";

  export default {
    name: "ListPagination",
    components: {
      "el-pagination": Pagination
    },
    props: {
      total: {
        type: Number,
        required: true
      },
      pageCount: {
        type: Number,
        required: true
      },
      pageSize: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      changePage: {
        type: Function,
        required: true
      }
    },
    methods: {
      _changePage(page) {
        window.scroll({
          behavior: "smooth",
          left: 0,
          top: document.getElementById("entity-list").offsetTop
        });

        this.changePage(page);
      }
    }
  };
</script>

<style lang="scss">
  .el-pagination {
    .btn-prev,
    .btn-next {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 46px;
      height: 46px;
      /* @TODO need delete importants and do right connect styles */
      border-radius: 50% !important;
      background-color: #9e9e9e !important;
      font-size: 40px;
      color: #fff !important;
      transition: 0.4s;
      &[disabled] {
        background-color: #e4e4e4 !important;
        color: #ababab !important;
      }
      &:hover:not([disabled]) {
        box-shadow: 0 0 5px #7b7b7b;
      }
      .el-icon {
        font-size: 24px;
      }
    }
    .number,
    .more {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 46px;
      height: 46px;
      border-radius: 50% !important;
      background-color: #fff !important;
      font-weight: 400;
      font-size: 16px;
      color: #333;
      transition: 0.4s;
      &.active {
        background-color: #235aa6 !important;
      }
      &:hover:not(.active) {
        box-shadow: 0 0 5px #7b7b7b;
      }
    }
  }
</style>
