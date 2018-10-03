<template>
  <el-container>
    <tender-card
      :entity="{}"
    />
  </el-container>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_TENDER } from "./../../store/types/actions-types";
  
  import { Container } from "element-ui";
  
  import TenderCard from "./../ListCards/TenderCard";
  
  export default {
    name: "TenderPage",
    components: {
      "el-container": Container,
      "tender-card": TenderCard
    },
    data() {
      return {
        cdb: "",
        entity: {}
      }
    },
    created() {
      if (/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/.test(this.$route.params.id)) {
        this.cdb = "mtender2";
        this.$store.dispatch(FETCH_TENDER, {
          cdb: "mtender2",
          id: this.$route.params.id
        })
      } else {
        this.cdb = "mtender1";
        this.$store.dispatch(FETCH_TENDER, {
          cdb: "mtender1",
          id: this.$route.params.id
        })
      }
    },
    computed: {
      ...mapState({
        tender: state => state.entities.tenders.entity
      })
    }
  };
</script>

<style scoped>

</style>
