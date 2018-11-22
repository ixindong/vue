<template>
  <div class="popup">
      <ul>
        <li class="title">华夏常青树重大疾保险（2016）1111</li>
        <li>
          <b>保障期间</b>
          <input class="selectlh" value="终身" disabled="disabled">
        </li>
        <li>
          <b>交费期间</b>
          <single-select class="selectlh" :opts="durationList" v-model="duration" @change="changeDuration" title="请选择交费期间" ></single-select><span></span>
        </li>
        <li>
          <b>保额</b>
          <input class="selectlh" v-model="bzPlans[i].mainPro.amnt" >
        </li>
        <li>
          <b @click="btn(1)">取消</b>
          <b @click="btn(2)">确定</b>
        </li>
      </ul>
  </div>
</template>
<script>
import SingleSelect from './SingleSelect'
export default {
    name: 'forecastcqs2016',
    props:['plans','i','bzPlans'],
    components:{SingleSelect},
    data(){
      return {
        baoe:'',
        duration:'20年',
        durationList:[{'name':'5年'},{'name':'10年'},{'name':'15年'},{'name':'20年'}]
      }
    },
    mounted(){

    },
    beforeMount(){
        
    },
    methods:{
      changeDuration(val,x,index){
        this.duration = this.durationList[index].name;
      },
      btn(n){
        let amnt = this.bzPlans[this.i].mainPro.amnt;
        let d;
        if(n==2){
          //判断保险金额
            if(amnt<10000){
              popalert.fade('最低保险金额为10000元');this.bzPlans[this.i].mainPro.amnt=10000;return;
            }else if(amnt%1000!=0){
              popalert.fade('超出10000元部分应为1000的整数倍');this.bzPlans[this.i].mainPro.amnt=10000;return;
            }else{
              d = {'5年':5,'10年':10,'15年':15,'20年':20}[this.duration];
              // let b = this.baoe;
            }
        }

        this.$emit('next',n,d);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.popup{
  ul{
    padding:0 1em;
    width: 90%;
    height: 20em;
    border-radius: 5px;
    background-color: #fff;
    position:absolute;
    left:50%;top: 50%;
    transform:translate(-50%,-50%);
    li{
      height: 3em;text-align: left;line-height: 3em;border-bottom: 1px solid #f0f0f0;position: relative;
      &.title{height: 3em;text-align: center;line-height: 3em;font-weight: bold;font-size: 1.3em;color: @mainGreen;border-bottom: none;}
      &:last-child{
        box-sizing: border-box;position: absolute;bottom: 0;left: 0;width: 100%;border-top: 1px solid @mainGreen;height: 3.7em;line-height: 3.7em;border-bottom: none;
        b{
          color: @mainGreen;text-align: center;width: 50%;display: block;float: left;height: 100%;
          &:last-child{background: @mainGreen;color: #fff;border-radius: 0 0 5px 0}
        }
      }
      b{
        color:@black;font-size: 1em;font-weight: bold;display: inline-block;width: 6em;vertical-align: middle;height: 2.9em;
      }
      .selectlh{
        display: inline-block;font-size: 1em;width:60%;padding-left: 2em;
      }
      span{
        position: absolute;width: 2em;height: 2em;background:red;top: 54%;right: 0;transform:translateY(-50%);background:url('../assets/images/ydrop.png') no-repeat;background-size: 80%;background-position: center;
      }
    }
  }
}

</style>
