import axios from 'axios'
import qs from 'qs'

let base="http://192.168.1.188:9999/api";

export const requestLogin =(query)=>{
  return axios({
    method:'post',
    url:`${base}/admin/login`,
    data:qs.stringify(query)
  })
};
