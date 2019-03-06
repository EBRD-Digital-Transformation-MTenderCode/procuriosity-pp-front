<template>
  <el-dialog :visible.sync="open" append-to-body title="Documents" width="75%">
    <slot>
      <div class="old-info__text" v-for="document of documents" :key="document.id">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="10">
            <div class="old-info-document_name">
              <div>
                <a :href="document.url" :title="document.name">{{ document.name }}</a>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="14">
            <div class="old-info-document_date-published">
              {{ $t("tender.documents_published") }}{{ document.datePublished }}
            </div>
            <div class="old-info-document_id">ID: {{ document.id }}</div>
          </el-col>
        </el-row>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
export default {
  name: "DocumentsModal",
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    documents: {
      type: Array,
      required: true,
    },
  },
};
</script>
