<template>
  <div>
    tender page
  </div>
</template>

<script>
  import axios from "axios";
  
  export default {
    name: "TenderPage",
    async created() {
      if (/^ocds-([a-z]|[0-9]){6}-[A-Z]{2,}-[0-9]{13}$/.test(this.$route.params.id)) {
        const res = await axios({
          method: "get",
          url: `http://public.eprocurement.systems/tenders/${this.$route.params.id}`
        });
        
        console.log(res);
      } else {
        const res = await axios({
          method: "get",
          url: `https://public.api.mepps.openprocurement.net/api/2.3/tenders/${this.$route.params.id}`
        });
        
        console.log(res);
      }
    }
  };
</script>

<style scoped>

</style>
