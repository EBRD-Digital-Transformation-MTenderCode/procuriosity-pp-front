<template>
  <div class="entity-wp">
    <el-container direction="vertical">
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
        <div class="info__text" v-if="procurementInfo.hasAuction">
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
        <div class="info__text" v-if="procurementInfo.hasAuction">
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
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_TENDER } from "./../../store/types/actions-types";

  import { Container, Row, Col } from "element-ui";

  import TenderCard from "./../ListCards/TenderCard";

  import { getDataFromObject, formatDate } from "./../../utils";

  export default {
    name: "TenderPage",
    components: {
      "el-container": Container,
      "el-row": Row,
      "el-col": Col,
      "tender-card": TenderCard
    },
    data() {
      return {
        cdb: ""
      }
    },
    created() {
      if (!/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/.test(this.$route.params.id)) {
        this.cdb = "mtender1";
        this.$store.dispatch(FETCH_TENDER, {
          cdb: "mtender1",
          id: this.$route.params.id
        });
      } else {
        this.cdb = "mtender2";
        this.$store.dispatch(FETCH_TENDER, {
          cdb: "mtender2",
          id: this.$route.params.id
        })
      }
    },
    computed: {
      ...mapState({
        tender: state => state.entities.tenders.entity
      }),
      entity() {
        if (this.cdb === "mtender1") {
          const tender = this.tender.data;

          return {
            procedureStatus: getDataFromObject(tender, _ => _.status),
            modifiedDate: formatDate(getDataFromObject(tender, _ => _.dateModified)),
            title: getDataFromObject(tender, _ => _.title),
            description: getDataFromObject(tender, _ => _.description),
            currency: getDataFromObject(tender, _ => _.value.currency),
            amount: getDataFromObject(tender, _ => _.value.amount),
            buyerRegion: getDataFromObject(tender, _ => _.procuringEntity.address.region),
            procedureType: getDataFromObject(tender, _ => _.procurementMethodType),
            buyerName: getDataFromObject(tender, _ => _.procuringEntity.name),
            entityId: getDataFromObject(tender, _ => _.tenderID)
          }
        } else {
          return {}
        }
      },
      procuringEntity() {
        if (this.cdb === "mtender1") {
          const tender = this.tender.data;
          
          console.log(tender);
          
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
          }
        }
      },
      procurementInfo() {
        if (this.cdb === "mtender1") {
          const tender = this.tender.data;
          
          const hasAuction = getDataFromObject(tender, _ => _, {}).hasOwnProperty("auctionPeriod");
          const calculateMinStepPercent = () => {
            const amount = getDataFromObject(tender, _ => _.value.amount);
            const minStep = getDataFromObject(tender, _ => _.minimalStep.amount);
            return Math.round(((minStep / amount) * 100) * 100) / 100;
          };
          
          return {
            currency: getDataFromObject(tender, _ => _.value.currency),
            amount: getDataFromObject(tender, _ => _.value.amount),
            hasAuction,
            minStep: hasAuction ? `${getDataFromObject(tender, _ => _.minimalStep.amount)} (${calculateMinStepPercent()} %)` : ""
          }
        }
      },
      dates() {
        if (this.cdb === "mtender1") {
          const tender = this.tender.data;

          const hasAuction = getDataFromObject(tender, _ => _, {}).hasOwnProperty("auctionPeriod");
          
          return {
            enquiry: `${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.endDate))}`,
            tendering: `${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.endDate))}`,
            auction: hasAuction ? `${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.endDate))}` : "",
          }
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "entity-info";
</style>
