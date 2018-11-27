<template>
  <div>
    <div class="entity-nav" v-scroll-spy-active="{selector: 'a', class: 'active'}" v-scroll-spy-link>
      <a>Contracting authority</a>
      <a>Object</a>
      <a>Legal, economic, financial and technical information</a>
      <a>Procedure</a>
      <a>Complementary information</a>
      <a>Budget</a>
    </div>
    <div class="info" v-scroll-spy="{offset: 75}">

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
                  <a href="https://www.fisc.md" target="_blank">www.fisc.md</a>
                </div>
              </el-col>
              <el-col :sm="14">
                <div class="info-block__text">
                  Address of the buyer profile (URL)
                </div>
                <div class="info-block__value">
                  <!--<a
                    :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                    target="_blank"
                  >
                    www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}plans/{{ gd(gd(msRecord, _ =>
                    _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship ===
                    "planning")), _ => _.identifier) }}
                  </a>-->
                  www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}plans/{{ gd(gd(msRecord, _ =>
                    _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship ===
                    "planning")), _ => _.identifier) }}
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
                www.mtender.gov.md/{{ $i18n.locale !== "ro" ? `${$i18n.locale}/` : "" }}tenders/{{ gd(msRecord, _ =>
                _.ocid) }}
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
                ???Rodica Midrigan
              </div>
            </el-col>
            <el-col :sm="6">
              <div class="info-block__text">
                Telephone
              </div>
              <div class="info-block__value">
                ???+373 222 21 107
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                E-mail
              </div>
              <div class="info-block__value">
                ???odica.midrigan@fisc.md
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
              <el-col :sm="16">
                <div class="info-block__text">Title</div>
                <div class="info-block__value">???Lucrări de instalaţii pentru clădiri</div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">Reference number</div>
                <div class="info-block__value">???MD-IDNO: 1007601009037</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="10">
                <div class="info-block__text">Main CPV code</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.tender.classification.id) }} -
                  {{ gd(msRecord, _ => _.tender.classification.description) }}
                </div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">Supplementary CPV code</div>
                <div class="info-block__value">???n/a</div>
              </el-col>
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
                  {{ gd(msRecord, _ => _.tender.value.amount) }}
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
                  ???Achiziționarea lucrărilor la obiectul ”Reparația capitală a sistemului de încălzire la instituția
                  preșcolară nr.4 din str.Fedico,8 din mun.Bălți” conform necesităților DÎTS a
                  Primăriei mun.Bălți
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__text">Information about lots</div>
                <div class="info-block__value">
                  <div>???This contract is divided into lots</div>
                  <div>???Tenders may be submitted for all lots</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">Description</div>
        <el-collapse accordion :value="gd(evRecord, _ => _.tender.lots[0].id, '0') + '0'">
          <el-collapse-item
            v-for="(lot, index) of gd(evRecord, _ => _.tender.lots, [])"
            :key="lot.id + index"
            :name="lot.id + index"
          >
            <template slot="title">
              <div class="info-block accordion-header">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Title</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.title) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">Lot number</div>
                    <div class="info-block__value">
                      {{ index + 1 }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </template>

            <div class="info-blocks">
              <div class="info-block">
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
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Place of performance</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.placeOfPerformance.address.postalCode, "n/a") }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.country.description) }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.region.description) }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.addressDetails.locality.description) }},
                      {{ gd(lot, _ => _.placeOfPerformance.address.streetAddress) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">NUTS code</div>
                    <div class="info-block__value">
                      n/a
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Description of the procurement:</div>
                    <div class="info-block__value">
                      <div>Lucrări de construcţii complete sau parţiale şi lucrări publice</div>
                      <div>45210000-2 Lucrări de construcţii de clădiri</div>
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__value">
                      589 Metru patrat
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>

            <div class="info__sub-title">Level of Performance</div>
            <div class="info-blocks">
              <div class="info-block">
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
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="24">
                    <div class="info-block__text">Destimated value excluding VAT</div>
                    <div class="info-block__value">
                      {{ gd(lot, _ => _.value.amount) }} {{ gd(lot, _ => _.value.currency) }}
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
                      Start: {{ fd(gd(lot, _ => _.contractPeriod.startDate), "DD/MM/YYYY") }} /
                      End: {{ fd(gd(lot, _ => _.contractPeriod.endDate), "DD/MM/YYYY") }}
                      <div>???This contract is not a subject to renewal</div>
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

              <div class="info-block" v-if="gd(evRecord, _ => _.tender.documents).filter(doc => gd(doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id), []).length">
                <el-row
                  v-for="(doc, index) of gd(evRecord, _ => _.tender.documents).filter(doc => gd(doc, _ => _.relatedLots[0], '') === gd(lot, _ => _.id), [])"
                  :key="doc.id + index"
                >
                  <el-col :sm="16">
                    <div class="info-block__documents">
                      <div class="info-block__value">
                        {{ convertCase(gd(doc, _ => _.documentType)) }} <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a></div>
                      <div class="info-block__text">
                        ID: {{ gd(doc, _ => _.id) }}
                      </div>
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">
                      Published: {{ fd(gd(doc, _ => _.datePublished)) }}
                    </div>
                    <div class="info-block__text">
                      Last modified: {{ fd(gd(doc, _ => _.datePublished)) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <!-- Legal, economic, financial and technical information -->
      <div>
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
                  ???Is a particular authorisation of a particular organisation needed in order to be able to perform the
                  service in question in the country of establishment of the economic operator?
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
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
          </div>

          <div class="info-block">
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
          </div>
        </div>

        <div class="info__sub-title">General terms of the contract</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="24">
                <div class="info-block__value">???Link to the document for current procurement category published on
                  MTender web portal
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="info__sub-title">Special conditions of the contract</div>
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
      </div>
      </div>

      <!-- Procedure -->
      <div>
        <div class="info__title">Procedure</div>
        <div class="info__sub-title">Description</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row>
              <el-col :sm="10">
                <div class="info-block__text">Type of procedure</div>
                <div class="info-block__value">
                  {{ gd(msRecord, _ => _.tender.procurementMethodDetails) }}
                </div>
              </el-col>
              <el-col :sm="14">
                <div class="info-block__text">Accelerated procedure</div>
                <div class="info-block__value">???Justification:</div>
              </el-col>
            </el-row>
          </div>

          <div class="info-block">
            <el-row>
              <el-col :sm="10">
                <div class="info-block__text">Information about electronic auction</div>
                <div class="info-block__value">
                  ???An electronic auction will (or will not) be used
                </div>
              </el-col>
              <el-col :sm="14">
                <div class="info-block__text">Additional information about electronic auction</div>
                <div class="info-block__value">???Start date: 20/09/2018, 14:30, number of rounds: 3, mode: multiple
                  round
                </div>
              </el-col>
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
                Procurement plan / Buyer’s profile / PN: No
                <a
                  :href="`/plans/${gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === 'planning')), _ => _.identifier)}`"
                  target="_blank">
                  {{ gd(gd(msRecord, _ => _.relatedProcesses, []).find(procces => procces.relationship.some(relationship => relationship === "planning")), _ => _.identifier) }}
                </a>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">Time limit for receipt of tenders or requests to participate</div>
              <div class="info-block__value">
                ???Date: (dd/mm/yyyy) Local time: (hh:mm)
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">Estimated date of dispatch of invitations to tender or to participate to
                selected candidates
              </div>
              <div class="info-block__value">
                ???Date: (dd/mm/yyyy)
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">Languages in which tenders or requests to participate may be submitted</div>
              <div class="info-block__value">
                ???Romanian, Russian
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">Conditions for opening of tenders</div>
              <div class="info-block__value">
                ???Date: (dd/mm/yyyy) Local time: (hh:mm)
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row>
            <el-col :sm="24">
              <div class="info-block__text">
                For electronic tendering procedures upon expiry of submission deadlines, MTender shall disclose received
                tender forms or requests to participate online on the MTender web portal and generate an electronic
                document with a record of opening.
              </div>
              <div class="info-block__text">
                For non-electronic procedures: negotiated with publication of contract notice, competitive dialogue,
                design contest and innovative partnership
              </div>
            </el-col>
            <el-col :sm="16">
              <div class="info-block__text"> Information about authorised persons and opening procedure</div>
              <div class="info-block__value">
                ???Full name of the persone
              </div>
            </el-col>
            <el-col :sm="8">
              <div class="info-block__text">
                ???Place
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
          <li>The amount and currency of the bid guarantee is - % of estimated value MDL and must be valid 90 days
            starting from opening of the tenders.
          </li>
          <li>Failure of the selected Economic Operator to submit the contract performance guarantee, if applicable, or to
            sign the contract shall constitute sufficient grounds for the annulment of the award of the contract and
            forfeiture of the bid guarantee.
          </li>
          <li>???+Free text from CA</li>
        </ul>

        <div class="info__sub-title">Procedure documents</div>
        <div class="info-blocks">
          <div class="info-block">
            <el-row
              v-for="(doc, index) of gd(evRecord, _ => _.tender.documents).filter(doc => !doc.hasOwnProperty('relatedLots'), [])"
              :key="doc.id + index"
            >
              <el-col :sm="16">
                <div class="info-block__documents">
                  <div class="info-block__value">
                    {{ convertCase(gd(doc, _ => _.documentType) ) }} <a :href="gd(doc, _ => _.url)">{{ gd(doc, _ => _.title) }}</a>
                  </div>
                  <div class="info-block__text">
                    ID: {{ gd(doc, _ => _.id) }}
                  </div>
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">
                  Published: {{ fd(gd(doc, _ => _.datePublished)) }}
                </div>
                <div class="info-block__text">
                  Last modified: {{ fd(gd(doc, _ => _.datePublished)) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

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
        <p>
          The Economic Operator which has an interest in being awarded a public procurement contract and wishes to submit a complaint to the National Complaint Settlement Agency shall follow the procedures contained in Article 79-80 of the Law. Interim measures and suspention of the procedure may be requested.
        </p>
        <ol>
        <li>
          The Economic Operator may submit a complaint within:
          <ol>
            <li>
              10 days, starting with the day following the acknowledgment, subject to the conditions of the Law, of a deed of the contracting authority deemed illegal, in case the value of the contract to be awarded, estimated pursuant to the provisions of Art. 3, is equal to or higher than the value thresholds set out under Art. 2 para.(3) of the Law;
            </li>
            <li>
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

      <!-- Budget -->
      <div>
        <div class="info__title">Budget</div>
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

        <div class="info__sub-title">Budget breakdown</div>
        <el-collapse accordion :value="gd(msRecord, _ => _.planning.budget.budgetBreakdown[0].id, '0') + '0'">
          <el-collapse-item
            v-for="(budgetBreakdown, index) of gd(msRecord, _ => _.planning.budget.budgetBreakdown, [])"
            :key="budgetBreakdown.id + index"
            :name="budgetBreakdown.id + index"
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
                      {{ gd(budgetBreakdown, _ => _.amount.amount) }}
                      {{ gd(budgetBreakdown, _ => _.amount.currency) }}
                    </div>
                  </el-col>
                  <el-col :sm="4">
                    <div class="info-block__text">Status</div>
                    <div class="info-block__value">
                      ???Verified
                    </div>
                  </el-col>
                </el-row>
              </div>
            </template>

            <div class="info-blocks">
              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Budget details or rationale</div>
                    <div class="info-block__value">???45330000-9 Lucrări de instalaţii de apă</div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">Validity Period</div>
                    <div class="info-block__value">
                      Start date: {{ fd(gd(budgetBreakdown, _ => _.period.startDate), "DD/MM/YYYY") }} -
                      End date: {{ fd(gd(budgetBreakdown, _ => _.period.endDate), "DD/MM/YYYY") }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Budget Project</div>
                    <div class="info-block__value">
                      {{ gd(budgetBreakdown, _ => _.description, "n/a") }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">Project ID</div>
                    <div class="info-block__value">
                      ???MD-768762875482167
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Budget owner</div>
                    <div class="info-block__value">???Primaria Tintareni, rl. Anenii Noi</div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">National registration number</div>
                    <div class="info-block__value">???MD-IDNO: 1007601009037</div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Payer Entity</div>
                    <div class="info-block__value">???Primaria Tintareni, rl. Anenii Noi</div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">National registration number</div>
                    <div class="info-block__value">???MD-IDNO: 1007601009037</div>
                  </el-col>
                </el-row>
              </div>

              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__text">Funding Entity</div>
                    <div class="info-block__value">???Primaria Tintareni, rl. Anenii Noi</div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__text">National registration number</div>
                    <div class="info-block__value">???MD-IDNO: 1007601009037</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>

        <div class="info__sub-title">Date of dispatch of this notice: ???(dd/mm/yyyy)</div>
      </div>
    </div>
  </div>
</template>

<script>
  import typesOfBuyers from "./../../../../store/types/buyers-types";
  import mainGeneralActivites from "./../../../../store/types/main-general-activity-types";

  import { getDataFromObject, formatDate, convertCamelCaseToTitleCase} from "./../../../../utils";

  export default {
    name: "ContractNotice",
    props: {
      msRecord: {
        type: Object,
        required: true
      },
      evRecord: {
        type: Object
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
            href: "https://ebs-integrator.com/",
            src: "/img/ebs-integrator.png",
            name: "ebs-integrator"
          },
          {
            href: "http://lonar-it.com/",
            src: "/img/lonar.png",
            name: "lonar"
          }
        ]
      };
    },
    created() {
      console.log("MS", this.msRecord);
      console.log("EV", this.evRecord);
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../../styles/variables";

  .info {
    &__title {
      margin: 35px 0 30px;
      padding-bottom: 25px;
      border-bottom: 1px solid #d9d9d9;
      line-height: 1;
      font-size: 30px;
      font-weight: 700;
      color: $mainC;
    }

    &__sub-title {
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 700;
    }

    &-block {
      padding: 10px 0 5px;
      &:not(:last-child) {
        border-bottom: 1px solid #d9d9d9;
      }
      &__text {
        font-size: 13px;
        color: #525252;
      }
      &__value {
        line-height: 2;
        font-size: 15px;
        color: #000;
        &_name:first-letter {
          text-transform: uppercase;
        }
        &-platform {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 20px;
        }
        a {
          text-decoration: underline;
          &:hover {
            text-decoration: none;
          }
        }
        img {
          max-width: 150px;
        }
      }
      &__documents {
        padding-left: 41px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAjCAYAAACKPxqrAAABl0lEQVRIS+2X3VXCQBCF72wD2oF0oFYgdmAHMpsCLEHowAayCxVoCdABdgAdUAHjmZwkJ8FN2ITk6AP7ms18udk7P0ve+wcR+QQwwQBLRDhJkuVpKHLO7QDcAdhcyNEP1TggomdmXlfjKUgUYq2dXgJK03RORO95jEMO2xYxxwCtALwCqMEGB6mS4/E4ISKfwx6ZeTcKSM/HOfcB4A3AVuGDgxrOeTsYyHs/FZEvADch2GCgJsc659TmT9GgNE1nRKRuKpeIrELJWd3TB1TNkyyWiCySJJm35d8VhJMSc/11zfb23t+KyH1ZfYlmIjKrlX6ipYiUvYeIvpn50NnezjkNUsudFiuvrLW1D9G90faOhAUhnUD55jZljZDOoBZYK6QXKAA7C+kNqsAQOviQUaLNcMnAclaRtgRjTDY6MfMiBqYlyhiTTVTVUatVUfFQAdZaigHlY9uv1vH/QDFqTrpurRlGKxoVpGboO/QbY9bRZuiqYtCZoS/8TxK2uB/V7jN9FQTe0+vQnvIbn46yWSUYYe2J6OUHjjTEmmNtDa4AAAAASUVORK5CYII=);
        background-position: left;
        background-repeat: no-repeat;
      }
    }

    ul,
    ol {
      margin-bottom: 10px;
      li {
        margin-bottom: 8px;
        font-size: 14px;
        color: #4c4c4c;
      }
    }

    ul {
      & > li {
        &:before {
          content: "■";
          color: $mainC;
          padding-right: 10px;
        }
      }
    }

    ol {
      li {
        list-style-position: inside;
      }
      & > li {
        list-style-type: decimal;
      }

      ol {
        padding-left: 15px;
        & > li {
          list-style-type: lower-latin;
        }
      }
    }

    p {
      margin-bottom: 15px;
      font-size: 14px;
      color: #4c4c4c;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .entity-nav {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;
    font-size: 15px;
    color: #727272;
    a {
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        color: $mainC;
      }
      &.active {
        color: $mainC;
      }
    }
  }

</style>
