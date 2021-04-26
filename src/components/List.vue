<template>
<div class="list" >
  <div v-title data-title="歌曲列表"></div>
  <!-- 歌曲评论 -->
  <div class="massge">
    <h3>歌曲评论</h3><br/>
    <div>
        <div v-for="(item,index) in iscommet"
        :key="index" v-if="iscommet"
        class="commetleft" >
          <div class="commleft">
            <img height="40px" width="40px" :src='API.BASE_SERVER_URL+item.img'>
            <br>
          <span class="number">
            {{item.name}}
            </span>
          </div>
            <div class="commright" >
                {{item.message}}
            </div>
            <div class="zan" title="点个赞吧">
                <i class="fa fa-thumbs-o-up fa-5x animated swing"
                  v-if="!item.iszan"
                  @click="colour2(item.iszan,item.id,index)">
                </i>
                <i class="fa fa-thumbs-up fa-5x animated swing hover2"
                  v-if="item.iszan"
                  @click="colour2(item.iszan,item.id,index)">
                </i>
                <span>{{item.msgnumber}}</span>
            </div>
        </div>
        <p :key="index" v-if="!commet">
        {{msg}}
        </p>
    </div>
    <!-- 分页和评论输入框 -->
    <div class="pa_commet">
        <div class="page">
          <el-pagination
            background
            :pager-count="5"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="size"
            :total="total">
          </el-pagination>
        </div>
        <div class="commet">
            <textarea v-model="text"
            placeholder="时光匆匆，留下评论好不好？"
            id="textarea"
            maxlength="100"
            @input="isnumber"
            @keyup.enter="toCommet">
            </textarea>
            <button @click="toCommet" >提交</button><br>
            <a >还有{{num}}字</a>
        </div>
    </div>
  </div>
<!-- 默认列表和喜欢列表 -->
  <div class="islist" >
    <div class="blur" ></div>
    <div class="li_list">
        <div class="top" :style="{backgroundImage: 'url('+ this.API.BASE_SERVER_URL+ img + ')'}">
      <!-- <h2 style="width: 180px;height: 40px;margin-left:30px;color: #4d65dc;">{{title[index]}}</h2> -->
      <img :src="API.BASE_SERVER_URL+img" >
      <div class="title">
        <p style="padding-top: 150px;margin-top: 0px;">你喜欢的音乐</p> <!-- style="margin-top: 160px;"-->
        <p>音乐要与爱的人一起分享</p>
      </div>
    </div>
    <table class="tab">
        <thead class="musicTh">
          <th >#</th>
          <th >歌名</th>
          <th >歌手</th>
          <th >选项</th>
        </thead>
        <tbody class="tableList">
          <tr v-for="(item,index) in musiclist"
          :key="index" class="change"
          @dblclick="toplay(index,item.list_id)"
          @click="getCommet(item.music_id,index)">
            <td style="color:#ff0000">{{index+1}}</td>
            <td style="color:rgb(202 0 226)">{{item.music_name}}</td>
            <td style="color:rgb(132 78 11)">{{item.singer}}</td>
            <td>
              <a >
                <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-s-operation"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="open2(item,index)">加入播放</el-dropdown-item>
                    <el-dropdown-item v-if="list_id!=1"  @click.native="open2(item,1)">加入默认列表</el-dropdown-item>
                    <el-dropdown-item v-if="list_id==1" @click.native="remove1(item,1)">移出默认列表</el-dropdown-item>
                    <el-dropdown-item v-if="list_id!=2" @click.native="open2(item,2)">喜欢</el-dropdown-item>
                    <el-dropdown-item v-if="list_id==2" @click.native="remove1(item,2)">移出喜欢</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
              </a>
          </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <ul>
      <li :tabIndex="index" v-for="(item,index) in musiclist"
      :key="index" >
        <a style="color:rgb(231, 56, 56);float:left;margin-left:70px">{{index+1}}</a>
        <a style="color:red;float:left;margin-left:170px"></a>

        <a style="float:right;margin-right:180px"></a>
      </li>
    </ul> -->
  </div>
