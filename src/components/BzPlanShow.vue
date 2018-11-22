<template>
    <div class="bzplanshow">
        <div class="con">
            <div class="con_main_title">
                <h2 @click="slide" :class="{'active':conshow1}">第 {{listIndex+1}} 份计划书 <span></span></h2>
                <div class="con_list" v-show="conshow1">
                    <ul>
                    <li>{{insurname}} {{insursex}}  {{insurage+'岁'}}</li>
                    <li>
                        <div class="r">
                            <p>交费期间</p>
                            <p><span>{{payendyear}}</span>年交</p>
                        </div>
                        <div class="t">
                            <p>保障期间</p>
                            <span>终身</span>
                        </div>
                    </li>
                    <li>
                        <div class="b">
                            <p>首年保费</p>
                            <p><span>{{prems}}</span>元</p>
                        </div>
                        <div class="t">
                            <p>保险金额</p>
                            <p><span>{{amnt}}</span>元</p>
                        </div>
                    </li>
                    <div style="clear: both;border:none;"></div>
                </ul>
                <ol class="tableList">
                    <li>
                      <span class="xz">投保险种</span>
                      <span class="je">保额</span>
                      <span class="qx">保险/交费期限</span>
                      <span class="bf">首年保费</span>
                    </li>
                    <li v-for="v in plan.risk">
                      <span class="xz">{{v.riskname}}</span>
                      <span class="je">{{v.amnt}}</span>
                      <span class="qx">{{v.insuYear==1000?'终身/':(v.insuYear==''?'-/':v.insuYear+'/')}}{{v.payendyear=='趸交'?'趸交':v.payendyear}}</span>
                      <span class="bf">{{Math.round(v.prem)}}元</span>
                    </li>
                  </ol>
                </div>
            </div>
        </div>
        <div class="con2" v-show="conshow1">
            <div class="con_main_title">
                <h3>保障内容</h3>
            </div>
            <div>
                <show-cqs v-if="product.cqs" :amnt="amnt" :prem="prem" :totalprems="mainProPrem"></show-cqs>
                <show-cqs2016 v-if="product.cqs2016" :amnt="amnt" :prem="prem"></show-cqs2016>
                <show-attach v-if="product.attach"></show-attach>
                <show-flm v-if="product.flm" :amnt="amnt" :prem="prem" :totalprems="mainProPrem" :flmAge="insurage" :flmsg="flmsg" :zhus="zhus"></show-flm>
                <show-jbp v-if="product.jbp" :amnt="amnt" :prem="prem" :jbpsg="jbpsg" :totalprems="mainProPrem" :baoe="baoe" :lqnl="lqnl"></show-jbp>
                <show-jgj v-if="product.jgj" :amnt="amnt" :prem="prem" :totalprems="mainProPrem" :jgjsg="jgjsg"></show-jgj>
                <show-ybt v-if="product.ybt"></show-ybt>
                <show-axs v-if="product.axs" :amnt="amnt" :prem="prem" :totalprems="mainProPrem" :baoea="baoea"></show-axs>
                
                
            </div>
            <div>
                <show-zj :version="greenVersion"></show-zj>
            </div>
            <!-- <div v-show="Zhuijia">
                <ShowZhuijia :plan="plan" :plancodeText="plancodeText" />
            </div> -->
            <div class="con_main_title" v-show="interest">
                <h3>保单利益</h3>
            </div>
            <div v-show="interest">
                <ShowInterest :plan="plan" :plancodeText="plancodeText" />
            </div>
        </div>
        <div class="con2" v-show="conshow1">
            <div class="con_main_title">
                <h3 class="clause" @click="showItems">条款详情 <span></span></h3>
            </div>
        </div>
        <div class="fixedcon" v-show="items">
            <div class="acon">
                <h2>
                    <b>条款列表</b><i @click="closeItem"></i>
                </h2><div>
                <ul class="list">
                    <li v-if="product.cqs2016"><a href="./static/docs/cqs/cqs2016.pdf" target="_blank">华夏常青树重大疾病保险（2016）</a></li>
                    <li v-if="product.cqs"><a href="./static/docs/cqs/lqcqs.pdf" target="_blank">华夏常青树两全保险（全能版）条款</a></li>
                    <li v-if="product.cqs"><a href="./static/docs/cqs/fjcqs.pdf" target="_blank">华夏附加常青树重大疾病保险（全能版）条款</a></li>
                    <li v-if="product.attach"><a href="./static/docs/hm/hmall.pdf" target="_blank">华夏附加投保人豁免保费重大疾病保险条款</a></li>
                    <li v-if="product.flm"><a href="./static/docs/flm/flm.pdf" target="_blank">华夏福临门年金保险（吉祥版）条款</a></li>
                    <li v-if="product.jbp"><a href="./static/docs/flm/jbp.pdf" target="_blank">华夏聚宝盆养老年金保险条款</a></li>
                    <li v-if="product.jgj"><a href="./static/docs/flm/jgj.pdf" target="_blank">华夏金管家养老年金保险（万能型，F款）条款</a></li>
                    <li v-if="product.ybt"><a href="./static/docs/ybt/ybt.pdf" target="_blank">华夏医保通费用补偿医疗保险条款</a></li>
                    <li v-if="product.axs"><a href="./static/docs/flm/axs.pdf" target="_blank">华夏爱相随定期寿险条款</a></li>
                    <!-- <li v-if="product.cqs2016"><pdf src="./static/docs/cqs/cqs2016.pdf" target="_blank">华夏常青树重大疾病保险（2016）</pdf></li>
                    <li v-if="product.cqs"><pdf src="./static/docs/cqs/lqcqs.pdf" target="_blank">华夏常青树两全保险（全能版）条款</pdf></li>
                    <li v-if="product.cqs"><pdf src="./static/docs/cqs/fjcqs.pdf" target="_blank">华夏附加常青树重大疾病保险（全能版）条款</pdf></li>
                    <li v-if="product.attach"><pdf src="./static/docs/cqs/hmall.pdf" target="_blank">华夏附加投保人豁免保费重大疾病保险条款</pdf></li>
                    <li v-if="product.ybt"><pdf src="./static/docs/cqs/ybt.pdf" target="_blank">华夏医保通费用补偿医疗保险条款</pdf></li> -->
                </ul>
                </div>
            </div>
        </div>
        <!-- <div class="fixedcon"> -->
            <!-- <div class="acon"> -->
                <!-- <pdf class="pdfshow" v-if="pdf.cqs2016" src="./static/docs/cqs/cqs2016.pdf" target="_blank">华夏常青树重大疾病保险（2016）</pdf> -->
                <!-- <pdf v-if="pdf.cqs" src="./static/docs/cqs/lqcqs.pdf" target="_blank">华夏常青树两全保险（全能版）条款</pdf>
                <pdf v-if="pdf.cqs" src="./static/docs/cqs/fjcqs.pdf" target="_blank">华夏附加常青树重大疾病保险（全能版）条款</pdf>
                <pdf v-if="pdf.attach" src="./static/docs/cqs/hmall.pdf" target="_blank">华夏附加投保人豁免保费重大疾病保全规则</pdf>
                <pdf v-if="pdf.ybt" src="./static/docs/cqs/ybt.pdf" target="_blank">华夏医保通费用补偿医疗保险条款</pdf> -->
            <!-- </div> -->
            
        <!-- </div> -->
        <!-- <div>
            <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
            <div style="width: 100%">
              <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
              <pdf v-if="show" ref="pdf" scale="2" src="./static/docs/cqs/cqs2016.pdf" :page="page" :rotate="rotate" @password="password" @progress="loadedRatio = $event" @error="error" @numPages="numPages = $event"></pdf>
            </div>
          </div> -->
    </div>
