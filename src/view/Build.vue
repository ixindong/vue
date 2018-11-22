<template>
    <div class="page">
        <!-- <Headcommon>组合计划书</Headcommon> -->
        <div class="show">
            <img src="../assets/images/banner.png">
            <div class="showlist">
                <ul class="premShow">
                    <li><i>家庭计划保费构成</i></li>
                    <li>
                        <span>投保人</span>
                        <span>被保险人</span>
                        <span>保费合计</span>
                    </li>
                    <li v-for="(v,i) in bzPlans" class="data">
                        <span>{{v.appname}}</span>
                        <span>{{v.insurname}}</span>
                        <span>{{totalPrem(v.risk)}}</span>
                    </li>
                    <li>
                        <b>合计</b>
                        <span>{{total+'元'}}</span>
                    </li>
                </ul>
            </div>
        </div> 
        
        <bz-plan-show v-for="(val,i) in bzPlans" :plan="val" :plancodeText="plancodeText" :listIndex="i" :key="i" :conshow="conshow" @closeFold="closeFold" ref="bzplanshow"></bz-plan-show>
        
        <div class="tip">
            <h2>风险提示</h2>
            <ul>
                <li>
                    <h3><i>◆</i>投保人在保单犹豫期后解除合同会遭受一定损失。本计划演示数据仅供参考，具体保单利益请以保单合同为准。</h3>
                    <h3 v-if="risk"><i>◆</i>上述所有利益演示均基于保险公司的精算假设，不代表公司的历史经营业绩和对未来经营业绩的预期。</h3>
                    <h3 v-if="risk"><i>◆</i>万能保险的最低保证利率之上的投资收益是不确定的，实际保单账户利益可能低于中、高档利益演示水平。</h3>
                </li>
            </ul>
        </div>

        <div class="contactInfo">
            <div class="lf">
                <div id="userPic"><img :src="contactPic"></div>
                <b>{{contactorName}}</b>
            </div>
            <div class="rt">
                <span></span>
                <a :href="telTxt"><b>{{contactorTel}}</b></a>
            </div>
        </div>
        <div class="clickToRed" @click="showRed" v-show="tipShow">
            <img src="../assets/images/gift.png">
        </div>
        <div class="popToRed" v-show="redClose">
            <div :class="['popToRedPanel',{'show':showRedPanel}]">
                <img src="../assets/images/toRed.png">
                <a :href="toRed">点击抽现金红包！</a>
                <span @click="closeRed"></span>
            </div>
        </div>
    </div>
