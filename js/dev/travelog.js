
	let travel = newriver.travel = {
		init : function () {
			travel.imgReplySearch();
			travel.proc();
			travel.replyDel();

			$('.validText').on('focusin focusout keyup keydown', function () {
				travel.validation();
			})
		},
		
		initForm: function () {
			$('#page').val('1');
			travel.ajaxList('empty');
			$('#loaderDim').fadeOut();
		},
		
		ajaxList: function (type) {
			$('#nForm').basic_post('/toyota/travelog/reply/replyListAjax.do', $('#nForm').serialize(), 'html').done(function(data){					
				if(type === 'empty') {
					$('#dataList').empty().append(data);
				}
				else {					
					$('#dataList').append(data);
				}

				$('.btn_open').off('click').on('click', function(){
					$(this).closest('li').toggleClass('open');
				});
				
				$('.travelog_list > ul > li').each(function(i, elm){
					if (!$(elm).find('.img_area').length) {
						if ($(elm).find('.txt_area .inner').outerHeight() < 126) {
							$(elm).find('.btn_wrap').css('display', 'none');
							$(elm).addClass('open');
						}
					}
				});				
			}).fail(function(){				
				console.log(arguments[1]);
			});
		},
		
		imgReplySearch: function () {
			$('#sltOpt li').off('click').on('click', function () {			
				$('#srchImg_yn').val($(this).data('val'));
				$('.selected').text($(this).data('title'));
				
				travel.initForm();
			});
		},

		validation: function () {
			let valid = true;
			
			// 내용
			if ($('#contents').val() == '') {
				valid = false;
			}			
			
			
			if(valid) {				
				$('.btn120').addClass('c5').removeClass('c4');
			} else {
				$('.btn120').removeClass('c5').addClass('c4');
			}
			
			return valid;
		},

		proc: function () {
			$('#writeProc').off('click').on('click', function () {
				let procCheck = travel.validation();
				
				if(procCheck && $('#writeProc').hasClass('c5')) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : '댓글을 등록하시겠습니까?', 'action1' : 'newriver.travel.confrimProc("apply");' });
				}
			});

			$('#modifyProc').off('click').on('click', function() {
				let procCheck = travel.validation();

				if(procCheck && $('#modifyProc').hasClass('c5')) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : '댓글을 수정하시겠습니까?', 'action1' : 'newriver.travel.confrimProc("modify");' });
				}
			});
		},

		confrimProc: function (type) {
			if(type === 'apply') {
				$('#nForm').basic_post('/toyota/travelog/writeProc.do', $('#nForm').serialize(), 'json').done(function (data) {
					if (data.code === '0000') {
						location.href = "/toyota/travelog/view.do?idx=" + data.bod_idx;
					} else {
						newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
					}				
				}).fail(function(){
					console.log(arguments[1]);
				});				
			}
			else if(type === 'delete') {
				$('#dForm').basic_post('/toyota/travelog/delProc.do', $('#dForm').serialize(), 'json').done(function (data) {
					if (data.code === '0000') {
						location.href = "/toyota/travelog/view.do?idx=" + data.bod_idx;
					} else {
						newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
					}
					
				}).fail(function(){
					console.log(arguments[1]);
				});
			}
			else {
				$('#nForm').basic_post('/toyota/travelog/modProc.do', $('#nForm').serialize(), 'json').done(function (data) {
					if (data.code === '0000') {
						location.href = "/toyota/travelog/view.do?idx=" + data.bod_idx;
					} else {
						newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
					}
					
				}).fail(function(){
					console.log(arguments[1]);
				});
			}
		},

		replyDel: function() {
			$(".btn_del").off('click').on('click', function(){
				$("#idx").val($(this).attr("value"));
				newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, { 'cont' : '댓글을 삭제하시겠습니까?', 'action1' : 'newriver.travel.confrimProc("delete");' });
			});
		},

		replyMod: function() {
			$("#btn_mod").off('click').on('click', function(){
				newriver.travel.confrimProc("modify");
			});
		}
	}
	
	
	
	
	
	
	
	