<template>
  <div class="info">
    <div class="info__title">{{ $t("tender.record_opening_electronic_bids") }}</div>
    <div class="info__sub-title">{{ $t("tender.information_about_electronic_bids") }}</div>
    <div class="info-blocks">
      <div class="info-block">
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">
              {{ gd(evRecord, _ => _.bids.details, []).length }}
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_after_deadline") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">0</div>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_from_SMEs") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">
              {{
                gd(evRecord, _ => _.bids.details, []).filter(
                  bid =>
                    gd(evRecord, _ => _.parties).find(part => part.id === bid.tenderers[0].id).details.scale === "sme"
                ).length
              }}
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_from_residents") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">
              {{
                gd(evRecord, _ => _.bids.details, []).filter(
                  bid =>
                    gd(evRecord, _ => _.parties).find(part => part.id === bid.tenderers[0].id).address.addressDetails
                      .country.id === "MD"
                ).length
              }}
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__value">{{ $t("tender.number_of_tenders_received_from_non-residents") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__value info-block__value_bold">
              {{
                gd(evRecord, _ => _.bids.details, []).filter(
                  bid =>
                    gd(evRecord, _ => _.parties).find(part => part.id === bid.tenderers[0].id).address.addressDetails
                      .country.id !== "MD"
                ).length
              }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div id="sub-title" class="info__sub-title">{{ $t("tender.electronic_bids_received") }}</div>
    <page-number
      v-if="needPagination"
      :current-page="currentPage"
      :elements-amount="elementsAmount"
      :page-size="pageSize"
    />
    <div
      v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
      v-if="index >= numberOfLastDisplayedLot - pageSize && index < numberOfLastDisplayedLot"
      :key="lot.id"
    >
      <div style="margin-bottom: 15px; font-size: 16px; font-weight: 700;">
        {{ lot.title }}
      </div>
      <table
        class="info-table offers-table"
        v-if="gd(evRecord, _ => _.bids.details, []).filter(_bid => _bid.relatedLots[0] === lot.id).length"
      >
        <tr>
          <th>{{ $t("tender.tenderer") }}</th>
          <th>{{ $t("tender.discloser_date") }}</th>
          <th>{{ $t("tender.initial_offer") }}</th>
          <th>{{ $t("tender.self_declaration") }}</th>
          <th>{{ $t("tender.eos_docs") }}</th>
        </tr>
        <tr
          v-for="bid of gd(evRecord, _ => _.bids.details, []).filter(_bid => _bid.relatedLots[0] === lot.id)"
          :key="bid.id"
        >
          <td :data-th="$t('tender.tenderer')">
            <div class="offers-table__tenderer-name">{{ gd(bid, _ => _.tenderers[0]).name }}</div>
            <div class="offers-table__tenderer-id">
              {{ $t("tender.idno_code") }}: {{ gd(bid, _ => _.tenderers[0]).id }}
            </div>
          </td>
          <td :data-th="$t('tender.discloser_date')">
            <div class="offers-table__date">{{ fd(gd(bid, _ => _.date), "DD/MM/YYYY") }}</div>
            <div class="offers-table__time">{{ fd(gd(bid, _ => _.date), "HH:mm") }}</div>
          </td>
          <td :data-th="$t('tender.initial_offer')">
            <div class="offers-table__amount">{{ fa(gd(bid, _ => _.value.amount)) }}</div>
            <div class="offers-table__currency">
              {{ gd(bid, _ => _.value.currency) }} {{ $t("tender.exluding_vat") }}
            </div>
          </td>
          <td data-th="Self-declaration">
            <button
              type="button"
              @click="$refs[bid.id + 'eligibilityDocuments'][0].show = true"
              class="offers-table__docs-espd-button"
            >
              {{ $t("tender.mtender_espd") }}
            </button>
            <documents-modal
              :ref="bid.id + 'eligibilityDocuments'"
              :documents="
                bid.hasOwnProperty('documents')
                  ? bid.documents.filter(_doc => _doc.documentType === 'x_eligibilityDocuments')
                  : []
              "
              :noItemsText="$t('tender.no_documents_submitted')"
            />
            <div class="offers-table__docs-espd-text">{{ $t("tender.self_declaration") }}</div>
          </td>
          <td :data-th="$t('tender.eos_docs')">
            <button
              v-if="bid.hasOwnProperty('documents') ? bid.documents.length : false"
              type="button"
              @click="$refs[bid.id][0].show = true"
              class="offers-table__docs-button"
            />
            <div class="offers-table__docs-eos-text" v-else>{{ $t("tender.no_documents") }}</div>
            <documents-modal
              :ref="bid.id"
              :documents="
                bid.hasOwnProperty('documents')
                  ? bid.documents.filter(_doc => _doc.documentType !== 'x_eligibilityDocuments')
                  : []
              "
              :noItemsText="$t('tender.no_documents')"
            />
          </td>
        </tr>
      </table>

      <div v-else style="margin-bottom: 25px">
        {{ $t("tender.no_bids_received") }}
      </div>
    </div>
    <list-pagination
      v-if="needPagination"
      :total="elementsAmount"
      :pageCount="0"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :changePage="changePage"
      offsetTo="sub-title"
      :key="'pagination'"
    />
  </div>
</template>

<script>
import DocumentsModal from "./../DocumentsModal";

import ListPagination from "./../../../../components/ListPagination";
import PageNumber from "./../../../../components/PageNumber";

import { getDataFromObject, formatDate, formatAmount } from "./../../../../utils";

export default {
  name: "Offers",
  components: {
    "documents-modal": DocumentsModal,
    "list-pagination": ListPagination,
    "page-number": PageNumber,
  },
  props: {
    evRecord: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageSize: 25,
      numberOfLastDisplayedLot: 25,
      currentPage: 1,
    };
  },
  computed: {
    needPagination() {
      return this.elementsAmount > this.pageSize;
    },
    elementsAmount() {
      return this.gd(this.evRecord, _ => _.tender.lots, []).length;
    },
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(...ars) {
      return formatDate(...ars);
    },
    fa(amount) {
      return formatAmount(amount);
    },
    changePage(page) {
      this.numberOfLastDisplayedLot = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
