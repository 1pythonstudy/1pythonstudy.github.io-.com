<template>
  <div class="all">
    <div v-title data-title="个性播放"></div>
    <h1 >个性音乐</h1>
  <!-- 歌曲推荐 -->
  <div style="height: 550px;" >
    <div  class="list " v-for="(item,index) in list" :key="index"
     @click="gotolist(item.type)">
      <img height="200px" width="200px" :src="API.BASE_SERVER_URL+item.img">
        <span >{{item.typeName}}</span>
    </div>
    <!-- <div  class="list" @click="gotolist(4)"> -->
      <!-- <img height="200px" width="200px" src="../../static/q.jpg">
          <span   >摇滚</span>
      </div>
      <div  class="list" @click="gotolist(5)">
        <img height="200px" width="200px" src="../../static/ni.jpg">
        <span >经典 </span>
      </div> -->
        <!-- <div  class="list" @click="gotolist(6)">
          <img height="200px" width="200px" src="../../static/li.jpg">
        <span  >影视
        </span>
      </div> -->

      <!-- <div class="list " @click="gotolist(7)">
        <img height="200px" width="200px" src="../../static/lian.jpg">
        <span   >
          轻音乐
        </span>
    </div> -->
    <!-- <div  class="list" @click="gotolist(8)">
      <img height="200px" width="200px" src="../../static/li.jpg">
          <span  >
            国风
          </span>
      </div> -->
      <!-- <div  class="list" @click="gotolist(9)">
        <img height="200px" width="200px" src="../../static/ni.jpg">
        <span  >
          电子
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
        list:[]
    };
  },
  methods: {
    gotolist(value){
            this.$router.push('/tolist/'+"0"+"/"+value)
        },
    getList(){
          let a = ['13','3','4','5','6','7','8','9','10','11','12']
          for(let i in a){
            this.$get(this.API.API_LIST,{"type":a[i]}).then(res=>{
              this.list.push(res.data[0])
            },50)
          }
        }
  },
  created(){
    this.getList()
  }
}
</script>

<style  scoped>
.list:hover{
  transform: scale(1.1);
  box-shadow:5px 5px 10px rgb(85, 84, 84)
}
.list{
  float: left;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.6s;
  width: 200px;
  height: 200px;
  margin: 100px 0px 0px 60px;
  box-shadow:5px 5px 10px rgb(136, 135, 135)
}
.all{
  width: 1100px;
  height: 620px;
  float: right;
  overflow: auto;
}
img {
  border-radius: 20px;
}
span{
  font-size:40px;
  margin-left: 15px;
  color: rgb(238, 167, 167);
  text-align:left;
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
h1{
  width: 200px;
  color:rgb(109 84 13);
  text-align: center;
  margin: 0px;
}
</style>
