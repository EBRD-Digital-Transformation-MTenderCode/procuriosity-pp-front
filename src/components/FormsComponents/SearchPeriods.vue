<template>
  <div>
    <label class="search-form__period-label">
      <slot></slot>
    </label>
    <el-date-picker
        v-model="inputValue"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        clearable
        format="dd MM yyyy, HH:mm"
        value-format="yyyy-MM-ddTHH:mm:ssZ"
        :editable="false"
    />
  </div>
</template>

<script>
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
          return this.value
        },
        set(value) {
          this.setValue(this.name, value)
        }
      }
    }
  };
</script>

<style scoped>

</style>
