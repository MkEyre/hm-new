<template>
  <div class="demo-header">
    <div class="header">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center"><slot></slot></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.demo-header {
  height: 40px;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #f4f4f4;
    height: 40px;
    display: flex;
    align-items: center;
    .left,
    .right {
      width: 40px;
    }
    .center {
      flex: 1;
      text-align: center;
      font-size: 18px;
      color: red;
    }
  }
}
</style>
