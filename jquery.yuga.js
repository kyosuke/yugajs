/**
 * yuga.js jQuery plug-in
 *
 * Copyright 2011 PixelGrid, Inc.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version  1.9.0 (2.0 beta version)
 *
 */


(function($){

	$.yuga = {
		preloadImg: function (src){
			$('<img>', {
				src: src
			});
		}
	};
	
	
	/**
	 * rollover
	 */
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

			$.yuga.preloadImg(src_o);

			target.bind('mouseenter.yuga_rollover', function(){
				img.attr('src', src_o);
			}).bind('mouseleave.yuga_rollover', function(){
				img.attr('src', src);
			});
		});
	};
	$.fn.yuga_groupRollover = function(){
		return this;
	};
}(jQuery));
