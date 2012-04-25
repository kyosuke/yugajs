/**
 * yuga.js setting
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
<script src="js/yuga.js"></script>

*/

//-----------------------------------------------

jQuery(function($){
	var $a = $('a');
	$('img.yuga-roll').yugaRollover();
	$('.yuga-nav a').yugaSelflink();
	$a.yugaExternalLink();
	$a.yugaScroll();

	$('.yuga-tabNav').yugaTab();
	$('ul, ol, table, tbody').yugaStripe();

	$('a[href$=".jpg"], a[href$=".gif"], a[href$=".png"]').not('a[href*="?"]').colorbox();

});