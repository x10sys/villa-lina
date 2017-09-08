'use strict';

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	// some code..
}else
{
	$('head').append('<style>.map iframe {pointer-events: none;}</style>');
	var onMapMouseleaveHandler = function(event) {
	   var that = $(this);
	   that.on('click', onMapClickHandler);
	   that.off('mouseleave', onMapMouseleaveHandler);
	   that.find('iframe').css("pointer-events", "none");
	}
	var onMapClickHandler = function(event) {
		  var that = $(this);
		  // Disable the click handler until the user leaves the map area
		  that.off('click', onMapClickHandler);
		  // Enable scrolling zoom
		  that.find('iframe').css("pointer-events", "auto");
		  // Handle the mouse leave event
		  that.on('mouseleave', onMapMouseleaveHandler);
	   }
	   // Enable map zooming with mouse scroll when the user clicks the map
	$('.map').on('click', onMapClickHandler);
}