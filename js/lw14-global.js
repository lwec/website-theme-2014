/*global jQuery:false */

( function( $ ) {
	'use strict';

	var $doc = $( document );
	$doc.ready( function() {
		$.stellar( {
			horizontalScrolling: false,
			verticalScrolling: true,
			scrollProperty: 'scroll',
			positionProperty: 'transform',
			verticalOffset: 0,
			parallaxBackgrounds: false,
			parallaxElements: true,
			responsive: false,
			hideDistantElements: false
		} );
	} );
} )( jQuery );
