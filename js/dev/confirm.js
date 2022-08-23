
	let confirm = newriver.confirm = {
		init: function () {
			$('#id, #pwd').on('keyup keydown', function () {
				confirm.validation();
			});
			
			confirm.resign();
			confirm.pwdToggle();
		},
		
		resign: function () {
			$('#confirm').off('click').on('click', function () {
				if($(this).hasClass('c2') && confirm.validation()) {
					$('#nForm').basic_post('/auth/cust/resign.do', $('#nForm').serialize(), 'json').done(function(data){
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
				}
			});
		},
		
		validation: function () {
			let valid = true;
			
			if($('#id').val() == '') {
				valid = false;
			}
			
			if($('#pwd').val() === '') {
				valid = false;
			}
			
			if(valid) {
				$('#confirm').addClass('c2').removeClass('c1');
			} else {
				$('#confirm').addClass('c1').removeClass('c2');
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
		}
	}
	
	
	
	
	
	
	
	