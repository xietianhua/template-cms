<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
  <div class="content">
    <transition name="fade" mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
  </div>
</template>

<script>
  import VHeader from "./header.vue";
  import VSidebar from './sidebar.vue'
  export default{
    components:{
        VHeader,VSidebar
    }
  }

</script>


<style>
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity .5s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity .5s;
  }
</style>
