// 选项卡实现JQuery逻辑
		$(document).ready(function() {
 
	    var widget = $('.tabs-basic');
	 
	    var tabs = widget.find('ul a'),
	        content = widget.find('.tabs-content-placeholder > div');
	 
	    tabs.on('click', function (e) {
	        e.preventDefault();
	        var index = $(this).data('index');
	 
	        tabs.removeClass('tab-active');
	        content.removeClass('tab-content-active');
	 
	        $(this).addClass('tab-active');
	        content.eq(index).addClass('tab-content-active');
	 
	    	});
	 
		});