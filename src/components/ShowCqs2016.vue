<template>
    <div class="con_list">
        <ul>
            <li class="title">华夏常青树重大疾病保险（2016）<span @click="sweakshow">病种</span></li>
            <li>
                <h3><i>◆</i>终身身故/全残保障<b>{{Math.round(amnt/10000*100)/100}}</b>万元</h3>
                <p>身价给付，彰显生命价值，给家人留一份爱</p>
            </li>
            <li>
                <h3><i>◆</i>77种重疾保障<b>{{Math.round(amnt/10000*100)/100}}</b>万元</h3>
                <p>全面赔付，无需担忧医疗费，专注治疗</p>
            </li>
            <li>
                <h3><i>◆</i>33种轻症保障每次<b>{{Math.round(amnt*0.2*100)/100}}</b>元，最高可达<b>{{Math.round(amnt/10000*100)/100}}</b>万元</h3>
                <p>每种轻症一次赔付，累计5次为限</p>
            </li>
            <li>
                <h3><i>◆</i>疾病终末期保障<b>{{amnt/10000}}</b>万元</h3>
                <p>疾病终末期保障，关爱家人</p>
            </li>
            <li>
                <h3><i>◆</i>轻症疾病豁免保费</h3>
                <p>被保险人罹患轻症，豁免后期保费，合同继续有效，人性设计</p>
            </li>
        </ul>
        <div class="fixedcon" v-show="weakshow">
            <div class="acon">
                <h2>
                    <ol class="weakToggle">
                        <li :class="{'active':zj}" @click="chooseZj">重疾</li><li :class="{'active':qj}" @click="chooseQj">轻疾</li>
                    </ol><b>疾病种类</b><i @click="sweakhide"></i>
                </h2><div v-show="zj">
                <ul class="list">
                    <li>恶性肿瘤</li>
                    <li>急性心肌梗塞</li>
                    <li>脑中风后遗症</li>
                    <li>重大器官移植术或造血干细胞移植术</li>
                    <li>冠状动脉搭桥术</li>
                    <li>终末期肾病</li>
                    <li>多个肢体缺失</li>
                    <li>急性或亚急性重症肝炎</li>
                    <li>良性脑肿瘤</li>
                    <li>慢性肝功能衰竭失代偿期</li>
                    <li>脑炎后遗症或脑膜炎后遗症</li>
                    <li>深度昏迷</li>
                    <li>双耳失聪－三周岁始理赔</li>
                    <li>双目失明－三周岁始理赔</li>
                    <li>瘫痪</li>
                    <li>心脏瓣膜手术</li>
                    <li>严重阿尔茨海默病</li>
                    <li>严重脑损伤</li>
                    <li>严重帕金森病</li>
                    <li>严重III度烧伤</li>
                    <li>严重原发性肺动脉高压</li>
                    <li>严重运动神经元病</li>
                    <li>语言能力丧失－三岁始理赔</li>
                    <li>重型再生障碍性贫血</li>
                    <li>主动脉手术</li>
                    <li>慢性呼吸功能衰竭</li>
                    <li>严重多发性硬化</li>
                    <li>脊髓灰质炎</li>
                    <li>全身性重症肌无力</li>
                    <li>严重冠心病</li>
                    <li>严重心肌病</li>
                    <li>系统性红斑狼疮-III型或以上狼疮性肾炎</li>
                    <li>因职业关系导致的人类免疫缺陷病毒（HIV）感染</li>
                    <li>经输血导致的人类免疫缺陷病毒（HIV）感染</li>
                    <li>严重克隆病</li>
                    <li>严重溃疡性结肠炎</li>
                    <li>1型糖尿病</li>
                    <li>肺源性心脏病</li>
                    <li>植物人状态</li>
                    <li>严重类风湿性关节炎</li>
                    <li>非阿尔茨海默病所致严重痴呆</li>
                    <li>终末期疾病</li>
                    <li>严重哮喘（25周岁前理赔）</li>
                    <li>严重川崎病</li>
                    <li>严重的系统性硬皮病</li>
                    <li>丝虫病所致象皮肿</li>
                    <li>胰腺移植</li>
                    <li>急性坏死胰腺炎开腹手术</li>
                    <li>慢性复发性胰腺炎</li>
                    <li>疯牛病</li>
                    <li>肾髓质囊性病</li>
                    <li>严重的原发性硬化性胆管炎</li>
                    <li>特发性慢性肾上腺皮质功能减退</li>
                    <li>溶血性链球菌引起的坏疽</li>
                    <li>颅脑手术</li>
                    <li>严重肌营养不良症</li>
                    <li>严重心肌炎</li>
                    <li>肝豆状核变性(或称Wilson病)</li>
                    <li>侵蚀性葡萄胎(或称恶性葡萄胎)</li>
                    <li>破裂脑动脉瘤夹闭手术</li>
                    <li>需手术切除的嗜铬细胞瘤</li>
                    <li>进行性核上性麻痹</li>
                    <li>严重幼年型类风湿性关节炎</li>
                    <li>严重肠道疾病并发症(本项保险责任仅在被保险人18周岁以前提供保障)</li>
                    <li>严重瑞氏综合症（Reye综合征，也称赖氏综合征、雷氏综合征）</li>
                    <li>严重自身免疫性肝炎</li>
                    <li>严重的III度房室传导阻滞</li>
                    <li>细菌性脑脊髓膜炎</li>
                    <li>严重感染性心内膜炎</li>
                    <li>严重的骨髓增生异常综合征</li>
                    <li>严重癫痫</li>
                    <li>自体造血干细胞移植</li>
                    <li>肺淋巴管肌瘤病</li>
                    <li>肺泡蛋白质沉积症</li>
                    <li>小肠移植</li>
                    <li>疾病或外伤所致智力障碍</li>
                    <li>骨生长不全症</li>


                </ul>
                </div>
                <div v-show="qj">
                    <ul class="list">
                    <li>非危及生命的（极早期的）恶性病变</li>
                    <li>冠状动脉介入手术</li>
                    <li>轻微脑中风</li>
                    <li>心脏瓣膜介入手术</li>
                    <li>脑垂体瘤、脑囊肿、脑动脉瘤及脑血管瘤</li>
                    <li>视力严重受损 – 三周岁始理赔</li>
                    <li>主动脉内介入手术</li>
                    <li>较小面积III度烧伤（10%）</li>
                    <li>慢性肾功能损害 – 肾功能衰竭期</li>
                    <li>重症头部外伤</li>
                    <li>单个肢体缺失</li>
                    <li>单侧肺脏切除</li>
                    <li>肝脏手术</li>
                    <li>早期运动神经性疾病</li>
                    <li>人工耳蜗植入术</li>
                    <li>胆道重建手术</li>
                    <li>双侧卵巢或睾丸切除术</li>
                    <li>单侧肾脏切除</li>
                    <li>肝叶切除</li>
                    <li>单耳失聪</li>
                    <li>微创冠状动脉搭桥手术</li>
                    <li>Ⅲ度房室传导阻滞-已放置心脏起搏器</li>
                    <li>于颈动脉进行血管成形术或内膜切除术</li>
                    <li>心包膜切除术</li>
                    <li>脑炎或脑膜炎</li>
                    <li>硬脑膜下血肿手术</li>
                    <li>严重阻塞性睡眠窒息症</li>
                    <li>因意外毁容而施行的面部整形手术</li>
                    <li>角膜移植</li>
                    <li>单眼失明</li>
                    <li>可逆性再生障碍性贫血</li>
                    <li>慢性肝功能衰竭</li>
                    <li>特定周围动脉疾病的血管介入治疗</li>

                </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'showcqs2016',
    props:['amnt','prem'],
     data(){
        return {
            weakshow:false,
            zj:true,
            qj:false,
            weakTog:true
        }
    },
    computed:{
        
    },
    methods:{
        sweakshow(){
            this.weakshow=true;
        },
        sweakhide(){
            this.weakshow=false;
        },
        chooseQj(){
            this.qj=true;this.zj=false;
        },
        chooseZj(){
            this.qj=false;this.zj=true;
        }
    },
    mounted(){
       // console.log(111)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.con_list{
    background: #fff;margin-top: 1em;border:1px solid @mainGreen;border-radius: 5px;
    ul{
        padding:0 .5em;
        li{position: relative;padding-left: 1.6em;
            &.title{
                padding-left: 0;height: 2em;line-height: 2em;font-weight: bold;color: @black;position: relative;border-bottom: 1px solid @bgGray;
                span{font-size: .6em;height: 1.3em;line-height: 1.2em;background: @mainGreen;color: #fff;border-radius:2em;font-weight: normal;padding: 0 1em;position: absolute;top: 50%;right: .5em;transform:translateY(-50%);}
            }
            margin-bottom: .5em;
            h3{
                color: @black;font-weight: bold;
                b{color: @mainGreen;}
                i{font-size: 2.2em;color: @mainGreen;position: absolute; top: -.5em;left: 0;}
            }
            &:last-child{margin-bottom: 0;padding-bottom: .5em;}
        }
    }
}
@import url(../assets/css/proshow.less);
// .fixedcon{
//     position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.7);top: 0;left: 0;z-index: 1000;
//     .acon{
//         left:50%;top:50%;transform:translate(-50%,-50%);background:#fff;width:90%;position:absolute;height:80%;border-radius: 8px;
//         div{height: 93%;overflow-y:scroll;}
//         h2{
//             background:#fff;color: @mainGreen; font-size: 1.35em; height: 2.6em; line-height: 2.6em; position: absolute; text-align: center; width: 100%;z-index:1;border-radius:8px; 
//             i{
//                 position:absolute;width:2em;height:100%;background:url(../assets/images/close.png) no-repeat center center;background-size:1em;right:.2em;top:0;
//             }
//         }
//         ul.list{
//             color:#5c5c5c;padding-top:3.5em;
//             counter-reset: irem;
//             margin-bottom: 2em;
//             // -moz-column-count:2;  /* Firefox */
//             // -webkit-column-count:2; /* Safari 和 Chrome */
//             // column-count:2;
//             li{
//                 font-size:1.2em; padding-left: 3em; position: relative;
//                 &:before{
//                     position:absolute;width:2em;content: counter(irem) "."; counter-increment: irem;left: 1em;top:0;
//                 }
//             }
//         }

//         .weakToggle{
//             position: absolute;top: .6em;left: 1em;height: 1.1em;border:1px solid @mainGreen;width: 5em;border-radius: 30px;z-index: 1000;overflow: hidden;
//             li{
//                 font-size:.5em;display: block;width: 50%;text-align: center;background: #fff;color: @mainGreen;transition: all .3s ease-out;float: left;height: 2.3em;line-height: 2.2em;
//                 &.active{
//                     background: @mainGreen;color: #fff;
//                 }
//             }
//         }

//     }
// }
</style>
