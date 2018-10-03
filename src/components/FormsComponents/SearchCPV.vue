<template>
  <div>
    <label>
      <slot></slot>
    </label>
    <el-tag
        :key="value"
        v-for="value of values"
        closable
        hit
        disable-transitions
        @close="handleClose(value)"
        :text="value"
    >
      {{ value }}
    </el-tag>
    <el-button
        size="small"
        @click="modalVisible = true"
    >
      + Add CPV code for search
    </el-button>
    
    <el-dialog
        title="Select CPV codes"
        top="0"
        lock-scroll
        custom-class="cpv-modal"
        close-on-click-modal
        close-on-press-escape
        append-to-body
        :visible="modalVisible"
        @open="loadFirstLevel"
        @close="modalVisible = false"
    >
      <el-tree
          :data="cpvCodes"
          :props="cpvTreeProps"
          :load="loadNewLevel"
          @check-change="selectCode"
          node-key="code"
          :default-checked-keys="values"
          lazy
          check-strictly
          show-checkbox
          empty-text="No data("
      />
      <template slot="footer">
        Selected codes:
        <el-tag
            :key="value"
            v-for="value of values"
        >
          {{value}}
        </el-tag>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import { getMDMDirectoryConfig } from "./../../configs/requests-configs";
  import { CPV_CODES } from "./../../store/types/directories-types";

  import { Tag, Input, Button, Dialog, Tree } from "element-ui";

  export default {
    name: "SearchCPV",
    components: {
      "el-tag": Tag,
      "el-input": Input,
      "el-button": Button,
      "el-dialog": Dialog,
      "el-tree": Tree
    },
    props: {
      name: {
        type: String,
        required: true
      },
      directory: {
        type: String
      },
      values: {
        type: Array,
        required: true
      },
      setValues: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        modalVisible: false,
        cpvTreeProps: {
          label: data => `${data.code} - ${data.name}`
        },
        cpvCodes: []
      };
    },
    methods: {
      handleClose(tag) {
        this.setValues(this.name, this.values.filter(it => it !== tag))
      },
      async loadFirstLevel() {
        const res = await axios(getMDMDirectoryConfig(CPV_CODES, `?lang=${this.$i18n.locale}`));
        this.cpvCodes = res.data.data.items;
      },
      async loadNewLevel(node, resolve) {
        if (node.data.code) {
          const res = await axios(getMDMDirectoryConfig(CPV_CODES, `?lang=${this.$i18n.locale}&code=${node.data.code}`));
          resolve(res.data.data.items);
        }
      },
      selectCode(data) {
        if (this.values.includes(data.code)) {
          this.setValues(this.name, this.values.filter(it => it !== data.code));
        } else {
          this.setValues(this.name, [...this.values, data.code]);
        }
      }
    }
  };
</script>

<style lang="scss">
  .el-tag + .el-tag,
  .el-tag + button{
    margin-left: 10px;
  }

  .el-dialog__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .el-dialog__header {
    z-index: 10;
    border-bottom: 1px solid #ececec;
    box-shadow: 0 2px 3px #ece9e9
  }
  
  .el-dialog__footer {
    z-index: 10;
    border-top: 1px solid #ececec;
    box-shadow: 0 -2px 3px #ece9e9
  }

  .cpv-modal {
    display: flex;
    flex-direction: column;
    width: 75% !important;
    margin: 50px 0 50px !important;
    max-height: 90vh;
    .el-dialog__body {
      max-height: 100%;
      overflow-y: auto;
    }
  }
</style>
