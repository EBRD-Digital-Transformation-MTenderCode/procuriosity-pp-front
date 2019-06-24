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
              {{ gd(tender, _ => _.bids, []).length }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div id="sub-title" class="info__sub-title">{{ $t("tender.electronic_bids_received") }}</div>
    <div v-if="tender.lots">
      <page-number
        v-if="needPagination"
        :current-page="currentPage"
        :elements-amount="elementsAmount"
        :page-size="pageSize"
      />
      <div
        v-for="(lot, index) of gd(tender, _ => _.lots, [])"
        v-if="index >= numberOfLastDisplayedElement - pageSize && index < numberOfLastDisplayedElement"
        :key="lot.id"
      >
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="16">
              <div class="info-block__text">
                {{ $t("tender.lot") }}
              </div>
              <div class="info-block__value info-block__value_bold">
                {{ lot.title }}
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                {{ $t("tender.lot_identifier") }}
              </div>
              <div class="info-block__value">
                {{ lot.id }}
              </div>
            </el-col>
          </el-row>
        </div>
        <table
          class="info-table offers-table"
          v-if="
            gd(tender, _ => _.bids, []).filter(_bid => _bid.lotValues.find(value => value.relatedLot === lot.id)).length
          "
        >
          <tr>
            <th>{{ $t("tender.tenderer") }}</th>
            <th>{{ $t("tender.discloser_date") }}</th>
            <th>{{ $t("tender.initial_offer") }}</th>
            <th>{{ $t("tender.self_declaration") }}</th>
            <th>{{ $t("tender.eos_docs") }}</th>
          </tr>
          <tr
            v-for="bid of gd(tender, _ => _.bids, []).filter(_bid =>
              _bid.lotValues.find(value => value.relatedLot === lot.id)
            )"
            :key="bid.id"
          >
            <td :data-th="$t('tender.tenderer')">
              <div class="offers-table__tenderer-name">{{ gd(bid, _ => _.tenderers[0].name, "###") }}</div>
              <div class="offers-table__tenderer-id">
                {{ $t("tender.idno_code") }}: {{ gd(bid, _ => _.tenderers[0].identifier.id, "###") }}
              </div>
            </td>
            <td :data-th="$t('tender.discloser_date')">
              <div class="offers-table__date">{{ fd(gd(bid, _ => _.date), "DD/MM/YYYY") }}</div>
              <div class="offers-table__time">{{ fd(gd(bid, _ => _.date), "HH:mm") }}</div>
            </td>
            <td :data-th="$t('tender.initial_offer')">
              <div class="offers-table__amount">
                {{ fa(gd(bid, _ => _.lotValues).find(value => value.relatedLot === lot.id).value.amount) }}
              </div>
              <div class="offers-table__currency">
                {{ gd(bid, _ => _.lotValues).find(value => value.relatedLot === lot.id).value.currency }}
                {{ $t("tender.exluding_vat") }}
              </div>
            </td>
            <td :data-th="$t('tender.self_declaration')">
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
                    ? bid.documents.filter(_doc => _doc.documentType === 'eligibilityDocuments')
                    : []
                "
                :datePublished="bid.date"
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
                    ? bid.documents.filter(_doc => _doc.documentType !== 'eligibilityDocuments')
                    : []
                "
                :espdDocuments="
                  bid.hasOwnProperty('documents')
                    ? bid.documents.filter(_doc => _doc.documentType === 'eligibilityDocuments')
                    : []
                "
                :datePublished="bid.date"
                :noItemsText="$t('tender.no_documents')"
              />
            </td>
          </tr>
        </table>

        <div v-else style="margin-top: 15px">
          {{ $t("tender.no_bids_received") }}
        </div>
        <hr
          v-if="!((index !== 0 && index % 24 === 0) || index === gd(tender, _ => _.lots, []).length - 1)"
          style="margin-bottom: 25px;"
        />
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
    <div v-else>
      <table class="info-table offers-table" v-if="gd(tender, _ => _.bids, []).length">
        <tr>
          <th>{{ $t("tender.tenderer") }}</th>
          <th>{{ $t("tender.discloser_date") }}</th>
          <th>{{ $t("tender.initial_offer") }}</th>
          <th>{{ $t("tender.self_declaration") }}</th>
          <th>{{ $t("tender.eos_docs") }}</th>
        </tr>
        <tr v-for="bid of gd(tender, _ => _.bids, [])" :key="bid.id">
          <td :data-th="$t('tender.tenderer')">
            <div class="offers-table__tenderer-name">{{ gd(bid, _ => _.tenderers[0].name, "###") }}</div>
            <div class="offers-table__tenderer-id">
              {{ $t("tender.idno_code") }}: {{ gd(bid, _ => _.tenderers[0].identifier.id, "###") }}
            </div>
          </td>
          <td :data-th="$t('tender.discloser_date')">
            <div class="offers-table__date">{{ fd(gd(bid, _ => _.date), "DD/MM/YYYY") }}</div>
            <div class="offers-table__time">{{ fd(gd(bid, _ => _.date), "HH:mm") }}</div>
          </td>
          <td :data-th="$t('tender.initial_offer')">
            <div class="offers-table__amount">
              {{ fa(gd(bid, _ => _.value.amount)) }}
            </div>
            <div class="offers-table__currency">
              {{ gd(bid, _ => _.value.currency) }}
              {{ $t("tender.exluding_vat") }}
            </div>
          </td>
          <td :data-th="$t('tender.self_declaration')">
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
                  ? bid.documents.filter(_doc => _doc.documentType === 'eligibilityDocuments')
                  : []
              "
              :datePublished="bid.date"
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
                  ? bid.documents.filter(_doc => _doc.documentType !== 'eligibilityDocuments')
                  : []
              "
              :espdDocuments="
                bid.hasOwnProperty('documents')
                  ? bid.documents.filter(_doc => _doc.documentType === 'eligibilityDocuments')
                  : []
              "
              :datePublished="bid.date"
              :noItemsText="$t('tender.no_documents')"
            />
          </td>
        </tr>
      </table>

      <div v-else style="margin-top: 15px">
        {{ $t("tender.no_bids_received") }}
      </div>
    </div>
  </div>
</template>

<script>
import DocumentsModal from "../../DocumentsModal";

import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";

import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";

export default {
  name: "Offers",
  components: {
    "documents-modal": DocumentsModal,
    "list-pagination": ListPagination,
    "page-number": PageNumber,
  },
  props: {
    tender: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageSize: 25,
      numberOfLastDisplayedElement: 25,
      currentPage: 1,
    };
  },
  computed: {
    needPagination() {
      return this.elementsAmount > this.pageSize;
    },
    elementsAmount() {
      return this.gd(this.tender, _ => _.lots, []).length;
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
      this.numberOfLastDisplayedElement = page * this.pageSize;
      this.currentPage = page;
    },
  },
};
</script>
