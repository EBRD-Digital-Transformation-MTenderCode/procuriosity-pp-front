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
          {{$t("tender.last_modified_date")}} <span class="entity-update__date">{{ modifiedDate }}</span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <router-link v-if="needLink" :to="`/tenders/${entityId}`" data-link class="entity-title">
            {{ title }}
          </router-link>
          <div v-else class="entity-title">
            {{ title }}
          </div>
          <div class="entity-description">
            {{ description }}
          </div>
          <!--<div class="entity-links">
            <a :href="`https://achizitii.md/${$i18n.locale}/tenders/${entityId}`" target="_blank">
              <img src="@/assets/achizitii.md .png" alt="Achizitii logo" >
            </a>
            <a :href="`https://yptender.md/tender/${entityId}`" target="_blank">
              <img src="@/assets/yptender.png" alt="Yptender logo" >
            </a>
            <a :href="`https://e-licitatie.md/${$i18n.locale}/mtender/${entityId}`" target="_blank">
              <img src="@/assets/e-lici.png" alt="E-lici logo" >
            </a>
          </div>-->
        </el-col>
        <el-col :xs="24" :sm="6">
          <div class="entity-amount">
            <div class="entity-amount__text">{{$t("tender.value")}} ({{ currency }})</div>
            <div class="entity-amount__number">
              <span
                  class="whole"
                  :style="wholeAmount.length > 10 ? 'font-size: 30px': ''"
              >
                {{ wholeAmount }} <span v-if="fractionAmount">.</span>
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
  import procedureTypes from "./../../store/types/procedures-types"
  
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
        switch (status) {
          case "active.auction":
            return "entity-status__ico_auction";
          case "active.qualification":
            return "entity-status__ico_qualification";
          case "active.enquiries":
          case "evaluation":
            return "entity-status__ico_enquiries";
          case "active.tendering":
            return "entity-status__ico_tendering";
          case "cancelled":
          case "empty":
            return "entity-status__ico_cancelled";
          case "active":
            return "entity-status__ico_active";
          case "active.awarded":
            return "entity-status__ico_awarded";
          case "complete":
            return "entity-status__ico_complete";
          case "unsuccessful":
            return "entity-status__ico_unsuccessful";
          default:
            return "entity-status__ico_active";
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
          case "evaluation":
            return "Enquiries Period";
          case "active.tendering":
            return "Tendering Period";
          case "cancelled":
          case "empty":
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
        if (getDataFromObject(this.entity, _ => _.procedureType) === "reporting") {
          return procedureTypes.tenders.find(it => it.value === "reporting").name[this.$i18n.locale];
        } else if (getDataFromObject(this.entity, _ => _.procedureType) === "belowThreshold") {
          return procedureTypes.tenders.find(it => it.value === "belowThreshold").name[this.$i18n.locale];
        } else if (getDataFromObject(this.entity, _ => _.procedureType) === "Licitație deschisă" && getDataFromObject(this.entity, _ => _.amount) < 1500000) {
          if (this.$i18n.locale === "en") {
            return "Request for price quotations";
          } else if (this.$i18n.locale === "ro") {
            return "Cererea ofertelor de preț";
          } else {
            return "Запрос ценовых оферт"
          }
        } else if (getDataFromObject(this.entity, _ => _.procedureType) === "Licitație deschisă") {
          return procedureTypes.tenders.find(it => it.value === "Licitație deschisă").name[this.$i18n.locale];
        } else {
          return getDataFromObject(this.entity, _ => _.procedureType);
        }
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
