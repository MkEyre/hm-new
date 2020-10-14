<template>
  <div>
    <demo-header>我的跟帖</demo-header>
    <van-list
      v-model="loading"
      @load="onload"
      :immediate-check="false"
      :finished="finished"
      finished-text="已经到底了……"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <div class="date">
          {{ item.create_date | time("YYYY-MM-DD hh:mm") }}
        </div>
        <div class="answer" v-if="item.parent">
          <div class="answer-user">回复：{{ item.parent.user.nickname }}</div>
          <div class="answer-content">{{ item.parent.content }}</div>
        </div>
        <div class="my-answer">{{ item.content }}</div>
        <div class="post">
          <div class="post-content line1">
            {{ item.post.title }}
          </div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      loading: false,
      finished: false,
      pageSize: 4,
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      const res = await this.$axios.get("/user_comments", {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.list = [...this.list, ...res.data.data];
        this.loading = false;
        if (res.data.data.length < this.pageSize) {
          this.finished = true;
        }
      }
    },
    //滚动到底部触发的事件
    onload() {
      this.pageIndex++;
      this.getComments();
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  line-height: 25px;
  border-bottom: 1px solid #ccc;
  .date {
    color: #999;
  }
  .answer {
    background-color: #ddd;
    color: #999;
    padding: 5px;
    &-user {
      color: 12px;
    }
    &-content {
      font-size: 14px;
    }
  }
  .post {
    display: flex;
    &-content {
      flex: 1;
      color: #999;
    }
    .iconfont {
      width: 20px;
      text-align: center;
    }
  }
}
</style>