<template>
  <div>
    <div class="info">
      <div class="info__title">{{ $t("tender.review") }}Review</div>
      <div>
        <div
          class="info-blocks info-blocks__questions"
          v-for="(complaint, index) of complaints"
          :key="complaint.id + index"
          :name="complaint.id + index"
        >
          <div class="info-block">
            <el-row :gutter="25">
              <el-col :sm="12">
                <div class="info-block__text">{{ $t("tender.controversial") }}</div>
                <div class="info-block__value">{{ transformSS(gd(complaint, _ => _.Contestatar)) }}</div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.entry_date") }}</div>
                <div class="info-block__value">{{ fd(gd(complaint, _ => _.DataIntrare)) }}</div>
              </el-col>
              <el-col :sm="6">
                <div class="info-block__text">{{ $t("tender.status") }}</div>
                <div class="info-block__value">{{ gd(complaint, _ => _.STATUS) }}</div>
              </el-col>
            </el-row>
          </div>
          <div class="info-block">
            <el-row :gutter="15">
              <el-col :sm="24">
                <div class="info-block__text">{{ $t("tender.objection_to_complaint") }}</div>
                <div class="info-block__value">
                  <div class="info-block__value__pre">
                    {{ transformSS(gd(complaint, _ => _["Obiectul Contestației"])) }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-for="(decision, index) of decisions" :key="decision.id + index">
            <div
              v-if="
                decision.NRContestatie.split(';').find(identifier => identifier.trim() === complaint['Nr de intrare'])
              "
              class="info-block__answer"
            >
              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="12">
                    <div class="info-block__value info-block__value_answer">
                      {{ gd(decision, _ => _.NrDecizie) }}
                    </div>
                  </el-col>
                  <el-col :sm="6">
                    <div class="info-block__value">{{ fd(gd(decision, _ => _.DataDecizie)) }}</div>
                  </el-col>
                  <el-col :sm="6">
                    <div class="info-block__value">{{ gd(decision, _ => _.StatutDecizie) }}</div>
                  </el-col>
                </el-row>
              </div>
              <div class="info-block">
                <el-row :gutter="15">
                  <el-col :sm="24">
                    <div class="info-block__value info-block__value_italic">
                      <div class="info-block__value_pre">{{ gd(decision, _ => _.ContinutulDeciziei) }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getComplaintsConfig, getDecisionsConfig } from "./../../../../configs/requests-configs";
import { getDataFromObject, formatDate, transformSpecialSymbols } from "./../../../../utils";

export default {
  name: "Review",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      complaints: [],
      decisions: [],
    };
  },
  created() {
    this.getComplaints(this.id);
    this.getDecisions(this.id);
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
    async getComplaints(id) {
      try {
        const res = await axios(getComplaintsConfig(id));
        this.complaints = res.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    async getDecisions(id) {
      try {
        const res = await axios(getDecisionsConfig(id));
        this.decisions = res.data.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
