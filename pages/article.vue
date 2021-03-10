<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title}}</h1>
          <article-athor
            :article="article"
            v-on:deleteFollow="deleteFollow"
            v-on:postFollow="postFollow"
            v-on:deleteFavorite="deleteFavorite"
            v-on:postFavorite="postFavorite"
          />
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">{{ article.body }}</div>
        </div>

        <hr />

        <div class="article-actions">
          <!-- <article-athor :article="article" /> -->
          <article-athor
            :article="article"
            v-on:deleteFollow="deleteFollow"
            v-on:postFollow="postFollow"
            v-on:deleteFavorite="deleteFavorite"
            v-on:postFavorite="postFavorite"
          />
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <form class="card comment-form">
              <div class="card-block">
                <textarea
                  class="form-control"
                  placeholder="Write a comment..."
                  v-model="comment"
                  rows="3"
                ></textarea>
              </div>
              <div class="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                <button
                  class="btn btn-sm btn-primary"
                  @click="_postComment(article.slug)"
                >Post Comment</button>
              </div>
            </form>

            <div class="card" v-for="comment in comments" :key="comment.id">
              <div class="card-block">
                <p class="card-text">{{ comment.body }}</p>
              </div>
              <div class="card-footer">
                <nuxt-link :to="'/profile/'+comment.author.username" class="comment-author">
                  <img :src="comment.author.image" class="comment-author-img" />
                </nuxt-link>&nbsp;
                <a href class="comment-author">{{ comment.author.username}}</a>
                <span class="date-posted">{{ comment.createdAt | date('MMM DD,YYYY')}}</span>
                <span
                  class="mod-options"
                  v-if="user.username === comment.author.username"
                  @click="_deleteComment(article.slug,comment.id)"
                >
                  <i class="ion-trash-a">delete</i>
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
import ArticleAthor from "@/components/ArticleAuthor";
import {
  getComments,
  getArticleDetail,
  postFollow,
  deleteFollow,
  postFavorite,
  deleteFavorite,
  postComment,
  deleteComment
} from "@/api/articles";

import { mapState } from "vuex";
export default {
  name: "Article",
  data() {
    return {
      comment: "",
      comments: []
    };
  },
  components: {
    ArticleAthor
  },
  computed: {
    ...mapState(["user"])
  },
  async asyncData({ query, params }) {
    let { slug } = params;
    let { data: articles } = await getArticleDetail(slug);
    // 评论可以不用seo优化  进而去mouted
    // let { data: comments } = await getComments(slug);
    // console.log(articles, comments);
    return { slug, article: articles.article };
  },
  methods: {
    async postFollow(username) {
      let { data } = await postFollow(username);
      console.log("postFollow", data);
      this.article.author = data.profile;
    },
    async deleteFollow(username) {
      let { data } = await deleteFollow(username);
      console.log("deleteFollow", data);
      this.article.author = data.profile;
    },
    async postFavorite(slug) {
      let { data } = await postFavorite(slug);
      // console.log("postFavorite", data);
      this.article = { ...data.article };
    },
    async deleteFavorite(slug) {
      let { data } = await deleteFavorite(slug);
      console.log("deleteFavorite", data);
      this.article = { ...data.article };
    },
    async _postComment(slug) {
      let body = {
        comment: {
          body: this.comment
        }
      };
      let { data } = await postComment(slug, body);
      // let { data: comments } = await getComments(slug);
      // this.comments = comments.comments;
      // this.article = { ...data.article };
    },
    async _deleteComment(slug, id) {
      let { data } = await deleteComment(slug, id);
      let { data: comments } = await getComments(slug);
      this.comments = comments.comments;
    }
  },
  async mounted(params) {
    let { slug } = this.$route.params;
    let { data: comments } = await getComments(slug);
    // console.log(articles, comments);
    this.comments = comments.comments;
  },
  head() {
    return {
      title: `${this.article.title} - RealWord`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.article.description}`
        }
      ]
    };
  }
};
</script>

<style></style>
