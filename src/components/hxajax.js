//import $ from 'jquery';
// 参数为地址，参数，回调，遮罩，消息，同步 ----- 其中回调为数组时，第一个为成功，第二个为完成，错误采用统一方法
const ajax = {};
export const hxajax = (url,para,callback,mask,msg,sync)=>{
	let param={...para},
        //李聪测试
        // baseUrl='/star/';
        // 生产
        // baseUrl='http://zmt.ihxlife.com/zhjys/';
        // 王林测试
        // baseUrl='http://test.hxlife.com/ssj/zh1/';
        //战龙测试
        baseUrl='http://test.hxlife.com/pcweb/pstserver/';

	// console.log(JSON.stringify(param));
    // alert(JSON.stringify(param));
    if(url.indexOf('http')!=0) url=baseUrl+url;
    $.ajax({
        async:!sync,
        type:'POST',
        url:url,
        cache:false,
        /*dataType:'jsonp',
        jsonp:'callbackparam',
        jsonpCallback:'success_jsonpCallback',*/
        data:param,
        // data:{content:encodeURIComponent(JSON.stringify(param)),uuid:md5},
        beforeSend(){
            if(mask) popalert.waitstart();
        },
        success(data){
            // console.log(JSON.stringify(data));
            // _taq.push({convert_id:"77668073581", event_type:"button"})
            if(msg) popalert.fadewait(data.message);
            if(typeof callback == 'function') callback(data);
            else if(typeof callback == 'object') callback[0](data);
        },
        error(err){
            popalert.fadewait('请求失败，请稍后重试');
            if(typeof callback == 'object' && typeof callback[2] == 'function') callback[2]();
        },
        complete(){
            if(mask) popalert.waitend();
            if(typeof callback == 'object' && typeof callback[1] == 'function') callback[1]();
        }
    });
};

export default ajax;
