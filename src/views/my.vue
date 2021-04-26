<template>
  <div class="Themy" >
    <div v-title data-title="我的"></div>
    <a class="break" @click="back">注销</a>
    <keep-alive v-if="$route.meta.keepAlive">
    <div style="height:71%;">
      <!-- 头像以及用户名 -->
      <div class="top" >
          <img width="100px" height="100px" :src="API.BASE_SERVER_URL+person.img">
          <h4 >
            {{person.user_name}}
          </h4>
          <!-- 个性签名 -->
         <div class="Personal">
              <p >{{person.sign}}</p>
          </div>
      </div>
    <!-- 个人设置默认列表 -->
      <div class="recommend" style="height:340px">
      <h1 class="title" style="width: 100px;">我的</h1>
      <ul>
      <li v-for="(item,index) in myList" :key="index" >
          <div :title="item.list_name" class="list" @click="gotolist(index+1)">
            <a >
            <img  width="200px" height="200px" v-if="item.img" :src="API.BASE_SERVER_URL+item.img">
            <img  width="200px" height="200px" v-if="!item.img" :src="API.BASE_SERVER_URL+'static/music_img/68812725.jpg'">
            <!-- <i  class="icon_i" :class="item.class"></i> -->
            </a>
          </div>
          <span >
            {{item.list_name}}
          </span>
      </li>
    </ul>
    </div>
  </div>
  </keep-alive>
  <!-- 歌曲推荐 -->
  <div class="recommend" >
      <a class="more" @click="more(recomList[0].list_id)">更多 ></a><h1 class="title">热歌推荐</h1>
      <ul>
      <li v-for="(item,index) in recomList" :key="index" v-if="index<8">
          <div :title="item.music_name" class="list "
          @click="toplay(item,recomList[0].list_id,index)">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.music_name">
            <!-- <i  class="el-icon-star-off icon_i"></i> -->
            </a>
          </div>
          <span >
            {{item.music_name}}
          </span>
      </li>
    </ul>
    </div>

<!-- 新歌推荐 -->
    <div class="recommend" >
      <a class="more" @click="more(new_music[0].list_id)">更多 ></a><h1 class="title" >新歌推荐</h1>
      <ul>
      <li v-for="(item,index) in new_music" :key="index" v-if="index<8">
          <div :title="item.music_name" class="list"
          @click="toplay(item,new_music[0].list_id,index)">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.title">
            <!-- <i class="el-icon-star-off icon_i"></i> -->
            </a>
          </div>
          <span >
            {{item.music_name}}
          </span>
      </li>
    </ul>
    </div>
</div>
</template>

<script>
export default {
  name:'',
  // beforeRouteLeave(to, from, next) {
  //   from.meta.keepAlive = false
  //   next()
  // },
     data() {
      return {
          person:'',
          musiclist:[{'title':'爱','artist':'艾辰'},
          {'title':'爱','artist':'艾辰'}],
          imageUrl: '../../static/q.jpg',
          userId:localStorage.getItem("user_id"),
          new_music:'',
          recomList:'',
          myList:[{'list_name':'',"class":'el-icon-star-on','img':''},
          {'list_name':'','img':'',"class":'icon-npmaixin'},
          {'list_name':'设置','img':'static/list_img/seting.jpg',"class":'el-icon-s-tools'},
          {'list_name':'个性播放',"img":'static/list_img/person.jpg',"class":'el-icon-video-play'}],
        }
      },
     methods: {
        // 请求默认列表和喜欢列表
        de_like(){
          this.$get(this.API.API_DE_LIKE,
          {"user_id":this.userId,"list_id":1}).then(res=>{
            this.myList[0].img=res.data[0].img
            this.myList[0].list_name = res.data[0].list_name
          })
          this.$get(this.API.API_DE_LIKE,
          {"user_id":this.userId,"list_id":2}).then(res=>{
            this.myList[1].img=res.data[0].img
            this.myList[1].list_name = res.data[0].list_name
          })
        },
        more(value){
          // 点击通往更多新歌或推荐
          this.$router.push('/tolist/'+value+'/0')
        },
        back(){
            localStorage.removeItem("Flag");
            localStorage.removeItem("user_id");
            this.$router.push('/login');
        },
        gotolist(value){
          console.log("函数执行",value)
          if(value==1 || value==2){
            this.$router.push('/tolist/'+value+"/"+"0")
          }else if(value==3){
            this.$router.push('/seting/'+this.userId)
          }else if(value==4){
            this.$router.push('/personality/'+this.userId)
          }
        },
        getperson(){
          this.$post(this.API.API_SET_USER,
          {'user_id':this.userId}).then(res=>{
            this.person = res.data
          })
        },
        getMusic(){
          this.$get(this.API.APIMUSIC,
          {'list_id':'3'}).then(res=>{
            this.recomList = res.data
          })
          this.$get(this.API.APIMUSIC,
          {'list_id':'4'}).then(res=>{
            this.new_music = res.data
          })
        },
      toplay(item,list_id,index){
        let isOpen = localStorage.getItem('isOpen');
        if(isOpen){
        localStorage.setItem('music', JSON.stringify(item));
        }else{
        window.open("/static/index.html?"+"list_id="+list_id+"&index="+index);
        localStorage.setItem('isOpen',true)
      }
    },
    },
    created(){
      this.userId=localStorage.getItem("user_id")
      if(!this.userId){
        this.$message({
            message: '请先登录',
            type: 'warning'
        });
      }else{
        this.getperson()
        this.de_like()
        this.getMusic()
      }
    },
  }
</script>

<style  scoped>
.Themy{
  float: right;
  width: 80%;
  height: 620px;
  background: rgb(255, 253, 249);
  text-align: center;
  overflow: auto;
}
span{
  width: 100%;
  height: 25px;
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  /* margin-left: 50px; */
  margin-top: 10px;
}
.Themy ul{
  padding: 0px;
}
.Themy ul li {
  display: block;
  float: left;
}
.list:hover{
  transform: scale(1.1);
  box-shadow:5px 5px 10px rgb(85, 84, 84)
}
.list{
  /* float: left; */
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.6s;
  width: 200px;
  height: 200px;
  /* margin: 30px 0px 0px 60px; */
  box-shadow:5px 5px 10px rgb(136, 135, 135)
}
.list img{
  border-radius: 20px;
}
.top{
  /* float:left;/ */
  width: 80%;
  height: 100px;
  margin-top: 10px;
}
.top h4{
  width: 200px;
  color: rgb(109 84 13);
  margin: 10px 0px 0px 20px;
  text-shadow: 0.5px 0.5px 1px rgb(15, 15, 15);
}
.top img{
  /* float: left; */
  position: relative;
  border-radius: 50px;
  right: 38%;
  box-shadow: 0 0 10px rgb(0, 0, 0);
}
.Personal {
  width: 50%;
  position: relative;
  bottom:100%;
  left: 260px;
  font-size: 20px;
  color: #a16d28;
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
/* 退出登录 */
.break{
  width: 80px;
  height: 20px;
  float: right;
  color: rgb(255, 0, 0);
  padding: 20px;
}

.recommend{
  width:98%;
  height:86.5%;
  margin:40px 0px 0px 20px;

}
.recommend li{
  width: 18.5%;
  margin-left: 5%;
}
.title{
  height: 50px;
  color: rgb(109 84 13);
  width: 180px;
  /* padding: 20px; */
  margin-right: 1px;
}
.icon_i{
  font-size:70px;
  position: relative;
  bottom: 70%;
}
.more{
  float:right;
  padding-right:60px;
  color:rgb(0, 0, 0);
}
</style>
