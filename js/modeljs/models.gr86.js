
$(document).ready(function(){
    var scrTop;

    // inview
    $(window).scroll(function() {
        scrTop = $(this).scrollTop();

        $('.motion').on('inview', function(event, isInView) {
            if (isInView) {
                $(this).addClass('active');
            }
        });
    });
    heritageMovie();

    vr = vr($('.colors-area .vr'));
    vr.changeModel(0);

    var btnColor = $('.colors-btn-list').find('button');
    btnColor.each(function(i) {
        $(this).on('click', function() {
            var idx = btnColor.index(this);
            vr.changeModel(idx);
            $(this).parent().addClass('on').siblings().removeClass('on');
        })
    });

    sliders('performance-swiper', 'performance');
    sliders('exterior-swiper', 'exterior');
    sliders('interior-swiper', 'interior');
    sliders('features-swiper', 'features');

    var safetySwiper = new Swiper('.safety-swiper', {
        speed: 1000,
        resistance: true,
        resistanceRatio: 0,
        slidesPerView: 3,
        scrollbar: {
            el: '.safety-swiper .swiper-scrollbar',
            hide: false,
            draggable: true
        },
        breakpoints: {
            750: {
                slidesPerView: 'auto',
                spaceBetween: 12,
                slidesOffsetBefore: 20,
                slidesOffsetAfter: 20,
            }
        }
    });

    $('.safety-wrap').find('.swiper-scrollbar-drag').wrapInner('<div class="ico-scrollbar" />');

    productContView();

    $(window).resize(function() {
        var winW = $(window).width();
        var mobW = 750;

        if(winW <= mobW) {
            safetySwiper.update();
        }
    });

    var filmsSwiper = new Swiper('.films-list-wrap', {
        speed: 1000,
        resistance: true,
        resistanceRatio: 0,
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        navigation: {
            nextEl: '.films-list-wrap .btn-next',
            prevEl: '.films-list-wrap .btn-prev',
        },
        breakpoints: {
            750: {
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                spaceBetween: 0,
            }
        }
    });

    var btnColorsInterior = $('.btn-colors-interior');
    var btnColorsInteriorCls = $('.layer-interior-wrap').find('.btn-close');
    var nowScrll;
    btnColorsInterior.on('click', function() {
        $('html, body').css({overflow: 'hidden'});
        $('.layer-interior-wrap').addClass('active');
        $('.colors-wrap').addClass('l-open');
        nowScrll = scrTop;
    });

    btnColorsInteriorCls.on('click', function() {
        $('html, body').removeAttr('style');
        $('.layer-interior-wrap').removeClass('active');
        $('.colors-wrap').removeClass('l-open');
        setTimeout(function() {
            $(document).scrollTop(nowScrll);
        }, 10);
    });
});

function heritageMovie() {
    var btnVideo = $('.heritage-area').find('.btn-play');
    var videoPlay;

    btnVideo.on('click', function() {
        var video = $(this).siblings('.heritage-movie');
        
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            video.get(0).pause();
            $(this).children('span').text('START');
            clearInterval(videoPlay);
        } else {
            $(this).addClass('active');
            video.get(0).play();
            $(this).children('span').text('STOP');
            videoPlay = setInterval(function() {
                if(video.prop('ended')) {
                    btnVideo.removeClass('active').children('span').text('START');
                    clearInterval(videoPlay);
                }
            }, 200);
        }

        if($('.heritage-movie').get(0).ended == true) {
            video.get(0).play();
        }
    });
}

