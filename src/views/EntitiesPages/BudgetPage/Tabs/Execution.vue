<template>
  <transition  name="fade" mode="out-in" appear>
  <div key="loading" v-if="!loaded && !error.status">
    <div class="loading"></div>
  </div>
  <div key="info" v-else-if="loaded && !error.status" class="info">
    <div id="contract-title" class="info__title">{{ $t("budget.execution") }}</div>
    <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="elementsAmount"
        :page-size="pageSize"
    />
    <div class="info-blocks">
      <div class="info-block table-header">
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text info-block__text_bold">
              №
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text info-block__text_bold">
              {{$t("budget.cpv")}}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text info-block__text_bold">
              {{$t("budget.method")}}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text info-block__text_bold">
              {{$t("budget.current_status")}}
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text info-block__text_bold">
              {{$t("budget.expected_value")}}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-collapse
        accordion
        :value="getExecutionsId[0]"
        @change="changeActiveItem"
    >
      <execution-item
          v-for="(procedure, index) of procedures"
          v-if="index >= numberOfLastDisplayedProcedure - pageSize &&  index < numberOfLastDisplayedProcedure"
          :key="procedure.id"
          :index="index"
          :activeItemId="activeItemId"
          :procedure="procedure"
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
  <div key="error" class="error" v-else>
    <div class="error-message">{{error.message}}</div>
    <button
        class="refresh-btn"
        @click="getProcedures"
    >
      {{$t("refresh")}}
    </button>
  </div>
  </transition>
</template>

<script>
  import axios from "axios";
  import { getTenderConfig } from "../../../../configs/requests-configs";

  import ExecutionItem from "./ExecutionItem";
  import ListPagination from "./../../../../components/ListPagination";
  import PageNumber from "./../../../../components/PageNumber";

  import { MTENDER2 } from "./../../../../store/types/cbd-types";
  import {
    getDataFromObject
  } from "./../../../../utils";

  export default {
    name: "Execution",
    components: {
      "execution-item": ExecutionItem,
      "list-pagination": ListPagination,
      "page-number": PageNumber
    },
    props: {
      getExecutionsId: {
        type: Array,
        required: true
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
        return this.elementsAmount > this.pageSize;
      },
      elementsAmount() {
        return this.procedures.length;
      }
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
            const entityData = data.records.reduce((acc, record) => {
              if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/)) {
                return {
                  ...acc,
                  MS: record
                };
              } else if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-PN-[0-9]{13}$/)) {
                return {
                  ...acc,
                  PN: record
                };
              } else if (record.ocid.match(/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}-EV-[0-9]{13}$/)) {
                return {
                  ...acc,
                  EV: record
                };
              }else return {...acc}
            }, {});

            this.procedures = [
              ...this.procedures,
              { ...entityData }
            ];
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
          }
          finally {
            this.loaded = true;
          }
        }
      }
    }
  };
</script>

