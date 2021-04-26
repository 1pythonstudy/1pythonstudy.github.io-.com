<template>
  <div class="Thedown">
    <div v-title data-title="歌单列表"></div>
    <!-- 新歌推荐 -->
    <div class="recommend">
      <h1  style="color:rgb(109 84 13);margin:0px;">歌单推荐</h1>
      <!-- <a class="more" @click="toplay(index,new_music[0].list_id)">更多></a> -->
      <ul>
      <li v-for="(item,index) in new_list" :key="index" v-if="item.type!=18" >
          <div :title="item.music_name" class="list1 " @click="more(item.id) ">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.music_name">
            <!-- <i style="font-size:70px;position: relative;bottom: 70%;"  class="el-icon-star-off"></i> -->
            </a>
          </div>
          <span >
            {{item.message}}
          </span>
      </li>
    </ul>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
        new_list:'',
        total:10,
        size:10,
        page:1
    };
  },
  methods: {
    handleCurrentChange: function(currentPage){
      this.page=currentPage
      this.get_hot_new()
    },
    more(value){
        // 点击通往更多新歌或推荐
        this.$router.push('/tolist/'+value+'/0')
        this.getlist()
    },
    getlist(){
      var listid = this.$route.params.id;
      var type = this.$route.params.type;
      this.list_id = listid;
      if (type=='0'){
        type = ''
      }
      if(listid=='0'){
        listid = ''
      }
      this.$get(this.API.APIMUSIC,
      {'type':type,'list_id':listid,'user_id':localStorage.getItem("user_id")}).then(res=>{
        this.musiclist = res.data
      })
    },
    get_hot_new(){
          this.$get(this.API.API_LIST,{"page":this.page}).then(res=>{
            this.new_list = res.rows
            this.total = res.total
          })
        }
  },
  created(){
    this.get_hot_new();
  }
}
</script>

<style  scoped>
.Thedown{
  float: right;
  width: 80%;
  height: 600px;
  overflow: auot;
}
.recommend{
  width: 100%;
  height:600px;
}
.recommend ul{
  padding: 0px;
  margin: 0;
}
.recommend ul li {
  width: 18%;
  display: block;
  float: left;
  margin-left: 5%;
  margin-top: 3%;
}
.list1 img{
  border-radius: 20px;
}
.recommend .list1:hover{
  transform: scale(1.1);
  box-shadow: 5px 5px 10px rgb(85, 84, 84)
}
.recommend .list1{
  /* float: left; */
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.6s;
  width: 200px;
  height: 200px;
  box-shadow:5px 5px 10px rgb(136, 135, 135);
  margin: 0;
}
.recommend span{
  width: 100%;
  height: 25px;
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  margin: 0;
  margin-top: 10px;
}
.more{
  float:right;
  padding-right:60px;
  color:rgb(0, 0, 0);
}
.page{
  position: sticky  ;
  /* top: 600px;
  left: 650px; */
  bottom: 0;
}
</style>
