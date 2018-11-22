<template>
    <div class="con_list">
        <ul>
            <li class="title">华夏常青树重大疾病保险计划（全能版）<span @click="sweakshow">病种</span></li>
            <li>
                <h3><i>◆</i>80岁给付祝寿金<b>{{totalprems}}</b>元</h3>
                <p>储蓄、保障两不误，确保保费不白花</p>
            </li>
            <li>
                <h3><i>◆</i>身故/全残保障<b>{{Math.round(amnt/10000*100)/100}}</b>万元/已交保费/现价三者较大者</h3>
                <p>不幸身故/全残，给付相应保险金，保证家人生活，延续关爱</p>
            </li>
            <li>
                <h3><i>◆</i>100种重疾保障<b>{{Math.round(amnt/10000*100)/100}}</b>万元/已交保费、现价三者较大者</h3>
                <p>等待期后全面赔付，无需担忧高昂医疗费用，专注治疗与康复</p>
            </li>
            <li>
                <h3><i>◆</i>50种轻症保障<b>{{Math.round(amnt*0.25*100)/100}}</b>元/次，最高可达<b>{{Math.round(3*amnt*0.25*100)/100}}</b>元</h3>
                <p>最高三次赔付，重疾保障继续有效，早发现早治疗</p>
            </li>
            <li>
                <h3><i>◆</i>疾病终末期保障<b>{{amnt/10000}}</b>万元/已交保费/现价三者较大者</h3>
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
                    <li>严重1型糖尿病</li>
                    <li>肺源性心脏病</li>
                    <li>植物人状态</li>
                    <li>严重类风湿性关节炎</li>
                    <li>非阿尔茨海默病所致严重痴呆</li>
                    <li>多处臂丛神经</li>
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
                    <li>严重面部烧伤</li>
                    <li>亚急性硬化亚急性全脑炎</li>
                    <li>脊髓小脑变性症</li>
                    <li>进行性多灶性白质脑病</li>
                    <li>弥漫性血管内凝血</li>
                    <li>失去一肢及一眼</li>
                    <li>独立能力丧失</li>
                    <li>器官移植导致的HIV感染</li>
                    <li>婴儿进行性脊肌萎缩症</li>
                    <li>重幼年型类风湿性关节炎</li>
                    <li>埃博拉病毒感染</li>
                    <li>主动脉夹层血肿</li>
                    <li>重症急性坏死性筋膜炎</li>
                    <li>骨髓纤维化</li>
                    <li>严重慢性缩窄性心包炎</li>
                    <li>主动脉夹层瘤</li>
                    <li>肌萎缩脊髓侧索硬化后遗症</li>
                    <li>严重结核性脑膜炎</li>
                    <li>重症手足口病</li>
                    <li>严重甲型及乙型血友病</li>
                    <li>艾森门格综合症</li>
                    <li>湿性年龄相关性黄斑变性</li>
                    <li>脊柱裂</li>

                </ul>
                </div>
                <div v-show="qj">
                    <ul class="list">
                    <li>非危及生命（极早期的）恶性病变</li>
                    <li>冠状动脉介入手术</li>
                    <li>轻微脑中风</li>
                    <li>心脏瓣膜介手术</li>
                    <li>脑垂体瘤、脑囊肿、脑动脉瘤及脑血管瘤</li>
                    <li>视力严重受损-3周岁始赔</li>
                    <li>主动脉内介入手术</li>
                    <li>较小面Ⅲ度烧伤（10%）</li>
                    <li>慢性肾功能损害-肾功能衰竭期</li>
                    <li>重症头部外伤</li>
                    <li>单个肢体缺失</li>
                    <li>单侧肺脏切除</li>
                    <li>肝脏手术</li>
                    <li>早期运动神经性疾病</li>
                    <li>人工耳蜗植入术</li>
                    <li>胆道重建手术</li>
                    <li>双侧卵巢或睾丸切除术</li>
                    <li>单侧肾脏切除</li>
                    <li>糖尿病导致脚趾截除</li>
                    <li>单耳失聪</li>
                    <li>微创颅脑手术</li>
                    <li>Ⅲ度房室传阻滞-已放心脏起搏器</li>
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
                    <li>脑室腹腔分流术</li>
                    <li>轻度面部烧伤</li>
                    <li>植入腔静脉过滤器</li>
                    <li>肾上腺切除术</li>
                    <li>早期象皮病</li>
                    <li>中度严重克雅氏病</li>
                    <li>中度严重脊髓灰质炎</li>
                    <li>中度进行性上神经麻痹症</li>
                    <li>中度重症肌无力</li>
                    <li>中度瘫痪</li>
                    <li>出血性登革热</li>
                    <li>中度严重溃疡性结肠炎</li>
                    <li>系统性红斑狼疮</li>
                    <li>面部重建手术</li>
                    <li>植入大脑内分流器</li>
                    <li>中度帕金森氏病</li>
                    <li>严重的骨质疏松</li>
                </ul>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'showcqs',
    props:['amnt','prem','totalprems'],
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
</style>
