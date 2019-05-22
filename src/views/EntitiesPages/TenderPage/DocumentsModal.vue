<template>
  <el-dialog :visible.sync="show" append-to-body :title="$t('tender.modal_documents')" width="75%">
    <slot>
      <div class="info-blocks">
        <div class="info-block" v-if="espdDocuments && espdDocuments.length">
          <h1 style="margin-bottom: 20px">ESPD documents</h1>
          <div
            class="info-block__documents"
            v-for="(espdDoc, index) of getDocs(gd(espdDocuments, _ => _, []))"
            :key="espdDoc.id + index"
          >
            <div class="info-block__document">
              <el-row :gutter="15">
                <el-col :sm="24">
                  <div class="info-block__value ">
                    {{ parseDocType(gd(espdDoc, _ => _.documentType)) }}
                    <a :href="gd(espdDoc, _ => _.url)">{{ gd(espdDoc, _ => _.title) }}</a>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="15">
                <el-col :sm="16">
                  <div class="info-block__text info-block__text_small">
                    {{ $t("tender.id") }}: {{ gd(espdDoc, _ => _.id) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text info-block__text_small">
                    {{ $t("tender.published") }}: {{ fd(gd(espdDoc, _ => _.datePublished)) }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <div
              v-for="(oldEspdDoc, index) of gd(espdDoc, _ => _.oldVersions, [])"
              :key="oldEspdDoc.id + index"
              class="info-block__document info-block__document_old"
            >
              <el-row :gutter="15">
                <el-col :sm="24">
                  <div class="info-block__value">
                    {{ parseDocType(gd(oldEspdDoc, _ => _.documentType)) }}
                    <a :href="gd(oldEspdDoc, _ => _.url)">{{ gd(oldEspdDoc, _ => _.title) }}</a>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="15">
                <el-col :sm="16" class="info-block__text_oldDoc">
                  <div class="info-block__text info-block__text_small">
                    {{ $t("tender.id") }}: {{ gd(oldEspdDoc, _ => _.id) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text info-block__text_small">
                    {{ $t("tender.published") }}: {{ fd(gd(oldEspdDoc, _ => _.datePublished)) }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
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
    espdDocuments: {
      type: Array,
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
