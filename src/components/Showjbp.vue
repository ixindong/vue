<template>
    <div class="con_list">
        <ul>
            <li class="title">聚宝盆</li>
            <li>
                <h3><i>◆</i>现金价值强劲增值，主险生存金和客户自主追加灵活进出</h3>
                <p>固定收益，列入合同，所见即所得，长期保值增值，账户灵活，进出均无手续费</p>
            </li>
            <li>
                <h3><i>◆</i>{{lqnl}}起每年领取养老金{{msgsss}}元</h3>
                <p>年年享受关爱，添福又添寿</p>
            </li>
            <li>
                <h3><i>◆</i>身故或全残给付已交保费（扣除已领取养老金）与现金价值较大者</h3>
                <!-- <h3><i>◆</i>身故或全残给付{{jbpsg}}元</h3> -->
                <p>尊贵身价、传承无忧，彰显生命尊严</p>
            </li>
        </ul>
    </div>
</template>
<script>
import Bus from './bus.js';
export default {
    name: 'showybt',
    props:['baoe','lqnl','jbpsg'],
    data(){
        return {
            msgsss:''
        }
    },
    computed:{
        
    },
    methods:{
        
    },
    created(){
          
    },
    mounted(){
       Bus.$on('msg', (e) => {
         this.msgsss = e
         console.log(this.msgsss+'你是谁')
       }) 
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
