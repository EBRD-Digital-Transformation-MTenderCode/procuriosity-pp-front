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
        format="dd MM yyyy, HH:mm"
        :editable="false"
    />
  </div>
</template>

<script>
  import moment from "moment/moment";

  import { DatePicker } from "element-ui";

  export default {
    name: "SearchPeriods",
    components: {
      "el-date-picker": DatePicker
    },
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
          return this.value;
        },
        set([startDate, endDate]) {
          this.setValue(this.name, [moment.utc(startDate).format("YYYY-MM-DDTHH:mm:ss") + "Z", moment.utc(endDate).format("YYYY-MM-DDTHH:mm:ss") + "Z"]);
        }
      }
    }
  };
</script>

<style scoped>

</style>
