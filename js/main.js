jQuery(function($){

var MANZER = window.MANZER || {};

/* ==================================================
	Mobile Navigation
================================================== */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

MANZER.mobileNav = function(){
	var windowWidth = $(window).width();

	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');
		}
	}
},

MANZER.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');

		if ($('#mobile-nav').hasClass('open')) {
			$('#navigation-mobile').slideDown(500, 'easeOutExpo');
		} else {
			$('#navigation-mobile').slideUp(500, 'easeOutExpo');
		}
		e.preventDefault();
	});

	$('#menu-nav-mobile a.smooth-nav, a.smooth-nav').on('click', function(){
		$('html, body').animate({
			scrollTop: $( $(this).attr('href') ).offset().top
		}, 500);
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').slideUp(350, 'easeOutExpo');
	});

},


/* ==================================================
	Slider Options
================================================== */

MANZER.slider = function(){
	$.supersized({
		// Functionality
		slideshow				: 1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide 		: 1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 0,			// Randomize slide order (Ignores start slide)
		slide_interval 	: 12000,		// Length between transitions
		transition 			:   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed :	300,		// Speed of transition
		new_window 			:	1,			// Image links open in new window/tab
		pause_hover 		: 0,			// Pause slideshow on hover
		keyboard_nav 		: 1,			// Keyboard navigation on/off
		performance 		:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect 	:	1,			// Disables image dragging and right click with Javascript

		// Size & Position
		min_width 			: 0,			// Min width allowed (in pixels)
		min_height 			: 0,			// Min height allowed (in pixels)
		vertical_center : 1,			// Vertically center background
		horizontal_center : 1,			// Horizontally center background
		fit_always 			:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait 		: 1,			// Portrait images will not exceed browser height
		fit_landscape 	: 0,			// Landscape images will not exceed browser width

		// Components
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	0,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation
		slides 					:  	[			// Slideshow Images
											{
												image : 'img/slider-images/image01.jpg',
												title : '<div class="slide-content">DAVID MANZER</div><div class="slide-content-title">Designer / Front End UI Developer</div>',
												thumb : '',
												url : ''
											},
											{
												image : 'img/slider-images/image02.jpg',
												title : '<div class="slide-content">DAVID MANZER</div><div class="slide-content-title">Designer / Front End UI Developer</div>',
												thumb : '',
												url : ''
											},
											{
												image : 'img/slider-images/image03.jpg',
												title : '<div class="slide-content">DAVID MANZER</div><div class="slide-content-title">Designer / Front End UI Developer</div>',
												thumb : '',
												url : ''
											},
											{
												image : 'img/slider-images/image04.jpg',
												title : '<div class="slide-content">DAVID MANZER</div><div class="slide-content-title">Designer / Front End UI Developer</div>',
												thumb : '',
												url : ''
											}
									],

		// Theme Options
		progress_bar			:	0,			// Timer for each slide
		mouse_scrub				:	0

	});

},


/* ==================================================
	Navigation Fix
================================================== */

MANZER.nav = function(){
	$('.sticky-nav').waypoint('sticky');
},


/* ==================================================
	Filter Works
================================================== */

MANZER.filter = function (){
	if($('#projects').length > 0){
		var $container = $('#projects');

		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
				filter: '.layout',
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'

			});
		});

		// filter items when filter link is clicked
		var $optionSets = $('#options .option-set'),
			$optionLinks = $optionSets.find('a');

		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');

			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options );
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}

			return false;
		});
	}
},

/* ==================================================
	Contact Form
================================================== */

