
	let modify = newriver.modify = {
		init: function () {
			clearInterval(interval);
			modify.pwdToggle();
			modify.validation();
			
			newriver.msgvalid.nameMsgValid('name', '', '', '');
			newriver.msgvalid.numbersMsgValid('numbers', function () {
				if ($('#numbers').val() != $('#ori_numbers').val()) {
					newriver.join.overlapCheck('NUMBERS', 'numbers');
				}
			}, 'pb35', 'pb35');
			newriver.msgvalid.pwdIsMsgValid('pwd', function () {
				newriver.modify.validation();
			}, '', '');
			
			$('.validText').on('focusin focusout keyup keydown', function () {
				modify.validation();
			});
			
			$('#auth_key').on('focusin focusout keyup keydown', function () {
				$(this).removeClass('fail');
				$('#keyAuthArea').addClass('pb0').removeClass('pb35');
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
			
			$('#issueKey').off('click').on('click', function () {
				clearInterval(interval);
				
				if($('#name').val() == '') {
					$('#name').removeClass('done').addClass('fail');
					$('.alert.NAME').text($('#name').data('alert1'));
				}
				
				if($('#numbers').val() == '') {
					if(!$('#numbers').hasClass('fail')) $('#numberArea').addClass('pb35').removeClass('pb0');
					
					$('#numbers').removeClass('done').addClass('fail');
					$('.alert.NUMBERS').text($('#numbers').data('alert1'));
				}
				
				if($('#name').val() != '' && $('#numbers').val() != '' && !$('#name').hasClass('fail') && !$('#numbers').hasClass('fail')) {
					$('#query').val('NUMBERS');
					$('#nForm').basic_post('/auth/check/overlap.do', $('#nForm').serialize(), 'json').done(function (data) {
						if (data.code === '0000') {
							$('#numbers').removeClass('fail');
							modify.authKeyIsuue();
							
						} else {
							if($('#numbers').val() != $('#numbers').data('numbers')) {
								$('#numbers').removeClass('done').addClass('fail');
								$('.alert.NUMBERS').text($('#numbers').data('alert2'));
							}
						}
						
						$('#query').val("");
					}).fail(function(){
						console.log(arguments[1]);
						$('#query').val("");
					});
				}
				
//				if($('#name').val() != '' && $('#numbers').val() != '') {
//					modify.authKeyIsuue();
//				}
			});
			
			$('#email_yn').on('click', function() {
				var chk = $(this).is(":checked");			
				$(this).val(chk ? 'Y' : 'N');
			});
			
			$('#sms_yn').on('click', function() {
				var chk = $(this).is(":checked");			
				$(this).val(chk ? 'Y' : 'N');
			});
			
			$('#modify').off('click').on('click', function () {
				if($(this).hasClass('c2') && modify.validation()) {
					if($('#numbers').val() != $('#numbers').data('numbers')) {
						modify.issueCheck();
					} else {
						modify.result();
					}
				}
			});
		},
		
		result: function () {
			$('#nForm').basic_post('/auth/cust/proc.do', $('#nForm').serialize(), 'json').done(function(data){
				if(data.code != '0000') {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
					return false;
				}
				
				else {
					location.href = data.url;
				}

			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		validation: function () {
			let valid = true;
			
			if($('#name').val() == '' || $('#numbers').val() == '') {
				valid = false;
			}
			
			if($('#numbers').hasClass('fail') || $('#name').hasClass('fail')) {
				valid = false;
			}
			
			if($('#pwd').val() != '') {
				if($('#pwd').hasClass('fail') || $('#pwd_confirm').hasClass('fail')) {
					valid = false;
				}
				
				if($('#pwd_confirm').val() == '') {
					valid = false;
				}
				
				if($('#pwd').val() != $('#pwd_confirm').val()) {
					valid = false;
				}
			}
			
			if($('#numbers').val() != $('#numbers').data('numbers')) {
				if($('#auth_key').val() == '' || $('#auth_key').hasClass('fail')) {
					valid = false;
				}
			}
			
			if(valid) {
				$('#modify').addClass('c2').removeClass('c1');
			} else {
				$('#modify').addClass('c1').removeClass('c2');
			}
			
			return valid;
		},
		
		pwdToggle: function () {
			$('.svg_sec').off('click').on('click', function(){
				let targetId = $(this).data('targetid');
				$(this).toggleClass('off');
				
				if($(this).hasClass('off')) {
					$('#'+targetId).attr('type', 'text').focus();
				} else {
					$('#'+targetId).attr('type', 'password').focus();
				}
			});
		},
		
		authKeyIsuue: function () {
			if(!$('#name').hasClass('fail') && !$('#numbers').hasClass('fail')) {
				clearInterval(true);
				$('#auth_key').val('');
				modify.issueKeyCreate('MOD');
			}
		},
		
		issueKeyCreate: function (typ) {
			if(!modify.validation()) {
				$('#nForm').basic_post('/auth/issue/key.do', $('#nForm').serialize(), 'json').done(function (data) {
					if (data.code === '0000') {
						$('#numberArea').removeClass('pb0');
						$('#keyAuthArea').show();
						$('#issue_yn').val('Y');
						modify.timer();
					} else {
						newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
					}
					
				}).fail(function(){
					console.log(arguments[1]);
				});
			}
		},
		
		timer: function () {
			let times = "10:00";
			let timer = 600; //10분
			
			interval = setInterval(function () {
		        minutes = parseInt(timer / 60 % 60, 10);
		        seconds = parseInt(timer % 60, 10);
				
		        minutes = minutes < 10 ? "0" + minutes : minutes;
		        seconds = seconds < 10 ? "0" + seconds : seconds;
		        
		        times = minutes+":"+seconds;
		        $('.time').text(times);
		        
		        if(minutes == '00' && seconds == '00') {
		        	clearInterval(interval);
		        	
		        	$('#auth_key').addClass('fail');
		        	$('.alert.AUTHKEY').text($('#auth_key').data('alert2'));
		        	$('#keyAuthArea').addClass('pb35').removeClass('pb0');
		        }

		        if (--timer < 0) {
		            timer = 0;
		            clearInterval(interval);
		        }
		    }, 1000);
		},
		
		issueCheck: function () {
			$('#nForm').basic_post('/auth/check/issueCheck.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					modify.result();
				} else {
					$('#auth_key').addClass('fail');
		        	$('.alert.AUTHKEY').text($('#auth_key').data('alert1'));
		        	$('#keyAuthArea').addClass('pb35').removeClass('pb0');
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		}
	}
	