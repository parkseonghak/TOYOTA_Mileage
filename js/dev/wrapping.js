(function($){
	'use strict';

	if(typeof window.ui === 'undefined'){
		var ui = window.ui = {}
	}

	ui.init = (function(_){
		(function deviceCheck(md){
			/* check device */
			_.isDevice   = md.mobile();		/* smart device	: ui.isDevice */
			_.isMobile   = md.phone();		/* mobile		: ui.isMobile */
			_.isTablet   = md.tablet();		/* tablet		: ui.isTablet */
			_.isDesktop  = !md.mobile();	/* desktop		: ui.isDesktop */
		})(new MobileDetect(window.navigator.userAgent));

		(function setViewport(viewport){
			if(_.isDesktop){
				/* set desktop viewport */
				viewport.attr({'content':'width=750, user-scalable=no'});
			}
			if(_.isTablet){
				/* set tablet viewport */
				viewport.attr({'content':'width=750, user-scalable=no'});
			}
			if(_.isMobile){
				/* set mobile viewport */
				viewport.attr({'content':'width=750, user-scalable=no'});
			}
		})($('meta[name=viewport]'));

		var getElements = function(){
			_.$html			=	$('html');
			_.$body			=	$('body');
			_.$wrap			=	$('#wrap');
			_.$header		=	$('#header');
			_.$gnb			=	$('#gnb');
			_.$gnbdepth		=	$('#gnb > ul > li');
			_.$gnbdepth2	=	$('#gnb > ul > li > a');
			_.$container	=	$('#container');
			_.$main			=	$('#main');
			_.$contents		=	$('#contents');
			_.$footer		=	$('#footer');
			_.$motion		=	$('.n-motion');
			_.$motionTop    =   [];
			_.$motion.each(function(i, elem) {
			    var motionTop = $(elem).offset().top;

			    if (_.$motionTop) {
			    	_.$motionTop.push(motionTop);
			    } else {
			    	_.$motionTop = [motionTop];
			    }
			});
		}

		var getWindowSize = function(){
			_.winsizeW = $(window).outerWidth();
			_.winsizeH = $(window).outerHeight();
		}

		var getWindowScrl = function(){
			_.winscrlT = $(window).scrollTop();
			_.winscrlL = $(window).scrollLeft();
		}

		return {
			onLoad : function(){
				getElements();
				getWindowSize();
				getWindowScrl();

				_.loadmotion.init();
			},
			onResize : function(){
				getWindowSize();
			},
			onScroll : function(){
				getWindowScrl();
			}
		}
	})(ui);

	ui.loadmotion = (function(_){
		return {
			init : function(){
				var f = this;
				_.$motion.each(function(idx, obj){
					obj.t = _.$motionTop[idx];
					obj.h = $(obj).outerHeight() / 6;
					obj.p = obj.t + obj.h;
					obj.e = 'load.lmotion'+idx+' scroll.lmotion'+idx;
					$(obj).attr('data-top', obj.p);

					f.scroll(obj);
					$(window).on(obj.e, function(){
						f.scroll(obj);
					});
				});
			},
			scroll : function(obj){
				if(_.winscrlT + _.winsizeH > $(obj).data('top')){
					$(obj).addClass('n-active');
				} else {
					$(obj).removeClass('n-active');
				}
			}
		}
    })(ui);

	var $slickObj;
	var currentType  = "01";
	var currentColor = "blue";
	var viewSlide    = 0;

	ui.fullSlider = function(){
		if(typeof $slickObj !== 'undefined') $slickObj.slick('unslick');

		$slickObj = $('.full_slider').slick({
			vertical: true,
			verticalSwiping: true,
			arrow: true,
			dots: false,
			initialSlide : viewSlide ? viewSlide : 0
		});

		$slickObj.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			viewSlide = nextSlide;
		});
	}

    ui.popupAction = function(){

		$(".btn_type").on('click', function(){
			$('.type_choose').toggleClass('on');
		});

		$('.type_pad ul li button').on('click', function(){

			var type = $(this).data('type');
			currentType = type;

			$('.btn_type').text($(this).text());
			$('.type_choose').removeClass('on');

			ui.load();
		});

        $('#currColor').on('click', function(){
            $('.color_choose').toggleClass('on');
		});

		$('#colocClose').on('click', function(){
            $('.color_choose').removeClass('on');
		});

		$('.color_pad ul li button').on('click', function(){

			var color 		= $(this).data('color');

            $('#currColor').removeClass("c_" + currentColor).addClass("c_" + color);
			$('.color_pad').removeClass('on');

			$(this).addClass('chk').closest('li').siblings().find('button').removeClass('chk');

			currentColor    = color;

			ui.load();
		});

		$(".layer_close").on('click', function(){
			currentType  = "01";
			currentColor = "khaki";
			viewSlide	 = 0;
		});

		//default set
		$('.color_pad ul li button').each(function(){
			var color = $(this).data('color');
			if(currentColor == color){
				$(this).addClass('chk').closest('li').siblings().find('button').removeClass('chk');
				$('#currColor').removeClass("c_blue").addClass("c_" + color);
				return false;
			}
		});

		$('.type_pad ul li button').each(function(){
			var type = $(this).data('type');
			if(currentType == type){
				$('.btn_type').text($(this).text());
				$('.type_choose').removeClass('on');
				return false;
			}
		});

		ui.load();
	},

	ui.load = function(){

		
//currentColor + '_' + currentType + '.html'
		$.ajax({
			url : 'carContent.do?color=' + currentColor + "&type=" + currentType,
			timeout : 10000,
			dataType : 'html',
			success : function(result){
				$('.cont_area').css("display", "none");
				$('.cont_area').empty().append(result);
				$('.cont_area').fadeIn(300);
				ui.fullSlider();
			},
			error : function(xhr){
				console.log('['+xhr.status+'] 서버전송오류가 발생했습니다.');
			}
		});
	},

	ui.setCar = function(color, type){
		currentColor = color;
		currentType  = type;

		newriver.ajaxpopup.open('/evncou/custom/wrappingPopup/popup_wrap.do');
	}

	$(window).on({
		'load' : function(){
			ui.init.onLoad();
		},
		'resize' : function(){
			ui.init.onResize();
		},
		'scroll' : function(){
			ui.init.onScroll();
		}
	});

})(jQuery);