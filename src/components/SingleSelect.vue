<template>
	<div class="singleselect">
		<input type="text" placeholder="请选择" :value="value" readonly="readonly" ref="ss" @input="$emit('input', $event.target.value)"><span></span>
	</div>
</template>
<script>
export default {
	name: 'singleselect',
	data(){
		return {
			mpk:null
		};
	},
	props:['opts','value','title'],
	watch:{
		opts(newVal,oldVal){
			// 更新滚轮
			let m=$(this.$refs.ss).data('mPicker').updateData(this.opts);
		}
	},
	mounted(){
		let fs=Math.ceil($(window).width()*0.037*2.4),el=$(this.$refs.ss),_this=this;
		// let fs=Math.ceil($(window).width()*0.037*2.4),el=$(this.$refs.ss),_this=this;
		let mpk=el.mPicker({
			level:1,
			dataJson:this.opts,
			// data1:this.opts,
			Linkage:false,
			rows:6,
			height: fs,
			idDefault:true,
			header:'<div class="mPicker-header">'+(_this.title || '请选择')+'</div>',
			confirm:function(){
				
					_this.$emit('change',el.val(),el.data('value1'),el.data('id1'));
			},
			cancel:function(){
				//console.info($('.select-value3').data('id1'));
			}
		});

		let sty='<style id="mpickfix">body .mPicker-content li{line-height:'+fs+'px;}</style>';
    	if($('#mpickfix').length==0) $('head').append(sty);

		$('.mPicker-mask').off('click touchend').on('click touchend',function(){
			$(this).addClass('hide');
			$('.mPicker-main').addClass('down');
			setTimeout(()=>{
				$('.mPicker').addClass('hide');
			$('.mPicker-main').remove();
		},500);
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url(../assets/css/common.less);
.singleselect{
	position: relative;
	input{
		// position: absolute;top: 50%;left: 0;transform:translateY(-50%);
		width:100%;height: 100%;display: block;text-align: left;
	}
	// span{
	// 	position: absolute;
	// 	width: 3em;height:100%;background: red;top: 71%;right: -1em;transform:translateY(-50%);background:url('../assets/images/ydrop.png') no-repeat;background-size:50%;
	// }
}
</style>
