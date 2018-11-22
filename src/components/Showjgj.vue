<template>
    <div class="con_list">
        <ul>
            <li class="title">金管家F</li>
            <li>
                <h3><i>◆</i>保证结算利率3%</h3>
                <p>所有年金均可进入万能账户复利增值，下有保底结算利率3%，上有较高历史实际年化结算利率，实现财富二次增值。</p>
            </li>
            <li>
                <h3><i>◆</i>75周岁后每年领取养老金，祝寿添福</h3>
            </li>
            <li>
                <h3><i>◆</i>身故/全残给付已交保费和账户价值较大者</h3>
                <!-- <h3><i>◆</i>身故/全残给付{{jgjsg}}</h3> -->
                <p>已交保费需扣除已领养老金与部分领取账户价值后的金额</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'showybt',
    props:['jgjsg'],
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
