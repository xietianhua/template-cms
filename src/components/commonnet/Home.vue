<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
  <div class="content">
    <transition name="fade" move="out-in">
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

</style>