MANZER.contactForm = function(){
	var $contactForm = $('#contact-form');
	$contactForm.submit(function(e) {
		e.preventDefault();
		$.ajax({
			url: '//formspree.io/dmanzer2@gmail.com',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
				$contactForm.append('<div class="alert alert-standard">Sending message…</div>');
			},
			success: function(data) {
				$contactForm.find('.alert-standard').delay(500).fadeOut(1500);
				$contactForm.append('<div class="alert alert-success">Message sent!</div>');
				$contactForm[0].reset();
				$contactForm.find('.alert-success').delay(7000).fadeOut(1500);
				$contactForm.find('.success').removeClass("success").addClass("clean");
				$contactForm.find('.button-area').removeClass("button-area").addClass("remove-button-area");
			},
			error: function(err) {
				$contactForm.find('.alert-standard').hide();
				$contactForm.append('<div class="alert alert-error">Ops, there was an error.</div>');
			},
			cache: false
		});
	});
},

/* ==================================================
	Skill Chart
================================================== */

$.fn.horizBarChart = function(options) {

  var settings = $.extend({
    // default settings
    selector: '.bar',
    speed: 10000
  }, options);

  // Cycle through all charts on page
  return this.each(function(){
    // Start highest number variable as 0
    // Nowhere to go but up!
	  var highestNumber = 0;

    // Set highest number and use that as 100%
    // This will always make sure the graph is a decent size and all numbers are relative to each other
  	$(this).find($(settings.selector)).each(function() {
  	  var num = $(this).data('number');
      if (num > highestNumber) {
        highestNumber = num;
      }
  	});

    // Time to set the widths
  	$(this).find($(settings.selector)).each(function() {
  		var bar = $(this),
  		    // get all the numbers
  		    num = bar.data('number'),
  		    // math to convert numbers to percentage and round to closest number (no decimal)
  		    percentage = Math.round((num / highestNumber) * 100) + '%';
  		// Time to assign and animate the bar widths
  		$(this).animate({ 'width' : percentage }, settings.speed);
  		$(this).next('.number').animate({ 'left' : percentage++ }, settings.speed);
  	});

  });

},


/* ==================================================
	FancyBox
================================================== */

MANZER.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){

		$(".fancybox").fancybox({
				padding : 0,
				beforeShow: function () {
					this.title = $(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers : {
					title : { type: 'inside' },
				}
			});

		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
	}
},


/* ==================================================
	Menu Highlight
================================================== */

MANZER.menu = function(){
	$('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external)'
	});
},


/* ==================================================
	Next Section
================================================== */

MANZER.goSection = function(){
	$('#nextsection').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;

		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
},


/* ==================================================
	GoUp
================================================== */

MANZER.goUp = function(){
	$('#goUp').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;

		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
},


/* ==================================================
	Scroll to Top
================================================== */

MANZER.scrollToTop = function(){
	var windowWidth = $(window).width(),
		didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	});

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
},


/* ==================================================
   Thumbs / Social Effects
================================================== */

MANZER.utils = function(){

	$('.item-thumbs').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });

	$('.image-wrap').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });

	$('#social ul li a').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
},

/* ==================================================
	Accordion
================================================== */

MANZER.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');

	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');
		  	accordion_trigger.find('.active').removeClass('active');
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
},

/* ==================================================
	Toggle
================================================== */

MANZER.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');

	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
},

/* ==================================================
	Tooltip
================================================== */

// MANZER.toolTip = function(){
//     $('a[data-toggle=tooltip]').tooltip();
// },


/* ==================================================
	Init
================================================== */

MANZER.slider();

$(document).ready(function(){
	Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: 'js/placeholder.js',
	}
	]);

	// Preload the page with jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		splashFunction: function() {
			$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
		}
	});

	$('.chart').horizBarChart({
		selector: '.bar',
		speed: 6000
	});

	MANZER.nav();
	MANZER.mobileNav();
	MANZER.listenerMenu();
	MANZER.menu();
	MANZER.goSection();
	MANZER.goUp();
	MANZER.filter();
	MANZER.fancyBox();
	MANZER.contactForm();
	MANZER.scrollToTop();
	MANZER.utils();
	MANZER.accordion();
	MANZER.toggle();
	// MANZER.toolTip();
});

$(window).resize(function(){
	MANZER.mobileNav();
});

});

// Dynamic Year Date
document.getElementById("year").innerHTML = new Date().getFullYear();