<template>
  <div>
    <demo-header>个人中心</demo-header>
    <div class="head_img">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <van-cell-group>
      <van-cell
        title="昵称"
        @click="nicknameDialog"
        :value="info.nickname"
        is-link
      />
      <van-cell title="密码" value="*****" is-link />
      <van-cell
        title="性别"
        @click="genderDialog"
        :value="info.gender === 1 ? '男' : '女'"
        is-link
      />
    </van-cell-group>
    <!-- 修改昵称弹窗 -->
    <van-dialog
      v-model="nicknameShow"
      @confirm="changeNickname"
      title="修改昵称"
      show-cancel-button
    >
      <van-field v-model="nickname" />
    </van-dialog>
    <!-- 修改性别弹窗 -->
    <van-dialog
      v-model="genderShow"
      @confirm="changeGender"
      title="修改性别"
      show-cancel-button
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      nicknameShow: false,
      nickname: "",
      genderShow: false,
      gender: 0,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios.get(`/user/${user_id}`);
      const { data, message, statusCode } = res.data;
      if (statusCode === 200) {
        this.info = data;
        console.log(this.info);
      }
    },
    nicknameDialog() {
      //弹窗显示
      this.nicknameShow = true;
      //数据回显
      this.nickname = this.info.nickname;
    },
    //修改昵称函数
    changeNickname() {
      if (this.nickname === this.info.nickname) {
        this.$toast.fail("修改昵称不能与修改前一致");
        return;
      }
      this.axiosRequest({ nickname: this.nickname });
    },

    genderDialog() {
      //弹窗显示
      this.genderShow = true;
      //数据回显
      this.gender = this.info.gender;
    },
    //修改姓名函数
    changeGender() {
      if (this.gender === this.info.gender) {
        this.$toast.fail("修改性别不能与修改前一致");
        return;
      }
      this.axiosRequest({ gender: this.gender });
    },
    //封装发送请求函数
    async axiosRequest(data) {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios.post(`/user_update/${user_id}`, data);
      // console.log(res.data);
      const { message, statusCode } = res.data;
      if (statusCode === 200) {
        this.getUserInfo();
        this.$toast.success(message);
      }
    },
    //文件上传之后触发的函数
    async afterRead(file) {
      // console.log(data.file);
      const formDate = new FormData();
      formDate.append("file", file.file);
      const res = await this.$axios.post("/upload", formDate);
      const { statusCode, message, data } = res.data;
      if (statusCode === 200) {
        this.axiosRequest({ head_img: data.url });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head_img {
  box-sizing: border-box;
  height: 120px;
  text-align: center;
  padding-top: 20px;
  position: relative;
  img {
    width: 70px;
    height: 70px;
  }
  .uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>