<!-- 列表内歌曲推荐 -->
    <div class="recommend" >
      <h1>热歌推荐</h1>
      <a class="more" @click="more(hot_list[0].list_id)">更多></a>
      <ul>
      <li v-for="(item,index) in hot_list" :key="index" v-if="index<8">
          <div :title="item.music_name" class="list1 "
          @click="toplay(index,hot_list[index].list_id)">
            <a >
            <img width="200px" height="200px"
            :src="API.BASE_SERVER_URL+item.img"
            :alt="item.music_name"
            @mouseover="over2(index)"
            @mouseout="out2(index)">
            <i v-if="item.isI" :class="ac"
            @mouseover="over2(index)"
            @mouseout="out2(index)"></i>
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
      <h1  >新歌推荐</h1>
      <a class="more" @click="more(new_list[0].list_id)">更多></a>
      <ul>
      <li v-for="(item,index) in new_list" :key="index"
      v-if="index<8">

          <div :title="item.music_name" class="list1 "
          @click="toplay(index,new_list[0].list_id)">
            <a >
            <img width="200px" height="200px"
            :src="API.BASE_SERVER_URL+item.img"
            :alt="item.music_name"
            @mouseover="over(index)"
            @mouseout="out(index)">
            <i v-if="item.isI" :class="ac"
            @mouseover="over(index)"
            @mouseout="out(index)"></i>
            <!-- <i v-if="!item.isI" :class="ac"></i> -->
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
        list_id:'',
        musiclist:'',
        title:["我的默认列表","喜欢列表"],
        index:'',
        new_list:'',
        hot_list:'',
        total:6,
        size:6,
        page:1,
        commet:'',
        music_id:'',
        msg:'歌曲评论还没有评论一下吧',
        num:0,
        text:'',
        fontclass2: "hover2",
        formdata: new FormData(),
        type:this.$route.params.type,
        zan:'',
        iscommet:'',
        user_id:localStorage.getItem('user_id'),
        img:'',
        ac : 'fa fa-play-circle-o'
    }
  },
  methods:{
    over(index){
      this.new_list[index].isI = true
    },
    out(index){
      this.new_list[index].isI = false
    },
    over2(index){
      this.hot_list[index].isI = true
    },
    out2(index){
      this.hot_list[index].isI = false
    },
    remove1(item,index){
      if(index===1){
        this.$confirm('此操作将移出默认, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$delete(this.API.API_DE_LIKE,
          {"user_id":this.user_id,
          'list_id':item.list_id,'music_id':item.music_id}).then(res=>{
            if(res.code===200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getlist()
            }else{
              this.$message({
                type: 'waring',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }else if(index==2){
        this.$confirm('此操作将移出喜欢, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$delete(this.API.API_DE_LIKE,
          {"user_id":this.user_id,
          'list_id':item.list_id,'music_id':item.music_id}).then(res=>{
            if(res.code===200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getlist()
            }else{
              this.$message({
                type: 'waring',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    colour2 (iszan,id,index) {
      if(iszan){
        this.iscommet[index]['iszan'] = false
        this.$delete(this.API.API_ZAN,
        {'user_id':this.user_id,'commet_id':id}
        ).then(res=>{
          if(res.code == 200){
            this.getzan()
          }
        })
      }else{
        this.iscommet[index]['iszan'] = true
        this.iscommet[index]['msgnumber'] = this.iscommet[index]['megnum'] +1
        this.iscommet[index]['megnum'] = this.iscommet[index]['megnum'] +1
        let data = new FormData()
        data.append('user_id',this.user_id)
        data.append('commet_id',id)
        this.$put(this.API.API_ZAN,data).then(res=>{
          if(res.code == 200){
            this.getzan()
          }
        })
      }

    },
    toCommet(){
      let user_id = localStorage.getItem("user_id");
      if(!user_id){
          this.$message({
            message:"请先登录",
            type: 'warning'
          })
      }else if(!this.text){
        this.$message({
          message:" 请输入文字",
          type: 'warning'
        })
      }else{
        this.$post(this.API.API_POSTCOMMET,
        {"user_id":user_id,"music_id":this.music_id,
        "message":this.text,'megnum':0}).then(res=>{
          if(res.code === 200){
            this.$message({
              message:"评论成功",
              type:"success"
            })
            this.text=''
            this.getCommet()
          }else{
            this.$message({
              message:res.msg,
              type:"warning"
            })
          }
        })
      }
    },
    isnumber(){
      this.num = 100 - this.text.length
    },
    handleCurrentChange(page){
      this.page = page
      this.getCommet()
    },
    getCommet(id,index){
      if (id){
        this.music_id = id
      }
      if(index !=null){
        this.img = this.musiclist[index].img
      }
      this.commet = ''
      this.iscommet = ''
      this.num = 100
      this.$get(this.API.API_COMMET,
      {'page':this.page,'music_id':this.music_id}).then(res=>{
        if(res.code==200){
          this.commet = res.rows
          this.total = res.total
          this.getzan()
        }else{
          this.commet = ''
          this.total = 6
        }
      })
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
        this.music_id = this.musiclist[0].music_id
        this.getCommet()
        this.img = this.musiclist[0].img
      })
    },
    toplay(index,list_id){
      let isOpen = localStorage.getItem('isOpen');
      if(isOpen){
        if(this.type!='0'){
          localStorage.setItem('type',this.type);
          localStorage.setItem('index',index);
        }else{
          localStorage.setItem('list_id',list_id);
          localStorage.setItem('index',index);
        }
      }else{
        if(this.type!='0'){
          window.open("/static/index.html?"+"type="+this.type+"&index="+index);
          localStorage.setItem('isOpen',true)
        }else{
          window.open("/static/index.html?"+"list_id="+list_id+"&index="+index);
          localStorage.setItem('isOpen',true)
        }

      }
    },
    more(value){
        // 点击通往更多新歌或推荐
        this.$router.push('/tolist/'+value+'/0')
        this.getlist()
    },
    open2(value,index) {
        if(index===1){
            this.formdata = new FormData();
            this.formdata.append('list_id', index);
            this.formdata.append('user_id', localStorage.getItem("user_id"));
            this.formdata.append('music_id', value.music_id);
            this.formdata.append('music_name', value.music_name);
            this.formdata.append('singer', value.singer);
            this.formdata.append('src', value.src);
            this.formdata.append('img', value.img);
            this.formdata.append('message', value.message);
            this.formdata.append('album', value.album);
            this.formdata.append('lyric', value.lyric);
            if(value.time){
              this.formdata.append('time', value.time);
            }else{
              this.formdata.append('time', '');
            }
            this.formdata.append('type', value.type);
            this.$put(this.API.API_DE_LIKE,this.formdata).then(res=>{
              if(res.code===200){
                this.$message({
                  message:"默认添加成功",
                  type:'success'
                })
              }else{
                this.$message.error({message:res.msg})
              }
            })
        }else if(index===2){
            this.formdata.append('list_id', index)
            this.formdata.append('user_id', localStorage.getItem("user_id"))
            this.formdata.append('music_id', value.music_id)
            this.formdata.append('music_name', value.music_name)
            this.formdata.append('singer', value.singer)
            this.formdata.append('src', value.src)
            this.formdata.append('img', value.img)
            this.formdata.append('message', value.message)
            this.formdata.append('album', value.album)
            this.formdata.append('lyric', value.lyric)
            if(value.time){
              this.formdata.append('time', value.time);
            }else{
              this.formdata.append('time', '');
            }
            this.formdata.append('type', value.type)
            this.$put(this.API.API_DE_LIKE,this.formdata).then(res=>{
              if(res.code===200){
                this.$message({
                  message:"喜欢添加成功",
                  type:'success'
                })
              }else{
                this.$message.error({message:res.msg})
              }
            })
        }else{
            let isOpen = localStorage.getItem('isOpen');
            if(isOpen){
              localStorage.setItem('music',JSON.stringify(value))
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            }else{
              window.open("/static/index.html?"+"list_id="+value.list_id+"&index="+index);
              localStorage.setItem('isOpen',true)
            }
        }
      },
      get_hot_new(){
          this.$get(this.API.APIMUSIC,
          {'list_id':'7'}).then(res=>{
            this.hot_list = res.data
          })
          this.$get(this.API.APIMUSIC,
          {'list_id':'8'}).then(res=>{
            this.new_list = res.data
          })
        },
        getzan(){
          if(this.user_id){
            this.$post(this.API.API_ZAN,
            {'user_id':this.user_id}).then(res=>{
              if(res.code==200){
                this.zan = res.data
                this.myzan()
              }else{
                this.myzan()
              }
            })
          }
        },
        myzan(){
          this.iscommet = ''
          for(let a in this.commet){
            this.commet[a]['iszan'] = false
          }
          for(let i in this.commet){
            for(let j in this.zan){
              if(this.zan[j].commet_id === this.commet[i].id){
                this.commet[i]['iszan'] = true
              }
            }
          }
          this.iscommet = this.commet
        }
  },
  created () {
      this.getlist()
      this.get_hot_new()
      this.getCommet()
    }
}
</script>

<style scoped>


.list{
  text-align: center;
  width: 80%;
  height: 610px;
  overflow: auto;
}

.islist{
  width:70.5%;
  height:790px;
  /* border-radius: 10px; */
  margin-bottom: 40px;
}
.blur{
  /* transform: translate(-50%, -50%); */
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(20px);
  z-index: -1;
}
.top{
  width:100%;
  height: 250px;
  margin: 0;
  border-bottom:1px dashed rgb(161, 159, 159) ;
}
.top img {
  border-radius: 50%;
  width: 24%;
  height: 75%;
  float: left;
  margin: 20px 0px 0px 50px;
  box-shadow: 0 0 10px rgb(71, 69, 69);
}
.title{
  text-align: left;
  margin-left: 260px;
  width: 40%;
  height: 20px;
}
.li_list{
  position: relative;
  bottom: 100%;
  width: 100%;
  height: 800px;
  overflow:auto;
}
.massge{
  width:29.5%;
  height:800px;
  /* border-radius:10px ; */
  float:right;
  background: url('http://127.0.0.1:8000/static/fon/3.jpg') no-repeat;
  color: aliceblue;
  overflow: auto;
}
 .el-dropdown-link {
    cursor: pointer;
    color: #8d8d8d;
  }
  .el-icon-s-operation {
    font-size: 20px;
  }


.recommend{
  width: 100%;
  height:600px;
}
.recommend ul{
  padding: 0px;
}
.recommend ul li {
  display: block;
  float: left;
}
.list1 img{
  border-radius: 20px;
}
.list1 i {
  font-size: 70px;
  position: absolute;
  bottom: 30%;
  left: 45%;
  color: rgb(192, 192, 192);
}
.recommend .list1:hover{
  transform: scale(1.1);
  box-shadow:5px 5px 10px rgb(85, 84, 84)
}
.recommend .list1{
  /* float: left; */
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.6s;
  width: 74.1%;
  height: 200px;
  box-shadow:5px 5px 10px rgb(136, 135, 135)
}
.recommend h1{
  height: 30px;
  width: 20%;
  color:rgb(109 84 13);
  margin-bottom: 0px;
}
.recommend span{
  width: 100%;
  height: 35px;
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  /* margin-left: 70px;
  margin-top: 10px; */
  margin-top: 3%;
}
.recommend li{
  width: 18.2%;
  height: 24%;
  display: inline-block;
  margin: 1% 0 0 5%;
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

.tab{
  /* margin: 10px auto; */
  width: 100%;
  border-collapse: collapse;
}
.musicTh th{
  width: 25%;
  height: 40px;
  border-bottom:2px solid rgb(82, 80, 80);
  border-radius: 1px;
  text-align: left;
  padding-left: 40px;
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
  text-align: left;
  padding-left: 40px;
  /* display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap; */
}
tr.change:hover {
    background-color:rgb(228, 228, 228,0.5) ;
}
.more{
  float:right;
  padding-right:60px;
  color:rgb(0, 0, 0);
}
.page{
  position: static  ;
  /* top: 500px; */
}
.number{
  color:#e79595;
  /* font-size:20px; */
  /* padding:20px; */
  /* font-weight:bold; 字体加粗*/
  font-size: 10px;
}
.massge div{
  color: #cf8700;
}
.commet{
  /* width: 22.5%; */
  position: static;
  top: 0;
}
.commet a{
  float: left;
  margin-left: 10px;
  color: #a595a7;
  /* font-weight:bold; */
  margin: 0 60px 0 10px;
  font-size:10px;
}
.commet button{
  width: 50px;
  height: 30px;
  margin-top: 50px;
}
.commet button:hover{
  background-color: rgb(107, 107, 81);
}
#textarea{
  max-width:70%;
  max-height:80px;
  min-width:70%;
  min-height:80px;
  float: left;
  font-size: 15px;
  margin-left: 10px;
  color: #8a5117;
}
.commetleft{
  width: 100%;
  overflow:hidden;
  /* display: inline-block; */
  margin-bottom: 20px;
  box-shadow:0 0 5px #000;
  border-radius: 10px;
}
.commleft{
  float: left;
  height: 100%;
  width: 20%;
  /* margin-top: 20px; */
  position: relative;
  top: 90%;
  bottom: 0;
  margin: 0;
}
.commleft img{
  border-radius: 10px;
  box-shadow:2px 2px  4px rgb(136, 135, 135);
  margin-top:20px;
}
.commright{
  width: 80%;
  float: left;
  /* background: rgba(163, 163, 163, 0.1); */
  text-align: left;
  bottom: 0;
}
.pa_commet{
  position: sticky;
  overflow: hidden;
  top: 800px;

}
.hover2 {
  color: rgb(250, 162, 172);
}
.zan i{
  font-size: 22px;
  /* color: rgb(228, 195, 195); */
}
.zan{
  float: right;
  display: inline-block;
  width: 80%;
  text-align: left;
  margin-top: 10px;
}
</style>
