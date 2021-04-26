<template>
  <div class="box">
    <div v-title data-title="注册"></div>
     <!-- 注册 -->
    <div id="div1" >
			<h1>注册</h1>
			<div id="div2">
				<input maxlength="10" id="user" v-model="number" placeholder="输入用账号"/><br />
				<input maxlength="20" type="password" id="password1" v-model="password1" placeholder="输入密码"/><br />
				<input maxlength="20" type="password" id="password2" v-model="password2" placeholder="再次输入密码"/><br/>
        <input maxlength="17" id="password2" v-model="email" placeholder="输入邮箱"/><br/>
				<button @click="info" id="btt">提交</button>
				<button id="bt3" onclick="window.history.back(-1)"> 返 回 </button>
				<button @click="login">已有账号，去登陆</button>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
        password1:'',
        password2:'',
        number:'',
        email:''
    };
  },
  methods: {
    login(){
      this.$router.push('/login')
    },
    info(){
         if(this.number.length==0){
           this.$message.error('账号不能为空');
         }else if(this.password1!=this.password2){
           this.$message.error('两次输入的密码不一样');
         }else if(this.password1.length==0){
           this.$message.error('密码不能为空');
         }else if(this.email.length==0){
           this.$message.error('邮箱不能为空');
         }else{
           if(/[a-z]/.test(this.number)>0 ||
           /[A-Z]/.test(this.number)>0 ||
           /\W/.test(this.number)>0){
              this.$message.error('账号必须为数字')
           }else{
             if(this.email.indexOf('@')!=-1 && this.email.indexOf('.')!=-1){
                var email = this.email.split("@")[1].split('.')[0];
                this.toin(email);
              }else{
                this.$message.error('邮箱格式错误');
              }
            }
          }
        },
        toin(value){
        //  console.log('邮箱',value)
          var num = 0;var worda = 0;var wordA = 0;var te = 0;
            if (this.password1.length > 6){
              for(var i=0;i<this.password1.length;i++){
                  if (/^.*[0-9]+.*/.test(this.password1[i]))num+=1;
                  if (/[a-z]/.test(this.password1[i])) worda+=1;
                  if (/[A-Z]/.test(this.password1[i])) wordA+=1;
                  if (/\W/.test(this.password1[i])) te+=1;
              }
              // console.log("数字",num)
              // console.log("小写",worda)
              // console.log("大写",wordA)
              // console.log("特殊字符",te)
              this.$post(this.API.API_REGISTER,
              {'number':this.number,'password1':this.password1,
              'password2':this.password2,'email':this.email}
              ).then(res=>{
                if(res.code==200){
                  this.$message({message: res.msg})
                  this.$router.push('/my')
                }else{
                  this.$message.error({message: res.msg})
                }
              })
            }else{
              this.$message.error('密码长度需超过6位')
            }
        },
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
/* 注册 */
h1{
	margin-top: 20px;
}
#div1{
	width: 50%;
	height: 453px;
	border: 1px solid black;
	background-color: #FFE4C4;
	text-align: center;
	margin: 10px auto;
}
.box{
  width: 80%;
  height: 600px;
  margin-left: 20%;
}
button {
	margin-top: 23px;
	background-color: crimson;
	width: 100%;
	height: 50px;
	border: none;
}
#btt{
	width: 100px;
	background: rgb(222, 160, 235);
}
#bt3{
	width: 100px;
	background: rgb(222, 160, 235);
}
#btt:hover{
	background-color: rgb(250, 0, 0);
}
#bt3:hover{
	background-color: red;
}
button:hover{
	background-color: lightgreen;
}
#user{
	margin-top: 18px;
}
#password1,#password2{
	margin-top: 10px;
}
input{
	padding: 15px;
	width: 300px;
	height: 10px;
}
</style>
