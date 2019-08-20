<template>
  <el-dialog :visible.sync="show" append-to-body :title="$t('tender.modal_documents')" width="75%">
    <slot>
      <documents-item
        :documents="documents"
        :noItemsText="noItemsText"
        :datePublished="datePublished"
        :cdbType="cdbType"
      />
    </slot>
  </el-dialog>
</template>

<script>
import DocumentsItem from "./DocumentsItem";

export default {
  name: "DocumentsModal",
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
  components: {
    "documents-item": DocumentsItem,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
