<template>
  <div class="page home">
      <!-- <header>
          <h1>组合计划书获客</h1>
      </header> -->
      <div class='show'>
          <h2><span></span><b></b>累计获客<b></b><span></span></h2>
          <p>{{gusNum}}</p>
          <p><a  @click="makeplan()">去做计划书</a></p>
      </div>
      <div class="plist">
        <h2>计划书记录</h2>
        <ul>
          <li v-for="(v,i) in planlist" :key="i">
            <div :class="['itemleft',{'active':v.active+i}]" @click="toBuild(v.prosCode,v.readTimes)" :key="i">
              <h3>{{v.ownerName}}</h3>
              <h3>{{v.riskname}}</h3>
              <h5>保费：{{v.prems}}元</h5>
              <span>{{v.createTime}}</span>
              <b v-if="v.readTimes==0?false:true">已阅读</b>
            </div>
            <div class="itemright" @click="delplan(v.prosCode,i)">删除</div>
          </li>
          <!-- <li>
            <h3>Sabrina</h3>
            <h4>华夏常青树重大疾病保险计划（全能版）</h4>
            <h5>保费：200000.00元</h5>
            <span>2017-11-16</span>
            <b>已阅读</b>
          </li>
          <li>
            <h3>Sabrina</h3>
            <h4>华夏常青树重大疾病保险计划（全能版）</h4>
            <h5>保费：200000.00元</h5>
            <span>2017-11-16</span>
            <!-- <b>已阅读</b> -->
          <!--</li> -->
        </ul>
      </div>
  </div>
</template>
<script>
// import PopalertV from '@/components/popalertV';
// import banner from '@/components/Banner';
// import HomeShare from '@/components/HomeShare';
// import HomeBar from '@/components/HomeBar';
// import HomeHot from '@/components/HomeHot';
// import HomeZX from '@/components/HomeZX';
// import {myDataFlag} from '@/components/mixins';

export default {
    name: 'home',
    data(){
        return {
            gusNum:'0',
            swipe:'',
            planlist:[]
        }
    },
    methods:{
        makeplan(){
          this.$router.push('/makeplan/'+window.userid);
        },
        delplan(code,i){
          hxajax('pros/del.do',{prosCode:code},data=>{
            let json = JSON.parse(data);
            if(json.result_code=='success'){
              this.planlist.splice(i,1);
              this.planlist=[];
              let para = {'userid':window.userid}
              hxajax('pros/prosList.do',para,data=>{
                let json = JSON.parse(data);
                this.planlist = json.data;
                // console.log(json.data)
              });
            }
          })
        },
        toBuild(code,readTimes){
          let flag = readTimes==0?0:1;
          this.$router.push('/build/'+code+'/'+window.userid);
          localStorage.qunima = 0;
        }
    },
    mounted(){
       // if (typeof WeixinJSBridge == "undefined"){
       //      if( document.addEventListener ){
       //          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
       //      }else if (document.attachEvent){
       //          document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
       //          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
       //      }
       //  }else{
       //      onBridgeReady();
       //  }

      let userid = common.getRequest().userid;window.userid=userid;
      //({userid:window.userid} = common.getRequest());
      window.sysSource = '01';
      if(common.getRequest().sysSource){
        window.sysSource = common.getRequest().sysSource;
      }
      // console.log(window.sysSource);
      let para = {'userid':userid}
      hxajax('pros/prosList.do',para,data=>{
        let json = JSON.parse(data);
        this.planlist = json.data;
        console.log(json.data);
      });
      hxajax('pros/custnum.do',para,data=>{
        let json = JSON.parse(data);
        this.gusNum = json.data.readTimes||0;
      });

    },
    updated(){
      let itemlefts = $('div.itemleft');
      for(let i=0;i<itemlefts.length;i++){
        let hammerswip = new Hammer(itemlefts[i]);
        hammerswip.on('panleft',()=>{
          $(itemlefts[i]).addClass('active');
        });
        hammerswip.on('panright',()=>{
          $(itemlefts[i]).removeClass('active');
        })
      }
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.home{
    background: @bgGray;
    .show{
      background: #fff;height: 12.5em;
      h2{
        text-align: center;
        padding: 1.3em 0;
        color: #BBBBBB;
        font-size: 1.2em;
        span,b{display: inline-block;}
        span{
          width: 3em;border-bottom: 1px solid #F1F1F1;vertical-align: middle;
          &:first-child{margin-right: 1em;}
          &:last-child{margin-left: 1em;}
        }
        b{
          border: 1px solid #F1F1F1;vertical-align: middle;
          &:first-child{margin-right: 1em;}
          &:last-child{margin-left: 1em;}
        }
      }
      p{
        font-size: 2em;text-align: center;color: #1F1F1F;margin-top: -0.3em;
        a{
          display: inline-block;background: @mainGreen;font-size: .6em;width: 6.5em;height: 2.5em;line-height: 2.5em;margin-top: 1em;color: #fff;border-radius: 6px;
        }
      }
    }
    .plist{
      div{
        display: inline-block;transition: all .2s linear;
      }
      .itemleft{
        width: 80%;position: relative;
        &.active{
          margin-left: -15%;
        }
      }
      .itemright{
        background: @mainGreen;
        text-align: center;
        color: #fff;
        width: 15%;
        font-size: 1.2em;
        height: 4.3em;
        line-height: 4.3em;
      }
      h2{padding: .4em 1em;font-size: 1.2em;color: @fontGray;}
      ul{
        background: #fff;padding-left: 1em;overflow: hidden;
        li{
          border-bottom: 1px solid #C8EAD6;position: relative;overflow: hidden;width: 124%;
          &:last-child{border-bottom: none;}
          h3,h4{color: @black;font-weight: bold;font-size: 1.2em;}
          h5{font-size: 1.2em;padding-bottom: .5em;color: @fontGray;}
          h3{
            &:first-child{
              padding-top: .4em;
            }
          }
          span{position: absolute;top: 22%;right: 1em;color: @fontGray;transform:translateY(-50%);}
          b{font-size: .8em;position: absolute;top:50%;right: 1.5em;transform:translateY(-50%);color: #fff;background: @mainGreen;padding:0 .6em;border-radius:1em}
        }
      }
    }
}
</style>
