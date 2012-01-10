

module('URI');

test('isAbsolutePath', function(){
	ok($.yuga.isAbsolutePath('http://kyosuke.jp/'));
	ok($.yuga.isAbsolutePath('file:///Users/kyosuke/index.html'));
	ok(!$.yuga.isAbsolutePath('/index.html'));
	ok(!$.yuga.isAbsolutePath('img/sample.jpg'));
});

test('isRootRelativePath', function() {
	ok(!$.yuga.isRootRelativePath('http://kyosuke.jp/'));
	ok(!$.yuga.isRootRelativePath('file:///Users/kyosuke/index.html'));
	ok($.yuga.isRootRelativePath('/index.html'));
	ok(!$.yuga.isRootRelativePath('img/sample.jpg'));
});

test('regexpParse : empty', function(){
	var obj = $.yuga.regexpParse();
	ok(obj);
	equal(obj.all, '');
});

test('regexpParse', function(){
	var obj = $.yuga.regexpParse({
		str: 'http://kyosuke.jp/yugajs/index.html',
		regexp: /^(\w+):(\/\/)?(.*)/,
		fields: {
			'schema': 1,
			'content': 3
		}
	});
	ok(obj);
	equal(obj.schema, 'http', 'schema');
	equal(obj.content, 'kyosuke.jp/yugajs/index.html', 'content');

	$.yuga.regexpParse({
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

	equal(obj.authority, 'kyosuke.jp', 'authority');
	equal(obj.path, '/yugajs/index.html', 'path');
	equal(obj.query, undefined, 'query');
	equal(obj.fragment, undefined, 'fragment');

});

test('path2obj : http', function() {
	var uri = $.yuga.path2obj('http://kyosuke.jp/yugajs/index.html#top');
	ok(uri);
	equal(uri.schema, 'http', 'schema');
	equal(uri.user, undefined, 'user');
	equal(uri.password, undefined, 'password');
	equal(uri.host, 'kyosuke.jp', 'host');
	equal(uri.port, undefined, 'port');
	equal(uri.path, '/yugajs/index.html', 'path');
	equal(uri.dir, '/yugajs/', 'dir');
	equal(uri.filename, 'index.html', 'filename');
	equal(uri.query, undefined, 'query');
	equal(uri.fragment, 'top', 'fragment');
	console.log('http', uri);
});

test('path2obj : http 2', function() {
	var uri = $.yuga.path2obj('http://user:pw@kyosuke.jp:8080/api/test?a=1&b=2&c=test#hogehoge');
	ok(uri);
	equal(uri.schema, 'http', 'schema');
	equal(uri.user, 'user', 'user');
	equal(uri.password, 'pw', 'password');
	equal(uri.host, 'kyosuke.jp', 'host');
	equal(uri.port, '8080', 'port');
	equal(uri.path, '/api/test', 'path');
	equal(uri.dir, '/api/', 'dir');
	equal(uri.filename, 'test', 'filename');
	equal(uri.query, 'a=1&b=2&c=test', 'query');
	equal(uri.querys.a, '1', 'querys.a');
	equal(uri.querys.b, '2', 'querys.b');
	equal(uri.querys.c, 'test', 'querys.c');
	equal(uri.fragment, 'hogehoge', 'fragment');
	console.log('http 2', uri);
});

test('path2obj : file', function() {
	var uri = $.yuga.path2obj('file:///Users/kyosuke/index.html');
	ok(uri);
	equal(uri.schema, 'file', 'schema');
	equal(uri.user, undefined, 'user');
	equal(uri.password, undefined, 'password');
	equal(uri.host, undefined, 'host');
	equal(uri.port, undefined, 'port');
	equal(uri.path, '/Users/kyosuke/index.html', 'path');
	equal(uri.dir, '/Users/kyosuke/', 'dir');
	equal(uri.filename, 'index.html', 'filename');
	equal(uri.query, undefined, 'query');
	equal(uri.fragment, undefined, 'fragment');
	console.log('file', uri);
});



test('uri : http', function() {
	var uri = $.yuga.uri('http://kyosuke.jp/yugajs/index.html#top');
	ok(uri);
	equal(uri.schema, 'http', 'schema');
	equal(uri.user, undefined, 'user');
	equal(uri.password, undefined, 'password');
	equal(uri.host, 'kyosuke.jp', 'host');
	equal(uri.port, undefined, 'port');
	equal(uri.path, '/yugajs/index.html', 'path');
	equal(uri.dir, '/yugajs/', 'dir');
	equal(uri.filename, 'index.html', 'filename');
	equal(uri.query, undefined, 'query');
	equal(uri.fragment, 'top', 'fragment');
	console.log('http', uri);
});

test('uri : http 2', function() {
	var uri = $.yuga.uri('http://user:pw@kyosuke.jp:8080/api/test?a=1&b=2&c=test#hogehoge');
	ok(uri);
	equal(uri.schema, 'http', 'schema');
	equal(uri.user, 'user', 'user');
	equal(uri.password, 'pw', 'password');
	equal(uri.host, 'kyosuke.jp', 'host');
	equal(uri.port, '8080', 'port');
	equal(uri.path, '/api/test', 'path');
	equal(uri.dir, '/api/', 'dir');
	equal(uri.filename, 'test', 'filename');
	equal(uri.query, 'a=1&b=2&c=test', 'query');
	equal(uri.querys.a, '1', 'querys.a');
	equal(uri.querys.b, '2', 'querys.b');
	equal(uri.querys.c, 'test', 'querys.c');
	equal(uri.fragment, 'hogehoge', 'fragment');
	console.log('http 2', uri);
});

test('uri : file', function() {
	var uri = $.yuga.uri('file:///Users/kyosuke/index.html');
	ok(uri);
	equal(uri.schema, 'file', 'schema');
	equal(uri.user, undefined, 'user');
	equal(uri.password, undefined, 'password');
	equal(uri.host, undefined, 'host');
	equal(uri.port, undefined, 'port');
	equal(uri.path, '/Users/kyosuke/index.html', 'path');
	equal(uri.dir, '/Users/kyosuke/', 'dir');
	equal(uri.filename, 'index.html', 'filename');
	equal(uri.query, undefined, 'query');
	equal(uri.fragment, undefined, 'fragment');
	console.log('file', uri);
});


test('relative path', function(){
	var relaPath = 'img/sample.jpg';
	var uri = $.yuga.uri(relaPath);
	var base = $.yuga.uri(location.href);

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.dir  + relaPath, 'path');
	equal(uri.dir, base.dir + 'img/', 'dir');
	equal(uri.filename, 'sample.jpg', 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, base.fragment, 'fragment');

	console.log('relaPath', uri);

});

test('hashpath', function(){
	var relaPath = '#sample';
	var uri = $.yuga.uri(relaPath);
	var base = $.yuga.uri(location.href);

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.path, 'path');
	equal(uri.dir, base.dir, 'dir');
	equal(uri.filename, base.filename, 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, 'sample', 'fragment');

	console.log('relaPath', uri);

});

