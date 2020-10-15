<template>
  <div>
    <demo-header>我是收藏页面</demo-header>
    <demo-post v-for="post in postList" :key="post.id" :post="post"></demo-post>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
    };
  },
  created() {
    this.getStar();
  },
  methods: {
    async getStar() {
      const res = await this.$axios.get("/user_star");
      console.log(res);
      if (res.data.statusCode === 200) {
        this.postList = res.data.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>