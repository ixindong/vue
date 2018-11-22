<template>
    <section class="chen-interestsBox">
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
                        <option :value="index" :selected='selected==index' v-for="(item,index) in optionsLength" :key="index">被报年度{{index + 1}}年，被保人{{item}}时</option>
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
                <div class="chen-maskTitle"><span>福临门（吉祥版）</span> <i @click="maskShow">取消</i> </div>
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
                            <span v-for="(item,index) in interestData[0]" :key='index'>{{index + 1}}</span>
                        </li>
                        <li class="year">
                            <span v-for="(item,index) in age" :key='index'>{{parseInt(item)}}</span>
                        </li>
                        <li class="xianjin">
                            <span v-for="(item,index) in interestData[0]" :key='index'>{{item.toFixed(2)}}</span>
                        </li>
                        <li class="shengu">
                            <span v-for="(item,index) in interestData[1]" :key='index'>{{item.toFixed(2)}}</span>
                        </li>
                        <li class="zhanghu">
                            <span v-for="(item,index) in interestData[2]" :key='index'>{{item.toFixed(2)}}</span>
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

export default {
  name: "intersts",
  data() {
    return {
      tabList: [
        { num: "3.00%",disabled:false},
        { num: "4.50%",disabled:false},
        { num: "6.00%",disabled:false},
        { num: "5.00%",disabled:true}
      ],
      dataInfo: [
        {"name":"3.00% 演示利率","title":["现金价值","身故金","账户价值","生存总利益","身故总利益"],"axis":["46岁","47岁","48岁","49岁","50岁","51岁","52岁","53岁","54岁","55岁","56岁","57岁","58岁","59岁","60岁","61岁","62岁","63岁","64岁","65岁","66岁","67岁","68岁","69岁","70岁","71岁","72岁","73岁","74岁","75岁","76岁","77岁","78岁","79岁","80岁","81岁","82岁","83岁","84岁","85岁","86岁","87岁","88岁","89岁","90岁","91岁","92岁","93岁","94岁","95岁","96岁","97岁","98岁","99岁","100岁","101岁","102岁","103岁","104岁"],"value":[[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000]]},
        {"name":"4.50% 演示利率","title":["现金价值","身故金","账户价值","生存总利益","身故总利益"],"axis":["46岁","47岁","48岁","49岁","50岁","51岁","52岁","53岁","54岁","55岁","56岁","57岁","58岁","59岁","60岁","61岁","62岁","63岁","64岁","65岁","66岁","67岁","68岁","69岁","70岁","71岁","72岁","73岁","74岁","75岁","76岁","77岁","78岁","79岁","80岁","81岁","82岁","83岁","84岁","85岁","86岁","87岁","88岁","89岁","90岁","91岁","92岁","93岁","94岁","95岁","96岁","97岁","98岁","99岁","100岁","101岁","102岁","103岁","104岁"],"value":[[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000]]},
        {"name":"6.00% 演示利率","title":["现金价值","身故金","账户价值","生存总利益","身故总利益"],"axis":["46岁","47岁","48岁","49岁","50岁","51岁","52岁","53岁","54岁","55岁","56岁","57岁","58岁","59岁","60岁","61岁","62岁","63岁","64岁","65岁","66岁","67岁","68岁","69岁","70岁","71岁","72岁","73岁","74岁","75岁","76岁","77岁","78岁","79岁","80岁","81岁","82岁","83岁","84岁","85岁","86岁","87岁","88岁","89岁","90岁","91岁","92岁","93岁","94岁","95岁","96岁","97岁","98岁","99岁","100岁","101岁","102岁","103岁","104岁"],"value":[[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000]]},
        {"name":"5.00% 演示利率","title":["现金价值","身故金","账户价值","生存总利益","身故总利益"],"axis":["46岁","47岁","48岁","49岁","50岁","51岁","52岁","53岁","54岁","55岁","56岁","57岁","58岁","59岁","60岁","61岁","62岁","63岁","64岁","65岁","66岁","67岁","68岁","69岁","70岁","71岁","72岁","73岁","74岁","75岁","76岁","77岁","78岁","79岁","80岁","81岁","82岁","83岁","84岁","85岁","86岁","87岁","88岁","89岁","90岁","91岁","92岁","93岁","94岁","95岁","96岁","97岁","98岁","99岁","100岁","101岁","102岁","103岁","104岁"],"value":[[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[5892.5,6244.5,6617.799999999999,7013.6,7153.5,7301.7,7458.7,7625.2,7801.7,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,8815.2,8861.8,8907.1,8951.1,8993.9,9035.3,9075.4,9114.3,9151.900000000001,9188.4,9223.9,9258.300000000001,9291.8,9324.5,9356.699999999999,9388.5,9420.2,9452.2,9484.9,9518.9,9554.9,9594.1,9638.8,9692.4,9750,9804.6],[10000,10000,10000,10000,10000,10000,10000,10000,10000,11585.2,11771.099999999999,11964.5,12165.599999999999,12374.7,12592.2,12818.4,13053.599999999999,13298.099999999999,13552.4,13816.800000000001,14091.7,14377.5,14674.7,14983.5,15304.5,15638.199999999999,15984.9,16345.2,16719.4,17108.1,17511.600000000002,17930.4,18364.8,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000]]}
      ],
      TabActive: 0,
      rangeValue: 1,
      left: "8%",
      selected: 0,
      show: false,
      interestsData:'',
      interestData: '',
      rate: '3.00%',
      age: 0,
      optionsLength: 0,
      sumExistence: 0,  //生存总利益
      accountValue: 0, //账户价值
      presentValue: 0, //现金价值
      death: 0, //身故金
      sumDeath: 0 //身故总利益
    };
  },
  computed: {},
  updated() {},
  created() {
    this.getCheckData()
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
      this.optionsLength = data.axis;
      this.presentValue =data.value[0][this.selected].toFixed(2)
      this.death = data.value[1][this.selected].toFixed(2)
      this.accountValue = data.value[2][this.selected].toFixed(2)
      this.sumExistence = data.value[3][this.selected].toFixed(2)
      this.sumDeath = data.value[4][this.selected].toFixed(2)
      this.interestData = data.value
    }

  },
  mounted() {},
  props: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.chen-interestsBox {
  background-color: #40b971;
  padding: 10px;
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
}
.chen-contentBox {
  height: 86%;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: white;
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
.chen-contentText span:last-of-type{
    border: none;
}
.year,.xianjin,.shengu,.zhanghu{
  float: left;
}
.year span,.xianjin span,.shengu span,.zhanghu span{
  width: 100% !important;
  display: block;
}
</style>
