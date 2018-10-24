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
          {{$t("message.contract_card_last_modified_date")}} <span class="entity-update__date">{{ modifiedDate }}</span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <router-link v-if="needLink" :to="`/contracts/${id}`" data-link class="entity-title">
            {{ title }}
          </router-link>
          <div v-else class="entity-title">
            {{ title }}
          </div>
          <div class="entity-description">
            {{ description }}
          </div>
          <!--<div class="entity-links">
            <a :href="`https://achizitii.md/${$i18n.locale}/public/contract/${entityId}`" target="_blank">
              <img src="@/assets/achizitii.md .png" alt="Achizitii logo" >
            </a>
            <a :href="`https://yptender.md/contract/create/${entityId}/show`" target="_blank">
              <img src="@/assets/yptender.png" alt="Yptender logo" >
            </a>
            <a :href="`https://e-licitatie.md/${$i18n.locale}/contract/${entityId}`" target="_blank">
              <img src="@/assets/e-lici.png" alt="E-lici logo" >
            </a>
          </div>-->
        </el-col>
        <el-col :xs="24" :sm="6">
          <div class="entity-amount">
            <div class="entity-amount__text">
              {{$t("message.contract_card_value")}} ({{ currency ? currency: "MDL" }})
            </div>
            <div class="entity-amount__number">
              <span class="whole" :style="wholeAmount.length > 10 ? 'font-size: 30px': ''">{{ wholeAmount }}<span
                  v-if="fractionAmount">.</span></span>
              <span v-if="fractionAmount" class="fraction">{{ fractionAmount }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="entity-pe-name">
            <div class="title">{{$t("message.contract_card_procuring_entity_name")}}</div>
            <div class="text">{{ peName }}</div>
          </div>
          <div class="entity-region" v-if="region">
            <div class="title">{{$t("message.contract_card_delivery_regions")}}</div>
            <div class="text">{{ region }}</div>
          </div>
          <div class="entity-type" v-if="type">
            <div class="title">{{$t("message.contract_card_procedure_type")}}</div>
            <div class="text">{{ type }}</div>
          </div>
          <div class="entity-id">
            <div class="title">{{$t("message.contract_card_tender_id")}}</div>
            <div class="text">{{ entityId }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { getDataFromObject, formatDate } from "./../../utils";

  export default {
    name: "TenderCard",
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
        return getDataFromObject(this.entity, _ => _.entityId);
      }
    }
  };
</script>
