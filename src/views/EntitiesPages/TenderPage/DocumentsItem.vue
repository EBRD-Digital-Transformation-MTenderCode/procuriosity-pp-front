<template>
  <div class="info-blocks">
    <div v-if="documents.find(obj => obj.values.length)">
      <div v-for="documentObj of documents" v-if="documentObj.values.length" class="info-block">
        <div>
          <h1 v-if="documentObj.title" style="margin-bottom: 20px; margin-top: 10px">
            {{ documentObj.title }}
          </h1>
          <div
            class="info-block__documents"
            v-for="(doc, index) of getDocs(gd(documentObj, _ => _.values, []))"
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
                    {{ $t("tender.published") }}: {{ fd(datePublished || gd(doc, _ => _.datePublished)) }}
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
                    {{ $t("tender.published") }}: {{ fd(datePublished || gd(oldDoc, _ => _.datePublished)) }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>{{ noItemsText }}</div>
  </div>
</template>

<script>
import {
  getDataFromObject,
  formatDate,
  parseDocumentType,
  transformDocumentation,
  transformDocumentationFromCDB1,
} from "./../../../utils";
import { MTENDER1, MTENDER2 } from "../../../store/types/cbd-types";

export default {
  name: "DocumentsItem",
  props: {
    documents: {
      type: Array,
      required: true,
    },
    datePublished: {
      type: String,
      required: false,
    },
    noItemsText: {
      type: String,
    },
    cdbType: {
      type: String,
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
    parseDocType(type) {
      return parseDocumentType(type, this.$i18n.locale);
    },
    getDocs(docs) {
      if (this.cdbType === MTENDER1) {
        return docs ? transformDocumentationFromCDB1(docs) : [];
      } else if (this.cdbType === MTENDER2) {
        return docs ? transformDocumentation(docs) : [];
      } else return [];
    },
  },
};
</script>
