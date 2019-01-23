<template>
  <div class="page-number__text">
    {{ $t("page") }} {{currentPage}} {{ $t("of") }} {{Math.ceil(elementsAmount / pageSize)}} {{ $t("pages") }}
  </div>
</template>

<script>
  export default {
    name: "PageNumber",
    props: {
      elementsAmount: {
        type: Number,
        required: true
      },
      pageSize:{
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    }
  };
</script>

<style scoped>
  .page-number__text{
    text-align: center;
    margin-bottom: 10px;
    color: #225aa5;
  }
</style>
