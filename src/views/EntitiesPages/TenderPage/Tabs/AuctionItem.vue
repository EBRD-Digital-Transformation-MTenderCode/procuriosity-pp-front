<template>
  <el-collapse-item :name="auction.id">
    <template slot="title">
      <div class="info-blocks accordion-header">
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="24">
              <div class="info-block__value info-block__value__bold">
                {{ auction.lotTitle }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>

    <transition name="fade" mode="out-in" appear>
      <div>
        <div class="info-blocks">
          <div class="info__sub-title">{{ $t("tender.electronic_auction_modalities") }}</div>
          <div v-if="auction.auctionProgress.length">
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.auction_period") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fd(auction.auctionPeriod.startDate) }} - {{ fd(auction.auctionPeriod.endDate) }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.minimal_eligible_difference") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fa(auction.minimalStep.amount) }} {{ auction.minimalStep.currency }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.number_of_participants") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ auction.participants }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.number_of_rounds") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ auction.rounds }}
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.start_date") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fd(auction.auctionPeriod.startDate) }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.minimal_eligible_difference") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fa(auction.minimalStep.amount) }} {{ auction.minimalStep.currency }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="auction.auctionProgress.length">
          <div class="info__sub-title">
            {{ $t("tender.electronic_auction_progress") }}
          </div>

          <div class="info-blocks info-blocks_auction" v-for="progress of auction.auctionProgress">
            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="16">
                  <div class="info-block__text">
                    {{ $t("tender.number_of_round") }}
                  </div>
                  <div class="info-block__value">
                    {{ progress.round }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    {{ $t("tender.timeframe_of_round") }}
                  </div>
                  <div class="info-block__value">
                    {{ fd(progress.period.startDate) }} - {{ fd(progress.period.endDate) }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="12">
                  <div class="info-block__text">
                    {{ $t("tender.tenderer") }}
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__text">
                    {{ $t("tender.submitted_offer") }}
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__text">
                    {{ $t("tender.submission_date") }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div v-for="breakdown of progress.breakdowns" class="info-block">
              <el-row :gutter="15">
                <el-col :sm="12">
                  <div class="info-block__value">
                    {{ breakdown.tenderer.name }}
                  </div>
                  <div class="info-block__text">
                    {{ breakdown.tenderer.id }}
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__value">{{ fa(breakdown.value.amount) }}</div>
                  <div class="info-block__text">
                    {{ $t("tender.MDL_exluding_VAT") }}
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__value">
                    {{ fd(breakdown.dateMet, "DD/MM/YYYY") }}
                  </div>
                  <div class="info-block__text">
                    {{ fd(breakdown.dateMet, "HH:MM") }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div v-if="auction.results.length">
          <div class="info__sub-title">
            {{ $t("tender.electronic_auction_results") }}
          </div>
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ $t("tender.tenderer") }}
                </div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ $t("tender.final_offer") }}
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="info-blocks" v-for="result of auction.results">
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__value">
                  {{ result.tenderer.name }}
                </div>
                <div class="info-block__text">
                  {{ result.tenderer.id }}
                </div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__value">{{ fa(result.value.amount) }}</div>
                <div class="info-block__text">
                  {{ $t("tender.MDL_exluding_VAT") }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </transition>
  </el-collapse-item>
</template>

<script>
import { formatDate, formatAmount } from "./../../../../utils";

export default {
  name: "AuctionItem",
  props: {
    auction: {
      type: Object,
      required: true,
    },
    activeItemId: {
      type: String,
      required: true,
    },
  },
  methods: {
    fd(...ars) {
      return formatDate(...ars);
    },
    fa(amount) {
      return formatAmount(amount);
    },
  },
};
</script>
