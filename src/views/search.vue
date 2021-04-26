<template>
  <div class="Thesearch">
    <div v-title data-title="搜索"></div>
    <div class="input">
        <input v-model="musicName" @keyup.enter='search' maxlength="20" type="text" placeholder="输入歌名或歌手">
        <button @click="search" >搜索</button>
    </div>
    <div class="searchbox">
      <div class="home-title" v-if="title">
          <h1>历史搜索</h1>
          <span @click="empty">清空</span>
      </div>
      <div v-if="title" class="home">
        <span v-for="(item,index) in title"
         :key="index" v-if="index<20" @click="search(item.name)">{{item.name}}</span>
      </div>
      <div class="hot-search">
        <h1>热门搜索</h1>
        <a  class="key" v-for="(item,index) in hotList" :key="index" @click="search(item.name)">
          <span style="float:left">{{item.name}}</span>
          <span style="float:right">{{item.Play_times}}</span>
        </a>
      </div>
    </div>
    <div class="musicList" v-if="musicList">
      <table class="a" style="width:1000px">
        <thead class="musicTh">
          <th ><tr>#</tr></th>
          <th ><tr>歌名</tr></th>
          <th ><tr>歌手</tr></th>
          <th ><tr>专辑</tr></th>
        </thead>
        <tbody class="tableList">
          <tr
          v-for="(item,index) in musicList"
          @dblclick="toplay(item)"
          :key="index" class="change">
            <td>{{index+1}}</td>
            <td>{{item.music_name}}</td>
            <td>{{item.singer}}</td>
            <td>{{item.album}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  beforeRouteLeave(to, from, next){
    if(to.name === 'my') {
      to.meta.keepAlive = true
    }
    next()
  },
  data () {
    return {
        musicName:'',
        musicList:[],
        title:[{'name':'沦陷'}],
        hotList:[{"name":'沦陷',"Play_times":'250万'},
        {"name":'爱如潮水',"Play_times":'1230万'}]
    };
  },
  methods: {
    search(value){
      console.log("search执行")
      // 发送搜索请求
      if(this.musicName){
        this.title.unshift({'name':this.musicName});
        this.$get(this.API.APIMUSIC,{'word':this.musicName}).then(res=>{
          this.musicList = res.data
        })
      }else{
         this.title.unshift({'name':value});
         this.$get(this.API.APIMUSIC,{'word':value}).then(res=>{
          this.musicList = res.data
        })
      }
      this.musicName=""
    },
    empty(){
      this.title=[]
    },
    toplay(item){
      let isOpen = localStorage.getItem('isOpen');
      console.log("页面状态",isOpen)
      if(isOpen){
        localStorage.setItem('music', JSON.stringify(item));
      }else{
        localStorage.setItem('music', JSON.stringify(item));
        localStorage.setItem('isOpen',true)
        window.open("/static/index.html?"+"list_id="+1+"&index="+'0');
      }
    },
  },
}
</script>

<style scoped>
.Thesearch{
  float: right;
  width: 80%;
  height: 620px;
  overflow: auto;
}
.input input {
  float: left;
  height: 40px;
  width: 80%;
  margin-left:20px ;
  font-size: 24px;
}
.input button{
  width: 80px;
  height: 45px;
  font-size: 20px;
  float: left;
}
.input{
  margin-top: 40px;
  height: 50px;
}
.musicList{
  width: 100%;
  height: 400px;
  margin-top: 50px;
  text-align: left;
  overflow: auto;
}
.tableList tr{
  height: 40px;
  font-size:20px;
}
.tableList tr td{
  padding: 0px;
  height: 40px;
  border-bottom:1px solid rgb(224, 213, 213) ;
  border-radius: 1px;
}
.musicTh th{
   width: 250px;
   height: 40px;
   border-bottom:2px solid rgb(82, 80, 80);
   border-radius: 1px;
}
tr.change:hover {
    background-color:rgb(228, 228, 228,0.5) ;
  }

.a{
  margin: 10px auto;
  width: 1000px;
  border-collapse: collapse;
}
.searchbox{
  text-align: left;
  margin-top:30px ;
}
.home-title{
  margin-left:30px ;
  width: 1000px;
  height: 50px;
}

.home-title h1 {
  margin: 0px;
  padding: auto;
  float: left;
}
.home-title span{
  margin-left: 810px;
}
.home{
  width: 1000px;
  margin: 20px 30px;
}
.hot-search{
  width: 1000px;
  height: 250px;
  margin-left:30px ;
  overflow: hidden;
}
.key{
  display:inline-block;
  height: 20px;
  width: 230px;
  padding: 5px 10px;
}
.key:hover{
  background: rgb(206, 206, 206);
  border-radius: 5px;
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

.home span{
  display:inline-block ;
  height: 20px;
  padding: 5px 10px;
  background: rgb(240, 240, 240);
  border-radius: 20px;
  margin-left: 5px;
}
.home span:hover{
  background: rgb(204, 204, 204);
}
</style>
