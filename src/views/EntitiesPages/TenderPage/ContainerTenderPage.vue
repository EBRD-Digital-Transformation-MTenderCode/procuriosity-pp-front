<template>
  <component
      :is="component"
  />
</template>

<script>
  import TenderPage from "./TenderPage";
  import TenderPageOld from "./TenderPage_old";

  export default {
    name: "ContainerTenderPage",
    components: {
      "tender-page": TenderPage,
      "tender-page-old": TenderPageOld
    },
    data() {
      return {
        component: ""
      };
    },
    created() {
      const regexMtender1Id = /^MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]$/;
      const regexMtender2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;

      if (regexMtender1Id.test(this.$route.params.id)) {
        this.component = "tender-page-old";
      } else if (regexMtender2Id.test(this.$route.params.id)) {
        this.component = "tender-page";
      }
    }
  };
</script>
