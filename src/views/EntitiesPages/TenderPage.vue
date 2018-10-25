<template>
  <div class="entity-wp">
    <el-container direction="vertical" v-if="Object.keys(tender).length">
      <tender-card
          :entity="entity"
      />
  
      <!-- Procuring entity -->
      <div class="info">
        <div class="info__title">{{ $t("tender.procuring_entity") }}</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.procuring_entity_full_name") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.fullName }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.procuring_entity_identifier") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.identifier }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.procuring_entity_address") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.address }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.procuring_entity_responsible_person") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value">{{ procuringEntity.responsiblePerson }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
  
      <!-- Procurement info -->
      <div class="info">
        <div class="info__title">{{ $t("tender.procuring_info") }}</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.procuring_info_value") }} ({{ procurementInfo.currency }})</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ procurementInfo.amount }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text" v-if="procurementInfo.minStep">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.procuring_info_min_step") }} ({{ procurementInfo.currency }})</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ procurementInfo.minStep }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
  
      <!-- Dates -->
      <div class="info" v-if="dates">
        <div class="info__title">{{ $t("tender.dates") }}</div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.dates_enquiry") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ dates.enquiry }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.dates_tendering") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ dates.tendering }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="info__text" v-if="dates.auction">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info__name">{{ $t("tender.dates_auction") }}</div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info__value info__value_accent">{{ dates.auction }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
  
      <!-- Documents -->
      <div class="info" v-if="documents.length">
        <div class="info__title">{{ $t("tender.documents") }}</div>
        <div class="info__text" v-for="(document, key) of documents" :key="document.id + key">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info-document_name">
                <div>
                  <a :href="document.url" :title="document.name">{{ document.name }}</a>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info-document_date-published">{{ $t("tender.documents_published") }} {{ document.datePublished }}</div>
              <div class="info-document_id">{{ $t("tender.documents_id") }}: {{ document.id }}</div>
            </el-col>
          </el-row>
          
          <el-row v-for="(oldDoc, index) of document.oldVersions" :key="oldDoc.id + index" class="info-old-document"
                  :gutter="30">
            <el-col :xs="24" :sm="10">
              <div class="info-document_name">
                <div>
                  <a :href="oldDoc.url" :title="oldDoc.name">{{ oldDoc.name }}</a>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="14">
              <div class="info-document_date-published">{{ $t("tender.documents_published") }} {{ oldDoc.datePublished }}</div>
              <div class="info-document_id">{{ $t("tender.documents_id") }}: {{ oldDoc.id }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
  
      <!-- Items -->
      <div class="info">
        <div class="info__title">{{ $t("tender.items") }}</div>
        <template v-for="item in items">
          <div class="info__text" :key="item.id">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name" :title="item.description">{{ item.description }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value_accent">{{ item.quantityAndUnit }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text" :key="item.id + 1">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10" />
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_muted">
                  {{ $t("tender.items_cpv") }}: {{ item.cpv }}
                </div>
                <div class="info__value info__value_muted">
                  {{ $t("tender.items_delivery_address") }}:  {{ item.deliveryAddress}}
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
  
      <!-- Bids -->
      <div class="info" v-if="bids.length">
        <div class="info__title">{{ $t("tender.bids") }}</div>
        <table class="info-table">
          <tr>
            <th>№</th>
            <th>{{ $t("tender.bids_tenderer_name") }}</th>
            <th>{{ $t("tender.bids_initial_amount") }}</th>
            <th>{{ $t("tender.bids_final_amount") }}</th>
            <th>{{ $t("tender.bids_documents") }}</th>
          </tr>
          <tr v-for="(bid, key) of bids" :key="bid.id">
            <td>{{ ++key }}</td>
            <td>
              <div class="info__value">
                {{ bid.name }}
              </div>
              <div class="info__value info__value_muted">
                {{ $t("tender.bids_tenderer_identifier") }}: {{ bid.identifier }}
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent">
                {{ bid.amount }}
              </div>
              <div class="info__value info__value_muted">
                {{ bid.currency }} {{ $t("tender.bids_currency") }}
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent">
                {{ bid.amount }}
              </div>
              <div class="info__value info__value_muted">
                {{ bid.currency }} {{ $t("tender.bids_currency") }}
              </div>
            </td>
            <td class="text-center">
              <button
                  v-if="bid.documents.length"
                  type="button"
                  @click="$refs[bid.id][0].open = true"
                  class="document-link"
              />

              <documents-modal
                  :ref="bid.id"
                  :open="false"
                  :documents="bid.documents"
              />
            </td>
          </tr>
        </table>
      </div>
  
      <!-- Awards -->
      <div class="info" v-if="awards.length">
        <div class="info__title">
          {{ $t("tender.awards") }}
          <div class="info__title_sub">
            {{ $t("tender.awards_date") }}: {{ awardsStartDate}}
          </div>
        </div>
        <table class="info-table">
          <tr>
            <th>№</th>
            <th>{{ $t("tender.awards_supplier_name") }}</th>
            <th>{{ $t("tender.awards_final_offer") }}</th>
            <th>{{ $t("tender.awards_status") }}</th>
            <th>{{ $t("tender.awards_documents") }}</th>
          </tr>
          <tr v-for="(award, key) of awards" :key="award.id">
            <td>{{ ++key }}</td>
            <td>
              <div class="info__value">
                {{ award.name }}
              </div>
              <div class="info__value info__value_muted">
                {{ $t("tender.awards_supplier_identifier") }}: {{ award.identifier }}
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent">
                {{ award.amount }}
              </div>
              <div class="info__value info__value_muted">
                {{ award.currency }} {{ $t("tender.awards_currency") }}
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent info__value_status">
                {{ award.status }}
              </div>
            </td>
            <td class="text-center">
              <button
                  v-if="award.documents.length"
                  type="button"
                  @click="$refs[award.id][0].open = true"
                  class="document-link"
              />

              <documents-modal
                  :ref="award.id"
                  :open="false"
                  :documents="award.documents"
              />
            </td>
          </tr>
        </table>
      </div>
  
      <!-- Active awards -->
      <div class="info" v-if="activeAwards.length">
        <div class="info__title">{{ $t("tender.active_awards") }}</div>
        <table class="info-table">
          <tr>
            <th>{{ $t("tender.active_awards_supplier_name") }}</th>
            <th>{{ $t("tender.active_awards_final_offer") }}</th>
            <th>{{ $t("tender.active_awards_date_published") }}</th>
          </tr>
          <tr v-for="award of activeAwards" :key="award.id">
            <td>
              <div class="info__value">
                {{ award.name }}
              </div>
              <div class="info__value info__value_muted">
                {{ $t("tender.active_awards_supplier_identifier") }}: {{ award.identifier }}
              </div>
            </td>
            <td>
              <div class="info__value info__value_accent">
                {{ award.amount }}
              </div>
              <div class="info__value info__value_muted">
                {{ award.currency }} {{ $t("tender.active_awards_supplier_currency") }}
              </div>
            </td>
            <td>
              <div class="info__value">
                {{ award.publishedDate }}
              </div>
            </td>
          </tr>
        </table>
      </div>
  
      <!-- Contracts -->
      <div class="info" v-if="contracts.length">
        <div class="info__title">{{ $t("tender.contracts") }}</div>
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
                <div class="info__name">{{ $t("tender.contracts_procuring_entity") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ contract.procuringEntity }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("tender.contracts_suppliers") }}</div>
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
                <div class="info__name">{{ $t("tender.contracts_id") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ contract.contractId }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("tender.contracts_amount") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">
                  {{ contract.amount }} ({{ $t("tender.contracts_currency") }})
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("tender.contracts_number") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value">{{ contract.contractNumber }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("tender.contracts_date_signed") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">{{ contract.dateSigned }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("tender.contracts_start_date") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">{{ contract.contractStartDate }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="info__name">{{ $t("tender.contracts_end_date") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="info__value info__value_accent">{{ contract.contractEndDate }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
  
      <!-- Documentation -->
      <div class="info" v-if="documentation.length">
        <div class="info__title">{{ $t("tender.documentation") }}</div>
        <div class="info__text" v-for="(document, index) of documentation" :key="document.id + index">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="14">
              <div class="info-document_name">
                <div>
                  <a :href="document.url">{{ document.name }}</a>
                  <div class="info__value_muted">{{ document.type }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="10">
              <div class="info-document_date-published">{{ $t("tender.documents_published") }} {{ document.datePublished }}</div>
              <div class="info-document_id">ID: {{ document.id }}</div>
            </el-col>
          </el-row>
          
          <el-row
              v-for="(oldDoc, index) of document.oldVersions"
              :key="oldDoc.id + index"
              class="info-old-document"
              :gutter="30"
          >
            <el-col :xs="24" :sm="14">
              <div class="info-document_name">
                <div>
                  <a :href="oldDoc.url" :title="oldDoc.name">{{ oldDoc.name }}</a>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="10">
              <div class="info-document_date-published">{{ $t("tender.documents_published") }} {{ oldDoc.datePublished }}</div>
              <div class="info-document_id">{{ $t("tender.documents_id") }}: {{ oldDoc.id }}</div>
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

  import TenderCard from "./../ListCards/TenderCard";
  import DocumentsModal from "./DocumentsModal";

  import { MTENDER1, MTENDER2 } from "./../../store/types/cbd-types";

  import { getDataFromObject, formatDate } from "./../../utils";

  export default {
    name: "TenderPage",
    components: {
      "tender-card": TenderCard,
      "documents-modal": DocumentsModal
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
          const tender = this.tender;

          return {
            procedureStatus: getDataFromObject(tender, _ => _.status),
            modifiedDate: getDataFromObject(tender, _ => _.dateModified),
            title: getDataFromObject(tender, _ => _.title),
            description: getDataFromObject(tender, _ => _.description),
            currency: getDataFromObject(tender, _ => _.value.currency),
            amount: getDataFromObject(tender, _ => _.value.amount),
            buyerName: getDataFromObject(tender, _ => _.procuringEntity.name),
            buyerRegion: getDataFromObject(tender, _ => _.procuringEntity.address.region),
            procedureType: getDataFromObject(tender, _ => _.procurementMethodType),
            entityId: getDataFromObject(tender, _ => _.tenderID)
          };
        } else {
          const MSRecord = this.tender.MSRecord.compiledRelease;
          const EVRecord = this.tender.EVRecord.compiledRelease;

          const procuringEntity = getDataFromObject(MSRecord, _ => _.parties, []).find(item => {
            return item.roles.some(role => role === "procuringEntity");
          });
        
          /*console.log(this.tender); // @TODO need delete after parsing JSON
           console.log("MSRecord ", MSRecord);
           console.log("EVRecord ", EVRecord);*/

          return {
            procedureStatus: `${getDataFromObject(EVRecord, _ => _.tender.status)} ${getDataFromObject(EVRecord, _ => _.tender.statusDetails)}`,
            modifiedDate: getDataFromObject(MSRecord, _ => _.date),
            title: getDataFromObject(MSRecord, _ => _.tender.title),
            description: getDataFromObject(MSRecord, _ => _.tender.description),
            currency: getDataFromObject(MSRecord, _ => _.tender.value.currency),
            amount: getDataFromObject(MSRecord, _ => _.tender.value.amount),
            buyerName: getDataFromObject(procuringEntity, _ => _.name),
            buyerRegion: getDataFromObject(procuringEntity, _ => _.address.addressDetails.region.description),
            procedureType: getDataFromObject(MSRecord, _ => _.tender.procurementMethodDetails),
            entityId: getDataFromObject(MSRecord, _ => _.ocid)
          };
        }
      },
      procuringEntity() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

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
        } else {
          const MSRecord = this.tender.MSRecord.compiledRelease;

          const procuringEntity = getDataFromObject(MSRecord, _ => _.parties, []).find(item => {
            return item.roles.some(role => role === "procuringEntity");
          });

          return {
            fullName: getDataFromObject(procuringEntity, _ => _.name),
            identifier: `${getDataFromObject(procuringEntity, _ => _.identifier.scheme)}
                         ${getDataFromObject(procuringEntity, _ => _.identifier.id)} -
                         ${getDataFromObject(procuringEntity, _ => _.identifier.legalName)}`,
            address: `${getDataFromObject(procuringEntity, _ => _.address.postalCode)},
                      ${getDataFromObject(procuringEntity, _ => _.address.addressDetails.country.description)},
                      ${getDataFromObject(procuringEntity, _ => _.address.addressDetails.region.description)},
                      ${getDataFromObject(procuringEntity, _ => _.address.addressDetails.locality.description)},
                      ${getDataFromObject(procuringEntity, _ => _.address.streetAddress)}`,
            responsiblePerson: `${getDataFromObject(procuringEntity, _ => _.contactPoint.name)} /
                                ${getDataFromObject(procuringEntity, _ => _.contactPoint.email)} /
                                ${getDataFromObject(procuringEntity, _ => _.contactPoint.telephone)}`
          };
        }
      },
      procurementInfo() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

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
        } else {
          const MSRecord = this.tender.MSRecord.compiledRelease;

          return {
            currency: getDataFromObject(MSRecord, _ => _.tender.value.currency),
            amount: getDataFromObject(MSRecord, _ => _.tender.value.amount)
          };
        }
      },
      dates() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

          if (tender.procurementMethodType === "reporting") {
            return false;
          }

          const hasAuction = tender.hasOwnProperty("auctionPeriod");

          return {
            enquiry: `${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.endDate))}`,
            tendering: `${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.startDate))} - ${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.endDate))}`,
            auction: hasAuction ? `${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.startDate))} -
              ${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.endDate))}` : ""
          };
        } else {
          const EVRecord = this.tender.EVRecord.compiledRelease;

          const hasAuction = EVRecord.tender.hasOwnProperty("auctionPeriod");

          return {
            enquiry: `${formatDate(getDataFromObject(EVRecord, _ => _.tender.enquiryPeriod.startDate))} - ${formatDate(getDataFromObject(EVRecord, _ => _.tender.enquiryPeriod.endDate))}`,
            tendering: `${formatDate(getDataFromObject(EVRecord, _ => _.tender.tenderPeriod.startDate))} - ${formatDate(getDataFromObject(EVRecord, _ => _.tender.tenderPeriod.endDate))}`,
            auction: hasAuction ? `${formatDate(getDataFromObject(tender, _ => _.tender.auctionPeriod.startDate))} -
              ${formatDate(getDataFromObject(tender, _ => _.tender.auctionPeriod.endDate))}` : ""
          };
        }
      },
      documents() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

          const obj = {};

          for (const item of [...getDataFromObject(tender, _ => _.documents, [])].sort((doc1, doc2) => new Date(doc2.dateModified) - new Date(doc1.dateModified))) {
            if (!obj.hasOwnProperty(item.id)) {
              obj[item.id] = {
                name: item.title,
                url: item.url,
                datePublished: formatDate(item.datePublished),
                id: item.id
              };
              obj[item.id].oldVersions = [];
            } else {
              obj[item.id].oldVersions.push({
                name: item.title,
                url: item.url,
                datePublished: formatDate(item.datePublished),
                id: item.id
              });
            }
          }

          return Object.values(obj);
        
          /*return getDataFromObject(contract, _ => _.documents, []).map(doc => {
           return {
           name: getDataFromObject(doc, _ => _.title),
           url: getDataFromObject(doc, _ => _.url),
           datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
           id: getDataFromObject(doc, _ => _.id)
           };
           });*/
        } else {
          const EVRecord = this.tender.EVRecord.compiledRelease;

          return getDataFromObject(EVRecord, _ => _.tender.documents, []).map(doc => {
            return {
              name: getDataFromObject(doc, _ => _.title),
              url: getDataFromObject(doc, _ => _.url),
              datePublished: getDataFromObject(doc, _ => _.datePublished),
              id: getDataFromObject(doc, _ => _.id)
            };
          });
        }
      },
      items() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

          return getDataFromObject(tender, _ => _.items, []).map(item => {
            return {
              id: getDataFromObject(item, _ => _.id),
              description: getDataFromObject(item, _ => _.description),
              quantityAndUnit: `${getDataFromObject(item, _ => _.quantity)}
                                ${getDataFromObject(item, _ => _.unit.name)}`,
              cpv: `${getDataFromObject(item, _ => _.classification.id)}
                    ${getDataFromObject(item, _ => _.classification.description)}`,
              deliveryAddress: `${getDataFromObject(item, _ => _.deliveryAddress.postalCode)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.countryName)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.region)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.locality)},
                                ${getDataFromObject(item, _ => _.deliveryAddress.streetAddress)}`
            };
          });
        } else {
          const EVRecord = this.tender.EVRecord.compiledRelease;

          function getDeliveryAddress(relatedLot) {
            const address = getDataFromObject(EVRecord, _ => _.tender.lots, []).find(lot => lot.id === relatedLot).placeOfPerformance.address;

            return `
              ${getDataFromObject(address, _ => _.postalCode)},
              ${getDataFromObject(address, _ => _.addressDetails.country.description)},
              ${getDataFromObject(address, _ => _.addressDetails.region.description)},
              ${getDataFromObject(address, _ => _.addressDetails.locality.description)},
              ${getDataFromObject(address, _ => _.postalCode)}
            `;
          }

          return getDataFromObject(EVRecord, _ => _.tender.items, []).map(item => {
            return {
              id: getDataFromObject(item, _ => _.id),
              description: getDataFromObject(item, _ => _.description),
              quantityAndUnit: `${getDataFromObject(item, _ => _.quantity)}
                                ${getDataFromObject(item, _ => _.unit.name)}`,
              cpv: `${getDataFromObject(item, _ => _.classification.id)}
                    ${getDataFromObject(item, _ => _.classification.description)}`,
              deliveryAddress: getDeliveryAddress(getDataFromObject(item, _ => _.relatedLot))
            };
          });
        }
      },
      bids() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

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
                  name: getDataFromObject(doc, _ => _.title),
                  url: getDataFromObject(doc, _ => _.url),
                  datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
                  id: getDataFromObject(doc, _ => _.id)
                };
              })
            };
          });
        } else {
          const EVRecord = this.tender.EVRecord.compiledRelease;

          return getDataFromObject(EVRecord, _ => _.bids.details, []).map(bid => {
            return {
              id: getDataFromObject(bid, _ => _.id),
              name: getDataFromObject(bid, _ => _.tenderers[0].name),
              identifier: `${getDataFromObject(bid, _ => _.tenderers[0].id)}`,
              amount: getDataFromObject(bid, _ => _.value.amount),
              currency: getDataFromObject(bid, _ => _.value.currency),
              documents: getDataFromObject(bid, _ => _.documents, []).map(doc => {
                return {
                  name: getDataFromObject(doc, _ => _.title),
                  url: getDataFromObject(doc, _ => _.url),
                  datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
                  id: getDataFromObject(doc, _ => _.id)
                };
              })
            };
          });
        }
      },
      awardsStartDate() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

          return formatDate(getDataFromObject(tender, _ => _.awardPeriod.startDate));
        } else {
          const EVRecord = this.tender.EVRecord.compiledRelease;

          return formatDate(getDataFromObject(EVRecord, _ => _.tender.awardPeriod.startDate));
        }
      },
      awards() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

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
                  name: getDataFromObject(doc, _ => _.title),
                  url: getDataFromObject(doc, _ => _.url),
                  datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
                  id: getDataFromObject(doc, _ => _.id)
                };
              })
            };
          });
        } else {
          const EVRecord = this.tender.EVRecord.compiledRelease;

          return getDataFromObject(EVRecord, _ => _.awards, []).map(award => {
            return {
              id: getDataFromObject(award, _ => _.id),
              name: getDataFromObject(award, _ => _.suppliers[0].name),
              identifier: `${getDataFromObject(award, _ => _.suppliers[0].id)}`,
              amount: getDataFromObject(award, _ => _.value.amount),
              currency: getDataFromObject(award, _ => _.value.currency),
              status: getDataFromObject(award, _ => _.status),
              documents: getDataFromObject(award, _ => _.documents, []).map(doc => {
                return {
                  name: getDataFromObject(doc, _ => _.title),
                  url: getDataFromObject(doc, _ => _.url),
                  datePublished: formatDate(getDataFromObject(doc, _ => _.datePublished)),
                  id: getDataFromObject(doc, _ => _.id)
                };
              })
            };
          });
        }
      },
      activeAwards() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

          return getDataFromObject(tender, _ => _.awards, [])
              .filter(award => getDataFromObject(award, _ => _.status, "") === "active")
              .sort((award1, award2) => {
                if (getDataFromObject(award1, _ => _.value.amount) === getDataFromObject(award2, _ => _.value.amount)) {
                  return getDataFromObject(award1, _ => _.date) > getDataFromObject(award2, _ => _.date);
                }
                return getDataFromObject(award1, _ => _.value.amount) > getDataFromObject(award2, _ => _.value.amount);
              })
              .map(award => {
                return {
                  id: getDataFromObject(award, _ => _.id),
                  name: getDataFromObject(award, _ => _.suppliers[0].name),
                  identifier: `${getDataFromObject(award, _ => _.suppliers[0].identifier.scheme)}
                               ${getDataFromObject(award, _ => _.suppliers[0].identifier.id)} -
                               ${getDataFromObject(award, _ => _.suppliers[0].identifier.legalName)}`,
                  amount: getDataFromObject(award, _ => _.value.amount),
                  currency: getDataFromObject(award, _ => _.value.currency),
                  publishedDate: formatDate(getDataFromObject(award, _ => _.date))
                };
              });
        } else {
          const EVRecord = this.tender.EVRecord.compiledRelease;

          return getDataFromObject(EVRecord, _ => _.awards, [])
              .filter(award => getDataFromObject(award, _ => _.status, "") === "active")
              .sort((award1, award2) => {
                if (getDataFromObject(award1, _ => _.value.amount) === getDataFromObject(award2, _ => _.value.amount)) {
                  return getDataFromObject(award1, _ => _.date) > getDataFromObject(award2, _ => _.date);
                }
                return getDataFromObject(award1, _ => _.value.amount) > getDataFromObject(award2, _ => _.value.amount);
              })
              .map(award => {
                return {
                  id: getDataFromObject(award, _ => _.id),
                  name: getDataFromObject(award, _ => _.suppliers[0].name),
                  identifier: `${getDataFromObject(award, _ => _.suppliers[0].id)}`,
                  amount: getDataFromObject(award, _ => _.value.amount),
                  currency: getDataFromObject(award, _ => _.value.currency),
                  publishedDate: formatDate(getDataFromObject(award, _ => _.date))
                };
              });
        }
      },
      contracts() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

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
              contractNumber: getDataFromObject(contract, _ => _.contractNumber, "none"),
              dateSigned: formatDate(getDataFromObject(contract, _ => _.dateSigned), "DD.MM.YYYY"),
              contractStartDate: formatDate(getDataFromObject(contract, _ => _.period.startDate), "DD.MM.YYYY"),
              contractEndDate: formatDate(getDataFromObject(contract, _ => _.period.endDate), "DD.MM.YYYY")
            };
          });
        } else {
          return [];
        }
      },
      documentation() {
        if (this.cdb === MTENDER1) {
          const tender = this.tender;

          return getDataFromObject(tender, _ => _.contracts, []).map(contract => {
            const obj = {};

            for (const item of [...getDataFromObject(contract, _ => _.documents, [])].sort((doc1, doc2) => new Date(doc2.dateModified) - new Date(doc1.dateModified))) {
              if (!obj.hasOwnProperty(item.id)) {
                obj[item.id] = {
                  name: item.title,
                  url: item.url,
                  datePublished: formatDate(item.datePublished),
                  id: item.id
                };
                obj[item.id].oldVersions = [];
              } else {
                obj[item.id].oldVersions.push({
                  name: item.title,
                  url: item.url,
                  datePublished: formatDate(item.datePublished),
                  id: item.id
                });
              }
            }

            return Object.values(obj);
          }).reduce((acc, val) => acc.concat(val), []);
        } else {
          return [];
        }
      }
    }
  };
</script>
