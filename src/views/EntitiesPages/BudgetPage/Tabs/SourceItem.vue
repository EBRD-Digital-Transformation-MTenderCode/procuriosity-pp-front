<template>
  <el-collapse-item
      :name="item.ocid + index"
  >
    <template slot="title">

      <div class="info-blocks accordion-header">
        <div class="info-block">
          <el-row :gutter="15">
            <el-col :sm="2">
              <div class="info-block__text info-block__text_bold">
                {{index+1}}
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                2
              </div>
            </el-col>
            <el-col :sm="6">
              <div class="info-block__text info-block__text_bold">
                3
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                4
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                5
              </div>
            </el-col>
            <el-col :sm="4">
              <div class="info-block__text info-block__text_bold">
                6
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>

    <transition name="fade" mode="out-in" appear>

      <div class="info-blocks">
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              EU Funded
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              3-4
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              5
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              6
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              Project
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              3-4
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              5
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              6
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              Details
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              3-4
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              5
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              6
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              Payer Entity
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              3-4
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              5
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              6
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              Funding Entity
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              3-4
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              5
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              6
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :sm="2">
            <div class="info-block__text">
              &nbsp;
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              Budget Description
            </div>
          </el-col>
          <el-col :sm="10">
            <div class="info-block__text">
              3-4
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              5
            </div>
          </el-col>
          <el-col :sm="4">
            <div class="info-block__text">
              6
            </div>
          </el-col>
        </el-row>
      </div>

    </transition>
  </el-collapse-item>
</template>

<script>
  import {
    getDataFromObject,
    formatDate,
    formatAmount
  } from "./../../../../utils";

  export default {
    name: "SourceItem",
    props: {
      FS: {
        type: Array,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      activeItemId: {
        type: String,
        required: true
      }
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
      }
    }
  };
</script>
