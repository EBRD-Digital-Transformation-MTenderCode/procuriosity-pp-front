<template>
  <div class="info">
    <div class="info__title">{{ $t("tender.contract_award_notices") }}</div>
    <el-collapse
        accordion
        :value="gd(evRecord, _ => _.tender.lots[0].id, '0') + '0'"
        @change="changeActiveItem"
    >
      <contract-item
          v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
          :key="lot.id + index"
          :lot="lot"
          :index="index"
          :evRecord="evRecord"
          :activeItemId="activeItemId"
      />
    </el-collapse>
  </div>
</template>

<script>
  import ContractItem from "./ContractItem";

  import {
    getDataFromObject
  } from "./../../../../utils";

  export default {
    name: "Contracts",
    components: {
      "contract-item": ContractItem
    },
    props: {
      evRecord: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeItemId: ""
      };
    },
    created() {
      this.changeActiveItem(this.gd(this.evRecord, _ => _.tender.lots[0].id, "0") + "0");
    },
    methods: {
      gd(...args) {
        return getDataFromObject(...args);
      },
      changeActiveItem(item) {
        this.activeItemId = item;
      }
    }
  };
</script>
