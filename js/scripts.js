(function($){

"use strict";

$(document).ready(function() {


	var win_h = $(window).height(),
		win_w = $(window).width(),
		home_slides_arr = [],
		is_moving = false;

	$("body").fitVids();

/*==========================================================================================================================================
/*==========================================================================================================================================
	Functions
============================================================================================================================================
============================================================================================================================================*/

	function render() {

		// Home
		if ($('#home-screen').length > 0) {

			 var gallerySet = [
        'images/Yerushalayim-watermark.jpg',
        'images/Rav-shach-watermark.jpg',
        'images/Eshes-watermark.jpg',
        'images/Brisker-rav-watermark.jpg',
        'images/kosel-watermark.jpg',
        'images/Satmar-watermark.jpg',
        'images/rabbi-soloveitchik-watermark.jpg',
      ];

      var main_wrapper = $('.gallery-kenburns');
      var window_w = $(window).innerWidth(),
          window_h = $(window).innerHeight();
      $('#kenburns').attr('width', window_w);
      $('#kenburns').attr('height', window_h-120);

      $('#kenburns').kenburns({
        images: gallerySet,
        frames_per_second: 30,
        display_time: 8000,
        fade_time: 2000,
        zoom: 1.3
      });


      function kenburns_resize() {
          var window_w = $(window).width(),
              window_h = $(window).height();

          $('.gallery-kenburns').append('<canvas id="kenburns"><p>Your browser does not support canvas!</p></canvas>');
          $('#kenburns').attr('width', window_w);
          $('#kenburns').attr('height', window_h - 120);
          $('#kenburns').kenburns({
              images: gallerySet,
              frames_per_second: 30,
              display_time: 8000,
              fade_time: 2000,
              zoom: 1.3
          });
      }
      $(window).resize(function(){
          $('#kenburns').remove();
          setTimeout(kenburns_resize(), 500);
      });

		}
			// Landing - Fullscreen Slideshow
			if($(".landing-slideshow").length > 0) {

				var home_landing_slideshow_speed = 8000,
					home_landing_animation_speed = 3000;

				$(".landing-slideshow .flexslider").flexslider({

				    prevText: "",
				    nextText: "",
				    animation: 'fade',
				    easing: "linear",
				    slideshow: true,
				    slideshowSpeed: home_landing_slideshow_speed,
				    animationSpeed: home_landing_animation_speed,
				    controlNav: false,
				    directionNav: false,

				    start: function(slider){

				    	var layer = slider.prev().find('.source .animate'),
				    		img_width = layer.prev().width();

				    	layer.animate({width: img_width},home_landing_slideshow_speed,'linear');
				    },
				    before: function(slider){

				    	var layer = slider.prev().find('.source .animate'),
				    		img_width = layer.prev().width();

				    	layer.fadeOut(1,function(){
				    		layer.width(0);
				    		layer.fadeIn(1);
				    		layer.animate({width: img_width},home_landing_slideshow_speed,'linear');
				    	});
				    }
				});
			}

		// Landing - Striped Slides Slideshows
			if($(".striped-slides").length > 0) {

				var home_landing_s_slideshow_speed = 5000,
					home_landing_s_animation_speed = 3000,
					striped_slides_interval,
					cols = $(".striped-slides .flexslider").length;


				striped_slides_interval = setInterval(function(){random_slide(cols)},home_landing_s_slideshow_speed);

				$(".striped-slides .flexslider").flexslider({

				    prevText: "",
				    nextText: "",
				    animation: 'fade',
				    easing: "linear",
				    slideshow: false,
				    slideshowSpeed: home_landing_s_slideshow_speed,
				    animationSpeed: home_landing_s_animation_speed,
				    controlNav: false,
				    directionNav: false
				});
			}


	// Gallery

		// Fullscreen Slideshow
			if($(".full-screen.flexslider.normal-nav, .full-screen.flexslider.no-nav").length > 0) {

				var home_f_s_slideshow_speed = 6000,
					home_f_s_animation_speed = 2000;


				$(".full-screen.flexslider.normal-nav, .full-screen.flexslider.no-nav").flexslider({

				    prevText: "",
				    nextText: "",
				    animation: 'fade',
				    easing: "linear",
				    slideshow: true,
				    slideshowSpeed: home_f_s_slideshow_speed,
				    animationSpeed: home_f_s_animation_speed,
				    controlNav: false,
				    directionNav: false,
				    after: function(slider) {
				      window.currentSlide = slider.currentSlide;
				    }
				});
			}

		// Slideshow - Vertical & Horizontal Nav
			if($(".full-screen.flexslider.vertical-nav, .full-screen.flexslider.horizontal-nav").length > 0) {

				var gallery_v_h_slideshow_speed = 6000,
					gallery_v_h_animation_speed = 2000;


				$(".full-screen.flexslider.vertical-nav, .full-screen.flexslider.horizontal-nav").flexslider({

				    prevText: "",
				    nextText: "",
				    animation: 'fade',
				    easing: "linear",
				    slideshow: true,
				    slideshowSpeed: gallery_v_h_slideshow_speed,
				    animationSpeed: gallery_v_h_animation_speed,
				    controlNav: false,
				    directionNav: false,

				    before: function(slider){

				    	$(".full-screen.flexslider .nav .bullets a.active").removeClass('active');
				    	$(".full-screen.flexslider .nav .bullets a:eq("+slider.animatingTo+")").addClass('active');
				    }
				});
			}

		// Albums - Grid
			if($(".gallery-albums.grid").length > 0) {

				$(".gallery-albums.grid .album-cont img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					$(this).height(c_width*o_height/o_width);
				});
				masonry_init($(".gallery-albums .albums"), ".gallery-albums .album");
			}

		// Albums - Masonry
			if($(".gallery-albums.masonry").length > 0) {

				$(".gallery-albums.masonry .album-cont img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					$(this).height(c_width*o_height/o_width);
				});

				// Initialization
				masonry_init($(".gallery-albums .albums"), ".gallery-albums .album.size-regular");
			}

		// Grid
			if($(".gallery-images.grid").length > 0) {

				$(".gallery-images img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					$(this).height(c_width*o_height/o_width);
				});
				masonry_init($(".gallery-images .images"), ".img");
			}

		// Masonry
			if($(".gallery-images.masonry").length > 0) {

				$(".gallery-images.masonry img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					$(this).height(c_width*o_height/o_width);
				});

				masonry_init($(".gallery-images .images"), ".size-regular");
			}

		// Horizontal - Normal
			if($(".gallery-h.normal").length > 0) {

				$(".gallery-h.normal .container .img a").each(function(index, el) {

					var img = $(this).find('img'),
						img_h = $(this).parent().height(),
						img_o_w = img.attr('data-width'),
						img_o_h = img.attr('data-height'),
						img_c_w = img_h*img_o_w/img_o_h;

					img.width(img_c_w);

					$(this).width(img_c_w);
				});

				var total_width = 0;

				$('.gallery-h.normal .container .img').each(function(index, el) {
					total_width += $(this).width() + 30;
				});

				total_width -= 29;

				$(".gallery-h.normal .container").width(total_width);

				$(".gallery-h.normal .gallery").niceScroll({
					cursoropacitymax: 0,
					mousescrollstep: 60
				});
			}

		// Horizontal - Centered
			if($(".gallery-h.centered").length > 0) {

				var total_width = 0,
					first_img = $('.gallery-h .container .img:first-child'),
					last_img = $('.gallery-h .container .img:last-child'),
					active_img = $(".gallery-h .img.active"),
					imgs_length = $('.gallery-h .container .img').length,
					container_margin = (win_w<=768)? 25 : 90;


				$(".gallery-h.centered .container .img a").each(function(index, el) {

					var img = $(this).find('img'),
						img_h = $(this).parent().height(),
						img_o_w = img.attr('data-width'),
						img_o_h = img.attr('data-height'),
						img_c_w = img_h*img_o_w/img_o_h;

					img.width(img_c_w);

					$(this).width(img_c_w);
				});

				$('.gallery-h .container .img').each(function(index, el) {

					var value = (imgs_length == (index-1))? 0 : 30;
					total_width += $(this).width() + value;
				});

				var extra_amount_left = (win_w / 2) - ( (first_img.width() / 2) + container_margin ),
					extra_amount_right = (win_w / 2) - ( (last_img.width() / 2) + container_margin );

				total_width += extra_amount_left + extra_amount_right;

				$(".gallery-h .container").width(total_width);

				$(".gallery-h .container").css({
					'padding-left': extra_amount_left+'px',
					'padding-right': extra_amount_right+'px'
				});

				//Centering on active image
				var active_index = active_img.index() + 1,
					req_width = 0;

				if(active_index != 1) {

					for (var i = 0; i < active_index; i++) {

						var current_img = $('.gallery-h .container .img:eq('+i+')');

						if(i == 0 || (i+1) == active_index) {
							req_width += (current_img.width()/2);
						}
						else {
							req_width += current_img.width();
						}

						if((i+1) != active_index) {
							req_width += 30;
						}
					}

					$(".gallery-h .container").css('left', '-'+req_width+'px');
				}

				// Navigation - Mouse Wheel
				$(".gallery-h.centered .gallery .container").mousewheel(function(event) {

					var direction = (event.deltaY == 1)? 'left' : 'right';

					gallery_scroll(direction);
					event.preventDefault();
				});

				// Navigation - Left Arrow
				$(".gallery-h.centered .nav .prev").click(function(event) {
					event.preventDefault();

					gallery_scroll('left');
				});

				// Navigation - Right Arrow
				$(".gallery-h.centered .nav .next").click(function(event) {
					event.preventDefault();

					gallery_scroll('right');
				});
			}


	// Portfolio

		// Grid
			if($(".portfolio.grid").length > 0) {

				$(".portfolio.grid .project-cont img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					$(this).height(c_width*o_height/o_width);
				});
				masonry_init($(".portfolio .projects"), ".size-regular");
			}

		// Masonry
			if($(".portfolio.masonry").length > 0) {

				$(".portfolio.masonry .project-cont img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					$(this).height(c_width*o_height/o_width);
				});

				masonry_init($(".portfolio .projects"), ".size-regular");
			}

		// Striped
			if($(".portfolio-striped").length > 0) {

				var cols = 4,
					wrapperWidth,
					total_width = 0,
					container_margin = 180,
					slide_amount = 400;

				if($(".portfolio-striped .projects").hasClass('cols-2')) {
					cols = 2;
				}
				else if($(".portfolio-striped .projects").hasClass('cols-3')) {
					cols = 3;
				}
				else if($(".portfolio-striped .projects").hasClass('cols-4')) {
					cols = 4;
				}

				if(win_w > 768 && win_w <= 1024 ) {
					cols = 3;
				}
				else if(win_w > 480 && win_w <= 768 ) {
					cols = 2;
					container_margin = 60;
				}
				else if(win_w <= 480 ) {
					cols = 1;
					container_margin = 60;
				}

				$(".portfolio-striped .project").width((win_w-container_margin)/cols);

				$('.portfolio-striped .project').each(function(index, el) {
					total_width += $(this).width();
				});

				total_width++;

				$('.portfolio-striped .projects').width(total_width);

				slide_amount = $(".portfolio-striped .project").width();

				$(".portfolio-striped .portfolio-inner").niceScroll({
					cursoropacitymax: 0,
					mousescrollstep: 60
				});
			}

		// Single - Style 1
			if($(".portfolio-single.style-1").length > 0) {

				if(win_w >= 768) {

					$(".portfolio-single.style-1 .images a").each(function(index, el) {

						var img = $(this).find('img'),
							img_h = img.height(),
							img_o_w = img.attr('data-width'),
							img_o_h = img.attr('data-height'),
							img_c_w = img_h*img_o_w/img_o_h;

						img.width(img_c_w);

						$(this).width(img_c_w);
					});

					var total_width = $(".portfolio-single.style-1 .content > .info").width() + 90 + $(".portfolio-single.style-1 .images").width();

					total_width++;

					$('.portfolio-single.style-1 .content').width(total_width);
				}
			}


	// Blog
		if($(".blog").length > 0) {

			$(".blog .article img").each(function(index, el) {

				var o_width = $(this).attr('data-width'),
					o_height = $(this).attr('data-height'),
					c_width = $(this).width();

				$(this).height(c_width*o_height/o_width);
			});

			masonry_init($(".blog .articles"), ".article");
		}
	}

	function resize() {

		win_w = $(window).width();
		win_h = $(window).height();


		// Header
			if(win_w > 1100) {
				$("header nav").fadeIn(200);

				if($("header nav").getNiceScroll().length >= 1) {
					$("header nav").getNiceScroll().remove();
					$("header nav").css('overflow', 'visible');
				}
			}
			else {
				if($("header nav").getNiceScroll().length <= 0) {
					$("header nav").niceScroll({
						mousescrollstep: 60,
						cursorcolor: "#959595",
				        cursorborder: "0px solid #fff",
					});
				}
			}


		// Gallery - Albums
			if($(".gallery-albums").length > 0) {

				$(".gallery-albums .album-cont img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					if($(this).is(':visible')) {
						$(this).height(c_width*o_height/o_width);
					}
				});
			}

		// Gallery - Masonry
			if($(".gallery-images.masonry").length > 0) {

				$(".gallery-images.masonry img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					if($(this).is(':visible')) {
						$(this).height(c_width*o_height/o_width);
					}
				});
			}

		// Gallery - Grid
			if($(".gallery-images.grid").length > 0) {

				$(".gallery-images img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					if($(this).is(':visible')) {
						$(this).height(c_width*o_height/o_width);
					}
				});
			}

		// Gallery - Horizontal Normal
			if($(".gallery-h.normal").length > 0) {

				$('.gallery-h .container').width(99999);

				$('.gallery-h .container .img a').each(function(index, el) {

					var anchor = $(this),
						img = $(this).find('img'),
						img_w = img.attr('data-width'),
						img_h = img.attr('data-height'),
						current_height = img.height();

					img.width((current_height*img_w)/img_h);
					anchor.width((current_height*img_w)/img_h);
				});

				var total_width = 0;

				$('.gallery-h.normal .container .img').each(function(index, el) {
					total_width += $(this).width() + 30;
				});

				total_width -= 29;

				$(".gallery-h.normal .container").width(total_width);
			}

		// Gallery - Horizontal Centered
			if($(".gallery-h.centered").length > 0) {

				var total_width = 0,
					first_img = $('.gallery-h .container .img:first-child'),
					last_img = $('.gallery-h .container .img:last-child'),
					active_img = $(".gallery-h .img.active"),
					imgs_length = $('.gallery-h .container .img').length,
					container_margin = (win_w<=768)? 25 : 90;

				$('.gallery-h .container').width(99999);

				$(".gallery-h .container .img a").each(function(index, el) {

					var anchor = $(this),
						img = $(this).find('img'),
						img_w = img.attr('data-width'),
						img_h = img.attr('data-height'),
						current_height = img.height();

					img.width((current_height*img_w)/img_h);
					anchor.width((current_height*img_w)/img_h);
				});

				$('.gallery-h .container .img').each(function(index, el) {

					var value = (imgs_length == (index-1))? 0 : 30;
					total_width += $(this).width() + value;
				});

				var extra_amount_left = (win_w / 2) - ( (first_img.width() / 2) + container_margin ),
					extra_amount_right = (win_w / 2) - ( (last_img.width() / 2) + container_margin );

				total_width += extra_amount_left + extra_amount_right;

				$(".gallery-h .container").width(total_width);

				$(".gallery-h .container").css({
					'padding-left': extra_amount_left+'px',
					'padding-right': extra_amount_right+'px'
				});

				//Centering on active image
				var active_index = active_img.index() + 1,
					req_width = 0;

				if(active_index != 1) {

					for (var i = 0; i < active_index; i++) {

						var current_img = $('.gallery-h .container .img:eq('+i+')');

						if(i == 0 || (i+1) == active_index) {
							req_width += (current_img.width()/2);
						}
						else {
							req_width += current_img.width();
						}

						if((i+1) != active_index) {
							req_width += 30;
						}
					}

					$(".gallery-h .container").css('left', '-'+req_width+'px');

				}

			}


		// Portfolio
			if($(".portfolio").length > 0) {

				$(".portfolio .project-cont img").each(function(index, el) {

					var o_width = $(this).attr('data-width'),
						o_height = $(this).attr('data-height'),
						c_width = $(this).width();

					if($(this).is(':visible')) {
						$(this).height(c_width*o_height/o_width);
					}
				});
			}

		// Portfolio - Single Style 1
			if($(".portfolio-single.style-1").length > 0) {

				$('.portfolio-single.style-1 .content').width(99999);
				$('.portfolio-single.style-1 .content .images').width(99599);

				$('.portfolio-single.style-1 .content .images a').each(function(index, el) {

					var anchor = $(this),
						img = $(this).find('img'),
						img_w = img.attr('data-width'),
						img_h = img.attr('data-height'),
						current_height = img.height();

					img.width((current_height*img_w)/img_h);
					anchor.width((current_height*img_w)/img_h);
				});

				$('.portfolio-single.style-1 .content .images').width('auto');

				var total_width = $(".portfolio-single.style-1 .content > .info").width() + 90 + $(".portfolio-single.style-1 .images").width();

				total_width++;

				$('.portfolio-single.style-1 .content').width(total_width);
			}

		// Pages
			if(win_w > 768) {
				// About Me - Page
				if($(".min-style").getNiceScroll().length >= 1) {
					$(".min-style").getNiceScroll().remove();
				}

				// Contact Us 1 - Page
				if($(".contact-1").getNiceScroll().length >= 1) {
					$(".contact-1").getNiceScroll().remove();
				}
			}
			else {

				// About Me - Page
				if($(".min-style").getNiceScroll().length <= 0) {
					$(".min-style").niceScroll({
						mousescrollstep: 60,
						cursorcolor: "#959595",
				        cursorborder: "0px solid #fff",
					});
				}

				// Contact Us 1 - Page
				if($(".contact-1").getNiceScroll().length <= 0) {
					$(".contact-1").niceScroll({
						mousescrollstep: 60,
						cursorcolor: "#959595",
				        cursorborder: "0px solid #fff",
					});
				}
				var wrapper_height = $(".contact-1 .content-wrapper").height();
				$(".contact-1 .map").height(wrapper_height+60);
			}

		// Blog
			if($(".blog").length > 0) {

				$(".blog .article").each(function(index, el) {

					var img = $(this).find('img'),
						o_width = img.attr('data-width'),
						o_height = img.attr('data-height'),
						c_width = img.width();

					if($(this).is(':visible')) {
						img.height(c_width*o_height/o_width);
					}
				});
			}
	}

	function gallery_scroll(direction) {

		var active_img = $(".gallery-h .img.active"),
			next_img = $(".gallery-h .img.active").next(),
			prev_img = $(".gallery-h .img.active").prev(),
			count = $(".gallery-h .img").length,
			current_left = parseInt($(this).css('left'));

		if( (active_img.index() == 0 && direction == "left") || (active_img.index() == (count-1) && direction == "right") ) {
			is_moving = false;
		}
		else if(!is_moving) {

			is_moving = true;

			if(direction == "right") {

				var scroll_amount = (active_img.width()/2) + (next_img.width()/2) + 30;
				$(".gallery-h .container").animate({left: "-="+scroll_amount},1000,'easeOutExpo',function(){
					is_moving = false;
				});

				active_img.removeClass('active');
				next_img.addClass('active');
			}
			else {
				var scroll_amount = (active_img.width()/2) + (prev_img.width()/2) + 30;
				$(".gallery-h .container").animate({left: "+="+scroll_amount},1000,'easeOutExpo',function(){
					is_moving = false;
				});

				active_img.removeClass('active');
				prev_img.addClass('active');
			}
		}
	}

	function masonry_init(selector, item) {

		selector.isotope({
			layoutMode: 'masonry',
			percentPosition: true,
			masonry: {
			  	columnWidth: item
			}
		});
	}

	function toggleFullScreen(elem) {

	    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
	        if (elem.requestFullScreen) {
	            elem.requestFullScreen();
	        } else if (elem.mozRequestFullScreen) {
	            elem.mozRequestFullScreen();
	        } else if (elem.webkitRequestFullScreen) {
	            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	        } else if (elem.msRequestFullscreen) {
	            elem.msRequestFullscreen();
	        }
	    } else {
	        if (document.cancelFullScreen) {
	            document.cancelFullScreen();
	        } else if (document.mozCancelFullScreen) {
	            document.mozCancelFullScreen();
	        } else if (document.webkitCancelFullScreen) {
	            document.webkitCancelFullScreen();
	        } else if (document.msExitFullscreen) {
	            document.msExitFullscreen();
	        }
	    }
	}

	function random_slide(num) {

		var rand = Math.floor((Math.random() * num));

		if(home_slides_arr.length == 0 || home_slides_arr[0] != rand) {
			home_slides_arr[0] = rand;
			$(".striped-slides .cols .flexslider:eq("+rand+")").flexslider("next");
		}
		else {
			random_slide(num);
		}
	}


	$(window).resize(function(event) {
		resize();
	});

