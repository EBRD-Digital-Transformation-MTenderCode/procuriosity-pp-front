<template>
  <div class="error">
    <div class="error-message">{{ message }}</div>
    <button class="back-btn" @click="$router.go(-1)">{{ $t("back") }}</button>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String,
      default: () => "404 Page not found",
    },
  },
};
</script>
