<template>
  <component :is="component" />
</template>

<script>
import MTender1Page from "./CDB1/MTender1Page";
import MTender2Page from "./CDB2/MTender2Page";
import Error from "./../../Error";

export default {
  name: "ContainerTenderPage",
  components: {
    "mtender1-page": MTender1Page,
    "mtender2-page": MTender2Page,
    error: Error,
  },
  data() {
    return {
      component: "",
    };
  },
  created() {
    const regexMtender1Id = /^MD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]$/;
    const regexMtender2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;

    if (regexMtender1Id.test(this.$route.params.id)) {
      this.component = "mtender1-page";
    } else if (regexMtender2Id.test(this.$route.params.id)) {
      this.component = "mtender2-page";
    } else {
      this.component = "error";
    }
  },
};
</script>
