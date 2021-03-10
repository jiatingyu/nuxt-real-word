<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link active" to="/">Home</nuxt-link>
          </li>
          <li class="nav-item" v-if="isLogin">
            <nuxt-link class="nav-link" to="/editor">
              <i class="ion-compose"></i>&nbsp;New Post
            </nuxt-link>
          </li>
          <li class="nav-item" v-if="isLogin">
            <nuxt-link class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <template v-if="!isLogin && isIndex">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
          <template v-else-if="isLogin">
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="'/profile/' + authUser.username">
                <img alt="user profile image" :src="authUser.image" class="user-pic" />
                {{ authUser.username }}
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a href="/login" @click="loginOut" class="nav-link">退出登录</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "Header",
  data() {
    return {
      // isLogin: false,
      // isIndex: false,
    };
  },
  async asyncData(context) {
    console.log(context);
  },
  computed: {
    ...mapState({
      authUser: "user"
    }),
    isLogin() {
      return this.$store.state.user ? true : false;
    },
    isIndex() {
      return this.$route.name === "index";
    }
  },
  methods: {
    loginOut() {
      Cookie.set("auth", null);
      this.$store.commit("setAuth", "");
      // this.$router.push("/login");
    }
  }
};
</script>

<style></style>