/*==========================================================================================================================================
/*==========================================================================================================================================
	Handlers
============================================================================================================================================
============================================================================================================================================*/

	// Preloader
		if($(".contact-1").length <= 0 && $(".contact-2").length <= 0 && $("body > .loader").length > 0) {

			var bg_color = $("body > .loader").attr('data-background-color') || '#000000',
				text_color = $("body > .loader").attr('data-text-color') || '#ffffff';

			$("body > .loader").before('<style id="cosy-custom-styler" type="text/css">.loader .circle{border: 2px solid '+text_color+';border-right-color: transparent;}</style>');
			$("#cosy-custom-styler").append('.loader p{color: '+text_color+';}body > .loader{background-color: '+bg_color+';}');

			var imgs = $("img:not('.lazy')").length,
				loaded_imgs = 0;


			if($(".gallery-h.normal").length > 0) {

	    		$("img.lazy").lazyload({
	    			threshold : 400,
				    effect : "fadeIn",
				    container : $(".gallery"),
				    skip_invisible : true
				});
	    	}
			else if($(".gallery-h.centered").length > 0) {

	    		$("img.lazy").lazyload({
	    			threshold : 400,
				    effect : "fadeIn",
				    container : $(".gallery .container"),
				    skip_invisible : true
				});
	    	}
	    	else {

	    		$("img.lazy").lazyload({
	    			threshold : 200,
				    effect : "fadeIn",
				    container : $(".inner-wrapper"),
				    skip_invisible : true,
				    failure_limit: 100
				});
	    	}

			if(imgs <= 0) {
				render();

				$("body > .loader").delay(1500).fadeOut(200, function() {
		    		$("body").addClass('loaded');
		    	});
			}
			else {
				$("img:not('.lazy')").each(function(index, el) {

					$(this).imagesLoaded(function(){
						loaded_imgs++;

						if(loaded_imgs == imgs) {

							render();

							$("body > .loader").delay(1500).fadeOut(200, function() {
					    		$("body").addClass('loaded');
					    	});
						}
					});
				});
			}
		}
		else {

			render();
			$("body > .loader").fadeOut(300, function() {
	    		$("body").addClass('loaded');
	    	});
		}


	// Scrollbar & Flexslider
		if($(".wrapper > .inner-wrapper").length > 0) {

			$(".wrapper > .inner-wrapper").niceScroll({
				mousescrollstep: 60,
				cursorcolor: "#959595",
		        cursorborder: "0px solid #fff",
			});

			if($(".inner-wrapper .flexslider").length > 0) {

				var fs_slideshow_speed = 6000,
					fs_animation_speed = 2000;

				$(".inner-wrapper .flexslider").flexslider({

				    prevText: "",
				    nextText: "",
				    animation: 'fade',
				    easing: "linear",
				    slideshow: true,
				    slideshowSpeed: fs_slideshow_speed,
				    animationSpeed: fs_animation_speed,
				    controlNav: false,
				    directionNav: false,
				    after: function(slider) {
				      window.curSlide = slider.currentSlide;
				      console.log(slider.currentSlide);
				    }
				});


				// Navigation Controls - Previous
				$(".inner-wrapper .flexslider .nav .prev").click(function(event) {
					event.preventDefault();

					$(".inner-wrapper .flexslider").flexslider('prev');
				});

				// Navigation Controls - Next
				$(".inner-wrapper .flexslider .nav .next").click(function(event) {
					event.preventDefault();
					$(".inner-wrapper .flexslider").flexslider('next');
				});
			}
		}


	// Fullscreen Slideshow Functions

		// Navigation Controls - Previous
		$(".full-screen.flexslider .nav .prev").click(function(event) {
			event.preventDefault();

			$(".full-screen.flexslider").flexslider('prev');

			$(".full-screen.flexslider .pause").fadeOut(200,function(){
				$(".full-screen.flexslider .play").fadeIn(200);
			});
		});

		// Navigation Controls - Next
		$(".full-screen.flexslider .nav .next").click(function(event) {
			event.preventDefault();

			$(".full-screen.flexslider").flexslider('next');

			$(".full-screen.flexslider .pause").fadeOut(200,function(){
				$(".full-screen.flexslider .play").fadeIn(200);
			});
		});

		// Navigation Controls - Play
		$(".full-screen.flexslider .nav .play").click(function(event) {
			event.preventDefault();

			$(".full-screen.flexslider").flexslider('play');

			$(this).fadeOut(200,function(){
				$(".full-screen.flexslider .pause").fadeIn(200);
			});
		});

		// Navigation Controls - Pause
		$(".full-screen.flexslider .nav .pause").click(function(event) {
			event.preventDefault();

			$(".full-screen.flexslider").flexslider('pause');

			$(this).fadeOut(200,function(){
				$(".full-screen.flexslider .play").fadeIn(200);
			});
		});

		// Navigation Controls - Fullscreen
		$(".full-screen.flexslider .nav .full").click(function(event) {
			event.preventDefault();

			toggleFullScreen(document.body);
		});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Header
