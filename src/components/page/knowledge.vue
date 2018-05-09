<template>
  <div>
    <v-pageTitle :msg="pathMessage"></v-pageTitle>

  </div>
</template>
<script>
  import vPageTitle from '../commonnet/pagetitle.vue'
  export default {
    components:{
      vPageTitle
    },
    data(){
      return{
        //这一块是同父子间的组件将值给传递过去，给父组件使用
        pathMessage:{
          vtitle:this.$route.matched[1].name,
          subtitle:this.$route.matched[0].name
        }
      }
    }
  }

</script>

<style>

</style>

