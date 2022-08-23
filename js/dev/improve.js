
	let improve = newriver.improve = {
		init : function () {
			let sign_yn = $('#mem_yn').val();
			
			improve.agree();
			improve.proc();
			
			$('.validText').on('focusin focusout keyup keydown', function () {
				improve.validation(sign_yn);
			});
			
			$('.validSelect').on('focusin focusout change', function () {
				improve.validation(sign_yn);
			});
			
			$('.carYn').off('click').on('click', function () {
				let seq = $(this).data('seq');
				if(seq == 1) {
					$('.vehic_no_view').hide();
				}
				
				else {
					$('.vehic_no_view').show();
				}
			});
			
			newriver.msgvalid.idMsgValid('email', '', '', '');
		},
		
		agree: function () {
			let sign_yn = $('#mem_yn').val();
			
			$("#agreeAll").click(function(){
		        $('input:checkbox').not(this).prop('checked', this.checked);
		        improve.validation(sign_yn);
		    });
			
			$('.agree_chk_c').off('click').on('click', function() {
		    	$(this).prop('checked', $(this).prop('checked'));
		    	
		    	let agree = true;
		    	$('.agree_chk_c').each(function() {
		    		if(!$(this).prop('checked')) agree = false;
		    	});
		    	
		    	$("#agreeAll").prop('checked', agree);
		    	
		    	improve.validation(sign_yn);
		    });
			
			$('input[name=car_yn]').click(function () {
				$(this).prop('checked', $(this).prop('checked'));
				improve.validation(sign_yn);
			});
		},
		
		validation: function (sign_yn) {
			let valid = true;
			
			if(sign_yn != 'Y') {
				// 약관동의 체크
				if (!$('#agreeAll').prop('checked')) {
					valid = false;
				}
			}
			
			// 차량 유무
			if ($('input[name=car_yn]:checked').val() == '' || $('input[name=car_yn]:checked').val() == undefined) {
				valid = false;
			}
			
			// 이름, 분류, 제목, 내용
			if ($('#mem_nm').val() == '' || $('#type').val() == '' || $('#subject').val() == '' || $('#contents').val() == '') {
				valid = false;
			}
			
			// 휴대폰 번호
			if ($('#numbers').val() == '') {
				valid = false;
			}
			
			else {
				$('#numbers').val($('#numbers').val().replace(/[^0-9]/g,""));
				
				let checkNumber = $('#numbers').val().search(/[0-9]/g) > -1 ? true : false;
				if(!checkNumber) {
					$('#numbers').val('');
					valid = false;
				}
			}
			
			// 이메일
			if ($('#email').val() == '') {
				valid = false;
			}
			
			else {
				let checkEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if(!checkEmail.test($('#email').val())) {
					valid = false;
				}
			}
			
			// 차량번호
			if($('#haveCar').prop('checked')) {
				if ($('#vehic_no').val() == '') {
					valid = false;
				}
			}
			
			if(valid) {
				$('#improveProc').addClass('c5').removeClass('c4');
			} else {
				$('#improveProc').removeClass('c5').addClass('c4');
			}
			
			return valid;
		},
		
		proc: function () {
			$('#improveProc').off('click').on('click', function () {
				let sign_yn = $('#mem_yn').val();
				let procCheck = improve.validation(sign_yn);
				
				if(procCheck && $('#improveProc').hasClass('c5')) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : '문의/개선 사항을 요청하시겠습니까?', 'action1' : 'newriver.improve.confirmProc();' });
				}
			})
		},
		
		confirmProc: function () {
			$('#nForm').basic_post('/support/improve/proc.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					location.href = "/support/improve/complete.do";
				} else {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		}
	}
	
	
	
	
	
	
	
	