<template>
  <div id="app">
  	<!-- <transition :name="enterType"> -->
    	<router-view/>
	<!-- </transition> -->
  </div>
</template>

<script>
// import Navbar from '@/components/Navbar'
// import { mapState } from 'vuex';
export default {
  name: 'app',
  // props: ['forward'],
  // components: {Navbar},
  // next:true,
  // computed: {
  //   ...mapState(['count']),
  //   enterType(){
  //     // return this.forward ? 'slide-left' : 'slide-right';
  //   }
  //   // enterType(){
  //   //   return this.next ? 'slide-left' : 'slide-right';
  //   // }
  
  mounted(){
  	
    $('.loading').addClass('hide').css('zIndex',-1);
  }
}
</script>
<style lang="less">
  @import url(./assets/css/main.less);
</style>

