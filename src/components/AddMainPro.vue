<template>
  <div class="popup">
    <div class="bgblack"></div>
      <ul>
        <li class="title">选择主险</li>
        <li>
          <b>选择主险</b>
          <single-select class="selectlh choose" :opts="bxList" v-model="bxname" @change="changeBx" title="请选择" :age="age" ></single-select><span></span>
        </li>
        <li>
          <b>保障期间</b>
          <input class="selectlh" value="终身" disabled="disabled">
        </li>
        <li>
          <b>交费期间</b>
          <single-select class="selectlh choose" :opts="durationList" ref="JiaoF" v-model="duration" @change="changeDuration" title="请选择交费期间" ></single-select><span></span>
        </li>
        <li v-show="isShow">
          <b>保额</b>
          <input class="selectlh amntWrite" @focus="jdgIos(1)" @blur="jdgIos(2)" ref="BaoE">
        </li>
        <li v-show="isShows">
          <b>保费</b>
          <input class="selectlh amntWrite"  @focus="jdgIos(1)" @blur="jdgIos(2)" ref="BaoF">
        </li>
        <li>
          <b @click="btn(1)">取消</b>
          <b @click="btn(2)">确定</b>
          
        </li>
      </ul>
  </div>
</template>
<script>
import SingleSelect from './SingleSelect'
import popalert from './popalert';
export default {
    name: 'addmainpro',
    props:['i','bzPlans'],
    components:{SingleSelect,popalert},
    data(){
      return {
        age:'',
        BaoE:'',
        bxname:'',
        duration:'',
        durationList:[{'name':'趸交'},{'name':'3年'},{'name':'5年'},{'name':'10年'},{'name':'20年'}],
        bxIndex:0,
        bxList:[{'name':'常青树(全能版)'},{'name':'常青树(2016)'},{'name':'福临门(吉祥版)'}],
        isIos:false,
        tcheight:0,
        isShow:false,
        isShows:false,
      }
    },
    mounted(){

      this.bzPlans[this.i].mainPro.amnt=10000;//初始化保额

      //判断手机系统
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf('micromessenger') != -1;
      var isAndroid = ua.indexOf('android') != -1;
      this.isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
      // popalert.fade(ua)

      if(this.isIos){
          let winHeight=$(window).height();
          this.tcheight=winHeight;
      }else{
          // $('#mainContentShow').removeClass('main');
      }
      
    },
    beforeMount(){
        this.age = this.bzPlans[this.i].insurage;
        console.log(this.age)
    },
    methods:{
      jdgMainLen(){//主险记录为空时初始化保险名称和保额
        [this.bzPlans[this.i].mainPro.amnt,this.bxname,this.duration]=['10000'];
      },
      jdgIos(n){
        // console.log(this.isIos,n);
        if(this.isIos&&n==1){
          // let winHeight=$('.popup').height();
          $('.popup').css('position','absolute');
          // $('.popup ul').css('marginTop',$('body').scrollTop()/2);
          $('.popup ul').css({
            'top':$('body').scrollTop()+280
          });
          $('body').css("overflow","hidden");
        }else if(this.isIos&&n==2){
          $('.popup').css('position','fixed');
          // $('.popup ul').css('marginTop',0);
          $('.popup ul').css({
            'top':'50%'
          });
        }
      },
      changeDuration(val,x,index){
        this.duration = this.durationList[index].name;
      },//选择险种，记录选中id
      changeBx(val,x,index){
        this.bxname = this.bxList[index].name;
        // this.bxIndex = index;
        this.bzPlans[this.i].mainPro.riskname=this.bxList[index].name;
        // this.bzPlans[this.i].mainPro.pid=index==0?101:102;
        if(index == 0){
          this.bzPlans[this.i].mainPro.pid=101
          this.isShow = true
          this.isShows = false
        }else if(index == 1){
          this.bzPlans[this.i].mainPro.pid=102
          this.isShow = true
          this.isShows = false
        }else{
          if(this.bzPlans[this.i].insurage>60){
            this.bxname = null
            popalert.fade('被保人年龄超过60岁不能选择福临门');return;

          }else {
            this.bzPlans[this.i].mainPro.pid=103
            this.isShow = false
            this.isShows = true
          }
          
        }
        this.resetDuration();
      },//重置保险期间
      resetDuration(){
        if(this.bzPlans[this.i].mainPro.pid==101){//常青树全能版对应的保险期间重置
          let age = this.bzPlans[this.i].insurage;
          this.age = this.bzPlans[this.i].insurage;
          this.durationList=age<=45?[{'name':'趸交'},{'name':'3年'},{'name':'5年'},{'name':'10年'},{'name':'20年'}]:[{'name':'趸交'},{'name':'3年'},{'name':'5年'}];
          this.duration=this.durationList[this.durationList.length-1].name;
        }else if(this.bzPlans[this.i].mainPro.pid==102){//常青树2016对应的保险期间重置
          let age = this.bzPlans[this.i].insurage;
          this.age = this.bzPlans[this.i].insurage;
          this.durationList=age<=55?[{'name':'5年'},{'name':'10年'},{'name':'15年'},{'name':'20年'}]:[{'name':'5年'},{'name':'10年'}];
          this.duration=this.durationList[this.durationList.length-1].name;
        }else{
          let age = this.bzPlans[this.i].insurage;
          this.age = this.bzPlans[this.i].insurage;
          this.durationList=age<=55?[{'name':'趸交'},{'name':'3年'},{'name':'5年'},{'name':'10年'}]:[{'name':'趸交'},{'name':'3年'},{'name':'5年'}];
          this.duration=this.durationList[this.durationList.length-1].name;
        }
      },
      btn(n){
        $("body").unbind('touchmove');
        let amnt = this.bzPlans[this.i].mainPro.amnt;
        // let d =this.bzPlans[this.i].mainPro.pid==101?{'趸交':1000,'3年':3,'5年':5,'10年':10,'20年':20}[this.duration]:{'5年':5,'10年':10,'15年':15,'20年':20}[this.duration];
        let d = ''
        if(this.bzPlans[this.i].mainPro.pid==101){
          d = {'趸交':1000,'3年':3,'5年':5,'10年':10,'20年':20}[this.duration]
        }else if(this.bzPlans[this.i].mainPro.pid==102){
          d = {'5年':5,'10年':10,'15年':15,'20年':20}[this.duration]
        }else{
          d = {'趸交':1000,'3年':3,'5年':5,'10年':10}[this.duration]
        }
        if(n==2){
          if(this.isShow==true){
            if(this.bzPlans[this.i].mainPro.pid&&amnt&&this.duration){
              //判断保险金额
              if(amnt<10000){
                popalert.fade('最低保险金额为10000元');this.bzPlans[this.i].mainPro.amnt='';return;
              }else if(amnt%1000!=0){
                popalert.fade('超出10000元部分应为1000的整数倍');this.bzPlans[this.i].mainPro.amnt='';return;
              }else {
                this.bzPlans[this.i].mainPro.amnt = this.$refs.BaoE.value
              }
            }else{
              popalert.fade('请完善主险信息');return;
            }
          }else {
            let BaoFs = this.$refs.BaoF.value;
            let BaoFTime = this.duration
            
           
            if(BaoFTime=='趸交'){
              this.bzPlans[this.i].mainPro.prem = Number(BaoFs);
            }else {
              this.bzPlans[this.i].mainPro.prem = Number(BaoFs)
            }
             console.log(this.bzPlans[this.i].mainPro.prem)
            if(this.bzPlans[this.i].mainPro.pid&&this.duration&&BaoFs){
              if(BaoFs%500!=0){
                popalert.fade('超出10000元部分应为1000的整数倍');this.$refs.BaoF.value=10000;return;
              }else if (BaoFs<10000) {
                popalert.fade('最低保险金额为10000元');this.$refs.BaoF.value=10000;return;
              }
            }else{
              popalert.fade('请完善主险信息');return;
            }
          }
          
        }
        this.$emit('next',n,d);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.popup{right:0px; bottom:0px;
  ul{
    padding:0 1em;
    width: 90%;
    height: 20em;
    border-radius: 5px;
    background-color: #fff;
    position:fixed;
    left:50%;top: 45%;
    transform:translate(-50%,-50%);
    li{
      height: 3em;text-align: left;line-height: 3em;border-bottom: 1px solid #f0f0f0;position: relative;
      &.title{height: 2em;text-align: center;line-height: 2.3em;font-weight: bold;font-size: 1.3em;color: @mainGreen;border-bottom: none;}
      &:last-child{
        box-sizing: border-box;position: absolute;bottom: 0;left: 0;width: 100%;border-top: 1px solid @mainGreen;height: 3.7em;line-height: 3.7em;border-bottom: none;
        b{
          text-align: center;width: 50%;display: block;float: left;height: 100%;background: #fff;color: @mainGreen;
          &:last-child{background: @mainGreen;color: #fff;border-radius: 0 0 5px 0}
        }
      }
      b{
        color:@black;font-size: 1em;font-weight: bold;display: inline-block;width: 6em;vertical-align: middle;height: 2.9em;
      }
      .selectlh{
        display: inline-block;font-size: 1em;width:70%;padding-left: 2em;padding-left: .8em;
        &.choose{
          background:url('../assets/images/ydrop.png') no-repeat right center;background-size: 9%;
        }
      }
    }
  }
}

</style>
