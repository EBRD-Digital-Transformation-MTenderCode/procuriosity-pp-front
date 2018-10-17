<template>
  <el-container>
    <div class="news">
      <aside class="news__aside">
        <div class="news__title">
          News
        </div>
      </aside>
      <section class="news-list__wp">
        <ul class="news-list">
          <li class="news-list__item">
            <div class="news-list__item_date"></div>
            <router-link to=""  class="news-list__item_title"></router-link>
          </li>
        </ul>
      </section>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "NewsList"
};
</script>

<style scoped>

</style>
