// 各种弹窗提示

const pops={};

// 等待
pops.wait=()=>{
	let el=$('.wait');
	if(el.length==0) el=$('<div class="wait"><figure><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAQCAQgODAoFAw72DwsJBw0K9vqn+rPwAABShJREFUeNrs3Oty4jAMBWD5fgsk9Lz/u24HWtZbMrWpHSV0/f3ODDmQKFLsgYb/j9fa0+tLEe/iy0fR+KDppQncCXplJ9yd6JUhQy9MIiPpdQngd9wkI8jRjCBcgpBbBVEiEBOlI4DFbxHELwCiVsRALbhx/YM43CwcSSw+pd5BEj5Z2pzHXVR9g6iIO09bc/jL9Q3iwNliWmRCzyABGUsFfYPYnkEsb5AzcqlfEI/cmbYWkDOqVxBlkAu0uRNyulcQDYB3nJTIRdkniIxgH8I0cq5PEIecJg7KICd6BBEPdx6HhNzSI8iCXCImFrnUHiQhZ4mLQC6q1iAqgnsCK9+a5SDl8sFHTsjJtiASuUkSI43cpS3IBTlNrOpKsERG1pVe4uXrPh2Zuu/EEzOL3Fw+ytK6GTlL3EKhBNeuj6jI2fWWS/C5dJSrmm8c8VNT1Vc5Xw+b5rrSq2gHc90EoZLWSdVNNzPtwiCn6AdUofjxEO0dksAhXnPbvkEs7UU2BwkHWWQ8N1/fplDBmSjTOtWlwnzLJUy4ca3P1SlQb/5irQtUR57wziT6sWTw7iSpTjhbe/FUpiyuLrI2ihCCmgghqj/sgiurqtejAK3oYJTGp0U9MfqZRIeSzBODZETOHmhJWVjkYuFofOEOshVGOnwhnguCeIitbzriuSASj8zu+xG9wSNZbBke2UA7ChYrTCk8VjlFO1FnrPJU4LAqvtEu3iJWOSqaJ6wygtgJg1XTTBWUwzoriZW0aLzQg8W6syI2SgNoLj3eYJUJxCQYAB0eBkpPWBMlsZARayat2poC9g3VJ6xxsq1N418Cl8i1t7BpwgNBDAQeTKmtdBwlSPOYJ08A/4v/gH+dJLUTyw7vZ80mTcU8sS+N+UI/0tyCOmLiNuompOOesbzZaNSWQgRiFYQ4yBuDYRiGYRiGYRiGYdiRFOsOMTdXn5y44DuLoB2JBd+5CLrTWLH7xuIPDiX6cRfbo93/+mdGmaebiLKoaBeq6uToyqNGol0koPon0cBxr63Kk/tdQf60dwZIDoIwFA3QKiLaWu9/193Zzmw7w8qipDHGvAvUWHQi5P8vZmlBnP+EgSACwBVdXL5qDoKI4tdvfiGyGPce19xkM8w5BgP0lF+cxKZRURRFURRFURRFUU5IsbiY93CmnejHZV8ibh1gzmjoeiDBf0A5aK4ihvztxEF28fOoqBAGoA98pEmhrzjg5iUWex73n1W+5xJNP62Loo1zwhZv/F6GxDURHe9hleLGnOj4TDLwR+AvzC/pWtqcpp+eW9w4ruT3V+SXLXQP57ATEWPwYtKHg4flTlzZ83V8nF3qTJAgHsWWKp7FKEyMdduvmd7A00xvSMz0lvFt04xd8Sd97SJ8rNu/smPTDB6w6QKW4WToYBNqASrSlNVW73cZHja5UoyLxVhJSzH3xrFb339u3ZUFNj1C1n/T7i/ukBJJ0M3vxO0hEbHi0IIutuPOPrYDMUjlvjVIhXm0jQMy0qy8srAhhq9gG1DjnzY4QWogV2ZVx/qItLi25dLQuuzPVheS3hoSXPhYsGN5y6VRm5msPJRCbCQ/zJ8o4mgnyKIBwYvfDx4xsrn8nz5SiLaYWPMWFjlW0PwNMqD712JH/0dS1XmTdBJYhUBP8aynZ1ojYBcCPdl+9ssb/+4BvxCw7XW+tgao6IyDEgyHnd1/0EIOiRbCDTGFWB5HhAjMb8CRGd4b8yNjZDwi39x2Nx/Cwj9DtHefi0TAXy4SylBW8gVhbnnxTqBOgAAAAABJRU5ErkJggg==" alt="" /></figure></div>').appendTo('body');
	el.fadeIn();
	setTimeout(()=>{el.fadeOut();},2000);
};
// 等待开始
pops.waitstart=()=>{
	let el=$('.wait');
	if(el.length==0) el=$('<div class="wait"><figure><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAQCAQgODAoFAw72DwsJBw0K9vqn+rPwAABShJREFUeNrs3Oty4jAMBWD5fgsk9Lz/u24HWtZbMrWpHSV0/f3ODDmQKFLsgYb/j9fa0+tLEe/iy0fR+KDppQncCXplJ9yd6JUhQy9MIiPpdQngd9wkI8jRjCBcgpBbBVEiEBOlI4DFbxHELwCiVsRALbhx/YM43CwcSSw+pd5BEj5Z2pzHXVR9g6iIO09bc/jL9Q3iwNliWmRCzyABGUsFfYPYnkEsb5AzcqlfEI/cmbYWkDOqVxBlkAu0uRNyulcQDYB3nJTIRdkniIxgH8I0cq5PEIecJg7KICd6BBEPdx6HhNzSI8iCXCImFrnUHiQhZ4mLQC6q1iAqgnsCK9+a5SDl8sFHTsjJtiASuUkSI43cpS3IBTlNrOpKsERG1pVe4uXrPh2Zuu/EEzOL3Fw+ytK6GTlL3EKhBNeuj6jI2fWWS/C5dJSrmm8c8VNT1Vc5Xw+b5rrSq2gHc90EoZLWSdVNNzPtwiCn6AdUofjxEO0dksAhXnPbvkEs7UU2BwkHWWQ8N1/fplDBmSjTOtWlwnzLJUy4ca3P1SlQb/5irQtUR57wziT6sWTw7iSpTjhbe/FUpiyuLrI2ihCCmgghqj/sgiurqtejAK3oYJTGp0U9MfqZRIeSzBODZETOHmhJWVjkYuFofOEOshVGOnwhnguCeIitbzriuSASj8zu+xG9wSNZbBke2UA7ChYrTCk8VjlFO1FnrPJU4LAqvtEu3iJWOSqaJ6wygtgJg1XTTBWUwzoriZW0aLzQg8W6syI2SgNoLj3eYJUJxCQYAB0eBkpPWBMlsZARayat2poC9g3VJ6xxsq1N418Cl8i1t7BpwgNBDAQeTKmtdBwlSPOYJ08A/4v/gH+dJLUTyw7vZ80mTcU8sS+N+UI/0tyCOmLiNuompOOesbzZaNSWQgRiFYQ4yBuDYRiGYRiGYRiGYdiRFOsOMTdXn5y44DuLoB2JBd+5CLrTWLH7xuIPDiX6cRfbo93/+mdGmaebiLKoaBeq6uToyqNGol0koPon0cBxr63Kk/tdQf60dwZIDoIwFA3QKiLaWu9/193Zzmw7w8qipDHGvAvUWHQi5P8vZmlBnP+EgSACwBVdXL5qDoKI4tdvfiGyGPce19xkM8w5BgP0lF+cxKZRURRFURRFURRFUU5IsbiY93CmnejHZV8ibh1gzmjoeiDBf0A5aK4ihvztxEF28fOoqBAGoA98pEmhrzjg5iUWex73n1W+5xJNP62Loo1zwhZv/F6GxDURHe9hleLGnOj4TDLwR+AvzC/pWtqcpp+eW9w4ruT3V+SXLXQP57ATEWPwYtKHg4flTlzZ83V8nF3qTJAgHsWWKp7FKEyMdduvmd7A00xvSMz0lvFt04xd8Sd97SJ8rNu/smPTDB6w6QKW4WToYBNqASrSlNVW73cZHja5UoyLxVhJSzH3xrFb339u3ZUFNj1C1n/T7i/ukBJJ0M3vxO0hEbHi0IIutuPOPrYDMUjlvjVIhXm0jQMy0qy8srAhhq9gG1DjnzY4QWogV2ZVx/qItLi25dLQuuzPVheS3hoSXPhYsGN5y6VRm5msPJRCbCQ/zJ8o4mgnyKIBwYvfDx4xsrn8nz5SiLaYWPMWFjlW0PwNMqD712JH/0dS1XmTdBJYhUBP8aynZ1ojYBcCPdl+9ssb/+4BvxCw7XW+tgao6IyDEgyHnd1/0EIOiRbCDTGFWB5HhAjMb8CRGd4b8yNjZDwi39x2Nx/Cwj9DtHefi0TAXy4SylBW8gVhbnnxTqBOgAAAAABJRU5ErkJggg==" alt="" /></figure></div>').appendTo('body');
	el.fadeIn();
};
// 等待结束
pops.waitend=()=>{
	$('.wait').fadeOut();
};

