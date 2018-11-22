<template>
  <div class="popup">
      <ul>
        <li class="title">选择投/被保险人</li>
        <li>
          <b>投保人</b>
          <single-select class="selectlh" :opts="members" v-model="tname" @change="changeNameShow" title="请选择投保人"></single-select><span></span>
        </li>
        <li>
          <b>被保险人</b>
          <single-select class="selectlh" :opts="members" v-model="bname" @change="changeNameShow2" title="请选择被保人" ></single-select><span></span>
        </li>
        <!-- <li>
          <b>选择主险</b>
          <single-select class="selectlh" :opts="bxList" v-model="bxname" @change="changeBx" title="选择主险" ></single-select><span></span>
        </li> -->
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
    name: 'addmember',
    props:['plans','bzPlans','i'],
    components:{SingleSelect},
    data(){
      return {
        members:[],
        ages:[],
        sexs:[],
        tname:'',
        bname:'',
        tdata:{},
        bdata:{}
      }
    },
    mounted(){
      for(let val of this.plans){
        this.members.push({'name':val.uname});
        this.ages.push(parseFloat(val.age));
        let s = val.sex=='男'?'M':'F';
        this.sexs.push(s);
      }
      this.tname = this.members[0].name;
      this.bname = this.members[0].name;
      this.tdata.name = this.members[0].name;
      this.bdata.name = this.members[0].name;
      // this.makeplan.appname = this.tname;
      this.tdata.sex = this.sexs[0];
      this.tdata.age= this.ages[0];
      // this.makeplan.insurname = this.bname;
      this.bdata.sex = this.sexs[0];
      this.bdata.age= this.ages[0];
    },
    methods:{
      changeNameShow(val,x,index){
        this.tname = this.members[index].name;
        this.tdata.name = this.tname;
        this.tdata.sex = this.sexs[index];
        this.tdata.age= this.ages[index];
      },
      changeNameShow2(val,x,index){
        this.bname = this.members[index].name;
        this.bdata.name = this.bname;
        this.bdata.sex = this.sexs[index];
        this.bdata.age= this.ages[index];
      },
      // changeBx(val,x,index){
      //   this.bxname = this.bxList[index].name;
      //   this.bxIndex = index;
      // },
      // changeDuration(val,x,index){
      //   this.duration = this.durationList[index].name;
      // },
      btn(n){
        let t,b,i,id;
        if(n==2){
          t = this.tdata;
          b = this.bdata;
          i = this.bxname;
          // id = {0:101,1:102}[this.bxIndex];
          // console.log(id)
          // if(id==101){
          //   if(b.age>50){
          //     popalert.fade('被保人年龄需小于50岁');return;
          //   }
          // }else if(id==102){
          //   if(b.age>60){
          //     popalert.fade('被保人年龄需小于60岁');return;
          //   }
          // }
          console.log(t,b)
        }
        // let suredata = this.makeplan;
        this.$emit('next',n,t,b,i);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.popup{
  ul{
    padding: 0 1em;
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
          text-align: center;width: 50%;display: block;float: left;height: 100%;border-radius: 0 0 0 5px;background: #fff;color: @mainGreen;
          &:last-child{background: @mainGreen;color: #fff;border-radius: 0 0 5px 0}
        }
      }
      b{
        color:@black;font-size: 1em;font-weight: bold;display: inline-block;width: 6em;vertical-align: middle;height: 2.9em;
      }
      .selectlh{
        display: inline-block;font-size: 1em;width:70%;background:url('../assets/images/ydrop.png') no-repeat right center;background-size: 9%;padding-left: .8em;
      }
      span{
        // position: absolute;width: 2em;height: 2em;background:red;top: 54%;right: .5em;transform:translateY(-50%);background:url('../assets/images/ydrop.png') no-repeat;background-size: 80%;background-position: center;
      }
    }
  }
}

</style>
