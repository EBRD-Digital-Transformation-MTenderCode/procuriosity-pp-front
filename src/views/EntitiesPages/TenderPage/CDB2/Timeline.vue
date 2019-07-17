<template>
  <div class="timeline">
    <div :class="[{ 'timeline__item--active': getActivePeriod === 'clarifications' }, 'timeline__item']">
      <span class="timeline__date">{{ fd(periods.enquiryPeriodStart) }}</span>
      <div class="timeline__period">Clarifications</div>
    </div>
    <div :class="[{ 'timeline__item--active': getActivePeriod === 'tendering' }, 'timeline__item']">
      <span class="timeline__date">{{ fd(periods.enquiryPeriodEnd) }}</span>
      <div class="timeline__period">Tendering</div>
    </div>
    <div
      :class="[{ 'timeline__item--active': getActivePeriod === 'auction' }, 'timeline__item']"
      v-if="periods.auctionPeriodStart"
    >
      <span class="timeline__date">{{ fd(periods.auctionPeriodStart) }}</span>
      <div class="timeline__period">Auction</div>
    </div>
    <div :class="[{ 'timeline__item--active': getActivePeriod === 'awarding' }, 'timeline__item']">
      <span class="timeline__date">{{ fd(periods.awardPeriodStart) }}</span>
      <div class="timeline__period">Awarding</div>
    </div>
    <div :class="[{ 'timeline__item--active': getActivePeriod === 'awarded' }, 'timeline__item']">
      <div class="timeline__date">{{ fd(periods.awardPeriodEnd) }}</div>
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
    status: {
      type: String,
      required: true,
    },
    statusDetails: {
      type: String,
      required: true,
    },
  },
  computed: {
    getActivePeriod() {
      const statusFull = `${this.status}.${this.statusDetails}`;
      switch (statusFull) {
        case "active.clarification":
        case "active.enquiries":
        case "active.suspended":
          return "clarifications";
        case "active.tendering":
          return "tendering";
        case "active.auction":
          return "auction";
        case "unsuccessful.empty":
        case "unsuccessful":
        case "active.awardedContractPreparation":
        case "active.awarded":
          return "awarded";
        case "active.awarding":
        case "active.qualification":
          return "awarding";
        case "cancelled.empty":
      }
    },
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
<style scoped lang="scss">
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
  &__date {
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
  &__period {
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
  &__item {
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
    &--active {
      .timeline__date {
        color: #add684;
      }
      &::before {
        background-color: #add684;
      }
      .timeline__period {
        color: #fff;
      }
    }
  }
}
</style>