// 弹窗提示
pops.alert=(txt,title)=>{
	let el=$('.alert'),mask=$('.maskgray2'),c=txt || '出错啦',d=title || '提示';
	if(mask.length==0) mask=$('<div class="maskgray2"></div>').appendTo('body');
	if(el.length==0) el=$('<div class="alert"><h1>'+d+'</h1><p></p><h2>确定</h2></div>').appendTo('body');
	el.find('p').html(c);

	let els=mask.add(el).show().addClass('show');

	el.find('h2').one('click',()=>{
		els.addClass('hide');
		setTimeout(()=>{
			els.hide().removeClass('show hide');
		},600);
	});	
};
// 服务说明
pops.serviceinfo=(txt,title)=>{
	let el=$('.serviceinfo'),mask=$('.maskgray2'),c=txt || '出错啦',d=title || '提示';
	if(mask.length==0) mask=$('<div class="maskgray2"></div>').appendTo('body');
	if(el.length==0) el=$('<div class="serviceinfo"><h1>'+d+'</h1><p></p><h2>确定</h2></div>').appendTo('body');
	el.find('p').html(c);

	let els=mask.add(el).show().addClass('show');

	el.find('h2').one('click',()=>{
		els.addClass('hide');
		setTimeout(()=>{
			els.hide().removeClass('show hide');
		},600);
	});	
};

