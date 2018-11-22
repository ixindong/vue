<template>
    <div class="page">
        <!-- <Headcommon>组合计划书</Headcommon> -->
        <div class="bgGreen">
            <div class="con">
                <img src="../assets/images/start.png" alt="">
                <span>{{num}}</span>
                <a @click="stopTiming"></a>  
                <b>敬呈{{tname}}{{sir}}</b>
            </div>
        </div>
    </div>
</template>
<script>
import Headcommon from '@/components/headcommon'
export default {
    name: 'startbook',
    data(){
        return {
            num:3,
            tname:'**',
            sir:'先生',
            timer:''
        }
    },
    computed:{
        
    },
    components:{ Headcommon },
    methods:{
        timing(){
            this.num = this.num-1;
            if(this.num == 0){
                clearInterval(this.timer);
                this.$router.push('/build/'+window.plancode+'/'+window.userid);
            }
        },
        stopTiming(){
            clearInterval(this.timer);
            this.$router.push('/build/'+window.plancode+'/'+window.userid);
        }
    },
    mounted(){

         if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
          }else{
              onBridgeReady();
          }
        // console.log(window.bzPlans,window.plans)
        this.tname = window.bzPlans[0].appname;
        this.sir = window.bzPlans[0].appsex=="M"?'先生':'女士';
        this.timer = setInterval(this.timing,1000);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.page{display: flex; flex-direction:column;}
header{
  h1{background: #fff;color: @black;text-align: center;font-size:1.6em;padding: .4em 0;font-weight: bold;border-bottom: 1px solid #F1F1F1; }
}
.bgGreen{
    background:@mainGreen;padding: 1.5em 1.5em 6em 1.5em;position:relative;flex-grow:1;
    img{width:100%;height:37em;}
    span{
        position:absolute;width:1.3em;background:#fff;text-align:center;font-size:1.5em;border-radius:5px;top:26.5em;left:50%;margin-left:-.5em;
    }
    a{width: 4.5em;height: 4.5em;position: absolute;top: 27em;left:50%;margin-left: -2.25em;border-radius: 50%;}
    b{
        position: absolute;top:23em;left:50%;color: #442409;font-size: 1.4em;transform:translateX(-50%);
    }
}
</style>
