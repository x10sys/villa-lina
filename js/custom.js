 // <!-- Testimonials fade -->

function fade($ele) {
	$ele.fadeIn(1000).delay(3000).fadeOut(1000, function() {
		var $next = $(this).next('.quote');
		fade($next.length > 0 ? $next : $(this).parent().children().first());
   });
}
fade($('.quoteLoop > .quote').first());
	 
	 
 // <!-- Menu handling -->

// Closes the sidebar menu
$("#menu-close").click(function(e) {
   e.preventDefault();
   $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
   e.preventDefault();
   $("#sidebar-wrapper").toggleClass("active");
});

//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function() {
   if ($(this).scrollTop() > 250) {
	  if (!fixed) {
		 fixed = true;
		 // $('#to-top').css({position:'fixed', display:'block'});
		 $('#to-top').show("slow", function() {
			$('#to-top').css({
			    position: 'fixed',
			    display: 'block'
			});
		 });
	  }
   } else {
	  if (fixed) {
		 fixed = false;
		 $('#to-top').hide("slow", function() {
			$('#to-top').css({
			    display: 'none'
			});
		 });
	  }
   }
});
    
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

    

// Smoothscroll
jQuery(document).ready(function($) {

$('.smoothscroll').on('click',function (e) {
e.preventDefault();

var target = this.hash,
$target = $(target);

$('html, body').stop().animate({
'scrollTop': $target.offset().top
}, 800, 'swing', function () {
window.location.hash = target;
});
});

});
