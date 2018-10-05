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
        <div class="info__text" v-if="procurementInfo.minStep">
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
      <div class="info" v-if="dates">
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
        <div class="info__text" v-if="dates.auction">
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

      <!-- Documents -->
      <div class="info" v-if="documents.length">
        <div class="info__title">Purchase Documents</div>
        <div class="info__text" v-for="(document, key) of documents" :key="document.id + key">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info-document_name">
                <div>
                  <a :href="document.url">{{ document.name }}</a>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info-document_date-published">Published on {{ document.datePublished }}</div>
              <div class="info-document_id">ID: {{ document.id }}</div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- Items -->
      <div class="info">
        <div class="info__title">Purchase Specification</div>
        <div v-for="item of items" :key="item.id">
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ item.description }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value_accent">{{ item.quantityAndUnit }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10" />
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_muted">CPV Code: {{ item.cpv }}</div>
                <div class="info__value info__value_muted">Delivery address:  {{ item.deliveryAddress}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- Bids -->
      <div class="info" v-if="bids.length">
        <div class="info__title">Proposals Registry</div>
        <table class="info-table">
          <tr>
            <th>№</th>
            <th>Tenderer Name</th>
            <th>The initial amount of the offer</th>
            <th>Final offer price</th>
            <th>Documentation</th>
          </tr>
          <tr v-for="(bid, key) of bids" :key="bid.id">
            <td>{{ ++key }}</td>
            <td>
              <div class="info__value">
                {{ bid.name }}
              </div>
              <div class="info__value info__value_muted">
                IDNO Code : {{ bid.identifier }}
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent">
                {{ bid.amount }}
              </div>
              <div class="info__value info__value_muted">
                {{ bid.currency }} without VAT
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent">
                {{ bid.amount }}
              </div>
              <div class="info__value info__value_muted">
                {{ bid.currency }} without VAT
              </div>
            </td>
            <td class="text-center">
              <a
                v-for="document of bid.documents"
                :key="document.id"
                :href="document.url"
                class="document-link"
                :title="document.title"
              />
            </td>
            </tr>
        </table>
      </div>

      <!-- Awards -->
      <div class="info" v-if="awards.length">
        <div class="info__title">Protocol for the disclosure of proposals</div>
        <table class="info-table">
          <tr>
            <th>№</th>
            <th>Supplier Name</th>
            <th>Final offer price	</th>
            <th>Status</th>
            <th>Documentation</th>
          </tr>
          <tr v-for="(award, key) of awards" :key="award.id">
            <td>{{ ++key }}</td>
            <td>
              <div class="info__value">
                {{ award.name }}
              </div>
              <div class="info__value info__value_muted">
                IDNO Code : {{ award.identifier }}
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent">
                {{ award.amount }}
              </div>
              <div class="info__value info__value_muted">
                {{ award.currency }} without VAT
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent info__value_status">
                {{ award.status }}
              </div>
            </td>
            <td class="text-center">
              <a
                v-for="document of award.documents"
                :key="document.id"
                :href="document.url"
                class="document-link"
                :title="document.title"
              />
            </td>
            </tr>
        </table>
      </div>

      <!-- Contracts -->
      <div class="info" v-if="contracts.length">
        <div class="info__title">Concluded Contracts</div>
        <div v-for="contract of contracts" :key="contract.id">
          <div class="info-contract">
            <div class="info-contract__title">{{ contract.title }}</div>
            <div class="info-contract__status">
              <div class="info-contract__status_text">{{ contract.status }}</div>
              <div :class="`info-contract__status_ico ${contract.status}`" />
            </div>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Procuring Entity</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ contract.procuringEntity }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Suppliers</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div
                  v-for="supplier of contract.suppliers"
                  :key="supplier"
                  class="info__value"
                >
                  {{ supplier }}
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Contract ID</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ contract.contractId }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Contract amount</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">{{ contract.amount }} (withot VAT)</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Contract number</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ contract.contractNumber }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Date signed</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">{{ contract.dateSigned }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Contract period start date</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">{{ contract.contractStartDate }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">Contract period end date</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">{{ contract.contractEndDate }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- Documentations -->
      <div class="info" v-if="documentations.length">
        <div class="info__title">Documentations</div>
        <div v-for="(item, key) of documentations" :key="key">
          <div class="info__text" v-for="(documentation, key) of item" :key="documentation.id + key">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="14">
                <div class="info-document_name">
                  <div>
                    <a :href="documentation.url">{{ documentation.name }}</a>
                    <div class="info__value_muted">{{ documentation.type }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="10">
                <div class="info-document_date-published">Published on {{ documentation.datePublished }}</div>
                <div class="info-document_id">ID: {{ documentation.id }}</div>
              </el-col>
            </el-row>
          </div>
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
        tender: state => state.entities.tenders.currentTender.tenderData
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

          const hasAuction = tender.hasOwnProperty("auctionPeriod");

          return {
            currency: getDataFromObject(tender, _ => _.value.currency),
            amount: getDataFromObject(tender, _ => _.value.amount),
            minStep: hasAuction ? `${getDataFromObject(tender, _ => _.minimalStep.amount)} (${calculateMinStepPercent()} %)` : ""
          };
        }
      },
      dates() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          if (tender.procurementMethodType === "reporting") {
            return false;
          }

          const hasAuction = tender.hasOwnProperty("auctionPeriod");

          return {
            enquiry: `${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.endDate))}`,
            tendering: `${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.endDate))}`,
            auction: hasAuction ?
              `${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.startDate))} -
              ${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.endDate))}` : ""
          };
        }
      },
      documents() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return getDataFromObject(tender, _ => _.documents, []).map(doc => {
            return {
              name: getDataFromObject(doc, _ => _.title),
              url: getDataFromObject(doc, _ => _.url),
              datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
              id: getDataFromObject(doc, _ => _.id)
            };
          });
        }
      },
      items() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return getDataFromObject(tender, _ => _.items, []).map(item => {
            return {
              id: getDataFromObject(item, _ => _.id),
              description: getDataFromObject(item, _ => _.description),
              quantityAndUnit: `${getDataFromObject(item, _ => _.quantity)}
                                ${getDataFromObject(item, _ => _.unit.name)}`,
              cpv: `${getDataFromObject(item, _ => _.classification.scheme)}
                    ${getDataFromObject(item, _ => _.classification.id)}
                    ${getDataFromObject(item, _ => _.classification.description)}`,
              deliveryAddress: `${getDataFromObject(item, _ => _.deliveryAddress.postalCode)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.countryName)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.region)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.locality)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.streetAddress)}`
            };
          });
        }
      },
      bids() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return getDataFromObject(tender, _ => _.bids, []).map(bid => {
            return {
              id: getDataFromObject(bid, _ => _.id),
              name: getDataFromObject(bid, _ => _.tenderers[0].name),
              identifier: `${getDataFromObject(bid, _ => _.tenderers[0].identifier.scheme)}
                           ${getDataFromObject(bid, _ => _.tenderers[0].identifier.id)} -
                           ${getDataFromObject(bid, _ => _.tenderers[0].identifier.legalName)}`,
              amount: getDataFromObject(bid, _ => _.value.amount),
              currency: getDataFromObject(bid, _ => _.value.currency),
              documents: getDataFromObject(bid, _ => _.documents, []).map(doc => {
                return {
                  id: doc.id,
                  url: doc.url,
                  title: doc.title
                };
              })
            };
          });
        }
      },
      awards() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return getDataFromObject(tender, _ => _.awards, []).map(award => {
            return {
              id: getDataFromObject(award, _ => _.id),
              name: getDataFromObject(award, _ => _.suppliers[0].name),
              identifier: `${getDataFromObject(award, _ => _.suppliers[0].identifier.scheme)}
                           ${getDataFromObject(award, _ => _.suppliers[0].identifier.id)} -
                           ${getDataFromObject(award, _ => _.suppliers[0].identifier.legalName)}`,
              amount: getDataFromObject(award, _ => _.value.amount),
              currency: getDataFromObject(award, _ => _.value.currency),
              status: getDataFromObject(award, _ => _.status),
              documents: getDataFromObject(award, _ => _.documents, []).map(doc => {
                return {
                  id: doc.id,
                  url: doc.url,
                  title: doc.title
                };
              })
            };
          });
        }
      },
      contracts() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return getDataFromObject(tender, _ => _.contracts, []).map(contract => {
            return {
              id: getDataFromObject(contract, _ => _.id),
              title: getDataFromObject(contract, _ => _.title),
              status: getDataFromObject(contract, _ => _.status),
              procuringEntity: getDataFromObject(tender, _ => _.procuringEntity.name),
              suppliers: getDataFromObject(contract, _ => _.suppliers, []).map(supplier => supplier.name),
              contractId: getDataFromObject(contract, _ => _.contractID),
              amount: getDataFromObject(contract, _ => _.value.amount),
              currency: getDataFromObject(contract, _ => _.value.currency),
              contractNumber: getDataFromObject(contract, _ => _.contractNumber),
              dateSigned: formatDate(getDataFromObject(contract, _ => _.dateSigned), "DD.MM.YYYY"),
              contractStartDate: formatDate(getDataFromObject(contract, _ => _.period.startDate), "DD.MM.YYYY"),
              contractEndDate: formatDate(getDataFromObject(contract, _ => _.period.endDate), "DD.MM.YYYY")
            };
          });
        }
      },
      documentations() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender.data;

          return getDataFromObject(tender, _ => _.contracts, []).map(contract => {
            return getDataFromObject(contract, _ => _.documents, []).map(documentation => {
              return {
                name: getDataFromObject(documentation, _ => _.title),
                url: getDataFromObject(documentation, _ => _.url),
                type: getDataFromObject(documentation, _ => _.documentType),
                datePublished: formatDate(getDataFromObject(documentation, _ => _.datePublished)),
                id: getDataFromObject(documentation, _ => _.id)
              };
            });
          });
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "entity-info";
</style>
