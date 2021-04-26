var serverBase = 'http://127.0.0.1:8000'
// var serverImg = 'http://192.168.3.87:6161'
export default {
  BASE_SERVER_URL: serverBase+'/',
  //实现导航栏
  API_navigation:serverBase + '/home/navigation/index/',
  //实现推荐歌曲
  API_STRSTRIMG:serverBase + '/home/tuijian/sti/',
  //获取音乐
  API_GETMUSIC:serverBase + '/home/tuijian/list/',
  // 登录用
  userId:"",
  //个人
  API_SET_USER:serverBase +"/home/user/index/",
  //登录
  API_login:serverBase +"/home/user/login/",
  //歌词
  API_Lyr:serverBase +"/home/index/lry/",
  //注册
  API_REGISTER:serverBase +"/home/user/register/",
  // 获取默认和喜欢
  API_DE_LIKE:serverBase +"/home/index/de_like/",
  //获取音乐
  APIMUSIC:serverBase +"/home/index/music/",
  //获取排行榜
  API_RANKLIST:serverBase +"/home/rank/music/",
  //获取电台
  API_RADIO:serverBase +"/home/search/radio/",
  //个性列表
  API_LIST:serverBase +"/home/index/list/",
  //获取评论
  API_COMMET:serverBase +"/home/commet/commet/",
  //添加评论
  API_POSTCOMMET:serverBase +"/home/commet/commet/",
  //点赞
  API_ZAN:serverBase +'/home/commet/zan/',
}
