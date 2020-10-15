<template>
  <div>
    <!-- 视频图片文章 -->
    <div class="vedio_img" v-if="post.type === 2">
      <div class="title line2">
        {{ post.title }}
      </div>

      <div class="img">
        <img :src="checkURL(post.cover[0].url)" alt="" />
        <div class="mask">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="info">
        <span>{{ post.user.nickname }}</span>
        <span class="count">{{ post.comments.length }}跟贴</span>
      </div>
    </div>
    <!-- 单张图片文章 -->
    <div class="single_img" v-else-if="post.cover.length < 3">
      <div class="left">
        <div class="title line2">
          {{ post.title }}
        </div>
        <div class="info">
          <span>{{ post.user.nickname }}</span>
          <span class="count">{{ post.comments.length }} 跟贴</span>
        </div>
      </div>
      <div class="img"><img :src="checkURL(post.cover[0].url)" alt="" /></div>
    </div>
    <!-- 多张图片文章 -->
    <div class="multi_img" v-else>
      <div class="title line2">
        {{ post.title }}
      </div>
      <div class="img">
        <img :src="checkURL(post.cover[0].url)" lt="" /><img
          :src="checkURL(post.cover[1].url)"
          alt=""
        /><img :src="checkURL(post.cover[2].url)" alt="" />
      </div>
      <div class="info">
        <span>{{ post.user.nickname }}</span>
        <span class="count">{{ post.comments.length }} 跟贴</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    checkURL(url) {
      if (url.startsWith("http")) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  color: #999;
}
.count {
  margin-left: 20px;
}
.single_img {
  padding: 5px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img {
    img {
      width: 80px;
      height: 60px;
      object-fit: cover;
    }
  }
}
.vedio_img {
  padding: 5px;
  border-bottom: 1px solid #ccc;
  .img {
    padding: 5px;
    position: relative;
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .mask {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 50px;
      background-color: rgba(0, 0, 0, 0.3);
      .iconfont {
        font-size: 30px;
      }
    }
  }
}
.multi_img {
  padding: 5px;
  border-bottom: 1px solid #ccc;
  .img {
    display: flex;
    padding: 5px;
    justify-content: space-between;
    img {
      width: 110px;
      height: 60px;
      object-fit: cover;
    }
  }
}
</style>