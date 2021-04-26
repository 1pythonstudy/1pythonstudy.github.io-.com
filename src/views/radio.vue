<template>
  <div class="Theradio">
    <div v-title data-title="电台"></div>
        <!-- 电台 -->
    <div class="recommend" >
      <h1  style="height: 30px;width: 190px;color:rgb(109 84 13);margin-bottom: 0px;">电台</h1>
      <ul>
      <li v-for="(item,index) in list" :key="index" v-if="index<8">
          <div :title="item.message" class="list1 ">
            <a >
            <img width="200px" height="200px" :src="API.BASE_SERVER_URL+item.img" :alt="item.message">
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
      list:'',
      total:10,
      size:10,
      page:1
    };
  },
  methods: {
    handleCurrentChange(page){
      this.page = page
      this.getList()
    },
    getList(){
         this.$get(this.API.API_RADIO,{
           'page':this.page
         }).then(res=>{
           this.list = res.rows
           this.total = res.total
         })
      }
  },
  created(){
    this.getList()
  },
}
</script>

<style  scoped>
.Theradio{
  float: right;
  width: 80%;
  height: 620px;
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
.recommend .list1{
  /* float: left; */
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.6s;
  width: 200px;
  height: 200px;
  /* margin: 30px 0px 0px 55px; */
  box-shadow:5px 5px 10px rgb(136, 135, 135)
}

.recommend .list1:hover{
  transform: scale(1.1);
  box-shadow:5px 5px 10px rgb(85, 84, 84)
}
.recommend{
  width: 100%;
  height:100%;
  margin:0px 0px 0px 20px;
  overflow : auto;
}
.recommend ul{
  padding: 0px;
}
.recommend ul li {
  display: block;
  float: left;
  width: 18%;
  margin: 1% 0 0 5%;
}
.list1 img{
  border-radius: 20px;
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

.page{
  position: sticky  ;
  top: 600px;
  left: 650px;
}
</style>
