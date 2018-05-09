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
      console.log(this.$route.matched[0].name);
      return{
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
