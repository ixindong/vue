<template>
  <div class="popup">
      <ul>
        <li class="title">选择附加险</li>
        <li v-show="isShowOne">
          <div class="select">
            <p :class="{'active':sel}" @click="selfjzj(1)" >华夏附加投保人豁免保费重大疾病保险</p>
          </div>
          <div v-if="sel">
            <b>保险期间</b>
            <h4  class="selectlh">{{(bzPlans[i].mainPro.payendyear).replace(/[^0-9]/ig,"")-1+'年'}}</h4>
          </div>
        </li>
        <li v-show="isShowTwo">
          <div class="select">
            <p :class="{'active':sel2}" @click="selfjzj(2)" >华夏医保通费用补偿医疗保险</p>
          </div>
        </li>
        <li>
          <span @click="btn(1)">取消</span>
          <span @click="btn(2)">确定</span>
          
        </li>
      </ul>
  </div>
</template>
<script>
import SingleSelect from './SingleSelect'

export default {
    // name: 'addfjx',
    props:['bzPlans','i','suredata'],
    components:{SingleSelect},
    data(){
      return {
        sel:false,
        sel2:false,
        duration:'19年',
        durationList:[{'name':'4年'},{'name':'9年'},{'name':'14年'},{'name':'19年'}],
        isShowOne:false,
        isShowTwo:false,
        isShowThree:false,
        isShowFour:false,
        isShowFive:false
      }
    },
    mounted(){
      if(this.bzPlans[this.i].mainPro.pid == 103){
        this.isShowTwo = true
        this.isShowThree = true
        this.isShowFour = true
        this.isShowFive = true
      }else {
        this.isShowOne = true
        this.isShowTwo = true
        this.isShowFive = true
      }
      // console.log(this.bzPlans[this.i]);
      if(this.bzPlans[this.i].fujiaPro.length==0){
        this.sel=false;this.sel2=false;
      }else{
        this.bzPlans[this.i].fujiaPro.map((v,i)=>{
          v.pid==201?this.sel=true:this.sel2=true;
        })
      }
      this.bzPlans[this.i].fujiaPro=[];
      // let i = this.bzPlans[this.i].mainPro.pid;
      // this.bxList={'201':'华夏附加常青树重大疾病保险（全能版）'};
      // $('.select').on('click','p',function(){
      //   $(this).toggleClass('active');
      // })
    },
    beforeMount(){
        
    },
    updated(){
      // $('.select p:first-child').addClass('active');
    },
    methods:{
      changeBx(val,x,index){

      },
      changeDuration(){

      },
      selfjzj(n){
        if(n==1){
          if(this.sel==false){
            
            let payendyeareplace = Number((this.bzPlans[this.i].mainPro.payendyear).replace(/[^0-9]/ig,""))
            console.log(payendyeareplace+this.bzPlans[this.i].appage-1)
            if(this.bzPlans[this.i].appname==this.bzPlans[this.i].insurname&&this.bzPlans[this.i].appsex==this.bzPlans[this.i].insursex &&this.bzPlans[this.i].appage==this.bzPlans[this.i].insurage){
              popalert.fade('投保人与被保人不为同一人才可选择本附加险');return;
            }else if(this.bzPlans[this.i].appage<18){
              popalert.fade('投保人年龄应大于18岁才可选择本附加险');return;
            }else if((payendyeareplace+this.bzPlans[this.i].appage-1)>69){
              popalert.fade('投保人年龄+主合同交期期间-1应不大于69周岁');return;
            }else{
              this.sel = true;
            }
          }else{
            this.sel = false;
          }
        }else if(n==2){
          if(this.sel2==false){
            let payendyeareplace = Number((this.bzPlans[this.i].mainPro.payendyear).replace(/[^0-9]/ig,""))
            if(this.bzPlans[this.i].insurage>65){
              popalert.fade('被保人年龄应小于65岁才可选择本附加险');return;
            }else if(this.bzPlans[this.i].mainPro.prem>=3000&&(this.bzPlans[this.i].mainPro.payendyear).replace(/[^0-9]/ig,"")>=10&&payendyeareplace!=1000){
              // popalert.fade('投保人年龄+主合同交期期间-1应不大于69周岁');return;
              this.sel2 = true;return;
            }else if(this.bzPlans[this.i].mainPro.prem*(payendyeareplace==1000?1:payendyeareplace)>=3000&&payendyeareplace<10){
              this.sel2 = true;return;
            }else{
              this.sel2 = true;
            }
          }else{
            this.sel2 = false;
          }
        }
        

        // n==1?(this.sel = !this.sel):(this.sel2 = !this.sel2)
      },
      //添加附加险
      pushFjx(n,arr){
        let fjx={
              riskname:'',
              amnt:'',
              pid:'',
              prem:0,
              insuYear:'',
              payendyear:'',
              subriskflag: 's'
            }
            fjx.riskname=(n==201?'华夏附加投保人豁免重大疾病保险':n==202?'华夏医保通费用补偿医疗保险':'');
            fjx.pid = n;
            fjx.payendyear=(this.bzPlans[this.i].mainPro.payendyear).replace(/[^0-9]/ig,"")-1+'年';
            
            let para={age:this.bzPlans[this.i].appage,sex:this.bzPlans[this.i].appsex,payendyear:fjx.payendyear,flag:''}
            if(n==201){
              para.flag=3;
              fjx.amnt=this.bzPlans[this.i].mainPro.prem;
              fjx.insuYear=fjx.payendyear;
              hxajax('rate/queryRt.do',para,data=>{
                let json = JSON.parse(data);
                console.log(json);
                if(json.success){
                  fjx.prem = Math.round(fjx.amnt*json.value/1000*100)/100;
                }
              })
            }else if(n==202){
              fjx.amnt='1份';
              fjx.insuYear=1;
              hxajax('rate/ybtRt.do',{age:this.bzPlans[this.i].insurage},data=>{
                let json = JSON.parse(data);
                // console.log(json);
                fjx.prem = json.value;
                fjx.payendyear=1+'年';
              })
            }
            arr.push(fjx);
            this.bzPlans[this.i].fujiaPro=arr;
            // console.log(this.bzPlans[this.i])
      },
      btn(n){
        let fjxlist = [];
        this.sel==true?this.pushFjx(201,fjxlist):'';
        this.sel2==true?this.pushFjx(202,fjxlist):'';
        this.$emit('close','cqs');
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.popup{
  ul{
    width: 90%;
    min-height: 25em;
    border-radius: 5px;
    background-color: #fff;
    position:absolute;
    left:50%;top: 50%;
    transform:translate(-50%,-50%);
    li{
      // height: 3em;text-align: left;line-height: 3em;
      text-align: left;margin-bottom: 1em;
      &.title{margin-bottom: 0;height: 3em;text-align: center;line-height: 3em;font-weight: bold;font-size: 1.3em;color: @mainGreen;}
      &:last-child{
        box-sizing: border-box;position: absolute;bottom: 0;left: 0;width: 100%;border-top: 1px solid @mainGreen;height: 3.7em;line-height: 3.7em;margin-bottom: 0;
        span{
          text-align: center;width: 50%;display: block;float: left;height: 100%;border-radius: 0 0 0 5px ;background: #fff;color: @mainGreen;
          &:last-child{background: @mainGreen;color: #fff;border-radius: 0 0 5px 0}
        }
      }
      b{
        color:@black;font-size: 1em;font-weight: bold;display: inline-block;width: 7em;padding-left: 1.3em;vertical-align: middle;
      }
      .selectlh{
        display: inline-block;font-size: 1em;width:70%;vertical-align: middle;

      }
    }
  }
  .select{
    // position: absolute;width: 70%;top: 4.6em;left: 7em;
    width: 80%;padding-left: 1em;padding-bottom: .5em;
    p{
      line-height: 2em;padding-left:.3em;border-radius: 5px;
      &.active{
        background: @mainGreen;color:#fff;
      }
    }
  }
}

</style>
