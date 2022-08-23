
	let contact = newriver.contact = {
		init : function () {
			contact.proc();
			
			$('.validText').on('focusin focusout keyup keydown', function () {
				contact.validation();
			});
			
			$('.validSelect').on('focusin focusout change', function () {
				contact.validation();
			});
		},
		
		validation: function () {
			let valid = true;
			let altMsg="잠시후에 다시 시도하여 주세요";
												
			// 이메일
			if ($('#email').val() == '') {
				altMsg="이메일을 입력하여 주세요";
				valid = false;
			}else {
				let checkEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if(!checkEmail.test($('#email').val())) {
					altMsg="이메일 유형을 확인하여 주세요";
					valid = false;
				}
			}
			
			// 휴대폰 번호
			if ($('#numbers').val() == '') {
				altMsg="휴대전화번호를 입력하여 주세요";
				valid = false;
			}else {
				$('#numbers').val($('#numbers').val().replace(/[^0-9]/g,""));
				
				let checkNumber = $('#numbers').val().search(/[0-9]/g) > -1 ? true : false;
				if(!checkNumber) {
					$('#numbers').val('');
					altMsg="휴대전화번호를 확인하여 주세요";
					valid = false;
				}
			}
			
			if ($('#contents').val() == '') {
				altMsg="내용을 입력하여 주세요";
				valid = false;
			}
			
			if ($('#subject').val() == '') {
				altMsg="제목을 입력하여주세요";
				valid = false;
			}
			
			// 이름, 분류, 제목, 내용
			if(typeof $('#type').val() == "undefined" || $('#type').val() == null || $('#type').val() == "") {
				altMsg="분류를 선택하여주세요";
				valid = false;
			}
			
			
			if(valid) {
				$('#contactProc').addClass('c5').removeClass('c4');
			} else {
				$('#contactProc').removeClass('c5').addClass('c4');
				newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : altMsg });
			}
			
			return valid;
		},
		
		proc: function () {
			$('#contactProc').off('click').on('click', function () {
				let procCheck = contact.validation();
				
				if(procCheck && $('#contactProc').hasClass('c5')) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : '1:1 문의를 접수하시겠습니까?', 'action1' : 'newriver.contact.confrimProc();' });
				}
			})
		},
		
		confrimProc: function () {
			$('#nForm').basic_post('/support/contact/proc.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					location.href = "/support/contact/complete.do";
				} else {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		}
	}
	
	
	
	
	
	
	
	