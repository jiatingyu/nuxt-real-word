<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    v-if="authUser"
                    :class="{ active: tab === 1 }"
                    :to="{
                      name: 'home',
                      query: {
                        author: authUser.username,
                        tab: 1,
                      },
                    }"
                  >Your Feed</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 2 }"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 2,
                      },
                    }"
                  >Global Feed</nuxt-link>
                </li>
                <li class="nav-item" v-if="tag">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 3 }"
                    :to="{
                      name: 'home',
                      query: {
                        tag,
                        tab: 3,
                      },
                    }"
                  >#{{ tag }}</nuxt-link>
                </li>
              </ul>
            </div>

            <div class="article-preview" v-for="(article, i) in articles.articles" :key="i">
              <div class="article-meta">
                <!-- <nuxt-link href="profile.html"> -->
                <nuxt-link :to="'/profile/' + article.author.username">
                  <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="'/profile/' + article.author.username"
                    class="author"
                  >{{ article.author.username }}</nuxt-link>
                  <!-- <span class="date">January 20th</span> -->
                  <span class="date">
                    {{
                    article.createdAt | date("MMMM DD,YYYY")
                    }}
                  </span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{active :article.favorited}"
                  :disabled="favoriteBut"
                  @click="article.favorited ?   _deleteFavorited(article.slug,i) : _postFavorited(article.slug,i) "
                >
                  <i class="ion-heart"></i>
                  {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link :to="'/article/' + article.slug" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
            <nav>
              <ul class="pagination">
                <li
                  class="page-item"
                  v-for="num in totalPage"
                  :key="num"
                  :class="{ active: page === num }"
                >
                  <!-- @click="changeOffset(num)" -->
                  <nuxt-link
                    :to="{
                      name: 'home',
                      query: {
                        page: num,
                        tag,
                      },
                    }"
                    class="page-link"
                  >{{ num }}</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <span v-for="(tag, i) in tags.tags" :key="i">
                  <nuxt-link
                    :to="{
                      name: 'home',
                      query: {
                        tag,
                        page,
                        tab: 3,
                      },
                    }"
                    class="tag-pill tag-default"
                  >{{ tag }}</nuxt-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getTags } from "@/api/tags";
import { getArticles, postFavorite, deleteFavorite } from "@/api/articles";
export default {
  name: "Index",
  data() {
    return {
      favoriteBut: false
    };
  },
  async asyncData({ query }) {
    let page = Number.parseInt(query.page) || 1;
    let tag = query.tag;
    let tab = Number.parseInt(query.tab) || 2;
    // console.log(query, tab);
    let author = query.author;
    let limit = 20;
    let offset = (page - 1) * limit;
    let res = await Promise.all([
      getTags(),
      getArticles({
        limit,
        offset,
        tag,
        author
      })
    ]);
    // console.log(res);
    let tags = [];
    let articles = [];
    if (res.length) {
      if (res[0] && res[0].data) {
        tags = res[0].data;
      }
      articles = (res[1] && res[1].data) || [];
    }
    return Object.assign(
      {},
      {
        page,
        limit,
        offset,
        tags,
        articles,
        tag,
        tab,
        articlesCount: articles.articlesCount
      }
    );
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState({
      authUser: "user"
    }),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  methods: {
    async _postFavorited(slug, index) {
      this.favoriteBut = true;
      let { data } = await postFavorite(slug);
      this.favoriteBut = false;
      // this.articles[index] = data.article;
      this.articles.articles.splice(index, 1, data.article);
    },
    async _deleteFavorited(slug, index) {
      this.favoriteBut = true;
      let { data } = await deleteFavorite(slug);
      this.favoriteBut = false;
      // this.articles[index] = data.article;
      this.articles.articles.splice(index, 1, data.article);
    }
  }
};
</script>

<style></style>
