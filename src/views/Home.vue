<template>
  <div>
    <div class="homeHeader">
      <div class="left"><i class="iconfont iconnew"></i></div>
      <div class="center">
        <i class="iconfont iconsearch"></i><span>搜索新闻</span>
      </div>
      <div class="right"><i class="iconfont iconwode"></i></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.homeHeader {
  height: 40px;
  background-color: red;
  display: flex;
  color: #fff;
  align-items: center;
  text-align: center;

  .left {
    width: 60px;
    .iconnew {
      font-size: 40px;
    }
  }
  .right {
    width: 60px;
    .iconwode {
      font-size: 25px;
    }
  }
  .center {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.5);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    span {
      margin-left: 10px;
    }
  }
}
</style>