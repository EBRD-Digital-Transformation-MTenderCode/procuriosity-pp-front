<template>
  <div class="entity-wp">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <el-container direction="vertical" v-else-if="loaded && Object.keys(tender).length" key="info">
        <tender-card :entity="entity" />

        <!-- Procuring entity -->
        <div class="old-info">
          <div class="old-info__title">{{ $t("tender.procuring_entity") }}</div>
          <div class="old-info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">{{ $t("tender.procuring_entity_full_name") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value">{{ procuringEntity.fullName }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="old-info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">{{ $t("tender.procuring_entity_identifier") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value">{{ procuringEntity.identifier }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="old-info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">{{ $t("tender.procuring_entity_address") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value">{{ procuringEntity.address }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="old-info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">{{ $t("tender.procuring_entity_responsible_person") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value">{{ procuringEntity.responsiblePerson }}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Procurement info -->
        <div class="old-info">
          <div class="old-info__title">{{ $t("tender.procuring_info") }}</div>
          <div class="old-info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">
                  {{ $t("tender.procuring_info_value") }} ({{ procurementInfo.currency }})
                </div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value info__value_accent">{{ procurementInfo.amount }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="old-info__text" v-if="procurementInfo.minStep">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">
                  {{ $t("tender.procuring_info_min_step") }} ({{ procurementInfo.currency }})
                </div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value info__value_accent">{{ procurementInfo.minStep }}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Dates -->
        <div class="old-info" v-if="dates">
          <div class="old-info__title">{{ $t("tender.dates") }}</div>
          <div class="old-info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">{{ $t("tender.dates_enquiry") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value info__value_accent">{{ dates.enquiry }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="old-info__text">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">{{ $t("tender.dates_tendering") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value info__value_accent">{{ dates.tendering }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="old-info__text" v-if="dates.auction">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info__name">{{ $t("tender.dates_auction") }}</div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info__value info__value_accent">{{ dates.auction }}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Documents -->
        <div class="old-info" v-if="documents.length">
          <div class="old-info__title">{{ $t("tender.documents") }}</div>
          <div class="old-info__text" v-for="(document, key) of documents" :key="document.id + key">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="10">
                <div class="old-info-document_name">
                  <div>
                    <a :href="document.url" :title="document.name">{{ document.name }}</a>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info-document_date-published">
                  {{ $t("tender.documents_published") }} {{ document.datePublished }}
                </div>
                <div class="old-info-document_id">{{ $t("tender.documents_id") }}: {{ document.id }}</div>
              </el-col>
            </el-row>

            <el-row
              v-for="(oldDoc, index) of document.oldVersions"
              :key="oldDoc.id + index"
              class="old-info-old-document"
              :gutter="30"
            >
              <el-col :xs="24" :sm="10">
                <div class="old-info-document_name">
                  <div>
                    <a :href="oldDoc.url" :title="oldDoc.name">{{ oldDoc.name }}</a>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="14">
                <div class="old-info-document_date-published">
                  {{ $t("tender.documents_published") }} {{ oldDoc.datePublished }}
                </div>
                <div class="old-info-document_id">{{ $t("tender.documents_id") }}: {{ oldDoc.id }}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Items -->
        <div class="old-info">
          <div class="old-info__title">{{ $t("tender.items") }}</div>
          <template v-for="item in items">
            <div class="old-info__text" :key="item.id">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name" :title="item.description">{{ item.description }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value_accent">{{ item.quantityAndUnit }}</div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text" :key="item.id + 1">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10" />
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value info__value_muted">{{ $t("tender.items_cpv") }}: {{ item.cpv }}</div>
                  <div class="old-info__value info__value_muted">
                    {{ $t("tender.items_delivery_address") }}: {{ item.deliveryAddress }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </div>

        <!-- Bids -->
        <div class="old-info" v-if="bids.length">
          <div class="old-info__title">{{ $t("tender.bids") }}</div>
          <div class="old-info-table-wp">
            <table class="old-info-table">
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
                  <div class="old-info__value">
                    {{ bid.name }}
                  </div>
                  <div class="old-info__value info__value_muted">
                    {{ $t("tender.bids_tenderer_identifier") }}: {{ bid.identifier }}
                  </div>
                </td>
                <td>
                  <div class="old-info__value info__value_accent">
                    {{ bid.amount }}
                  </div>
                </td>
                <td>
                  <div class="old-info__value info__value_accent">
                    {{ bid.amount }}
                  </div>
                </td>
                <td class="text-center">
                  <button
                    v-if="bid.documents.length"
                    type="button"
                    @click="$refs[bid.id][0].open = true"
                    class="document-link"
                  />

                  <documents-modal :ref="bid.id" :open="false" :documents="bid.documents" />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Awards -->
        <div class="old-info" v-if="awards.length">
          <div class="old-info__title">
            {{ $t("tender.awards") }}
            <div class="old-info__title_sub">{{ $t("tender.awards_date") }}: {{ awardsStartDate }}</div>
          </div>
          <div class="old-info-table-wp">
            <table class="old-info-table">
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
                  <div class="old-info__value">
                    {{ award.name }}
                  </div>
                  <div class="old-info__value info__value_muted">
                    {{ $t("tender.awards_supplier_identifier") }}: {{ award.identifier }}
                  </div>
                </td>
                <td>
                  <div class="old-info__value info__value_accent">
                    {{ award.amount }}
                  </div>
                </td>
                <td>
                  <div class="old-info__value info__value_accent info__value_status">
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

                  <documents-modal :ref="award.id" :open="false" :documents="award.documents" />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Active awards -->
        <div class="old-info" v-if="activeAwards.length">
          <div class="old-info__title">{{ $t("tender.active_awards") }}</div>
          <div class="old-info-table-wp">
            <table class="old-info-table">
              <tr>
                <th>{{ $t("tender.active_awards_supplier_name") }}</th>
                <th>{{ $t("tender.active_awards_final_offer") }}</th>
                <th>{{ $t("tender.active_awards_date_published") }}</th>
              </tr>
              <tr v-for="award of activeAwards" :key="award.id">
                <td>
                  <div class="old-info__value">
                    {{ award.name }}
                  </div>
                  <div class="old-info__value info__value_muted">
                    {{ $t("tender.active_awards_supplier_identifier") }}: {{ award.identifier }}
                  </div>
                </td>
                <td>
                  <div class="old-info__value info__value_accent">
                    {{ award.amount }}
                  </div>
                </td>
                <td>
                  <div class="old-info__value">
                    {{ award.publishedDate }}
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Contracts -->
        <div class="old-info" v-if="contracts.length">
          <div class="old-info__title">{{ $t("tender.contracts") }}</div>
          <div v-for="contract of contracts" :key="contract.id">
            <div class="old-info-contract">
              <div class="old-info-contract__title">{{ contract.title }}</div>
              <div class="old-info-contract__status">
                <div class="old-info-contract__status_text">{{ contract.status }}</div>
                <div :class="`info-contract__status_ico ${contract.status}`" />
              </div>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_procuring_entity") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value">{{ contract.procuringEntity }}</div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_suppliers") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div v-for="supplier of contract.suppliers" :key="supplier" class="old-info__value">
                    {{ supplier }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_id") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value">{{ contract.contractId }}</div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_amount") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value info__value_accent">
                    {{ contract.amount }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_number") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value">{{ contract.contractNumber }}</div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_date_signed") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value info__value_accent">{{ contract.dateSigned }}</div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_start_date") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value info__value_accent">{{ contract.contractStartDate }}</div>
                </el-col>
              </el-row>
            </div>
            <div class="old-info__text">
              <el-row :gutter="30">
                <el-col :xs="24" :sm="10">
                  <div class="old-info__name">{{ $t("tender.contracts_end_date") }}</div>
                </el-col>
                <el-col :xs="24" :sm="14">
                  <div class="old-info__value info__value_accent">{{ contract.contractEndDate }}</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <!-- Documentation -->
        <div class="old-info" v-if="documentation.length">
          <div class="old-info__title">{{ $t("tender.documentation") }}</div>
          <div class="old-info__text" v-for="(document, index) of documentation" :key="document.id + index">
            <el-row :gutter="30">
              <el-col :xs="24" :sm="14">
                <div class="old-info-document_name">
                  <div>
                    <a :href="document.url">{{ document.name }}</a>
                    <div class="old-info__value_muted">{{ document.type }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="10">
                <div class="old-info-document_date-published">
                  {{ $t("tender.documents_published") }} {{ document.datePublished }}
                </div>
                <div class="old-info-document_id">ID: {{ document.id }}</div>
              </el-col>
            </el-row>

            <el-row
              v-for="(oldDoc, index) of document.oldVersions"
              :key="oldDoc.id + index"
              class="old-info-old-document"
              :gutter="30"
            >
              <el-col :xs="24" :sm="14">
                <div class="old-info-document_name">
                  <div>
                    <a :href="oldDoc.url" :title="oldDoc.name">{{ oldDoc.name }}</a>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="10">
                <div class="old-info-document_date-published">
                  {{ $t("tender.documents_published") }} {{ oldDoc.datePublished }}
                </div>
                <div class="old-info-document_id">{{ $t("tender.documents_id") }}: {{ oldDoc.id }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-container>
      <el-container class="error" key="error" v-else>
        <div class="error-message">{{ error.message }}</div>
        <button class="refresh-btn" @click="getTender">
          {{ $t("refresh") }}
        </button>
        <button class="back-btn" @click="$router.go(-1)">{{ $t("back") }}</button>
      </el-container>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_CURRENT_TENDER_INFO } from "../../../../store/types/actions-types";

import TenderCard from "../../../../components/ListCards/TendersCard";
import DocumentsModal from "../../DocumentsModal";

import { MTENDER1, MTENDER2 } from "../../../../store/types/cbd-types";

import { getDataFromObject, formatDate } from "../../../../utils";

export default {
  name: "TenderPage",
  components: {
    "tender-card": TenderCard,
    "documents-modal": DocumentsModal,
  },
  created() {
    this.getTender();
  },
  methods: {
    getTender() {
      this.$store.dispatch(FETCH_CURRENT_TENDER_INFO, {
        id: this.$route.params.id,
      });
    },
  },
  computed: {
    ...mapState({
      cdb: state => state.entities.tenders.currentTender.cdb,
      tender: state => state.entities.tenders.currentTender.tenderData,
      loaded: state => state.entities.tenders.loaded,
      error: state => state.entities.tenders.error,
    }),
    entity() {
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
        entityId: getDataFromObject(tender, _ => _.tenderID),
      };
    },
    procuringEntity() {
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
                                ${getDataFromObject(tender, _ => _.procuringEntity.contactPoint.telephone)}`,
      };
    },
    procurementInfo() {
      const tender = this.tender;
      const calculateMinStepPercent = () => {
        const amount = getDataFromObject(tender, _ => _.value.amount);
        const minStep = getDataFromObject(tender, _ => _.minimalStep.amount);
        return Math.round((minStep / amount) * 100 * 100) / 100;
      };

      const hasAuction = tender.hasOwnProperty("auctionPeriod");

      return {
        currency: getDataFromObject(tender, _ => _.value.currency),
        amount: getDataFromObject(tender, _ => _.value.amount),
        minStep: hasAuction
          ? `${getDataFromObject(tender, _ => _.minimalStep.amount)} (${calculateMinStepPercent()} %)`
          : "",
      };
    },
    dates() {
      const tender = this.tender;

      if (tender.procurementMethodType === "reporting") {
        return false;
      }

      const hasAuction = tender.hasOwnProperty("auctionPeriod");

      return {
        enquiry: `${formatDate(getDataFromObject(tender, _ => _.enquiryPeriod.startDate))} - ${formatDate(
          getDataFromObject(tender, _ => _.enquiryPeriod.endDate)
        )}`,
        tendering: `${formatDate(getDataFromObject(tender, _ => _.tenderPeriod.startDate))} - ${formatDate(
          getDataFromObject(tender, _ => _.tenderPeriod.endDate)
        )}`,
        auction: hasAuction
          ? `${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.startDate))} -
              ${formatDate(getDataFromObject(tender, _ => _.auctionPeriod.endDate))}`
          : "",
      };
    },
    documents() {
      const tender = this.tender;

      const obj = {};

      for (const item of [...getDataFromObject(tender, _ => _.documents, [])].sort(
        (doc1, doc2) => new Date(doc2.dateModified) - new Date(doc1.dateModified)
      )) {
        if (!obj.hasOwnProperty(item.id)) {
          obj[item.id] = {
            name: item.title,
            url: item.url,
            datePublished: formatDate(item.datePublished),
            id: item.id,
          };
          obj[item.id].oldVersions = [];
        } else {
          obj[item.id].oldVersions.push({
            name: item.title,
            url: item.url,
            datePublished: formatDate(item.datePublished),
            id: item.id,
          });
        }
      }

      return Object.values(obj);
    },
    items() {
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
                                ${getDataFromObject(item, _ => _.deliveryAddress.streetAddress)}`,
        };
      });
    },
    bids() {
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
              id: getDataFromObject(doc, _ => _.id),
            };
          }),
        };
      });
    },
    awardsStartDate() {
      const tender = this.tender;

      return formatDate(getDataFromObject(tender, _ => _.awardPeriod.startDate));
    },
    awards() {
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
              id: getDataFromObject(doc, _ => _.id),
            };
          }),
        };
      });
    },
    activeAwards() {
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
            publishedDate: formatDate(getDataFromObject(award, _ => _.date)),
          };
        });
    },
    contracts() {
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
          contractEndDate: formatDate(getDataFromObject(contract, _ => _.period.endDate), "DD.MM.YYYY"),
        };
      });
    },
    documentation() {
      const tender = this.tender;

      return getDataFromObject(tender, _ => _.contracts, [])
        .map(contract => {
          const obj = {};

          for (const item of [...getDataFromObject(contract, _ => _.documents, [])].sort(
            (doc1, doc2) => new Date(doc2.dateModified) - new Date(doc1.dateModified)
          )) {
            if (!obj.hasOwnProperty(item.id)) {
              obj[item.id] = {
                name: item.title,
                url: item.url,
                datePublished: formatDate(item.datePublished),
                id: item.id,
              };
              obj[item.id].oldVersions = [];
            } else {
              obj[item.id].oldVersions.push({
                name: item.title,
                url: item.url,
                datePublished: formatDate(item.datePublished),
                id: item.id,
              });
            }
          }

          return Object.values(obj);
        })
        .reduce((acc, val) => acc.concat(val), []);
    },
  },
};
</script>