// 渐隐提示
pops.fade=(txt)=> {
	txt = txt || '出错啦';
	let el = $('.popalert');
	if(el.length==0) el=$('<div class="popalert">'+txt+'</div>').appendTo('body');
	el.html(txt).fadeIn(300);
	setTimeout(()=> {
		el.fadeOut(300);
	}, 2000);
};
//渐隐有回调函数
pops.fadeFun=(txt,fun)=> {
	txt = txt || '出错啦';
	let el = $('.popalert');
	if(el.length==0) el=$('<div class="popalert">'+txt+'</div>').appendTo('body');
	el.html(txt).fadeIn(300);
	setTimeout(()=> {
		el.fadeOut(300);
		fun();
	}, 2000);
};
pops.textFadeIn=(txt)=> {
	txt = txt || '出错啦';
	let el = $('.popalert');
	if(el.length==0) el=$('<div class="popalert">'+txt+'</div>').appendTo('body');
	el.html(txt).fadeIn(300);
};
pops.textFadeOut=()=> {
	$('.popalert').fadeOut();
};
// 同上，延迟500ms
pops.fadewait=(txt)=> {
	txt = txt || '出错啦';
	let el = $('.popalert');
	if(el.length==0) el=$('<div class="popalert">'+txt+'</div>').appendTo('body');
	el.html(txt);
	setTimeout( ()=> {
		el.fadeIn(300);
	}, 500);
	setTimeout( ()=> {
		el.fadeOut(300);
	}, 2500);
};

// 确认弹窗提示
pops.confirm=(txt,func,cans)=>{
	let el=$('.confirm'),mask=$('.maskgray2'),c=txt || '继续执行操作吗？';
	if(mask.length==0) mask=$('<div class="maskgray2"></div>').appendTo('body');
	if(el.length==0) el=$('<div class="confirm"><h1>提示</h1><p></p><dl><dd>取消</dd><dt>确定</dt></dl></div>').appendTo('body');
	el.find('p').html(c);

	let els=mask.add(el).show().addClass('show');

	// 取消
	el.find('dd').off('click').one('click',()=>{
		cans&&cans();
		els.addClass('hide');
		setTimeout(()=>{
			els.hide().removeClass('show hide');
		},600);
	});
	// 确定
	el.find('dt').off('click').one('click',()=>{
		func();
		els.addClass('hide');
		setTimeout(()=>{
			els.hide().removeClass('show hide');
		},600);
	});
};

export default pops;


