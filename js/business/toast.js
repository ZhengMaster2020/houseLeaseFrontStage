/**
 * author   lizheng
 * date     2019-3-5
 * desc     toast提示框
 * param    dom || string
 * duration 关闭时间  默认3秒 0不关闭
 * $.toast.info('这是一个普通的信息文本') $.toast.info('这是一个普通的信息文本',5) $.toast.info('这是一个普通的信息文本',0)
 * */
(function defaultToast(){
	var loadingSvg = '<span><svg viewBox="0 -2 59.75 60.25" width="34" height="34"><path fill="#ccc" d="M29.69-.527C14.044-.527 1.36 12.158 1.36 27.806S14.043 56.14 29.69 56.14c15.65 0 28.334-12.686 28.334-28.334S45.34-.527 29.69-.527zm.185 53.75c-14.037 0-25.417-11.38-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.38 25.417 25.417-11.38 25.416-25.417 25.416z"></path><path fill="none" stroke="#108ee9" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" d="M56.587 29.766c.37-7.438-1.658-14.7-6.393-19.552"></path></svg></span>'
	
	$.toast = {
		info: function(param,duration) {
			this.parse(param,duration,'info')
		},
		success: function(param,duration) {
			this.parse(param,duration,'success')
		},
		fail: function(param,duration) {
			this.parse(param,duration,'fail')
		},
		loading: function(param,duration) {
			this.parse(param,duration,'loading')
		},
		operating: function(param,duration){
			this.parse(param,duration,'operating')
		},
		warning: function(param,duration){
			this.parse(param,duration,'warning')
		},
		// 自动关闭的延时处理
		parseDuration: function(duration){
			var _this = this
			var _duration = 3000;
			if(duration){
				_duration = parseInt(duration) != NaN ? parseInt(duration)*1000 : undefined
			}else {
				if(!duration &&  duration === 0) {
					_duration = undefined
				}
			}
			setTimeout(function() {
				$('body').css({
					'overflow-y': 'hidden'
				});
			}, 10);
			if(_duration){
				setTimeout(function() {
					_this.hide()
				},_duration);
			}
		},
		// 核心处理
		parse: function(param,duration,type){
			var doms = {
				info: '<div><div class="qy-toast-content"><div class="qy-toast-content-text">'+param+'</div></div></div>',
				success: '<div><div class="qy-toast-content"><img src="./img/success.svg" width="28" height="28" /><div class="qy-toast-content-text" style="margin-left:"32px"">'+param+'</div></div></div>',
				fail: '<div><div class="qy-toast-content"><img src="./img/delete.svg" width="34" height="34" /><div class="qy-toast-content-text">'+param+'</div></div></div>',
				loading: '<div><div class="qy-toast-content">'+loadingSvg+'<div class="qy-toast-content-text">'+param+'</div></div></div>',
//				loading: '<div><div class="qy-toast-content load"><img src="./img/loading.gif" width="100%" /></div></div>',
				operating: '<div><div class="qy-toast-content submit">'+param+'</div></div>',
				warning: '<div><div class="qy-toast-content"><img src="./img/warning02.svg" width="34" height="34" /><div class="qy-toast-content-text">'+param+'</div></div></div>'
			}
			var html = '<div class="qy-toast">'+doms[type]+'</div>'
			$('body').append(html);
			this.parseDuration(duration)
		},
		// 销毁dom
		hide: function(){
			$('.qy-toast').remove()
			$('body').removeAttr('style')
		}
	};   
})();
