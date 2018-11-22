<template>
    <div class="con_list">
        <ul>
            <li class="title">福临门(吉祥版)</li>
            <li>
                <h3><i>◆</i>{{flmAge+5}}岁起每年领取生存金{{amnt}}元</h3>
                <p>年金固定领取，收益稳定，直至终身</p>
            </li>
            <li>
                <h3><i>◆</i>80周岁领取祝寿金{{zhus}}元</h3>
                <p>一笔丰厚稳定的养老金，实现幸福养老</p>
            </li>
            <li>
                <h3><i>◆</i>身故/全残给付已交保费和账户价值较大者</h3>
                <!-- <h3><i>◆</i>身故全残给付{{flmsg}}</h3> -->
                <p>呵护自己，更关爱家人，实现财富传承</p>
            </li>
            <li>
                <h3><i>◆</i>投保人60周岁前因意外身故/全残，豁免后期保费</h3>
                <p>自带投保人豁免保障，人性化设计，尽显关爱</p>
            </li>
        </ul>
    </div>

</template>
<script>
export default {
    name: 'showcqs',
    props:['amnt','prem','totalprems','flmAge','flmsg','zhus'],
    data(){
        return {
           
        }
    },
    computed:{
        
    },
    methods:{
        
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
