<template>
  <div>
    <div class="entity-nav" data-scroll-spy-id="clarification" v-scroll-spy-active="{selector: 'a', class: 'active'}" v-scroll-spy-link>
      <a>Clarification</a>
      <a disabled>Modifications of tender documents </a>
    </div>
    <div class="info" data-scroll-spy-id="clarification" v-scroll-spy="{offset: 75, allowNoActive: true}">
      <div>
        <div class="info__title">Clarifications</div>
        <div v-if="evRecord.tender.hasOwnProperty('enquiries')">
          <div class="info-blocks info-blocks__questions"
               v-for="(question, index) of gd(evRecord, _ => _.tender.enquiries, [])"
               :key="question.id + index"
               :name="question.id + index"
          >
            <div class="info-block">
              <el-row :gutter="25">
                <el-col :sm="16">
                  <div class="info-block__text">
                    Title
                  </div>
                  <div class="info-block__value">
                    {{ transformSS(gd(question, _ => _.title)) }}
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
              <el-row :gutter="15">
                <el-col :sm="24">
                  <div class="info-block__text">
                    Description
                  </div>
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
                    <div class="info-block__value">
                      {{ fd(gd(question, _ => _.dateAnswered)) }}
                    </div>
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
        <div v-else>No Clarifications</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDataFromObject, formatDate, transformSpecialSymbols } from "./../../../../utils";

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
      transformSS(str){
        return transformSpecialSymbols(str)
      }
    }
  };
</script>
