<template>
    <div class="con_list">
        <ul>
            <li class="title">华夏常青树重大疾保险（2016）</li>
            <li>
                <h3><i>◆</i>以上所有保障等待期均为90天，等待期内，非因意外导致上述保险金给付，给付实际已交保费，因意外则不受90天的限制</h3>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'instructcqs2016',
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
                padding-left: 0;height: 2.5em;line-height: 2.5em;font-weight: bold;color: @black;position: relative;border-bottom: 1px solid @bgGray;
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
