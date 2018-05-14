import axios from 'axios'
import qs from 'qs'

//这里开发的时候换成生成环境的数据记住了!
let base="http://192.168.1.188:9999/api";

export const requestLogin =(query)=>{
  return axios({
    method:'post',
    url:`${base}/admin/login`,
    data:qs.stringify(query)
  })
};

export const getDatalist = (query) => {
  return axios({
    method: 'get',
    url: `${base}/user/list/page`,
    params: query
  })
};


// export const getDetailmsg= (query)=>{
//   return axios({
//      method:'get',
//      url:``
//      params:query
//   })
// };



//这是模拟手机登陆
// let baseurl ='http://hainanip.hist.gov.cn/hn_cms/api'
// export const requestLogin =(query)=>{
//   return axios({
//     method:'post',
//     url:`${baseurl}/admin/login`,
//     data:qs.stringify(query)
//   })
// };
//
// export const  getImagecode=()=>{
//   return axios({
//     method: 'get',
//     responseType: 'arraybuffer',
//     url:  `${baseurl}/user/get/img/code`,
//   })
// };
// export const  getvailcodeapi=(query)=>{
//   return axios({
//     method: 'get',
//     params:query,
//     url:  `${baseurl}/user/send/mobile`,
//   })
// };
//
// export const  requestLogin2=(param)=>{
//   return axios({
//     method: 'post',
//     url:  `${baseurl}/user/login/mcode`,
//     headers: {'Content-type': 'application/x-www-form-urlencoded'},
//     data:qs.stringify(param)
//   })
// };





