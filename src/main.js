// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/hammer.min';
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
import popalert from './components/popalert'
import './assets/css/jquery-weui.min.css';
import './assets/js/jquery-weui.min';
import './assets/js/weChat_share.js'
import './assets/js/noshare'


import common from './components/common'
import './assets/css/mpicker.css'
import './assets/js/mPicker.js'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import {hxajax} from './components/hxajax'
Vue.use(YDUI);


// console.log(configData)
// doShare("","分享标题","分享描述","www.baidu.com","http://zmt.ihxlife.com/hxyun/images/share.png");

Vue.config.productionTip = false;
window.popalert = popalert;
window.hxajax=hxajax;
window.sysSource='01';
window.common = common;

const historyStack = {
    data: {
        history: [],
        forward: true
    },
    watch: {
        '$route' (to, from) {
            document.title=to.meta.txt;
            if(this.history.length > 0 && to.path == this.history[this.history.length - 1]){
                this.forward = false;
                this.history.pop();
            }else{
                this.forward = true;
                this.history.push(from.path);
            }
        }
    }
};
// window.addEventListener("popstate", function(e) { 
//         historyStack.forward=false;
//     }, false);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
