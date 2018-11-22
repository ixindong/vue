<template>
  <div class="page home makeplancontainer">
      <!-- <Headcommon>组合计划书</Headcommon> -->
      <div class="con">
        <div class='info_in'>
          <h2>家庭成员信息录入</h2>
          <div class="info_in_main">
            <InfoAdd v-for="(val,i) in plans" :listIndex="i" :plans = "plans" :key="i" @delInfo="del"></InfoAdd>
          </div>
          <b @click="addPlan()"><i></i>添加家庭成员</b>
        </div>
        <div class="items">
          <AddMember :plans="plans" :bzPlans="bzPlans" v-if="cshow" @next="closeMain"></AddMember>
          <AddBzPlan :plans="plans" :bzPlans="bzPlans" :suredata="suredata" v-for="(val,i) in bzPlans" :listIndex="i" :key="i" ></AddBzPlan>
          <b @click="chooseMember"><i></i>添加计划书</b>
        </div>
          
      </div>
      <footer>
        <b>首年总保费：<span>{{totalprice.toFixed(2)}}</span></b>
        <i @click="storage">生成计划书</i>
      </footer>
  </div>
</template>
<script>
import InfoAdd from '@/components/InfoAdd';
import AddMember from '@/components/AddMember';
import AddBzPlan from '@/components/AddBzPlan';
import popalert from '@/components/popalert';
import Headcommon from '@/components/headcommon'
export default {
    name: 'makeplan',
    data(){
        return {
            cshow:false,
            update:0,
            plans:[{
              sex:'男',
              sexNum:1,
              uname:'',
              birth:'',
              age:'',
              isActive:true
            }],
            bzPlans:[],
            suredata:''
        }
    },
    computed:{
      totalprice(){
        let s = 0;
        this.bzPlans.map((v,i)=>{
          s=Math.round((s+Number(v.prems))*100)/100;
        })
        return s;
         console.log(s+'呃呃呃呃')
      }
    },
    updated(){
      
    },
    components:{InfoAdd,AddMember,AddBzPlan,popalert,Headcommon},
    methods:{
        addPlan(){
          let suredata = {
            sex:'男',
            uname:'',
            birth:'',
            age:'',
            isActive:true
          }
          this.plans.push(suredata);
        },
        chooseMember(){
          for(let val of this.plans){
            if(val.sex==''||val.uname==''||val.age==''){
              popalert.fade('请完善投被保人信息');
              return;
            }
          }
          this.cshow=true;
        },
        updateInfo(i){

        },
        addBzPlan(){
          let suredata = {
            appage: 0,//投保人年龄 y
            appno: "",//投保人编号
            appsex: "",//投保人性别 y
            insurage: 0,// y
            insursex: "",//y
            operater: "",
            plancode: "0010",//计划的编码
            appname: "",
            prosCode: "",//计划书编码
            insurno: "",
            insurname: "",
            riskname:"",
            risk: [
                
            ],
            mainPro:{
              riskname:'',
              pid:0,
              amnt:'',
              prem:0,
              payendyear:'',
              subriskflag: 'M'
            },
            fujiaPro:[],
            prems:0
          }
          this.bzPlans.push(suredata);
        },
        del(n){
          this.plans.length>1?this.plans.splice(n,1):''
        },
        closeMain(n,t,b,i){
          this.cshow = false;
          if(n==2){
            this.addBzPlan();
            this.bzPlans[this.bzPlans.length-1].appage = t.age;
            this.bzPlans[this.bzPlans.length-1].appsex = t.sex;
            this.bzPlans[this.bzPlans.length-1].appname = t.name;
            this.bzPlans[this.bzPlans.length-1].insurage = b.age;
            this.bzPlans[this.bzPlans.length-1].insursex = b.sex;
            this.bzPlans[this.bzPlans.length-1].insurname = b.name;
          }
        },
        storage(){
          let qnm = localStorage.qnm;
          //判断计划书中是否存在保障计划
          if(this.bzPlans.length==0){
            popalert.fade('请您添加保障计划')
          }else{
            let makePlanBook=()=>{
              let produce={
                ownerName: "",
                operater: "",
                owner: "",
                userid: "admin",
                prems: "",
                shareTimes: 0,
                prosCode: "001",
                readTimes: 0,
                delFlag: "",
                sysSource:"",
                riskname:"",
                plan:[]
                
              };
              
              produce.riskname = this.bzPlans[0].mainPro.riskname;//整个计划书名称
              produce.prems = this.totalprice;//整个计划书总保费
              produce.sysSource = window.sysSource;
              produce.plan=this.bzPlans;
              produce.plan.map((v,i)=>{
                v.risk.push(v.mainPro);
                v.fujiaPro.map((d,j)=>{
                  v.risk.push(d);
                })
                delete v.mainPro;
                delete v.fujiaPro;
              });
              produce.ownerName = this.bzPlans[0].appname;
              //判断页面来源  如果活动页面来源 储存用户信息
              if(common.getRequest().hasOwnProperty('userid','sysSource','customerid','openid','drawLuck')){
                window.userData={};
                ({userid:produce.userid,customerid:produce.customerid,sysSource:produce.sysSource,openid:produce.openid}=common.getRequest());
                ({userid:window.userData.userid,customerid:window.userData.customerid,sysSource:window.userData.sysSource,openid:window.userData.openid,drawLuck:window.userData.drawLuck}=common.getRequest());
                window.sysSource=common.getRequest().sysSource;
                produce.sysSource = window.userData.sysSource;
              }else{
                window.userid=this.$route.params.id;
              }
              produce.userid = window.userid;
              // console.log(produce);
              





              hxajax('pros/create.do',{data:JSON.stringify(produce),survival:qnm},data=>{
                console.log(11111111)
                localStorage.qunima = 1;
                let json = JSON.parse(data);
                console.log(json)
                // console.log(json);
                if(json.result_code==false){
                  popalert.fade(json.result_msg)
                }
                if(json.result_code=='success'){
                  window.bzPlans = this.bzPlans;
                  window.plans = this.plans;
                  window.plancode = json.data;

                  // console.log(window.sysSource)
                  if(window.sysSource=="01"){
                    this.$router.push('/build/'+window.plancode+'/'+window.userid);
                  }else{
                    this.$router.push('/build/'+window.plancode+'/'+window.userid+'?userid='+window.userData.userid+'&openid='+window.userData.openid+'&sysSource='+window.userData.sysSource+'&customerid='+window.userData.customerid+'&drawLuck='+window.userData.drawLuck);
                  }
                }
              });
            }



            this.bzPlans.map((v,i)=>{
              console.log(v.mainPro.prem,i);
              if(v.mainPro.prem==0){
                popalert.fade('请您完善主险信息');
                return;
              }
              if(i==this.bzPlans.length-1){
                makePlanBook();
              }
            });
            //生成计划书
            
          }
        }
    },
    mounted(){
      localStorage.qnm = 1
      // if (typeof WeixinJSBridge == "undefined"){
      //     if( document.addEventListener ){
      //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      //     }else if (document.attachEvent){
      //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
      //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      //     }
      // }else{
      //     onBridgeReady();
      // }

      window.plans = [{
              sex:'男',
              sexNum:1,
              uname:'',
              birth:'',
              age:'',
              isActive:true
            }];
      window.bzPlans = [];
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.home{
    background: @bgGray;
    header{
      h1{background: #fff;color: @black;text-align: center;font-size:1.6em;padding: .4em 0;font-weight: bold;border-bottom: 1px solid #F1F1F1; }
    }
    .con{
      width: 92%;
      margin:0 auto;
      .info_in{
        padding-top: 1.2em;
        h2{background: @mainGreen;color: #fff;height: 2.5em;line-height: 2.5em;padding-left: .7em;font-size: 1.2em;border-radius: 8px;margin-bottom: .8em;}
        b{
          display: block;background: #fff;color: @mainGreen;height: 2.5em;line-height: 2.5em;font-size: 1.2em;border-radius: 8px;margin-top: .8em; border:1px solid @mainGreen;text-align: center;
          i{
            display: inline-block;width: 2.5em;height: 2em;vertical-align: middle;background: url('../assets/images/yadds.png') no-repeat center .1em;background-size: 60%;
          }
        }
      }
      .items{
        b{
          display: block;background: #fff;color: @mainGreen;height: 2.5em;line-height: 2.5em;font-size: 1.2em;border-radius: 8px;margin-top: .8em; border:1px solid @mainGreen;text-align: center;
          i{
            display: inline-block;width: 2.5em;height: 2em;vertical-align: middle;background: url('../assets/images/yadds.png') no-repeat center .1em;background-size: 60%;
          }
        }
      }
    }
    footer{
      background:#fff;height:4em;line-height:4em;margin-top:1em;padding:0 0 0 1.5em;position: relative;
      i{background:@mainGreen;color:#fff;position: absolute;right: 0;width: 8em;text-align: center;height: 100%;}
      b{
        span{
          font-weight: bold;
        }
      }
    }
}
</style>