============================================================================================================================================
============================================================================================================================================*/

	// Dropdown effect
		$("header nav li").hover(function() {

			    if ( $(this).children('ul').length > 0  && !$(".mobile-navigation").is(':visible') ) {

			    	var children = $(this).find('> ul'),
			    		elem = $(this),
			    		elemOff = parseInt($(this).offset().left),
			    		elemWidth = elem.width();

			        if((elemOff + 200 + elemWidth) > win_w) {
			        	children.addClass('edge');
			        }

			        $(this).find('> ul').fadeIn(300);
			    }
			}, function() {

			    if ( $(this).children('ul').length > 0 && !$(".mobile-navigation").is(':visible') ) {
			        $(this).find('> ul').stop().fadeOut(300);
			    }
		});


	// Unfolding sub-menus in responsive mode.
		$("header nav li a").click(function(event) {

		    if ( $(this).parent().children('ul').length > 0  && $(".mobile-navigation").is(':visible') ) {

		 		event.preventDefault();
		        $(this).parent().find('> ul').slideToggle(300);
		    }
		});


	// Adding Scrollbar
		if($("header").length > 0 && win_w <= 1024) {

			$("header nav").niceScroll({
				mousescrollstep: 60,
				cursorcolor: "#959595",
		        cursorborder: "0px solid #fff",
			});
		}


	// Mobile navigation
		$(".mobile-navigation").click(function(event) {

		    event.preventDefault();

		    $("header nav").slideToggle(100);
		});


	// Adding arrows for mobile menu
		if($("header").length > 0) {

			$("header nav .mCSB_container > ul > li > a").each(function(index, el) {

				if(win_w <= 1024 && $(this).parent().children('ul').length > 0) {

					$(this).append('<span class="arrow-down icon1-chevron-down"></span>');
				}
			});
		}


