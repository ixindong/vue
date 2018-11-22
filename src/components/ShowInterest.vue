<template>
    
    <section class="chen-interestsBox">
    </div>
        <div class="chen-interests">
            <h3>保单利益</h3>
            <p>保单利益如下:</p>
            <ul class="chen-interestsTab">
                <li v-if="index != 3" v-for="(item,index) in tabList" :class="TabActive == index ? 'active' : ''" :key="index"  @click="tabHandle(index,item.num)">
                    <p>{{item.num}}</p>
                    <p>演示利益</p>
                </li>
            </ul>
            <div class="chen-detail">
                <div class="chen-options">
                    <select name="" id="selectChange" @change="selectHandle">
                        <option :value="index" :selected='selected==index' v-for="(item,index) in optionsLength" :key="index">保单年度{{index}}年，被保险人{{item}}时</option>
                    </select>
                    <div class="chen-triangle"></div>
                </div>
                <section class="chen-textBox">
                    <div class="chen-text">
                        <p>现金价值: </p><span>{{presentValue}}</span>元
                    </div>
                    <div class="chen-text">
                        <p>身故金: </p><span>{{death}}</span>元
                    </div>
                    <div class="chen-text">
                        <p>账户价值: </p><span>{{accountValue}}</span>元
                    </div>
                    <div class="chen-text">
                        <p>生存总利益: </p><span>{{sumExistence}}</span>元
                    </div>
                    <div class="chen-text">
                        <p>身故总利益: </p><span>{{sumDeath}}</span>元
                    </div>
                    <div class="chen-arrowBottom" :style="{left:left}">
                        <div class="chen-borderBottomBox">
                            <div class="chen-borderBottom"></div>
                        </div>
                    </div>
                </section>
            </div>
            <section class="chen-rangeContent">
                <ul class="chen-rangeBox">
                    <li id="chenRedu" @click="reduValue">-</li>
                    <li>
                        <input id="range" @change="propertychange()" type="range" :value="rangeValue" min="1" :max="optionsLength.length -1" step="1">
                    </li>
                    <li id="chenAdd" @click="addValue">+</li>
                </ul>
                <p>拖动按钮查看不同年龄段保单利益</p>
            </section>
            <section class="chen-interestsBtn">
                <a href="javascript:;" @click="maskShow">查看利益演示表</a>
            </section>
        </div>
        <section class="chen-mask" v-show="show">
            <section class="chen-contentBox">
                <div class="chen-maskTitle"><span>福临门(吉祥版)</span> <i @click="maskShow">取消</i> </div>
                <ul class="chen-interestsTab">
                    <li v-if="index != 3" v-for="(item,index) in tabList" :class="TabActive == index ? 'active' : ''" :key="index"  @click="tabHandle(index,item.num)">
                        <p>{{item.num}}</p>
                        <p>演示利益</p>
                    </li>
                </ul>
                <section class="chen-contentheight">
                    <ul class="chen-contentText">
                        <li>
                            <span>年度</span>
                            <span>年龄</span>
                            <span>现金价值</span>
                            <span>身故险</span>
                            <span>账户价值</span>
                        </li>
                        <li class="year">
                            <span v-for="(item,index) in interestData[0]" :key='index'>{{parseInt(index)}}</span>
                        </li>
                        <li class="year">
                            <span v-for="(item,index) in age" :key='index'>{{parseInt(item)}}</span>
                        </li>
                        <li class="xianjin">
                            <span v-for="(item,index) in interestData[0]" :key='index'>{{parseInt(item)}}</span>
                        </li>
                        <li class="shengu">
                            <span v-for="(item,index) in interestData[1]" :key='index'>{{parseInt(item)}}</span>
                        </li>
                        <li class="zhanghu">
                            <span v-for="(item,index) in interestData[2]" :key='index'>{{parseInt(item)}}</span>
                        </li>
                    </ul>
                </section>
                
            </section>
        </section>
    </section>
</template>
<script>

import hxAjax from './hxajax'
import index from '_vue@2.5.13@vue';
import Bus from './bus.js';

