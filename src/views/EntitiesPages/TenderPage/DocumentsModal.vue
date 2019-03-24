<template>
  <el-dialog :visible.sync="show" append-to-body :title="$t('tender.modal_documents')" width="75%">
    <slot>
      <div class="info-blocks">
        <div class="info-block" v-if="documents.length">
          <div
            class="info-block__documents"
            v-for="(doc, index) of getDocs(gd(documents, _ => _, []))"
            :key="doc.id + index"
          >
            <div class="info-block__document">
              <el-row :gutter="15">
                <el-col :sm="24">
                  <div class="info-block__value ">
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
        <div v-else>{{ noItemsText }}</div>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import { getDataFromObject, formatDate, parseDocumentType, transformDocumentation } from "./../../../utils";

export default {
  name: "DocumentsModal",
  props: {
    documents: {
      type: Array,
      required: true,
    },
    noItemsText: {
      type: String,
    },
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
    getDocs(docs) {
      return transformDocumentation(docs);
    },
  },
};
</script>
