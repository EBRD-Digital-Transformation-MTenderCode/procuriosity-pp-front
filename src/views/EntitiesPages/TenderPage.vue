<template>
  <el-container direction="vertical">
    <tender-card
      :entity="entity"
    />
    <div class="info">
      <div class="info__title">Procuring Entity</div>
      <div class="info__text">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="8">
            <div class="info__name">Procuring Entity full name</div>
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="info__value">trulyalya</div>
          </el-col>
        </el-row>
      </div>
      <div class="info__text">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="8">
            <div class="info__name">Procuring Entity full name</div>
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="info__value">trulyalya</div>
          </el-col>
        </el-row>
      </div>
      <div class="info__text">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="8">
            <div class="info__name">Procuring Entity full name</div>
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="info__value">trulyalya</div>
          </el-col>
        </el-row>
      </div>
      <div class="info__text">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="8">
            <div class="info__name">Procuring Entity full name</div>
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="info__value">trulyalya</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-container>
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
      }
    }
  };
</script>

<style lang="scss">
  @import "entity-info";
</style>