function sliders(slideClass, menu) {
    if(menu == 'performance') {
        menu = ['6단 수동 변속기', '초저중심 설계', '231ps/25.5kg.m', '트랙모드', '자동차와 일체가 되는 운전석'];
    } else if (menu == 'exterior') {
        menu = ['에어로다이내믹 설계', 'G mesh 그릴', 'Bi-LED 헤드램프', '리어 컴비네이션 램프', '18인치 알로이 알루미늄 휠'];
    } else if (menu == 'interior') {
        menu = ['스포츠 시트', '7인치 멀티 인포메이션 디스플레이', '센터콘솔 암레스트', '전동식 파워 스티어링 휠', '8인치 센터 디스플레이']
    } else if (menu == 'features') {
        menu = ['HVAC 시스템', '8개의 스피커', '애플 카플레이 & 안드로이드 오토']
    }

    new Swiper('.'+slideClass, {
        speed: 500,
        resistance: true,
        resistanceRatio: 0,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: "bullets",
            clickable : true,
            bulletClass: 'btn-prod-name',
            bulletActiveClass: 'active',
            renderBullet : function (index, className) {
                return '<a href="#" class="' + className + '">' + menu[index] + '</a>'
              }
        }
    });
}

// 내용보기
function productContView() {
    var btnView = $('.btn-view');

    btnView.on('click', function(e) {
        var _this = $(this);
        
        _this.parent().hasClass('active') ? _this.parent().removeClass('active') : _this.parent().addClass('active');
    });
}

function lpad(num,unit) {
    var result = num+"", len = unit - result.length;
    if (len < 1) return result;
    while (len--) {
    result = "0"+result;
    }
    return result;
}

var vr = function (el) {
    var step = 0;
    var downX = 0;
    var len = 72;
    var d, u, m;
    var sensitivity = 10;
    var model = 'BRIGHT_BLUE';
    var img;
    var freeze;
    var models = ['BRIGHT_BLUE', 'CRYSTAL_BLACK_SILICA', 'CRYSTAL_WHITE_PEARL', 'ICE_SILVER_METALIC', 'IGNITION_RED', 'MAGNETITE_GRAY_METALLIC', 'SAPPHIRE_BLUE_PEARL'];
    var cache = [];
    var intervalId = -1;

    if ('ontouchstart' in window) {
        d = 'touchstart';
        u = 'touchend';
        m = 'touchmove';
    } else {
        d = 'mousedown';
        u = 'mouseup';
        m = 'mousemove';
    }
    function onMove(e) {
        var mx = e.screenX || e.originalEvent.changedTouches[0].screenX;
        var delta = mx - downX;
        var next;
        if (freeze) e.stopImmediatePropagation();
        if (Math.abs(delta) > sensitivity) {
            freeze = true;
            if (delta > 0) next = step - 1;
            else next = step + 1;
        } else {
            return;
        }
        downX = mx;
        if (next == -1) {
            step = len - 1;
        } else if (next == len) {
            step = 0;
        } else {
            step = next;
        }
        render();
    }

    function moveTop(cb) {
        clearInterval(intervalId);
        if (step == 0) {
            cb();
            return;
        }
        var dir = step < 32 ? -1 : 1;
        intervalId = setInterval(function () {
            step += dir;
            if (step == 72) step = 0;
            render();
            if (step == 0) {
                step = 0;
                clearInterval(intervalId);
                cb();
            }
        }, 40);
    }

    function render() {
        img.src = '/resources/web/common/image/MODEL_GR86/09_colors/vr/' + model + '/' + model+lpad(step, 2) + '.png';
    }

    el.on(d, function (e) {
        freeze = false;
        downX = e.screenX || e.originalEvent.changedTouches[0].screenX;
        $(this).on(m, onMove);
    });
    el.on(u, function (e) {
        $(this).off(m, onMove);
    });
    img = el.find('img')[0];

    function preload(size, cb) {
        size = size || len;
        for (var i = 0; i < size; ++i) {
            if (!cache[i]) cache[i] = new Image();
            cache[i].src = '/resources/web/common/image/MODEL_GR86/09_colors/vr/' + model + '/' + model+lpad(step, 2) + '.png';
        }
        if (!cb) return;
        var x = setInterval(function () {
            for (var i = 0; i < size; ++i) {
                if (!cache[i].complete) return;
            }
            clearInterval(x);
            cb();
        }, 100);
    }

    return {
        changeModel: function (index) {
            model = models[index];
            preload();
            render();
        },
    }
};