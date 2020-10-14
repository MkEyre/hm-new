<template>
  <div class="demo-button" @click="startLogin">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    startLogin() {
      this.$emit("start-login");
    }
  }
};
</script>

<style>
.demo-button {
  height: 50px;
  margin: 20px;
  background-color: red;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  color: #fff;
}
</style>
