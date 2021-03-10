<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="articleObj.title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="articleObj.description"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="articleObj.body"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="articleObj.tags"
                  />
                  <div class="tag-list"></div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click="_postArticle"
                >Publish Article</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postArticle } from "@/api/articles";
export default {
  name: "CreateArticle",
  middleware: ["noauth"],
  data() {
    return {
      articleObj: {
        title: "",
        description: "",
        body: "",
        tagList: []
      }
    };
  },
  methods: {
    async _postArticle() {
      let { data } = await postArticle(this.articleObj);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
