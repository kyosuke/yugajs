/*
 * yuga.js 0.7.2 compatible setting
 *
 * Copyright 2011 PixelGrid, Inc.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version  1.9.0 (2.0 beta version)
 *
 */

/*

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="js/jquery.yuga.js"></script>
<script src="js/yugacompatible.js"></script>

*/

//-----------------------------------------------

jQuery(function($){
	var $a = $('a');

	// ロールオーバー
	$('.btn, .allbtn img').yugaRollover({
		suffix: '_on',
		group: '.btngroup'
	});

	// 現在のページと親ディレクトリへのリンク
	$a.yugaSelflink({
		suffix: '_cr',
		selfLinkClass: 'current'
	});

	// 外部リンクは別ウインドウを設定
	$a.yugaExternalLink({
		externalClass: 'externalLink'
	});

	// 画像へ直リンクするとcolorboxで表示(jquery.colorbox-min.js利用)
	$('a[href$=".jpg"], a[href$=".gif"], a[href$=".png"]').not('a[href*="?"]').colorbox();

	// ページ内リンクはするするスクロール
	$a.yugaScroll({
		
		duration: 4000
	});


});