<template>
  <el-dialog :visible.sync="show" append-to-body :title="$t('tender.information_of_the_decision')" width="75%">
    <slot>
      <div class="info-blocks">
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="24">
              <div class="info-block__text">{{ $t("tender.award_date") }}:</div>
              <div class="info-block__value">
                {{ fd(gd(award, _ => _.date)) }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="24">
              <div class="info-block__text">{{ $t("tender.award_description") }}:</div>
              <div class="info-block__value">
                {{ gd(award, _ => _.description, $t("n/a")) }}
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="info__sub-title">{{ $t("tender.documents_of_decision") }}</div>
        <documents-item :documents="getDocs(award)" :noItemsText="$t('tender.no_documents')" :cdbType="cdbType" />
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import { getDataFromObject, formatDate, parseDocumentType } from "./../../../utils";
import DocumentsItem from "./DocumentsItem";

export default {
  name: "AwardInfoModal",
  props: {
    award: {
      type: Object,
      required: true,
    },
    cdbType: {
      type: String,
      required: true,
    },
  },
  components: {
    "documents-item": DocumentsItem,
  },
  data() {
    return {
      show: false,
    };
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
    getDocs(award) {
      return [
        {
          values: this.gd(award, _ => _.documents),
        },
      ];
    },
  },
};
</script>
