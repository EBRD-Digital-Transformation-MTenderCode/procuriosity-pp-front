<template>
  <div class="entity-wp">
    <el-container direction="vertical" v-if="Object.keys(tender).length">
      <tender-card
        :entity="entity"
      />

      <!-- Procuring entity -->
      <div class="info">
        <div class="info__title">Procuring Entity</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Procuring Entity full name</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.fullName }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">IDNO of Procuring Entity</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.identifier }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Legal address</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.address }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Person responsible for the procurement procedure</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.responsiblePerson }}</div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- Procurement info -->
      <div class="info">
        <div class="info__title">Information about the procurement procedure</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Estimated Value without VAT ({{ procurementInfo.currency }})</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ procurementInfo.amount }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text" v-if="hasAuction">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Minimum amount of price reduction ({{ procurementInfo.currency }})</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ procurementInfo.minStep }}</div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- @TODO need add test on tender without dates and don`t render this block -->
      <!-- Dates -->
      <div class="info">
        <div class="info__title">Dates and terms</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Enquiries period</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ dates.enquiry }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Tendering period</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ dates.tendering }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text" v-if="hasAuction">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">Auction period</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ dates.auction }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-container>
    <el-container v-else>
      LOADING...
    </el-container>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_CURRENT_TENDER_INFO } from "./../../store/types/actions-types";

  import { Container, Row, Col } from "element-ui";

  import TenderCard from "./../ListCards/TenderCard";

  import { MTENDER1, MTENDER2 } from "./../../store/types/cbd-types";

  import { getDataFromObject, formatDate } from "./../../utils";

  export default {
    name: "TenderPage",
    components: {
      "el-container": Container,
      "el-row": Row,
      "el-col": Col,
      "tender-card": TenderCard
    },
    created: function() {
      const regexMtener2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;
      const id = this.$route.params.id;
      const cdb = !regexMtener2Id.test(id) ? MTENDER1 : MTENDER2;

      this.$store.dispatch(FETCH_CURRENT_TENDER_INFO, {
        cdb,
        id
      });
    },
    computed: {
      ...mapState({
        cdb: state => state.entities.tenders.currentTender.cdb,
        tender: state => state.entities.tenders.currentTender.tenderData,
        hasAuction: state => state.entities.tenders.currentTender.hasAuction
      }),
      entity() {
        if (this.cdb === MTENDER1) {
          console.log(this.tender.data); // @TODO need delete after parsing JSON

          const tender = this.tender.data;

          return {
            procedureStatus: getDataFromObject(tender, _ => _.status),
            modifiedDate: getDataFromObject(tender, _ => _.dateModified),
            title: getDataFromObject(tender, _ => _.title),
            description: getDataFromObject(tender, _ => _.description),
            currency: getDataFromObject(tender, _ => _.value.currency),
            amount: getDataFromObject(tender, _ => _.value.amount),
            buyerRegion: getDataFromObject(tender, _ => _.procuringEntity.address.region),
            procedureType: getDataFromObject(tender, _ => _.procurementMethodType),
            buyerName: getDataFromObject(tender, _ => _.procuringEntity.name),
            entityId: getDataFromObject(tender, _ => _.tenderID)
          };
        } else {
          return {};
        }
      },
      procuringEntity() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return {
            fullName: getDataFromObject(tender, _ => _.procuringEntity.name),
            identifier: `${getDataFromObject(tender, _ => _.procuringEntity.identifier.scheme)}
                         ${getDataFromObject(tender, _ => _.procuringEntity.identifier.id)} -
                         ${getDataFromObject(tender, _ => _.procuringEntity.identifier.legalName)}`,
            address: `${getDataFromObject(tender, _ => _.procuringEntity.address.postalCode)},
                      ${getDataFromObject(tender, _ => _.procuringEntity.address.countryName)},
                      ${getDataFromObject(tender, _ => _.procuringEntity.address.region)},
                      ${getDataFromObject(tender, _ => _.procuringEntity.address.locality)},
                      ${getDataFromObject(tender, _ => _.procuringEntity.address.streetAddress)}`,
            responsiblePerson: `${getDataFromObject(tender, _ => _.procuringEntity.contactPoint.name)} /
                                ${getDataFromObject(tender, _ => _.procuringEntity.contactPoint.email)} /
                                ${getDataFromObject(tender, _ => _.procuringEntity.contactPoint.telephone)}`
          };
        }
      },
      procurementInfo() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          const calculateMinStepPercent = () => {
            const amount = getDataFromObject(tender, _ => _.value.amount);
            const minStep = getDataFromObject(tender, _ => _.minimalStep.amount);
            return Math.round(((minStep / amount) * 100) * 100) / 100;
          };

          return {
            currency: getDataFromObject(tender, _ => _.value.currency),
            amount: getDataFromObject(tender, _ => _.value.amount),
            minStep: this.hasAuction ? `${getDataFromObject(tender, _ => _.minimalStep.amount)} (${calculateMinStepPercent()} %)` : ""
          };
        }
      },
      dates() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return {
            enquiry: `${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.endDate))}`,
            tendering: `${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.endDate))}`,
            auction: this.hasAuction ? `${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.endDate))}` : ""
          };
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "entity-info";
</style>
