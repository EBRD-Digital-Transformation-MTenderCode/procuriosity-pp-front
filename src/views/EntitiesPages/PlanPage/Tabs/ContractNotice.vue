<template>
  <div>
    <div class="entity-nav"   data-scroll-spy-id="cn"  v-scroll-spy-active="{selector: 'a', class: 'active'}" v-scroll-spy-link>
      <a>Contracting authority</a>
      <a>Object</a>
      <!--<a>Legal, economic, financial and technical information</a>-->
      <a>Procedure</a>
      <a>Budget</a>
      <a>Complementary information</a>
    </div>
    <div class="info"  data-scroll-spy-id="cn" v-scroll-spy="{offset: 75, allowNoActive: true}">

      <!-- Contracting authority -->
      <div>
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
                  <a
                      v-if="gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')), _ =>_.contactPoint.url)"
                      :href="gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')), _ =>_.contactPoint.url)"
                      target="_blank"
                  >
                    {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'buyer')), _ =>_.contactPoint.url) }}
                  </a>
                  <span v-else>n/a</span>
                </div>
              </el-col>
              <el-col :sm="14">
                <div class="info-block__text">
                  Address of the buyer profile (URL)
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
                  <a :href="`https://www.mtender.gov.md/${$i18n.locale !== 'ro' ? `${$i18n.locale}/` : ''}tenders/${gd(msRecord, _ => _.ocid) }`" target="_blank">
                    www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}tenders/{{ gd(msRecord, _ => _.ocid) }}</a>
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
                  {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "procuringEntity")), _ =>
                  _.contactPoint.name) }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">
                  Telephone
                </div>
                <div class="info-block__value">
                  {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "procuringEntity")), _ =>
                  _.contactPoint.telephone) }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  E-mail
                </div>
                <div class="info-block__value">
                  <a
                      :href="`mailto:${gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === 'procuringEntity')), _ => _.contactPoint.email) }`"
                  >
                    {{ gd(gd(msRecord, _ => _.parties, []).find(part => part.roles.some(role => role === "procuringEntity")), _ =>
                    _.contactPoint.email) }}
                  </a>
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
                <div class="info-block__value info-block__value-platform">
                  <a
                      class="platform-link"
                      v-for="platform of randomSortPlatforms"
                      :key="platform.name"
                      :href="platform.href"
                      :title="platform.name"
                      target="_blank"
                  >
                    <img :src="platform.src" :alt="platform.name" class="platform-img">
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- Object -->
      <div>
        <div class="info__title">Object</div>
        <div class="info__sub-title">Scope of procurement</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Title</div>
                <div class="info-block__value">{{ gd(msRecord, _ => _.tender.title) }}</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="16">
                <div class="info-block__text">Main CPV code</div>
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
                <div class="info-block__text">Type of contract</div>
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
                  {{ fa(gd(msRecord, _ => _.tender.value.amount)) }}
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
                  {{ gd(msRecord, _ => _.tender.description) }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Information about lots</div>
                <div class="info-block__value">
                  <div>This contract is divided into lots</div>
                  <div>Tenders may be submitted for all lots</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">Description</div>
        <el-collapse accordion v-if="gd(pnRecord, _ => _.tender.hasOwnProperty('lots'))" :value="gd(pnRecord, _ => _.tender.lots[0].id, '0') + '0'">
          <el-collapse-item
              v-for="(lot, index) of gd(pnRecord, _ => _.tender.lots, [])"
              :key="lot.id + index"
              :name="lot.id + index"
          >
            <template slot="title">
              <div class="info-block accordion-header">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Title</div>
                    <div class="info-block__value info-block__value__bold">
                      <!-- @TODO < line hight -->
                      {{ gd(lot, _ => _.title) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">Lot identifier</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.id) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </template>

            <div class="info-blocks">
              <!--<div class="info-block">
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
              </div>-->

              <div class="info-block">
                <el-row>
                  <el-col :sm="24">
                    <div class="info-block__text">Place of performance</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.placeOfPerformance.address.postalCode, "n/a") }},
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
                <div class="info-block__text">Description of the procurement:</div>
                <div
                    v-for="item of gd(pnRecord, _ => _.tender.items, []).filter(item => gd(item, _ => _.relatedLot, '') === gd(lot, _ => _.id))"
                    :key="item.id"
                >
                  <el-row>
                    <el-col :sm="16">
                      <div class="info-block__value">
                        <div>{{ gd(item, _ => _.description) }}</div>
                        <div class="info-block__text_small">{{ gd(item, _ => _.classification.id) }} {{ gd(item, _ => _.classification.description) }}</div>
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
                <el-row>
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
                      A minimum product warranty of 1 year is required for all bids. Extended warranties receive an
                      advantage
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
              </div>-->

              <div class="info-block">
                <el-row>
                  <el-col :sm="24">
                    <div class="info-block__text">Estimated value excluding VAT</div>
                    <div class="info-block__value">
                      {{ fa(gd(lot, _ => _.value.amount)) }} {{ gd(lot, _ => _.value.currency) }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block" v-if="procedureType==='Open Tender' || procedureType==='Licitație deschisă' || procedureType==='Открытые торги'">
                <el-row>
                  <el-col :sm="24">
                    <div class="info-block__text">
                      The amount and currency of the big guarantee that must be valid 90 deays starting from opening of the tenders
                    </div>
                    <div class="info-block__value">
                      {{ fa(gd(lot, _ => _.value.amount) * 0.02) }} {{ gd(lot, _ => _.value.currency) }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="24">
                    <div class="info-block__text">Duration of the contract, framework agreement or dynamic purchasing
                      system
                    </div>
                    <div class="info-block__value">
                      Start: {{ fd(gd(lot, _ => _.contractPeriod.startDate), "DD.MM.YYYY") }} /
                      End: {{ fd(gd(lot, _ => _.contractPeriod.endDate), "DD.MM.YYYY") }}
                      <div>This contract is not a subject to renewal</div>
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

              <div class="info-block" v-if="gd(pnRecord, _ => _.tender.documents, []).filter(doc => gd(doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id)).length">
                <div class="info-block__documents"
                     v-for="(doc, index) of gd(pnRecord, _ => _.tender.documents,[]) .filter(doc => gd(doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id))"
                     :key="doc.id + index">
                  <el-row>
                    <el-col :sm="24">
                      <div class="info-block__value">
                        {{ convertCase(gd(doc, _ => _.documentType)) }} <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a></div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :sm="16">
                      <div class="info-block__text info-block__text__small">
                        ID: {{ gd(doc, _ => _.id) }}
                      </div>
                    </el-col>
                    <el-col :sm="8">
                      <div class="info-block__text info-block__text__small">
                        Published: {{ fd(gd(doc, _ => _.datePublished)) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div v-else>No lots</div>
      </div>

      <!-- Legal, economic, financial and technical information -->
      <!--<div>
        <div class="info__title">Legal, economic, financial and technical information</div>
        <div class="info__sub-title">Conditions for participation</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Suitability to pursue the professional activity, including requirements
                  relating to enrolment on professional or trade registers
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :sm="24">
                <div class="info-block__value">Enrolment in a relevant professional register</div>
                <div class="info-block__text">
                  It is enrolled in relevant professional registers kept in the Member State of its establishment as
                  described in Annex XI economic operators from certain Member States may have to comply with other
                  requirements set out in that Annex.
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :sm="24">
                <div class="info-block__value">Enrolment in a trade register</div>
                <div class="info-block__text">
                  It is enrolled in trade registers kept in the Member State of its establishment as described in Annex XI
                  of Directive 2014/24/EU; EOs from certain Member States may have to comply with other requirements set
                  out in that Annex.
                </div>
              </el-col>
            </el-row>

            <el-row>
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
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">
                  Economic and financial standing
                </div>
              </el-col>
            </el-row>

            <el-row>
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

            <el-row>
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

            <el-row>
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
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">
                  Technical and professional ability
                </div>
              </el-col>
            </el-row>

            <el-row>
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

            <el-row>
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

            <el-row>
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
            <el-row>
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
            <el-row>
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
        <div class="info__title">Procedure</div>
        <div class="info__sub-title">Description</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Type of procedure</div>
                <div class="info-block__value">
                  {{ procedureType }}
                </div>
              </el-col>
              <!--<el-col :sm="14">
                <div class="info-block__text">Accelerated procedure</div>
                <div class="info-block__value">???Justification:</div>
              </el-col>-->
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">Administrative information</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Previous publication concerning this procedure</div>
                <div class="info-block__value">
                  Procurement plan / Buyer’s profile / PIN: No
                  <!--<a
                    :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                    target="_blank">-->
                  {{ gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === "planning")), _ => _.identifier) }}
                  <!--</a>-->
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">
                  Estimated date of dispatch of invitations to tender or to participate to selected candidates
                </div>
                <div class="info-block__value">
                  {{ fd(gd(pnRecord, _ => _.tender.tenderPeriod.startDate), "DD.MM.YYYY") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Languages in which tenders or requests to participate may be submitted</div>
                <div class="info-block__value">
                  Romanian, Russian
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">
                  <span class="info-block__text_accent">For electronic tendering procedures: </span>upon expiry of submission deadlines, MTender shall disclose received
                  tender forms or requests to participate online on the MTender web portal and generate an electronic
                  document with a record of opening.
                </div>
                <div class="info-block__text">
                  <span class="info-block__text_accent">For non-electronic procedures: </span>negotiated with publication of contract notice, competitive dialogue,
                  design contest and innovative partnership
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
        <div class="info__title">Budget</div>

        <div class="info__sub-title">Budget breakdown</div>
        <el-collapse
            accordion
            @change="getFS"
        >
          <el-collapse-item
              v-for="(budgetBreakdown, index) of gd(msRecord, _ => _.planning.budget.budgetBreakdown, [])"
              :key="budgetBreakdown.id + index"
              :name="budgetBreakdown.id"
          >
            <template slot="title">
              <div class="info-block accordion-header">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Budgetline ID</div>
                    <div class="info-block__value">
                      {{ gd(budgetBreakdown, _ => _.id) }}
                    </div>
                  </el-col>
                  <el-col :sm="4">
                    <div class="info-block__text">Amount</div>
                    <div class="info-block__value">
                      {{ fa(gd(budgetBreakdown, _ => _.amount.amount)) }}
                      {{ gd(budgetBreakdown, _ => _.amount.currency) }}
                    </div>
                  </el-col>
                  <!--<el-col :sm="4">
                    <div class="info-block__text">Status</div>
                    <div class="info-block__value">
                      ???Verified
                    </div>
                  </el-col>-->
                </el-row>
              </div>
            </template>

            <div class="info-blocks">
              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Budget details or rationale</div>
                    <div class="info-block__value">{{ gd(budgetBreakdown, _ => _.description, "n/a") }}</div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">Validity Period</div>
                    <div class="info-block__value">
                      Start date: {{ fd(gd(budgetBreakdown, _ => _.period.startDate), "DD.MM.YYYY") }} -
                      End date: {{ fd(gd(budgetBreakdown, _ => _.period.endDate), "DD.MM.YYYY") }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Budget Project</div>
                    <div class="info-block__value">
                      {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].project, "n/a") }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">Project ID</div>
                    <div class="info-block__value">
                      {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].projectId, "n/a") }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Budget owner</div>
                    <div class="info-block__value">
                      {{ gd(gd(msRecord, _ => _.parties, []).find(part => gd(part, _ => _.roles, []).some(role => role === "buyer")), _ => _.name) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">National registration number</div>
                    <div class="info-block__value">
                      {{ gd(gd(msRecord, _ => _.parties, []).find(part => gd(part, _ => _.roles, []).some(role => role === "buyer")), _ => _.id) }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Payer Entity</div>
                    <div class="info-block__value">
                      {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].payer.name, "n/a") }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">National registration number</div>
                    <div class="info-block__value">
                      {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].payer.id, "n/a") }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Funding Entity</div>
                    <div class="info-block__value">
                      {{ FSs.hasOwnProperty(gd(budgetBreakdown, _ => _.id)) ? gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].funder.name, "State Money") : "n/a" }}
                    </div>
                  </el-col>
                  <el-col :sm="8" v-if="gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].funder.id)">
                    <div class="info-block__text">National registration number</div>
                    <div class="info-block__value">
                      {{ gd(FSs, _ => _[gd(budgetBreakdown, _ => _.id)].funder.id) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">The rationale for the procurement</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.planning.rationale, "n/a") }}
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">A short free text description of the budget</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.planning.budget.description, "n/a") }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- Complementary information -->
      <div>
        <div class="info__title">Complementary information</div>
        <div class="info__sub-title">Information about electronic workflows</div>
        <ul class="info-list">
          <li>Electronic ordering may be used.</li>
          <li>Electronic invoicing (e-Factura) will be accepted.</li>
          <li>Electronic payment in local currency (MDL) will be used.</li>
          <li>The MTender does not require the use of tools and devices that are not generally available for electronic
            communication.
          </li>
          <li>Use of mobile devices is not recommended for participating in the electronic auction.</li>
        </ul>

        <div class="info__sub-title">Additional information</div>
        <ul class="info-list">
          <li>The contract does not involve joint procurement and is not awarded by a CPB.</li>
          <li>This is not a recurrent procurement.</li>
          <li>Minimum time frame during which the tenderer must maintain the tender is 90 days starting from opening of
            the tenders.
          </li>
          <li v-if="procedureType==='Open Tender' || procedureType==='Licitație deschisă' || procedureType==='Открытые торги'">The amount and currency of the bid guarantee is - {{ fa(gd(msRecord, _ => _.tender.value.amount) * 0.02) }} of estimated value MDL and must be valid 90 days
            starting from opening of the tenders.
          </li>
          <li>Failure of the selected Economic Operator to submit the contract performance guarantee, if applicable, or to
            sign the contract shall constitute sufficient grounds for the annulment of the award of the contract and
            forfeiture of the bid guarantee.
          </li>
        </ul>

        <div class="info__sub-title">Procedure documents</div>
        <div v-if="gd(pnRecord, _ => _.tender.hasOwnProperty('documents'))" class="info-blocks">
          <div class="info-block">
            <div class="info-block__documents"
                 v-for="(doc, index) of gd(pnRecord, _ => _.tender.documents, []).filter(doc => !doc.hasOwnProperty('relatedLots'))"
                 :key="doc.id + index"
            >
              <el-row>
                <el-col :sm="24">
                  <div class="info-block__value ">
                    {{ convertCase(gd(doc, _ => _.documentType) ) }} <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text info-block__text_small">
                    ID: {{ gd(doc, _ => _.id) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text info-block__text_small">
                    Published: {{ fd(gd(doc, _ => _.datePublished)) }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div v-else>No documents</div>
        <div class="info__sub-title">Procudures for review</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Official name</div>
                <div class="info-block__value">
                  Agenția Națională pentru Soluționarea Contestațiilor
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Postal address</div>
                <div class="info-block__value">
                  bd. Ștefan cel Mare și Sfânt, 124, et. 4
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="6">
                <div class="info-block__text">Town</div>
                <div class="info-block__value">
                  Chișinău
                </div>
              </el-col>

              <el-col :sm="4">
                <div class="info-block__text">Nuts code</div>
                <div class="info-block__value">
                  n/a
                </div>
              </el-col>

              <el-col :sm="6">
                <div class="info-block__text">Postal Code</div>
                <div class="info-block__value">
                  MD-2001
                </div>
              </el-col>

              <el-col :sm="8">
                <div class="info-block__text">Country</div>
                <div class="info-block__value">
                  Republic of Moldova
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="10">
                <div class="info-block__text">E-mail</div>
                <div class="info-block__value">
                  contestatii@ansc.md
                </div>
              </el-col>

              <el-col :sm="6">
                <div class="info-block__text">Telephone</div>
                <div class="info-block__value">
                  +373 22 820 652
                </div>
              </el-col>

              <el-col :sm="8">
                <div class="info-block__text">Fax</div>
                <div class="info-block__value">
                  +373 22 820 651
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Main Internet address (URL)</div>
                <div class="info-block__value">
                  <a href="https://www.ansc.md" target="_blank">www.ansc.md</a>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">Review procedure</div>
        <div class="info-block">
          <p>
            The Economic Operator which has an interest in being awarded a public procurement contract and wishes to submit a complaint to the National Complaint Settlement Agency shall follow the procedures contained in Article 79-80 of the Law. Interim measures and suspention of the procedure may be requested.
          </p>
          <ol>
            <li>
              The Economic Operator may submit a complaint within:
              <ol>
                <li class="info-block__text">
                  10 days, starting with the day following the acknowledgment, subject to the conditions of the Law, of a deed of the contracting authority deemed illegal, in case the value of the contract to be awarded, estimated pursuant to the provisions of Art. 3, is equal to or higher than the value thresholds set out under Art. 2 para.(3) of the Law;
                </li>
                <li class="info-block__text">
                  5 days, starting with the day following the acknowledgment, subject to the conditions of the Law, of a deed of the contracting authority deemed illegal, in case the value of the contract to be awarded, estimated pursuant to the provisions of Art.3, is smaller than the value thresholds set out under a Art.2 para.(3) of the Law;
                </li>
              </ol>
            </li>
            <li>
              Filing of the complaint regarding deeds of the contracting authority which are issued or take place before opening of the tenders, is shall be done meeting the terms set out under para. (1), however no later than the deadline for submission of the tenders set by the contracting authority with the observance of provisions under Art. 34.
            </li>
            <li>
              In case that the complaint referred to under para.(1) is related to documents published in electronic format, the acknowledgment date shall be their publication date.
            </li>
          </ol>
        </div>
      </div>
      <div class="info__sub-title">Date of online publication of notice:  {{ fd(gd(pnRecord, _ => _.tender.tenderPeriod.startDate), "DD/MM/YYYY") }}</div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  import typesOfBuyers from "./../../../../store/types/buyers-types";
  import mainGeneralActivites from "./../../../../store/types/main-general-activity-types";

  import { getDataFromObject, formatDate, convertCamelCaseToTitleCase, addDay, formatAmount} from "./../../../../utils";

  export default {
    name: "ContractNotice",
    props: {
      msRecord: {
        type: Object,
        required: true
      },
      pnRecord: {
        type: Object
      },
      procedureType:{
        type: String,
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
          },
          {
            href: "javascript:void(0)",
            src: "/img/ebs-integrator.png",
            name: "ebs-integrator"
          },
          {
            href: "javascript:void(0)",
            src: "/img/lonar.png",
            name: "lonar"
          }
        ],
        FSs: {}
      };
    },
    created() {
      /*console.log("MS", this.msRecord);
      console.log("PN", this.pnRecord);*/
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
      },
      convertCase(str) {
        return convertCamelCaseToTitleCase(str)
      },
      add(date){
        return addDay(date)
      },
      fa(amount){
        return formatAmount(amount)
      },
      async getFS(ocidFS) {
        if (!ocidFS || this.FSs.hasOwnProperty(ocidFS)) {
          return false;
        }

        const cpidEI = ocidFS.replace(/-FS-[0-9]{13}$/, "");

        try {
          const responseFS = await axios({
            method: "get",
            url: `https://public.mtender.gov.md/budgets/${cpidEI}/${ocidFS}`
          });

          const FS = responseFS.data.releases[0];

          const payer = FS.parties.find(part => part.roles.some(role => role === "payer"));
          const funder = FS.parties.find(part => part.roles.some(role => role === "funder"));

          this.FSs = Object.assign({}, this.FSs, {
            [FS.ocid]: {
              project: FS.planning.project,
              projectId: FS.planning.projectId,
              payer: {
                name: payer.name,
                id: payer.id
              },
              funder: {
                name: funder ? funder.name : null,
                id: funder ? funder.id : null,
              }
            }
          });

        }
        catch (e) {
          console.log(e);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../styles/variables";


</style>
