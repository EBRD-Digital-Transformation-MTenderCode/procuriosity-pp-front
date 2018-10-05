<template>
  <div class="entity-card">
    <el-card>
      <div slot="header">
        <div class="entity-status">
          <div :class="`entity-status__ico ${parseStatusIco}`" />
          <div class="entity-status__text">
            {{ parseStatusText }}
          </div>
        </div>
        <div class="entity-update">
          Last Modified Date: <span class="entity-update__date">{{ modifiedDate }}</span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <router-link v-if="needLink" :to="`/tender/${id}`" data-link class="entity-title">
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
            <div class="entity-amount__text">Estimated Value without VAT ({{ currency }})</div>
            <div class="entity-amount__number">
              <span class="whole" :style="wholeAmount.length > 10 ? 'font-size: 30px': ''">{{ wholeAmount }}<span
                  v-if="fractionAmount">.</span></span>
              <span v-if="fractionAmount" class="fraction">{{ fractionAmount }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="entity-region">
            <div class="title">Delivery Region:</div>
            <div class="text">{{ region }}</div>
          </div>
          <div class="entity-type">
            <div class="title">Procedure type:</div>
            <div class="text">{{ type }}</div>
          </div>
          <div class="entity-pe-name">
            <div class="title">Procuring Entity Name:</div>
            <div class="text">{{ peName }}</div>
          </div>
          <div class="entity-id">
            <div class="title">TenderID:</div>
            <div class="text">{{ entityId }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { Card, Row, Col } from "element-ui";

  import { getDataFromObject, formatDate } from "../../utils";

  export default {
    name: "TenderCard",
    components: {
      "el-card": Card,
      "el-row": Row,
      "el-col": Col
    },
    props: {
      entity: {
        type: Object,
        required: true
      },
      needLink: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      parseStatusIco() {
        const status = getDataFromObject(this.entity, _ => _.procedureStatus);
        switch (status) {
          case "active.auction":
            return "entity-status__ico_auction";
          case "active.qualification":
            return "entity-status__ico_qualification";
          case "active.enquiries":
            return "entity-status__ico_enquiries";
          case "active.tendering":
            return "entity-status__ico_tendering";
          case "cancelled":
            return "entity-status__ico_cancelled";
          case "active":
            return "entity-status__ico_active";
          case "active.awarded":
            return "entity-status__ico_awarded";
          case "complete":
            return "entity-status__ico_complete";
          case "unsuccessful":
            return "entity-status__ico_unsuccessful";
        }
      },
      parseStatusText() {
        const status = getDataFromObject(this.entity, _ => _.procedureStatus);
        switch (status) {
          case "active.auction":
            return "Auction Period";
          case "active.qualification":
            return "Qualification Period";
          case "active.enquiries":
            return "Enquiries Period";
          case "active.tendering":
            return "Tendering Period";
          case "cancelled":
            return "Cancelled tender";
          case "active":
            return "Published";
          case "active.awarded":
            return "Awarded";
          case "complete":
            return "Complete";
          case "unsuccessful":
            return "Unsuccessful Tender";
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
        const amountStr = getDataFromObject(this.entity, _ => _.amount, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return /\./.test(amountStr) ? amountStr.slice(0, amountStr.indexOf(".")) : amountStr;
      },
      fractionAmount() {
        const amountStr = getDataFromObject(this.entity, _ => _.amount, 0).toString();
        return /\./.test(amountStr) ? amountStr.slice(amountStr.indexOf(".") + 1).length === 1 ? amountStr.slice(amountStr.indexOf(".") + 1) + "0" : amountStr.slice(amountStr.indexOf(".") + 1) : "";
      },
      region() {
        return getDataFromObject(this.entity, _ => _.buyerRegion);
      },
      type() {
        return getDataFromObject(this.entity, _ => _.procedureType);
      },
      peName() {
        return getDataFromObject(this.entity, _ => _.buyerName);
      },
      id() {
        return getDataFromObject(this.entity, _ => _.id);
      },
      entityId() {
        return getDataFromObject(this.entity, _ => _.entityId)
      }
    }
  };
</script>

<style lang="scss">
  @import "card";
</style>
