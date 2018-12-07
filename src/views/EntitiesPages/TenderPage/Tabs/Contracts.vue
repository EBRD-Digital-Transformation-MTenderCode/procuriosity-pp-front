<template>
  <div class="info">
    <div class="info__title">{{ $t("tender.contract_award_notices") }}</div>
    <el-collapse accordion @change="changeActiveItem">
      <el-collapse-item
          v-for="(contract, index) of gd(evRecord, _ => _.contracts, [])"
          :key="contract.id + index"
          :name="contract.id + index"
      >
        <template slot="title">
          <div class="info-block accordion-header">
            <el-row :gutter="15">
              <el-col :xs="24">
                <div class="info-block__value info-block__value__bold" style="font-size: 20px;">
                  {{ gd(gd(contract, _ => _.relatedProcesses, []).find(process => gd(process, _ => _.relationship,
                  []).some(relShip => relShip === "x_contracting")), _ => _.identifier, "none") }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :sm="16">
                <div class="info-block__text">{{ $t("tender.lot_title") }}</div>
                <div class="info-block__value">
                  {{ gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id === gd(gd(evRecord, _ => _.awards,
                  []).find(award => award.id === contract.awardId), _ => _.relatedLots[0])), _ => _.title) }}
                </div>
              </el-col>
              <el-col :sm="8">
                <div class="info-block__text">{{ $t("tender.lot_identifier") }}</div>
                <div class="info-block__value">
                  {{ gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id === gd(gd(evRecord, _ => _.awards,
                  []).find(award => award.id === contract.awardId), _ => _.relatedLots[0])), _ => _.id) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <transition name="fade" mode="out-in" appear>
          <div v-if="activeItemId === contract.id + index">
          <div class="info-blocks">
            <div class="info-block">
              <div class="info__sub-title">{{ $t("tender.award_of_contract") }}</div>
              <el-row :gutter="15">
                <el-col :sm="16">
                  <div class="info-block__text">
                    {{ $t("tender.way_of_awarded_contract") }}
                  </div>
                  <div class="info-block__value">
                    {{ $t("tender.not_been_awarded_group_of_eos") }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.date_of_conclusion") }}
                  </div>
                  <div class="info-block__value">
                    {{ fd(gd(contract, _ => _.date), "DD/MM/YYYY") }}
                  </div>
                </el-col>
              </el-row>

              <div class="info__sub-title">{{ $t("tender.info_about_tenders") }}</div>
              <el-row :gutter="15">
                <el-col :sm="12">
                  <div class="info-block__text">{{ $t("tender.number_of_tenders_received")}}:</div>
                </el-col>
                <el-col :sm="12">
                  <div class="info-block__text">
                    {{ gd(evRecord, _ => _.bids.details, []).filter(bid => gd(bid, _ => _.relatedLots[0]) ===
                    gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.id === contract.awardId), _ => _.relatedLots[0])), _ => _.id)).length }}
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="15">
                <el-col :sm="12">
                  <div class="info-block__text">{{ $t("tender.number_of_tenders_received_from_SMEs")}}:</div>
                </el-col>
                <el-col :sm="12">
                  <div class="info-block__text">
                    <!-- @TODO need add normal filter -->
                    0
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="15">
                <el-col :sm="12">
                  <div class="info-block__text">{{ $t("tender.number_of_tenders_received_from_residents")}}:</div>
                </el-col>
                <el-col :sm="12">
                  <div class="info-block__text">
                    {{ gd(evRecord, _ => _.bids.details, []).filter(bid => gd(bid, _ => _.relatedLots[0]) ===
                    gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.id === contract.awardId), _ => _.relatedLots[0])), _ => _.id)).length }}
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="15">
                <el-col :sm="12">
                  <div class="info-block__text">{{ $t("tender.number_of_tenders_received_from_non-residents")}}:</div>
                </el-col>
                <el-col :sm="12">
                  <div class="info-block__text">
                    {{ gd( evRecord, _=> _.bids.details).filter(bid => gd( evRecord, _=> _.parties).find(part => part.id
                    === bid.tenderers[0].id ).address.addressDetails.country.id !== "MD").length }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info__sub-title">{{ $t("tender.name_and_address_contractor") }}</div>
          <div class="info-blocks">
            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="16">
                  <div class="info-block__text">
                    {{ $t("tender.procuring_entity_full_name") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ => _.name) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.procuring_entity_identifier") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ => _.identifier.scheme)
                    }}:
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ => _.identifier.id) }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="24">
                  <div class="info-block__text">
                    {{ $t("tender.procuring_entity_address") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ =>
                    _.address.addressDetails.region.description) }},
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ =>
                    _.address.streetAddress) }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="6">
                  <div class="info-block__text">
                    {{ $t("tender.town") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ =>
                    _.address.addressDetails.locality.description) }}
                  </div>
                </el-col>
                <el-col :sm="4">
                  <div class="info-block__text">
                    {{ $t("tender.nuts_code") }}
                  </div>
                  <div class="info-block__value">
                    n/a
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__text">
                    {{ $t("tender.postal_code") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ => _.address.postalCode)
                    }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.country") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ =>
                    _.address.addressDetails.country.description) }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="10">
                  <div class="info-block__text">
                    {{ $t("tender.contact_persone") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ => _.contactPoint.name) }}
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__text">
                    {{ $t("tender.telephone") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                    []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ =>
                    _.contactPoint.telephone)
                    }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.email") }}
                  </div>
                  <div class="info-block__value">
                    <a
                        :href="`mailto:${ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards, []).find(award => award.status === 'active'), _ => _.suppliers[0].id)), _ => _.contactPoint.email) }`"
                    >
                      {{ gd(gd(evRecord, _ => _.parties, []).find(part => part.id === gd(gd(evRecord, _ => _.awards,
                      []).find(award => award.status === "active"), _ => _.suppliers[0].id)), _ => _.contactPoint.email)
                      }}
                    </a>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info__sub-title">{{ $t("tender.info_on_value") }}</div>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.initial_total_contract_value") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fa(gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id ===
                  gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id === gd(gd(evRecord, _ => _.awards,
                  []).find(award => award.id === contract.awardId), _ => _.relatedLots[0])), _ => _.id)), _ =>
                  _.value.amount)) }} MDL
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.total_contract_value") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fa(gd(gd(evRecord, _ => _.awards, []).find(award => award.id ===
                  contract.awardId), _ => _.value.amount)) }} MDL
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.lowest_offer") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fa(Math.min(...gd(gd(evRecord, _ => _.awards, []).filter(award =>
                  gd(award, _ => _.relatedLots[0]) === gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id ===
                  gd(gd(evRecord, _ => _.awards, []).find(award => award.id === contract.awardId), _ =>
                  _.relatedLots[0])), _ => _.id) && gd(award, _ => _.status) !== "pending").map(award =>
                  award.value.amount), _ => _, []))) }} MDL
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.highest_offer") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fa(Math.max(...gd(gd(evRecord, _ => _.awards, []).filter(award =>
                  gd(award, _ => _.relatedLots[0]) === gd(gd(evRecord, _ => _.tender.lots, []).find(lot => lot.id ===
                  gd(gd(evRecord, _ => _.awards, []).find(award => award.id === contract.awardId), _ =>
                  _.relatedLots[0])), _ => _.id) && gd(award, _ => _.status) !== "pending").map(award =>
                  award.value.amount), _ => _, []))) }} MDL
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        </transition>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import {
    getDataFromObject,
    formatDate,
    formatAmount
  } from "./../../../../utils";

  export default {
    name: "Contracts",
    props: {
      evRecord: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        activeItemId: ""
      };
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
      changeActiveItem(item) {
        this.activeItemId = item;
      }
    }
  };
</script>
