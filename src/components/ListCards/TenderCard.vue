<template>
  <div class="entity-card">
    <el-card>
      <div slot="header">
        <div class="entity-status">
          <div v-if="needLink" :class="`entity-status__ico ${parseStatusIco}`" />
          <div v-if="needLink" class="entity-status__text">
            {{ parseStatusText }}
          </div>
        </div>
        <div class="entity-update">
          {{$t("tender.last_modified_date")}}: <span class="entity-update__date">{{ modifiedDate }}</span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <router-link v-if="needLink" :to="`${$i18n.locale !== 'ro' ? `/${$i18n.locale}` : ''}/tenders/${entityId}`" data-link class="entity-title">
            {{ title }}
          </router-link>
          <div v-else class="entity-title">
            {{ title }}
          </div>
          <div class="entity-description" v-if="needLink">
            <!-- &lt; - https://github.com/vuejs/eslint-plugin-vue/issues/370 -->
            {{ description.length &lt; 256 ? description : `${description.substring(0, 256)}...` }}
          </div>
          <div class="entity-description" v-else>
            {{ description }}
          </div>
        </el-col>
        <el-col :xs="24" :sm="6">
          <div class="entity-amount">
            <div class="entity-amount__text">{{$t("tender.value")}} ({{ currency }})</div>
            <div class="entity-amount__number">
              <span
                class="whole"
                :style="wholeAmount.length > 10 ? 'font-size: 30px': ''"
              >
                {{ wholeAmount }}<span v-if="fractionAmount">.</span>
              </span>
              <span v-if="fractionAmount" class="fraction">{{ fractionAmount }}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="entity-pe-name">
            <div class="title">{{$t("tender.procuring_entity_name")}}:</div>
            <div class="text">{{ peName }}</div>
          </div>
          <div class="entity-region">
            <div class="title">{{$t("tender.buyer_region")}}:</div>
            <div class="text">{{ region }}</div>
          </div>


          <div class="entity-type">
            <div class="title">{{$t("tender.procedure_type")}}:</div>
            <div class="text text__status">{{ type }}</div>
          </div>


          <div class="entity-id">
            <div class="title">{{$t("tender.tender_id")}}:</div>
            <div class="text">{{ entityId }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import procedureStatuses from "./../../store/types/procedure-status-types";
  import procedureTypes from "./../../store/types/procedures-types";

  import { getDataFromObject, formatDate } from "../../utils";

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
      parseStatusIco() {
        const status = getDataFromObject(this.entity, _ => _.procedureStatus);
        if (procedureStatuses.tenders.some(it => it.value === status)) {
          return `entity-status__ico_${procedureStatuses.tenders.find(it => it.value === status).value}`;
        } else {
          return `entity-status__ico_${status}`;
        }
      },
      parseStatusText() {
        const status = getDataFromObject(this.entity, _ => _.procedureStatus);
        if (procedureStatuses.tenders.some(it => it.value === status)) {
          return procedureStatuses.tenders.find(it => it.value === status).name[this.$i18n.locale];
        } else {
          return status;
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
        if( !getDataFromObject(procedureTypes, _ => _.tenders.find(it => it.value === getDataFromObject(this.entity, _=> _.procedureType))).hasOwnProperty("name")) {
          console.warn(`Can't find procedure type : "${getDataFromObject(this.entity, _=> _.procedureType)}"`);
        }
        else return procedureTypes.tenders.find(it => it.value === getDataFromObject(this.entity, _=> _.procedureType)).name[this.$i18n.locale];
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
