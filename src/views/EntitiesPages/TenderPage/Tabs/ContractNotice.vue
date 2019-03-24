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
      <!--<a>Legal, economic, financial and technical information</a>-->
      <a :data-displayLink="needDisplay">{{ $t("tender.procedure") }}</a>
      <a :data-displayLink="needDisplay">{{ $t("tender.budget") }}</a>
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
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.name
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.procuring_entity_identifier") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.identifier.scheme
                    )
                  }}:
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.identifier.id
                    )
                  }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.procuring_entity_address") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.address.addressDetails.region.description
                    )
                  }},
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.address.streetAddress
                    )
                  }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.town") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.address.addressDetails.locality.description
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="4">
                <div class="info-block__text">{{ $t("tender.nuts_code") }}</div>
                <div class="info-block__value">{{ $t("n/a") }}</div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.postal_code") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.address.postalCode,
                      $t("n/a")
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.country") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.address.addressDetails.country.description
                    )
                  }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("tender.contact_persone") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.contactPoint.name
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.telephone") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                      _ => _.contactPoint.telephone
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.email") }}</div>
                <div class="info-block__value">
                  <a
                    :href="
                      `mailto:${gd(
                        gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')),
                        _ => _.contactPoint.email
                      )}`
                    "
                  >
                    {{
                      gd(
                        gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                        _ => _.contactPoint.email
                      )
                    }}
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("tender.main_internet_address") }}</div>
                <div class="info-block__value">
                  <a
                    v-if="
                      gd(
                        gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')),
                        _ => _.contactPoint.url
                      )
                    "
                    :href="
                      gd(
                        gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')),
                        _ => _.contactPoint.url
                      )
                    "
                    target="_blank"
                  >
                    {{
                      gd(
                        gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "buyer")),
                        _ => _.contactPoint.url
                      )
                    }}
                  </a>
                  <span v-else>{{ $t("n/a") }}</span>
                </div>
              </el-col>
              <el-col :sm="14">
                <div class="info-block__text">{{ $t("tender.address_of_buyer_profile") }}</div>
                <div class="info-block__value">
                  <a
                    :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}plans/${gd(msRecord, _ => _.ocid)}`"
                    target="_blank"
                  >
                    mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}plans/{{
                      gd(msRecord, _ => _.ocid)
                    }}
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("tender.type_of_buyer") }}</div>
                <div class="info-block__value">{{ getTypeOfBuyer }}</div>
              </el-col>
              <el-col :sm="14">
                <div class="info-block__text">{{ $t("tender.main_activity") }}</div>
                <div class="info-block__value">{{ getMainGeneralActivity }}</div>
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
                    :href="`/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders/${gd(msRecord, _ => _.ocid)}`"
                    target="_blank"
                  >
                    mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}tenders/{{
                      gd(msRecord, _ => _.ocid)
                    }}
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("tender.additional_information_obtained") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part =>
                        part.roles.some(role => role === "procuringEntity")
                      ),
                      _ => _.contactPoint.name
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.telephone") }}</div>
                <div class="info-block__value">
                  {{
                    gd(
                      gd(msRecord, _ => _.parties, []).find(part =>
                        part.roles.some(role => role === "procuringEntity")
                      ),
                      _ => _.contactPoint.telephone
                    )
                  }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.email") }}</div>
                <div class="info-block__value">
                  <a
                    :href="
                      `mailto:${gd(
                        gd(msRecord, _ => _.parties, []).find(part =>
                          part.roles.some(role => role === 'procuringEntity')
                        ),
                        _ => _.contactPoint.email
                      )}`
                    "
                  >
                    {{
                      gd(
                        gd(msRecord, _ => _.parties, []).find(part =>
                          part.roles.some(role => role === "procuringEntity")
                        ),
                        _ => _.contactPoint.email
                      )
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
                    :href="platform.href"
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
                <div class="info-block__value">{{ gd(msRecord, _ => _.tender.title) }}</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.main_CPV") }}</div>
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
                <div class="info-block__text">{{ $t("tender.type_of_contract") }}</div>
                <div class="info-block__value info-block__value_name">{{ getMainProcurementCategory }}</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.estimated_total_value_excluding_VAT") }}</div>
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
                <div class="info-block__text">{{ $t("tender.short_description") }}</div>
                <div class="info-block__value">{{ gd(msRecord, _ => _.tender.description) }}</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.information_about_lots") }}</div>
                <div class="info-block__value">
                  <div>{{ $t("tender.contract_divided_into_lots") }}</div>
                  <div id="scrollToDescription">{{ $t("tender.tenders_submitted_all_lots") }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("tender.description") }}</div>
        <page-number
          v-if="needPagination"
          :current-page="currentPage"
          :elements-amount="elementsAmount"
          :page-size="pageSize"
        />
        <el-collapse accordion :value="gd(evRecord, _ => _.tender.lots[0].id, '0') + '0'">
          <el-collapse-item
            v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
            v-if="index >= numberOfLastDisplayedLot - pageSize && index < numberOfLastDisplayedLot"
            :key="lot.id + index"
            :name="lot.id + index"
          >
            <template slot="title">
              <div class="info-block accordion-header">
                <el-row :gutter="15">
                  <el-col :sm="16">
                    <div class="info-block__text">{{ $t("tender.title") }}</div>
                    <div class="info-block__value info-block__value__bold">{{ gd(lot, _ => _.title) }}</div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">{{ $t("tender.lot_identifier") }}</div>
                    <div class="info-block__value">{{ gd(lot, _ => _.id) }}</div>
                  </el-col>
                </el-row>
              </div>
            </template>

            <div class="info-blocks">
              <!--<div class="info-block">
                <el-:rowrgutten"15>
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
                    <div class="info-block__text">{{ $t("tender.place_of_performance") }}</div>
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
                <div class="info-block__text">{{ $t("tender.description_of_procurement") }}:</div>
                <div
                  v-for="item of gd(evRecord, _ => _.tender.items, []).filter(
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
                <el-:rowrgutten"15>
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

                <el-:rowrgutten"15>
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

                <el-:rowrgutten"15>
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

                <el-:rowrgutten"15>
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

                <el-:rowrgutten"15>
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
                    <div class="info-block__text">{{ $t("tender.estimated_value_excluding_VAT") }}</div>
                    <div class="info-block__value">
                      {{ fa(gd(lot, _ => _.value.amount)) }} {{ gd(lot, _ => _.value.currency) }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!--<div class="info-block"
                   v-if="procedureType==='Open Tender' || procedureType==='Licitație deschisă' || procedureType==='Открытые торги'">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">
                      {{ $t("tender.big_guarantee_must_be_valid") }}
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
                    <div class="info-block__text">{{ $t("tender.duration_of_contract") }}</div>
                    <div class="info-block__value">
                      {{ $t("tender.start") }}: {{ fd(gd(lot, _ => _.contractPeriod.startDate), "DD.MM.YYYY") }} /
                      {{ $t("tender.end") }}: {{ fd(gd(lot, _ => _.contractPeriod.endDate), "DD.MM.YYYY") }}
                      <div>{{ $t("tender.is_not_renewal") }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">{{ $t("tender.information_about_variants") }}</div>
                    <div class="info-block__value">
                      {{
                        gd(lot, _ => _.variants[0].hasVariants)
                          ? $t("tender.variants_will_be_accepted")
                          : $t("tender.variants_will_not_be_accepted")
                      }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__text">{{ $t("tender.information_about_options") }}</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.options[0].hasOptions) ? $t("tender.has_options") : $t("tender.no_options") }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div
                class="info-block"
                v-if="
                  gd(evRecord, _ => _.tender.documents, []).filter(
                    doc => gd(doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id)
                  ).length
                "
              >
                <div
                  class="info-block__documents"
                  v-for="(doc, index) of getDocs(
                    gd(
                      gd(evRecord, _ => _.tender.documents, []).filter(
                        _doc => gd(_doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id)
                      ),
                      _ => _,
                      []
                    )
                  )"
                  :key="doc.id + index"
                >
                  <div class="info-block__document">
                    <el-row :gutter="15">
                      <el-col :sm="24">
                        <div class="info-block__value">
                          {{ parseDocType(gd(doc, _ => _.documentType)) }}
                          <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :sm="16">
                        <div class="info-block__text info-block__text_small">
                          {{ $t("tender.id") }}: {{ gd(doc, _ => _.id) }}
                        </div>
                      </el-col>
                      <el-col :sm="8">
                        <div class="info-block__text info-block__text_small">
                          {{ $t("tender.published") }}: {{ fd(gd(doc, _ => _.datePublished)) }}
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
                          {{ $t("tender.id") }}: {{ gd(oldDoc, _ => _.id) }}
                        </div>
                      </el-col>
                      <el-col :sm="8">
                        <div class="info-block__text info-block__text_small">
                          {{ $t("tender.published") }}: {{ fd(gd(oldDoc, _ => _.datePublished)) }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
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

      <!-- Legal, economic, financial and technical information -->
      <!--<div>
        <div class="info__title">Legal, economic, financial and technical information</div>
        <div class="info__sub-title">Conditions for participation</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-:rowrgutten"15>
              <el-col :sm="24">
                <div class="info-block__text">Suitability to pursue the professional activity, including requirements
                  relating to enrolment on professional or trade registers
                </div>
              </el-col>
            </el-row>

            <el-:rowrgutten"15>
              <el-col :sm="24">
                <div class="info-block__value">Enrolment in a relevant professional register</div>
                <div class="info-block__text">
                  It is enrolled in relevant professional registers kept in the Member State of its establishment as
                  described in Annex XI economic operators from certain Member States may have to comply with other
                  requirements set out in that Annex.
                </div>
              </el-col>
            </el-row>

            <el-:rowrgutten"15>
              <el-col :sm="24">
                <div class="info-block__value">Enrolment in a trade register</div>
                <div class="info-block__text">
                  It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI
                  of Directive 2014/24/EU; EOs from certain Member States may have to comply with other requirements set
                  out in that Annex.
                </div>
              </el-col>
            </el-row>

            <el-:rowrgutten"15>
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
            <el-:rowrgutten"15>
              <el-col :sm="24">
                <div class="info-block__text">
                  Economic and financial standing
                </div>
              </el-col>
            </el-row>

            <el-:rowrgutten"15>
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

            <el-:rowrgutten"15>
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

            <el-:rowrgutten"15>
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
            <el-:rowrgutten"15>
              <el-col :sm="24">
                <div class="info-block__text">
                  Technical and professional ability
                </div>
              </el-col>
            </el-row>

            <el-:rowrgutten"15>
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

            <el-:rowrgutten"15>
              <el-col :sm="16">
                <div class="info-block__value">
                  Average annual manpower
                </div>
                <div class="info-block__text">
                  The economic operator's average annual manpower for the last three years were as follows
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

            <el-:rowrgutten"15>
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
            <el-:rowrgutten"15>
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
            <el-:rowrgutten"15>
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
              <!--<el-col :sm="14">
                <div class="info-block__text">Accelerated procedure</div>
                <div class="info-block__value">???Justification:</div>
              </el-col>-->
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="10">
                <div class="info-block__text">{{ $t("tender.information_about_electronic_auction") }}</div>
                <div class="info-block__value">
                  {{ $t("tender.an_electronic_auction_will") }}
                  <span v-if="!gd(evRecord, _ => _.tender, {}).hasOwnProperty('auctionPeriod')">{{
                    $t("tender.not")
                  }}</span>
                  {{ $t("tender.be_used") }}
                </div>
              </el-col>
              <el-col :sm="14" v-if="gd(evRecord, _ => _.tender, {}).hasOwnProperty('auctionPeriod')">
                <div class="info-block__text">{{ $t("tender.additional_information_electronic_auction") }}</div>
                <div class="info-block__value">
                  {{ $t("tender.start_date") }}:
                  {{ fd(gd(evRecord, _ => _.tender.auctionPeriod.startDate), "DD.MM.YYYY", $t("n/a")) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">{{ $t("tender.administrative_information") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.previous_publication_concerning_procedure") }}</div>
                <div class="info-block__value">
                  {{ $t("tender.PP_Buyer_profile_PIN") }} №
                  <!--<a
                    :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                  target="_blank">-->
                  {{
                    gd(
                      gd(msRecord, _ => _.relatedProcesses, []).find(procces =>
                        procces.relationship.some(relationship => relationship === "planning")
                      ),
                      _ => _.identifier
                    )
                  }}
                  <!--</a>-->
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.time_limit") }}</div>
                <div class="info-block__value">
                  {{ fd(gd(evRecord, _ => _.tender.tenderPeriod.endDate), "DD.MM.YYYY / HH:mm ") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.estimated_date") }}</div>
                <div class="info-block__value">
                  {{ fd(gd(evRecord, _ => _.tender.tenderPeriod.startDate), "DD.MM.YYYY / HH:mm ") }}
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

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.conditions_for_opening_tenders") }}</div>
                <div class="info-block__value">
                  {{
                    fd(
                      gd(evRecord, _ => _.tender, {}).hasOwnProperty("auctionPeriod")
                        ? gd(evRecord, _ => _.tender.auctionPeriod.endDate)
                        : gd(evRecord, _ => _.tender.tenderPeriod.endDate),
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
              <!-- <el-col :sm="16">
                <div class="info-block__text"> Information about authorised persons and opening procedure</div>
                <div class="info-block__value">
              -->
              <!-- @TODO text from Pasha -->
              <!--Full name of the persone
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "procuringEntity")), _ =>
                  _.address.addressDetails.country.description) }}, {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "procuringEntity")), _ =>
                  _.address.addressDetails.locality.description) }}
                </div>
              </el-col>
              -->
            </el-row>
          </div>
        </div>
      </div>

      <!-- Budget -->
      <div>
        <div class="info__title">{{ $t("tender.budget") }}</div>

        <div class="info__sub-title">{{ $t("tender.budget_breakdown") }}</div>
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
                <div class="info-block__text">{{ $t("tender.rationale_procurement") }}</div>
                <div class="info-block__value">{{ gd(msRecord, _ => _.planning.rationale, $t("n/a")) }}</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("plan.short_free_description") }}</div>
                <div class="info-block__value">{{ gd(msRecord, _ => _.planning.budget.description, $t("n/a")) }}</div>
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
          <!--<li v-if="procedureType==='Open Tender' || procedureType==='Licitație deschisă' || procedureType==='Открытые торги'">
            {{ $t("tender.complementary_information_list2_p4_1") }}
            {{ fa(gd(msRecord, _ => _.tender.value.amount) * 0.02) }}
            {{ $t("tender.complementary_information_list2_p4_2") }}
          </li>-->
          <li>{{ $t("tender.complementary_information_list2_p5") }}</li>
        </ul>

        <div class="info__sub-title">{{ $t("tender.procedure_documents") }}</div>
        <div class="info-blocks">
          <div class="info-block">
            <div
              class="info-block__documents"
              v-for="(doc, index) of getDocs(
                gd(
                  gd(evRecord, _ => _.tender.documents, []).filter(_doc => !_doc.hasOwnProperty('relatedLots')),
                  _ => _,
                  []
                )
              )"
              :key="doc.id + index"
            >
              <div class="info-block__document">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__value">
                      {{ parseDocType(gd(doc, _ => _.documentType)) }}
                      <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="15">
                  <el-col :sm="16">
                    <div class="info-block__text info-block__text_small">
                      {{ $t("tender.id") }}: {{ gd(doc, _ => _.id) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text info-block__text_small">
                      {{ $t("tender.published") }}: {{ fd(gd(doc, _ => _.datePublished)) }}
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
                      {{ $t("tender.id") }}: {{ gd(oldDoc, _ => _.id) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text info-block__text_small">
                      {{ $t("tender.published") }}: {{ fd(gd(oldDoc, _ => _.datePublished)) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
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
      {{ fd(gd(evRecord, _ => _.tender.enquiryPeriod.startDate), "DD/MM/YYYY") }}
    </div>
  </div>
</template>

<script>
import mainProcurementCategory from "./../../../../store/types/main-procurement-category";
import typesOfBuyers from "./../../../../store/types/buyers-types";
import mainGeneralActivites from "./../../../../store/types/main-general-activity-types";

import ListPagination from "./../../../../components/ListPagination";
import PageNumber from "./../../../../components/PageNumber";
import BudgetBreakdown from "../../../../components/BudgetBreakdown";

import {
  getDataFromObject,
  formatDate,
  parseDocumentType,
  addPeriod,
  formatAmount,
  transformDocumentation,
} from "./../../../../utils";

export default {
  name: "ContractNotice",
  props: {
    msRecord: {
      type: Object,
      required: true,
    },
    evRecord: {
      type: Object,
    },
    procedureType: {
      type: String,
      required: true,
    },
    getFS: {
      type: Function,
      required: true,
    },
    breakdowns: {
      type: Array,
      required: true,
    },
  },
  components: {
    "list-pagination": ListPagination,
    "page-number": PageNumber,
    "budget-breakdown": BudgetBreakdown,
  },
  data() {
    return {
      platforms: [
        {
          href: "https://yptender.md/",
          src: "/img/yptender.png",
          name: "YPTENDER.MD",
        },
        {
          href: "https://e-licitatie.md/",
          src: "/img/e-lici.png",
          name: "e-licitatie.md",
        },
        {
          href: "https://achizitii.md/",
          src: "/img/achizitii.md.png",
          name: "achizitii.md",
        },
        {
          href: "javascript:void(0)",
          src: "/img/ebs-integrator.png",
          name: "ebs-integrator",
        },
        {
          href: "javascript:void(0)",
          src: "/img/lonar.png",
          name: "lonar",
        },
      ],
      needDisplay: false,
      windowWidth: 0,
      computedOffset: 75,
      pageSize: 25,
      numberOfLastDisplayedLot: 25,
      currentPage: 1,
    };
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
    getMainProcurementCategory() {
      return mainProcurementCategory[this.gd(this.msRecord, _ => _.tender.mainProcurementCategory)][this.$i18n.locale];
    },
    randomSortPlatforms() {
      return [...this.platforms].sort(() => 0.5 - Math.random());
    },
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
    parseDocType(type) {
      return parseDocumentType(type, this.$i18n.locale);
    },
    add(date, timePeriod, count) {
      return addPeriod(date, timePeriod, count);
    },
    fa(amount) {
      return formatAmount(amount);
    },
    setWindowSize() {
      this.windowWidth = window.innerWidth;
    },
    getDocs(docs) {
      return transformDocumentation(docs);
    },
    changePage(page) {
      this.numberOfLastDisplayedLot = page * this.pageSize;
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
