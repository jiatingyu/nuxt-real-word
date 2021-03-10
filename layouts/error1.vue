<template>
  <div>
    {{ error }}
    <br />
    <!-- <nuxt-link to="/"> 去首页</nuxt-link> -->
  </div>
</template>

<script>
export default {
  name: "error",
  layout: "blank",
  props: ["error"]
};
</script>

<style></style>
