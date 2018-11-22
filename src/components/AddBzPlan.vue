<template>
  <div class="contain">
      <h2>第 {{this.listIndex+1}} 份计划书<span @click="delbzplan">删除</span></h2>
      <ul class="block1">
        <li>投/被保险人</li>
        <li><b>投保人</b><span>{{bzPlans[listIndex].appname}}</span></li>
        <li><b>被保险人</b><span>{{bzPlans[listIndex].insurname}}</span></li>
      </ul>
      <div class="con2">
        <h2 class="block2">
          <div>选择主险
            <span v-show="add" class="add" @click="addMainInfo">添加</span>
            <span v-show="!add" class="del" @click="delMainInfo">删除</span>
          </div>
          
        </h2>
        <add-main-pro v-show="mainProShow" :i = 'listIndex'  :bzPlans="bzPlans" @next ="reqBF" ref="jdgMain"></add-main-pro>
        <!-- <forecast-cqs v-show="product.cqs" :i = 'listIndex'  :bzPlans="bzPlans" @next ="reqBF"></forecast-cqs>  
        <forecast-cqs2016 v-show="product.cqs2016" :i = 'listIndex' :plans="plans" :bzPlans="bzPlans" @next ="reqBF"></forecast-cqs2016>  -->
        <div class="panel" v-if="mainXExist">
          <div class="mainName">
            <h2 class="mainTitle">
              <p>{{bzPlans[listIndex].mainPro.pid==101?'常青树（全能版）':bzPlans[listIndex].mainPro.pid==102?'常青树2016':'福临门（吉祥版）'}}</p>
              <p>首年保费：{{bzPlans[listIndex].mainPro.prem.toFixed(2)}}元</p>
              <span @click="changeInfo">修改</span>
            </h2>
          </div>
          <ul class="tableList">
            <li>
              <span>险种</span>
              <span>保额</span>
              <span>首年保费</span>
              <span>交费期间</span>
            </li>
            <li>
              <span>{{bzPlans[listIndex].mainPro.riskname}}</span>
              <span>{{parseInt(bzPlans[listIndex].mainPro.amnt)}}</span>
              <span>{{bzPlans[listIndex].mainPro.prem.toFixed(2)}}元</span>
              <span>{{bzPlans[listIndex].mainPro.payendyear==1000?"趸交":bzPlans[listIndex].mainPro.payendyear}}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="con2">
        <h2 class="block2">
          <div>选择附加险
            <span v-show="add2" class="add" @click="addFjInfo">添加</span>
            <span v-show="!add2" class="del" @click="delFj">删除</span>
          </div>
        </h2>
        <add-fjx-cqs v-if="fjx.cqs" :suredata='suredata' :bzPlans='bzPlans' :i='listIndex' @close="close"></add-fjx-cqs>
        <AddFjxFlm v-if="fjx.flm" :suredata='suredata' :bzPlans='bzPlans' :Automaticsss='Automaticsss' :i='listIndex' @close="close"></AddFjxFlm>
        <div class="panel" v-if="fujiaXExist">
          <div class="mainName">
            <h2 class="mainTitle fujiaTitle">
              <p>附加险</p>
              <p>首年保费：{{fjprem.toFixed(2)}}元</p>
              <span @click="addFjInfo">修改</span>
            </h2>
          </div>
          <ul class="tableList">
            <li>
              <span>险种</span>
              <span>保额</span>
              <span>首年保费</span>
              <span>交费期间</span>
            </li>
            <li v-for="item in bzPlans[listIndex].fujiaPro">
              <span>{{item.riskname}}</span>
              <span>{{item.amnt}}</span>
              <span>{{item.prem}}元</span>
              <span>{{item.payendyear}}</span>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
