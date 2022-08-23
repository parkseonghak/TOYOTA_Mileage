
	let join = newriver.join = {
		init: function () {
			clearInterval(interval);
			newriver.msgvalid.idMsgValid('id', function () {
				newriver.join.overlapCheck('ID', 'id', '', '');
			}, '', '');
			newriver.msgvalid.nameMsgValid('name', '', '', '');
			newriver.msgvalid.numbersMsgValid('numbers', function () {
				newriver.join.overlapCheck('NUMBERS', 'numbers');
			}, 'pb35', 'pb35');
			newriver.msgvalid.pwdMsgValid('pwd', function () {
				newriver.join.validation();
			}, '', '');
			
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
					$('#numberArea').addClass('pb35').removeClass('pb0');
					$('#numbers').removeClass('done').addClass('fail');
					$('.alert.NUMBERS').text($('#numbers').data('alert1'));
				}
				
				if($('#name').val() != '' && $('#numbers').val() != '' && !$('#name').hasClass('fail') && !$('#numbers').hasClass('fail')) {
					$('#query').val('NUMBERS');
					$('#nForm').basic_post('/auth/check/overlap.do', $('#nForm').serialize(), 'json').done(function (data) {
						if (data.code === '0000') {
							$('#numberArea').removeClass('pb0').removeClass('pb35');
							$('#numbers').removeClass('fail');
							join.authKeyIsuue();
							
						} else if ($('#keyAuthArea').css('display') == 'none') {
							$('#numberArea').addClass('pb35').removeClass('pb0');
						} else {
							clearInterval(interval);
							$('#numberArea').addClass('pb35').removeClass('pb0');
							$('#numbers').removeClass('done').addClass('fail');
							$('.alert.NUMBERS').text($('#numbers').data('alert2'));
							$('#keyAuthArea').fadeOut();
						}
						
						$('#query').val("");
					}).fail(function(){
						console.log(arguments[1]);
						$('#query').val("");
					});
				}
			});
			
			$('#confirm').off('click').on('click', function () {
				console.log("-,,-");
				console.log($(this).hasClass('c2'));
				if($(this).hasClass('c2')) {
					join.issueCheck();
				}
			});
			
			$('.validText').on('focusin focusout keyup keydown', function () {
				join.validation();
			});
			
			join.pwdToggle();
		},
		
		validation : function () {
			let valid = true;
			
			if($('#id').val() == '' || $('#pwd').val() == '' || $('#pwd_confirm').val() == '' 
				|| $('#name').val() == '' || $('#birth').val() == '' || $('#auth_key').val() == '') {
				valid = false;
			}
			
			if($('#id').hasClass('fail') || $('#numbers').hasClass('fail') || $('#name').hasClass('fail')
					|| $('#pwd').hasClass('fail') || $('#pwd_confirm').hasClass('fail')) {
				valid = false;
			}
			
			if(valid) {
				$('#confirm').removeClass('c1').addClass('c2');
			} else {
				$('#confirm').removeClass('c2').addClass('c1');
			}
			
			
			// 추천인 아이디 
			/*if($('#recmd_id').val() != '') {
				// 이메일 형식 검삭
				let checkEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if(!checkEmail.test($('#recmd_id').val())) {
					$('#recmd_id').addClass('fail').removeClass('done');
					$('.alert.ID').text($('#recmd_id').data('alert1'));
					valid = false;	
				}
			}*/
			
			console.log("valid :: "+valid);
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
				join.issueKeyCreate();
			}
		},
		
		overlapCheck: function (query, targetId) {
			$('#query').val(query);
			$('#nForm').basic_post('/auth/check/overlap.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					if('ID' === query) {
						$('#id').removeClass('fail').addClass('done');
					}
					
					else if('NUMBERS' === query) {
						//$('#numberArea').addClass('pb0').removeClass('pb35');
						$('#numbers').removeClass('fail');
					}
					
				} else {
					if($('#keyAuthArea').css('display') == 'none' && 'NUMBERS' === query) {
						$('#numberArea').addClass('pb35').removeClass('pb0');
					}
					
					$('#'+targetId).removeClass('done').addClass('fail');
					$('.alert.'+query).text($('#'+targetId).data('alert2'));
					
					if('NUMBERS' === query) {
						clearInterval(interval);
						$('#numberArea').addClass('pb35');
						$('#keyAuthArea').fadeOut();
					}
				}
				
				$('#query').val("");
			}).fail(function(){
				console.log(arguments[1]);
				$('#query').val("");
			});
		},
		
		issueKeyCreate: function () {
			$('#nForm').basic_post('/auth/issue/key.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					$('#auth_key').val('');
					$('#auth_key').removeClass('fail');
					
					$('#numberArea').removeClass('pb0');
					$('#keyAuthArea').show();
					
					join.timer();
				} else {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
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
		
		result: function () {
			console.log("GO~~");
			console.log(join.validation());
			if(join.validation() && $('#auth_key').val() != '') {
				$('#nForm').attr('action', '/auth/join/complete.do');
				$('#nForm').submit();
			}
		},
		
		issueCheck: function () {
			$('#nForm').basic_post('/auth/check/issueCheck.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					join.result();
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
	
	
	
	
	
	
	
	