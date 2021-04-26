<template>
  <div class="box">
    <div v-title data-title="登录"></div>
      <!-- 登录功能 -->
  <div  class="re">
    <div >
				<h3>登录</h3>
				<input type="text" v-model="number" id="usr" placeholder="用户名"/><br />
				<input type="password" @keydown.enter="tolongin" v-model="password" id="password" placeholder="密码"/><br />
				<button  id="bt1" @click="toregister">注册</button>
				<button id="bt2" @click="tolongin">登录</button>
				<span class="forget" @click="forget">忘记密码？</span>
			</div>
  </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
        number:"",
        password:''
    };
  },
  methods: {
    forget(){
      this.$router.push('/forget');
    },
    tolongin(){
      this.$post(this.API.API_login,
      {number:this.number,password:this.password}).then(res => {
              //登录失败,先不讨论
              if (res.code != 200) {
                //iViewUi的友好提示
                this.$message.error(res.msg);
              //登录成功
              } else {
                //设置Vuex登录标志为true，默认userLogin为false
                this.$store.dispatch("isLogin", true);
                //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
                //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
                localStorage.setItem("Flag", "isLogin");
                //iViewUi的友好提示
                this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                localStorage.setItem("user_id", res.data.id);
                //登录成功后跳转到指定页面
                this.$router.push("/my");
              }
          });
       },
       toregister(){
         this.$router.push('/register')
       }
  },
  created(){
    let getFlag = localStorage.getItem("Flag");
    if(getFlag==='isLogin'){
      this.$message.error('请先退出登录')
      this.$router.push("/my")
    }
  }
}
</script>

<style  scoped>

.box{
  width: 80%;
  height: 600px;
  margin-left: 20%;
}

  /* 登录 */
  .re{
	width: 50%;
	height: 400px;
	margin: 0 auto;
	border: 3px solid #000000 ;
	background-color: #FFE4C4;
}
#bt1{
	background-color: rgb(216, 112, 147);
}
#bt2{
	background-color: rgb(216, 112, 147);
}


#bt1:hover{
	background-color: rgb(255, 0, 0);
}
#bt2:hover{
	background-color: rgb(255, 0, 0);
}
.forget:hover{
  background: rgb(151, 230, 148);
}
.re div{
	margin-top: 40px;
	text-align: center;
}
.re div input{
	width: 160px;
	height: 20px;
	margin-top: 20px;
}
.re div button{
	width: 150px;
	height: 50px;
	margin-top: 40px;
	border: none;
}
.re div span{
	width: 100%;
	height: 50px;
	background-color: red;
	display: block;
	text-align: center;
	line-height: 50px;
	font-size: 14px;
	margin: 49px 0px 0px 0px;
}
.re div input{
	padding: 10px 19px;
	font-weight: 300;
	width: 300px;
	height: 20px;
}
</style>
