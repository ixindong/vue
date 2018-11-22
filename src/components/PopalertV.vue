<template>
    <div>
        <!-- <div id="mode"></div>
        <div id="popAlert">
            <p @click="imgclick"><slot name="img"></slot></p>
            <h2><slot name="title"></slot></h2>
            <p class="p"><slot name="con"></slot></p>
            <button @click="hide"><slot name="btn"></slot></button>
        </div> -->
    </div>
</template>
<script>
    export default {
        name: 'popalertV',
        methods: {
            hide(){
                this.$emit('hide');
            },
            imgclick(){
                this.$emit('imgclick');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import url(../assets/css/common.less);
    // #mode{width:100%;height:100vh;background:#000;opacity:0.5;position:fixed;top:0;z-index:3;}
    // #popAlert{
    //     width:86%;height:auto;text-align:center;color:#000;background:#fff;font-size:1.3em;position:fixed;top:50vh;margin-left:7%;z-index:4;border-radius: 0.5em; transform:translateY(-50%);-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);padding-top:1em;
    //     h2{font-size:1.3em;line-height: 1em;}
    //     p.p{font-size: 1em;margin:1em 0;padding:0 5%;line-height: 1.5em;}
    //     button{
    //         width: 100%;background: @deepRed;line-height:2.8em;color:#fff;font-size: 0.9em;border-bottom-left-radius: 0.5em;border-bottom-right-radius: 0.5em;
    //         a{color:#fff;display: inline-block;width: 100%;height: 100%;}
    //     }
    //     img{
    //         width: 2em;
    //         position: absolute;
    //         top: 0;
    //         right: 0;
    //     }
    // }
</style>
