<template>
  <div>
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="userObj.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="userObj.username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userObj.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userObj.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userObj.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="_updateUserInfo"
              >Update Settings</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from "@/api/profiles";
export default {
  name: "Settings",
  middleware: ["noauth"],
  data() {
    return {
      userObj: {
        email: "",
        username: "",
        password: "",
        image: "",
        bio: ""
      }
    };
  },
  methods: {
    async _updateUserInfo() {
      let { data } = await updateUserInfo(this.userObj);
      console.log(data);
      // 获取到新的user数据 更新到store
      let oldUser = this.$store.state.user;

      this.$store.commit("setAuth", { ...oldUser, ...data.user });
      this.$router.push(`/profile/${data.user.username}`);
    }
  }
};
</script>

<style></style>
