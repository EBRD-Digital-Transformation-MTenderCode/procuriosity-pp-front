<template>
  <div style="display: inline-block" @copy="doCopy">{{ ocid }}</div>
</template>

<script>
export default {
  name: "ProcedureId",
  computed: {
    ocid() {
      return this.$slots.default[0].text.toUpperCase();
    },
  },
  methods: {
    doCopy(e) {
      e.clipboardData.setData("text/plain", e.target.textContent.toLowerCase().replace("md", "MD"));
      e.preventDefault();
    },
  },
};
</script>
