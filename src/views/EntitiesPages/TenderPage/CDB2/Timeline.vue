<template>
  <div class="timeline">
    <div class="timeline-item">
      <span class="timeline-date">{{ fd(periods.enquiryPeriodStart) }}</span>
      <div class="timeline-period">Clarifications</div>
    </div>
    <div class="timeline-item">
      <span class="timeline-date">{{ fd(periods.enquiryPeriodEnd) }}</span>
      <div class="timeline-period">Tendering</div>
    </div>
    <div class="timeline-item" v-if="periods.auctionPeriodStart">
      <span class="timeline-date">{{ fd(periods.auctionPeriodStart) }}</span>
      <div class="timeline-period">Auction</div>
    </div>
    <div class="timeline-item">
      <span class="timeline-date">{{ fd(periods.awardPeriodStart) }}</span>
      <div class="timeline-period">Awarding</div>
    </div>
    <div class="timeline-item">
      <div class="timeline-date">{{ fd(periods.awardPeriodEnd) }}</div>
    </div>
  </div>
</template>

<script>
import { getDataFromObject, formatDate } from "../../../../utils";

export default {
  name: "Timeline",
  props: {
    periods: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.periods);
  },
  methods: {
    gd(...args) {
      return getDataFromObject(...args);
    },
    fd(date) {
      return formatDate(date, "DD MMM YYYY", null);
    },
  },
};
</script>
<style lang="scss">
.timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  margin: 0 10px 100px;
  @media (max-width: 490px) {
    flex-direction: column;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    transform: translateY(26px);
    background-color: #2da9e2;
    @media (max-width: 490px) {
      width: 1px;
      height: 100%;
      transform: translateY(0) translateX(6px);
    }
  }
  &-item {
    position: relative;
    flex: 1 0 0;
    &:last-child {
      flex: 0;
    }
    @media (max-width: 490px) {
      min-height: 80px;
      &:last-child {
        min-height: 0;
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 20px;
      width: 13px;
      height: 13px;
      outline: 2px #225aa5 solid;
      background-color: #2da9e2;
      transform: rotate(45deg);
      @media (max-width: 490px) {
        top: 0;
        left: 0;
      }
    }
  }
  &-date {
    position: absolute;
    top: 0;
    left: 5px;
    color: #2da9e2;
    font-size: 11px;
    white-space: nowrap;
    @media (max-width: 490px) {
      left: 20px;
    }
  }
  &-period {
    position: absolute;
    top: 35px;
    width: 100%;
    text-align: center;
    color: #2da9e2;
    font-size: 14px;
    font-weight: 700;
    @media (max-width: 490px) {
      text-align: left;
      left: 25px;
    }
  }
}
</style>
