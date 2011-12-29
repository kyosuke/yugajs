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
		preloadImg: function(src) {
			$('<img>', {
				src: src
			});
		},
		isAbsolutePath: function(path) {
			return (/^(\w+):/).test(path);
		},
		isRootRelativePath: function(path) {
			return path[0] === '/';
		},
		regexpParse: function(options) {
			var conf = $.extend({
				str: '',
				obj: {},
				regexp: /(.*)/,
				fields: {
					'all': 0
				}
			}, options);
			var r = conf.regexp.exec(conf.str);
			$.each(conf.fields, function(key, val) {
				conf.obj[key] = r[val];
			});
			return conf.obj;
		},
		path2obj: function(path){
			if (!$.yuga.isAbsolutePath(path)) {
				throw new Error('required absolute path');
			}
			var obj = $.yuga.regexpParse({
				str: path,
				regexp: /^(\w+):(\/\/)?(.*)/,
				fields: {
					'schema': 1,
					'content': 3
				}
			});
			obj.base = path;
			obj = $.yuga.regexpParse({
				str: obj.content,
				obj: obj,
				regexp: /^([^\/]+)?([^\?#]+)?\??([^#]+)?#?(\w*)?/,
				fields: {
					'authority': 1,
					'path': 2,
					'query': 3,
					'fragment': 4
				}
			});
			if (obj.authority) {
				obj = $.yuga.regexpParse({
					str: obj.authority,
					obj: obj,
					regexp: /((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?/,
					fields: {
						'user': 2,
						'password': 3,
						'host': 4,
						'port': 5
					}
				});
			}
			if (obj.path) {
				if (obj.path[obj.path.length - 1] === '/') {
					obj.dir = obj.path;
				} else {
					(function(){
						var d = obj.path.split('/');
						obj.filename = d.pop();
						obj.dir = d.join('/') + '/';
					}());
				}
			}
			if (obj.query) {
				obj.querys = {};
				$.each(obj.query.split('&'), function(){
					var a = this.split('=');
					if (a.length === 2) {
						obj.querys[a[0]] = a[1];
					}
				});
			}
			return obj;
		},
		uri: function(path, basePath) {
			var obj, base, newPath;
			basePath = basePath || location.href;
			if ($.yuga.isAbsolutePath(path)) {
				obj = $.yuga.path2obj(path);
			} else {
				base = $.yuga.path2obj(basePath);
				newPath = base.schema + '://';
				newPath += base.authority || '';
				if ($.yuga.isRootRelativePath(path)) {
					newPath += path;
				} else {
					newPath += base.dir + path;
					newPath = newPath.replace(/\/\.\//g, '/');
					while ((/\/\.\.\//).test(newPath)) {
						newPath = newPath.replace(/\/[^\/]+\/\.\.\//, '/');
					}
				}
				if (base.query) {
					newPath += '?' + base.query;
				}
				if (base.fragment) {
					newPath += '#' + base.fragment;
				}
				obj = $.yuga.path2obj(newPath);
			}
			return obj;
		}
	};
	
	
	/**
	 * rollover
	 */
	$.fn.yugaRollover = function(options) {
		var conf = $.extend({
			suffix: '_on',
			group: 'a'
		}, options);
		return this.each(function(){
			var img = $(this);
			var group = img.parents(conf.group);
			var target = (group.length) ? group : img;
			var src = img.attr('src');
			if (!src) {
				return;
			}
			var src_o = src.replace(/\.\w+$/, conf.suffix + '$&');

			$.yuga.preloadImg(src_o);

			target.bind('mouseenter.yugaRollover', function(){
				img.attr('src', src_o);
			}).bind('mouseleave.yugaRollover', function(){
				img.attr('src', src);
			});
		});
	};

	/**
	 * selflink
	 */
	$.fn.yugaSelflink = function(options) {
		var conf = $.extend({
			suffix: '_cr',
			selfLinkClass: 'current'
		}, options);
		return this.each(function() {
			var a = $(this);
			var href = $.yuga.uri(a.attr('href'));
			var img = a.find('img');
			if (img.length) {
				img.each(function(){			
					var src = $(this).attr('src');
					var src_c = src.replace(/\.\w+$/, conf.suffix + '$&');
					$(this).attr('src', src_c);
				});
				a.unbind('.yugaRollover');
			}
			if (href.base === location.href) {
				a.addClass(conf.selfLinkClass);
			}
		});
	};

}(jQuery));
