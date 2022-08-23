let grclub_comment = newriver.grclub_comment = {
	init : function () {
		grclub_comment.proc();
		
		$('.validText').on('focusin focusout keyup keydown', function () {
			grclub_comment.validation();
		});
		
		$('.validSelect').on('focusin focusout change', function () {
			grclub_comment.validation();
		});
	},
	
	validation: function () {
		let valid = true;
		let altMsg="잠시후에 다시 시도해 주세요";

        if ($('#contents').val() == '') {
            altMsg="댓글을 입력해 주세요";
            valid = false;
        }

		if(valid) {
			$('#grclubCommentProc').addClass('c5').removeClass('c4');
		} else {
			$('#grclubCommentProc').removeClass('c5').addClass('c4');
			newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : altMsg });
		}
		
		return valid;
	},
	
	proc: function () {
		$('#grclubCommentProc').off('click').on('click', function () {
			let procCheck = grclub_comment.validation();
			
			if(procCheck && $('#grclubCommentProc').hasClass('c5')) {
				newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
						{ 'cont' : '댓글을 등록하시겠습니까?', 'action1' : 'newriver.grclub_comment.confrimProc();' });
			}
		})
	},
	
	confrimProc: function () {
		$('#nForm').basic_post('/community/grclub/comment_proc.do', $('#nForm').serialize(), 'json').done(function (data) {
			if (data.code === '0000') {
                newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg, 'action1' : '0000', 'action2' : 'location.reload();' });

			} else {
				newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
			}
			
		}).fail(function(){
			console.log(arguments[1]);
		});
	}
}