</template>
<script>
// import Headcommon from '@/components/headcommon'
import Headcommon from '@/components/headcommon'
import BzPlanShow from '@/components/BzPlanShow'
export default {
    name: 'build',
    data(){
        return {
            risk:false,
            plancodeText:'',
            bzPlans:[],
            premList:[],
            total:'',
            contactorName:'啦啦',
            contactorTel:'',
            showRedPanel:false,
            redClose:false,
            toRed:'',
            contactShow:false,
            conshow:[],
            tipShow:false,
            telTxt:'',
            contactPic:'http://zmt.ihxlife.com/zhjhs/image/userPic.png'
        }
    },
    computed:{
        // total(){

        // }
    },
    components:{ BzPlanShow,Headcommon },
    methods:{
        totalPrem(arr){
            let prem = 0;
            for(let v of arr){
                prem=Math.round((prem+Number(v.prem))*100)/100;
            }
            return prem+'元';
        },
        closeRed(){
            this.showRedPanel=false;
            this.redClose=false;
        },
        showRed(){
            this.redClose=true;
            setTimeout(()=>{this.showRedPanel=true;},10);
        },
        closeFold(i){
            // console.log(i,this.conshow);
            
            if(this.conshow[i]==false){
                this.conshow.fill(false);
                this.conshow[i]=true;
            }else{
                this.conshow[i]=!this.conshow[i];
            }
            for(let i in this.$refs.bzplanshow){
                this.$refs.bzplanshow[i].changeFold();
            }
        }
    },
    beforeMount(){

    },
    mounted(){
        
        // if(this.bzPlans.risk.pid=='103'){
        //     this.risk=true
        // }
       let [para,userid,sysSource,customerid,plancode,openid,drawLuck,str]=[];
       window.sysSource='01';
       //不是红包入口时，查询计划书的参数
       para = {'prosCode':this.$route.params.id,'userid':this.$route.params.flag,'sysSource':'01',openid:common.getRequest().openid};
       // [userid,sysSource,]
       //红包入口进入，查询计划书的参数
       [userid,sysSource,plancode]=[this.$route.params.flag,'01',this.$route.params.id];
       if(common.getRequest().userid&&common.getRequest().sysSource&&common.getRequest().customerid&&common.getRequest().openid&&common.getRequest().drawLuck){
        // console.log(12323);
            ({userid,customerid,sysSource,openid,drawLuck} = common.getRequest());
            window.userid=userid;
            para = {'userid':userid,'customerid':customerid,'sysSource':sysSource,'openid':openid};
            console.log(para);
            window.sysSource=sysSource;
            this.toRed='http://zmt.ihxlife.com/opr/cm/index.do?params=userid:'+userid+',userIdno:'+customerid+',page:PrizeDraws.html';
            // console.log(this.toRed);
        }
        // 'http://zmt.ihxlife.com/opr/cm/index.do?params=userid:'+userid+',page:PrizeDraws.html'
        if(window.sysSource=='02'&&drawLuck=='0'){
            this.tipShow=true;
            // this.redClose=true;
            // setTimeout(()=>{this.showRedPanel=true;},50);
            // this.contactShow=true;
        }
       str=(plancode)+','+userid+','+sysSource+','+(openid)+','+(customerid)+','+(drawLuck);
       console.log('?params='+str);
       // console.log(window.sysSource)

       // if(openid==''){
       //      hxajax('pros/getopenid',{'openid':''},data=>{
                
       //      })
       //  }
       
//doShare("","家庭计划书","华夏保险产品组合计划书保费及利益测算,"+this.contactorName+"为您设计的专属保险计划书，请查阅！华夏保险，让华夏充满爱！",'http://test.hxlife.com/pcweb/pstserver/pros/getopenid.do?params='+str,'http://hx-third.oss-cn-hangzhou.aliyuncs.com/polysoft/pcweb/1508909284817.jpg');
        console.log(para);
       hxajax('pros/check.do',para,data=>{
            let json = JSON.parse(data);
            console.log(json)
            let plan = json.data.plan;
            plancode = json.data.prosCode;
            this.plancodeText = plancode;
            this.total = json.data.prems;
            for(let i = 0,len = plan.length;i<len;i++){
                this.bzPlans.push(plan[i]);
                if(i==0){
                    this.conshow.push(true);
                }else{
                    this.conshow.push(false);
                }
                // console.log(this.conshow)
            }
            if(this.bzPlans[0].risk[0].pid==103){
                this.risk=true;
                console.log(this.risk)
            }
       });
       hxajax('pros/getUser.do',{userid:userid},data=>{
        let json=JSON.parse(data);
        // console.log(json)
        this.contactorName=json.name;
        this.contactorTel=json.mobile;
        json.avatar!=''?this.contactPic=json.avatar:'';
        console.log(json);
        // $('#us').css('background-image','url('+json.avatar+')');
        this.telTxt='tel:'+this.contactorTel;
        doShare("","家庭保险计划书",this.contactorName+"为您设计的家庭保险计划书，请查阅！",'http://zmt.ihxlife.com/zhjhs/pros/getopenid.do?params='+str,'http://zmt.ihxlife.com/zhjhs/image/pic.png',plancode,userid,sysSource,customerid);
       })
      // doShare("","分享标题","分享描述","www.baidu.com","",plancode,userid,customerid,sysSource);//分享功能
     // console.log(location.href.split('#')[0]);
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.page{
    min-height: 100vh;background: @bgGray;padding-bottom:5em;
    header{
      h1{background: #fff;color: @black;text-align: center;font-size:1.6em;padding: .4em 0;font-weight: bold;border-bottom: 1px solid #F1F1F1; }
    }
    .show{
        img{width: 100%;}
        .showlist{
            background:url('../assets/images/tablebg.png');
            background-size: 100%;
            min-height: 21vh;
            padding: 1.5em;
            ul{
                border:1px solid #fff;color: #fff;
                li{
                    border-bottom:1px solid #fff;height: 2em;line-height: 2em;display: flex;text-align: center;
                    &:last-child{
                        border-bottom: none;
                    }
                    span{
                        display: inline-block;border-right: 1px solid #fff;width: 33.33333%;
                        &:last-child{border-right: none;}
                    }
                    b{flex-grow:2;border-right: 1px solid #fff;}
                    i{flex-grow:1;}
                }
            }
        }
    }
}

.tip{padding: 0 1.5em;
    h2{font-size: 1em;text-align: left;background: @mainGreen;color: #fff;height: 2.5em;line-height: 2.7em;padding-left: 1em;border-radius: 5px;margin:1em 0;}
    ul{
        padding:1em .5em;background: #fff;border:1px solid @mainGreen;border-radius: 5px;
        li{
            position: relative;padding-left: 1.6em;
            h3{
                position: relative;
                color: @black;font-weight: bold;
                b{color: @mainGreen;}
                i{font-size: 1em;color: @mainGreen;position: absolute; top: 0em;left: -1.2em;}
            }
        }
    }
}
div.contactInfo{
    height: 4em;background: rgba(0,0,0,.7);margin-top: 1em;padding: 0 1.5em;color: #fff;position: fixed;bottom:0;left: 0;width: 100%;
    div{
        float: left;width: 50%;
        a{display: inline-block;color: #fff;}
        span{
            display: inline-block;width: 3em;height: 4em;vertical-align: middle;background: url('../assets/images/userTel.png') no-repeat center center;background-size:60%; 
        }
        &.lf{
            span{
                background-image: url('http://zmt.ihxlife.com/zhjhs/image/userPic.png');
                background-repeat: no-repeat;
                background-position: center center;
                background-size:100%; 
            }
            b{
                position: absolute;top: 50%;transform:translateY(-50%);padding-left: 1em;display: inline-block;width: 25%;border-right: 1px solid #fff;
            }
        }
    }
}
div.popToRed{
    position: fixed;top: 0;height: 100%;width: 100%;background: rgba(0,0,0,.7);
    .popToRedPanel{
        width: 70%;position: absolute;top: 0;left: 15%;transition: all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);transform:translateY(-150%);
        img{
            width: 100%;margin-bottom: 2em;
        }
        a{
            background: url('../assets/images/toRedBtn.png') no-repeat ;background-size: 100%;width: 100%;display: block;color: #fff;text-align: center;
            height: 4.5em;line-height: 3.2em;
        }
        span{
            position: absolute;bottom:-2em;left:50%;transform:translateX(-50%);width: 2em;height: 2em;background: url('../assets/images/toRedClose.png') no-repeat ;background-size: 100%;
        }
        &.show{
            transform:translateY(25%);
        }
    }
}
.clickToRed{
    position: fixed;top: 60%;right: 0;
    img{width: 5em;}
}
#userPic{
    display: inline-block;width: 3em;height: 3em;vertical-align: middle;margin:.5em 0; overflow: hidden;border-radius: 50%;
    img{
        width: 100%;
    }
}
</style>
