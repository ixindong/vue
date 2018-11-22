<template>
    <div class="con_list">
        <ul>
            <li class="title">华夏医保通费用补偿医疗保费</li>
            <li>
                <h3><i>◆</i>极致额度</h3>
                <p>终身可报销额度：500万元</p>
                <p>25种重大疾病额外报销：100万元</p>
                <p>一般住院医疗可报销额度：100万元</p>
                <p>社保赔付可报销比例100%，未经社保报销按60%赔付</p>
                <p>年度免赔额1万元（社保报销）/2万元（社保未报销）身价给付，彰显生命价值，给家人留一份爱</p>
            </li>
            <li>
                <h3><i>◆</i>全面保障</h3>
                <p>住院医疗全面覆盖</p>
                <p>含进口药、自费药、手术费、床位费、护理费、诊疗费、检查费等</p>
            </li>
            <li>
                <h3><i>◆</i>一生守护</h3>
                <p>出生且出院满28天即可投保</p>
                <p>最高投保年龄达65岁</p>
                <p>终身限额内即使发生理赔，依旧续保无忧</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'showybt',
    data(){
        return {
            
        }
    },
    computed:{
        
    },
    methods:{
        
    },
    mounted(){
        
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
