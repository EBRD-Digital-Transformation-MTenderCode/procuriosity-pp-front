<template>
  <div>
    <div class="entity-nav">
      <a href="#1">Contracting authority</a>
      <a href="#2">Object</a>
      <a href="#3">Legal, economic, financial and technical information</a>
      <a href="#4">Procedure</a>
      <a href="#5">Complementary information</a>
      <a href="#6">Budget</a>
    </div>
    <div class="info">
      <div class="info__title">Contracting authority</div>
      <div class="info__sub-title">Name and address</div>
      <div class="info-blocks">
        <div class="info-block">
          <el-row>
            <el-col :sm="16">
              <div class="info-block__text">
                Official name
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.name) }}
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                National registration number
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.identifier.scheme) }}:
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.identifier.id) }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">
                Postal address
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.address.addressDetails.region.description) }},
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.address.streetAddress) }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="6">
              <div class="info-block__text">
                Town
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.address.addressDetails.locality.description) }}
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text">
                Nuts code
              </div>
              <div class="info-block__value">
                n/a
              </div>
            </el-col>
            <el-col :sm="6">
              <div class="info-block__text">
                Postal Code
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.address.postalCode, "n/a") }}
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                Country
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.address.addressDetails.country.description) }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="10">
              <div class="info-block__text">
                Contact Persone
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.contactPoint.name) }}
              </div>
            </el-col>
            <el-col :sm="6">
              <div class="info-block__text">
                Telephone
              </div>
              <div class="info-block__value">
                {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                _.contactPoint.telephone) }}
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                E-mail
              </div>
              <div class="info-block__value">
                <a
                    :href="`mailto:${gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')), _ => _.contactPoint.email) }`"
                >
                  {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ =>
                  _.contactPoint.email) }}
                </a>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="10">
              <div class="info-block__text">
                Main Internet address (URL)
              </div>
              <div class="info-block__value">
                <a href="https://www.fisc.md" target="_blank">www.fisc.md</a>
              </div>
            </el-col>
            <el-col :sm="14">
              <div class="info-block__text">
                Address of the buyer profile (URL)
              </div>
              <div class="info-block__value">
                <a
                    :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                    target="_blank">
                  www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}plans/{{ gd(gd(msRecord, _ =>
                  _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship ===
                  "planning")), _ => _.identifier) }}
                </a>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="10">
              <div class="info-block__text">
                Type of buyer
              </div>
              <div class="info-block__value">
                {{ getTypeOfBuyer }}
              </div>
            </el-col>
            <el-col :sm="14">
              <div class="info-block__text">
                Main activity
              </div>
              <div class="info-block__value">
                {{ getMainGeneralActivity }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info__sub-title">Communication</div>
      <div class="info-blocks">
        <div class="info-block">
          <el-row>
            <el-col>
              <div class="info-block__text">
                The procurement documents are available for unrestricted and full direct access, free of charge, at:
              </div>
              <div class="info-block__value">
                www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}tenders/{{ gd(msRecord, _ =>
                _.ocid) }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="info-block">
          <el-row>
            <el-col :sm="10">
              <div class="info-block__text">
                Additional information can be obtained from
              </div>
              <div class="info-block__value">
                ???Rodica Midrigan
              </div>
            </el-col>
            <el-col :sm="6">
              <div class="info-block__text">
                Telephone
              </div>
              <div class="info-block__value">
                ???+373 222 21 107
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                E-mail
              </div>
              <div class="info-block__value">
                ???odica.midrigan@fisc.md
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">
                Tenders or requests to participate must be submitted electronically via:
              </div>
              <div class="info-block__value flex">
                <a
                    class="partner-link"
                    v-for="platform of randomSortPlatforms"
                    :key="platform.name"
                    :href="platform.href"
                    :title="platform.name"
                >
                  <img :src="platform.src" :alt="platform.name" class="partner-img">
                </a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info__title">Object</div>
      <div class="info__sub-title">Scope of procurement</div>
      <div class="info-blocks">
        <div class="info-block">
          <el-row>
            <el-col :sm="16">
              <div class="info-block__text">Title</div>
              <div class="info-block__value">???Lucrări de instalaţii pentru clădiri</div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">Reference number</div>
              <div class="info-block__value">???MD-IDNO: 1007601009037</div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="10">
              <div class="info-block__text">Main CPV code</div>
              <div class="info-block__value">
                {{ gd(msRecord, _ => _.tender.classification.id) }} -
                {{ gd(msRecord, _ => _.tender.classification.description) }}
              </div>
            </el-col>
            <el-col :sm="6">
              <div class="info-block__text">Supplementary CPV code</div>
              <div class="info-block__value">???n/a</div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">Type of contract</div>
              <!-- @TODO need do first letter big -->
              <div class="info-block__value info-block__value_name">{{ gd(msRecord, _ =>
                _.tender.mainProcurementCategory) }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">Estimated total value excluding VAT</div>
              <div class="info-block__value">
                {{ gd(msRecord, _ => _.tender.value.amount) }}
                {{ gd(msRecord, _ => _.tender.value.currency) }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">Short description</div>
              <div class="info-block__value">
                ???Achiziționarea lucrărilor la obiectul ”Reparația capitală a sistemului de încălzire la instituția
                preșcolară nr.4 din str.Fedico,8 din mun.Bălți” conform necesităților DÎTS a
                Primăriei mun.Bălți
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">Information about lots</div>
              <div class="info-block__value">
                <div>???This contract is divided into lots</div>
                <div>???Tenders may be submitted for all lots</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info__sub-title">Description</div>
      <el-collapse accordion :value="gd(evRecord, _ => _.tender.lots[0].id, '0') + '0'">
        <el-collapse-item
            v-for="(lot, index) of gd(evRecord, _ => _.tender.lots)"
            :key="lot.id + index"
            :name="lot.id + index"
        >
          <template slot="title">
            <div class="info-block accordion-header">
              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Title</div>
                  <div class="info-block__value">
                    {{ gd(lot, _ => _.title) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">Lot number</div>
                  <div class="info-block__value">
                    {{ index + 1 }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>

          <div class="info-blocks">
            <div class="info-block">
              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Additional CPV codes</div>
                  <div class="info-block__value">
                    ???
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">Additional supplementary CPV code</div>
                  <div class="info-block__value">
                    ???
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Place of performance</div>
                  <div class="info-block__value">
                    {{ gd(lot, _ => _.placeOfPerformance.address.postalCode, "n/a") }},
                    {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.country.description) }},
                    {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.region.description) }},
                    {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.locality.description) }},
                    {{ gd(lot, _ => _.placeOfPerformance.address.streetAddress) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">NUTS code</div>
                  <div class="info-block__value">
                    n/a
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Description of the procurement:</div>
                  <div class="info-block__value">
                    <div>Lucrări de construcţii complete sau parţiale şi lucrări publice</div>
                    <div>45210000-2 Lucrări de construcţii de clădiri</div>
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__value">
                    589 Metru patrat
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info__sub-title">Level of Performance</div>
          <div class="info-blocks">
            <div class="info-block">
              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Warranty Period</div>
                  <div class="info-block__value">
                    A minimum product warranty of 1 year is required for all bids. Extended warranties receive an advantage
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">???1 year</div>
                  <div class="info-block__value">???is required as minimum</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Applicable options</div>
                  <div class="info-block__value">
                    <div>???1 year of warranty period guaranteed</div>
                    <div>???2 year of warranty period guaranteed</div>
                    <div>???3 year of warranty period guaranteed</div>
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">Coefficients</div>
                  <div class="info-block__value">
                    <div>???1.0</div>
                    <div>???0.95</div>
                    <div>???0.9</div>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Terms of delivery</div>
                  <div class="info-block__value">
                    A minimum product warranty of 1 year is required for all bids. Extended warranties receive an advantage
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">???4 weeks</div>
                  <div class="info-block__value">???is required as maximum</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">Applicable options</div>
                  <div class="info-block__value">
                    <div>???Delivery during 4 weeks </div>
                    <div>???Delivery during 3 weeks </div>
                    <div>???Delivery during 2 weeks </div>
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">Coefficients</div>
                  <div class="info-block__value">
                    <div>???0.94</div>
                    <div>???0.93</div>
                    <div>???0.92</div>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text info-block__text_accent">
                    Price–Weighting
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__value info-block__value_accent">
                    ???60%
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row>
                <el-col :sm="24">
                  <div class="info-block__text">Destimated value excluding VAT</div>
                  <div class="info-block__value">
                    {{ gd(lot, _ => _.value.amount) }} {{ gd(lot, _ => _.value.currency) }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row>
                <el-col :sm="24">
                  <div class="info-block__text">Duration of the contract, framework agreement or dynamic purchasing system</div>
                  <div class="info-block__value">
                    Start: {{ fd(gd(lot, _ => _.contractPeriod.startDate), "DD/MM/YYYY") }} /
                    End: {{ fd(gd(lot, _ => _.contractPeriod.endDate), "DD/MM/YYYY") }}
                    <div>???This contract is not a subject to renewal</div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row>
                <el-col :sm="24">
                  <div class="info-block__text">Information about variants</div>
                  <div class="info-block__value">
                    Variants will not be accepted
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row>
                <el-col :sm="24">
                  <div class="info-block__text">Information about options</div>
                  <div class="info-block__value">
                    No options
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import typesOfBuyers from "./../../../../store/types/buyers-types";
import mainGeneralActivites from "./../../../../store/types/main-general-activity-types";

import { getDataFromObject, formatDate } from "../../../../utils";

export default {
  name: "ContractNotice",
  props: {
    msRecord: {
      type: Object,
      required: true
    },
    evRecord: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      platforms: [
        {
          href: "https://yptender.md/",
          src: "/img/yptender.png",
          name: "YPTENDER.MD"
        },
        {
          href: "https://e-licitatie.md/",
          src: "/img/e-lici.png",
          name: "e-licitatie.md"
        },
        {
          href: "https://achizitii.md/",
          src: "/img/achizitii.md.png",
          name: "achizitii.md"
        }
      ]
    };
  },
  created() {
    console.log("MS", this.msRecord);
    console.log("EV", this.evRecord);
  },
  computed: {
    getTypeOfBuyer() {
      if (!this.gd(this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.details.typeOfBuyer)) {
        return "n/a";
      }

      return typesOfBuyers.find(type => type.value === this.gd(this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.details.typeOfBuyer)).name[this.$i18n.locale];
    },
    getMainGeneralActivity() {
      if (!this.gd(this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.details.mainGeneralActivity)) {
        return "n/a";
      }

      return mainGeneralActivites.find(activity => activity.value === this.gd(this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")), _ => _.details.mainGeneralActivity)).name[this.$i18n.locale];
    },
    randomSortPlatforms() {
      return [...this.platforms].sort(() => 0.5 - Math.random());
    }
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(...ars) {
      return formatDate(...ars);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../../../styles/variables";

  .info {
    &__title {
      padding: 25px 0;
      border-bottom: 1px solid #d9d9d9;
      font-size: 30px;
      font-weight: 700;
      color: $mainC;
    }
    &__sub-title {
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 700;
    }

    &-block {
      &:not(:last-child) {
        border-bottom: 1px solid #d9d9d9;
      }
      padding: 10px 0;
      &__text {
        margin-bottom: 5px;
        font-size: 13px;
      }
      &__value {
        margin-bottom: 5px;
        padding-right: 10px;
        font-size: 15px;
        img {
          max-width: 150px;
        }
      }
      .flex {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
      }
    }
    .accordion-header {
      width: 100%;
      line-height: 1;
      padding: 10px;
    }
  }

</style>