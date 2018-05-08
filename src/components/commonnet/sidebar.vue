<template>
  <div class="sidebar">
     <el-menu :default-acive="onRoutes" class="el-menu-vertical-demo"   unique-opened router
              background-color="#324157"
              text-color="#fff"
              active-text-color="#209e91"
     >
       <el-menu-item v-for="(item,index) in standalone"  :index="item.children[0].path">
         <span class="sb-icon"><i class="material-icons">home</i></span>
         <span class="sb-cn">{{item.name}}</span>
       </el-menu-item>

       <el-submenu :index="index++" v-for="(item,index) in joint">
         <template slot="title">
           <span class="sb-icon"><i class="material-icons">perm_data_setting</i></span>
           <span class="sb-cn">{{item.name}}</span>
         </template>
         <!--<el-menu-item v-for="(list,index) in "></el-menu-item>-->
       </el-submenu>






       <el-submenu index="notice">
         <template slot="title">
           <span class="sb-icon"><i class="material-icons">perm_data_setting</i></span>
           <span class="sb-cn">政务中心</span>
         </template>
         <el-menu-item index="notice">notice</el-menu-item>
         <el-menu-item index="media">media</el-menu-item>
         <el-menu-item index="knowledge">knowledge</el-menu-item>
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
        console.log(this.$route.path);
        console.log(this.$router.options.routes)
        let arr=this.$router.options.routes;
        this.standalone=arr.filter((item)=>{
           return  item.leaf==false
        });
        console.log(this.standalone);
        this.joint=arr.filter((item)=>{
          return item.leaf==true
        });
        return this.$route.path.replace('/','');
      }
    },
//    mounted:{
//      console.log(this.$router.options.routes)
//   }
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

</style>
