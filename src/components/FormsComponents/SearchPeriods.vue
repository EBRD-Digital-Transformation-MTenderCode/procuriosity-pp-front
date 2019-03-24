<template>
  <div>
    <label class="search-form__label">{{ label }}</label>
    <el-date-picker
      v-model="inputValue"
      type="datetimerange"
      range-separator="-"
      :start-placeholder="$t('search.start_date_placeholder')"
      :end-placeholder="$t('search.end_date_placeholder')"
      clearable
      unlink-panels
      align="center"
      time-arrow-control
      format="dd MM yyyy HH:mm"
      :editable="false"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";

import { convertStringDateToUTCDateObject } from "./../../utils";

export default {
  name: "SearchPeriods",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: null,
      required: true,
    },
    setValue: {
      type: Function,
      required: true,
    },
    label: {
      type: String,
    },
  },
  computed: {
    inputValue: {
      get() {
        if (Array.isArray(this.value) && this.value.length) {
          const startDate = this.value[0];
          const endDate = this.value[1];

          return [new Date(startDate), new Date(endDate)];
        } else {
          return [];
        }
      },
      set(period) {
        if (Array.isArray(period) && period.length) {
          const startDate = period[0];
          const endDate = period[1];

          this.setValue(this.name, [
            dayjs(convertStringDateToUTCDateObject(startDate)).format("YYYY-MM-DDTHH:mm:ss") + "Z",
            dayjs(convertStringDateToUTCDateObject(endDate)).format("YYYY-MM-DDTHH:mm:ss") + "Z",
          ]);
        } else {
          this.setValue(this.name, []);
        }
      },
    },
  },
};
</script>
