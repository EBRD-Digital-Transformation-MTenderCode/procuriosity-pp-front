<template>
  <div class="info">
    <div id="contract-title" class="info__title">{{ $t("budget.execution") }}</div>
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
          :key="procedure.id"
          :index="index"
          :activeItemId="activeItemId"
          :procedure="procedure"
      />
    </el-collapse>
  </div>
</template>

<script>
  import axios from "axios";
  import { getTenderConfig } from "../../../../configs/requests-configs";

  import ExecutionItem from "./ExecutionItem";

  import {
    getDataFromObject
  } from "./../../../../utils";

  export default {
    name: "Execution",
    components: {
      "execution-item": ExecutionItem,
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
      };
    },
    created() {
      console.log(this.activeItemId);
      this.getExecutionsId.forEach(async id => {
        try {
          //@TODO mtender2 from cdb-types
          const { data } = await axios(getTenderConfig("mtender2", id));
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
            }
          }, {});

          this.procedures = [
            ...this.procedures,
            { ...entityData }
          ];
        } catch (e) {
          //@TODO need catch errors
          console.log(e);
        }
      });
    },
    methods: {
      gd(...args) {
        return getDataFromObject(...args);
      },
      changeActiveItem(item) {
        this.activeItemId = item;
      },
    }
  };
</script>

