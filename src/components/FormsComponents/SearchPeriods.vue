<template>
  <div>
    <label class="search-form__period-label">
      <slot></slot>
    </label>
    <el-date-picker
        v-model="inputValue"
        type="datetimerange"
        :range-separator="$t('message.range_separator')"
        :start-placeholder="$t('message.start_date_placeholder')"
        :end-placeholder="$t('message.end_date_placeholder')"
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
        required: true
      },
      value: {
        type: null,
        required: true
      },
      setValue: {
        type: Function,
        required: true
      }
    },
    computed: {
      inputValue: {
        get() {
          if (Array.isArray(this.value) && this.value.length) {
            const startDate = this.value[0];
            const endDate = this.value[1];

            return [
              new Date(startDate),
              new Date(endDate)
            ];
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
              dayjs(convertStringDateToUTCDateObject(endDate)).format("YYYY-MM-DDTHH:mm:ss") + "Z"
            ]);
          } else {
            this.setValue(this.name, []);
          }
        }
      }
    }
  };
</script>
