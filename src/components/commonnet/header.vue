<template>
  <div class="header">
    <el-row :gutter="10">
      <!--LOGO区域-->
      <el-col :xs="12" :sm="12" :md="4">
          <div class="logo">
             <span class="logo_prefix">Tianhua</span><span class="logo_suffix">Admin</span>
          </div>
      </el-col>
      <!--搜索区域-->
      <el-col :xs="12" :sm="12" :md="8">
         <div class="search">
           <el-input placeholder="请输入内容"  >
             <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
         </div>
      </el-col>
      <!--头部右边区域-->
      <el-col :xs="8" :sm="8" :md="{span:2,offset: 6}">
        <div class="header-right">
          <el-col :span="10">
             <!--消息的下拉列表用了element的drown-->
            <el-dropdown placement="bottom-start">
              <span>
                <el-badge :value="5" class="item">
                   <i class="el-icon-message"></i>
                </el-badge>
              </span>
              <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item>
                   <span class="pop-title">You have new message!</span>
                 </el-dropdown-item>
                 <el-dropdown-item v-for="dialog in dialogs" :key="dialog.time" divided>
                     <div class="pop-div">
                       <span class="pop-image">
                         <!--{{dialog.header}}-->
                         <img :src="dialog.header" width="50px">
                       </span>
                       <span class="pop-content">
                         {{dialog.content}}
                       </span>
                        <span class="pop-time">
                          {{dialog.time}}分钟前面
                        </span>
                   <span></span>
                 </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="8">
            <el-dropdown  placement="bottom-start" >
                            <span >
                                <el-badge :value="3" class="item">
                                    <i class="el-icon-date"></i>
                                </el-badge>
                            </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item >
                  <span class="pop-title">You have new tasks! </span>
                </el-dropdown-item>
                <el-dropdown-item v-for="task in tasks" :key="task.id" divided>
                  <div class="task-div">
                                        <span class="task-span task-tag">
                                        <el-tag type="danger" v-if="task.rank==1">紧急</el-tag>
                                        <el-tag type="warning" v-if="task.rank==2">重要</el-tag>
                                        <el-tag type="success" v-if="task.rank==3">正常</el-tag>
                                        </span>
                    <span class="task-span task-content">
                                        {{task.content}}<br/>
                                        <span class="task-time">截止：{{task.overTime}}</span>
                                        </span>
                    <span class="task-span task-btn"><el-button type="primary" size="mini">完成</el-button></span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </div>
      </el-col>
       <!--用户头像模块-->
      <el-col :xs="8" :sm="8" :md="{span:2,offset:2}">
         <div class="user-header">
           <el-dropdown trigger="click" placement="bottom-start">
             <!--<img src="../../../static/image/b_header.jpg" width="50px" />-->
             <p class="name">
                 {{username}}
             </p>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item >
                 <div class="setting-div">
                   <i class="icon iconfont icon-gerenziliao"></i>
                   <span class="setting-string"> Profile 个人</span>
                 </div>
               </el-dropdown-item>
               <el-dropdown-item divided>
                 <div class="setting-div">
                   <i class="icon iconfont icon-shezhi"></i>
                   <span class="setting-string"> Settings  设置</span>
                 </div>
               </el-dropdown-item>
               <el-dropdown-item divided>
                 <div class="setting-div">
                   <i class="icon iconfont icon-tuichu"></i>
                   <span class="setting-string" @click="signOut"> Sign out  退出</span>
                 </div>
               </el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
         </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        username:JSON.parse(sessionStorage.getItem('user')),
        dialogs:[
          {header:'../../static/image/b_header2.jpg',content:'我有一个Style样式需要您帮忙处理以下。',time:'3'},
          {header:'../../static/image/b_header3.jpg',content:'中午一起吃个饭吧，我请客。',time:'15'},
          {header:'../../static/image/b_header.jpg',content:'需要处理一下POP展示的白边样式。',time:'18'},
          {header:'../../static/image/b_header2.jpg',content:'下午3点开需求会议，准时参加。',time:'24'},
          {header:'../../static/image/b_header3.jpg',content:'晚上我开车送你回家，你请我吃晚饭。',time:'45'},
        ],
        tasks:[
          {id:1,rank:1,content:'完成JSPangAdmin头部头部组件的编写。',overTime:'2017/3/9'},
          {id:2,rank:2,content:'完成GitHub仓库的初始化工作。',overTime:'2017/3/15'},
          {id:3,rank:3,content:'在阿里云进行网站备案，完成后通知组长。',overTime:'2017/3/20'}
        ]
      }
    },
    methods:{
      signOut(){
        this.$router.push('/mobileLogin')
      },
    }

  }
</script>



<style>
  .header{
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height:90px;
    font-size: 14px;
    line-height: 90px;
    background-color:#324157;
    box-shadow:2px 0 3px rgba(0,0,0,.5);
    z-index:1000;
    padding:0 32px 0 40px;
    overflow:hidden;
  }
  .header .logo{
    float: left;
    cursor: pointer;
    font-size: 22px;
  }

  .logo_prefix{
    color: #209e91;
  }
  .logo_suffix{
    color:#fff;
  }
  .header .search{
    float: left;
    color:#fff;
    font-size:14px;
  }
  .header-right{
    padding-top: 25px;
    line-height: 10px;
  }
  .header-right span{
    display:inline-block;
    margin-left: 14px;
    font-size: 28px;
    color: #fff;
    line-height: 12px;
    height: 18px;
    cursor: pointer;
  }
  .header-right span:hover{
    color:#209e91;
  }
  .user-header{
    line-height:10px;
    padding-top:7px;
    font-size:12px;
    cursor: pointer;
  }
  .user-header img{
    border-radius:50%;
    cursor:pointer;
  }
  .pop-image{
    display:block;
    float:left;
  }
  .pop-image img{
    border-radius:50%;
  }
  .pop-div{
    height:55px;
    clear:both;
  }
  .pop-content{
    display:block;
    font-size:12px;
    line-height:14px;
    padding-top:15px;
    margin-left:60px;
  }
  .pop-time{
    display:block;
    float:right;
    font-size:10px;
    color:#ccc;

  }
  .pop-title{
    font-size:12px;
    color:#209e91;
  }
  .task-div{
    clear:both;
    height:55px;
  }
  .task-span{
    display:block;
    float:left;
    font-size:12px
  }
  .task-content{
    width:160px;
    line-height:16px;
    margin-left:10px;
    padding:5px;
  }
  .task-time{
    clear:both;
    float:right;
    color:#ccc;

  }

  .name{
    width: 60px;
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    text-align: center;
    background: #f0f3f4;
    border-radius: 50%;
    margin-top: 10px;
  }
  .setting-div{
    height:30px;
    line-height:30px;
    clear:both;
  }
  .setting-div span{
    display:block;
    float:right;
    font-size:16px;
  }
  .icon{
    padding-top:3px;
    padding-right:3px;
    font-size: 16px;
  }
</style>
