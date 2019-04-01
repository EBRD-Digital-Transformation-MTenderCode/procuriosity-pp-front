<template>
  <component :is="component" />
</template>

<script>
import PlanPageCDB1 from "./CDB1/PlanPageCDB1";
import PlanPageCDB2 from "./CDB2/PlanPageCDB2";
import Error from "./../../Error";

export default {
  name: "ContainerPlanPage",
  components: {
    "plan-page-cdb1": PlanPageCDB1,
    "plan-page-cdb2": PlanPageCDB2,
    error: Error,
  },
  data() {
    return {
      component: "",
    };
  },
  created() {
    const regexMtender1Id = /^MD-P-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]$/;
    const regexMtender2Id = /^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/;

    if (regexMtender1Id.test(this.$route.params.id)) {
      this.component = "plan-page-cdb1";
    } else if (regexMtender2Id.test(this.$route.params.id)) {
      this.component = "plan-page-cdb2";
    } else {
      this.component = "error";
    }
  },
};
</script>
