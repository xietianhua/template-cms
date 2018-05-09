<template>
  <div class="sidebar">
     <el-menu :default-acive="onRoutes" class="el-menu-vertical-demo"   unique-opened router
              background-color="#324157"
              text-color="#fff"
              active-text-color="#209e91"
     >
       <el-menu-item v-for="(item,index) in standalone"  :index="item.children[0].path">
          <i :class="item.icon"></i>
         <span class="sb-cn">{{item.name}}</span>
       </el-menu-item>
       <el-submenu  :index="index+''"  v-for="(item,index) in joint" >
         <template slot="title">
           <i :class="item.icon"></i>
           <span class="sb-cn">{{item.name}}</span>
         </template>
         <el-menu-item v-for="(child,index) in item.children" :index="child.path">{{child.name}}</el-menu-item>
       </el-submenu>
     </el-menu>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        //单节点
         standalone:[],
        //多节点
         joint:[],
       }
    },

    computed:{
      onRoutes(){
        let arr=this.$router.options.routes;
        this.standalone=arr.filter((item)=>{
           return  item.leaf==false
        });
        this.joint=arr.filter((item)=>{
          return item.leaf==true
        });
        return this.$route.path.replace('/','');
      }
    },
  }

</script>


<style scoped>
 .sidebar{
   display: block;
   position: absolute;
   width: 200px;
   left: 0;
   top: 90px;
   bottom:0;
   background: #324157;
 }
  /*这个设置是为了去点导航中多余的部分*/
 .sidebar > ul {
   height:100%;
   width: 100%;
 }
 .iconfont{
   font-size: 20px;
 }

</style>
