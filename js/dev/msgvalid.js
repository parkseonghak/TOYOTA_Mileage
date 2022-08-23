
	let msgvalid = newriver.msgvalid = {
		
		idMsgValid: function(targetId, targetCallback, getClass, delClass) {
			$('#'+targetId).on('focusin', function () {
				$(this).removeClass('fail').removeClass('done');
				
				if(delClass != '') {
					$('#'+targetId).parent().parent().removeClass(delClass);
				}
			});
			
			$('#'+targetId).on('focusout', function () {
				msgvalid.emailCheck(targetId, targetCallback, getClass, delClass);
			});
		},
			
		nameMsgValid: function(targetId, targetCallback, addClass, delClass) {
			$('#'+targetId).on('focusin', function () {
				$(this).removeClass('fail');
			});
			
			$('#'+targetId).on('focusout', function () {
				if($(this).val() == '') {
					$(this).addClass('fail');
					$('.alert.NAME').text($(this).data('alert1'));
				}
			});
			
			if(typeof targetCallback) {
				msgvalid.callback(targetCallback);
			}
		},
			
		numbersMsgValid: function(targetId, targetCallback, getClass, delClass) {
			$('#'+targetId).on('keyup keydown', function () {
				$(this).removeClass('fail');
				$(this).val($(this).val().replace(/[^0-9]/g,""));
				
				if(delClass != '') {
					$('#'+targetId).parent().parent().removeClass(delClass);
					if($('#keyAuthArea').css('display') == 'none') $('#'+targetId).parent().parent().addClass('pb0');
				}
			});
			
			$('#'+targetId).on('focusin', function () {
				$(this).removeClass('fail');
				$(this).val($(this).val().replace(/[^0-9]/g,""));
				
				if(delClass != '') {
					$('#'+targetId).parent().parent().removeClass(delClass);
					if($('#keyAuthArea').css('display') == 'none') $('#'+targetId).parent().parent().addClass('pb0');
				}
			});
			
			$('#'+targetId).on('focusout', function () {
				$(this).removeClass('fail');
				$(this).val($(this).val().replace(/[^0-9]/g,""));
				
				if($(this).val() == '') {
					$(this).addClass('fail');
					$('.alert.NUMBERS').text($(this).data('alert1'));
					
					if($('#keyAuthArea').css('display') == 'none' && getClass != '') {
						$('#'+targetId).parent().parent().addClass(getClass).removeClass('pb0');
					}
				}
				
				else {
					if(delClass != '') {
						$('#'+targetId).parent().parent().removeClass(delClass);
						
						if($('#keyAuthArea').css('display') == 'none') $('#'+targetId).parent().parent().addClass('pb0');
					}
					
					if(typeof targetCallback) {
						msgvalid.callback(targetCallback);
					}
				}
			});
		},
			
		pwdMsgValid: function(targetId, targetCallback, getClass, delClass) {
			$('#'+targetId).on('focusin', function () {
				$(this).removeClass('fail').removeClass('done');
			});
			
			$('#'+targetId).on('focusout', function () {
				msgvalid.pwdCheck(targetId, targetCallback, getClass, delClass);
			});
			
			$('#'+targetId+'_confirm').on('focusin', function () {
				$(this).removeClass('fail').removeClass('done');
			});
			
			$('#'+targetId+'_confirm').on('focusout', function () {
				if($('#'+targetId).val() != '' && $('#'+targetId+'_confirm').val() != '') {
					if($('#'+targetId).val() != $('#'+targetId+'_confirm').val()) {
						$(this).addClass('fail').removeClass('done');
						$('.alert.PWDC').text($(this).data('alert1'));
					}
					
					else {
						$(this).addClass('done').removeClass('fail');
					}
				}
				
				else {
					if($('#'+targetId).val() == '') {
						$('#'+targetId+'_confirm').val('');
						$('#'+targetId+'_confirm').addClass('fail').removeClass('done');
						$('.alert.PWDC').text($('#'+targetId+'_confirm').data('alert2'));
					}
				}
				
				if(typeof targetCallback) {
					msgvalid.callback(targetCallback);
				}
			});
		},
		
		pwdIsMsgValid: function(targetId, targetCallback, getClass, delClass) {
			$('#'+targetId).on('focusin', function () {
				$(this).removeClass('fail').removeClass('done');
			});
			
			$('#'+targetId).on('focusout', function () {
				if ($(this).val() != '') {
					msgvalid.pwdCheck(targetId, targetCallback, getClass, delClass);
				}
			});
			
			$('#'+targetId+'_confirm').on('focusin', function () {
				$(this).removeClass('fail').removeClass('done');
			});
			
			$('#'+targetId+'_confirm').on('focusout', function () {
				if($('#'+targetId).val() != '' && $('#'+targetId+'_confirm').val() != '') {
					if($('#'+targetId).val() != $('#'+targetId+'_confirm').val()) {
						$(this).addClass('fail').removeClass('done');
						$('.alert.PWDC').text($(this).data('alert1'));
					}
					
					else {
						$(this).addClass('done').removeClass('fail');
					}
				}
				
				if(typeof targetCallback) {
					msgvalid.callback(targetCallback);
				}
			});
		},
		
		emailCheck: function (targetId, targetCallback, getClass, delClass) {
			if($('#'+targetId).val() != '') {
				let checkEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if(!checkEmail.test($('#'+targetId).val())) {
					$('#'+targetId).addClass('fail').removeClass('done');
					$('.alert.ID').text($('#'+targetId).data('alert1'));
					
					if(getClass != '') {
						$('#'+targetId).parent().parent().addClass(getClass);
					}
					
				} else {
					$('#'+targetId).addClass('done').removeClass('fail');
					
					if(delClass != '') {
						$('#'+targetId).parent().parent().removeClass(delClass);
					}
					
					if(typeof targetCallback) {
						msgvalid.callback(targetCallback);
					}
				}
			}
			
			else {
				$('#'+targetId).addClass('fail').removeClass('done');
				$('.alert.ID').text($('#'+targetId).data('alert3'));
				
				if(getClass != '') {
					$('#'+targetId).parent().parent().addClass(getClass);
				}
			}
		},
		
		pwdCheck: function (targetId, targetCallback, getClass, delClass) {
			let check_str1 = "abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|890";
			let check_str2 = "qwe|wer|ert|rty|tyu|yui|uio|iop|asd|sdf|dfg|fgh|ghj|hjk|jkl|zxc|xcv|cvb|vbn|bnm";
			let pwd = $('#'+targetId).val();
			let checkNumber = pwd.search(/[0-9]/g) > -1 ? 1 : 0;
			let checkEnglish = pwd.search(/[a-z]/ig) > -1 ? 1 : 0;
			let checkSpecial = pwd.search(/\W/) > -1 ? 1 : 0;
			let checkSum = checkNumber + checkEnglish + checkSpecial;
			
			/* 패스워드 길이 체크 */
			if(pwd.length < 8) {
				$('#'+targetId).addClass('fail').removeClass('done');
				$('.alert.PWD').text('패스워드는 8자리 이상, 문자 구성해야합니다.');
				return false;
			}
			
			/* 문자, 숫자, 특수문자 모두 조합 */
			if(checkSum < 3) {
				$('#'+targetId).addClass('fail').removeClass('done');
				$('.alert.PWD').text('문자, 숫자, 특수문자를 모두 포함해야 합니다.');
				return false;
			}
			
			/* 동일한 문자 또는 숫자가 3자 이상 사용된 패스워드 */
			if(/(\w)\1\1/.test(pwd)){
				$('#'+targetId).addClass('fail').removeClass('done');
				$('.alert.PWD').text('동일한 3자리 이상의 문자나 숫자로 비밀번호를 사용할 수 없습니다.');
				return false;
			}
			
			/* 연속된 3자리 이상의 문자나 숫자*/
			let pw = pwd.toLowerCase();
			let chech_arr1 = check_str1.split("|");
			for(i=0;i<chech_arr1.length;i++){				
				if(pw.indexOf(chech_arr1[i]) < -1){
					$('#'+targetId).addClass('fail').removeClass('done');
					$('.alert.PWD').text('연속된 3자리 이상의 문자나 숫자로 비밀번호를 사용할 수 없습니다.');
					return false;
				}
			}
			
			/* 연속된 3자리 이상의 키보드 문자*/
			let chech_arr2 = check_str2.split("|");
			for(i=0;i<chech_arr2.length;i++){								
				if(pw.indexOf(check_str2[i]) < -1){
					$('#'+targetId).addClass('fail').removeClass('done');
					$('.alert.PWD').text('연속된 3자리 이상의 키보드 문자로 비밀번호를 사용할 수 없습니다.');
					return false;
				}
			}
			
			$('#'+targetId).addClass('done').removeClass('fail');
			
			if(typeof targetCallback) {
				msgvalid.callback(targetCallback);
			}
		},
		
		callback: function (callFunction) {
			if(callFunction != '') {
				callFunction();
			}
		}
	}
