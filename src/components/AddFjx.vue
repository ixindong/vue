<template>
  <div class="popup">
      <ul>
        <li class="title">增加附加险</li>
        <li>
          <b>选择附加险</b>
          <div class="select">
            <p v-for="(v,i) in bxList" :data-pid="i">{{v}}</p>
          </div>
        </li>
        <li>
          <span @click="btn(1)">取消</span>
          <span @click="btn(2)">确定</span>
          
        </li>
      </ul>
  </div>
</template>
<script>
// import SingleSelect from './SingleSelect'

export default {
    name: 'addfjx',
    props:['bzPlans','i'],
    // components:{SingleSelect},
    data(){
      return {
        bxname:'',
        bxIndex:0,
        fjcqs:[201],
        fjcqs2016:[203,202],
        bxList:[]
      }
    },
    mounted(){
      let i = this.bzPlans[this.i].mainPro.pid;
      if(i==101){
        this.bxList={'201':'华夏附加常青树重大疾病保险（全能版）'};
      }else if(i==102){
        this.bxList={'203':'华夏附加投保人豁免重大疾病保险','202':'华夏医保通费用补偿医疗保险'};
      }else{
        this.bxList={'204':'聚宝盆养老年金保险','202':'华夏医保通费用补偿医疗保险','205':'金管家养老年金保险','206':'爱相随定期寿险'};
      }
      $('.select').on('click','p',function(){
        $(this).toggleClass('active');
      })
    },
    beforeMount(){
        
    },
    updated(){
      $('.select p:first-child').addClass('active');
    },
    methods:{
      changeBx(val,x,index){
        this.bxname = this.bxList[index].name;
        this.bxIndex = index;
      },
      btn(n){
        let i = this.bxname;

        $('p.active').each((i,v)=>{
          let fjx = {
            pid:'',
            duration:'',
            pname:''
          }
          fjx.pid = $(v).attr('data-pid');
          // fjx.pid ==201?fjx.duration=       附加险期间
        });
        let id = {0:101,1:102}[this.bxIndex];
        this.$emit('next2',i,id);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.popup{
  ul{
    width: 90%;
    min-height: 20em;
    border-radius: 5px;
    background-color: #fff;
    position:absolute;
    left:50%;top: 50%;
    transform:translate(-50%,-50%);
    li{
      height: 3em;text-align: left;line-height: 3em;
      &.title{height: 3em;text-align: center;line-height: 3em;font-weight: bold;font-size: 1.3em;color: @mainGreen;}
      &:last-child{
        box-sizing: border-box;position: absolute;bottom: 0;left: 0;width: 100%;border-top: 1px solid @mainGreen;height: 3.7em;line-height: 3.7em;
        span{
          color: @mainGreen;text-align: center;width: 50%;display: block;float: left;height: 100%;
          &:last-child{background: @mainGreen;color: #fff;border-radius: 0 0 5px 0}
        }
      }
      b{
        color:@black;font-size: 1em;font-weight: bold;display: inline-block;width: 7em;padding-left: 1em;vertical-align: middle;
      }
      .selectlh{
        display: inline-block;font-size: 1em;width:70%;

      }
    }
  }
  .select{
    position: absolute;width: 70%;top: 4.6em;left: 7em;
    p{
      line-height: 2em;padding-left:.3em;border-radius: 5px;
      &.active{
        background: @mainGreen;color:#fff;
      }
    }
  }
}

</style>
