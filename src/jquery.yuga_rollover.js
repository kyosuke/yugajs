(function($){

	function preloadImg(src){
		var img = $('<img>', {
			src: src
		});
	}

	$.fn.yuga_rollover = function(options){
		var conf = $.extend({
			suffix: '_on',
			group: 'a'
		}, options)
		return this.each(function(){
			var img = $(this);
			var a = img.parents(conf.group);
			var target = (a.length) ? a : img;
			var src = img.attr('src');
			if (!src) return;
			var src_o = src.replace(/\.\w+$/, conf.suffix + '$&');

			preloadImg(src_o);

			target.hover(function(){
				img.attr('src', src_o);
			},function(){
				img.attr('src', src);
			});
		});
	};
	$.fn.yuga_groupRollover = function(){
		return this;
	};
}(jQuery));



