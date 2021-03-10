<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <a href class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
    </div>
    <span>
      <button
        class="btn btn-sm"
        :class="{
          'btn-outline-secondary':!article.author.following,
          'btn-secondary':article.author.following,
        }"
        @click="article.author.following ? _deleteFollow(article.author.username) : _postFollow(article.author.username)"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{article.author.following ? "unfollow" : "Follow"}}
        <!-- <span class="counter">(10)</span> -->
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm"
        :class="{
          'btn-outline-primary':!article.favorited,
          'btn-primary':article.favorited,
        }"
        @click="article.favorited ? _deleteFavorite(article.slug) : _postFavorite(article.slug) "
      >
        <i class="ion-heart"></i>
        &nbsp; {{article.favorited ? 'unfavorite' : 'Favorite'}}
        <span
          class="counter"
        >( {{article.favoritesCount}} )</span>
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: "ArticleAuthor",
  props: [
    "article",
    "postFollow",
    "deleteFollow",
    "postFavorite",
    "deleteFavorite"
  ],
  methods: {
    _postFollow(username) {
      this.$emit("postFollow", username);
    },
    _deleteFollow(username) {
      this.$emit("deleteFollow", username);
    },
    _postFavorite(slug) {
      this.$emit("postFavorite", slug);
    },
    _deleteFavorite(slug) {
      this.$emit("deleteFavorite", slug);
    }
  }
};
</script>

<style>
</style>