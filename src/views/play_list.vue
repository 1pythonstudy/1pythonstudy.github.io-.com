<template>
<div class='play_list'>
  <div v-title data-title="首页"></div>
  <div>
    <el-carousel :interval="5000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in lun_list" :key="index"
      v-if="index<6">
        <img  @click="lunplay(item,lun_list[0].list_id,index)" width="570px" height="200px" :src='API.BASE_SERVER_URL+item.img'>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="ri">
    <!-- 热歌推荐 -->
    <div style="width: 100%;height:600px;margin:40px 0px 0px 20px">
      <a class="more" @click="more(hot_list[0].list_id)">更多</a><h1  style="height: 30px;width: 190px;color:rgb(109 84 13);margin-bottom: 0px;">热歌推荐</h1>
      <ul>
      <li v-for="(item,index) in hot_list" :key="index" v-if="index<8">
          <div :title="item.music_name" class="list "  @click="lunplay(item,hot_list[0].list_id,index)">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.music_name">
            <!-- <i style="font-size:70px;position: relative;bottom: 70%;"  class="el-icon-star-off"></i> -->
            </a>
          </div>
          <span >
            {{item.music_name}}
          </span>
      </li>
    </ul>
    </div>
    <!-- 新歌推荐 -->
    <div style="width: 100%;height:600px;margin:40px 0px 0px 20px">
      <a class="more" @click="more(new_list[0].list_id)">更多</a><h1  style="height: 30px;width: 190px;color:rgb(109 84 13);margin-bottom: 0px;">新歌推荐</h1>
      <ul>
      <li v-for="(item,index) in new_list" :key="index" v-if="index<8">
          <div :title="item.music_name" class="list "  @click="lunplay(item,new_list[0].list_id,index)">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.music_name">
            <!-- <i style="font-size:70px;position: relative;bottom: 70%;"  class="el-icon-star-off"></i> -->
            </a>
          </div>
          <span >
            {{item.music_name}}
          </span>
      </li>
    </ul>
    </div>
    <!-- 歌曲推荐 -->
  <div style="width: 100%;height:600px;margin-left:20px">
      <a class="more" @click="more(rec_list[0].list_id)">更多</a><h1 style="width: 190px;color:rgb(109 84 13);margin-bottom: 0px;">歌曲推荐</h1>
      <ul>
      <li v-for="(item,index) in rec_list" :key="index" v-if="index<8">
          <div :title="item.music_name" class="list "  @click="lunplay(item,rec_list[0].list_id,index)">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.music_name">
            <!-- <i style="font-size:70px;position: relative;bottom: 70%;"  class="el-icon-star-off"></i> -->
            </a>
          </div>
          <span >
            {{item.music_name}}
          </span>
      </li>
    </ul>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      lun_list:'',
      hot_list:'',
      new_list:'',
      rec_list:''
    };
  },
  methods: {
    more(value){
        // 点击通往更多新歌或推荐
        this.$router.push('/tolist/'+value+'/0')
    },
    getMusic(){
        this.$get(this.API.API_RANKLIST,
        {'list_id':3}).then(res=>{
          this.lun_list = res.data
          this.hot_list = res.data
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':4}).then(res=>{
          this.new_list = res.data
        })
        this.$get(this.API.API_RANKLIST,
        {'list_id':5}).then(res=>{
          this.rec_list = res.data
        })
    },
    lunplay(item,list_id,index){
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
    this.getMusic()
  }
}
</script>

<style  scoped>
.play_list{

  width: 80%;
  height: 610px;
  overflow: auto;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
  /* margin: 30px 0px 0px 50px; */
  box-shadow:5px 5px 10px rgb(136, 135, 135)
}
 ul{
  padding: 0px;
}
 ul li {
  display: block;
  float: left;
  margin: 1% 0 0 5% ;
  width: 18.2%;
}
li img{
  border-radius: 20px;
}
span{
  width: 100%;
  height: 35px;
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  margin-top: 10px;
}


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
.ri{
  width: 100%;
  float:right;
}
</style>