</template>
<script>
// import Headcommon from '@/components/headcommon'
// import BzPlanShow from '@/components/BzPlanShow'
import ShowCqs from './ShowCqs'
import ShowCqs2016 from './ShowCqs2016'
import ShowZj from './ShowZj'
import ShowYbt from './ShowYbt'
import ShowAttach from './ShowAttach'
import InstructCqs from './InstructCqs'
import InstructCqs2016 from './InstructCqs2016'
import ShowJbp from './Showjbp'
import ShowJgj from './Showjgj'
import ShowAxs from './Showaxs'
import ShowInterest from './ShowInterest'
import ShowZhuijia from './ShowZhuijia'
import ShowFlm from './ShowFlm'
// import pdf from 'vue-pdf'
export default {
    name: 'bzplanshow',
    props:['plan','listIndex','conshow','plancodeText'],
    components:{ShowCqs,ShowCqs2016,ShowAttach,ShowYbt,ShowZj,InstructCqs,InstructCqs2016,ShowJbp,ShowJgj,ShowAxs,ShowInterest,ShowZhuijia,ShowFlm},
    data(){
        return {
            // conshow:false,
            zhus:'',
            flmAge:'',
            jbpfirstMon:'',
            firstMon:'',
            jbpsg:'',
            flmsg:'',
            jgjsg:'',
            lqnl:'',
            baoea:'',
            baoe:'',
            Zhuijia:false,
            ZhuijiaText:'',
            show: true,
            interest:false,
            dataInfo:[],
            prem:0,
            amnt:0,
            prems:0,
            mainProPrem:'',
            mainProPremsss:'',
            greenVersion:'',
            payendyear:'',
            totalprems:'',
            insurname:'',
            insurage:'',
            insursex:'',
            conshow1:false,
            items:false,
            product:{
                cqs:false,
                cqs2016:false,
                attach:false,
                ybt:false,
                zj:false,
                jbp:false,
                jgj:false,
                axs:false,
                flm:false
                
            },
            pdf:{
                cqs:false,
                cqs2016:false,
                attach:false,
                ybt:false
            }
        }
    },
    computed:{

    },
    watch:{
         
    },
    methods:{
    //      password: function(updatePassword, reason) {

    //   updatePassword(prompt('password is "test"'));
    // },
    // error: function(err) {

    // },
        
        showItems(){
            this.items=true;
        },
        closeItem(){
            this.items=false;
        },
        slide(){
            let el=$('.bzplanshow')[this.listIndex];
            let h=$(el).offset().top;
            $('body,html').scrollTop(270);
            this.$emit('closeFold',this.listIndex);
            this.conshow1=this.conshow[this.listIndex];
        },
        bname(){

        },
        changeFold(){
            this.conshow1=this.conshow[this.listIndex];
        }
    },
    created(){
       
    },
    beforeMount(){

        hxajax('interest/findById.do',{prosId:this.plan.prosCode,type:1},data=>{
          let json = JSON.parse(data);
          if(json.data.spare1 == 1){
            this.Zhuijia = false;
          }else {
             this.Zhuijia = true;
             if(json.data.spare1==3){
                this.ZhuijiaText = '聚宝盆'
             }else if (json.data.spare1==4) {
                 this.ZhuijiaText = '金管家'
             } 
          }
        })
       if(this.plan.risk[0].pid==103){
        this.interest = true;
       }else {
           this.interest = false;
       }
       this.conshow1=this.conshow[this.listIndex];
       let risk = this.plan.risk;
       this.prems = this.plan.prems;
       this.insurname =this.plan.insurname;
       this.insursex =this.plan.insursex=="M"?'男':'女';
       this.insurage =this.plan.insurage;
       let prems = 0;
       let totalprems = 0;//主副险全部总和
       
       // let payendyearText = this.plan.payendyear
       // console.log(payendyearText)
       console.log(this.baoe)
       for(let v of risk){
        v.pid=='101'?this.product.cqs=true:v.pid=='102'?this.product.cqs2016=true:v.pid=='201'?this.product.attach=true:v.pid=='202'?this.product.ybt=true:v.pid=='203'?this.product.jbp=true:v.pid=='204'?this.product.jgj=true:v.pid=='205'?this.product.axs=true:v.pid=='103'?this.product.flm=true:'';
            
            prems=Math.round((prems+Number(v.prem))*100)/100;
            if(v.bf){
                // totalprems+=Number(v.bf)
            }else{
                // totalprems+=Number(v.prem)
            }
            if(v.subriskflag=='M'){
                this.payendyear = v.payendyear;
                this.amnt = v.amnt;
                totalprems+=Math.round(Number(v.prem)*Number(v.payendyear)*100)/100;
            }
            this.prem = v.prem;
            if(v.pid==103){
                // this.zhus = prems*payendyearText
            }
            if(v.pid==204){
                this.firstMon = v.prem
                console.log(this.firstMon)
            }
            if(v.pid==203){
                this.jbpfirstMon = v.prem
                this.baoe = v.amnt;
                console.log(this.jbpfirstMon)
            }
            if(v.pid==205){
                this.baoea = v.amnt
            }
            if(v.receiveYear!=''){
                this.lqnl = v.receiveYear;
            }
       }
       this.prems = prems;//首年总保费
       this.totalprems = totalprems;
       
       //判断绿色通道服务等级
       // 记录主险
       let [greenPrem,mainProPrem,mainPid,payendyear,version]=[0,0];
       for(let v of risk){
        if(v.pid=='101'){
            mainPid='101';payendyear=v.payendyear;break;
        }else if(v.pid=='102'){
            mainPid='102';payendyear=v.payendyear;break;
        }
        else if(v.pid=='103'){
            mainPid='103';payendyear=v.payendyear;break;
        }
       }
       console.log(mainPid)
       //如果是全能版  则需要计算主副险保费的合计
       if(mainPid=='101'){//全能版
        for(let v of risk){
            greenPrem+=Number(v.prem);
            if(v.pid=='101'){
                if(v.insuYear==1000){
                   mainProPrem=Number(v.prem)*v.payendyear.replace(/[^0-9]/ig,"");//全能版主险总保费 
               }else {
                    mainProPrem=Number(v.prem)*v.payendyear.replace(/[^0-9]/ig,"");//全能版主险总保费
               }
               
                
            }
            
        }
       }else if(mainPid=='102'){
        for(let v of risk){//常青树2016
            if(v.pid=='102'){
                greenPrem=v.prem;
                
            }
        }
       }
       else if(mainPid=='103'){
        for(let v of risk){//福临门
            if(v.pid=='103'){
                greenPrem=Number(v.prem);
                this.zhus = greenPrem*(v.payendyear).replace(/[^0-9]/ig,"")
            }
        }
       }
       
       //大于十年的
       if(payendyear>=10){
        if(greenPrem>=50000){
            version=1;
        }else if(greenPrem>=20000){
            version=2;
        }else if(greenPrem>=10000){
            version=3;
        }else{
            version=4;
        }
       }else{
        
        let passPrem=Math.round(Number(greenPrem)*payendyear.replace(/[^0-9]/ig,"")/10);

        console.log(passPrem+'啊啊啊')
        if(passPrem>=50000){
            version=1;
        }else if(passPrem>=20000){
            version=2;
        }else if(passPrem>=10000){
            version=3;
        }else{
            version=4;
        }
       }
       this.mainProPrem=mainProPrem;
       this.greenVersion=version;
    },
    mounted(){
        
        let jbpfirstMon = this.jbpfirstMon;
        let firstMon = this.firstMon;
        let flmsg = this.prems;
        let jbpsg = ''
        let jgjsg = ''
        let gun = localStorage.gun;
        console.log(gun+'、'+jbpfirstMon+'、'+firstMon)
        if(flmsg!=''&&flmsg!=null&&gun!=''&&gun!=null){
            if(flmsg>gun){
                jbpsg =  flmsg;
            }else {
                jbpsg =  gun;
            }
        }
        if(jbpfirstMon!=''&&jbpfirstMon!=null&&gun!=''&&gun!=null){
            if(jbpfirstMon>gun){
                jbpsg =  jbpfirstMon;
            }else {
                jbpsg =  gun;
            }
        }
        if(firstMon!=''&&firstMon!=null&&gun!=''&&gun!=null){
            if(firstMon>gun){
                jgjsg =  firstMon;
            }else {
                firstMon =  gun;
            }
        }
        this.jbpsg = jbpsg;
        this.jgjsg = jgjsg;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
body,html{
    transition:all .3s linear;
}
.bzplanshow{padding:1.5em 1.5em 0 1.5em;}
.con{
    .con_main_title{
        border-radius:5px;overflow: hidden;background: #fff;transition: height 1s linear;
        .con_list{
            padding: 0 0.5em 2em;
        }
        h2{
            border:1px solid @mainGreen;font-size: 1.3em;text-align: center;padding: .3em 0;color: @mainGreen;background: #fff;border-radius: 5px;
            span{
                display: inline-block;margin-left: .2em;margin-top: -.1em;width: 1em;height: 1em;background: url('../assets/images/mpickdown.png') no-repeat center center;background-size: 100%; vertical-align: middle;
            }
            &.active{
                background: @mainGreen;color: #fff;border-radius: 0;
                span{
                    background: url('../assets/images/mpickup.png')  no-repeat center center;background-size: 100%;
                }
            }
        }
        
        ul{
            li{
                text-align: center;
                &:first-child{font-size: 1.5em;height: 2.5em;line-height: 2.5em;font-weight: bold;color: @black;border-bottom:1px solid @mainGreen;}
                &:not(:first-child){
                    float: left;width: 50%;margin: .5em 0;
                }
                &:nth-child(2){
                    border-right: 1px solid @bgGray;
                }
                div{
                    &.t{border-top:1px solid @lightGray;}
                    padding: .5em;
                    font-size: 1.2em;
                }
                span{font-size: 1.5em;color: @mainGreen;}
            }
        }
        .tableList{
            border: 1px solid @bgGray;
            li{
              color: @black;border-top: 1px solid @bgGray;display: flex;padding: 1em 0;
              &:first-child{background: @bgGray;border-top:none;padding:.2em 0;;}
              span{
                flex-grow:1;text-align: center;height: 100%;
                &.xz{width: 35%;}
                &.je{width: 20%;}
                &.qx{width: 26%;}
                &.bf{width: 20%;}
              }
            }
          }

    }

    
}
.con2{
    h3{
        font-size: 1em;text-align: left;background: @mainGreen;color: #fff;height: 2.5em;line-height: 2.7em;padding-left: 1em;border-radius: 5px;position: relative;
        &.clause{
            span{
                width: .7em;height: 1.1em;background: url('../assets/images/toRight.png') no-repeat center center;background-size: 100% 100%; position: absolute;right: 1em;top: .75em;
            }
        }
    }
    &:last-child{margin-top: 1em;}
    .con_main_title{margin-top: 1em;}
  }



.fixedcon{
        position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.7);top: 0;left: 0;z-index: 1000;
    .acon{
        left:50%;top:50%;transform:translate(-50%,-50%);background:#fff;width:90%;position:absolute;height:50%;border-radius: 8px;
        div{height: 100%;overflow-y:scroll;}
        h2{
            background:#fff;color: @mainGreen; font-size: 1.35em; height: 2.6em;  position: absolute; width: 100%;z-index:1;border-radius:8px; padding-top: .6em;text-align: center;
            b{
                
            }
            i{
                position:absolute;width:2em;height:100%;background:url(../assets/images/close.png) no-repeat center center;background-size:1em;right:.2em;top:0em;
            }
        }
        ul.list{
            color:#5c5c5c;
            counter-reset: irem;
            margin-bottom: 2em;padding: 0 1em;padding-top:3.5em;
            // -moz-column-count:2;  /* Firefox */
            // -webkit-column-count:2; /* Safari 和 Chrome */
            // column-count:2;
            li{
                &:first-child{border-top: 1px dashed @mainGreen;}
                font-size:1.2em; position: relative;text-align: center;height:2em;line-height: 2em;border-bottom: 1px dashed @mainGreen;
                &:before{
                    // position:absolute;width:2em;content: counter(irem) "."; counter-increment: irem;left: 1em;top:0;
                }
            }
        }

    }
}
.pdfshow{
    // width: 90%;margin-left: 5%;margin-top: 15%;
}
</style>
