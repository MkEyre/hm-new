<template>
  <div>
    <demo-header>我的关注</demo-header>
    <div class="follow">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="name">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | time("YYYY-MM-DD") }}</div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getFollows();
    // this.follow();
  },
  methods: {
    async getFollows() {
      const res = await this.$axios.get("user_follows");
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.list = res.data.data;
      }
    },
    //取消关注函数
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: "温馨提示",
          message: "您确定要取消关注该用户吗？",
        });
        const res = await this.$axios.get(`/user_unfollow/${id}`);
        // console.log(res);
        if (res.data.statusCode === 200) {
          this.getFollows();
          this.$toast.success(res.data.message);
        }
      } catch {
        this.$toast("不取消了");
      }
    },
    //关注用户
    async follow() {
      await this.$axios.get("/user_follows/5");
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  box-sizing: border-box;
  height: 80px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  .left {
    width: 60px;
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
  }
  .right {
    padding: 5px 10px;
    border-radius: 20px;
    background-color: #ccc;
  }
  .center {
    padding-left: 10px;
    flex: 1;
    height: 50px;
    line-height: 25px;
    .date {
      color: #999;
    }
  }
}
</style>