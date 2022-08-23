
$(document).ready(function(){
    setTimeout(function() {
        heritageDetailView();
        dragMaskFunc($('.drag-wrap'));
        highlightGtView();
        //grVideoWrap();
		 grVideoPlay();
        grVideoStop();
        mobCarHidden();
        mobMotiobClassChange();
    }, 500);

    setTimeout(heritageCarSize, 500);

    $(window).resize(function() {
        heritageDetailView();
        dragMaskFunc($('.drag-wrap'));
        //grVideoWrap();
		grVideoStop();
        heritageCarSize();
        mobCarHidden();
        mobMotiobClassChange();
    });

    // inview
    $(window).scroll(function() {
        $('.motion').on('inview', function(event, isInView) {
            if (isInView) {
                $(this).addClass('active');
            }
        });
    });
});

// GR Video
function grVideoWrap() {
    $('.gr-video-wrap').css({height: $(window).height() - $('#header').height()});

    $('.gr-video-wrap').click(function() {
        return
    });
}

// GR Video
function grVideoPlay() {
    $('.gr-video-wrap').css({height: $(window).height() - $('#header').height()});

    $('.btn-muted').click(function() {
        if($(this).hasClass('muted')) {
            $(this).removeClass('muted');
            $(this).siblings().children('video').prop('muted', true);
        } else {
            $(this).addClass('muted');
            $(this).siblings().children('video').prop('muted', false);
        }
    }); 
}

// GR Video Stop
function grVideoStop() {
    var winW = $(window).width();
    var maxW = 960;
    var videoWrap = $('.gr-video-wrap');
    var video = videoWrap.find('video');

    if(winW <= maxW) {
        video.get(0).pause();
    } else {
        video.get(0).play();
    }
}

// Heritage Detail View
function heritageDetailView() {
    var winw = $(window).width();
    var _height = 320;
    var mRatio = 0.86667;
    var list = $('.heritage-area').find('li');
    var btnView = list.children('.btn-view');
    var heritageCont = list.children('div');
    var btnViewCls = heritageCont.children('.btn-view-close');

    btnView.unbind('click').bind('click', function() {
        if($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $('.heritage-dimm').hide();
        } else {
            $(this).parent().addClass('active').siblings().removeClass('active');
            $('.heritage-dimm').show();

            if(winw <= 960) {
                heritageCont.css({height: heritageCont.width() * mRatio});
            } else {
                heritageCont.css({height: _height});
            }
        }
    });

    btnViewCls.click(function() {
        if($(this).parent('div').is(':visible')) {
            $(this).parent('div').parent().removeClass('active');
            $('.heritage-dimm').hide();
        }
    })
}

// TOYOTA 2000GT Car Size 
function heritageCarSize() {
    var winW = $(window).width();
    var defaultH = 480;
    var dragArea = $('.model-drag-area');
    var dragMask = dragArea.find('.drag-mask');
    var dragImg = dragMask.children('.drag-img.mob');
    var dragImgH = dragImg.height();
    //console.log(dragImgH);
    if(winW <= 960) dragArea.css({height: dragImgH});
    else dragArea.css({height: defaultH});
}

// Drag Mask Func
function dragMaskFunc(target) {
    var _target = target, //드래깅 영역
        $maskDiv = _target.find('.drag-mask'), //마스크 이미지
        $defaultDiv = _target.find('.drag-default'), //기본 이미지 - 레벨 더 위에 있음
        $dragBtn = _target.find('.drag-bar'), //드래그 버튼
        // $bgImg = _target.find('.bgimgDiv'),
        _ratio = 1500/1920, //배경 시안 이미지에서 발췌한 비율
        _dragBtnRatio = 836/1920; //드래그 세로 줄 시안 이미지에서 발췌한 비율

    _target.on("mousemove",function(e){
        var _x = e.pageX-_target.offset().left;
        $maskDiv.css({width: _x});
        $dragBtn.css('left',_x);
        $defaultDiv.css({width: _target.width() - _x});
    });

    //사이즈 셋팅
    // $('#section2').height($('#section2').width()*_ratio);
    _target.find('div > img.drag-img').css({width: _target.width()});
    var centerPos = _target.width() * 0.5;
    $maskDiv.css({width: centerPos});
    $dragBtn.css({
        'left' : centerPos,
        //'margin-top' : (_target.width()*_dragBtnRatio)*-0.5,
        // 'height' : _target.width()*_dragBtnRatio
        'margin-top' : '-40px',
        'height' : '560px'
    });

    $defaultDiv.css({width: centerPos});
}

// highlight 2000GT View
function highlightGtView() {
    var btn = $('.btn-gt-view');
    var wrap = $('.gr-highlight-area.type02');
    var dimm = wrap.children('.layerpop-dimm');
    var layerPop = wrap.children('.layerpop-wrap');
    var btnCls = layerPop.children('.btn-layerpop-cls');
    
    btn.click(function() {
        layerPop.css({display: 'block'});
        dimm.css({display: 'block'});
    });

    btnCls.click(function() {
        layerPop.css({display: 'none'});
        dimm.css({display: 'none'});
    });
}

// Mobile Car Hidden
function mobCarHidden() {
    $('.car-hide').on('touchmove', function(e){
        var xPos = e.originalEvent.touches[0].pageX;
        $('.car-hidden').css({width: (xPos + 54) + 'px'});

        var calc = (xPos + 27) - ($(window).width() * 0.14);
        $('.model-touch-area').find('.drag-bar').css({marginLeft: calc + 'px'});

        if(parseInt($('.model-touch-area').find('.drag-bar').css('margin-left')) <= 0) {
            $('.model-touch-area').find('.drag-bar').css({marginLeft: -27});
        } else if(parseInt($('.model-touch-area').find('.drag-bar').css('margin-left')) >= $(window).width() - 27) {
            $('.model-touch-area').find('.drag-bar').css({marginLeft: $(window).width() - 27 });
        } else {
            $('.model-touch-area').find('.drag-bar').css({marginLeft: calc + 'px'});
        }

    });

    var _width = $(window).width() * 0.23;
    $('.car-hide').children('img').css({width: $(window).width()});
    $('.car-hidden').find('img').css({width: $(window).width() + _width});

    var carHiddenW = $('.car-hidden').width();
    $('.model-touch-area').find('.drag-bar').css({marginLeft: (carHiddenW - 26) - ($(window).width() * 0.14)});
}

// Mobile Motion Class Change
function mobMotiobClassChange() {
    var winW = $(window).width();
    var mobW = 960;

    if(winW <= mobW) {
        $('.motor-area').find('.supra-info-area').children('.motion').removeClass('fadeInLeft').addClass('fadeInup');
        $('.heritage-area').find('.supra-info-area').children('.motion').removeClass('fadeInRight').addClass('fadeInup');
    } else {
        $('.motor-area').find('.supra-info-area').children('.motion').removeClass('fadeInup').addClass('fadeInLeft');
        $('.heritage-area').find('.supra-info-area').children('.motion').removeClass('fadeInup').addClass('fadeInRight');
    }
}