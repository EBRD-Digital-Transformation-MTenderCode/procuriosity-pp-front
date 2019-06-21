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
                <div class="info-block__value">{{ gd(tender, _ => _.description, "###") }}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div v-if="tender.lots" class="info__sub-title">{{ $t("tender.description") }}</div>
        <page-number
          v-if="needPagination"
          :current-page="currentPage"
          :elements-amount="elementsAmount"
          :page-size="pageSize"
        />
        <el-collapse accordion :value="gd(tender, _ => _.lots[0].id, '0') + '0'">
          <el-collapse-item
            v-for="(lot, index) of gd(tender, _ => _.lots, [])"
            v-if="index >= numberOfLastDisplayedLot - pageSize && index < numberOfLastDisplayedLot"
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
              <!--             -->

              <div class="info-block">
                <div class="info-block__text">{{ $t("tender.description_of_procurement") }}:</div>
                <div
                  v-for="item of gd(tender, _ => _.items, []).filter(
                    item => gd(item, _ => _.relatedLot, '') === gd(lot, _ => _.id)
                  )"
                  :key="item.id"
                >
                  <el-row :gutter="15">
                    <el-col :sm="16">
                      <div class="info-block__value">
                        <div>{{ gd(item, _ => _.description, "###") }}</div>
                        <div class="info-block__text_small">
                          {{ gd(item, _ => _.classification.id, "###") }}
                          {{ gd(item, _ => _.classification.description, "###") }}
                        </div>
                      </div>
                    </el-col>
                    <el-col :sm="8">
                      <div class="info-block__value">
                        {{ gd(item, _ => _.quantity, "###") }} {{ gd(item, _ => _.unit.name, "###") }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="15">
                    <el-col :sm="24">
                      <div class="info-block__text">{{ $t("tender.place_of_performance") }}</div>
                      <div class="info-block__value">
                        {{ gd(item, _ => _.deliveryAddress.postalCode, $t("n/a")) }},
                        {{ gd(item, _ => _.deliveryAddress.countryName, "###") }},
                        {{ gd(item, _ => _.deliveryAddress.region, "###") }},
                        {{ gd(item, _ => _.deliveryAddress.locality, "###") }},
                        {{ gd(item, _ => _.deliveryAddress.streetAddress, "###") }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="15">
                    <el-col :sm="24">
                      <div class="info-block__text">{{ $t("tender.duration_of_contract") }}</div>
                      <div class="info-block__value">
                        {{ $t("tender.start") }}: {{ fd(gd(item, _ => _.deliveryDate.startDate), "DD.MM.YYYY") }} /
                        {{ $t("tender.end") }}: {{ fd(gd(lot, _ => _.deliveryDate.endDate), "DD.MM.YYYY") }}
                        <div>{{ $t("tender.is_not_renewal") }}</div>
                      </div>
                    </el-col>
                  </el-row>
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

      <!--&lt;!&ndash; Procedure &ndash;&gt;
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
              &lt;!&ndash;<el-col :sm="14">
                <div class="info-block__text">Accelerated procedure</div>
                <div class="info-block__value">???Justification:</div>
              </el-col>&ndash;&gt;
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
                  &lt;!&ndash;<a
                    :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                  target="_blank">&ndash;&gt;
                  {{
                    gd(
                      gd(msRecord, _ => _.relatedProcesses, []).find(procces =>
                        procces.relationship.some(relationship => relationship === "planning")
                      ),
                      _ => _.identifier
                    )
                  }}
                  &lt;!&ndash;</a>&ndash;&gt;
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
      </div>
-->
      <!-- &lt;!&ndash; Budget &ndash;&gt;
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
      </div>-->

      <!-- Complementary information -->
      <!--      <div>
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
          &lt;!&ndash;<li v-if="procedureType==='Open Tender' || procedureType==='Licitație deschisă' || procedureType==='Открытые торги'">
            {{ $t("tender.complementary_information_list2_p4_1") }}
            {{ fa(gd(msRecord, _ => _.tender.value.amount) * 0.02) }}
            {{ $t("tender.complementary_information_list2_p4_2") }}
          </li>&ndash;&gt;
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
      </div>-->
    </div>
    <!--    <div class="info__sub-title">
      {{ $t("tender.date_online_publication") }}:
      {{ fd(gd(evRecord, _ => _.tender.enquiryPeriod.startDate), "DD/MM/YYYY") }}
    </div>-->
  </div>
</template>

<script>
import mainProcurementCategory from "../../../../../store/types/main-procurement-category";
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
  addPeriod,
  formatAmount,
  transformDocumentation,
} from "../../../../../utils";

export default {
  name: "ContractNotice",
  props: {
    tender: {
      type: Object,
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
    getMainProcurementCategory() {
      return mainProcurementCategory[this.gd(this.msRecord, _ => _.tender.mainProcurementCategory)][this.$i18n.locale];
    },
    randomSortPlatforms() {
      return [...platforms].sort(() => 0.5 - Math.random());
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
