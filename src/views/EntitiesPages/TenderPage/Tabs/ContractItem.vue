<template>
  <el-collapse-item :name="lot.id + index">
    <template slot="title">
      <div class="info-blocks accordion-header">
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="16">
              <div class="info-block__text">
                {{ $t("tender.lot") }}
              </div>
              <div class="info-block__value info-block__value__bold">
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

        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="lot.status !== 'canceled' && lot.status !== 'unsuccessful' ? 16 : 24">
              <div class="info-block__text">
                {{
                  lot.status === "canceled" || lot.status === "unsuccessful"
                    ? $t("tender.lot_is_not_awarded")
                    : $t("tender.lot_is_awarded")
                }}
              </div>
              <div v-if="lot.status !== 'canceled' && lot.status !== 'unsuccessful'" class="info-block__value">
                {{
                  gd(
                    gd(contractForCurrentLot, _ => _.relatedProcesses, []).find(proc =>
                      gd(proc, _ => _.relationship, []).some(relationship => relationship === "x_contracting")
                    ),
                    _ => _.identifier
                  )
                }}
              </div>
              <div v-else>
                {{ lot.status === "canceled" ? $t("tender.lot_is_canceled") : $t("tender.no_tenderers_or_request") }}
              </div>
            </el-col>
            <el-col :sm="8" v-if="lot.status !== 'canceled' && lot.status !== 'unsuccessful'">
              <div class="info-block__text">
                {{ $t("tender.date_of_conclusion") }}
              </div>
              <div class="info-block__value">
                {{ fd(gd(contractForCurrentLot, _ => _.date), "DD/MM/YYYY") }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>

    <transition name="fade" mode="out-in" appear>
      <div v-if="activeItemId === lot.id + index && lot.status !== 'canceled'">
        <div class="info-blocks">
          <div class="info__sub-title">{{ $t("tender.info_about_tenders") }}</div>
          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.number_of_tenders_received") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">
                {{
                  gd(evRecord, _ => _.bids.details, []).filter(bid => gd(bid, _ => _.relatedLots[0]) === lot.id).length
                }}
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.number_of_tenders_received_from_SMEs") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">
                {{
                  gd(evRecord, _ => _.bids.details, [])
                    .filter(bid => gd(bid, _ => _.relatedLots[0]) === lot.id)
                    .filter(
                      bid =>
                        gd(evRecord, _ => _.parties).find(part => part.id === bid.tenderers[0].id).details.scale ===
                        "sme"
                    ).length
                }}
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.number_of_tenders_received_from_residents") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">
                {{
                  gd(evRecord, _ => _.bids.details, [])
                    .filter(bid => gd(bid, _ => _.relatedLots[0]) === lot.id)
                    .filter(
                      bid =>
                        gd(evRecord, _ => _.parties).find(part => part.id === bid.tenderers[0].id).address
                          .addressDetails.country.id === "MD"
                    ).length
                }}
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.number_of_tenders_received_from_non-residents") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">
                {{
                  gd(evRecord, _ => _.bids.details, [])
                    .filter(bid => gd(bid, _ => _.relatedLots[0]) === lot.id)
                    .filter(
                      bid =>
                        gd(evRecord, _ => _.parties).find(part => part.id === bid.tenderers[0].id).address
                          .addressDetails.country.id !== "MD"
                    ).length
                }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-if="lot.status !== 'canceled' && lot.status !== 'unsuccessful'">
          <div class="info__sub-title">{{ $t("tender.name_and_address_contractor") }}</div>
          <div class="info-blocks">
            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="16">
                  <div class="info-block__text">
                    {{ $t("tender.procuring_entity_full_name") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.name) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.procuring_entity_identifier") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.identifier.scheme) }}:
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.identifier.id) }}
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
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.address.addressDetails.region.description) }},
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.address.streetAddress) }}
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
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.address.addressDetails.locality.description) }}
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
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.address.postalCode) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.country") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.address.addressDetails.country.description) }}
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
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.contactPoint.name) }}
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__text">
                    {{ $t("tender.telephone") }}
                  </div>
                  <div class="info-block__value">
                    {{ gd(winnerOrganizationForCurrentLot, _ => _.contactPoint.telephone) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.email") }}
                  </div>
                  <div class="info-block__value">
                    <a :href="`mailto:${gd(winnerOrganizationForCurrentLot, _ => _.contactPoint.email)}`">
                      {{ gd(winnerOrganizationForCurrentLot, _ => _.contactPoint.email) }}
                    </a>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <div
          v-if="gd(evRecord, _ => _.bids.details, []).filter(bid => gd(bid, _ => _.relatedLots[0]) === lot.id).length"
        >
          <div class="info__sub-title">{{ $t("tender.info_on_value") }}</div>
          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.initial_total_contract_value") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">{{ fa(gd(lot, _ => _.value.amount)) }} MDL</div>
            </el-col>
          </el-row>

          <el-row v-if="lot.status !== 'canceled' && lot.status !== 'unsuccessful'" :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.total_contract_value") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">{{ fa(gd(winnerAwardForCurrentLot, _ => _.value.amount)) }} MDL</div>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.lowest_offer") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">
                {{
                  fa(
                    Math.min(
                      ...gd(
                        gd(evRecord, _ => _.awards, [])
                          .filter(
                            award =>
                              gd(award, _ => _.relatedLots[0]) === lot.id && gd(award, _ => _.status) !== "pending"
                          )
                          .map(award => gd(award, _ => _.value.amount, 0)),
                        _ => _,
                        []
                      )
                    )
                  )
                }}
                MDL
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.highest_offer") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">
                {{
                  fa(
                    Math.max(
                      ...gd(
                        gd(evRecord, _ => _.awards, [])
                          .filter(
                            award =>
                              gd(award, _ => _.relatedLots[0]) === lot.id && gd(award, _ => _.status) !== "pending"
                          )
                          .map(award => gd(award, _ => _.value.amount, 0)),
                        _ => _,
                        []
                      )
                    )
                  )
                }}
                MDL
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-if="lot.status !== 'canceled' && lot.status !== 'unsuccessful'">
          <div class="info__sub-title">{{ $t("tender.request_for_contract_performance_guarantee") }}</div>
          <div class="info-blocks">
            <div class="info-block">
              <div class="info-block__text">
                {{ $t("tender.complementary_information_list2_p4_1") }}
                {{ fa(gd(winnerAwardForCurrentLot, _ => _.value.amount) * 0.02) }}
                {{ $t("tender.complementary_information_list2_p4_2") }}
              </div>
              <div class="info-block__text">
                {{ $t("tender.complementary_information_list2_p5") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </el-collapse-item>
</template>

<script>
import { getDataFromObject, formatDate, formatAmount } from "./../../../../utils";

export default {
  name: "ContractItem",
  props: {
    evRecord: {
      type: Object,
      required: true,
    },
    lot: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    activeItemId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      successfulLot: false,
    };
  },
  created() {
    this.successfulLot = !!this.contractForCurrentLot;
  },
  computed: {
    contractForCurrentLot() {
      return this.gd(this.evRecord, _ => _.contracts, []).find(contract => {
        return contract.awardId === this.gd(this.winnerAwardForCurrentLot, _ => _.id);
      });
    },
    winnerAwardForCurrentLot() {
      return this.gd(this.evRecord, _ => _.awards, []).find(award => {
        return (
          award.relatedLots[0] === this.lot.id &&
          ((award.status === "pending" && award.statusDetails === "active") ||
            (award.status === "active" && award.statusDetails === "empty"))
        );
      });
    },
    winnerOrganizationForCurrentLot() {
      return this.gd(this.evRecord, _ => _.parties, []).find(
        part => part.id === this.gd(this.winnerAwardForCurrentLot, _ => _.suppliers[0].id)
      );
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
  },
};
</script>