/*==========================================================================================================================================
/*==========================================================================================================================================
	Home
============================================================================================================================================
============================================================================================================================================*/

/*==========================================================================================================================================
/*==========================================================================================================================================
	Gallery
============================================================================================================================================
============================================================================================================================================*/


	// Slideshow - Vertical & Horizontal Nav

		// Navigation - Bullet click
		$(".full-screen.flexslider .nav .bullets a").click(function(event) {

			event.preventDefault();

			var id = $(this).index(),
				slider = $(".full-screen.flexslider").data('flexslider');

			if(!$(this).hasClass('active')) {

		    	$(".full-screen.flexslider .nav .bullets a.active").removeClass('active');
		    	$(this).addClass('active');

		    	$(".full-screen.flexslider").flexslider('pause');
		    	slider.flexAnimate(id);

				$(".full-screen.flexslider .pause").fadeOut(200,function(){
					$(".full-screen.flexslider .play").fadeIn(200);
				});
			}
		});


	// Horizontal - Normal
		if($(".gallery-h.normal").length > 0) {

			// On Image Hover
			$('.gallery-h.normal .gallery .container .img a').hover(function() {

				$(this).parent().addClass('active');
				$(this).parent().parent().addClass('hovered');
			}, function() {

				$(this).parent().removeClass('active');
				$(this).parent().parent().removeClass('hovered');
			});

			// On Image Click
			$(".gallery-h.normal .container .img a").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});

			// Navigation Controls - Previous
			$(".gallery-h.normal .nav .prev").click(function(event) {
				event.preventDefault();

				var scroll_amount = 400;

				if(win_w <= 768) {
					scroll_amount = win_w - 30;
				}
				$(".gallery-h.normal .gallery").getNiceScroll(0).doScrollLeftBy(scroll_amount);
			});

			// Navigation Controls - Next
			$(".gallery-h.normal .nav .next").click(function(event) {
				event.preventDefault();

				var scroll_amount = 400 * (-1);

				if(win_w <= 768) {
					scroll_amount = win_w - 35;
				}

				$(".gallery-h.normal .gallery").getNiceScroll(0).doScrollLeftBy(scroll_amount);
			});
		}


	// Horizontal - Centered
		if($(".gallery-h.centered").length > 0) {

			$(".gallery-h.centered .container .img a").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});
		}


	// Albums
		if($(".gallery-albums").length > 0) {

			// Filters
			$(".gallery-albums .filters a").click(function(event) {
				event.preventDefault();

				var target = $(this).attr('data-filter'),
					style = $(this).parent().attr('data-style') || 'fade';

				if(!$(this).hasClass('active')) {

					if(style == "scale") {
						$(".gallery-albums .albums").isotope({ filter: target }).on( 'layoutComplete',
							function( event, laidOutItems ) {
								$(window).resize();
							}
						);
					}
					else {
						if(target == "*") {

							$(".gallery-albums").removeClass('filtered');
							$(".gallery-albums .album.active").removeClass('active');
						}
						else {

							$(".gallery-albums").addClass('filtered');
							$(".gallery-albums .album.active").removeClass('active');

							$(".gallery-albums .album"+target).addClass('active');
						}
					}

					$(".gallery-albums .filters a.active").removeClass('active');
					$(this).addClass('active');
				}
			});

			// Love icon
			$(".gallery-albums .album .love").click(function(event) {
				event.preventDefault();

				if($(this).is(':visible')) {

					var id = $(this).parent().attr('href');

					$(this).next().fadeIn(200, function() {
						$(this).prev().fadeOut(100);
						$.cookie(id, 1, { expires : 1000 });
					});
				}
			});

			$(".gallery-albums .album").each(function(index, el) {

				var id = $(this).find('.overlay').attr('href'),
					love = $(this).find('.love');

				if(typeof $.cookie(id) !== 'undefined') {

					love.next().fadeIn(200, function() {
						love.fadeOut(100);
					});
				}
			});

			$(".gallery-albums .album .love-2").click(function(event) {
				event.preventDefault();

				var id = $(this).parent().attr('href'),
					love = $(this).prev();

				if(typeof $.cookie(id) !== 'undefined') {

					if($.removeCookie(id)) {
						$(this).fadeOut(100, function() {
							love.fadeIn(200);
						});
					}
				}
			});
		}


	// Kenburns
		if($(".full-screen.flexslider.kenburns").length > 0) {

			var gallery_k_slideshow_speed = 6000,
				gallery_k_animation_speed = 2000;

			$(".full-screen.flexslider.kenburns").flexslider({

			    prevText: "",
			    nextText: "",
			    animation: 'fade',
			    easing: "linear",
			    slideshow: true,
			    slideshowSpeed: gallery_k_slideshow_speed,
			    animationSpeed: gallery_k_animation_speed,
			    controlNav: false,
			    directionNav: false
			});
		}


	// Images
		if($(".gallery-images").length > 0) {

			// Filters
			$(".gallery-images .filters a").click(function(event) {
				event.preventDefault();

				var target = $(this).attr('data-filter'),
					style = $(this).parent().attr('data-style') || 'fade';

				if(!$(this).hasClass('active')) {

					if(style == "scale") {
						$(".gallery-images .images").isotope({ filter: target }).on( 'layoutComplete',
							function( event, laidOutItems ) {
								$(window).resize();
							}
						);
					}
					else {
						if(target == "*") {

							$(".gallery-images").removeClass('filtered');
							$(".gallery-images .img.active").removeClass('active');
						}
						else {


							$(".gallery-images").addClass('filtered');
							$(".gallery-images .img.active").removeClass('active');

							$(".gallery-images .img"+target).addClass('active');
						}
					}

					$(".gallery-images .filters a.active").removeClass('active');
					$(this).addClass('active');
				}
			});

			// Love icon
			$(".gallery-images .img .love").click(function(event) {
				event.preventDefault();

				if($(this).is(':visible')) {

					var id = $(this).parent().find('a').attr('href');

					if($(this).parent().find('.preview-2').length > 0) {
						id = $(this).parent().find('.preview-2').attr('href');
					}
					if($(".gallery-images").hasClass('style-title')) {
						id = $(this).parent().find('a').attr('href');
					}

					$(this).next().fadeIn(200, function() {
						$(this).prev().fadeOut(100);
						$.cookie(id, 1, { expires : 1000 });
					});
				}
			});

			$(".gallery-images .img").each(function(index, el) {

				var id = $(this).find('.overlay .preview').attr('href'),
					love = $(this).find('.love');

				if($(this).find('.preview-2').length > 0) {
					id = $(this).find('.preview-2').attr('href');
				}
				if($(".gallery-images").hasClass('style-title')) {
					id = $(this).find('.overlay a').attr('href');
				}

				if(typeof $.cookie(id) !== 'undefined') {

					love.next().fadeIn(200, function() {
						love.fadeOut(100);
					});
				}
			});

			$(".gallery-images .img .love-2").click(function(event) {
				event.preventDefault();

				var id = $(this).parent().find('.preview').attr('href'),
					love = $(this).prev();

				if($(this).parent().find('.preview-2').length > 0) {
					id = $(this).parent().find('.preview-2').attr('href');
				}
				if($(".gallery-images").hasClass('style-title')) {
					id = $(this).parent().find('a').attr('href');
				}

				if(typeof $.cookie(id) !== 'undefined') {

					if($.removeCookie(id)) {
						$(this).fadeOut(100, function() {
							love.fadeIn(200);
						});
					}
				}
			});

			$(".gallery-images .img .preview-2, .gallery-images .img .preview-3").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});

			// On Image Click
			$(".gallery-images .img a.img-cont").magnificPopup({

			    type: 'iframe',
			    closeOnContentClick: false,
			    mainClass: 'mfp-fade',
			    preloader: true,
			    iframe: {
						markup: '<div class="mfp-iframe-scaler">'+
						        '<div class="mfp-close"></div>'+
						        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						      '</div>',

						patterns: {
							youtube: {
							  index: 'youtube.com/',
							  id: 'v=',
							  src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							vimeo: {
							  index: 'vimeo.com/',
							  id: '/',
							  src: '//player.vimeo.com/video/%id%?autoplay=1'
							},
							gmaps: {
							  index: '//maps.google.',
							  src: '%id%&output=embed'
							}
						},
						srcAction: 'iframe_src',
				}
			});

			$(".gallery-images .img .preview").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});

			$(".gallery-images.style-title .img .overlay a:not('.video')").magnificPopup({

			    type: 'image',
			    closeOnContentClick: true,
			    mainClass: 'mfp-fade',
			    preloader: true,

			    gallery: {
				    enabled: true,
					navigateByImgClick: true,
					arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
					tPrev: 'Previous (Left arrow key)', // title for left button
					tNext: 'Next (Right arrow key)', // title for right button
					tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
				}
			});

			$(".gallery-images.style-title .img .overlay a.video").magnificPopup({

			    type: 'iframe',
			    closeOnContentClick: false,
			    mainClass: 'mfp-fade',
			    preloader: true,
			    iframe: {
						markup: '<div class="mfp-iframe-scaler">'+
						        '<div class="mfp-close"></div>'+
						        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
						      '</div>',

						patterns: {
							youtube: {
							  index: 'youtube.com/',
							  id: 'v=',
							  src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
							vimeo: {
							  index: 'vimeo.com/',
							  id: '/',
							  src: '//player.vimeo.com/video/%id%?autoplay=1'
							},
							gmaps: {
							  index: '//maps.google.',
							  src: '%id%&output=embed'
							}
						},
						srcAction: 'iframe_src',
				}
			});
		}


	// About Me
		if($(".min-style").length > 0 && win_w < 768) {

			$(".min-style").niceScroll({
				mousescrollstep: 60,
				cursorcolor: "#959595",
		        cursorborder: "0px solid #fff",
			});
		}


	// About Us
		if($(".med-style").length > 0) {

			$(".med-style").niceScroll({
				mousescrollstep: 60,
				cursorcolor: "#959595",
		        cursorborder: "0px solid #fff",
			});
		}

});


})(jQuery);