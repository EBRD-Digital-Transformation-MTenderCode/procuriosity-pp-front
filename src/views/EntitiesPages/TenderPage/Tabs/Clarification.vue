<template>
  <div>
    <div class="entity-nav" v-scroll-spy-active="{selector: 'a', class: 'active'}" v-scroll-spy-link>
      <a>Clarification</a>
    </div>
    <div class="info" v-scroll-spy="{offset: 75}">
      <div>
        <div class="info__title">Clarifications</div>
        <div v-if="evRecord.tender.hasOwnProperty('enquiries')">
          <div class="info-blocks info-blocks__questions"
               v-for="(question, index) of gd(evRecord, _ => _.tender.enquiries, [])"
               :key="question.id + index"
               :name="question.id + index"
          >
            <div class="info-block">
              <el-row>
                <el-col :sm="16">
                  <div class="info-block__text">
                    Title
                  </div>
                  <div class="info-block__value">
                    {{ gd(question, _ => _.title) }}
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div class="info-block__text">
                    Question received
                  </div>
                  <div class="info-block__value">
                    {{ fd(gd(question, _ => _.date)) }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="info-block">
              <el-row>
                <el-col :sm="24">
                  <div class="info-block__text">
                    Description
                  </div>
                  <div class="info-block__value">
                    {{ gd(question, _ => _.description) }}
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="info-block__answer"
                 v-if="question.hasOwnProperty('answer')">
              <div class="info-block">
                <el-row>
                  <el-col :sm="16">
                    <div class="info-block__value">
                      <span class="arrow">⮡</span> {{ gd(question, _ => _.title) }}
                    </div>
                  </el-col>
                  <el-col :sm="8">
                    <div class="info-block__value">
                      {{ fd(gd(question, _ => _.dateAnswered)) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="info-block">
                <el-row>
                  <el-col :sm="24">
                    <div class="info-block__value info-block__value__italic">
                      {{ gd(question, _ => _.answer) }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div v-else>NO DATA</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDataFromObject, formatDate } from "./../../../../utils";

  export default {
    name: "Clarification",
    props: {
      evRecord: {
        type: Object
      }
    },
    methods: {
      gd(...args) {
        return getDataFromObject(...args);
      },
      fd(...ars) {
        return formatDate(...ars);
      },
    }
  };
</script>

<style scoped>

</style>
