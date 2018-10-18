<template>
  <div class="list-pagination text-center">
    <el-pagination
        background
        layout="prev, pager, next"
        :page-count="pageCount"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :pager-count="5"
    
        @prev-click="_changePage"
        @next-click="_changePage"
        @current-change="_changePage"
    />
  </div>
</template>

<script>
  export default {
    name: "ListPagination",
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
  @import "./../styles/variables";

  .list-pagination {
    .el-pagination {
      @media (max-width: 525px) {
        display: flex;
        white-space: normal;
      }
      .btn-prev,
      .btn-next {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 46px;
        height: 46px;
        margin: 3px;
        border-radius: 50%;
        background-color: #9e9e9e;
        font-size: 40px;
        color: #fff;
        transition: 0.4s;
        &[disabled] {
          background-color: #e4e4e4;
          color: #ababab;
        }
        &:hover:not([disabled]) {
          box-shadow: 0 0 5px #7b7b7b;
        }
        .el-icon {
          font-size: 24px;
        }
      }
      .el-pager {
        @media (max-width: 525px) {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .number,
        .more {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 46px;
          height: 46px;
          margin: 3px;
          border-radius: 50%;
          background-color: #fff;
          font-weight: 400;
          font-size: 16px;
          color: #333;
          transition: 0.4s;
          &.active {
            background-color: $mainC !important;
          }
          &:hover:not(.active) {
            box-shadow: 0 0 5px #7b7b7b;
            color: $mainC !important;
          }
        }
      }
    }
  }
</style>
