<template>
  <el-dialog
      :visible.sync="open"
      append-to-body
      title="Documents"
      width="75%"
  >
    <slot>
      <div class="info__text" v-for="document of documents" :key="document.id">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="10">
            <div class="info-document_name">
              <div>
                <a :href="document.url" :title="document.name">{{ document.name }}</a>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="14">
            <div class="info-document_date-published">Published on {{ document.datePublished }}</div>
            <div class="info-document_id">ID: {{ document.id }}</div>
          </el-col>
        </el-row>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
  import { Dialog, Row, Col } from "element-ui";

  export default {
    name: "DocumentsModal",
    components: {
      "el-dialog": Dialog,
      "el-row": Row,
      "el-col": Col
    },
    props: {
      open: {
        type: Boolean,
        required: true,
        default: false
      },
      documents: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>
