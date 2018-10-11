<template>
  <div class="entity-card">
    <el-card>
      <div slot="header">
        <div class="entity-status">
          <div :class="`entity-status__ico entity-status__ico_stub`" />
          <div class="entity-status__text_stub">
            {{ parseStatusText }}
          </div>
        </div>
        <div class="entity-update">
          <span class="entity-update__date_stub"></span> <span class="entity-update__date_stub"></span>
        </div>
      </div>
      <el-row type="flex" :gutter="18">
        <el-col :xs="24" :sm="14">
          <div class="entity-title_stub">

          </div>
          <div class="entity-description_stub">

          </div>
          <div class="entity-links entity-links_stub">
            <a :href="false">
              <img src="@/assets/achizitii.md .png" alt="Achizitii logo" >
            </a>
            <a :href="false">
              <img src="@/assets/yptender.png" alt="Yptender logo" >
            </a>
            <a :href="false">
              <img src="@/assets/e-lici.png" alt="E-lici logo" >
            </a>
          </div>
        </el-col>
        <el-col :xs="24" :sm="6">
          <div class="entity-amount">
            <div class="entity-amount__text entity-amount__text_stub">{{ currency }}</div>
            <div class="entity-amount__number">
              <span class="whole whole_stub" />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4">
          <div class="entity-info_stub">
            <div class="title"></div>
            <div class="text"></div>
          </div>
          <div class="entity-info_stub">
            <div class="title"></div>
            <div class="text"></div>
          </div>
          <div class="entity-info_stub">
            <div class="title"></div>
            <div class="text"></div>
          </div>
          <div class="entity-info_stub">
            <div class="title"></div>
            <div class="text"></div>
          </div>
          <div class="entity-info_stub">
            <div class="title"></div>
            <div class="text"></div>
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
