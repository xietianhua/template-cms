
import Home from '../components/commonnet/Home.vue'
import people from '../components/page/people.vue'
import machine from '../components/page/machine.vue'
import notice from '../components/page/notice.vue'
import media from '../components/page/media.vue'
import knowledge from '../components/page/knowledge.vue'
import table from '../components/page/table.vue'
import passLongin from '../components/passLongin.vue'
import mobileLogin from '../components/mobileLogin.vue'




//注释：单页模板是children下面只有一个path，多页折叠则是children下面有多个path
export default [
  {
    path:'/passLongin',
    component:passLongin,
    name:"用户名密码登陆",
  },
  {
    path:'/mobileLogin',
    component:mobileLogin,
    name:'手机号验证码登陆'
  },
  {
    path:'/',
    component:Home,
    icon:"icon iconfont icon-home",
    leaf:false,
    name:"列表展示",
    children:[
      {path:'/table',component:table,name:'列表展示'},
    ]
  },
  {
    path:'/',
    component:Home,
    leaf:true,
    icon:"icon iconfont icon-yonghuguanli1",
    name:"用户管理",
    children:[
      {path:'/people',component:people,name:'人员管理'},
      {path:'/machine',component:machine,name:'机器人管理'}
    ]
  },
  {
    path:'/',
    component:Home,
    leaf:true,
    icon:"icon iconfont icon-xinwen1",
    name:"政务管理",
    children:[
      {path:'/notice',component:notice,name:'通知公告'},
      {path:'/media',component:media,name:'媒体信息'},
      {path:'/knowledge',component:knowledge,name:'知识产权'},
    ]
  },
]
