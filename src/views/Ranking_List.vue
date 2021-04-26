<template>
  <div class="Rank_list">
    <div v-title data-title="排行榜"></div>
  <!-- <h1 >排行榜</h1> -->
    <div >
       <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(item,index) in lun_list"
          :key="index" v-if='index<6'>
            <img @click="toplay(index,lun_list[0].list_id)" class="lun" :src='API.BASE_SERVER_URL+item.img'>
          </el-carousel-item>
        </el-carousel>
    </div>
    <div class="music_list">
      <ul>
      <li v-for="(item,index) in rank_list" :key="index"  @click="gotolist(item[0].list_id)">
        <a class="title">{{item[0].list_name}}</a>
          <div :title="item[0].list_name" class="list1 " >
            <a>
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item[0].img" :alt="item[0].list_name">
            <!-- <i class="el-icon-star-off icon"></i> -->
            </a>
          </div>
          <div style="width: 100%;height: 230px;">
            <div style="position: relative;top:60px;margin-top:20px"
            v-for="(item1,index1) in item"
            :key="index1" v-if="index1<4">
              <span class="rank" style="color:rgb(231, 56, 56);width: 20px">
                {{index1+1}}
              </span>
              <span class="rank"  style="color: rgba(107, 63, 128);">{{item1.music_name}}</span>
              <span class="rank" style="color:#CCCC99;">{{item1.singer}}</span>
              <span class="rank" style="color:#CCCCFF	">专辑:{{item1.album}}</span><br>
            </div>
          </div>
      </li>
    </ul>
    </div>
    <!-- 热歌推荐 -->
    <div class="recommend" >
      <a class="more" @click="more(hot_list[0].list_id)">更多</a><h1  style="height: 30px;width: 190px;color:rgb(109 84 13);margin-bottom: 0px;">热歌推荐</h1>
      <ul>
      <li v-for="(item,index) in hot_list" :key="index" v-if="index<8">
          <div :title="item.music_name" class="list " @click="lunplay(item,hot_list[0].list_id,index)">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.music_name">
            <!-- <i class="el-icon-star-off icon"></i> -->
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
  name: '',
  data () {
    return {
          hot_list:'',
          listName:['默认列表','喜欢列表','设置','个性播放'],
          rank_list:[],
          lun_list:''
    };
  },
  methods:{
    lunplay(item,list_id,index){
      let isOpen = localStorage.getItem('isOpen');
      console.log("页面状态",isOpen)
      if(isOpen){
        localStorage.setItem('music', JSON.stringify(item));
      }else{
        window.open("/static/index.html?"+"list_id="+list_id+"&index="+index);
        localStorage.setItem('isOpen',true)
      }
    },
    toplay(index,list_id){
        let isOpen = localStorage.getItem('isOpen');
        if(isOpen){
          localStorage.setItem('list_id',list_id);
          localStorage.setItem('index',index);
        }else{
          window.open("/static/index.html?"+"list_id="+list_id+"&index="+index);
          localStorage.setItem('isOpen',true)
        }
      },
    more(value){
        // 点击通往更多新歌或推荐
        this.$router.push('/tolist/'+value+'/0')
    },
    gotolist(value){
      this.$router.push('/tolist/'+value+'/'+"0")
    },
    getMusic(){
        this.$get(this.API.API_RANKLIST,
        {'list_id':3}).then(res=>{
          this.lun_list = res.data
          this.hot_list = res.data
          this.rank_list.push(res.data)
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':4}).then(res=>{
          this.rank_list.push(res.data)
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':5}).then(res=>{
          this.rank_list.push(res.data)
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':6}).then(res=>{
          this.rank_list.push(res.data)
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':7}).then(res=>{
          this.rank_list.push(res.data)
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':8}).then(res=>{
          this.rank_list.push(res.data)
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':9}).then(res=>{
          this.rank_list.push(res.data)
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':10}).then(res=>{
          this.rank_list.push(res.data)
        })
    }
  },
  created(){
    this.getMusic()
  }
}
</script>

<style  scoped>
.Rank_list{
  height: 610px;
  overflow: auto;
  width: 80%;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
.music_list{
  width:100%;
  height:2000px;
}
.music_list ul{
  padding: 0px;
  width: 100%;

}
.music_list ul li {
  display: block;
  height: 230px;
  margin: 20px 60px ;
  background: rgba(236, 217, 230, 0.3);
  border-radius: 20px;
  /* cursor: pointer; */
  transition: all 0.6s;
  box-shadow: #99a9bf 5px 5px 10px;
}
.list1 img{
  border-radius: 20px;
}
.music_list ul li:hover{
  transform: scale(1.1);
  box-shadow:5px 5px 10px rgb(85, 84, 84)
}
.list1{
  float: left;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  box-shadow:5px 5px 10px rgb(136, 135, 135);
  margin-top:25px
}
.lun{
  height:300px;
  width:100%;
}

.recommend span{
  width: 100%;
  height: 25px;
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  /* margin-left: 50px; */
  margin-top: 10px;
}


.recommend .list:hover{
  transform: scale(1.1);
  box-shadow:5px 5px 10px rgb(85, 84, 84)
}
.recommend .list{
  /* float: left; */
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.6s;
  width: 200px;
  height: 200px;
  /* margin: 30px 0px 0px 50px; */
  box-shadow:5px 5px 10px rgb(136, 135, 135)
}
.recommend ul{
  padding: 0px;
}
.recommend ul li {
  display: block;
  float: left;
  margin-left: 4%;
  margin-top: 1%;
}
.list img{
  border-radius: 20px;
}
.recommend{
  width: 98%;
  height:600px;
  /* margin:0px 0px 0px 20px */
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
.more{
  float:right;
  padding-right:60px;
  color:rgb(0, 0, 0);
}
.rank{
  float:left;
  width: 160px;
  height: 20px;
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.title{
  float: left;
  width: 25px;
  margin-top: 70px;
}
.icon{
  font-size:70px;
  position: relative;
  bottom: 70%;
}
</style>
