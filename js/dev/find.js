
	let find = newriver.find = {
		init: function () {
			clearInterval(interval);
			newriver.msgvalid.idMsgValid('id', '', '', '');
			newriver.msgvalid.nameMsgValid('name', '', '', '');
			newriver.msgvalid.numbersMsgValid('numbers', '', 'pb35', 'pb35');
			
			$('#issueKey').off('click').on('click', function () {
				clearInterval(interval);
				
				if($('#name').val() != '' && $('#numbers').val() != '') {
					find.authKeyIsuue($(this).data('typ'));
				}
			});
			
			$('#auth_key').on('focusin focusout keyup keydown', function () {
				$(this).removeClass('fail');
				$('#keyAuthArea').addClass('pb0').removeClass('pb35');
				
				$(this).val($(this).val().replace(/[^0-9]/g,""));
				find.validation($('#type').val());
			});
			
			$('#nextCheck').off('click').on('click', function () {
				if($(this).hasClass('c2')) {
					find.issueCheck();
				}
			});
		},
		
		validation: function (typ) {
			let valid = true;
			
			if(typ == 'PWD') {
				if($('#id').val() == '') {
					valid = false;
				}
			}
			
			if($('#name').val() == '') {
				valid = false;
			}
			
			if ($('#numbers').val() == '') {
				valid = false;
			}
			
			if ($('#auth_key').val() == '') {
				valid = false;
			}
			
			if(valid) {
				$('#nextCheck').removeClass('c1').addClass('c2');
			} else {
				$('#nextCheck').removeClass('c2').addClass('c1');
			}
			
			return valid;
		},
		
		authKeyIsuue: function (typ) {
			if(!$('#numbers').hasClass('fail') && !$('#name').hasClass('fail')) {
				find.issueKeyCreate(typ);
			}
		},
		
		issueKeyCreate: function (typ) {
			$('#nForm').basic_post('/auth/issue/key.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					$('#auth_key').val('');
					$('#auth_key').removeClass('fail');
					$('#numberArea').removeClass('pb0');
					$('#keyAuthArea').show();
					
					find.timer();
				} else {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		result: function () {
			if(find.validation($('#type').val())) {
				let tmpDr = $('#type').val().toLowerCase();
				
				$('#nForm').attr('action', '/auth/find/'+tmpDr+'_result.do');
				$('#nForm').submit();
			}
		},
		
		issueCheck: function () {
			$('#nForm').basic_post('/auth/check/issueCheck.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					find.result();
				} else {
					$('#auth_key').addClass('fail');
		        	$('.alert.AUTHKEY').text($('#auth_key').data('alert1'));
		        	$('#keyAuthArea').addClass('pb35').removeClass('pb0');
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
		}
	}
	
	let change = newriver.change = {
		init: function () {
			newriver.msgvalid.pwdMsgValid('pwd', function () {
				newriver.change.validation();
			}, '', '');
			
			$('#nextCheck').off('click').on('click', function () {
    			if($(this).hasClass('c2')) change.result();
    		});
    		
    		$('#id').on('focusin focusout keyup keydown', function () {
				let checkEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if(!checkEmail.test($(this).val())) {
					change.validation();
				}
			});
    		
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
		
		result: function () {
    		if(change.validation()) {
    			$('#nForm').attr('action', '/auth/find/pwd_result.do');
    			$('#nForm').submit();
    		}
    	},
        
    	validation: function () {
			let valid = true;
			
			if($('#id').val() == '') {
				valid = false;
			}
			
			if($('#pwd').val() == '') {
				valid = false;
			}
			
			if ($('#pwd_confirm').val() == '') {
				valid = false;
			}
			
			if($('#pwd').val() != '' && $('#pwd_confirm').val() != '') {
				if($('#pwd').val() != $('#pwd_confirm').val()) {
					valid = false;
				}
			}
			
			if(valid) {
				$('#nextCheck').removeClass('c1').addClass('c2');
			} else {
				$('#nextCheck').removeClass('c2').addClass('c1');
			}
			
			return valid;
		}
	}
	
	
	
	
	
	
	