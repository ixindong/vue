<template>
    <div class="con_list">
        <ul>
            <li class="title">重疾就医绿色通道</li>
            <li>
                <h3><i>◆</i>可享受{{versionText}}服务</h3>
                
            </li>
            <li>
                <h3><i>◆</i>服务内容</h3>
                <p>预约专家门诊、入住专家病房、指定专家手术、关爱电话回访、关爱复诊检查、交通住院补贴（省内最高2000元，省外最高5000元）、海外转诊服务（自费）、康复热线咨询</p>
            </li>
            <li> <h3><i>◆</i>增值服务内容除自费项目之外，其他预约费用均由公司承担，人均花费2-3万</h3></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'showzj',
    data(){
        return {
            versionText:''
        }
    },
    props:['version'],
    computed:{
        
    },
    methods:{
        
    },
    mounted(){
        // console.log(this.version)
        this.versionText=this.version==1?'尊享私钻版':this.version==2?'专享钻石版':this.version==3?'安享黄金版':'惠享白银版';
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
