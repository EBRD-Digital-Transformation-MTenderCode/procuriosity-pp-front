<template>
  <el-tooltip
    :disabled="!!$store.state.entities[entity].searchParams.titlesOrDescriptions"
    :content="$t('search.tooltip_strict_button')"
    placement="bottom"
    effect="dark"
  >
    <el-checkbox-button
      class="strict-btn"
      :checked="value"
      @change="buttonAction"
      :disabled="!$store.state.entities[entity].searchParams.titlesOrDescriptions"
    >{{ value ? $t("search.strict") : $t("search.no_strict")}}</el-checkbox-button>
  </el-tooltip>
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
      if (
        this.$store.state.entities[this.entity].searchParams
          .titlesOrDescriptions
      ) {
        this.setValue(this.name, val);
      }
    }
  }
};
</script>

<style lang="scss">
.strict-btn {
  &.is-disabled {
    span {
      background-color: #d2d2d2 !important;
      color: #868686 !important;
    }
  }
}
</style>
