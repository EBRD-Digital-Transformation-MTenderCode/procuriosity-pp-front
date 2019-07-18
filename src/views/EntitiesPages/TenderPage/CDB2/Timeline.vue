<template>
  <div :class="[{ 'timeline--cancelled': getActivePeriod === 'cancelled' }, 'timeline']">
    <div
      :class="[
        { 'timeline__item--active': getActivePeriod === 'clarification' || getActivePeriod === 'suspended' },
        'timeline__item',
      ]"
    >
      <span class="timeline__date">{{ fd(periods.enquiryPeriodStart) }}</span>
      <span
        :class="[
          'timeline__marker',
          getActivePeriod === 'suspended' ? 'timeline__marker--suspended' : 'timeline__marker--clarification',
        ]"
      ></span>
      <div class="timeline__period">Clarifications</div>
    </div>
    <div :class="[{ 'timeline__item--active': getActivePeriod === 'tendering' }, 'timeline__item']">
      <span class="timeline__date">{{ fd(periods.enquiryPeriodEnd) }}</span>
      <span class="timeline__marker timeline__marker--tendering"></span>
      <div class="timeline__period">Tendering</div>
    </div>
    <div
      :class="[{ 'timeline__item--active': getActivePeriod === 'auction' }, 'timeline__item']"
      v-if="periods.auctionPeriodStart"
    >
      <span class="timeline__date">{{ fd(periods.auctionPeriodStart) }}</span>
      <span class="timeline__marker timeline__marker--auction"></span>
      <div class="timeline__period">Auction</div>
    </div>
    <div :class="[{ 'timeline__item--active': getActivePeriod === 'awarding' }, 'timeline__item']">
      <span class="timeline__date">{{ fd(periods.awardPeriodStart) }}</span>
      <span class="timeline__marker timeline__marker--awarding"></span>
      <div class="timeline__period">Awarding</div>
    </div>
    <div
      :class="[
        {
          'timeline__item--active':
            getActivePeriod === 'awarded' || getActivePeriod === 'unsuccessful' || getActivePeriod === 'cancelled',
        },
        'timeline__item',
      ]"
    >
      <div class="timeline__date">{{ fd(periods.awardPeriodEnd) }}</div>
      <span
        :class="[
          'timeline__marker',
          getActivePeriod === 'awarded'
            ? 'timeline__marker--awarded'
            : getActivePeriod === 'unsuccessful'
            ? 'timeline__marker--unsuccessful'
            : 'timeline__marker--cancelled',
        ]"
      ></span>
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
          return "clarification";
        case "active.suspended":
          return "suspended";
        case "active.tendering":
          return "tendering";
        case "active.auction":
          return "auction";
        case "unsuccessful.empty":
          return "unsuccessful";
        case "active.awardedContractPreparation":
          return "awarded";
        case "active.awarding":
          return "awarding";
        case "cancelled.empty":
          return "cancelled";
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
@import "./../../../../styles/mixins";

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
    transform: translateY(28px);
    background-color: #2da9e2;
    @media (max-width: 490px) {
      width: 1px;
      height: 100%;
      transform: translateY(0) translateX(8px);
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
  &__marker {
    position: absolute;
    top: 20px;
    display: inline-block;
    outline: 2px #225aa5 solid;
    @media (max-width: 490px) {
      top: 0;
      left: 0;
    }
  }
  &__item {
    position: relative;
    flex: 1 0 0;
    &:last-child {
      flex: 0;
    }
    &:not(&--active) {
      .timeline__marker {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #2da9e2;
      }
    }
    @media (max-width: 490px) {
      min-height: 80px;
      &:last-child {
        min-height: 0;
      }
    }
    &--active {
      .timeline__date {
        color: #fff;
      }
      .timeline__marker {
        @include ico-types();
      }
      .timeline__period {
        color: #fff;
      }
    }
  }
  &--cancelled {
    .timeline__date,
    .timeline__period {
      color: #d1d1d1;
    }
    .timeline__marker:not(.timeline__marker--cancelled) {
      background: #d1d1d1;
    }
  }
}
</style>