import ForecastCqs from './ForecastCQS'
import AddMainPro from './AddMainPro'
import ForecastCqs2016 from './ForecastCQS2016'
import AddFjxCqs from './AddFjxCqs'
import AddFjxFlm from './AddFjxFlm'
// import AddFjxCqs2016 from './AddFjxCqs2016'
export default {
    name: 'addbzplan',
    props:['bzPlans','listIndex','plans','suredata'],
    components:{ForecastCqs,AddFjxCqs,ForecastCqs2016,AddMainPro,AddFjxFlm},
    data(){
        return {
            add:true,
            add2:true,
            mainXExist:false,
            fujiaXExist:false,
            pid:'',
            mainProShow:false,
            Automaticsss:true,
            product:{
              cqs:false,
              cqs2016:false,
              flm:false
            },
            fjx:{
              cqs:false,
              cqs2016:false,
              flm:false
            }
          }
    },
    computed:{
      fjprem(){
        let prems=0;
        this.bzPlans[this.listIndex].fujiaPro.map((v,i)=>{
          prems=Math.round((prems+Number(v.prem))*100)/100;
        })
        this.bzPlans[this.listIndex].prems=Math.round((prems+this.bzPlans[this.listIndex].mainPro.prem)*100)/100;
        return prems;
      }
    },
    updated(){
      
    },
    methods:{
        changeInfo(){
          this.mainProShow=true;
          this.add=false;
        },
        addMainInfo(){
          this.mainProShow=true;
          if(this.bzPlans[this.listIndex].mainPro.length==0){
            this.bzPlans[this.listIndex].mainPro={
              riskname:'',
              pid:0,
              amnt:'',
              prem:0,
              payendyear:'',
              subriskflag: 'M'
            };
            this.$refs.jdgMain.jdgMainLen();
          }
        },
        addFjInfo(){
          if(this.bzPlans[this.listIndex].mainPro.prem){
            let id = this.bzPlans[this.listIndex].mainPro.pid;

            if(id == 103){
              this.fjx['cqs'] = false;
              this.fjx['flm'] = true;
            }else {
              this.fjx['cqs'] = true;
              this.fjx['flm'] = false;
            }
            
          }else{
            popalert.fade('请您完善主险信息');
          }
          
        },
        delMainInfo(){
          this.bzPlans[this.listIndex].mainPro=[];this.mainXExist=false;this.add=true;
        },
        delFj(){
          let premText = [];
          $.each(this.bzPlans[this.listIndex].fujiaPro, function(index, el) {
              premText.push(Number(el.prem))
          })
          function sum(arr) {
              var s = 0;
              for (var i=arr.length-1; i>=0; i--) {
                  s += arr[i];
              }
              return s;
          }
          sum(premText)
          this.bzPlans[this.listIndex].prems = this.bzPlans[this.listIndex].prems - sum(premText);
          this.bzPlans[this.listIndex].fujiaPro=[];
          this.add2=true;
          this.fujiaXExist=false;

        },
        reqBF(n,d){
          if(d==1000){
            this.bzPlans[this.listIndex].mainPro.payendyear = '趸'
          }else {
            this.bzPlans[this.listIndex].mainPro.payendyear = d+'年'
          }
          
          let pid = this.bzPlans[this.listIndex].mainPro.pid;
          this.bzPlans[this.listIndex].mainPro.insuYear='1000';
          let para = {};
          // if(pid==101){
          //   this.product.cqs = false;
          // }else if(pid==102){
          //   this.product.cqs2016 = false;
          // }
          this.mainProShow=false;//隐藏主险选择框
          para.payendyear=d;
          para.age=this.bzPlans[this.listIndex].insurage;
          para.sex=this.bzPlans[this.listIndex].insursex;
          para.flag=(pid==101?2:pid==102?1:'');
          if(n==2){
            if(pid == 103){
              
              let BaoFs = this.bzPlans[this.listIndex].mainPro.prem;
              let payendyear =  this.bzPlans[this.listIndex].mainPro.payendyear;

              let age = this.bzPlans[this.listIndex].insurage;
              let sex = this.bzPlans[this.listIndex].insursex;
              let paras = {}
                paras.age = age;
                paras.sex=sex;
                paras.payendyear=payendyear;
                paras.type = 'rt';
                paras.cvrt = 'rtflm';
                hxajax('afj/queryAfj.do',paras,data=>{
                  let json=JSON.parse(data);
                  this.bzPlans[this.listIndex].mainPro.amnt = BaoFs/1000*json.value
                  this.mainXExist=true;
                  this.add = false;
                })
                this.bzPlans[this.listIndex].prems=this.bzPlans[this.listIndex].mainPro.prem;//计算单个计划总保费
                
                
            }else {
              console.log(this.bzPlans[this.listIndex].mainPro.amnt+'保额')
              hxajax('rate/queryRt.do',para,data=>{
              let json=JSON.parse(data);
              this.bzPlans[this.listIndex].mainPro.prem = Math.round(json.value*this.bzPlans[this.listIndex].mainPro.amnt/1000*100)/100;
              if(this.bzPlans[this.listIndex].fujiaPro.length>0){
                this.bzPlans[this.listIndex].fujiaPro=[];this.add2=true;this.fujiaXExist=false;//初始化附加险
              }
              this.mainXExist=true;
              this.add = false;
              this.bzPlans[this.listIndex].prems=Math.round((this.fjprem+this.bzPlans[this.listIndex].mainPro.prem)*100)/100;//计算单个计划总保费
            })
            }
            
            
          }
        },
        delbzplan(){
          this.bzPlans.splice(this.listIndex,1);
        },
        close(evn){
          this.fjx[evn] = false;
          this.fujiaXExist = this.bzPlans[this.listIndex].fujiaPro.length!=0?true:false;
          this.add2=this.bzPlans[this.listIndex].fujiaPro.length!=0?false:true;
        }

    },
    mounted(){
      // this.bzPlans[this.listIndex].mainPro.prem!=''?this.mainXExist=true:this.mainXExist=false;
      // this.bzPlans[this.listIndex].fujiaPro[0].name!=''?this.fujiaXExist=true:this.fujiaXExist=false;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.contain{
  width: 100%;padding-top: 1em;
  h2{
    background: @mainGreen;color: #fff;min-height: 2.5em;line-height: 2.5em;padding:0 .7em;font-size: 1.2em;border-radius: 8px;margin-bottom: .8em;position: relative;
    &.block2{
      background: #fff;color: @black;font-weight: bold;margin-bottom: 0;border-width: 90%;
      div{border-bottom: 1px solid #eee;}
      span{
        color:@mainGreen;font-weight: normal;
        &.add{background:url('../assets/images/yadds.png') no-repeat left center;background-size: 30%;}
        &.del{background:url('../assets/images/ydel.png') no-repeat left center;background-size: 30%;}
      }
    }
    &.mainTitle{
      background:#fff;color: @black;line-height: 1em;padding:1em .7em 0 2.3em;
      background: url('../assets/images/ymain.png') no-repeat .5em .8em;
      background-size: 6%;
      &.fujiaTitle{
        background: url('../assets/images/yfujia.png') no-repeat .5em .8em;background-size: 6%;
      }
      p{
        display: inline-block;width: 70%;color:@gray;margin-bottom: .2em;
        &:first-child{color: @black;font-weight: bold;margin-bottom: .4em;}
      }
      span{
        padding-left: 1.3em;background:url('../assets/images/yupdate.png') no-repeat left center;background-size: 30%;color: @mainGreen;position: relative;top: -0.4em;
      }
    }
    span{
      float: right;padding-left: 1.3em;background:url('../assets/images/ydel2.png') no-repeat left center;background-size: 30%;
    }
  }
  .block1{
    background: #fff;
    border-radius: 8px;
    border:1px solid @mainGreen;
    margin-bottom: 1em;
    padding: 0 .7em;font-size: 1.2em;
    li{
      height:3.7em;line-height: 3.7em;border-bottom: 1px solid #eee;
      &:last-child{border-bottom: none;}
      &:first-child{height: 2em;line-height: 2em;font-weight: bold;color: @black;}
      b{
        display: inline-block;width: 5em;font-weight: bold;color: @black;
      }
      span{display: inline-block;}
    }
  }
  .con2{
    border: 1px solid @mainGreen;background: #fff;margin-bottom: 1em;border-radius: 8px;
    .panel{padding-bottom: 1em;}
    // h2{border-bottom: 1px solid @gray;}
  }
  .tableList{
    width: 95%;margin:0 auto;border: 1px solid @bgGray;
    li{
      color: @black;border-top: 1px solid @bgGray;display: flex;padding: 1em 0;
      &:first-child{background: @bgGray;border-top:none;}
      span{
        flex-grow:1;width: 25%;text-align: center;height: 100%;font-size: 0.9em;
      }
    }
  }
}
</style>