export default {
  name: "intersts",
  props:['plan','plancodeText'],
  data() {
    return {
      tabList: [
        { num: "3.00%",disabled:false},
        { num: "4.50%",disabled:false},
        { num: "6.00%",disabled:false},
        { num: "5.00%",disabled:true}
      ],
      TabActive: 0,
      msg:'',
      dataInfo: [],
      rangeValue: 1,
      left: "8%",
      selected: 0,
      show: false,
      interestsData:'',
      interestData: '',
      rate: '3.00%',
      age: [],
      optionsLength: 0,
      sumExistence: 0,  //生存总利益
      accountValue: 0, //账户价值
      presentValue: 0, //现金价值
      death: 0, //身故金
      sumDeath: 0 //身故总利益
    }

  },
  computed: {},
  // watch:{
  //   dataInfo(value){
  //       this.getCheckData()
  //   }
  // },
  updated() {
    
  },
  beforeCreate(){

  },
  created (){
    
    let plancodeText = this.plancodeText;
    let myDate = new Date();
    let NowYear = myDate.getFullYear();
    let appageText = '';
    let appageTextsss = this.plan.insurage;
    let appBirthdayText = (NowYear-this.plan.appage-1)+'-10-01';
    let insurageBirthdayText = (NowYear-this.plan.insurage -1)+'-10-01';
    let premText = this.plan.risk[0].prem;
    let payendyearText = (this.plan.risk[0].payendyear).replace(/[^0-9]/ig,"");
    let interstsText = [];
    
    let riskText = this.plan.risk;
    let qunidaye = '';
    let productId = '';
    hxajax('interest/findById.do',{prosId:this.plan.prosCode,type:1},data=>{
      let json = JSON.parse(data);
        qunidaye = json.data.spare1;
        productId = 'HUA0000'+qunidaye;
    })
    // function getQueryString(name) {
    //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    //     var r = window.location.search.substr(1).match(reg);
    //     if (r != null) return unescape(r[2]);
    //     return null;
    // }
    // let ownerText = getQueryString(userid)
    let urlText = window.location.href
    let ownerText = urlText.substr(urlText.length-9);
    //生产
    // let Purl = 'http://zmt.ihxlife.com/gate/proposal/'
    //测试李聪
    // let Purl = 'http://test.hxlife.com/star/sss/proposal/'
    //测试王林
    // let Purl = 'http://test.hxlife.com/ssj/zh2/proposal/'
    //测试战龙
    let Purl = 'http://test.hxlife.com/pcweb/gate/proposal/'
    let data = {"owner":ownerText,"platform":2,"applicant": { "birthday": appBirthdayText, "gender": this.plan.appsex },"insurant": { "birthday": insurageBirthdayText, "gender": this.plan.insursex }}
                let datas = {"loginName":"test","password":"123456"}
                let qwer = JSON.stringify(data)
                let qwert = JSON.stringify(datas)
                let selfInfo = this
        $.ajax({
                    contentType: 'application/json',
                    type: 'post',
                    //测试李聪
                    // url: 'http://test.hxlife.com/star/sss/user/login.json',
                    //测试王林
                    // url: 'http://test.hxlife.com/ssj/zh2/user/login.json',
                    //测试战龙
                    url: 'http://test.hxlife.com/pcweb/gate/user/login.json',
                    //生产
                    // url: 'http://zmt.ihxlife.com/gate/user/login.json',
                    dataType: 'json',
                    asyn: false,
                    data: qwert,
                    success: function(rels) {
                        $.ajax({
                          contentType: 'application/json',
                          type: 'post',
                          url: Purl+'create.json',
                          dataType: 'json',
                          data: qwer,
                          success: function(data) {
                            let contentDetail = data.content.detail[0]
                              let qunimaaaaa = {"planId":data.content.detail[0],"productId":productId,"index":-1}
                              let qunimassssss = JSON.stringify(qunimaaaaa)
                              $.ajax({

                                  contentType: 'application/json',
                                  type: 'post',
                                  url: Purl+'plan/view_clause.json',
                                  dataType: 'json',
                                  data: qunimassssss,
                                  success: function(relss) {
                                      let qunimaaaaaww = {"planId":data.content.detail[0],"productId":"HUA00001"}
                                      let qunimassssssww = JSON.stringify(qunimaaaaaww)
                                      $.ajax({
                                          contentType: 'application/json',
                                          type: 'post',
                                          url: Purl+'plan/list_clause.json',
                                          dataType: 'json',
                                          data: qunimassssssww,
                                          success: function(relqqqq) {
                                              // let term = '';
                                              let term = '';
                                              if(payendyearText == 1000){
                                                 term = 'single'
                                              }else {
                                                  term = 'term_'+payendyearText;
                                              }
                                              let PREMIUMText = premText;
                                              let qunimaqweqw = '';
                                              if(localStorage.qunima!=0){
                                                    let SAVE_TOText = localStorage.SAVE_TO
                                                    let qunimaqwe = {"planId":data.content.detail[0],"detail":[]}
                                                    let zhuxian = {'productId':'HUA00001','factors':{"INSURE":"full_105","PAY":term,"PREMIUM":PREMIUMText,'SAVE_TO':SAVE_TOText}}
                                                    qunimaqwe.detail.push(zhuxian)
                                                    if(riskText.length>0){
                                                        $.each(riskText, function(index, el) {
                                                            if(el.pid == 203){
                                                                 appageText = Number((el.receiveYear).replace(/[^0-9]/ig,""))
                                                               qunimaqwe.detail.push({parentId:"HUA00001",productId:"HUA00003",factors:{INSURE:"full_105",PAY:"single",PREMIUM:el.prem}}) 
                                                            }else if (el.pid == 204) {
                                                                 qunimaqwe.detail.push({parentId:"HUA00001",productId:"HUA00004",factors:{INSURE:"full_105",PAY:"none",PREMIUM:el.prem}}) 
                                                            }
                                                            else if (el.pid == 205) {
                                                                let term = ''
                                                                if(el.payendyear=='-'){
                                                                     term = "single";
                                                                }else {
                                                                      let payText = (el.payendyear).replace(/[^0-9]/ig,"")
                                                                      term = 'term_'+payText;
                                                                }
                                                                 qunimaqwe.detail.push({parentId:"HUA00001",productId:"HUA00002",factors:{INSURE:"full_105",PAY:term,AMOUNT:el.amnt}}) 
                                                            }
                                                        })
                                                    }

                                                   qunimaqweqw = JSON.stringify(qunimaqwe)
                                                hxajax('interest/save.do',{prosId:plancodeText,prosJson:qunimaqweqw,type:'0'},data=>{
                                                    let json = JSON.parse(data);
                                                  })
                                                $.ajax({
                                                    contentType: 'application/json',
                                                    type: 'post',
                                                    url: Purl+'plan/rebuild.json',
                                                    dataType: 'json',
                                                    data: qunimaqweqw,
                                                    success: function(rel111) {
                                                        // let qunima = {"planId":"1006906","style":"benefit"}
                                                        let qunima = {"planId":contentDetail,"style":"benefit"}
                                                        let qunimas = JSON.stringify(qunima)
                                                        $.ajax({
                                                            contentType: 'application/json',
                                                            type: 'post',
                                                            url: Purl+'plan/format.json',
                                                            dataType: 'json',
                                                            data: qunimas,
                                                            success: function(rel) {
                                                                interstsText.push(rel.content.benefit[0])
                                                                interstsText.push(rel.content.benefit[1])
                                                                interstsText.push(rel.content.benefit[2])
                                                                selfInfo.dataInfo = interstsText
                                                                selfInfo.getCheckData()
                                                                console.log(appageText+'11111')
                                                                if(appageText!=''&&appageText!=null&&appageText!='null'&&appageText!=undefined&&appageText!='undefined'){
                                                                  selfInfo.msg = parseInt(rel.content.benefit[0].value[5][appageText-appageTextsss])
                                                                }
                                                                Bus.$emit('msg', selfInfo.msg)
                                                            }
                                                        })
                                                    }
                                                })
                                              }else{
                                                  hxajax('/interest/findById.do',{prosId:plancodeText,type:'0'},data=>{
                                                    let json = JSON.parse(data);
                                                    
                                                    let shajibawanyi = json.data.prosJson
                                                    let prosIdText = JSON.parse(shajibawanyi).planId
                                                    let qunimaqweqw123 = shajibawanyi.replace(/\\/g,'');
                                                    qunimaqweqw = shajibawanyi
                                                    $.ajax({
                                                        contentType: 'application/json',
                                                        type: 'post',
                                                        url: Purl+'plan/rebuild.json',
                                                        dataType: 'json',
                                                        data: qunimaqweqw,
                                                        success: function(rel111) {
                                                            
                                                            // let qunima = {"planId":"1006906","style":"benefit"}
                                                            let qunima = {"planId":prosIdText,"style":"benefit"}
                                                            let qunimas = JSON.stringify(qunima)
                                                            $.ajax({
                                                                contentType: 'application/json',
                                                                type: 'post',
                                                                url: Purl+'plan/format.json',
                                                                dataType: 'json',
                                                                data: qunimas,
                                                                success: function(rel) {
                                                                    
                                                                    interstsText.push(rel.content.benefit[0])
                                                                    interstsText.push(rel.content.benefit[1])
                                                                    interstsText.push(rel.content.benefit[2])
                                                                    if(riskText.length>0){
                                                                      $.each(riskText, function(index, el) {
                                                                          if(el.pid == 203){
                                                                             appageText = Number((el.receiveYear).replace(/[^0-9]/ig,""))
                                                                             
                                                                          }
                                                                      })
                                                                  }
                                                                    selfInfo.dataInfo = interstsText
                                                                    selfInfo.getCheckData()
                                                                    selfInfo.msg = parseInt(rel.content.benefit[0].value[5][appageText-appageTextsss])
                                                                    Bus.$emit('msg', selfInfo.msg)
                                                                }
                                                            })
                                                        }
                                                    })
                                                  })
                                              }  
                                          }
                                      })
                                      
                                  }
                              })
                              
                          }
                      })
                    }
                })

  },
  methods: {
    tabHandle(index,num) {
      this.TabActive = index
      this.rate = num;
      this.getCheckData()
    },
    reduValue() {
      if (this.rangeValue == 1) {
        return;
      }
      this.rangeValue--
      this.left = parseFloat(this.left) - 72 / this.optionsLength.length + "%"
      this.selected--
      this.getCheckData()
    },
    addValue() {
      if (this.rangeValue >= this.optionsLength.length) {
        return
      }
      this.rangeValue++
      this.left = parseFloat(this.left) + 72 / this.optionsLength.length + "%"
      this.selected++
      this.getCheckData()
    },
    propertychange() {
      var newRange = $("#range").val(),
        changeRange = newRange - this.rangeValue;
      this.selected = newRange;
      this.rangeValue = newRange;
      this.left = parseFloat(this.left) + changeRange * 72 / this.optionsLength.length + "%";
      this.getCheckData()
    },
    selectHandle() {
      this.selected = $("#selectChange option:selected").val();
      var changeRange = this.selected - this.rangeValue;
      this.left = parseFloat(this.left) + changeRange * 72 / this.optionsLength.length + "%";
      this.rangeValue = this.selected;
      this.getCheckData()
    },
    maskShow() {
      this.show = !this.show;
    },
    getCheckData(){
      if(this.dataInfo.length > 0){
        this.dataInfo.map((item) => {
          if(item.name.split(' ')[0] === this.rate){
            this.interestsData = item;
            this.age = item.axis
            this.pullInfo(item)
          }
        })
      }
    },
    pullInfo(data){
      // data.value[0].unshift(0)
      // data.value[3].unshift(0)
      this.optionsLength = data.axis;
      this.presentValue =parseInt(data.value[0][this.selected])
      this.death = parseInt(data.value[1][this.selected])
      this.accountValue = parseInt(data.value[2][this.selected])
      this.sumExistence = parseInt(data.value[3][this.selected])
      this.sumDeath = parseInt(data.value[4][this.selected])
      this.interestData = data.value
    }

  },
  mounted() {

  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.qunima{
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 30px;
}
.chen-interestsBox {
  background-color: #40b971;
  padding: 10px;
  margin-top: 1em;
  border-radius: 5px;
}
.chen-interests {
  background-color: white;
  border-radius: 5px;
  line-height: 36px;
  padding: 14px;
}
.chen-interests h3 {
  font-size: 16px;
  text-align: center;
}
.chen-interests p {
  font-size: 14px;
}
.chen-interestsTab {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.chen-interestsTab li {
  border: 1px solid #40b971;
  border-radius: 2px;
  margin: 0 1px;
  background-color: #b9e2ca;
  height: 50px;
  flex-grow: 1;
  color: #40b971;
}
.chen-interestsTab li.active {
  color: white;
  background-color: #40b971;
}
.chen-interestsTab li p {
  line-height: 24px;
  text-align: center;
}
.chen-detail {
  border: 1px solid #40b971;
  margin-top: 20px;
  border-radius: 5px;
  padding: 20px;
  position: relative;
}
.chen-detail .chen-options {
  position: relative;
  height: 30px;
  line-height: 0;
}
.chen-detail .chen-options select {
  padding:0 14%;
  width: 100%;
  height: 30px;
  border: 1px solid #40b971;
  border-radius: 2px;
  background-color: white;
  outline: none;
  appearance: none;
  -moz-appearance: none;
}
.chen-detail .chen-options select option {
  text-align: center;
}
.chen-detail .chen-options select span {
  color: #40b971;
}
.chen-detail .chen-triangle {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #40b971;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.chen-textBox {
  margin-top: 10px;
}
.chen-textBox .chen-text p,
.chen-textBox .chen-text span {
  width: 50%;
  float: left;
  text-align: right;
}
.chen-textBox .chen-text span {
  text-align: left;
  width: auto;
  color: #40b971;
  margin: 0 5px;
}
.chen-borderBottomBox {
  position: relative;
}
.chen-borderBottomBox,
.chen-borderBottom {
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-top: 16px solid #40b971;
}
.chen-borderBottom {
  border-top: 16px solid #fff;
  position: absolute;
  top: -18px;
  left: -16px;
}
.chen-arrowBottom {
  position: absolute;
  left: 0;
  bottom: -16px;
}

.chen-rangeBox {
  margin-top: 15px;
  font-size: 30px;
  color: #40b971;
  overflow: hidden;
  text-align: center;
  display: flex;
}
.chen-rangeBox li:nth-of-type(1),
.chen-rangeBox li:nth-of-type(3) {
  width: 30px;
  float: left;
}
.chen-rangeBox li:nth-of-type(3) {
  float: right;
}
.chen-rangeBox li:nth-of-type(2) {
  width: 96%;
  margin: 0 2%;
}
.chen-rangeBox li input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
}
.chen-rangeBox li input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
.chen-rangeBox li input[type="range"]::-webkit-slider-runnable-track {
  height: 15px;
  border-radius: 10px; /*将轨道设为圆角的*/
  background-color: #40b971;
}
.chen-rangeBox li input[type="range"]:focus {
  outline: none;
}
.chen-rangeBox li input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
  background: #ffffff;
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
  box-shadow: 0 0.05em 0.05em #40b971; /*添加底部阴影*/
}
.chen-rangeContent p {
  text-align: center;
  color: #888;
  font-size: 14px;
}
.chen-interestsBtn {
  text-align: center;
  margin-top: 10px;
}
.chen-interestsBtn a {
  padding: 0 10px;
  font-size: 14px;
  line-height: 30px;
  color: #40b971;
  border: 1px solid #40b971;
  background-color: #b9e2ca;
  display: inline-block;
}
// 弹出框
.chen-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:100;
}
.chen-contentBox {
  height: 86%;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: white;
  z-index: 10000;
}
.chen-contentBox .chen-maskTitle {
  border-bottom: 0.1em solid #acacac;
  text-align: center;
  color: #40b971;
  font-size: 1.2em;
  height: 3em;
  position: relative;
}
.chen-contentBox .chen-maskTitle span {
  height: 3em;
  display: inline-block;
  border-bottom: 0.2em solid #40b971;
  line-height: 3em;
}
.chen-contentBox .chen-maskTitle i{
    position: absolute;
    top: 50%;
    right: 1.0em;;
    transform: translateY(-50%)
}
.chen-contentBox .chen-interestsTab {
  padding: 1em;
}
.chen-contentBox .chen-interestsTab li {
  height: 3em;
}
.chen-contentBox .chen-interestsTab li p {
  line-height: 1.2em;
  margin-top: 0.2em;
}
.chen-contentheight{
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    height: 36em;
}
.chen-contentText{
    -webkit-overflow-scrolling: touch;
    overflow: auto;
}
.chen-contentText li{
    border-top: 0.1em solid #acacac;
    overflow: hidden;
}
.year span:nth-of-type(even),.xianjin span:nth-of-type(even),.shengu span:nth-of-type(even),.zhanghu span:nth-of-type(even),.chen-contentText li:first-of-type{
    background-color: #e7f7ed;
}
.chen-contentText span{
    line-height: 3.0em;
    display: inline-block;
    text-align: center;
    float: left;
    border-right: 0.1em solid #acacac;
}
.chen-contentText span:first-of-type,.chen-contentText span:nth-of-type(2),.year{
    width: 12.5%;
}
.chen-contentText span:nth-of-type(3),.chen-contentText span:nth-of-type(4),.chen-contentText span:last-of-type,.xianjin,.shengu,.zhanghu{
    width: 25%;
}
// .chen-contentText span:last-of-type{
//     border: none;
// }
.year,.xianjin,.shengu,.zhanghu{
  float: left;
}
.year span,.xianjin span,.shengu span,.zhanghu span{
  width: 100% !important;
  display: block;
}
</style>
