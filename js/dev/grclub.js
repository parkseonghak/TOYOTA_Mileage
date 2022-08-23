let grclub = newriver.grclub = {
	init : function () {
		grclub.proc();
		
		$('.validText').on('focusin focusout keyup keydown', function () {
			grclub.validation();
		});
		
		$('.validSelect').on('focusin focusout change', function () {
			grclub.validation();
		});
	},
	
	validation: function () {
		let valid = true;
		let altMsg="잠시후에 다시 시도해 주세요";

        if ($('#reg_memo').val() == '') {
            altMsg="운영진에게 남기고 싶은 말을 입력해 주세요";
            valid = false;
        }

        // 좋아하는 차량 종류
        if(typeof $('#like_car_type').val() == "undefined" || $('#like_car_type').val() == null || $('#like_car_type').val() == "") {
            altMsg="좋아하는 차량 종류를 선택해 주세요";
            valid = false;
        }

        // 좋아하는 차량
        if(typeof $('#like_car').val() == "undefined" || $('#like_car').val() == null || $('#like_car').val() == "") {
            altMsg="좋아하는 차량을 선택해 주세요";
            valid = false;
        }

		if(valid) {
			$('#grclubProc').addClass('c5').removeClass('c4');
		} else {
			$('#grclubProc').removeClass('c5').addClass('c4');
			newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : altMsg });
		}
		
		return valid;
	},
	
	proc: function () {
		$('#grclubProc').off('click').on('click', function () {
			let procCheck = grclub.validation();
			
			if(procCheck && $('#grclubProc').hasClass('c5')) {
				newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
						{ 'cont' : 'GR CLUB에 가입하시겠습니까?', 'action1' : 'newriver.grclub.confrimProc();' });
			}
		})
	},
	
	confrimProc: function () {
		$('#nForm').basic_post('/community/grclub/join_proc.do', $('#nForm').serialize(), 'json').done(function (data) {
			if (data.code === '0000') {
				location.href = "/community/grclub/join_complete.do";
			} else {
				newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
			}
			
		}).fail(function(){
			console.log(arguments[1]);
		});
	}
}