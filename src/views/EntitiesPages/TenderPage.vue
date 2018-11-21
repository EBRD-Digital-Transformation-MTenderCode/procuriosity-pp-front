<template>
  <div class="entity-wp">
    <transition name="fade" mode="out-in" appear>
      <el-container key="loading" v-if="!loaded && !error.status">
        <div class="loading"></div>
      </el-container>
      <el-container direction="vertical" v-else-if="loaded && Object.keys(tender).length" key="info">
      
      </el-container>
      <el-container class="error" key="error" v-else>
        <div class="error-message"> {{error.message}}</div>
        <button
            class="refresh-btn"
            @click="getTender"
        >
          {{$t("refresh")}}
        </button>
        <button class="back-btn" @click="$router.go(-1)">{{$t("back")}}</button>
      </el-container>
    </transition>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { FETCH_CURRENT_TENDER_INFO } from "./../../store/types/actions-types";

  import { getDataFromObject, formatDate } from "./../../utils";

  export default {
    name: "TenderPage",
    components: {
    },
    created() {
      this.getTender();
    },
    methods: {
      getTender() {
        this.$store.dispatch(FETCH_CURRENT_TENDER_INFO, {
          id: this.$route.params.id
        });
      }
    },
    computed: {
      ...mapState({
        cdb: state => state.entities.tenders.currentTender.cdb,
        tender: state => state.entities.tenders.currentTender.tenderData,
        loaded: state => state.entities.tenders.loaded,
        error: state => state.entities.tenders.error
      })
    }
  };
</script>
