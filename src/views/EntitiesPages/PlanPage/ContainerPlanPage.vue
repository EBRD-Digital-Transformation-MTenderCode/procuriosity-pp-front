<template>
  <component :is="component" />
</template>

<script>
import PlanPage from "./PlanPage";
import PlanPageOld from "./PlanPage_old";

export default {
  name: "ContainerPlanPage",
  components: {
    "plan-page": PlanPage,
    "plan-page-old": PlanPageOld,
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
      this.component = "plan-page-old";
    } else if (regexMtender2Id.test(this.$route.params.id)) {
      this.component = "plan-page";
    }
  },
};
</script>
