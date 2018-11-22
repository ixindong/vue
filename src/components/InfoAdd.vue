<template>
  <div class="ypanel">
      <ul>
        <li><b>姓名</b><input type="text" placeholder="请输入姓名" v-model="plans[listIndex].uname"><span class="del" @click="del">删除</span></li>
        <li><b>性别</b><strong  class="man" @click="clk(0)"><i :class="{ 'active': plans[listIndex].isActive }" ></i>男</strong><strong class="wman" @click="clk(1)"><i :class="{ 'active': !plans[listIndex].isActive}" :key="1"></i>女</strong></li>
        <li class="ageBir"><b>年龄</b><yd-datetime type="date" v-show="!plans[listIndex].confirm"  ref="datetime" class="selectbt" v-model="plans[listIndex].birth" :startDate="startDate" :endDate="endDate" :callback="showThis"></yd-datetime><div @click="chooseBirDate" class="fakeinput"><input type="text" placeholder="生日（选填）" v-show="plans[listIndex].confirm" class="selectbtfake" disabled="disabled"></div><single-select :class="['selectlh',{'fake':plans[listIndex].confirm}]" :opts="ageList"  @change="changeAge" title="选择年龄" v-model="plans[listIndex].age"></single-select></li>
      </ul>
  </div>
</template>
<script>
import SingleSelect from './SingleSelect'
export default {
    name: 'infoadd',
    props: {
      listIndex: Number,
      plans: Array
    },
    data(){
        return {
            ageList:[],
            birthShow:false,
            confirmNum:0
        }
    },
    components:{SingleSelect},
    watch:{
      confirmNum(val){
        console.log(val);
        // this.plans[this.listIndex].confirm=val==2?false:true;
      }
    },
    computed:{
      endDate(){
        let n=new Date();
        n.setFullYear(n.getFullYear());
        n.setDate(n.getDate());
        return this.getDates(n);
      },
      startDate(){
        let n=new Date();
        n.setFullYear(n.getFullYear()-80);
        n.setDate(n.getDate());
        return this.getDates(n);
      }
    },
    methods:{
        del(){
          let n = this.listIndex;
            this.$emit('delInfo',n);
        },
        clk(n){
          this.plans[this.listIndex].sexNum=(n==0?1:2);
          this.plans[this.listIndex].sex=(n==0?'男':'女');
          this.plans[this.listIndex].isActive =(n==0?true:false);
        },
        changeAge(val,x,index){
          let ageNum = parseFloat(val);
          if(this.birth!=''){
            this.birth=common.GetDateStr(0,-(ageNum));
            this.plans[this.listIndex].birth=common.GetDateStr(0,-(ageNum));
          }
          this.plans[this.listIndex].age=val;
        },
        getDates(date){
            let y=date.getFullYear(),m=date.getMonth()+1,d=date.getDate();
            return y+'-'+this.fillZero(m)+'-'+this.fillZero(d);
        },
        fillZero(n){
            let txt='0'+n;
            return txt.substr(-2);
        },
        chooseBirDate(){
          this.$refs.datetime.open();
        },
        showThis(){
          //隐藏虚拟input
          if(this.confirmNum==2){
            this.plans[this.listIndex].confirm=false;
            this.plans[this.listIndex].age = common.jsGetAge(this.plans[this.listIndex].birth) +'岁';
          }
          
          this.confirmNum!=2?(this.confirmNum++):'';
          // this.confirmNum==3?$('.fakeinput').val(this.plans[this.listIndex].birth):'';
        }
    },
    mounted(){
      this.plans[this.listIndex].confirm=true;
      this.plans[this.listIndex].age=String(30)+'岁';
      if(this.plans[this.listIndex].sexNum){
        this.isActive=this.plans[this.listIndex].sexNum == 1?true:false; 
      }else{
        this.plans[this.listIndex].sexNum=1;this.plans[this.listIndex].sex='男'
      }
      for(let i=0;i<80;i++){
        this.ageList.push({'name':String(i)+'岁'});
      }
      //初始化生日日期
      let newBir=new Date();
      newBir.setFullYear(newBir.getFullYear()-30);
      newBir.setDate(newBir.getDate());
      this.plans[this.listIndex].birth = this.getDates(newBir);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import url(../assets/css/common.less);
.ypanel{
  background: #fff;
  // height: 15em;
  border-radius: 8px;
  border:1px solid @mainGreen;
  margin-bottom: 1em;
  ul{
    padding: 0 .7em;font-size: 1.2em;
    li{
      height:3.7em;line-height: 3.7em;border-bottom: 1px solid #eee;
      &:last-child{border-bottom: none;}
      b{
        display: inline-block;width: 5em;font-weight: bold;color: @black;vertical-align: middle;
      }
      strong{
        display: inline-block;margin-right: 3em;
        i{
          width:1.3em;height: 1.3em;display: inline-block;margin-right: .5em;background: url('../assets/images/icon-c-noact.png') no-repeat center center;background-size: 100%;vertical-align: middle;
          &.active{
            background: url('../assets/images/icon-c-act.png');background-size: 100%;
          }
        }
      }
      span.del{
        position: absolute;right: 2em;padding-left: 1.3em;color: @mainGreen;background:url('../assets/images/ydel.png') no-repeat left center;background-size: 30%;
      }
      &.ageBir{
        position: relative;
        input{
          border:1px solid @lightGray;height: 2em;border-radius: 5px;
        }
      }
    }
  }
}
.selectlh{
  display: inline-block;width: 33%;box-sizing: border-box;background:url('../assets/images/ydrop.png') no-repeat 5.5em center;background-size: 15%;padding-left: .8em;border:1px solid @lightGray;height: 2em;border-radius: 5px;
  &.fake{
    margin-left: 41.5%;
  }
}
.selectbt{
  padding-left: 2em;margin-right: .5em;background:url('../assets/images/ycalender.png') no-repeat .4em center;background-size: 15%;border:1px solid @lightGray;height: 2em;width: 39%;border-radius: 5px;display: inline-block;line-height: 2em;
  
}
.selectbtfake{
  padding-left: 2em;margin-right: .5em;background:url('../assets/images/ycalender.png') no-repeat .4em center;background-size: 15%;border:1px solid @lightGray;height: 2em;border-radius: 5px;display: inline-block;line-height: 2em;width:100%;
  
}
.fakeinput{
    position: absolute;top: 50%;left: 5em;transform:translateY(-50%);width: 39%;
  }

</style>
