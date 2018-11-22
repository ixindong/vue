<template>
  <div class="popup">
      <ul>
        
        <li class="title">选择附加险</li>
        <div class="aaaa">
          
        
        <li>
          <div class="select">
            <p :class="{'active':sel2}" @click="selfjzj(2)" >医保通</p>
          </div>
          <div v-if="sel2">
            <b>保险期间</b>
            <h4  class="selectlh">1年</h4>
          </div>
        </li>
        <li>
          <div class="select">
            <p :class="{'active':sel3}" @click="selfjzj(3)" >聚宝盆</p>
          </div>
          <div v-if="sel3">
            <b>保费</b>
            <input type="text" name="" ref="BaoFei" v-on:input="changeBF"  v-model="JbpBF" placeholder="最低100元，超过应为100整数倍">
          </div>
          <div v-if="sel3">
            <b>领取年龄</b>
            <single-select class="selectlh choose" :opts="LingQAge" v-model="lQage" @change="changeage" ref="LQage" title="请选择" ></single-select><span></span>
          </div>
        </li>
        <li>
          <div class="select">
            <p :class="{'active':sel4}" @click="selfjzj(4)" >金管家F</p>
          </div>

          <div v-if="sel4">

            <b>保费</b>
            <input type="text" name="" ref="BaoFeis" v-on:input="changeBFs" v-model="JGJBF" placeholder="如选择交费，最低10000元">
          </div>
        </li>
        <li v-show="Automatic">
          <div class="select">
            <p :class="{'active':sel6}" @click="selfjzj(6)" id="qunima" v-show="what" >主险福临门的生存金自动转入“聚宝盆”</p>
            <p :class="{'active':sel7}" @click="selfjzj(7)" v-show="whats" >主险福临门的生存金自动转入“金管家F”</p>
          </div>
        </li>
        <li class="qunima">
          <div class="select">
            <p :class="{'active':sel5}" @click="selfjzj(5)" >爱相随</p>
          </div>
          <div v-if="sel5">
            <b>保险期间</b>
            <single-select class="selectlh choose" :opts="InsuranceP" v-model="insurancePM" @change="changeInsuranceP" title="请选择" ></single-select><span></span>
          </div>
          <div v-if="sel5">
            <b>交费期间</b>
            <single-select class="selectlh choose" :opts="paymentP" v-model="paymentPM" @change="changepaymentP" title="请选择" ></single-select><span></span>
          </div>
          <div v-if="sel5">
            <b>基本保额</b>
            <input type="text" name="" ref="BasicBe" v-on:input="changeBasicBe" v-model="BasicBeC" placeholder="最低10000元，超过应为1000整数倍">
          </div>
        </li>
        </div>
        <li class="aaaaaa">
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
    props:['bzPlans','i','suredata','Automaticsss'],
    components:{SingleSelect},
    data(){
      return {
        sel2:false,
        sel3:false,
        sel4:false,
        sel5:false,
        sel6:false,
        sel7:false,
        whats:false,
        what:false,
        Automatic:false,
        duration:'19年',
        durationList:[{'name':'4年'},{'name':'9年'},{'name':'14年'},{'name':'19年'}],
        LingQAge:[{'name':'60周岁'},{'name':'65周岁'},{'name':'70周岁'},{'name':'75周岁'}],
        InsuranceP:[],
        paymentP:[],
        lQage:'',
        insurancePM:'',
        paymentPM:'',
        Baof:'',
        Baofs:'',
        zhuiJ:0,
        BasicBe:'',
        BasicBeC:'',
        JbpBF:'',
        JGJBF:'',
        Additional:true
      }
    },
    mounted(){
      if(this.bzPlans[this.i].fujiaPro.length==0){
        this.sel=false;this.sel2=false;this.sel3=false;this.sel4=false;this.sel5=false;
      }else{
        this.bzPlans[this.i].fujiaPro.map((v,i)=>{
          if(v.pid==201){
            this.sel=true;
          }else if (v.pid==202) {
            this.sel2=true;
          }else if (v.pid==203) {
            this.sel3=true;
            this.Automatic=true
            this.what = true
            this.JbpBF = this.bzPlans[this.i].Baof
            this.lQage = this.bzPlans[this.i].JBPData;
          }else if (v.pid==204) {
            this.whats = true
            this.Automatic=true
            this.sel4=true;
            this.JGJBF = this.bzPlans[this.i].JGJBf;
          }else if (v.pid==205) {
            this.sel5=true;
            this.insurancePM = this.bzPlans[this.i].JGJBfs;
            this.paymentPM = this.bzPlans[this.i].JFQData;
            this.BasicBeC = this.bzPlans[this.i].JFQText;
            if(this.bzPlans[this.i].insurage>=0&&this.bzPlans[this.i].insurage<=40){
                this.InsuranceP = [{'name':'10年'},{'name':'20年'},{'name':'30年'},{'name':'至60周岁'},{'name':'至70周岁'},{'name':'至88周岁'}]
                this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'},{'name':'20年交'},{'name':'30年交'}]
              }else if(this.bzPlans[this.i].insurage>40&&this.bzPlans[this.i].insurage<=50){
                this.InsuranceP = [{'name':'10年'},{'name':'20年'},{'name':'30年'},{'name':'至60周岁'},{'name':'至70周岁'},{'name':'至88周岁'}]
                this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'},{'name':'20年交'}]
              }else if (this.bzPlans[this.i].insurage>50&&this.bzPlans[this.i].insurage<=60) {
                this.InsuranceP = [{'name':'10年'},{'name':'20年'},{'name':'30年'},{'name':'至70周岁'},{'name':'至88周岁'}]
                this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'}]
              }
          }
        })
        
        if(this.bzPlans[this.i].qwerasdsss == true){
          this.sel6 = true
          this.sel7 = false
          localStorage.SAVE_TO = 'R03'
        }else {
          this.sel7 = true
          this.sel6 = false
          localStorage.SAVE_TO = 'R04'
        }
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
      
      changeage(val,x,index){
       this.lQage = this.LingQAge[index].name;
       this.bzPlans[this.i].JBPData = this.lQage;
      },
      changeDuration(){

      },
      changeBF(){
        let BaoFei = this.$refs.BaoFei.value;
        this.Baof = BaoFei;
        this.bzPlans[this.i].fujiaPro.prem = this.Baof
        if(100000<=this.bzPlans[this.i].mainPro.payendyear*this.bzPlans[this.i].mainPro.prem<200000){
          if(BaoFei>this.bzPlans[this.i].mainPro.payendyear*this.bzPlans[this.i].mainPro.prem){
             popalert.fade('追加限额超出规定限额');return;
          }else {
            return;
          }
        }else if (200000<=this.bzPlans[this.i].mainPro.payendyear*this.bzPlans[this.i].mainPro.prem<1000000) {
          if(BaoFei>this.bzPlans[this.i].mainPro.payendyear*this.bzPlans[this.i].mainPro.prem*2){
             popalert.fade('追加限额超出规定限额');return;
          }else {
            return
          }
        }else if (this.bzPlans[this.i].mainPro.payendyear*this.bzPlans[this.i].mainPro.prem>=1000000) {
          if(BaoFei>this.bzPlans[this.i].mainPro.payendyear*this.bzPlans[this.i].mainPro.prem*5){
             popalert.fade('追加限额超出规定限额');return;
          }else {
            return
          }
        }
      },
      changeBFs(){
        let BaoFeis = this.$refs.BaoFeis.value;
        this.Baofs = BaoFeis;

      },
      changeInsuranceP(val,x,index){

        this.insurancePM = this.InsuranceP[index].name;
        this.bzPlans[this.i].JGJBfs = this.insurancePM;
        if(this.insurancePM == '10年'&&0<this.bzPlans[this.i].payendyear<=40){
          this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'}]
        }else if (this.insurancePM == '20年'&&0<this.bzPlans[this.i].payendyear<=40) {
          this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'},{'name':'20年交'}]
        }else if (this.insurancePM == '10年'&&40<this.bzPlans[this.i].payendyear<=50) {
          this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'}]
        }else if (this.insurancePM == '至60周岁'&&40<this.bzPlans[this.i].payendyear<=50) {
          this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'},{'name':'30年交'}]
        }

      },
      changepaymentP(val,x,index){
        this.paymentPM = this.paymentP[index].name;
        this.bzPlans[this.i].JFQData = this.paymentPM;
      },
      changeBasicBe(){
        let BasicBe = this.$refs.BasicBe.value;
        this.BasicBe = BasicBe;
        if(this.BasicBe>200000&&this.bzPlans[this.i].insurage<9&&this.bzPlans[this.i].insurage>0){
          popalert.fade('基本保额不符合填写规则');
          this.BasicBeC = '';
          return;
        }
        if(this.BasicBe>500000&&this.bzPlans[this.i].insurage<17&&this.bzPlans[this.i].insurage>10){
          popalert.fade('基本保额不符合填写规则');
          this.BasicBeC = '';
          return;
        }
      },
      selfjzj(n){
        if(n==2){
          if(this.sel2==false){
            if(this.bzPlans[this.i].insurage>65){
              popalert.fade('被保人年龄应小于65岁才可选择本附加险');return;
            }else if ((this.bzPlans[this.i].mainPro.payendyear).replace(/[^0-9]/ig,"")>=10&&this.bzPlans[this.i].mainPro.prem<10000) {
            	popalert.fade('填写信息不符合搭配医保通规则');return;
            }else if ((this.bzPlans[this.i].mainPro.payendyear).replace(/[^0-9]/ig,"")<10&&this.bzPlans[this.i].mainPro.prem*((this.bzPlans[this.i].mainPro.payendyear).replace(/[^0-9]/ig,"")/10)<10000) {
              popalert.fade('填写信息不符合搭配医保通规则');return;
            }else {
              this.sel2 = true
            }
          }else{
            this.sel2 = false;
          }
        }else if (n==3) {
          if(this.sel3==false){
            if(this.bzPlans[this.i].insurage>70){
              popalert.fade('被保人年龄应小于70岁才可选择本附加险');return;
            }else if (this.bzPlans[this.i].mainPro.prem*this.bzPlans[this.i].mainPro.payendyear<100000) {
              popalert.fade('填写信息不符合搭配聚宝盆规则');return;
            }else {
              this.sel3 = true;
              this.zhuiJ = this.zhuiJ+1
              if(this.zhuiJ == 1){
                this.Automatic = true
                this.sel6 = true
                this.sel7 = false
                this.what = true
                this.bzPlans[this.i].qwerasd = true
                localStorage.qnm = 4;
                localStorage.SAVE_TO = 'R03'
              }else {
                this.whats = true
                this.what = true
              }
            }
          }else{
            this.what = false
            this.sel3 = false;
            this.zhuiJ = this.zhuiJ-1
            if(this.zhuiJ != 1){
              this.Automatic = false
              this.sel6 = false
              this.bzPlans[this.i].qwerasd = false
              localStorage.qnm = 1
            }
          }
        }else if (n==4) {
          if(this.sel4==false){
            if(this.bzPlans[this.i].insurage>70){
              popalert.fade('被保人年龄应小于70岁才可选择本附加险');return;
            }else {
              this.sel4 = true
              this.zhuiJ = this.zhuiJ+1
              if(this.zhuiJ == 1){
                this.Automatic = true
                this.sel7 = true
                this.sel6 = false
                this.whats = true
                this.bzPlans[this.i].qwerasd = true
                localStorage.qnm = 4;
                localStorage.SAVE_TO = 'R04'
              }else {
                this.whats = true
                this.what = true
              }
            }
          }else{
            this.whats = false
            this.sel4 = false;
            this.zhuiJ = this.zhuiJ-1
            if(this.zhuiJ != 1){
              this.Automatic = false
              this.sel6 = false
              this.bzPlans[this.i].qwerasd = false
              localStorage.qnm = 1;
            }
          }
        }else if (n==5) {
          if(this.bzPlans[this.i].insurage>=0&&this.bzPlans[this.i].insurage<=40){
            this.InsuranceP = [{'name':'10年'},{'name':'20年'},{'name':'30年'},{'name':'至60周岁'},{'name':'至70周岁'},{'name':'至88周岁'}]
            this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'},{'name':'20年交'},{'name':'30年交'}]
          }else if(this.bzPlans[this.i].insurage>40&&this.bzPlans[this.i].insurage<=50){
            this.InsuranceP = [{'name':'10年'},{'name':'20年'},{'name':'30年'},{'name':'至60周岁'},{'name':'至70周岁'},{'name':'至88周岁'}]
            this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'},{'name':'20年交'}]
          }else if (this.bzPlans[this.i].insurage>50&&this.bzPlans[this.i].insurage<=60) {
            this.InsuranceP = [{'name':'10年'},{'name':'20年'},{'name':'30年'},{'name':'至70周岁'},{'name':'至88周岁'}]
            this.paymentP = [{'name':'一次交清'},{'name':'5年交'},{'name':'10年交'}]
          }
          if(this.sel5==false){
            if(this.bzPlans[this.i].insurage>60){
              popalert.fade('被保人年龄应小于60岁才可选择本附加险');return;
            }else {
              this.sel5 = true
            }
          }else{
            this.sel5 = false;
          }
        }else if (n==6) {
          if(this.sel6==false){
            this.sel6 = true
            this.sel7 = false
            // this.Additional = false
            localStorage.qnm = 3;
            localStorage.SAVE_TO = 'R03'
            this.bzPlans[this.i].qwerasdsss = true;
          }
        }else if (n==7) {
          if(this.sel7==false){
            this.sel7 = true
            this.sel6 = false
            // this.Additional = false
            localStorage.qnm = 4;
            localStorage.SAVE_TO = 'R04'
            this.bzPlans[this.i].qwerasdsss = false;
          }
        }
        // popalert.fade('主险保费不符合要求，不能购买本附加险');return;

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
              subriskflag: 's',
              ReceiveYear:''
            }
            fjx.riskname=(n==202?'医保通':n==203?'聚宝盆':n==204?'金管家F':n==205?'爱相随':'');
            fjx.pid = n;
            fjx.payendyear=this.bzPlans[this.i].mainPro.payendyear-1+'年';

            let para={age:this.bzPlans[this.i].appage,sex:this.bzPlans[this.i].appsex,payendyear:fjx.payendyear,flag:''}
            if(n==202){
              fjx.amnt='1份';
              fjx.insuYear=1;
              hxajax('rate/ybtRt.do',{age:this.bzPlans[this.i].insurage},data=>{
                let json = JSON.parse(data);
                fjx.prem = json.value;
                fjx.payendyear=1+'年';
              })

            }else if (n==203) {
              let lqagesss = this.lQage
              let lQage = lqagesss.replace(/[^0-9]/ig,"")
              this.JbpBF= this.$refs.BaoFei.value

              if(this.JbpBF!=''&&lQage!=''&&this.sel3==true){
                hxajax('afj/queryAfj.do',{age:this.bzPlans[this.i].insurage,sex:this.bzPlans[this.i].appsex,payendyear:1000,type:'rt',cvrt:'rtjbp',aa:lQage},data=>{
                  let json = JSON.parse(data);
                  let aa = Number(this.JbpBF)
                  fjx.prem = (aa).toFixed(2);
                  fjx.payendyear='趸交';
                  console.log(this.JbpBF+'this.JbpBF')
                  let amntText = this.JbpBF/1000*json.value;
                  console.log(amntText+'amntText')
                  fjx.amnt=amntText;

                  fjx.receiveYear = lqagesss;
                  this.bzPlans[this.i].fujiaPro.Baof = this.JbpBF
                  this.bzPlans[this.i].Baof = this.JbpBF

                })
              }else {
                popalert.fade('请正确填写选中的附加险信息');return;
              }
              
            }else if (n==204) {

                this.Baofs = this.$refs.BaoFeis.value;
                if(this.sel4==true){
                  let asdfg = Number(this.Baofs)
                  fjx.prem = (asdfg).toFixed(2)
                  fjx.payendyear='-';
                  fjx.amnt='-';
                  this.bzPlans[this.i].JGJBf = this.Baofs;
                }
            }else if (n==205&&this.sel5==true) {
              let BXData = this.insurancePM;
              let BXDataText = BXData.replace(/[^0-9]/ig,"")
              let JFData = this.paymentPM
              let JFDataText = 0;
              this.BasicBe= this.$refs.BasicBe.value
              if(JFData == '一次交清'){
                JFDataText = 1000;
              }else {
                JFDataText = JFData.replace(/[^0-9]/ig,"")
              }
              if(BXDataText!=''&&JFData!=''&&JFDataText!=0){
                  hxajax('afj/queryAfj.do',{age:this.bzPlans[this.i].insurage,sex:this.bzPlans[this.i].appsex,payendyear:JFDataText,type:'rt',cvrt:'rtaxs',insuryear:BXDataText},data=>{
                  let json = JSON.parse(data);

                  fjx.amnt = this.BasicBe;
                  this.bzPlans[this.i].JFQText = this.BasicBe;
                  if(JFDataText == 1000){
                    fjx.payendyear='-';
                  }else {
                     fjx.payendyear=JFDataText+'年';
                  }
                  fjx.prem=(this.BasicBe/1000*json.value).toFixed(2);
                  
                })
              }
              else {
                popalert.fade('请正确填写选中的附加险信息');return;
              }
            }

            arr.push(fjx);
            this.bzPlans[this.i].fujiaPro=arr;

      },
      btn(n){
            if((this.JbpBF!=''&&this.JbpBF!=null)&&(this.JbpBF%100!=0||this.JbpBF<100)){
              popalert.fade('请正确填写选中的附加险信息');
              this.JbpBF = null;
              return;
            }else if ((this.JGJBF!=''&&this.JGJBF!=null)&&(this.JGJBF%100!=0||this.JGJBF<10000)) {
                popalert.fade('请正确填写选中的附加险信息');
                this.JGJBF = null;
                return;
            }else if ((this.BasicBeC!=''&&this.BasicBeC!=null)&&(this.BasicBeC%1000!=0||this.BasicBeC<10000)) {
               popalert.fade('请正确填写选中的附加险信息');
                this.BasicBeC = null;
                return;
            }else {
              let fjxlist = [];
              
              this.sel2==true?this.pushFjx(202,fjxlist):'';
              this.sel3==true?this.pushFjx(203,fjxlist):'';
              this.sel4==true?this.pushFjx(204,fjxlist):'';
              this.sel5==true?this.pushFjx(205,fjxlist):'';
              this.$emit('close','cqs');
              this.$emit('close','flm');
            }
            
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.qunima{
  display: block !important;
}
.aaaa{
  width: 90%;
  height: 28em;
  overflow-y: auto;
  padding-bottom: 5em;
  margin:0 auto;
}
.aaaaaa{
  box-sizing: border-box;margin-bottom: 0 !important;position: absolute;bottom: 0;left: 0;width: 100%;border-top: 1px solid @mainGreen;height: 3.7em;line-height: 3.7em;margin-bottom: 0;
        span{
          text-align: center;width: 50%;display: block;float: left;height: 100%;border-radius: 0 0 0 5px ;background: #fff;color: @mainGreen;
          &:last-child{background: @mainGreen;color: #fff;border-radius: 0 0 5px 0}
        }
}
.popup{
  ul{
    width: 90%;
    height: 31em;
    border-radius: 5px;
    background-color: #fff;
    position:absolute;
    left:50%;top: 50%;
    transform:translate(-50%,-50%);
    overflow-y: hidden;
    li{
      // height: 3em;text-align: left;line-height: 3em;
      text-align: left;margin-bottom: 1em;
      &.title{margin-bottom: 0;height: 3em;text-align: center;line-height: 3em;font-weight: bold;font-size: 1.3em;color: @mainGreen;}
      
      b{
        color:@black;font-size: 1em;font-weight: bold;display: inline-block;width: 7em;padding-left: 1.3em;vertical-align: middle;
      }
      .selectlh{
        display: inline-block;font-size: 1em;width:60%;vertical-align: middle;

      }
    }
  }
  .select{
    // position: absolute;width: 70%;top: 4.6em;left: 7em;
    width: 100%;padding-bottom: .5em;
    p{
      line-height: 2em;padding-left:.3em;border-radius: 5px;border:1px solid #eee;
      &.active{
        background: @mainGreen;color:#fff;border:none;
      }
    }
  }
  input{
    display: inline-block;
    font-size: 1em;
    width: 69%;
    // padding-left: .8em;
  }
}
#qunima{
  margin-bottom: 0.5em;
}
</style>
