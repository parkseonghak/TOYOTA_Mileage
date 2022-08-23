
	let sign = newriver.sign = {
		init: function () {
			$('#sign_id').on('focusin', function () {
				$(this).removeClass('fail').removeClass('done');
			});
			
			$('#sign_id').on('focusout', function () {
				sign.emailCheck('sign_id');
			});
			
			sign.login();
			sign.pwdToggle();
			
			$('.validText').on('focusin focusout keyup keydown', function () {
				let valid = true;
				
				if($('#sign_id').val() == '' || $('#sign_pwd').val() == '') {
					valid = false;
				}
				
				if($('#sign_id').hasClass('fail')) {
					valid = false;
				}
				
				if(valid) {
					$('#authProc').addClass('c4').removeClass('c3');
				} else {
					$('#authProc').addClass('c3').removeClass('c4');
				}
			});
		},
		
		login: function () {
			$('#authProc').off('click').on('click', function () {
				$('#loaderDim').show();
				if(sign.emailCheck('sign_id') && sign.pwdCheck('sign_pwd') && $(this).hasClass('c4')) {
					$('#nForm').basic_post('/auth/check/auth.do', $('#nForm').serialize(), 'json').done(function(data){
						if(data.code != '0000') {
							$('#loaderDim').fadeOut();
							newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
							return false;
						}
						
						else {
							location.href = data.url;
						}

					}).fail(function(){
						console.log(arguments[1]);
						$('#loaderDim').fadeOut();
					});
					
				} else {
					$('#loaderDim').fadeOut();
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : '계정정보를 입력해주세요.', 'action1' : '' });
				}
			});
		},
		
		emailCheck: function (targetId) {
			let check = true;
			
			if($('#'+targetId).val() != '') {
				let checkEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if(!checkEmail.test($('#'+targetId).val())) {
					$('#'+targetId).addClass('fail').removeClass('done');
					check = false;
				} else {
					$('#'+targetId).removeClass('fail').addClass('done');
				}
			}
			
			return check;
		},
		
		pwdCheck: function (targetId) {
			let check = true;
			
			if($('#'+targetId).val() === '') {
				check = false;
			}
			
			return check;
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
		}
	}
	
	
	
	
	
	
	
	