<template>
  <div>
    <div
      class="entity-nav"
      data-scroll-spy-id="clarification"
      v-scroll-spy-active="{ selector: 'a', class: 'active' }"
      v-scroll-spy-link
    >
      <a>{{ $t("tender.clarification") }}</a>
      <a>{{ $t("tender.modification_documents") }}</a>
    </div>
    <div class="info" data-scroll-spy-id="clarification" v-scroll-spy="{ offset: 75, allowNoActive: true }">
      <div>
        <div class="info__title">{{ $t("tender.clarification") }}</div>
        <div v-if="evRecord.tender.hasOwnProperty('enquiries')">
          <div
            class="info-blocks info-blocks__questions"
            v-for="(question, index) of gd(evRecord, _ => _.tender.enquiries, [])"
            :key="question.id + index"
            :name="question.id + index"
          >
            <div class="info-block">
              <el-row :gutter="25">
                <el-col :sm="16">
                  <div class="info-block__text">{{ $t("tender.title") }}</div>
                  <div class="info-block__value">{{ transformSS(gd(question, _ => _.title)) }}</div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">{{ $t("tender.question_received") }}</div>
                  <div class="info-block__value">{{ fd(gd(question, _ => _.date)) }}</div>
                </el-col>
              </el-row>
            </div>
            <div class="info-block">
              <el-row :gutter="15">
                <el-col :sm="24">
                  <div class="info-block__text">{{ $t("tender.description") }}</div>
                  <div class="info-block__value">
                    <div class="info-block__value__pre">{{ transformSS(gd(question, _ => _.description)) }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="info-block__answer" v-if="question.hasOwnProperty('answer')">
              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="16">
                    <div class="info-block__value info-block__value_answer">
                      {{ transformSS(gd(question, _ => _.title)) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__value">{{ fd(gd(question, _ => _.dateAnswered)) }}</div>
                  </el-col>
                </el-row>
              </div>
              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__value info-block__value_italic">
                      <div class="info-block__value_pre">{{ transformSS(gd(question, _ => _.answer)) }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 30px;" v-else>{{ $t("tender.no_data") }}</div>
      </div>

      <div>
        <div class="info__title">{{ $t("tender.modification_documents") }}</div>
        <div v-if="evRecord.tender.hasOwnProperty('amendments')">
          <div class="info-blocks">
            <div
              class="info-block"
              v-for="amendment of [...gd(evRecord, _ => _.tender.amendments, [])].sort(
                (amendmentA, amendmentB) => +new Date(amendmentB.date) - +new Date(amendmentA.date)
              )"
              :key="amendment.id"
            >
              <el-row :gutter="25">
                <el-col :sm="16">
                  <div class="info-block__text">{{ $t("tender.amended_release") }}</div>
                  <div class="info-block__value">{{ amendment.amendsReleaseID.toUpperCase() }}</div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">{{ $t("tender.date_of_change") }}</div>
                  <div class="info-block__value">{{ fd(amendment.date) }}</div>
                </el-col>
              </el-row>
              <el-row :gutter="25">
                <el-col :xs="24">
                  <div class="info-block__text">{{ $t("tender.description_of_changes") }}</div>
                  <div class="info-block__value">{{ amendment.description || $t("n/a") }}</div>
                </el-col>
              </el-row>
              <el-row :gutter="25">
                <el-col :xs="24">
                  <div class="info-block__text">{{ $t("tender.rationale_of_changes") }}</div>
                  <div class="info-block__value">{{ amendment.rationale || $t("n/a") }}</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 30px;" v-else>{{ $t("tender.no_data") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataFromObject, formatDate, transformSpecialSymbols } from "../../../../../utils";

export default {
  name: "Clarification",
  props: {
    evRecord: {
      type: Object,
    },
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(...ars) {
      return formatDate(...ars);
    },
    transformSS(str) {
      return transformSpecialSymbols(str);
    },
  },
};
</script>
