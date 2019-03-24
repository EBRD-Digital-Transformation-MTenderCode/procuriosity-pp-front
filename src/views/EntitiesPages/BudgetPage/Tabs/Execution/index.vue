<template>
  <transition name="fade" mode="out-in" appear>
    <div key="loading" v-if="!loaded && !error.status">
      <div class="loading"></div>
    </div>
    <div key="info" v-else-if="loaded && !error.status" class="info info_budget">
      <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="itemsNumber"
        :page-size="pageSize"
      />
      <el-collapse accordion :value="getExecutionsId[0]" @change="changeActiveItem">
        <execution-item
          v-for="procedure of needPagination
            ? procedures.filter(
                (it, i) => i >= numberOfLastDisplayedProcedure - pageSize && i < numberOfLastDisplayedProcedure
              )
            : procedures"
          :key="procedure.id"
          :activeItemId="activeItemId"
          :procedure="procedure"
        />
      </el-collapse>
      <list-pagination
        v-if="needPagination"
        :total="itemsNumber"
        :pageCount="0"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :changePage="changePage"
        offsetTo="contract-title"
        :key="'pagination'"
      />
    </div>
    <div key="error" class="error" v-else>
      <div class="error-message">{{ error.message }}</div>
      <button class="refresh-btn" @click="getProcedures">
        {{ $t("refresh") }}
      </button>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import { getTenderConfig } from "./../../../../../configs/requests-configs";

import ExecutionItem from "./ExecutionItem";
import ListPagination from "./../../../../../components/ListPagination";
import PageNumber from "./../../../../../components/PageNumber";

import { MTENDER2 } from "./../../../../../store/types/cbd-types";
import { getDataFromObject } from "./../../../../../utils";

export default {
  name: "Execution",
  components: {
    "execution-item": ExecutionItem,
    "list-pagination": ListPagination,
    "page-number": PageNumber,
  },
  props: {
    getExecutionsId: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeItemId: "",
      procedures: [],
      pageSize: 25,
      numberOfLastDisplayedProcedure: 25,
      currentPage: 1,
      loaded: false,
      error: {
        status: false,
        message: "",
      },
    };
  },
  computed: {
    needPagination() {
      return this.itemsNumber > this.pageSize;
    },
    itemsNumber() {
      return this.procedures.length;
    },
  },
  created() {
    this.getProcedures();
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    changeActiveItem(item) {
      this.activeItemId = item;
    },
    changePage(page) {
      this.numberOfLastDisplayedProcedure = page * this.pageSize;
      this.currentPage = page;
    },
    async getProcedures() {
      this.loaded = false;
      this.error = {
        status: false,
        message: "",
      };
      for await (let id of this.getExecutionsId) {
        try {
          const { data } = await axios(getTenderConfig(MTENDER2, id));
          const entityData = data.records.reduce(
            (acc, record) => {
              if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/)) {
                return {
                  ...acc,
                  MS: record,
                };
              } else if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-PN-[0-9]{13}$/)) {
                return {
                  ...acc,
                  PN: record,
                };
              } else if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-EV-[0-9]{13}$/)) {
                return {
                  ...acc,
                  EV: record,
                };
              } else if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-AC-[0-9]{13}$/)) {
                return {
                  ...acc,
                  ACs: [...acc.ACs, record],
                };
              } else return { ...acc };
            },
            { publishedDate: data.publishedDate, ACs: [] }
          );

          this.procedures = [...this.procedures, entityData];
          this.error = {
            status: false,
            message: "",
          };
        } catch (e) {
          this.error = {
            status: true,
            message: e.message,
          };
          break;
        } finally {
          this.loaded = true;
        }
      }
    },
  },
};
</script>
