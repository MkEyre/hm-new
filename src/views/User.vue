<template>
  <div>
    <demo-header>个人中心</demo-header>
    <div class="userInfo">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <p>
          <i v-if="info.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i> {{ info.nickname }}
        </p>
        <p>{{ info.create_date | time("YYYY-MM-DD") }}</p>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="首页" is-link @click="$router.push('/home')" />
      <van-cell
        title="我的关注"
        is-link
        @click="$router.push('/my-follow')"
        value="关注的用户"
      />
      <van-cell
        title="我的跟帖"
        is-link
        @click="$router.push('/my-comment')"
        value="跟帖/回复"
      />
      <van-cell
        title="我的收藏"
        is-link
        @click="$router.push('/my-star')"
        value="文档/视频"
      />
      <van-cell title="设置" is-link @click="$router.push('/edit')" />
      <van-cell title="退出" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    const res = await this.$axios.get(`/user/${user_id}`);
    // console.log(res);
    const { message, statusCode, data } = res.data;
    if (statusCode === 200) {
      this.info = data;
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: "温馨提示",
          message: "您确认要退出吗？",
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.$toast("退出成功");
        this.$router.push("/login");
      } catch {
        this.$toast("取消退出");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.userInfo {
  height: 100px;
  border-bottom: 2px solid #ccc;
  display: flex;
  align-items: center;
  padding-left: 20px;
  .left {
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    height: 50px;
    line-height: 25px;
    padding-left: 20px;
  }
}
</style>
