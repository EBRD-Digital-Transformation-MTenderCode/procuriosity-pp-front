<template>
  <div>
    <div
      class="entity-nav"
      data-scroll-spy-id="cn"
      @click="needDisplay = !needDisplay"
      v-scroll-spy-active="{ selector: 'a', class: 'active' }"
      v-scroll-spy-link
    >
      <a :data-displayLink="needDisplay">{{ $t("tender.contracting_authority") }}</a>
      <a :data-displayLink="needDisplay">{{ $t("tender.object") }}</a>
      <a :data-displayLink="needDisplay">{{ $t("tender.procedure") }}</a>
      <a :data-displayLink="needDisplay">{{ $t("tender.complementary_information") }}</a>
    </div>
    <div class="info" data-scroll-spy-id="cn" v-scroll-spy="{ offset: computedOffset, allowNoActive: true }">
      <!-- Contracting authority -->
      <div>
        <div class="info__title">{{ $t("tender.contracting_authority") }}</div>
        <div class="info__sub-title">{{ $t("tender.name_and_address") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.procuring_entity_full_name") }}</div>
                <div class="info-block__value">
                  {{ gd(tender, _ => _.procuringEntity.name, "###") }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.procuring_entity_identifier") }}</div>
                <div class="info-block__value">
                  {{ gd(tender, _ => _.procuringEntity.identifier.id, "###") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.procuring_entity_address") }}</div>
                <div class="info-block__value">
                  {{ gd(tender, _ => _.procuringEntity.address.region, "###") }},
                  {{ gd(tender, _ => _.procuringEntity.address.streetAddress, "###") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.town") }}</div>
                <div class="info-block__value">{{ gd(tender, _ => _.procuringEntity.address.locality, "###") }},</div>
              </el-col>
              <el-col :sm="4">
                <div class="info-block__text">{{ $t("tender.nuts_code") }}</div>
                <div class="info-block__value">{{ $t("n/a") }}</div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.postal_code") }}</div>
                <div class="info-block__value">{{ gd(tender, _ => _.procuringEntity.address.postalCode, "###") }}</div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.country") }}</div>
                <div class="info-block__value">{{ gd(tender, _ => _.procuringEntity.address.countryName, "###") }}</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("tender.contact_persone") }}</div>
                <div class="info-block__value">
                  {{ gd(tender, _ => _.procuringEntity.contactPoint.name, "###") }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.telephone") }}</div>
                <div class="info-block__value">
                  {{ gd(tender, _ => _.procuringEntity.contactPoint.phone, "###") }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.email") }}</div>
                <div class="info-block__value">
                  <a :href="`mailto:${gd(tender, _ => _.procuringEntity.contactPoint.email)}`">
                    {{ gd(tender, _ => _.procuringEntity.contactPoint.email, "###") }}
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("tender.communication") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col>
                <div class="info-block__text">{{ $t("tender.procurement_documents_links") }}:</div>
                <div class="info-block__value">
                  <a
                    :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders/${gd(tender, _ => _.tenderID)}`"
                    target="_blank"
                  >
                    mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}tenders/{{
                      gd(tender, _ => _.tenderID, "###")
                    }}
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.must_be_submitted") }}:</div>
                <div class="info-block__value info-block__value-platform">
                  <a
                    class="platform-link"
                    v-for="platform of randomSortPlatforms"
                    :key="platform.name"
                    :href="
                      `${platform.href}${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders/${gd(
                        tender,
                        _ => _.tenderID
                      )}`
                    "
                    :title="platform.name"
                    target="_blank"
                  >
                    <img :src="platform.src" :alt="platform.name" class="platform-img" />
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- Object -->
      <div>
        <div class="info__title">{{ $t("tender.object") }}</div>
        <div class="info__sub-title">{{ $t("tender.items") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.title") }}</div>
                <div class="info-block__value">{{ gd(tender, _ => _.title, "###") }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.estimated_total_value_excluding_VAT") }}</div>
                <div class="info-block__value">
                  {{ fa(gd(tender, _ => _.value.amount, "###")) }}
                  {{ gd(tender, _ => _.value.currency, "###") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.short_description") }}</div>
                <div id="scrollToDescription" class="info-block__value">
                  {{ gd(tender, _ => _.description, "###") }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="tender.lots">
          <div class="info__sub-title">{{ $t("tender.description") }}</div>
          <page-number
            v-if="needPagination"
            :current-page="currentPage"
            :elements-amount="elementsAmount"
            :page-size="pageSize"
          />
          <el-collapse accordion :value="gd(tender, _ => _.lots[0].id, '0') + '0'">
            <el-collapse-item
              v-for="(lot, index) of gd(tender, _ => _.lots, [])"
              v-if="index >= numberOfLastDisplayedElement - pageSize && index < numberOfLastDisplayedElement"
              :key="lot.id + index"
              :name="lot.id + index"
            >
              <template slot="title">
                <div class="info-block accordion-header">
                  <el-row :gutter="15">
                    <el-col :sm="16">
                      <div class="info-block__text">{{ $t("tender.title") }}</div>
                      <div class="info-block__value info-block__value__bold">{{ gd(lot, _ => _.title, "###") }}</div>
                    </el-col>
                    <el-col :sm="8">
                      <div class="info-block__text">{{ $t("tender.lot_identifier") }}</div>
                      <div class="info-block__value">{{ gd(lot, _ => _.id, "###") }}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>

              <div class="info-blocks">
                <div class="info-block">
                  <div class="info-block__text">{{ $t("tender.description_of_procurement") }}:</div>
                  <div
                    v-for="item of gd(tender, _ => _.items, []).filter(
                      item => gd(item, _ => _.relatedLot, '') === gd(lot, _ => _.id)
                    )"
                    :key="item.id"
                  >
                    <item :item="item" />
                  </div>
                </div>
                <div class="info-block">
                  <el-row :gutter="15">
                    <el-col :sm="24">
                      <div class="info-block__text">{{ $t("tender.estimated_value_excluding_VAT") }}</div>
                      <div class="info-block__value">
                        {{ fa(gd(lot, _ => _.value.amount)) }} {{ gd(lot, _ => _.value.currency) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <list-pagination
            v-if="needPagination"
            :total="elementsAmount"
            :pageCount="0"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :changePage="changePage"
            offsetTo="scrollToDescription"
            :key="'pagination'"
          />
        </div>
        <div v-else>
          <div class="info__sub-title">{{ $t("tender.description") }}</div>
          <page-number
            v-if="needPagination"
            :current-page="currentPage"
            :elements-amount="elementsAmount"
            :page-size="pageSize"
          />
          <el-collapse accordion :value="gd(tender, _ => _.items[0].id, '0') + '0'">
            <el-collapse-item
              v-for="(item, index) of gd(tender, _ => _.items, [])"
              v-if="index >= numberOfLastDisplayedElement - pageSize && index < numberOfLastDisplayedElement"
              :key="item.id + index"
              :name="item.id + index"
            >
              <template slot="title">
                <div class="info-block accordion-header">
                  <div class="info-block__text">{{ $t("tender.description") }}</div>
                  <div class="info-block__value info-block__value__bold">
                    {{ gd(item, _ => _.description, "###") }}
                  </div>
                </div>
              </template>
              <item :item="item" />
            </el-collapse-item>
          </el-collapse>
          <list-pagination
            v-if="needPagination"
            :total="elementsAmount"
            :pageCount="0"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :changePage="changePage"
            offsetTo="scrollToDescription"
            :key="'pagination'"
          />
        </div>
      </div>

      <!-- Procedure -->
      <div>
        <div class="info__title">{{ $t("tender.procedure") }}</div>
        <div class="info__sub-title">{{ $t("tender.description") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.type_of_procedure") }}</div>
                <div class="info-block__value">{{ procedureType }}</div>
              </el-col>
            </el-row>
          </div>

          <div v-if="this.gd(this.tender, _ => _.procurementMethodType, '') === 'belowThreshold'" class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("tender.information_about_electronic_auction") }}</div>
                <div class="info-block__value">
                  {{ $t("tender.an_electronic_auction_will") }}
                  <!--<span v-if="!gd(evRecord, _ => _.tender, {}).hasOwnProperty('auctionPeriod')">{{
                    $t("tender.not")
                  }}</span>-->
                  {{ $t("tender.be_used") }}
                </div>
              </el-col>
              <el-col :sm="14" v-if="tender.auctionPeriod">
                <div class="info-block__text">{{ $t("tender.additional_information_electronic_auction") }}</div>
                <div class="info-block__value">
                  {{ $t("tender.start_date") }}:
                  {{ fd(gd(tender, _ => _.auctionPeriod.startDate), "DD.MM.YYYY", $t("n/a")) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("tender.administrative_information") }}</div>
        <div class="info-blocks">
          <div v-if="tender.tenderPeriod" class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.time_limit") }}</div>
                <div class="info-block__value">
                  {{ fd(gd(tender, _ => _.tenderPeriod.endDate), "DD.MM.YYYY / HH:mm ") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div v-if="tender.tenderPeriod" class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.estimated_date") }}</div>
                <div class="info-block__value">
                  {{ fd(gd(tender, _ => _.tenderPeriod.startDate), "DD.MM.YYYY / HH:mm ") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.languages_submitted") }}</div>
                <div class="info-block__value">{{ $t("tender.romanian_russian") }}</div>
              </el-col>
            </el-row>
          </div>

          <div v-if="tender.tenderPeriod" class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.conditions_for_opening_tenders") }}</div>
                <div class="info-block__value">
                  {{
                    fd(
                      tender.hasOwnProperty("auctionPeriod")
                        ? gd(tender, _ => _.auctionPeriod.endDate)
                        : gd(tender, _ => _.tenderPeriod.endDate),
                      "DD.MM.YYYY / HH:mm"
                    )
                  }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">
                  <span class="info-block__text_accent">{{ $t("tender.for_electronic_tendering_procedures") }}:</span>
                  {{ $t("tender.upon_expiry_of_submission_deadlines") }}
                </div>
                <div class="info-block__text">
                  <span class="info-block__text_accent">{{ $t("tender.for_non-electronic_procedures") }}:</span>
                  {{ $t("tender.negotiated_with_publication") }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- Complementary information -->
      <div>
        <div class="info__title">{{ $t("tender.complementary_information") }}</div>
        <div class="info__sub-title">{{ $t("tender.information_about_electronic_workflows") }}</div>
        <ul class="info-list">
          <li>{{ $t("tender.complementary_information_list1_p1") }}</li>
          <li>{{ $t("tender.complementary_information_list1_p2") }}</li>
          <li>{{ $t("tender.complementary_information_list1_p3") }}</li>
          <li>{{ $t("tender.complementary_information_list1_p4") }}</li>
          <li>{{ $t("tender.complementary_information_list1_p5") }}</li>
        </ul>

        <div class="info__sub-title">{{ $t("tender.additional_information") }}</div>
        <ul class="info-list">
          <li>{{ $t("tender.complementary_information_list2_p1") }}</li>
          <li>{{ $t("tender.complementary_information_list2_p2") }}</li>
          <li>{{ $t("tender.complementary_information_list2_p3") }}</li>
          <li>{{ $t("tender.complementary_information_list2_p5") }}</li>
        </ul>

        <div class="info__sub-title">{{ $t("tender.procedure_documents") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <documents-item :documents="getDocs()" :cdbType="cdbType" />
          </div>
        </div>
      </div>
      <div class="info__sub-title">{{ $t("tender.procudures_for_review") }}</div>
      <div class="info-blocks">
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="24">
              <div class="info-block__text">{{ $t("tender.procuring_entity_full_name") }}</div>
              <div class="info-block__value">Agenția Națională pentru Soluționarea Contestațiilor</div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="24">
              <div class="info-block__text">{{ $t("tender.procuring_entity_address") }}</div>
              <div class="info-block__value">bd. Ștefan cel Mare și Sfânt, 124, et. 4</div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="6">
              <div class="info-block__text">{{ $t("tender.town") }}</div>
              <div class="info-block__value">Chișinău</div>
            </el-col>

            <el-col :sm="4">
              <div class="info-block__text">{{ $t("tender.nuts_code") }}</div>
              <div class="info-block__value">{{ $t("n/a") }}</div>
            </el-col>

            <el-col :sm="6">
              <div class="info-block__text">{{ $t("tender.postal_code") }}</div>
              <div class="info-block__value">MD-2001</div>
            </el-col>

            <el-col :sm="8">
              <div class="info-block__text">{{ $t("tender.country") }}</div>
              <div class="info-block__value">Republic of Moldova</div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="10">
              <div class="info-block__text">{{ $t("tender.email") }}</div>
              <div class="info-block__value">contestatii@ansc.md</div>
            </el-col>

            <el-col :sm="6">
              <div class="info-block__text">{{ $t("tender.telephone") }}</div>
              <div class="info-block__value">+373 22 820 652</div>
            </el-col>

            <el-col :sm="8">
              <div class="info-block__text">{{ $t("tender.fax") }}</div>
              <div class="info-block__value">+373 22 820 651</div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="24">
              <div class="info-block__text">{{ $t("tender.main_internet_address") }}</div>
              <div class="info-block__value">
                <a href="https://www.ansc.md" target="_blank">www.ansc.md</a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info__sub-title">{{ $t("tender.review_procedures_title") }}</div>
      <div class="info-block">
        <p>{{ $t("tender.review_procedures_p1") }}</p>
        <ol>
          <li>
            {{ $t("tender.review_procedures_list1_p1") }}:
            <ol>
              <li class="info-block__text">{{ $t("tender.review_procedures_list1_p2_1") }}</li>
              <li class="info-block__text">{{ $t("tender.review_procedures_list1_p2_2") }}</li>
            </ol>
          </li>
          <li>{{ $t("tender.review_procedures_list1_p3") }}</li>
          <li>{{ $t("tender.review_procedures_list1_p4") }}</li>
        </ol>
      </div>
    </div>
    <div class="info__sub-title">
      {{ $t("tender.date_online_publication") }}:
      {{ fd(gd(tender, _ => _.date), "DD/MM/YYYY") }}
    </div>
  </div>
</template>

<script>
import platforms from "../../../../../store/types/platforms";

import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";
import BudgetBreakdown from "../../../../../components/BudgetBreakdown";
import Item from "./Item";
import DocumentsItem from "./../../DocumentsItem";

import { getDataFromObject, formatDate, parseDocumentType, formatAmount } from "../../../../../utils";
import { MTENDER1 } from "../../../../../store/types/cbd-types";

export default {
  name: "ContractNotice",
  props: {
    tender: {
      type: Object,
      required: true,
    },
    procedureType: {
      type: String,
      required: true,
    },
  },
  components: {
    "list-pagination": ListPagination,
    "page-number": PageNumber,
    "budget-breakdown": BudgetBreakdown,
    item: Item,
    "documents-item": DocumentsItem,
  },
  data() {
    return {
      needDisplay: false,
      windowWidth: 0,
      computedOffset: 75,
      pageSize: 25,
      numberOfLastDisplayedElement: 25,
      currentPage: 1,
    };
  },
  computed: {
    randomSortPlatforms() {
      return [...platforms].sort(() => 0.5 - Math.random());
    },
    needPagination() {
      return this.elementsAmount > this.pageSize;
    },
    elementsAmount() {
      return this.gd(this.tender, _ => _.lots, []).length || this.gd(this.tender, _ => _.items, []).length;
    },
    cdbType() {
      return MTENDER1;
    },
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(...ars) {
      return formatDate(...ars);
    },
    parseDocType(type) {
      return parseDocumentType(type, this.$i18n.locale);
    },
    fa(amount) {
      return formatAmount(amount);
    },
    setWindowSize() {
      this.windowWidth = window.innerWidth;
    },
    getDocs() {
      return [{ values: this.gd(this.tender, _ => _.documents, []) }];
    },
    changePage(page) {
      this.numberOfLastDisplayedElement = page * this.pageSize;
      this.currentPage = page;
    },
    getFSRecord(ocid) {
      this.getFS(ocid);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.setWindowSize);
      this.windowWidth = window.innerWidth;
    });
  },
  watch: {
    windowWidth(width) {
      if (width <= 775) {
        this.computedOffset = 230;
      } else this.computedOffset = 75;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.setWindowSize);
  },
};
</script>
