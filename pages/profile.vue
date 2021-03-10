<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="profile.image" class="user-img" />
              <h4>{{ profile.username }}</h4>
              <p>{{ profile.bio}}</p>
              <!-- <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp; Follow Eric Simons
              </button>-->
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{ 'active' : tab === 'MyArticle'}"
                    :to="{
                    name:'profile',
                    query:{
                      tab:'MyArticle'
                    }
                  }"
                  >My Articles</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{ 'active' : tab !== 'MyArticle'}"
                    :to="{
                    name:'profile',
                    query:{
                      tab :'FavoritedArticle'
                    }
                  }"
                  >Favorited Articles</nuxt-link>
                </li>
              </ul>
            </div>

            <div class="article-preview" v-for="(article,index) in articleList" :key="index">
              <div class="article-meta">
                <nuxt-link :to="'/profile/'+article.author.username">
                  <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="'/profile/'+article.author.username"
                    class="author"
                  >{{ article.author.username}}</nuxt-link>
                  <span class="date">{{ article.author.createdAt | date('MMM DD,YYYY') }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{active :article.favorited}"
                  :disabled="favoriteBut"
                  @click="article.favorited ?   _deleteFavorited(article.slug,index) : _postFavorited(article.slug,index) "
                >
                  <i class="ion-heart"></i>
                  {{ article.favoritesCount}}
                </button>
              </div>
              <nuxt-link :to="'/article/'+article.slug" class="preview-link">
                <h1>{{article.title}}</h1>
                <p>{{ article.description}}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>

            <!-- <div class="article-preview">
              <div class="article-meta">
                <a href>
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div class="info">
                  <a href class="author">Albert Pai</a>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 32
                </button>
              </div>
              <a href class="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul class="tag-list">
                  <li class="tag-default tag-pill tag-outline">Music</li>
                  <li class="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </a>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfileByUsername } from "@/api/profiles";
import { getArticles, postFavorite, deleteFavorite } from "@/api/articles";
export default {
  name: "profile",
  data() {
    return {
      favoriteBut: false
    };
  },
  async asyncData({ query, params }) {
    let tab = query.tab || "MyArticle";
    console.log(tab);
    let { username } = params;
    let { data: profileResData } = await getProfileByUsername(username);
    let reqObj = {
      limit: 20,
      offset: 0
    };
    if (tab === "MyArticle") {
      reqObj["author"] = username;
    } else {
      reqObj["favorited"] = username;
    }
    let { data: articleDatas } = await getArticles(reqObj);
    // console.log(profileResData, articleDatas);
    return {
      profile: profileResData.profile,
      articleList: articleDatas.articles,
      username,
      tab
    };
  },
  methods: {
    async _postFavorited(slug, index) {
      this.favoriteBut = true;
      let { data } = await postFavorite(slug);
      this.favoriteBut = false;
      // this.articles[index] = data.article;
      this.articleList.splice(index, 1, data.article);
    },
    async _deleteFavorited(slug, index) {
      this.favoriteBut = true;
      let { data } = await deleteFavorite(slug);
      this.favoriteBut = false;
      // this.articles[index] = data.article;
      this.articleList.splice(index, 1, data.article);
    }
  },
  watchQuery: ["tab"]
};
</script>

<style></style>
