<template>
  <div class="page-title">
     <div class="pt-left"><h2>{{vtitle}}</h2></div>
     <div class="pt-right">
       <span class="pt-subtitle">{{subtitle}}</span>
       <span>/</span>
       <span class="caption">{{vtitle}}</span>
     </div>
  </div>
</template>


<script>

  export default {
    props:["msg"],
    data(){
      return{
        vtitle:this.msg.vtitle,
        subtitle:this.msg.subtitle
      }
    }
  }
</script>

<style>
  .page-title{
    clear: both;
    height: 55px;
  }
  .pt-left{
    float: left;
  }
  .pt-right{
    float: right;
  }
  .pt-subtitle{
    font-size: 16px;
    color:#209e91;
  }


</style>
