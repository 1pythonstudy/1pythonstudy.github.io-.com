
import axios from 'axios'
import qs from 'qs'
import element from 'element-ui'
import router from '../../router'

Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  return fmt
}
// respone拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return error.data
})
axios.defaults.withCredentials = true


function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg)
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg)
  }
  // console.log('loadding')
  return res
}

function timestampToTime() {
  let date = new Date(),
    Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = date.getDate() + ' ',
    h = date.getHours() + ':',
    m = date.getMinutes() + ':',
    s = date.getSeconds()
  return Y + M + D + h + m + s
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url,
      // changeOrigin:true,
      // data: qs.stringify(data),
      data:JSON.stringify(data),
      timeout: 15000,
      dataType:"json",
      headers: {
         'content-type':' application/json',
      }
    }).then(
      (response) => {
        if(response.status == "301") {
          // vm.message(true,data.msg,'error')
          element.Message({
            message: response.msg,
            type: 'error'
          })
          setTimeout  (function() {
            router.push({path: '/login'})
          }, 3000)
          clearTimeout();
          return ;
        }
        return response
      }
    ).then(
      (res) => {
        return res
      }
    )
  },

  upload(url, data) {
    let form = new FormData()
    Object.keys(data).forEach(value => {
      form.append(value, data[value])
    })
    return axios({
      method: 'post',
      // baseURL: process.env.BASE_API,
      url,
      data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      timeout: 15000,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(
      (response) => {
        return response
      }
    ).then(
      (res) => {
        return res
      }
    )
  },

  get(url, params) {

    return axios({
      method: 'get',
      headers:{
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        'Accept': 'application/json',
      },
      // baseURL: process.env.BASE_API,
      url,
      params, // get 请求时带的参数
      timeout: 15000
    }).then(
      (response) => {
        return response
      }
    ).then(
      (res) => {
        return res
      }
    )
  },
  delete(url, params) {

    return axios({
      method: 'delete',
      url,
      data:JSON.stringify(params), // get 请求时带的参数
      dataType:'json',
      headers:{
        'content-type':' application/json',
      },

      // baseURL: process.env.BASE_API,

      timeout: 15000
    }).then(
        (response) => {
          return response
        }
    ).then(
        (res) => {
          return res
        }
    )
  },
  put(url, data) {
    return axios({
      method: 'put',
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
      },
      dataType: "json",
      processData: false,  // 不处理数据
      contentType: false,
      baseURL: process.env.BASE_API,
      url,
      data,
      timeout: 15000
    }).then(
      (response) => {
        return response
      }
    ).then(
      (res) => {
        return res
      }
    )
  },
  time(tamp) {
    return timestampToTime(tamp)
  }
}
