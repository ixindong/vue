const common = {};
// common.imgCodeUrl = "http://pcwebtest.ihxlife.com/website/server/checkCode/getAuthCode.do?type='3'&ts=";
common.imgCodeUrl = function(obj){
    hxajax('checkCode/getAuthCode2.do',{},data=>{
        var dataA = JSON.parse(data);
        obj.uuid = dataA.key;
        obj.imgUrl = dataA.url;
        return dataA.url;
     });
}
// $.ajax({
//     async: false,
//     type:'POST',
//     url:'http://test.hxlife.com/pcweb/checkCode/getAuthCode2.do?',
//     dataType:'json',
//     data:{
//         type:3
       
//     },
//     success:function(data){
//         console.log(data);
//         if(data.status == 'fail'){
//             $("#"+errorId).show().html(data.message);
//             flag = false; 
//             /* return; */
//         }
//     }
// })
//将名字后面的部分变成*
common.changeName =(str)=>{
    let arr = str.split('');
    let Len = arr.length;
    for(let a=0;a<Len;a++){
        if(a!=0){
            arr[a] = '*';
        }
    }
    return arr.join('');
}
//手机号码中间四位变成*
common.changeTel=(str)=>{
    let arr = str.split('');
    arr.splice(3,4,'*','*','*','*');
    return arr.join('');
}
//将身份证后6位变成*
common.changeIdentity=(str)=>{
    let arr = str.split('');
    arr.splice(-6,6,'*','*','*','*','*','*');
    return arr.join('');
}
//将-改成年月日
common.changeDateText=(str)=>{
    let arr = str.split(' ')[0].split('');
    arr.splice(4,1,'年');
    arr.splice(7,1,'月');
    str = arr.join('')+'日';
    return str;
}
//校验手机号正则
common.checkTel = /^1[3|4|5|7|8][0-9]{9}$/;
//校验密码正则
common.checkPass = /^([0-9]|[a-z]){6,18}$/;
//身份证校验正则
// common.checkIden = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// common.checkIden = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
common.checkIden = function(sId) {
    let aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
    let iSum = 0;
    let info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return false;
    let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    let d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false;
    for (let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) return false;
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
};
//邮箱正则
common.checkEmail =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//确定有无保单
common.hasPolicy = function(userId,mobile){
    let dataInfo = "{'user_id':'"+userId+"','mobile':'"+mobile+"'}";
    hxajax('member/queryMemberList.do',{dataInfo:dataInfo},data=>{
        let json = JSON.parse(data);
        console.log(json);
        if(json.policys.length==0){
            sessionStorage.setItem('hasPolicy','N');
        }else{
            sessionStorage.setItem('hasPolicy','Y');
        }
    })
};
//已知码转性别
common.getSexText = function(num) {
    if(num=='0'){
        return '男';
    }else if(num=='1'){
        return '女';
    }else{
        return '未知';
    }
};
common.getSexText1 = function(num) {
    if(num=='F'){
        return '女';
    }else if(num=='M'){
        return '男';
    }else{
        return '未知';
    }
};
//性别转码
common.getSexCode = function(num) {
    if(num=='男'){
        return '0';
    }else if(num=='女'){
        return '1';
    }else{
        return '2';
    }
};
//证件类型转码
common.getIdentityCode = function(str) {
    if(str=='身份证'){
        return '01';
    }else if(str=='户口簿'){
        return '02';
    }else if(str=='驾驶证'){
        return '03';
    }else if(str=='军官证'){
        return '04';
    }else if(str=='士兵证'){
        return '05';
    }else if(str=='军官离职退休证'){
        return '06';
    }else if(str=='护照'){
        return '07';
    }else if(str=='异常身份证'){
        return '08';
    }else if(str=='港澳通行证'){
        return '09';
    }else if(str=='台湾通行证'){
        return '10';
    }else if(str=='港澳居民通行证'){
        return '11';
    }else if(str=='台胞证'){
        return '12';
    }else if(str=='出生证'){
        return '13';
    }else if(str=='外国护照'){
        return '51';
    }else if(str=='旅行证'){
        return '52';
    }else if(str=='居留证件'){
        return '53';
    }else if(str=='武警身份证'){
        return '98';
    }else{
        return '99';
    }
};
//码转证件类型
common.getIdentityText = function(str) {
    if(str=='01'){
        return '身份证';
    }else if(str=='02'){
        return '户口簿';
    }else if(str=='03'){
        return '驾驶证';
    }else if(str=='04'){
        return '军官证';
    }else if(str=='05'){
        return '士兵证';
    }else if(str=='06'){
        return '军官离职退休证';
    }else if(str=='07'){
        return '护照';
    }else if(str=='08'){
        return '异常身份证';
    }else if(str=='09'){
        return '港澳通行证';
    }else if(str=='10'){
        return '台湾通行证';
    }else if(str=='11'){
        return '港澳居民通行证';
    }else if(str=='12'){
        return '台胞证';
    }else if(str=='13'){
        return '出生证';
    }else if(str=='51'){
        return '外国护照';
    }else if(str=='52'){
        return '旅行证';
    }else if(str=='53'){
        return '居留证件';
    }else if(str=='98'){
        return '武警身份证';
    }else{
        return '其他证件';
    }
};
//选择省下拉插件(暂时不用)
common.mPicker = function(obj,arr,num,o,fun) {
    let method3=obj.mPicker({
        level:1,
        dataJson:arr,
        Linkage:false,
        rows:6,
        height: Math.ceil($(window).width()*0.037*2.4),
        idDefault:true,
        header:'<div class="mPicker-header">'+(num==0?"请选择省":(num==1?"请选择市":"请选择区/县"))+'</div>',
        confirm:function(){
            fun(arr[obj.data('id1')].code,o);
        },
        cancel:function(){
            //console.info($('.select-value3').data('id1'));
        }
    });
    let sty='<style id="mpickfix">.mPicker-content li{line-height:'+Math.ceil($(window).width()*0.037*2.4)+'px;}</style>';
    if($('#mpickfix').length==0) $('head').append(sty)
};
//获取省集合
common.getProvinceList = function() {
    hxajax('pcArea/area.do',null,data=>{
        sessionStorage.setItem('provinceList',data);
    });
};
//获取市/县集合
common.getCityList = function(num,obj,callback) {
    hxajax('pcArea/queryByCityOrArea.do',{cityOrArea:num},data=>{
        callback(data,obj);
    });
};
//获取省名称
common.getProvinceName = function(code) {
    let arr = JSON.parse(sessionStorage.getItem('provinceList')).data,Len=arr.length;
    for(let i=0;i<Len;i++){
        if(arr[i].code==code){
            return arr[i].name;
        }
    }
};
//获取市/县名称
common.getCityName = function(code,num,callback) {
    hxajax('pcArea/queryByCityOrArea.do',{cityOrArea:num},data=>{
        let arr = JSON.parse(data).data,Len=arr.length;
        for(let i=0;i<Len;i++){
            if(arr[i].code==code){
                callback(arr[i].name);
            }
        }
    });
};
//获取日期
common.GetDateStr = function(AddDayCount,addYear) {
    let dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    if(addYear!=undefined){
        dd.setFullYear(dd.getFullYear()+addYear);
    }
    let y = dd.getFullYear();
    let m = ((dd.getMonth()+1)>9?(dd.getMonth()+1):"0"+(dd.getMonth()+1));//获取当前月份的日期
    let d = (dd.getDate()>9?dd.getDate():"0"+dd.getDate());
    return y+"-"+m+"-"+d;
};
//获取时间
common.getHour = function(){
    let dd = new Date();
    let h = dd.getHours();
    return h;
};
//获取半小时之后时间
common.getHalfHour = function (date) {
    date.setMinutes (date.getMinutes () + 30);
    let m = date.getMonth ();
    let y = date.getFullYear();
    let d = date.getDate ();
    let h = date.getHours ();
    let mm = date.getMinutes ();
    let s = date.getSeconds();
    console.log(new Date(y,m,d,h,mm,s));
    sessionStorage.setItem('availableTime',new Date(y,m,d,h,mm,s).getTime());
};
//获取预约人数
common.getPeople = function (obj){
    hxajax('pcMaintainBase/maintain.do',null,data=>{
        let json1 = JSON.parse(data);
        let subs = json1.subs.base;
        console.log(json1);
        hxajax('expertTeam/countExpertTeam.do',null,data=>{
            let json = JSON.parse(data);
            console.log(json);
            obj.peopleNum = subs+json.num;
        });
    });
};
//由身份证号获取性别、出生日期
common.doIdentify = function (obj, str) {
    if(str.length-2!=='*'){
        let birthdayno,sexno;
    if(str.length==18){
        birthdayno=str.substring(6,14);
        sexno=str.substring(16,17);
    }else if(str.length==15){
        birthdayno="19"+str.substring(6,12);
        sexno=str.substring(14,15);
    }
    if(sexno%2==0){
        obj.sexCode='1';//女
        obj.sex='女';
    }else{
        obj.sexCode='0';//男
        obj.sex='男';
    }
    obj.birthday = birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8);
    console.log(obj.sexCode+' '+obj.birthday);
    }
    
};
common.idensex = function (str) {
    let sexno;
    if(str.length==18){
        sexno=str.substring(16,17);
    }else if(str.length==15){
        sexno=str.substring(14,15);
    }
    if(sexno%2==0){
        return '女';
    }else{
        return '男';
    }
};
common.idenbirth = function (str) {
    let birthdayno;
    if(str.length==18){
        birthdayno=str.substring(6,14);
    }else if(str.length==15){
        birthdayno="19"+str.substring(6,12);
    }
    return birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8);
};
//校验图片验证码
common.checkPicCode = function (obj) {console.log(obj.uuid);
    hxajax('pcCheckCode/checkVerificationCode.do',{'type':'3','code':obj.code,'uuid':obj.uuid},data=>{
        
        let json = JSON.parse(data);
        console.log(json)
        if(json.result=='success'){
            obj.yzmFlag = '1';
            obj.uuid = json.txyzuuid;
        }else{
            obj.yzmFlag = '0';
        }
    },false,false,true);
};
//发送短信验证码
common.telyzm = function (obj,num) {
    // hxajax('checkCode/getAuthCode2.do',{'uuid':obj.uuid},data=>{
    //     console.log(data)
    //     var dataA = JSON.parse(data);
    //     obj.uuid = dataA.;
    //     $('.code').attr('src',dataA.url);
         
    //  });
    //num=1:修改绑定手机
    //num=2:忘记密码
    //num=3:登录
    //num=4:注册
    if(num!=1){
        if(obj.tel==''){
            obj.tipShow = true;
            obj.tipText = '手机号码不能为空';
            return;
        }else if(!common.checkTel.test(obj.tel)){
            obj.tipShow = true;
            obj.tipText = '请填写正确的手机号码';
            obj.tel = '';
            return;
        }
    }
    // if(num==2||num==3||num==4){
        if(obj.code==''){
            obj.tipShow = true;
            obj.tipText = '请填写图片验证码';
            return;
        }else{
            common.checkPicCode(obj);
            if(obj.yzmFlag=='0'){
                obj.tipShow = true;
                obj.tipText = '只有填写正确的图片验证码，才可以发送短信验证码！';
                return;
            }else{
                obj.tipShow = false;
            }
        }
    // }
    console.log(obj.flag)
    if(obj.flag==true){
        obj.flag = false;
        code();
    }
    function clock() {
        if(obj.count>1){
            obj.codeText = obj.count+'s后重新发送';
            obj.count = obj.count - 1;
            obj.timer = setTimeout(clock,1000);
        }else{
            obj.codeText = '点击发送验证码';
            obj.count = 60;
            obj.flag = true;
        }
    }
    function code() {
        obj.count=60;
        clock();
        let para;
        // if(num==1){
        //     let tel = '';
        //     if(obj.time==1){
        //         tel = sessionStorage.getItem('mobile');
        //     }else{
        //         tel = obj.tel;
        //     }
        //     para = {"tel":tel,"type":"dl","useType":"mobile","uuid":obj.uuid};
        // }else{
            para = {"tel":obj.tel,"type":"dl","useType":"mobile","uuid":obj.uuid};
        // }
        hxajax('login/sendVercode.do',para,data=>{
            
            let json = JSON.parse(data);
            console.log(json)
            if(json.result=='success'){
                obj.codeNumMsg = json.msgCode;
                obj.tipShow = false;
                // obj.code0 = json.data.chk_code;
                // obj.uuid = json.fsdxuuid;
                // obj.uuid = 123456789;
            }else if(json.result=='fail_msg'){
                obj.tipShow = true;
                obj.tipText = json.message;
                window.location.href='#'
            }
            else{
                obj.tipShow = true;
                obj.tipText = json.message;
                obj.codeText = '点击发送验证码';
                clearInterval(obj.timer);
                obj.count = 60;
                obj.flag = true;
            }
        });
    }
};
//校验短信验证码
common.checkTelCode = function(obj){
    hxajax('login/checkTelCode.do',{'tel':obj.tel,'code':obj.code0},data=>{
        let json = JSON.parse(data);
        if(json.status == 'fail'){
            obj.tipShow = true;
            obj.tipText = json.message;
            obj.code0='';
            // obj.codeNumMsg = '';
            clearInterval(obj.timer);
            obj.codeText = '点击发送验证码';
            obj.imgSrc = common.imgCodeUrl+ new Date().getTime();
        }else{
            obj.tipShow = false;
            clearInterval(obj.timer);
            obj.uuid = json.dxfsuuid;
            obj.codeText = '点击发送验证码';
            obj.flag = true;
            console.log(obj.uuid);
            console.log(json.dxfsuuid);
        };
    },false,false,true);
};
//选择插件跳转页面前消失函数
common.mpickerhide = function () {
    $('.mPicker-mask').addClass('hide');
    $('.mPicker-main').addClass('down');
    setTimeout(()=>{
        $('.mPicker').addClass('hide');
        $('.mPicker-main').remove();
    },500);
};
//获取百度百科分页请求函数
common.getinsureWikiList=function(obj,over){
    let type;
    if(obj.env == 'env0'){
        type = 'bh';
    }else if(obj.env == 'env1'){
        type = 'xj';
    }else if(obj.env == 'env2'){
        type = 'gl';
    }else if(obj.env == 'env3'){
        type = 'al';
    }else if(obj.env == 'env4'){
        type = 'zn';
    }else if(obj.env == 'env5'){
        type = 'qt';
    }
    if(over==1){
        obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
    }
    hxajax('insuranceEncyclopedia/getInsuranceFindInPage.do',{'type':type,'page':obj.page,'rows':obj.pageSize,mandarinType:'all'},data=>{
        let json = JSON.parse(data);
    console.log(json);
    if(json.result=="success"){
        obj.List = [...obj.List,...json.data];
        obj.List = obj.List.reverse();
        obj.totalPage = Math.ceil(json.total/obj.pageSize);
        if (json.data.length < obj.pageSize || obj.page >=obj.totalPage) {
            obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            return;
        }
        obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        obj.page++;
    }
});
};
//获取新闻公益分页请求函数
common.getnewsPublicList=function(obj,over) {
    if(over==1){
        obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
    }
    hxajax('aboutUs/getAboutUsInfo.do',{type:1,queryType:obj.queryType,'page':obj.page,'rows':obj.pageSize},data=>{
        let json = JSON.parse(data);
    console.log(json);
    if(json.result_code=='0000'){
        obj.List = [...obj.List,...json.data];
        obj.totalPage = Math.ceil(json.total/obj.pageSize);
        if (json.data.length < obj.pageSize || obj.page >=obj.totalPage) {
            obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            return;
        }
        obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        obj.page++;
    }
});
};
//我的资料页判断有无保单函数
common.getSaveFlag=function(bool,obj) {
    if(bool==true){
        if(sessionStorage.getItem('hasPolicy')=='N'){
            //没有保单
            obj.saveFlag = true;
        }else{
            //有保单
            obj.saveFlag = false;
        }
    }else{
        obj.saveFlag = true;
    }
};
//我的资料页显示信息函数
common.showMessage=function(obj){
    obj.show = true;
    var dataInfo = "{'user_id':'"+sessionStorage.getItem('userId')+"','id_type':'"+sessionStorage.getItem('idType')+"','id_no':'"+sessionStorage.getItem('idNo')+"','mobile':'"+sessionStorage.getItem('mobile')+"'}";
    hxajax('member/queryMemberInfo.do',{dataInfo:dataInfo},data=>{
        var json = JSON.parse(data);
        console.log(json);
    if(json.result == "succ"){
        obj.name = json.user_infos[0].user_info_bind.user_name;
        obj.id_type = common.getIdentityText(json.user_infos[0].user_info_bind.id_type);
        obj.id_no = sessionStorage.getItem('hasPolicy')=='Y'?common.changeIdentity(json.user_infos[0].user_info_bind.id_no):json.user_infos[0].user_info_bind.id_no;

        obj.sex = common.getSexText1(json.user_infos[0].user_info_bind.sex);
        obj.birthday = json.user_infos[0].user_info_bind.birthday;
        obj.email = json.user_infos[0].user_info_bind.email;
        obj.provinceCode = json.user_infos[0].user_info_bind.province;
        obj.cityCode = json.user_infos[0].user_info_bind.city;
        obj.areaCode = json.user_infos[0].user_info_bind.area;
        obj.province = (json.user_infos[0].user_info_bind.province=='null'?'':common.getProvinceName(json.user_infos[0].user_info_bind.province));
        if(obj.provinceCode!=null){
            common.getCityList(obj.provinceCode,obj,function(arr) {
                obj.cityList = JSON.parse(arr).data;
            });
        }
        if(obj.cityCode!=null){
            common.getCityList(obj.cityCode,obj,function(arr) {
                obj.aeraList = JSON.parse(arr).data;
            });
        }
        if(json.user_infos[0].user_info_bind.city=='null'){
            obj.city = '';
        }else{
            common.getCityName(json.user_infos[0].user_info_bind.city,json.user_infos[0].user_info_bind.province,function (str) {
                obj.city = str;
            });
        }
        if(json.user_infos[0].user_info_bind.area=='null'){
            obj.area = '';
        }else{
            common.getCityName(json.user_infos[0].user_info_bind.area,json.user_infos[0].user_info_bind.city,function (str) {
                obj.area = str;
            });
        }
        obj.address = json.user_infos[0].user_info_bind.address;
    }
    
});
};
//我的保单页获取保单列表函数
common.policyList=function(obj) {
    var dataInfo = "{'user_id':'"+sessionStorage.getItem('userId')+"','mobile':'"+sessionStorage.getItem('mobile')+"'}";
    hxajax('member/queryMemberList.do',{dataInfo:dataInfo},data=>{
        var json = JSON.parse(data);
    console.log(json);
    if(json.policys.length==0){
        obj.state1=true;
        obj.state0=false;
        obj.state2=false;
    }else{
        obj.state2=true;
        obj.state0=false;
        obj.state1=false;
        obj.List = json.policys;
        let Len = json.policys.length;
        for(let i=0;i<Len;i++){
            if(json.policys[i].policy_status=='1'){
                obj.effectiveList.push(json.policys[i]);
            }else{
                obj.unEffectiveList.push(json.policys[i]);
            }
        }
        // obj.policyList = obj.effectiveList.slice(0,obj.effectiveList.length,'');
        obj.policyList = obj.effectiveList;
        // obj.page++;
    }
});
};
common.policyList0=function(obj,over) {
    // if(over==1){
    //     obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
    // }
    // const _list = (obj.env=='env0'? obj.effectiveList:obj.unEffectiveList);
    obj.policyList = (obj.env=='env0'? obj.effectiveList:obj.unEffectiveList);
    
    // obj.policyList = [...obj.policyList, ..._list];
    // if (_list.length < obj.pageSize) {
    //     obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
    //     return;
    // }
    // obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
    
};
//产品页获取产品列表分页函数
common.productList=function(obj,over){
    let para = {'productType':obj.type,'page':obj.page,'rows':obj.pageSize};
    if(over==1){
        obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
    }
    hxajax('mobileProductCenter/queryList.do',para,data=>{
        let json = JSON.parse(data);
    console.log(json);
    obj.totalPage = Math.ceil(json.total/obj.pageSize);
    obj.productList =[...obj.productList,...json.rows];
    // obj.productList = obj.productList.reverse();
    if (json.rows.length < obj.pageSize || obj.page >=obj.totalPage) {
        obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
        return;
    }
    obj.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
    obj.page++;
});
    hxajax('advertising/getAdvertisingInfo.do',{'useType':(obj.type==''?'2':((parseInt(obj.type)+2).toString())),'type':1},data=>{
        let json = JSON.parse(data);
    // obj.imgUrl = json.data[0].advertSaveurl;
    if(json.data[0].advertSaveurl!=='null')obj.imgUrl = json.data[0].advertSaveurl;
    console.log(json);
});
};
//根据出生日期获取年龄精确到日期
common.getAge = function (bir) {
    let now = common.getTimech(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate());
    let arr = bir.split('-');
    arr[1] = arr[1].split('')[0]==0?arr[1].substring(1):arr[1];
    arr[2] = arr[2].split('')[0]==0?arr[2].substring(1):arr[2];
    let birth = common.getTimech(arr.join('-'));
    return (now-birth)/(365*24*60*60*1000);
};
//根据出生日期获取年龄精确到年
common.getAgeyear = function (bir) {
    console.log(new Date().getFullYear()-bir.substr(0,4))
    return new Date().getFullYear()-bir.substr(0,4);
};
/* 根据出生日期算出年龄 */
common.jsGetAge = function(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d;

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
        if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; // 日之差
            if (dayDiff < 0) {
                returnAge = -99;
            } else {
                returnAge = 0;
            }
        } else {
            var monthDiff = nowMonth - birthMonth; // 月之差
            if (monthDiff < 0) {
                returnAge = -99;
            } else {
                returnAge = 0;
            }
        }
    } else {
        var ageDiff = nowYear - birthYear; // 年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; // 日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; // 月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge; // 返回周岁年龄
}
//根据日期获取时间戳
common.getTimech = function (str) {
    let date = new Date(str);
    let m = date.getMonth ();
    let y = date.getFullYear();
    let d = date.getDate ();
    let h = date.getHours ();
    let mm = date.getMinutes ();
    let s = date.getSeconds();
    return new Date(y,m,d,h,mm,s).getTime();
};
//四舍五入保留2位小数
common.changeNum = function (num) {
    return Math.round(num*100)/100;
};
//去除字符串最后一个字符
common.deleStr = function (str) {
    return str.substring(0,str.length-1);
};
//滚动部分
common.scroll = function (obj) {
    $("html, body").animate({scrollTop: obj.offset().top-document.body.clientHeight/2 }, {duration: 500,easing: "swing"});
};
//对象深克隆
// common.clone = function (obj){
//     var result,oClass=common.isClass(obj);
//         //确定result的类型
//     if(oClass==="Object"){
//         result={};
//     }else if(oClass==="Array"){
//         result=[];
//     }else{
//         return obj;
//     }
//     for(var key in obj){
//         var copy=obj[key];
//         if(common.isClass(copy)=="Object"){
//             result[key]=arguments.callee(copy);//递归调用
//         }else if(common.isClass(copy)=="Array"){
//             result[key]=arguments.callee(copy);
//         }else{
//             result[key]=obj[key];
//         }
//     }
//     return result;
// }
// //返回传递给他的任意对象的类
// common.isClass =  function(o){
//     if(o===null) return "Null";
//     if(o===undefined) return "Undefined";
//     return Object.prototype.toString.call(o).slice(8,-1);
// }
// var oPerson={
//     oName:"rookiebob",
//     oAge:"18",
//     oAddress:{
//         province:"beijing"
//     },    
//     ofavorite:[
//         "swimming",
//         {reading:"history book"}
//     ],
//     skill:function(){
//         console.log("bob is coding");
//     }
// };

common.deepClone=(obj)=>{
   var proto=Object.getPrototypeOf(obj);
   return Object.assign({},Object.create(proto),obj);
}
//校验图片验证码

//获取url参数
common.getRequest=function (){ 
    var url = location.href; //获取url中"?"符后的字串 
    var theRequest = new Object(); 
    var i = url.indexOf("?");
    if (i != -1) { 
        var str = url.substr(i+1,url.length-1); 
        var strs = str.split("&"); 
        for(var i = 0; i < strs.length; i ++) { 
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
        } 
    } 
    return theRequest; 
}
export default common;