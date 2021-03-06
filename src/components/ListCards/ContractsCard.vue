<template>
  <div class="entity-card">
    <el-card>
      <div slot="header">
        <div class="entity-status">
          <div class="entity-status__text">
            {{ parseStatusText }}
          </div>
        </div>
        <div class="entity-update">
          {{ $t("contract.last_modified_date") }}: <span class="entity-update__date">{{ modifiedDate }}</span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <router-link
            v-if="needLink && entity.cdb !== 'mtender2'"
            :to="`${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/contracts/${entityId}`"
            data-link
            class="entity-title"
          >
            {{ title }}
          </router-link>
          <div v-else class="entity-title">
            {{ title }}
          </div>
          <div class="entity-description">
            {{ description }}
          </div>
        </el-col>
        <el-col :xs="24" :sm="6">
          <div class="entity-amount">
            <div class="entity-amount__text">{{ $t("contract.value") }} ({{ currency ? currency : "MDL" }})</div>
            <div class="entity-amount__number">
              <span class="whole" :style="wholeAmount.length > 10 ? 'font-size: 30px' : ''">{{ wholeAmount }}</span>
              <span v-if="fractionAmount" class="fraction">.{{ fractionAmount }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="entity-buyer-name">
            <div class="title">{{ $t("contract.buyer_name") }}:</div>
            <div class="text">{{ buyerName }}</div>
          </div>
          <div class="entity-region" v-if="region">
            <div class="title">{{ $t("contract.delivery_regions") }}:</div>
            <div class="text">{{ region }}</div>
          </div>
          <div class="entity-type" v-if="type">
            <div class="title">{{ $t("contract.procedure_type") }}:</div>
            <div class="text">{{ type }}</div>
          </div>
          <div class="entity-id">
            <div class="title">{{ $t("contract.tender_id") }}:</div>
            <div class="text">{{ entityId }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getDataFromObject, formatDate } from "../../utils";
import procedureTypes from "./../../store/types/procedures-types";

export default {
  name: "ContractsCard",
  props: {
    entity: {
      type: Object,
      required: true,
    },
    needLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    parseStatusText() {
      const status = getDataFromObject(this.entity, _ => _.procedureStatus);
      switch (status) {
        case "execution":
          return "Execution";
        default:
          return "";
      }
    },
    modifiedDate() {
      return formatDate(getDataFromObject(this.entity, _ => _.modifiedDate));
    },
    title() {
      return getDataFromObject(this.entity, _ => _.title);
    },
    description() {
      return getDataFromObject(this.entity, _ => _.description);
    },
    currency() {
      return getDataFromObject(this.entity, _ => _.currency);
    },
    wholeAmount() {
      const amountStr = getDataFromObject(this.entity, _ => _.amount, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
    },
    fractionAmount() {
      const amountStr = getDataFromObject(this.entity, _ => _.amount, 0).toString();
      return /\./.test(amountStr)
        ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1
          ? amountStr.slice(amountStr.indexOf(".") + 1) + "0"
          : amountStr.slice(amountStr.indexOf(".") + 1)
        : "";
    },
    region() {
      return getDataFromObject(this.entity, _ => _.buyerRegion);
    },
    type() {
      return getDataFromObject(this.entity, _ => _.procedureType)
        ? procedureTypes.contracts.find(it => it.value === getDataFromObject(this.entity, _ => _.procedureType)).name[
            this.$i18n.locale
          ]
        : "";
    },
    buyerName() {
      return getDataFromObject(this.entity, _ => _.buyerName);
    },
    id() {
      return getDataFromObject(this.entity, _ => _.id);
    },
    entityId() {
      return getDataFromObject(this.entity, _ => _.entityId);
    },
  },
};
</script>