test('hashpath2', function(){
	var relaPath = '#next';
	var uri = $.yuga.uri(relaPath, location.href + '#base');
	var base = $.yuga.uri(location.href + '#base');

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.path, 'path');
	equal(uri.dir, base.dir, 'dir');
	equal(uri.filename, base.filename, 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, 'next', 'fragment');

	console.log('relaPath', uri);

});

test('relative path : ./', function(){
	var relaPath = './img/sample.jpg';
	var uri = $.yuga.uri(relaPath);
	var base = $.yuga.uri(location.href);

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.dir  + 'img/sample.jpg', 'path');
	equal(uri.dir, base.dir + 'img/', 'dir');
	equal(uri.filename, 'sample.jpg', 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, base.fragment, 'fragment');

	console.log('relaPath', uri);

});

test('relative path : ../_test/', function(){
	var relaPath = '../_test/img/sample.jpg';
	var uri = $.yuga.uri(relaPath);
	var base = $.yuga.uri(location.href);

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.dir  + 'img/sample.jpg', 'path');
	equal(uri.dir, base.dir + 'img/', 'dir');
	equal(uri.filename, 'sample.jpg', 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, base.fragment, 'fragment');

	console.log('relaPath', uri);

});
test('relative path : ../../yugajs/_test/', function(){
	var relaPath = '../../yugajs/_test/img/sample.jpg';
	var uri = $.yuga.uri(relaPath);
	var base = $.yuga.uri(location.href);

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.dir  + 'img/sample.jpg', 'path');
	equal(uri.dir, base.dir + 'img/', 'dir');
	equal(uri.filename, 'sample.jpg', 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, base.fragment, 'fragment');

	console.log('relaPath', uri);

});

test('root relative path', function(){
	var relaPath = '/img/sample.jpg';
	var uri = $.yuga.uri(relaPath);
	var base = $.yuga.uri(location.href);

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, relaPath, 'path');
	equal(uri.dir, '/img/', 'dir');
	equal(uri.filename, 'sample.jpg', 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, base.fragment, 'fragment');

	console.log('root relaPath', uri);

});

test('relative path with basepath', function(){
	var relaPath = 'img/sample.jpg';
	var uri = $.yuga.uri(relaPath, 'http://kyosuke.jp/');
	var base = $.yuga.uri('http://kyosuke.jp/');

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.dir  + relaPath, 'path');
	equal(uri.dir, base.dir + 'img/', 'dir');
	equal(uri.filename, 'sample.jpg', 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, base.fragment, 'fragment');

	console.log('relaPath', uri);

});

test('relative path with relative basepath', function(){
	var relaPath = 'img/sample.jpg';
	var uri = $.yuga.uri(relaPath, '/');
	var base = $.yuga.uri('/');

	equal(uri.schema, base.schema, 'schema');
	equal(uri.user, base.user, 'user');
	equal(uri.password, base.password, 'password');
	equal(uri.host, base.host, 'host');
	equal(uri.port, base.port, 'port');
	equal(uri.path, base.dir  + relaPath, 'path');
	equal(uri.dir, base.dir + 'img/', 'dir');
	equal(uri.filename, 'sample.jpg', 'filename');
	equal(uri.query, base.query, 'query');
	equal(uri.fragment, base.fragment, 'fragment');

	console.log('relaPath', uri);

});
