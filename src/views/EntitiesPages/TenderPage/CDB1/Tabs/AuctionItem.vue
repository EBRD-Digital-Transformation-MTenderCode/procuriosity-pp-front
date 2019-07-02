<template>
  <el-collapse-item :name="lot.id">
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
      </div>
    </template>

    <transition name="fade" mode="out-in" appear>
      <div>
        <el-row :gutter="15">
          <el-col :sm="16">
            <div class="info-block__text">
              {{ $t("tender.description") }}
            </div>
            <div class="info-block__value">{{ lot.description }}</div>
          </el-col>
          <el-col :sm="8">
            <div class="info-block__text">
              {{ $t("tender.status") }}
            </div>
            <div class="info-block__value">{{ mapStatus(lot.status) }}</div>
          </el-col>
        </el-row>
        <div v-if="lot.auctionPeriod.startDate" class="info-blocks">
          <div>
            <el-row :gutter="15">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.auction_period") }}:</div>
              </el-col>
              <el-col :sm="12">
                <div class="info-block__text">
                  {{ fd(lot.auctionPeriod.startDate) }} - {{ fd(lot.auctionPeriod.endDate) }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row :gutter="15">
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.minimal_eligible_difference") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__text">{{ fa(lot.minimalStep.amount) }} {{ lot.minimalStep.currency }}</div>
          </el-col>
        </el-row>
        <el-row v-if="lot.url" :gutter="15">
          <el-col :sm="12">
            <div class="info-block__text">{{ $t("tender.link_to_auction") }}:</div>
          </el-col>
          <el-col :sm="12">
            <div class="info-block__link">
              <a :href="lot.url" target="_blank">{{ $t("tender.go_to_auction") }}</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>
  </el-collapse-item>
</template>

<script>
import { formatDate, formatAmount, mapTenderStatus } from "../../../../../utils";

export default {
  name: "AuctionItem",
  props: {
    lot: {
      type: Object,
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
    mapStatus(status) {
      return mapTenderStatus(status);
    },
  },
};
</script>
