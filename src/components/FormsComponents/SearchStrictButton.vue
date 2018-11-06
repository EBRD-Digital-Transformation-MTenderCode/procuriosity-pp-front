<template>
  <el-checkbox-button
      :checked="value"
      @change="buttonAction"
  >
    {{ value ?  $t("search.strict") : $t("search.no_strict")}}
  </el-checkbox-button>
</template>

<script>
  export default {
    name: "SearchSwitch",
    props: {
      name: {
        type: String,
        required: true
      },
      entity: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        required: true
      },
      setValue: {
        type: Function,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },
    methods: {
      buttonAction(val) {
        if (this.$store.state.entities[this.entity].searchParams.titlesOrDescriptions) {
          this.setValue(this.name, val)
        }
      }
    }
  };
</script>
