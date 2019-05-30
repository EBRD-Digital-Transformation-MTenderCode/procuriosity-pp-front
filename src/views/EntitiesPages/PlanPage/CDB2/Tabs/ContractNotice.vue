<template>
  <div>
    <div
      class="entity-nav"
      data-scroll-spy-id="cn"
      v-scroll-spy-active="{ selector: 'a', class: 'active' }"
      v-scroll-spy-link
    >
      <a>{{ $t("plan.contracting_authority") }}</a>
      <a>{{ $t("plan.object") }}</a>
      <!--<a>Legal, economic, financial and technical information</a>-->
      <!--<a>{{ $t("plan.procedure") }}</a>-->
      <a>{{ $t("plan.budget") }}</a>
      <a>{{ $t("plan.complementary_information") }}</a>
    </div>
    <div class="info" data-scroll-spy-id="cn" v-scroll-spy="{ offset: 75, allowNoActive: true }">
      <!-- Contracting authority -->
      <div>
        <div class="info__title">{{ $t("plan.contracting_authority") }}</div>
        <div class="info__sub-title">{{ $t("plan.name_and_address") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">
                  {{ $t("plan.official_name") }}
                </div>
                <div class="info-block__value">
                  {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").name }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  {{ $t("plan.national_registration_number") }}
                </div>
                <div class="info-block__value">
                  {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").identifier.id }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">
                  {{ $t("plan.postal_address") }}
                </div>
                <div class="info-block__value">
                  {{
                    getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").address.addressDetails.region
                      .description
                  }},
                  {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").address.streetAddress }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="6">
                <div class="info-block__text">
                  {{ $t("plan.town") }}
                </div>
                <div class="info-block__value">
                  {{
                    getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").address.addressDetails.locality
                      .description
                  }}
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="info-block__text">
                  {{ $t("plan.nuts_code") }}
                </div>
                <div class="info-block__value">
                  {{ $t("n/a") }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">
                  {{ $t("plan.postal_code") }}
                </div>
                <div class="info-block__value">
                  {{
                    gd(
                      getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer"),
                      _ => _.address.postalCode,
                      $t("n/a")
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  {{ $t("plan.country") }}
                </div>
                <div class="info-block__value">
                  {{
                    getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").address.addressDetails.country
                      .description
                  }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">
                  {{ $t("plan.contact_persone") }}
                </div>
                <div class="info-block__value">
                  {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").contactPoint.name }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">
                  {{ $t("plan.telephone") }}
                </div>
                <div class="info-block__value">
                  {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").contactPoint.telephone }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  {{ $t("plan.email") }}
                </div>
                <div class="info-block__value">
                  <a
                    :href="
                      `mailto:${getOrganizationObject(gd(msRecord, _ => _.parties, []), 'buyer').contactPoint.email}`
                    "
                  >
                    {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").contactPoint.email }}
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">
                  {{ $t("plan.main_internet_address") }}
                </div>
                <div class="info-block__value">
                  <a
                    v-if="getOrganizationObject(gd(msRecord, _ => _.parties, []), 'buyer').contactPoint.url"
                    :href="getOrganizationObject(gd(msRecord, _ => _.parties, []), 'buyer').contactPoint.url"
                    target="_blank"
                  >
                    {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "buyer").contactPoint.url }}
                  </a>
                  <span v-else>{{ $t("n/a") }}</span>
                </div>
              </el-col>
              <el-col :sm="14">
                <div class="info-block__text">
                  {{ $t("plan.address_of_buyer_profile") }}
                </div>
                <div class="info-block__value">
                  <!-- @TODO need link to plans with buyer identifier id search params -->
                  <!--<a
                    :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : '' }plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                    target="_blank"
                  >
                    www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}plans/{{ gd(gd(msRecord, _ =>
                    _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship ===
                    "planning")), _ => _.identifier) }}
                  </a>-->
                  www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}plans
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">
                  {{ $t("plan.type_of_buyer") }}
                </div>
                <div class="info-block__value">
                  {{ getTypeOfBuyer }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">
                  {{ $t("plan.main_activity") }}
                </div>
                <div class="info-block__value">
                  {{ getMainGeneralActivity }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  {{ $t("plan.sectoral_activity") }}
                </div>
                <div class="info-block__value">
                  {{ getMainSectoralActivity }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("plan.communication") }}</div>
        <div class="info-blocks">
          <div class="info-block" v-if="hasTender">
            <el-row :gutter="15">
              <el-col>
                <div class="info-block__text">{{ $t("plan.procurement_documents_links") }}:</div>
                <div class="info-block__value">
                  <a
                    :href="
                      `https://mtender.gov.md/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders/${gd(
                        msRecord,
                        _ => _.ocid
                      )}`
                    "
                    target="_blank"
                  >
                    mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}tenders/{{
                      gd(msRecord, _ => _.ocid)
                    }}</a
                  >
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">
                  {{ $t("plan.additional_information_obtained") }}
                </div>
                <div class="info-block__value">
                  {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "procuringEntity").contactPoint.name }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">
                  {{ $t("plan.telephone") }}
                </div>
                <div class="info-block__value">
                  {{
                    getOrganizationObject(gd(msRecord, _ => _.parties, []), "procuringEntity").contactPoint.telephone
                  }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  {{ $t("plan.email") }}
                </div>
                <div class="info-block__value">
                  <a
                    :href="
                      `mailto:${
                        getOrganizationObject(gd(msRecord, _ => _.parties, []), 'procuringEntity').contactPoint.email
                      }`
                    "
                  >
                    {{ getOrganizationObject(gd(msRecord, _ => _.parties, []), "procuringEntity").contactPoint.email }}
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.must_be_submitted") }}:</div>
                <div class="info-block__value info-block__value-platform">
                  <a
                    class="platform-link"
                    v-for="platform of randomSortPlatforms"
                    :key="platform.name"
                    :href="
                      `${platform.href}${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}plans/${gd(
                        msRecord,
                        _ => _.ocid
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
        <div class="info__title">{{ $t("plan.object") }}</div>
        <div class="info__sub-title">{{ $t("plan.items") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.title") }}</div>
                <div class="info-block__value">{{ gd(msRecord, _ => _.tender.title) }}</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("plan.main_CPV") }}</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.tender.classification.id) }} -
                  {{ gd(msRecord, _ => _.tender.classification.description) }}
                </div>
              </el-col>
              <!--<el-col :sm="6">
                <div class="info-block__text">Supplementary CPV code</div>
                <div class="info-block__value">???n/a</div>
              </el-col>-->
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("plan.type_of_contract") }}</div>
                <div class="info-block__value info-block__value_name">
                  {{ gd(msRecord, _ => _.tender.mainProcurementCategory) }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.estimated_total_value_excluding_VAT") }}</div>
                <div class="info-block__value">
                  {{ fa(gd(msRecord, _ => _.tender.value.amount)) }}
                  {{ gd(msRecord, _ => _.tender.value.currency) }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.short_description") }}</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.tender.description) }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.information_about_lots") }}</div>
                <div class="info-block__value">
                  <div>{{ $t("plan.contract_divided_into_lots") }}</div>
                  <div id="scrollToDescription">{{ $t("plan.tenders_submitted_all_lots") }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("plan.description") }}</div>
        <page-number
          v-if="needPagination"
          :current-page="currentPage"
          :elements-amount="elementsAmount"
          :page-size="pageSize"
        />
        <el-collapse
          accordion
          v-if="gd(pnRecord, _ => _.tender.hasOwnProperty('lots'))"
          :value="gd(pnRecord, _ => _.tender.lots[0].id, '0') + '0'"
        >
          <el-collapse-item
            v-for="(lot, index) of gd(pnRecord, _ => _.tender.lots, [])"
            v-if="index >= numberOfLastDisplayedLot - pageSize && index < numberOfLastDisplayedLot"
            :key="lot.id + index"
            :name="lot.id + index"
          >
            <template slot="title">
              <div class="info-block accordion-header">
                <el-row :gutter="15">
                  <el-col :sm="16">
                    <div class="info-block__text">{{ $t("plan.title") }}</div>
                    <div class="info-block__value info-block__value__bold">
                      {{ gd(lot, _ => _.title) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">{{ $t("plan.lot_identifier") }}</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.id) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </template>

            <div class="info-blocks">
              <!--<div class="info-block">
                <el-row :guttrn=15>
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
              </div>-->

              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">{{ $t("plan.place_of_performance") }}</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.placeOfPerformance.address.postalCode, $t("n/a")) }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.country.description) }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.region.description) }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.locality.description) }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.streetAddress) }}
                    </div>
                  </el-col>
                  <!--<el-col :sm="8">
                    <div class="info-block__text">NUTS code</div>
                    <div class="info-block__value">
                      n/a
                    </div>
                  </el-col>-->
                </el-row>
              </div>

              <div class="info-block">
                <div class="info-block__text">{{ $t("plan.description_of_procurement") }}:</div>
                <div
                  v-for="item of gd(pnRecord, _ => _.tender.items, []).filter(
                    item => gd(item, _ => _.relatedLot, '') === gd(lot, _ => _.id)
                  )"
                  :key="item.id"
                >
                  <el-row :gutter="15">
                    <el-col :sm="16">
                      <div class="info-block__value">
                        <div>{{ gd(item, _ => _.description) }}</div>
                        <div class="info-block__text_small">
                          {{ gd(item, _ => _.classification.id) }} {{ gd(item, _ => _.classification.description) }}
                        </div>
                      </div>
                    </el-col>
                    <el-col :sm="8">
                      <div class="info-block__value">
                        {{ gd(item, _ => _.quantity) }} {{ gd(item, _ => _.unit.name) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- <div class="info__sub-title">Level of Performance</div>-->

              <!--<div class="info-block">
                <el-row :guttrn=15>
                  <el-col :sm="16">
                    <div class="info-block__text">Warranty Period</div>
                    <div class="info-block__value">
                      A minimum product warranty of 1 year is required for all bids. Extended warranties receive an
                      advantage
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">???1 year</div>
                    <div class="info-block__value">???is required as minimum</div>
                  </el-col>
                </el-row>

                <el-row :guttrn=15>
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

                <el-row :guttrn=15>
                  <el-col :sm="16">
                    <div class="info-block__text">Terms of delivery</div>
                    <div class="info-block__value">
                      A minimum product warranty of 1 year is required for all bids. Extended warranties receive an
                      advantage
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">???4 weeks</div>
                    <div class="info-block__value">???is required as maximum</div>
                  </el-col>
                </el-row>

                <el-row :guttrn=15>
                  <el-col :sm="16">
                    <div class="info-block__text">Applicable options</div>
                    <div class="info-block__value">
                      <div>???Delivery during 4 weeks</div>
                      <div>???Delivery during 3 weeks</div>
                      <div>???Delivery during 2 weeks</div>
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

                <el-row :guttrn=15>
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
              </div>-->

              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">{{ $t("plan.estimated_value_excluding_VAT") }}</div>
                    <div class="info-block__value">
                      {{ fa(gd(lot, _ => _.value.amount)) }} {{ gd(lot, _ => _.value.currency) }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!--<div class="info-block" v-if="procedureType==='Open Tender' || procedureType==='Licitație deschisă' || procedureType==='Открытые торги'">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">
                      {{ $t("plan.big_guarantee_must_be_valid") }}
                    </div>
                    <div class="info-block__value">
                      {{ fa(gd(lot, _ => _.value.amount) * 0.02) }} {{ gd(lot, _ => _.value.currency) }}
                    </div>
                  </el-col>
                </el-row>
              </div>-->

              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">
                      {{ $t("plan.duration_of_contract") }}
                    </div>
                    <div class="info-block__value">
                      {{ $t("plan.start") }}: {{ fd(gd(lot, _ => _.contractPeriod.startDate), "DD.MM.YYYY") }} /
                      {{ $t("plan.end") }}: {{ fd(gd(lot, _ => _.contractPeriod.endDate), "DD.MM.YYYY") }}
                      <div>{{ $t("plan.is_not_renewal") }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">{{ $t("plan.information_about_variants") }}</div>
                    <div class="info-block__value">
                      {{
                        gd(lot, _ => _.variants[0].hasVariants)
                          ? $t("plan.variants_will_be_accepted")
                          : $t("plan.variants_will_not_be_accepted")
                      }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">{{ $t("plan.information_about_options") }}</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.options[0].hasOptions) ? $t("plan.has_options") : $t("plan.no_options") }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div
                class="info-block"
                v-if="
                  gd(pnRecord, _ => _.tender.documents, []).filter(
                    doc => gd(doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id)
                  ).length
                "
              >
                <div
                  class="info-block__documents"
                  v-for="(doc, index) of getDocs(
                    gd(pnRecord, _ => _.tender.documents, []).filter(
                      doc => gd(doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id)
                    )
                  )"
                  :key="doc.id + index"
                >
                  <div class="info-block__document">
                    <el-row :gutter="15">
                      <el-col :sm="24">
                        <div class="info-block__value ">
                          {{ parseDocType(gd(doc, _ => _.documentType)) }}
                          <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :sm="16">
                        <div class="info-block__text info-block__text_small">
                          {{ $t("plan.id") }}: {{ gd(doc, _ => _.id) }}
                        </div>
                      </el-col>
                      <el-col :sm="8">
                        <div class="info-block__text info-block__text_small">
                          {{ $t("plan.published") }}: {{ fd(gd(doc, _ => _.datePublished)) }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div
                    v-for="(oldDoc, index) of gd(doc, _ => _.oldVersions, [])"
                    :key="oldDoc.id + index"
                    class="info-block__document info-block__document_old"
                  >
                    <el-row :gutter="15">
                      <el-col :sm="24">
                        <div class="info-block__value">
                          {{ parseDocType(gd(oldDoc, _ => _.documentType)) }}
                          <a :href="gd(oldDoc, _ => _.url)">{{ gd(oldDoc, _ => _.title) }}</a>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :sm="16" class="info-block__text_oldDoc">
                        <div class="info-block__text info-block__text_small">
                          {{ $t("plan.id") }}: {{ gd(oldDoc, _ => _.id) }}
                        </div>
                      </el-col>
                      <el-col :sm="8">
                        <div class="info-block__text info-block__text_small">
                          {{ $t("plan.published") }}: {{ fd(gd(oldDoc, _ => _.datePublished)) }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div v-else>{{ $t("plan.no_lots") }}</div>
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

      <!-- Legal, economic, financial and technical information -->
      <!--<div>
        <div class="info__title">Legal, economic, financial and technical information</div>
        <div class="info__sub-title">Conditions for participation</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :guttrn=15>
              <el-col :sm="24">
                <div class="info-block__text">Suitability to pursue the professional activity, including requirements
                  relating to enrolment on professional or trade registers
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="24">
                <div class="info-block__value">Enrolment in a relevant professional register</div>
                <div class="info-block__text">
                  It is enrolled in relevant professional registers kept in the Member State of its establishment as
                  described in Annex XI economic operators from certain Member States may have to comply with other
                  requirements set out in that Annex.
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="24">
                <div class="info-block__value">Enrolment in a trade register</div>
                <div class="info-block__text">
                  It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI
                  of Directive 2014/24/EU; EOs from certain Member States may have to comply with other requirements set
                  out in that Annex.
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="24">
                <div class="info-block__value">Authorisation of particular organisation needed</div>
                <div class="info-block__text">
                  Is a particular authorisation of a particular organisation needed in order to be able to perform the
                  service in question in the country of establishment of the economic operator?
                </div>
              </el-col>
            </el-row>
          </div>

          &lt;!&ndash;<div class="info-block">
            <el-row :guttrn=15>
              <el-col :sm="24">
                <div class="info-block__text">
                  Economic and financial standing
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="16">
                <div class="info-block__value">
                  Economic and financial standing
                </div>
                <div class="info-block__text">
                  Its general yearly turnover for the number of financial years required in the relevant notice, the
                  procurement documents or the ESPD is as follows more information
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__value">
                  ???5’000’000,00 MDL
                </div>
                <div class="info-block__text">
                  ???is required as minimum
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="16">
                <div class="info-block__value">
                  Average yearly turnover
                </div>
                <div class="info-block__text">
                  It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI
                  of Directive 2014/24/EU; EOs from certain Member States may have to comply with other requirements set
                  out in that Annex.
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__value">
                  ???15’000’000,00 MDL
                </div>
                <div class="info-block__text">
                  ???is required as minimum
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="16">
                <div class="info-block__value">
                  Set up of economic operator
                </div>
                <div class="info-block__text">
                  ???Is a particular authorisation of a particular organisation needed in order to be able to perform the
                  service in question in the country of establishment of the economic operator?
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__value">
                  ???1’000’000,00 MLD
                </div>
                <div class="info-block__text">
                  ???is required as minimum
                </div>
              </el-col>
            </el-row>
          </div>&ndash;&gt;

          &lt;!&ndash;<div class="info-block">
            <el-row :guttrn=15>
              <el-col :sm="24">
                <div class="info-block__text">
                  Technical and professional ability
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="16">
                <div class="info-block__value">
                  Number of managerial staff
                </div>
                <div class="info-block__text">
                  The economic operator's number of managerial staff for the last three years were as follows
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__value">
                  ???15 human
                </div>
                <div class="info-block__text">
                  ???is required as minimum
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="16">
                <div class="info-block__value">
                  Average annual manpower
                </div>
                <div class="info-block__text">
                  The economic operator's average annual manpower for the last three years were as follows' '
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__value">
                  ???15’000 human/hours
                </div>
                <div class="info-block__text">
                  ???is required as minimum
                </div>
              </el-col>
            </el-row>

            <el-row :guttrn=15>
              <el-col :sm="16">
                <div class="info-block__value">
                  Subcontracting proportion
                </div>
                <div class="info-block__text">
                  Is a particular authorisation of a particular organisation needed in order to be able to perform the
                  service in question in the country of establishment of the economic operator?
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__value">
                  ???40%
                </div>
                <div class="info-block__text">
                  ???is required as maximum
                </div>
              </el-col>
            </el-row>
          </div>&ndash;&gt;
        </div>

        &lt;!&ndash;<div class="info__sub-title">General terms of the contract</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :guttrn=15>
              <el-col :sm="24">
                <div class="info-block__value">
                  &lt;!&ndash; @TODO link to current contract template &ndash;&gt;
                  ???Link to the document for current procurement category published on MTender web portal
                </div>
              </el-col>
            </el-row>
          </div>
        </div>&ndash;&gt;

        &lt;!&ndash;<div class="info__sub-title">Special conditions of the contract</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :guttrn=15>
              <el-col :sm="16">
                <div class="info-block__value">Contract performance guarantee</div>
                <div class="info-block__text">The economic operator's number of managerial staff for the last three years
                  were as follows
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__value">???15’000,00 MDL</div>
                <div class="info-block__text">???is required as minimum</div>
              </el-col>
            </el-row>
          </div>
        </div>&ndash;&gt;
      </div>-->

      <!-- Procedure -->
      <!--<div>
        <div class="info__title">{{ $t("plan.procedure") }}</div>
        <div class="info__sub-title">{{ $t("plan.description") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.type_of_procedure") }}</div>
                <div class="info-block__value">
                  {{ procedureType }}
                </div>
              </el-col>
              &lt;!&ndash;<el-col :sm="14">
                <div class="info-block__text">Accelerated procedure</div>
                <div class="info-block__value">???Justification:</div>
              </el-col>&ndash;&gt;
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("plan.administrative_information") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.previous_publication_concerning_procedure") }}</div>
                <div class="info-block__value">
                  {{ $t("plan.PP_Buyer_profile_PIN") }} №
                  &lt;!&ndash;<a
                    :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                    target="_blank">&ndash;&gt;
                  {{ gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === "planning")), _ => _.identifier) }}
                  &lt;!&ndash;</a>&ndash;&gt;
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">
                  {{ $t("plan.estimated_date") }}
                </div>
                <div class="info-block__value">
                  {{ fd(gd(pnRecord, _ => _.tender.tenderPeriod.startDate), "DD.MM.YYYY") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.languages_submitted") }}</div>
                <div class="info-block__value">
                  {{ $t("plan.romanian_russian") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">
                  <span class="info-block__text_accent"> {{ $t("plan.for_electronic_tendering_procedures") }}: </span>
                  {{ $t("plan.upon_expiry_of_submission_deadlines") }}
                </div>
                <div class="info-block__text">
                  <span class="info-block__text_accent">{{ $t("plan.for_non-electronic_procedures") }}: </span>
                  {{ $t("plan.negotiated_with_publication") }}
                </div>

              </el-col>
              &lt;!&ndash; <el-col :sm="16">
                 <div class="info-block__text"> Information about authorised persons and opening procedure</div>
                 <div class="info-block__value">
                 &ndash;&gt;
              &lt;!&ndash; @TODO text from Pasha &ndash;&gt;
              &lt;!&ndash;Full name of the persone
            </div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">
              {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "procuringEntity")), _ =>
              _.address.addressDetails.country.description) }}, {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "procuringEntity")), _ =>
              _.address.addressDetails.locality.description) }}
            </div>
          </el-col>
        &ndash;&gt;
            </el-row>
          </div>
        </div>
      </div>-->

      <!-- Budget -->
      <div>
        <div class="info__title">{{ $t("plan.budget") }}</div>

        <div class="info__sub-title">{{ $t("plan.budget_breakdown") }}</div>
        <el-collapse accordion @change="getFSRecord">
          <budget-breakdown
            v-for="(budgetBreakdown, index) of breakdowns"
            :key="budgetBreakdown.ocid"
            :budgetBreakdown="budgetBreakdown"
            :index="index"
          />
        </el-collapse>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.rationale_procurement") }}</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.planning.rationale, $t("n/a")) }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.short_free_description") }}</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.planning.budget.description, $t("n/a")) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- Complementary information -->
      <div>
        <div class="info__title">{{ $t("plan.complementary_information") }}</div>
        <!--<div class="info__sub-title">{{ $t("plan.information_about_electronic_workflows") }}</div>
        <ul class="info-list">
          <li>{{ $t("plan.complementary_information_list1_p1") }}</li>
          <li>{{ $t("plan.complementary_information_list1_p2") }}</li>
          <li>{{ $t("plan.complementary_information_list1_p3") }}</li>
          <li>{{ $t("plan.complementary_information_list1_p4") }} </li>
          <li>{{ $t("plan.complementary_information_list1_p5") }}</li>
        </ul>-->

        <div class="info__sub-title">{{ $t("plan.additional_information") }}</div>
        <ul class="info-list">
          <li>{{ $t("plan.complementary_information_list2_p1") }}</li>
          <!--<li>{{ $t("plan.complementary_information_list2_p2") }}</li>
          <li>{{ $t("plan.complementary_information_list2_p3") }}</li>
          <li v-if="procedureType==='Open Tender' || procedureType==='Licitație deschisă' || procedureType==='Открытые торги'">
            {{ $t("plan.complementary_information_list2_p4_1") }}
            {{ fa(gd(msRecord, _ => _.tender.value.amount) * 0.02) }}
            {{ $t("plan.complementary_information_list2_p4_2") }}
          </li>
          <li> {{ $t("plan.complementary_information_list2_p5") }}
          </li>-->
        </ul>

        <div class="info__sub-title">{{ $t("plan.procedure_documents") }}</div>
        <div v-if="gd(pnRecord, _ => _.tender.hasOwnProperty('documents'))" class="info-blocks">
          <div class="info-block">
            <div
              class="info-block__documents"
              v-for="(doc, index) of getDocs(
                gd(
                  gd(pnRecord, _ => _.tender.documents, []).filter(_doc => !_doc.hasOwnProperty('relatedLots')),
                  _ => _,
                  []
                )
              )"
              :key="doc.id + index"
            >
              <div class="info-block__document">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__value ">
                      {{ parseDocType(gd(doc, _ => _.documentType)) }}
                      <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="15">
                  <el-col :sm="16">
                    <div class="info-block__text info-block__text_small">
                      {{ $t("plan.id") }}: {{ gd(doc, _ => _.id) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text info-block__text_small">
                      {{ $t("plan.published") }}: {{ fd(gd(doc, _ => _.datePublished)) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                v-for="(oldDoc, index) of gd(doc, _ => _.oldVersions, [])"
                :key="oldDoc.id + index"
                class="info-block__document info-block__document_old"
              >
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__value">
                      {{ parseDocType(gd(oldDoc, _ => _.documentType)) }}
                      <a :href="gd(oldDoc, _ => _.url)">{{ gd(oldDoc, _ => _.title) }}</a>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="15">
                  <el-col :sm="16" class="info-block__text_oldDoc">
                    <div class="info-block__text info-block__text_small">
                      {{ $t("plan.id") }}: {{ gd(oldDoc, _ => _.id) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text info-block__text_small">
                      {{ $t("plan.published") }}: {{ fd(gd(oldDoc, _ => _.datePublished)) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div v-else>{{ $t("plan.no_documents") }}</div>

        <!--<div class="info__sub-title" v-html="$t('plan.procudures_for_review')"></div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.official_name")}}</div>
                <div class="info-block__value">
                  Agenția Națională pentru Soluționarea Contestațiilor
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.postal_address")}}</div>
                <div class="info-block__value">
                  bd. Ștefan cel Mare și Sfânt, 124, et. 4
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("plan.town") }}</div>
                <div class="info-block__value">
                  Chișinău
                </div>
              </el-col>

              <el-col :sm="4">
                <div class="info-block__text">{{ $t("plan.nuts_code") }}</div>
                <div class="info-block__value">
                  n/a
                </div>
              </el-col>

              <el-col :sm="6">
                <div class="info-block__text">{{ $t("plan.postal_code") }}</div>
                <div class="info-block__value">
                  MD-2001
                </div>
              </el-col>

              <el-col :sm="8">0
                <div class="info-block__text">{{ $t("plan.country") }}</div>
                <div class="info-block__value">
                  Republic of Moldova
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("plan.email") }}</div>
                <div class="info-block__value">
                  contestatii@ansc.md
                </div>
              </el-col>

              <el-col :sm="6">
                <div class="info-block__text">{{ $t("plan.telephone") }}</div>
                <div class="info-block__value">
                  +373 22 820 652
                </div>
              </el-col>

              <el-col :sm="8">
                <div class="info-block__text">{{ $t("plan.fax") }}</div>
                <div class="info-block__value">
                  +373 22 820 651
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.main_internet_address") }}</div>
                <div class="info-block__value">
                  <a href="https://www.ansc.md" target="_blank">www.ansc.md</a>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("plan.review_procedures_title") }}</div>
        <div class="info-block">
          <p>
            {{ $t("plan.review_procedures_p1") }}
          </p>
          <ol>
            <li>
              {{ $t("plan.review_procedures_list1_p1") }}:
              <ol>
                <li class="info-block__text">
                  {{ $t("plan.review_procedures_list1_p2_1") }}</li>
                <li class="info-block__text">
                  {{ $t("plan.review_procedures_list1_p2_2") }}</li>
              </ol>
            </li>
            <li>
              {{ $t("plan.review_procedures_list1_p3") }}
            </li>
            <li>
              {{ $t("plan.review_procedures_list1_p4") }}
            </li>
          </ol>
        </div>-->
      </div>
      <div class="info__sub-title">
        {{ $t("plan.date_online_publication") }}:
        {{ fd(gd(pnRecord, _ => _.tender.tenderPeriod.startDate), "DD/MM/YYYY") }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import typesOfBuyers from "../../../../../store/types/buyers-types";
import mainGeneralActivites from "../../../../../store/types/main-general-activity-types";
import mainSectoralActivites from "../../../../../store/types/main-sectoral-activity";
import platforms from "../../../../../store/types/platforms";
import ListPagination from "../../../../../components/ListPagination";
import PageNumber from "../../../../../components/PageNumber";
import BudgetBreakdown from "../../../../../components/BudgetBreakdown";

import {
  getDataFromObject,
  formatDate,
  parseDocumentType,
  formatAmount,
  transformDocumentation,
  getOrganizationObject,
  getSourceOfMoney,
} from "../../../../../utils";
import { getBudgetConfig } from "../../../../../configs/requests-configs";

export default {
  name: "ContractNotice",
  props: {
    msRecord: {
      type: Object,
      required: true,
    },
    pnRecord: {
      type: Object,
    },
    procedureType: {
      type: String,
      required: true,
    },
    hasTender: Boolean,
  },
  components: {
    "list-pagination": ListPagination,
    "page-number": PageNumber,
    "budget-breakdown": BudgetBreakdown,
  },
  data() {
    return {
      FSs: {},
      pageSize: 25,
      numberOfLastDisplayedLot: 25,
      currentPage: 1,
    };
  },
  created() {
    /*console.log("MS", this.msRecord);
      console.log("PN", this.pnRecord);*/
  },
  computed: {
    getTypeOfBuyer() {
      if (
        !this.gd(
          this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
          _ => _.details.typeOfBuyer
        )
      ) {
        return this.$t("n/a");
      }

      return typesOfBuyers.find(
        type =>
          type.value ===
          this.gd(
            this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
            _ => _.details.typeOfBuyer
          )
      ).name[this.$i18n.locale];
    },
    getMainGeneralActivity() {
      if (
        !this.gd(
          this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
          _ => _.details.mainGeneralActivity
        )
      ) {
        return this.$t("n/a");
      }

      return mainGeneralActivites.find(
        activity =>
          activity.value ===
          this.gd(
            this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
            _ => _.details.mainGeneralActivity
          )
      ).name[this.$i18n.locale];
    },
    getMainSectoralActivity() {
      if (
        !this.gd(
          this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
          _ => _.details.mainSectoralActivity
        )
      ) {
        return this.$t("n/a");
      }

      return mainSectoralActivites.find(
        activity =>
          activity.value ===
          this.gd(
            this.gd(this.msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
            _ => _.details.mainSectoralActivity
          )
      ).name[this.$i18n.locale];
    },
    randomSortPlatforms() {
      return [...platforms].sort(() => 0.5 - Math.random());
    },
    needPagination() {
      return this.elementsAmount > this.pageSize;
    },
    elementsAmount() {
      return this.gd(this.pnRecord, _ => _.tender.lots, []).length;
    },
    breakdowns() {
      return this.gd(this.msRecord, _ => _.planning.budget.budgetBreakdown, []).map(budgetBreakdown => ({
        ocid: this.gd(budgetBreakdown, _ => _.id),
        value: {
          amount: this.gd(budgetBreakdown, _ => _.amount.amount),
          currency: this.gd(budgetBreakdown, _ => _.amount.currency),
        },
        status: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].status, null),
        sourceOfMoney: getSourceOfMoney(
          this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].parties, []),
          getOrganizationObject(this.gd(this.msRecord, _ => _.parties), "buyer").id
        ),
        description: this.gd(budgetBreakdown, _ => _.description, this.$t("n/a")),
        budgetLineId: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].budgetLineId, this.$t("n/a")),
        EIocid: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].EIocid),
        EIname: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].EIname),
        period: {
          startDate: this.gd(budgetBreakdown, _ => _.period.startDate),
          endDate: this.gd(budgetBreakdown, _ => _.period.endDate),
        },
        project: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].project, this.$t("n/a")),
        projectId: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].projectId, this.$t("n/a")),
        buyer: {
          name: getOrganizationObject(this.gd(this.msRecord, _ => _.parties), "buyer").name,
          id: getOrganizationObject(this.gd(this.msRecord, _ => _.parties), "buyer").identifier.id,
        },
        funder: {
          name: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].funder.name),
          id: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].funder.id),
        },
        payer: {
          name: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].payer.name),
          id: this.gd(this.FSs, _ => _[this.gd(budgetBreakdown, _ => _.id)].payer.id),
        },
      }));
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
    async getFSRecord(FSocid) {
      if (!FSocid || this.FSs.hasOwnProperty(FSocid)) {
        return false;
      }

      const EIocid = FSocid.replace(/-FS-[0-9]{13}$/, "");

      try {
        const responseBudget = await axios(getBudgetConfig(EIocid));
        const EI = responseBudget.data.records.find(record => record.ocid === EIocid).compiledRelease;
        const FS = responseBudget.data.records.find(record => record.ocid === FSocid).compiledRelease;
        this.FSs = Object.assign({}, this.FSs, {
          [FS.ocid]: {
            project: this.gd(FS, _ => _.planning.project),
            projectId: this.gd(FS, _ => _.planning.projectId),
            budgetLineId: this.gd(FS, _ => _.planning.budget.id),
            payer: {
              name: FS.parties.find(part => part.roles.some(role => role === "payer")).name,
              id: FS.parties.find(part => part.roles.some(role => role === "payer")).identifier.id,
            },
            funder: {
              name: this.gd(getOrganizationObject(FS.parties, "funder"), _ => _.name),
              id: this.gd(getOrganizationObject(FS.parties, "funder"), _ => _.identifier.id),
            },
            status: this.gd(FS, _ => _.planning.budget.verified),
            parties: this.gd(FS, _ => _.parties),
            EIocid,
            EIname: EI.tender.title,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    getDocs(docs) {
      return transformDocumentation(docs);
    },
    changePage(page) {
      this.numberOfLastDisplayedLot = page * this.pageSize;
      this.currentPage = page;
    },
    getOrganizationObject(...args) {
      return getOrganizationObject(...args);
    },
  },
};
</script>
