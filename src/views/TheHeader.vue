<template>
  <div class="the">
  <div class="left">
    <div class="img">
      <img  src="../../static/1.jpg">
      <h2 style="padding-top: 20px;color:#ceff6fa6;">My_music</h2>
    </div>
    <div class="Theleft">
      <ul>
        <li v-for="(item,index) in left" :key="index" :tabIndex="index+1" @click="goto(index+1)">
              <i :class="item.i_class"></i>
              <span  slot="title" >{{item.title}}</span>
          </li>
      </ul>
    </div>
  </div>

  </div>

</template>

<script>
 export default {
   data() {
      return {
        left:''
      }
    },
    methods: {
      goto(value){
        if(value==1){
          this.$router.push({path:'/my'})
        } else if(value==2){
          this.$router.push({path:'/search'})
        }else if(value==3){
            this.$router.push('/list')
        }else if(value==4){
            this.$router.push('/play')
        }else if(value==5){
            this.$router.push('/radio')
        }else if(value==6){
          this.$router.push('/download')
        }else if(value==7){
          this.$router.push('/login')
        }else if(value==8){
          this.$router.push('/register')
        }
      },
      getall(){
        this.$get(this.API.API_navigation).then(res=>{
          this.left = res.data
          localStorage.setItem("url",this.API.API_Lyr)
        })
      }
    },
    created(){
      this.getall()
    }
 }
</script>

<style scoped>

.Theleft ul li {
  display: block;
  height: 60px;
  margin: 0px;
  padding: 0px;
  outline: none;
  color: aliceblue;
}
.Theleft ul  :hover{
  background: rgba(173, 172, 167, 0.5);
}
.Theleft ul :focus{
  color: rgb(255, 40, 40);
}

.Theleft ul{
  padding: 0px;
}
.Theleft ul li i {
  position: relative;
  top:12px;
  font-size:35px
}
.Theleft ul li span {
  position: relative;
  top:12px;
}
.left{
  float:left;
  width: 100%;
  height:100%;
  /* background: url('../../static/a.jpg'); */
  background:rgb(88, 85, 85);
  overflow: auto;
}
.img{
  width: 100%;
  height: 70px;
}
.img img{
      width: 60px;
      border-radius: 15px;
      height: 60px;
      float:left;
      margin:6px 0px 0px 60px;
}
.the{
  width: 20%;
  margin: 0;
  height: 110%;
  float: left;
}
</style>
