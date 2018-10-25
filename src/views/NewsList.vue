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
            <div class="news-list__item_date">15 October 2018</div>
            <router-link to="" class="news-list__item_title">
              New types of electronic tendering procedures are becoming available on the MTender, to suit different types of contracts and serve different public and commercial buyers, including state-owned enterprises.
            </router-link>
          </li>
          <li class="news-list__item">
            <div class="news-list__item_date">15 October 2018</div>
            <router-link to="" class="news-list__item_title">
              New types of electronic tendering procedures are becoming available on the MTender, to suit different types of contracts and serve different public and commercial buyers, including state-owned enterprises.
            </router-link>
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

<style lang="scss" scoped>
  @import "./../styles/variables";

  .news {
    display: flex;
    padding-top: 50px;
    &__aside {
      width: 500px;
    }
    &__title {
      font-size: 20px;
      font-weight: 700;
      color: $mainC;
    }
    &-list {
      &__wp {
      
      }
      &__item {
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #9e9e9e;
        &_date {
          margin-right: 20px;
          white-space: nowrap;
          font-size: 13px;
          color: #9e9e9e;
        }
        &_title {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
