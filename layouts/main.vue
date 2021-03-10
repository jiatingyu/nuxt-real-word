<template>
  <div>
    <Header />
    <!-- <nuxt /> -->
    <nuxt-child />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "MainLayout",
  components: {
    Header,
    Footer
  }
};
</script>

<style></style>
