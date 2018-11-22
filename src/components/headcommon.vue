<template>
    <div class="header">
        <img name="btn_back" src="../assets/images/left.png" onclick="window.history.go(-1)"/>
        <slot>会员登录</slot>
        <img name="btn_home" src="../assets/images/share.png" alt="" @click="shareUrl">
    </div>
</template>
<script>
    export default {
        name: 'headcommon',
        data(){
            return { tabIndex: 0, cIndex: -1 };
        },
        methods: {
            changeTab(n,m){
                this.tabIndex = n;
                this.cIndex = m !== undefined ? m : -1;
            },
            shareUrl:function () {
                if(window.plancode){
                    hxajax('pros/share.do',{'prosCode':window.plancode},data=>{
                        
                    });
                }
                
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import url(../assets/css/common.less);
    *{margin:0;padding:0;}
    h1{
        font-weight: normal;
    }
    a{text-decoration: none;}
    .header{
        width:100%;height:2.5em;line-height:2.5em;position:relative;text-align:center;background:#ffffff;color:@black;font-weight:bold;margin:0;padding:0;font-size:1.3em;
        img:first-child{width: 0.7em;position: absolute;left:1em;top:0.5em;}
        img:last-child{width: 1.3em;position: absolute;right:1em;top:0.5em;}
    }
</style>
