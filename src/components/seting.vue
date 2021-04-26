<template>
  <div class='seting'>
    <div v-title data-title="个人信息设置"></div>
    <h1 style="margin-right: 80px;">设置</h1>

    <!-- 上传头像 -->
    <div class="tou" >
      <el-form ref="form" :model="form" label-width="80px">
          <el-form-item class="touxiang" label="头像">
              <el-upload
                      class="avatar-uploader"
                      :http-request="upLoad"
                      action=""
                      :show-file-list="false"

                      :on-change="handleChange"
                      :before-upload="beforeAvatarUpload">

                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-user avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userinfo.user_name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userinfo.e_mail"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="userinfo.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="userinfo.address"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
              <el-input maxlength="50" v-model="userinfo.sign"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
            </el-form-item>
        </el-form>
      </div>

		</div>

</template>

<script>
export default {
  name: '',
  data () {
    return {
        formData: new FormData(),
        userinfo:{
          'user_name':'',
          'sex':'',
          'sign':'',
          'e_mail':'',
          'address':''
        },
        imageUrl:'',
        user_id:localStorage.getItem("user_id")
    };
  },
  methods: {
    onSubmit() {
        this.formData.append('id', this.user_id);
        this.formData.append('user_name', this.userinfo.user_name);
        this.formData.append('sex', this.userinfo.sex);
        this.formData.append('sign', this.userinfo.sign);
        this.formData.append('e_mail', this.userinfo.e_mail);
        this.formData.append('address', this.userinfo.address);
        this.$put(this.API.API_SET_USER, this.formData).then(res => {
          if(res.code==200){
            this.$message({
              message: '设置成功',
              type: 'success'
            });
          }else{
            this.$message.error('设置失败');
          }
        })
      },
    handleChange(file,res) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    upLoad(file) {
        this.formData.append('img', file.file);
      },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  created(){
    this.$post(this.API.API_SET_USER,
    {'user_id':localStorage.getItem('user_id')}).then(res=>{
      console.log(res.data)
      this.userinfo.user_name = res.data.user_name
      this.userinfo.sex = res.data.sex
      this.userinfo.sign = res.data.sign
      this.userinfo.e_mail = res.data.e_mail
      this.userinfo.address = res.data.address
      this.imageUrl = this.API.BASE_SERVER_URL + res.data.img
      console.log(this.userinfo)
    })
  }
}
</script>

<style  scoped>

/* 头像 */
 .avatar-uploader .el-upload {
    border: 2px solid #fc0202;
    border-radius: 20px;
    cursor: pointer;
    /* position: relative; */
    overflow: hidden;
    top: 40px;
    right: 75px;

  }
  .avatar-uploader el-upload:hover {
    border-color: #ff0000;

  }
  .avatar-uploader-icon {
    font-size: 18px;
    color: #1855aa;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin-right: 20px;

  }
  .avatar-uploader{
    width: 10%;
    height: 100px;

  }
  .avatar {
    display: block;
    box-shadow:5px 2px 6px #000;
    width:100px;
    height:100px;
    border: 1px solid rgb(54, 47, 47);
    border-radius:90px;
  }
  .Personal_signature{
    width: 800px;
    height: 100px;
    border: 0.1px dashed rgb(201, 193, 193);
    margin: 0px 0px 0px 200px;
     margin-top: 30px;
  }
  .Personal_signature p{
    width: 500px;
  }


  /* 头像 */
  .tou{
      width: 70%;
      height: 30%;
      position: relative;
      left : 15%;
      top: 30px;
      text-align: center;

  }
  .seting{
    width: 80%;
    height: 600px;
    background:rgb(255, 253, 249);
    text-align: center;
    overflow: auto;
  }
  .in{
    width: 90px;
    height: 50px;
  }
  .in:hover{
    background: rgb(179, 104, 189);
  }
  .el-form-item{
    height: 60px;
  }
  .touxiang{
    height: 100px;
  }
  /* 定义滚动条样式 */
::-webkit-scrollbar
{
  width: 8px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
  border-radius: 10px;
  background-color: rgba(0,0,0,0.1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgba(0,0,0,0.1);
}
</style>
