<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
            <p class="text-xs-center">
              <a href>Have an account?</a>
            </p>
            <template v-for="error in errors">
              <ul class="error-messages" v-for="(val,key) in error" :key="key">
                <li>{{ key }} {{error[key][0]}}</li>
                <!-- <li>That email is already taken</li> -->
              </ul>
            </template>

            <template v-if="!isLogin">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
            </template>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
              />
            </fieldset>

            <button
              v-if="isLogin"
              @click="submit"
              class="btn btn-lg btn-primary pull-xs-right"
            >Sign In</button>
            <button
              v-else
              @click="submit_register"
              class="btn btn-lg btn-primary pull-xs-right"
            >Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../api/logins";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "LoginRegister",
  middleware: ["auth"],
  data() {
    return {
      errors: [],
      user: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    }
  },
  methods: {
    async submit() {
      let { data } = await login({ user: this.user });
      if (data.user) {
        // 用户数据需要保存起来
        Cookie.set("auth", data.user);
        this.$store.commit("setAuth", data.user);
        this.$router.push("/");
      } else {
        this.errors.push(data.errors);
      }
    },
    async submit_register() {
      let { data } = await register({ user: this.user });
      console.log(data);
      if (data) {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style></style>
