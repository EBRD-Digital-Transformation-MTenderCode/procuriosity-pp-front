<template>
  <div class="info-blocks">
    <div class="info-block">
      <el-row :gutter="15">
        <el-col :sm="16">
          <div class="info-block__value">
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
            {{ $t("tender.end") }}: {{ fd(gd(item, _ => _.deliveryDate.endDate), "DD.MM.YYYY") }}
            <div>{{ $t("tender.is_not_renewal") }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDataFromObject, formatDate } from "../../../../../utils";

export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(...ars) {
      return formatDate(...ars);
    },
  },
};
</script>
