<template>
  <div class="info info_budget" v-if="FSs.length">
    <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="elementsAmount"
        :page-size="pageSize"
    />
    <el-collapse
        accordion
        :value="FSs[0].ocid"
        @change="changeActiveItem"
    >
      <source-item
          v-for="(fs, index) of FSs"
          v-if ="index >= numberOfLastDisplayedSource - pageSize &&  index < numberOfLastDisplayedSource"
          :key="fs.ocid"
          :fs="fs"
          :index="index"
          :activeItemId="activeItemId"
      />
    </el-collapse>
    <list-pagination
        v-if="needPagination"
        :total="elementsAmount"
        :pageCount="0"
        :currentPage=currentPage
        :pageSize=pageSize
        :changePage="changePage"
        offsetTo="contract-title"
        :key="'pagination'"
    />
  </div>
  <div class="info__no-data" v-else>{{$t("budget.no_finances_sources")}}</div>
</template>

<script>
  import SourceItem from "./SourceItem";
  import ListPagination from "./../../../../components/ListPagination";
  import PageNumber  from "./../../../../components/PageNumber"

  import {
    getDataFromObject
  } from "./../../../../utils";

  export default {
    name: "SourceItem",
    components: {
      "source-item": SourceItem,
      "list-pagination": ListPagination,
      "page-number": PageNumber
    },
    props: {
      FSs: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        activeItemId: "",
        pageSize: 25,
        numberOfLastDisplayedSource: 25,
        currentPage: 1
      };
    },
    computed:{
      needPagination(){
        return this.elementsAmount > this.pageSize
      },
      elementsAmount() {
        return this.FSs.length;
      }
    },
    methods: {
      gd(...args) {
        return getDataFromObject(...args);
      },
      changeActiveItem(item) {
        this.activeItemId = item;
      },
      changePage(page) {
        this.numberOfLastDisplayedSource =  page * this.pageSize;
        this.currentPage = page;
      }
    }
  };
</script>

