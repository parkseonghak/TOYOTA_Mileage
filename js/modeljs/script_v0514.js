var msVersion = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/),
    msie = !!msVersion,
    ie8_and_below = msie && parseFloat(msVersion[1]) <= 8,
    ie9 = msie && parseFloat(msVersion[1]) == 9;
var player,
    thiscurrent = 0,
    setTimes,
    itsmobile = false;
// if(!ie8_and_below) {
//     var tag = document.createElement('script');
//     tag.src = "https://www.youtube.com/iframe_api";
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     function onYouTubeIframeAPIReady(fileName) {
//         player = new YT.Player('player', {
//             height: '100%',
//             width: '100%',
//             videoId: 'COp7F3M2rKA',
//             rel : 0,
//             playerVars: {
//                 html5: 1
//             },
//             events: {
//     //            'onReady': onPlayerReady,
//     //            'onStateChange': onPlayerStateChange
//             }
//         });
//     }
// }

(function(){
    var sectionMo = false;
    var sections = ['#prius','#exterior','#interior','#features','#gallery','#event','#specs'];

	$(document).ready(function(){
        if($("#event").length <= 0) sections = ['#prius','#exterior','#interior','#features','#gallery','#specs'];

        // var $slideWrap = $('.slideWrap'),
        //     $gnb = $('#gnb'),
        //     $wrap = $('#wrap'),
        //     $depth2bg = $('#depth2bg');
        // var ratio=[];
		/*---------------------------------------- var ----------------------------------------*/

        // var chageImage = false;
        // var modelLitotal;
        // var submenuLi = [];
        // //이미지 체인징이 진행중인지 체크
        // $('.submenu').each(function(subidx){
        //     var subindex = subidx,
        //         _this = $(this);
        //     if(subindex == 0 || subindex == 2){
        //         //sub 중 menu 와 hybrid 선택시
        //         _this.find('li').each(function(index){
        //             var _this = $(this);
        //             _this.hoverdir();
        //         });
        //         //sub li
        //     }else if(subindex == 1){
        //         //sub 중 model
        //         chageImage = false;
        //         modelLitotal = _this.find('li').length;
        //         _this.find('li').each(function(index){
        //             var _thisLi = $(this),
        //                 _liindex = index;
        //             submenuLi[index] = {};
        //             _thisLi.on('mouseenter',function(e){
        //                 _thisLi.addClass('hover');
        //                 _thisLi.find('.maskBg').addClass('active').show().stop();
        //                 if(!chageImage){
        //                     chageImage = true;
        //                     RandomChange(_this,_liindex);
        //                 }
        //                 //if
        //             })
        //             .on('mouseleave',function(e){
        //                 _thisLi.removeClass('hover');
        //                 _thisLi.find('.maskBg').removeClass('active').stop().hide();
        //             })
        //             .on('click',function(e){
        //                 $(location).attr('href','./models.html');
        //             });
        //         });
        //         //each
        //     }
        //     //if

        // });
        // //.submenu each

        // var fromArray = [{"left":"-100%","top":"0","name" : "from left"},{
        //                     "left":"100%","top":"0","name" : "from right"},{
        //                     "left":"0","top":"-100%","name" : "from top"},{
        //                     "left":"0","top":"100%","name" : "from bottom"}];
        // var toArray = [{"left":"100%","top":"0","name" : "to right"},{
        //                     "left":"-100%","top":"0","name" : "to left"},{
        //                     "left":"0","top":"100%","name" : "to bottom"},{
        //                     "left":"0","top":"-100%","name" : "to top"}]
        // var selectLayer = 0;
        // var endComplete = 0;


        // function RandomChange(tg,idx){
        //     var target = $('#depth2-models').find('>li'),//submenu
        //         _liindex = idx;

        //     target.each(function(index){
        //         var _this = $(this),
        //             changeTarget = _this.find('div.change').eq(selectLayer),
        //             oldTarget = _this.find('div.change').eq((selectLayer+1)%2);
        //         submenuLi[index].BgNum = makeRandom(0,7,submenuLi[index].BgNum);

        //         if(index !== _liindex){
        //             //예외 것들
        //             oldTarget.removeClass('active').fadeOut("slow");
        //             _this.find('.maskBg').css({
        //                 'background-position' : '0 -'+submenuLi[index].BgNum*380+'px'
        //             });
        //             _this.css({
        //                 'background-position' : '0 -'+submenuLi[index].BgNum*380+'px'
        //             });
        //             changeTarget.addClass('active').css({
        //                 'background-position' : '0 -'+submenuLi[index].BgNum*380+'px'
        //             }).fadeIn("slow",function(){
        //                 endComplete++;
        //                 if(endComplete == modelLitotal-1){
        //                     endComplete = 0;
        //                     chageImage = false;
        //                     selectLayer = (selectLayer+1)%2;
        //                 }
        //             });
        //         }else{

        //         }
        //         //if _liindex
        //     });

        // }
        // //RandomChange

        // var reelplayStatus = false,
        //     movieFile = [{
        //         img : '../models/prius/img/main_visual.jpg',
        //         movieUrl : 'COp7F3M2rKA'
        //         },{
        //         img : '../models/prius/img/vr.jpg',
        //         movieUrl : '7t3M835G8V8'
        //         },{
        //         img : '../models/prius/img/keyvisual_2.jpg'
        //     }];

        var mainVisual = {
            setting : function(e){
                var _this = $('.slide_wrap');

                $('#wrap').prepend('<div id="vrDiv" style="position:relative;opacity:0;width:100%;" class="coverDiv"></div>');
                resizeSlideWrap(_this);
            },
        };
        mainVisual.setting();
        //mainVisual

        function resizeSlideWrap(ele){
            var _this = ele,
                index = _this.index();
            var wh = $(window).height(),
                headh = $('#header').height(),
                lnb_wraph = $('.lnb_wrap > h2').height();

                var cal = wh-(lnb_wraph + headh)
            if(!_this.hasClass('twoCol')){
                $('#vrDiv').css('height', cal);
                $('#pseudo').hide();
            }else{
            }
        }
        //리사이즈

        var subpage = {
            setting : function(){
                //서브페이지 셋팅
                $('.lnb_title').find('li').each(function(index){
                    var _this = $(this),
                        _liindex = index;
                    if(!_this.hasClass('havPdf')){
                        _this.find('a').on('click',function(e){
                            var gotoTarget = $(sections[_liindex]).offset().top - $('#header').height();

                            gotoTarget = gotoTarget - $('.lnb_title').height();

                            subpage.scrollToDiv(gotoTarget);
                            eventClick(e);
                        });
                    }
                });

                $("#movie .btn_skip").click(function(e){
                    $('#container .sub_wrap li').eq(0).find('a').click();
                    eventClick(e);
                });

                $(window).scroll(function(ev){
                    var scrollVal = $(window).scrollTop();
                    var scrollMax = window.innerHeight - $("#header").height() - $(".lnb_wrap").height() + $("#movie").height() - 100;
                    // console.log(scrollVal);

                    if(scrollVal >= 200 && scrollVal <= scrollMax && commonjs.isMobile() == false){
                        if($("#moviePlayer").get(0).paused){
                            $("#moviePlayer").get(0).play().catch(function(){});
                        }
                    }else{
                        $("#moviePlayer").get(0).currentTime = 0;
                        $("#moviePlayer").get(0).pause();
                    }
                });

                // subpage.dragMaskFunc($('.dragWrap'));
                subpage.priusSection();
                subpage.designSection();
                subpage.tngaSection();
                subpage.gallerySection();
                subpage.galleryUpdate();
                subpage.selectColorsSet();
                subpage.specHybridSection();
                subpage.resizeSub();
                $(window).resize(function(){
                    subpage.tngaSection('resize');
                    subpage.galleryUpdate();
                    subpage.resizeSub();
                });
            },
            resizeSub : function(){
                $('body').addClass('mobile');
            },
            scrollToDiv : function(num){
                if($('body').scrollTop() !== num){
                    $('html,body').animate({
                        scrollTop: num
                    }, 400, 'easeInOutCirc', function() {
                    });
                }
                //if
            },
            // "dragMaskFunc" : function(target){
            //     var _target = target, //드래깅 영역
            //         $maskDiv = _target.find('.maskDiv'), //마스크 이미지
            //         $defaultDiv = _target.find('.defaultDiv'), //기본 이미지 - 레벨 더 위에 있음
            //         $dragBtn = _target.find('.dragBtn'), //드래그 버튼
            //         $bgImg = _target.find('.bgimgDiv'),
            //         _ratio = 1500/1920, //배경 시안 이미지에서 발췌한 비율
            //         _dragBtnRatio = 836/1920; //드래그 세로 줄 시안 이미지에서 발췌한 비율
            //     _target.on("mousemove",function(e){
            //         var _x = e.pageX-_target.offset().left;
            //         $maskDiv.width(_x);
            //         $dragBtn.css('left',_x);
            //         $defaultDiv.width(_target.width()-_x);
            //     });
            //     var DefaultSet = function(e){
            //         //사이즈 셋팅
            //         $('#section2').height($('#section2').width()*_ratio);
            //         _target.find('div > img.carImg').width(_target.width());
            //         var centerPos = _target.width()*0.5;
            //         $maskDiv.width(centerPos);
            //         $dragBtn.css({
            //             'left' : centerPos,
            //             'margin-top' : (_target.width()*_dragBtnRatio)*-0.5,
            //             'height' : _target.width()*_dragBtnRatio
            //         });
            //         $defaultDiv.width(centerPos);
            //     }
            //     DefaultSet();
            //     $(window).resize(function(){
            //         DefaultSet();
            //     });
            // },
            // "movePllx" : function(div,area,num){
            //     var $moveDiv = div,
            //         $radionum = num,
            //         $area = area,
            //         mgl = $moveDiv.width()*0.5;
            //         $area.mousemove(function(e){
            //             var mouseX = e.pageX,
            //                 n = mouseX*(100*($radionum*0.3)/$area.width()),
            //                 m = (($moveDiv.width()-$area.width())/100)*n;
            //         $moveDiv.css({'margin-left':-(m + mgl)+'px'});
            //     });
            // },
            // maskHoverImgResize : function(ele){
            //     var _ele = ele;
            //     _ele.find('.maskHover').find('li').each(function(index){
            //         var img = new Image(),
            //             _this = $(this);
            //         img.onload = function(){
            //             _this.find('.maskBg >img').width(_this.width());
            //         };
            //         img.src = _this.find('>img').attr('src');
            //     });
            // },
            priusSection : function(){
                var bgImg = new Image();
                var bgNum = 6;
                var bgFrame = 1;
                bgImg.onload = function(){
                    $("#prius .visualWrap .bg").append('<img src="/upload/modelView/MODEL_New_PRIUS/img_v0514/bg_hybrid_neon2.jpg" alt="">');
                    neonInterval = setInterval(function(){
                        $("#prius .visualWrap .bg img").css("margin-top", bgFrame * 650 * -1);
                        if(bgFrame < bgNum) bgFrame++;
                        else bgFrame = 1;
                    },200);
                }
                bgImg.src = "/upload/modelView/MODEL_New_PRIUS/img_v0514/bg_hybrid_neon2.jpg";

                var carScrollTop = 0;
                $(window).scroll(function(){
                    carScrollTop = $(window).scrollTop();

                    var carAnimaTimer = 100;

                    if($("#prius").offset().top - $('#header').height() - $(".lnb_wrap").height() <= carScrollTop){
                        $("#prius .carWrap .car").stop(true, false).animate({"width":"100%"}, carAnimaTimer);
                        $("#prius .carWrap .light").stop(true, false).delay(carAnimaTimer + 100).fadeIn(0);
                    }else{
                        $("#prius .carWrap .light").stop(true, false).fadeOut(0);
                        $("#prius .carWrap .car").stop(true, false).delay(100).animate({"width":"85%"}, carAnimaTimer);
                    }
                });
            },
            designSection : function(){
                var pointData = ["",
                    ["/upload/modelView/MODEL_New_PRIUS/img_v0514/pop_design/point_1.jpg","Front Design"],
                    ["/upload/modelView/MODEL_New_PRIUS/img_v0514/pop_design/point_2.jpg","Aerodynamic Design"],
                    ["/upload/modelView/MODEL_New_PRIUS/img_v0514/pop_design/point_3.jpg","Rear design"],
                    ["/upload/modelView/MODEL_New_PRIUS/img_v0514/pop_design/point_4.jpg","Bi-Beam LED Headlamp"],
                    ["/upload/modelView/MODEL_New_PRIUS/img_v0514/pop_design/point_5.jpg","Wheel"],
                    ["/upload/modelView/MODEL_New_PRIUS/img_v0514/pop_design/point_6.jpg","LED Rear Combination lamp"]
                ]
                var pointPos = ["",
                    [500, 710],
                    [415, 160],
                    [110, 930],
                    [470, 530],
                    [225, 610],
                    [95, 770],
                ];

                var ringFrame = 0;
                ringInterval = setInterval(function(){
                    $("#section2 .visualWrap .focus1").css("transform", "rotate(" + ringFrame + "deg)");
                    $("#section2 .visualWrap .focus2").css("transform", "rotate(-" + ringFrame + "deg)");
                    ringFrame = ringFrame + 4;
                }, 10);

                $("#section2 .secWrap .pointselect a").hover(
                    function(){
                        var targ = $(this).attr("href");
                            targ = targ.split("#point_");

                        clearInterval(rollingInterval);
                        $("#section2 .secWrap .pointselect a").removeClass("current");

                        var posX = pointPos[targ[1]][0] * ($("#section2 .visualWrap .car").height() / 789);
                        var posY = pointPos[targ[1]][1] * ($("#section2 .visualWrap .car").width() / 1123);

                        if($("#section2 .visualWrap .focus").is(":visible") == false) $("#section2 .visualWrap .focus").stop(true,false).css({"top":posX, "left":posY}).fadeIn(200);
                        else{
                            $("#section2 .visualWrap .focus").stop(true,false).fadeOut(200, function(){
                                $(this).css({"top":posX, "left":posY}).fadeIn(200);
                            });
                        }
                    },
                    function(){
                        $("#section2 .visualWrap .focus").stop(true,false).fadeOut(500);
                        setRollingInterval();
                    }
                ).click(function(e){
                    var targ = $(this).attr("href");
                        targ = targ.split("#point_");

                    pointPop(targ[1]);
                    eventClick(e);
                });

                function pointPop(targ){
                    var img = new Image();
                    img.onload = function(){
                        $('.dim.content').append('<div class="pointVisual"><img src="' + pointData[targ][0] + '" alt="' + pointData[targ][1] + '"></div><p class="pointTitle">' + pointData[targ][1] + '</p>');

                        $(".dim.designPoint.closeBtn").off("click");
                        $(".dim.designPoint.closeBtn").on("click", function(e){
                            $('.dim').removeClass("open designPoint");
                            $('.dim.content').empty();
                            eventClick(e);
                        });
                    }
                    img.src = pointData[targ][0];

                    $('.dim.content').empty();
                    $('.dim').addClass('open designPoint');
                }

                var rollingIndex = 0;
                var rollingInterval = false;

                setRollingInterval();

                function setRollingInterval(){
                    rollingIndex = 0;
                    rollingInterval = setInterval(function(){
                        var targ = rollingIndex + 1;

                        var posX = pointPos[targ][0] * ($("#section2 .visualWrap .car").height() / 789);
                        var posY = pointPos[targ][1] * ($("#section2 .visualWrap .car").width() / 1123);

                        $("#section2 .secWrap .pointselect a").removeClass("current");
                        $("#section2 .secWrap .pointselect a:eq(" + rollingIndex + ")").addClass("current");

                        if($("#section2 .visualWrap .focus").is(":visible") == false) $("#section2 .visualWrap .focus").stop(true,false).css({"top":posX, "left":posY}).fadeIn(200);
                        else{
                            $("#section2 .visualWrap .focus").stop(true,false).fadeOut(200, function(){
                                $(this).css({"top":posX, "left":posY}).fadeIn(200);
                            });
                        }

                        if(rollingIndex < $("#section2 .secWrap .pointselect a").size() - 1) rollingIndex++;
                        else rollingIndex = 0;
                    }, 3000);
                }
            },
            tngaSection : function(init){
                var cityWidth = 6400 * -1;
                var cityFrame = cityWidth;
                var wheelFrame = 0;
                var addFrame = 8;

                cityWidth = 6400 * ($("#section3 .visualWrap").height() / 309) * -0.85;
                cityFrame = cityWidth;
                addFrame = Math.ceil(8 * ($(window).width() / 960));

                if(init == "resize") clearInterval(cityInterval);
                cityInterval = setInterval(function(){
                    $("#section3 .visualWrap").css("background-position", cityFrame + "px bottom");
                    $("#section3 .visualWrap .wheel").css("transform", "rotate(-" + wheelFrame + "deg)");

                    if(cityFrame >= 0) cityFrame = cityWidth;
                    else cityFrame = cityFrame + addFrame;

                    wheelFrame = wheelFrame + 8;
                }, 12);
            },
            gallerySection : function(){
                gallerySwiper = new Swiper('.swiper-container', {
                    speed: 400,
                    width: 440,
                    slidesOffsetBefore: ($(window).width() / 2) - (440 / 2),
                    spaceBetween: 20,
                    centeredSlides: true,
                    loopAdditionalSlides: 2,
                    scrollbar: {
                        el: ".swiper-scrollbar",
                        hide: false,
                        draggable: true
                    },
                    on: {
                        init: function(){
                            $(".swiper-container .swiper-slide-active a").append('<div class="zoom"></div>');
                        },
                        transitionStart: function(){
                            $(".swiper-container .swiper-slide a .zoom").remove();
                            $(".swiper-container .swiper-slide-active a").append('<div class="zoom"></div>');
                        }
                    }
                });
                subpage.galleryUpdate();

                var galleryNum = 0;
                $("#gallery .swiper-slide a").on("click", function(e){
                    var targ = $(this).attr("href");
                        targ = targ.split("#gallery_");

                        galleryNum = targ[1];

                    if($(this).parent().hasClass("swiper-slide-active")){
                        galleryPop("/upload/modelView/MODEL_New_PRIUS/img_v0514/pop_gallery/gallery_" + galleryNum + ".jpg");
                    }
                    eventClick(e);
                });

                function galleryPop(targ){
                    $('.dim.content').empty().append('<div style="background-image:url(\'' + targ + '\');"></div>');
                    $('.dim').addClass('open galleryView');

                    $(".dim.galleryView.closeBtn").off("click");
                    $(".dim.galleryView.closeBtn").on("click", function(e){
                        $('.dim').removeClass("open galleryView");
                        $('.dim.content').empty();
                        eventClick(e);
                    });

                    $(".dim.galleryView.arrow").off("click");
                    $(".dim.galleryView.arrow").on("click", function(e){
                        var galleryIdx = galleryNum - 1;

                        if($(this).hasClass("leftBtn")){
                            if(galleryIdx > 0) galleryIdx--;
                            else galleryIdx = $("#gallery .swiper-slide a").size() - 1;
                        }else{
                            if(galleryIdx < $("#gallery .swiper-slide a").size() - 1) galleryIdx++;
                            else galleryIdx = 0;
                        }

                        gallerySwiper.slideTo(galleryIdx);
                        $("#gallery .swiper-slide:eq(" + galleryIdx + ") a").click();
                        eventClick(e);
                    });
                }
            },
            galleryUpdate : function(){
                gallerySwiper.params.slidesOffsetBefore = ($(window).width() / 2) - (120 / 2);
                gallerySwiper.params.width = 120;

                gallerySwiper.update();
            },
            selectColorsSet : function(){
                var _this = $('#carWrapinColors');
                var colorName = ['Blue ME','Emotional Red 2','White Pearl CS','Silver ME','Gray ME','Attitude Black MC','Frosty Green MC'];
                _this.find('.colors').eq(0).animate({'opacity':1},2000).addClass('current');
                _this.find('.colors .tx').eq(0).animate({'opacity':1},2000);
                _this.find('.colors_bg').eq(0).animate({'opacity':1},2000).addClass('current');
                _this.find('.colors_bg .lb').eq(0).animate({'bottom':0,'left':0},2000);
                _this.find('.colors_bg .rt').eq(0).animate({'top':0,'right':0},2000);
                _this.find('.colorselect').find('a').eq(0).addClass('current');
                _this.find('.selectedcolor').html(colorName[0]);

                _this.find('.colorselect').find('a')
                .each(function(index){
                    var _thisA = $(this);
                    _thisA.on('click', function(e){
                        _this.find('.selectedcolor').text(colorName[index]);
                        _this.find('.colors').removeClass('current').stop(true, false).animate({'opacity':0},1000).eq(index).stop(true, false).animate({'opacity':1},500).addClass('current');
                        _this.find('.colors .tx').stop(true, false).animate({'opacity':0},2000).eq(index).stop(true, false).animate({'opacity':1},500);
                        _this.find('.colors_bg').removeClass('current').stop(true, false).animate({'opacity':0},2000).eq(index).stop(true, false).delay(250).animate({'opacity':1},500).addClass('current');
                        _this.find('.colors_bg .lb').stop(true, false).css({'bottom':'-175%','left':'-100%'}).eq(index).stop(true, false).delay(300).animate({'bottom':0,'left':0,'opacity':1},500);
                        _this.find('.colors_bg .rt').stop(true, false).css({'top':'-175%','right':'-100%'}).eq(index).stop(true, false).delay(450).animate({'top':0,'right':0,'opacity':1},500);
                        _this.find('.colorselect').find('a').removeClass('current').eq(index).addClass('current');
                        eventClick(e);
                    });
                });
            },
            specHybridSection : function(){
                var _this = $('#smartHybrid');
                _this.find('.tabmenu').find('a').each(function(index){
                    var _thisBtn = $(this);
                    _thisBtn.on('click',function(e){
                        _thisBtn.siblings().removeClass('current');
                        _thisBtn.addClass('current');
                        _this.find('.hybrid').removeClass('current').eq(index).addClass('current');
                        eventClick(e);
                    });
                });
            }
        }

        //subpage
        $(window).on('scroll', function(ev){
            var scrollVal = $(window).scrollTop();
            sections.forEach(function(elm, i){
                var $elm = $(elm);
                var $next = i + 1;
                if(scrollVal+140 >= $elm.offset().top){
                    $('.lnb_title').find('li').removeClass('current').eq(i).addClass('current');
                }
            })
        });

        $('.lnb_title').find('a').on('click', function(){
            $('.lnb_title').removeClass('lnb_open');
        })


        subpage.setting()
        // //서브페이지일 경우 init

		function eventClick(event) {
            if (event.preventDefault) {
                event.preventDefault(); //FF
            } else {
                event.returnValue = false; //IE
            }
		}
        //* href에 # 들어간 click 함수 사용시 꼭 넣을 것 (크로스 브라우징을 위해 return false 대신 사용해야함)

        function makeRandom(min, max, rnum){
            var RandVal = Math.random() * (max- min) + min;
            if(RandVal == rnum)makeRandom(min,max,RandVal);
            return Math.floor(RandVal);
        }
        // 랜덤 함수(정수)

		$(window).resize(function(){
			//리사이징 상황의 행동 입력
            resizeSlideWrap($('.slide_wrap'));
		});
        //* 브라우저 리사이즈 함수

        //--------------------V슬라이드 추가
        var slideData = [
            {"exterior" : [
                {"tabmenu" : [
                    {
                        "title" : "",
                        "subcategory" :
                            [{
                            "title" : "<span class=\"eng\">Bi-Beam LED</span> 헤드램프",
                            "subtitle" : "<span class=\"eng\">Bi-Beam LED</span> 헤드램프",
                            "descript" : "<span class=\"pc\">상향등 및 하향등에 모두 LED를 적용하여 시인성을 향상시켰고, <br/>보다 샤프하고 간결해진 디자인을 적용하였습니다.</span>"
                                        + "<span class=\"mobile\">상향등 및 하향등에 모두 LED를 적용하여 시인성을 향상시켰고, <br/>보다 샤프하고 간결해진 디자인을 적용하였습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exteriorThumb_01.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exterior_01.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/m_exterior_01.jpg"
                            },
                            {
                            "title" : "<span class=\"eng\">LED</span> 리어 콤비네이션 램프",
                            "subtitle" : "<span class=\"eng\">LED</span> 리어 콤비네이션 램프",
                            "descript" : "<span class=\"pc\">모던한 가로 형태의 램프 디자인을 적용, <br/>후면부의 세련미를 한층 업그레이드했습니다.</span>"
                                        + "<span class=\"mobile\">모던한 가로 형태의 램프 디자인을 적용, 후면부의 세련미를 한층 <br/>업그레이드했습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exteriorThumb_02.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exterior_02.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/m_exterior_02.jpg"
                            },
                            {
                            "title" : "전면 디자인",
                            "subtitle" : "날렵하고 역동적인<br/>전면 디자인",
                            "descript" : "<span class=\"pc\">볼륨감이 강화된 프론트 범퍼, 입체적인 실루엣은 <br/>깔끔하고 세련된 인상을 만들어냅니다.</span>"
                                        + "<span class=\"mobile\">볼륨감이 강화된 프론트 범퍼, 입체적인 실루엣은 깔끔하고 세련된 <br/>인상을 만들어냅니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exteriorThumb_03.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exterior_03.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/m_exterior_03.jpg"
                            },
                            {
                            "title" : "측면 디자인",
                            "subtitle" : "공기역학적 측면 디자인",
                            "descript" : "<span class=\"pc\">루프 피크를 앞으로 이동하여 날렵하고 부드러운 실루엣을 구현한 <br/>프리우스 고유의 공기역학적 디자인을 유지하였고, <br/>프론트에서부터 측면까지 이어지는 입체적인 실루엣이 돋보입니다.</span>"
                                        + "<span class=\"mobile\">루프 피크를 앞으로 이동하여 날렵하고 부드러운 실루엣을 구현한 <br/>프리우스 고유의 공기역학적 디자인을 유지하였고, <br/>프론트에서부터 측면까지 이어지는 입체적인 실루엣이 돋보입니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exteriorThumb_04.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exterior_04.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/m_exterior_04.jpg"
                            },
                            {
                            "title" : "후면 디자인",
                            "subtitle" : "안정감 있는 후면 디자인",
                            "descript" : "<span class=\"pc\">가로형의 콤비네이션 램프와 사다리꼴의 디자인, <br/>저중심 차체의 조화로 더욱 볼륨감 있고 안정감 있는 <br/>후면 디자인이 완성되었습니다.</span>"
                                        + "<span class=\"mobile\">가로형의 콤비네이션 램프와 사다리꼴의 디자인, 저중심 차체의 <br/>조화로 더욱 볼륨감 있고 안정감 있는 후면 디자인이 <br/>완성되었습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exteriorThumb_05.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/exterior_05.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/exterior/m_exterior_05.jpg"
                            }]
                    }
                ],"cut":0}
            ]},
            {"interior" : [
                {"tabmenu" : [
                    {
                        "title" : "<span class=\"eng\">Display</span>",
                        "subcategory" :
                            [{
                            "title" : "4.2인치 컬러 <span class=\"eng\">TFT</span> 트윈 미터",
                            "subtitle" : "4.2인치 컬러 <span class=\"eng\">TFT</span> 트윈 미터",
                            "descript" : "<span class=\"pc\">미래지향적 디자인과 높아진 해상도로 편의성과 시인성이 개선되었습니다.<br/> 좌측에서는 속도나 외기 온도 등 기본 정보를, <br/>우측에서는 하이브리드 시스템 인디케이터와 에코 스코어 등 <br/>주행 정보를 쉽게 확인할 수 있습니다.</span>"
                                        + "<span class=\"mobile\">미래지향적 디자인과 높아진 해상도로 편의성과 시인성이 <br/>개선되었습니다. <br/>좌측에서는 속도나 외기 온도 등 기본 정보를, 우측에서는 하이브리드 시스템 인디케이터와 에코 스코어 등 주행 정보를 쉽게 <br/>확인할 수 있습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_thumb_01.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_01.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/m_interior_01.jpg"
                            },
                            {
                            "title" : "멀티미디어 시스템",
                            "subtitle" : "멀티미디어 시스템",
                            "descript" : "<span class=\"pc\">새로워진 멀티미디어 시스템 적용으로 외부 기기와의 호환성이 향상되어 <br/>디지털 라디오, USB, 블루투스와 같은 다양한 음원 소스를 쉽게 즐길 수 있습니다.</span>"
                                        + "<span class=\"mobile\">새로워진 멀티미디어 시스템 적용으로 외부 기기와의 호환성이 <br/>향상되어 디지털 라디오, USB, 블루투스와 같은 다양한 음원 <br/>소스를 쉽게 즐길 수 있습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_thumb_02.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_02.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/m_interior_02.jpg"
                            }]
                    },
                    {
                        "title" : "<span class=\"eng\">Convenient</span>",
                        "subcategory" :
                            [{
                            "title" : "<span class=\"eng\">USB</span> 포트",
                            "subtitle" : "<span class=\"eng\">USB</span> 포트",
                            "descript" : "<span class=\"pc\">센터 콘솔 뒤쪽에 2중 USB 단자가 있어 <br/>2열에서도 다양한 장치를 빠르게 충전할 수 있습니다.</span>"
                                        + "<span class=\"mobile\">센터 콘솔 뒤쪽에 2중 USB 단자가 있어 2열에서도 다양한 장치를 <br/>빠르게 충전할 수 있습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_thumb_11.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_11.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/m_interior_11.jpg"
                            },
                            {
                            "title" : "운전석, 조수석 시트백 인포켓",
                            "subtitle" : "운전석, 조수석 시트백 인포켓",
                            "descript" : "<span class=\"pc\">운전석 및 조수석에 시트백 포켓이 적용되었습니다. <br/>운전석에는 지퍼형 시트백 인포켓이 새로이 적용되어 <br/>물건 보관 및 수납이 더욱 편리해졌습니다. <br/>* 사진은 조수석 시트백 인포켓입니다.</span>"
                                        + "<span class=\"mobile\">운전석 및 조수석에 시트백 포켓이 적용되었습니다. <br/>운전석에는 지퍼형 시트백 인포켓이 새로이 적용되어 물건 보관 및 수납이 더욱 편리해졌습니다. <br/>* 사진은 조수석 시트백 인포켓입니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_thumb_12.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_12.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/m_interior_12.jpg"
                            }]
                    },
                    {
                        "title" : "<span class=\"eng\">Space</span>",
                        "subcategory" :
                            [{
                            "title" : "넓은 트렁크",
                            "subtitle" : "넓은 트렁크",
                            "descript" : "<span class=\"pc\">스마트 패키징을 통해 트렁크 공간이 넓어져 <br/>큰 짐을 싣는 데에 용이합니다.</span>"
                                        + "<span class=\"mobile\">스마트 패키징을 통해 트렁크 공간이 넓어져 큰 짐을 싣는 데에 <br/>용이합니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_thumb_21.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_21.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/m_interior_21.jpg"
                            },
                            {
                            "title" : "폴딩 시트",
                            "subtitle" : "폴딩 시트",
                            "descript" : "<span class=\"pc\">리어 폴딩 시트가 적용되어 물건이나 짐을 <br/>실내에서 트렁크로 쉽게 이동할 수 있습니다.</span>"
                                        + "<span class=\"mobile\">리어 폴딩 시트가 적용되어 물건이나 짐을 실내에서 트렁크로 쉽게 이동할 수 있습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_thumb_22.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/interior_22.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/interior/m_interior_22.jpg"
                            }]
                    }
                ],"cut":0}
            ]},
            {"features" : [
                {"tabmenu" : [
                    {
                        "title" : "",
                        "subcategory" :
                            [{
                            "title" : "하이브리드 시스템<br/>(1.8ℓ 가솔린 엔진과 전기 모터)",
                            "subtitle" : "하이브리드 시스템<br/><span class=\"small\">(1.8ℓ 가솔린 엔진과 전기 모터)</span>",
                            "descript" : "<span class=\"pc\">가장 진보적이고 혁신적인 토요타 하이브리드 시스템이 <br/>프리우스에 적용되었습니다. <br/><br/>가솔린 엔진의 효율을 극대화하여 최대 열효율 40%를 달성하였고, <br/>시스템을 소형화, 경량화하여 효율적인 공간 활용이 가능하게 되었습니다. <br/><br/>그리고 워밍업을 촉진하여 공기저항을 최소화하는 그릴 셔터를 장착하였고, <br/>낭비될 수 있는 열을 냉각수로 회수하여 히터나 엔진의 워밍업에 이용하는 <br/>배기열 회수기를 업그레이드하였습니다.</span>"
                                        + "<span class=\"mobile\">가장 진보적이고 혁신적인 토요타 하이브리드 시스템이 프리우스에 적용되었습니다. <br/>가솔린 엔진의 효율을 극대화하여 최대 열효율 40%를 달성하였고, <br/>시스템을 소형화, 경량화하여 효율적인 공간 활용이 가능하게 <br/>되었습니다. <br/>그리고 워밍업을 촉진하여 공기저항을 최소화하는 그릴 셔터를 <br/>장착하였고, 낭비될 수 있는 열을 냉각수로 회수하여 히터나 엔진의 워밍업에 이용하는 배기열 회수기를 업그레이드하였습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_thumb_01.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_01.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/m_features_01.jpg"
                            },
                            {
                            "title" : "4가지 드라이브 모드",
                            "subtitle" : "4가지 드라이브 모드",
                            "descript" : "<span class=\"pc\">버튼을 누르면 친환경 주행을 위한 ECO 모드, <br/>차량 상태에 최적화되어 있는 NORMAL 모드, <br/>그리고 스포츠 주행이 가능한 SPORT 모드로 <br/>드라이빙의 성격이 전환됩니다. <br/><br/>EV MODE 버튼을 누르면 전기로만 운행이 가능해지며, <br/>가솔린 엔진으로 인한 어떠한 소음과 진동이 전혀 없는 <br/>편안한 주행을 즐길 수 있습니다.</span>"
                                        + "<span class=\"mobile\">버튼을 누르면 친환경 주행을 위한 ECO 모드, 차량 상태에 <br/>최적화되어 있는 NORMAL 모드, 그리고 스포츠 주행이 가능한 <br/>SPORT 모드로 드라이빙의 성격이 전환됩니다. <br/>EV MODE 버튼을 누르면 전기로만 운행이 가능해지며, <br/>가솔린 엔진으로 인한 어떠한 소음과 진동이 전혀 없는 <br/>편안한 주행을 즐길 수 있습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_thumb_02.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_02.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/m_features_02.jpg"
                            },
                            {
                            "title" : "액티브 코너링 어시스트<br/><span class=\"eng\">(ACA)</span>",
                            "subtitle" : "액티브 코너링 어시스트<br/><span class=\"eng small\">(ACA)</span>",
                            "descript" : "<span class=\"pc\">액티브 코너링 어시스트(ACA)를 적용, <br/>선회 성능을 향상시켰습니다.</span>"
                                        + "<span class=\"mobile\">액티브 코너링 어시스트(ACA)를 적용, 선회 성능을 향상시켰습니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_thumb_03.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_03.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/m_features_03.jpg"
                            },
                            {
                            "title" : "향상된 차체 강성",
                            "subtitle" : "향상된 차체 강성",
                            "descript" : "<span class=\"pc\">레이저를 쏘아서 차체 패널 등을 용접하는 <br/>최첨단 레이저 스크류 용접(LSW) 공법을 활용하여 탄생된 <br/>단단한 차체는 견고하고 안정적인 주행을 가능하게 합니다.</span>"
                                        + "<span class=\"mobile\">레이저를 쏘아서 차체 패널 등을 용접하는 최첨단 레이저 <br/>스크류 용접(LSW) 공법을 활용하여 탄생된 단단한 차체는 견고하고 안정적인 주행을 가능하게 합니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_thumb_04.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_04.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/m_features_04.jpg"
                            },
                            {
                            "title" : "서스펜션",
                            "subtitle" : "서스펜션",
                            "descript" : "<span class=\"pc\">전륜 서스펜션에는 맥퍼슨 스트럿을, 후륜 서스펜션에는 <br/>어떠한 주행조건에도 타이어의 접지 면적을 최대한으로 <br/>확보하는 더블 위시본을 적용하여 코너링 시 부드러우면서도 <br/>민첩한 핸들링이 가능함은 물론 거친 노면에서도 <br/>안정적이면서도 편안한 승차감을 제공합니다.</span>"
                                        + "<span class=\"mobile\">전륜 서스펜션에는 맥퍼슨 스트럿을, 후륜 서스펜션에는 어떠한 <br/>주행조건에도 타이어의 접지 면적을 최대한으로 확보하는 <br/>더블 위시본을 적용하여 코너링 시 부드러우면서도 민첩한 핸들링이 가능함은 물론 거친 노면에서도 안정적이면서도 편안한 승차감을 제공합니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_thumb_05.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_05.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/m_features_05.jpg"
                            },
                            {
                            "title" : "8 <span class=\"eng\">SRS</span> 에어백",
                            "subtitle" : "8 <span class=\"eng\">SRS</span> 에어백",
                            "descript" : "<span class=\"pc\">앞좌석 전면, 옆좌석 측면, 커튼 실드, 운전석 무릎, <br/>조수석 시트 쿠션 에어백 등 총 8개의 에어백이 <br/>운전자와 탑승자를 보호합니다.</span>"
                                        + "<span class=\"mobile\">앞좌석 전면, 옆좌석 측면, 커튼 실드, 운전석 무릎, 조수석 시트 <br/>쿠션 에어백 등 총 8개의 에어백이 운전자와 탑승자를 보호합니다.</span>",
                            "thumbnail" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_thumb_06.png",
                            "orgImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/features_06.jpg",
                            "mImage" : "/upload/modelView/MODEL_New_PRIUS/img_v0514/slideImg/features/m_features_06.jpg"
                            }]
                    }
                ],"cut":0}
            ]}
        ];

        function Mkslider(data) {
            var _data = data;
            $('<div class="slide_wrap"></div>').appendTo($('#exterior')).viSliderPrius({
                stru: _data[0].exterior[0].tabmenu,
                subtitle: true,
                arrow: false,
                tabmenu: false,
                rszImgRepl: true,
                cut: _data[0].exterior[0].cut == undefined ? 70 : _data[0].exterior[0].cut,
            });
            $('<div class="slide_wrap"></div>').appendTo($('#interior')).viSliderPrius({
                stru: _data[1].interior[0].tabmenu,
                subtitle: true,
                arrow: false,
                tabmenu: true,
                rszImgRepl: true,
                cut: _data[1].interior[0].cut == undefined ? 70 : _data[1].interior[0].cut,
            });
            $('<div class="slide_wrap"></div>').appendTo($('#features')).viSliderPrius({
                stru: _data[2].features[0].tabmenu,
                subtitle: true,
                arrow: false,
                tabmenu: false,
                rszImgRepl: true,
                cut: _data[2].features[0].cut == undefined ? 70 : _data[2].features[0].cut,
            });
        }

        Mkslider(slideData);
    });
})(window.jQuery);

/*!
 * Analysis Data
 */
var analysisData = [
	{
		"T":[ ["pop_tx_analysis_q1.png","01. 어디로 여행 가고 싶어?"], {
			"TA":["tx2","<span>여유로운 </span>휴양지,<br/><span>발걸음마다 색다른 </span>소도시"],
			"TB":["tx2","<span>역사가 살아 숨쉬는 </sapn>명소,<br/><span>세상 힙한 </span>핫플레이스"]
		}],

		"TA":[ ["pop_tx_analysis_q2-1.png","02. 복잡한 세상 _______ 살자!"], {
			"TAA":["tx1","편하게"],
			"TAB":["tx1","내 멋대로"]
		}],
		"TAA":[ ["pop_tx_analysis_q3-1.png","03. 새벽 1시 혼자 먹는 라면 콜?"], {
			"SAA":["tx1","응 아니야"],
			"SAB":["tx1","콜! JMT"]
		}],
		"TAB":[ ["pop_tx_analysis_q3-2.png","03. 주말에 이불 밖은 위험해…"], {
			"SAB":["tx1","ㅇㅈㅇㅈ"],
			"SAC":["tx1","노놉!"]
		}],

		"TB":[ ["pop_tx_analysis_q2-2.png","02. 최애 브랜드에서 리미티드 에디션을 출시한다면?"], {
			"TBA":["tx2","줄 서서 구매할 만큼<br/>가치 있을까…?"],
			"TBB":["tx2","어머!<br/>이건 꼭 사야해!"]
		}],
		"TBA":[ ["pop_tx_analysis_q3-3.png","03. 커피 한 잔의 여유~ 오늘의 커피는?"], {
			"SBA":["tx2","직접 로스팅한<br/>드립 커피"],
			"SBB":["tx2","별★ 다방<br/>커피"]
		}],
		"TBB":[ ["pop_tx_analysis_q3-4.png","03. 오늘 저녁 어디서 뭐 먹을까?"], {
			"SBB":["tx1","늘 가던 단골 식당♥"],
			"SBC":["tx1","신상 맛 집 도장깨기!"]
		}],

		"SAA":["6","슬로비족","#느리지만_더_훌륭하게 #여유로운삶"],
        "SAB":["4","코쿤족","#혼자서도_잘해요 #안락한_나만의공간"],
        "SAC":["1","마이 페이스","#마이웨이_마이스타일 #내가제일잘나가"],

		"SBA":["5","밸류 쇼퍼","#트렌드보다_가치 #결과보다_경험"],
		"SBB":["3","브랜드 러버","#브랜드=나 #최애브랜드_VVVIP"],
		"SBC":["2","수퍼 얼리버드","#11111111 #누구보다빠르게_찜"]
	}
]

var loadingBarInterval = false;
var loadingTxInterval = false;
function analysisBar(){
    resetInterval();

    var loadingBarFrame = 0;
    loadingBarInterval = setInterval(function(){
        $(".pop_event_analysis .body .analysis_bar").css("background-position", loadingBarFrame + "px 0");
        loadingBarFrame = loadingBarFrame + 8;
    }, 10);

    var loadingTxFrame = 0;
    loadingTxInterval = setInterval(function(){
        var loadingTx = "";

        for(var i=0; i<=loadingTxFrame%4; i++){
            if(i > 0) loadingTx = loadingTx + ".";
        }

        $(".pop_event_analysis .body .analysis_bar p .dot").text(loadingTx);

        loadingTxFrame++;
    }, 300);
}

function analysisSet(step){
    var answer = [".lt", ".rt"];

    if(step == "" || step == undefined) step = "T";

    $(".pop_event_analysis .answer p").removeClass().empty();
    $.each(analysisData[0], function(i){
        var _this = this[1];
        var key = [];

        if(i == step){
            $.each(_this, function(j){
                key.push(j);
            });

            $(".pop_event_analysis .analysis_ti").empty().append('<img src="/upload/modelView/MODEL_New_PRIUS/img_v0514/event/' + this[0][0] + '" alt="' + this[0][1] + '">');

            $.each(key, function(j){
                var obj = _this[ key[j] ];

                $(".pop_event_analysis .answer" + answer[j]).attr("data-next-step",key[j]);
                $(".pop_event_analysis .answer" + answer[j] + " p").addClass(obj[0]).append(obj[1]);
            });
        }
    });
}

var circleInterval = false;
var figureInterval = false;
var dotInterval = false;
function analysisLoading(analysisResult){
    var loadingSize = $(".pop_event_loading").width();
    resetInterval();

    var circleFrame = 0;
    circleInterval = setInterval(function(){
        $(".pop_event_loading .circle").css("transform", "rotate(" + circleFrame + "deg)");
        $(".pop_event_loading .circle").css("transform", "rotate(-" + circleFrame + "deg)");
        circleFrame = circleFrame + 8;
    }, 10);

    var figureImg = new Image();
    var figureNum = 5;
    var figureFrame = 1;
    figureImg.onload = function(){
        figureInterval = setInterval(function(){
            $(".pop_event_loading .figure img").css("margin-left", figureFrame * loadingSize * -1);
            if(figureFrame < figureNum) figureFrame++;
            else figureFrame = 1;
        }, 150);
    }
    figureImg.src = "/upload/modelView/MODEL_New_PRIUS/img_v0514/event/pop_img_loading.png";

    var dotFrame = 0;
    var isResult = false;
    dotInterval = setInterval(function(){
        if(dotFrame >= 8 && isResult == true){
            // success
            clearInterval(figureInterval);
            clearInterval(dotInterval);

            $(".pop_event_loading .figure").attr("data-analysis", analysisResult[0]).css("opacity", 0);
            $(".pop_event_loading .figure img").css("margin-left", (analysisResult[0] - 1) * loadingSize * -1);

            $(".pop_event_loading .status").css("opacity", 0);
            $(".pop_event_loading .status").empty().text("분석 완료");

            $(".pop_event_loading .figure").animate({"opacity":1}, 500);
            $(".pop_event_loading .status").animate({"opacity":1}, 500);

            setTimeout(function(){
                resetInterval();

                $(".pop_event_loading").fadeOut(500, function(){
                    $(".pop_event_loading .status").empty().append('분석 중<span class="dot"></span>');
                });

                $(".pop_event_share .btn_share").attr("data-analysis",analysisResult[0]);

                $(".pop_event_result .result").empty().append('<img src="/upload/modelView/MODEL_New_PRIUS/img_v0514/event/pop_img_result_' + analysisResult[0] + '.png" alt="당신은 ' + analysisResult[1] + '! - ' + analysisResult[2] + '">');
                $(".pop_event_frm #taste_result").val(analysisResult[1]);
                $(".pop_event_result").fadeIn(500);
            }, 1500);
        }else{
            var dot = "";

            for(var i=0; i<=dotFrame%4; i++){
                if(i > 0) dot = dot + ".";
            }

            $(".pop_event_loading .status .dot").text(dot);

            if(dotFrame == 0){
                var resultImg = new Image();
                resultImg.onload = function(){
                    isResult = true;
                }
                resultImg.src = "/upload/modelView/MODEL_New_PRIUS/img_v0514/event/pop_img_result_" + analysisResult[0] + ".png";
            }

            dotFrame++;
        }
    }, 300);
}

function resetInterval(){
    clearInterval(loadingBarInterval);
    clearInterval(loadingTxInterval);
    clearInterval(circleInterval);
    clearInterval(figureInterval);
    clearInterval(dotInterval);
}

function popEventClose(){
    resetInterval();

    fb = 0;
    bg = 0;
    ks = 0;

    $(".pop_event").fadeOut(500);
    $(".pop_event_mask").fadeOut(500, function(){
        $(".pop_event_result .result").empty();
        $(".pop_event_frm #taste_result").val("");
        $(".pop_event_frm .terms").hide();

        $(".pop_event .popup").hide();
    });
}

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011-2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

/*!
 * jquery browser
 */
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);



