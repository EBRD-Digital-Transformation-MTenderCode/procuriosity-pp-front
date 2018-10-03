<template>
  <search-input
    name="titlesOrDescriptions"
    :value="titlesOrDescriptions"
    :setValue="setFormParams"
  />
</template>

<script>
  import { mapState } from "vuex";
  import { SET_ENTITY_SEARCH_PARAMS } from "../../store/types/mutations-types";
  
  import SearchInput from "./../FormsComponents/SearchInput";

  export default {
    name: "BudgetsSearchForm",
    components: {
      "search-input": SearchInput
    },
    computed: {
      ...mapState({
        titlesOrDescriptions: state => state.entities.budgets.searchParams.titlesOrDescriptions
      })
    },
    methods: {
      setFormParams(name, value) {
        this.$store.commit(SET_ENTITY_SEARCH_PARAMS, {
          entity: "budgets",
          params: {
            [name]: value
          }
        })
      }
    }
  };
</script>

<style lang="scss">
  @import "search-form";
</style>
