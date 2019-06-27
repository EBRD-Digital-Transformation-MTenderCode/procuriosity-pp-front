<template>
  <el-collapse-item :name="contract.id">
    <template slot="title">
      <div class="info-blocks accordion-header">
        <div class="info-block">
          <el-row :gutter="15">
            <el-col v-if="contract.title" :sm="16">
              <div class="info-block__text">{{ $t("tender.title") }}</div>
              <div class="info-block__value info-block__value__bold">{{ gd(contract, _ => _.title) }}</div>
            </el-col>
            <el-col :sm="contract.title ? 8 : 24">
              <div class="info-block__text">{{ $t("tender.contract_identifier") }}</div>
              <div class="info-block__value">{{ gd(contract, _ => _.contractID, "###") }}</div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row :gutter="15">
            <el-col v-if="contract.contractNumber" :sm="16">
              <div class="info-block__text">{{ $t("tender.contract_number") }}</div>
              <div class="info-block__value">{{ gd(contract, _ => _.contractNumber) }}</div>
            </el-col>
            <el-col :sm="contract.contractNumber ? 8 : 24">
              <div class="info-block__text">{{ $t("tender.contract_date") }}</div>
              <div class="info-block__value">{{ fd(gd(contract, _ => _.date, "###")) }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>

    <transition name="fade" mode="out-in" appear>
      <div>
        <div>
          <div class="info__sub-title">{{ $t("tender.name_and_address_contractor") }}</div>
          <div class="info-blocks">
            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="16">
                  <div class="info-block__text">{{ $t("tender.procuring_entity_full_name") }}</div>
                  <div class="info-block__value">
                    {{ gd(contract, _ => _.suppliers[0].identifier.legalName, "###") }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">{{ $t("tender.procuring_entity_identifier") }}</div>
                  <div class="info-block__value">{{ gd(contract, _ => _.suppliers[0].identifier.id, "###") }}</div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="24">
                  <div class="info-block__text">{{ $t("tender.procuring_entity_address") }}</div>
                  <div class="info-block__value">
                    {{ gd(contract, _ => _.suppliers[0].address.region, "###") }}
                    {{ gd(contract, _ => _.suppliers[0].address.streetAddress, "###") }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="6">
                  <div class="info-block__text">{{ $t("tender.town") }}</div>
                  <div class="info-block__value">
                    {{ gd(contract, _ => _.suppliers[0].address.locality, "###") }}
                  </div>
                </el-col>
                <el-col :sm="4">
                  <div class="info-block__text">{{ $t("tender.nuts_code") }}</div>
                  <div class="info-block__value">{{ $t("n/a") }}</div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__text">{{ $t("tender.postal_code") }}</div>
                  <div class="info-block__value">
                    {{ gd(contract, _ => _.suppliers[0].address.postalCode, "###") }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">{{ $t("tender.country") }}</div>
                  <div class="info-block__value">
                    {{ gd(contract, _ => _.suppliers[0].address.countryName, "###") }}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="10">
                  <div class="info-block__text">{{ $t("tender.contact_persone") }}</div>
                  <div class="info-block__value">
                    {{ gd(contract, _ => _.suppliers[0].contactPoint.name, "###") }}
                  </div>
                </el-col>
                <el-col :sm="6">
                  <div class="info-block__text">{{ $t("tender.telephone") }}</div>
                  <div class="info-block__value">
                    {{ gd(contract, _ => _.suppliers[0].contactPoint.telephone, $t("n/a")) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">{{ $t("tender.email") }}</div>
                  <div class="info-block__value">
                    <a :href="`mailto:${gd(contract, _ => _.suppliers[0].contactPoint.email, '###')}`">
                      {{ gd(contract, _ => _.suppliers[0].contactPoint.email, "###") }}
                    </a>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div>
          <div class="info__sub-title">{{ $t("tender.info_on_value") }}</div>

          <el-row :gutter="15">
            <el-col :sm="12">
              <div class="info-block__text">{{ $t("tender.total_contract_value") }}:</div>
            </el-col>
            <el-col :sm="12">
              <div class="info-block__text">
                {{ fa(gd(contract, _ => _.value.amount)) }} {{ gd(contract, _ => _.value.currency) }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="info-block">
          <div class="info__sub-title">{{ $t("tender.description_of_procurement") }}</div>
          <div v-for="item of gd(contract, _ => _.items, [])" :key="item.id">
            <item :item="item" />
          </div>
        </div>
        <div class="info-block" v-if="gd(contract, _ => _.documents, []).length">
          <documents-item :documents="getDocs" :cdbType="cdbType" />
        </div>
      </div>
    </transition>
  </el-collapse-item>
</template>

<script>
import { getDataFromObject, formatDate, formatAmount } from "../../../../../utils";
import Item from "./Item";
import DocumentsItem from "../../DocumentsItem";
import { MTENDER1 } from "../../../../../store/types/cbd-types";

export default {
  name: "ContractItem",
  props: {
    contract: {
      type: Object,
      required: true,
    },
  },
  components: {
    "documents-item": DocumentsItem,
    item: Item,
  },
  computed: {
    cdbType() {
      return MTENDER1;
    },
    getDocs() {
      return [{ values: this.gd(this.contract, _ => _.documents) }];
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
