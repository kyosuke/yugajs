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
	// rollover
	$('.btn, .allbtn img').yugaRollover({
		suffix: '_on',
		group: '.btngroup'
	});
	
	$('body a').yugaSelflink({
		suffix: '_cr',
		selfLinkClass: 'current'
	});
});