<template>
  <component :is="component" />
</template>

<script>
import BudgetPage from "./BudgetPage";

export default {
  name: "ContainerBudgetPage",
  components: {
    "budget-page": BudgetPage,
  },
  data() {
    return {
      component: "budget-page",
    };
  },
};
</script>
