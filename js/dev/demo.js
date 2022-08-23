
	let demo = newriver.demo = {
		init: function () {
			clearInterval(interval);
			
			let sign_yn = $('#mem_yn').val();
			
			demo.agree();
			//demo.proc();
			
			$('.validText').on('focusin focusout keyup keydown', function () {
				demo.validation(sign_yn);
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
							demo.authKeyIsuue();
							
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
			
			$('#apply').off('click').on('click', function () {
				if($(this).hasClass('c2')) {
					demo.issueCheck();
				}
			});
		},
		
		authKeyIsuue: function () {
			if(!$('#name').hasClass('fail') && !$('#numbers').hasClass('fail')) {
				demo.issueKeyCreate();
			}
		},
		
		issueKeyCreate: function () {
			$('#nForm').basic_post('/auth/issue/key.do', $('#nForm').serialize(), 'json').done(function (data) {
				console.log(data);
				
				if (data.code === '0000') {
					$('#auth_key').val('');
					$('#auth_key').removeClass('fail');
					
					$('#numberArea').removeClass('pb0');
					$('#keyAuthArea').show();
					
					demo.timer();
				} else {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		initForm: function () {
			$('#page').val('1');
			demo.ajaxList('empty');
		},
		
		ajaxList: function (type) {
			$('#nForm').basic_post('/models/demo/step2/placeAjax.do', $('#nForm').serialize(), 'html').done(function(data){
				if(type === 'empty') {
					$('#dataList').empty().append(data);
				}
				else {
					$('#dataList').append(data);
				}
				$('#loaderDim').fadeOut();
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		placeSearch: function () {
			$('#sltOpt li').off('click').on('click', function () {
				$('#srchPlace').val($(this).data('val'));
				$('.selected').text($(this).data('title'));
				
				demo.initForm();
			});
		},

		callback: function (result, status) {
			if(status != undefined) {
				$('#currentPlace').text(result[0].address.region_1depth_name+' '+result[0].address.region_2depth_name);
			}
			demo.initForm();
			$('#loaderDim').fadeOut();
		},
		
		callback2: function () {
			$('#currentPlace').text('서울 강남구');
			demo.initForm();
			$('#loaderDim').fadeOut();
		},
		
		layerPopup: function (url) {
			newriver.ajaxpopup.open(url);
		},
		
		dateValidation: function () {
			let valid = true;
			
			if($('#datePick_dev').val() == '') {
				valid = false;
			}
			
			if($('#apply_tm').val() == '') {
				valid = false;
			}
			
			if($('#apply_type').val() == '11601') {
				if($('#contact_tm').val() == '') {
					valid = false;
				}
			}
			
			if(valid) {
				$('#nextStep').removeClass('c1').addClass('c2');
			} else {
				$('#nextStep').removeClass('c2').addClass('c1');
			}
			
			return valid;
		},
		
		validation: function (sign_yn) {
			let valid = true;
			
			if(sign_yn != 'Y') {
				// 약관동의 체크
				if (!$('#agreeAll').prop('checked')) {
					valid = false;
				}
			}
			
			// 이름
			if ($('#name').val() == '') {
				valid = false;
			}
			
			// 휴대폰 번호
			if ($('#numbers').val() == '') {
				valid = false;
			}
			
			// 인증번호
			if ($('#auth_key').val() == '') {
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
			
			if(valid) {
				$('#apply').addClass('c2').removeClass('c1');
			} else {
				$('#apply').removeClass('c2').addClass('c1');
			}
			
			return valid;
		},
		
		proc: function () {
			//$('#apply').off('click').on('click', function () {
				let sign_yn = $('#mem_yn').val();
				let procCheck = demo.validation(sign_yn);
				
				if(procCheck && $('#apply').hasClass('c2')) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : $('#place_nm').val() + '<br>시승신청 하시겠습니까?', 'action1' : 'newriver.demo.confirmProc();' });
				}
			//})
		},
		
		confirmProc: function () {
			$('#nForm').basic_post('/models/demo/proc.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					location.href = "/models/demo/complete.do?idx="+data.idx;
				} else {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		agree: function () {
			let sign_yn = $('#mem_yn').val();
			
			$("#agreeAll").click(function(){
		        $('input:checkbox').not(this).prop('checked', this.checked);
		        demo.validation(sign_yn);
		    });
			
			$('.agree_chk_c').off('click').on('click', function() {
		    	$(this).prop('checked', $(this).prop('checked'));
		    	
		    	let agree = true;
		    	$('.agree_chk_c').each(function() {
		    		if(!$(this).prop('checked')) agree = false;
		    	});
		    	
		    	$("#agreeAll").prop('checked', agree);
		    	
		    	demo.validation(sign_yn);
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
		
		issueCheck: function () {
			$('#nForm').basic_post('/auth/check/issueCheck.do', $('#nForm').serialize(), 'json').done(function (data) {
				console.log(data);
				
				if (data.code === '0000') {
					demo.proc();
				} else {
					$('#auth_key').addClass('fail');
		        	$('.alert.AUTHKEY').text($('#auth_key').data('alert1'));
		        	$('#keyAuthArea').addClass('pb35').removeClass('pb0');
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
	}
	
	let demoNone = newriver.demoNone = {
		init: function () {
			$('#issueKey').off('click').on('click', function () {
				clearInterval(interval);
				
				if($('#name').val() != '' && $('#numbers').val() != '') {
					demoNone.authKeyIsuue('DEMO');
				}
			});
			
			$('#auth_key').on('focusin focusout keyup keydown', function () {
				$(this).val($(this).val().replace(/[^0-9]/g,""));
				
				let checkNumber = $(this).val().search(/[0-9]/g) > -1 ? true : false;
				if(!checkNumber) {
					$(this).val('');
					$('#nextCheck').removeClass('c2').addClass('c1');
				} else {
					$('#nextCheck').removeClass('c1').addClass('c2');
				}
			});
			
			$('#nextCheck').off('click').on('click', function () {
				if($(this).hasClass('c2')) {
					demoNone.issueCheck();
				}
			});
			
			newriver.msgvalid.numbersMsgValid('numbers', '', '', '');
		},
		
		validation: function () {
			let valid = true;
			
			// 이름
			if ($('#name').val() == '') {
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
			
			return valid;
		},
		
		authKeyIsuue: function (typ) {
			if(demoNone.validation(typ)) {
				$('#nForm').basic_post('/auth/issue/key.do', $('#nForm').serialize(), 'json').done(function (data) {
					if (data.code === '0000') {
						if(typ == 'PWD') {
							$('#id').attr('readonly', 'readonly');
						}
						
						else {
							$('#numberArea').removeClass('pb0');
						}
						
						$('#name').attr('readonly', 'readonly');
						$('#numbers').attr('readonly', 'readonly');
						$('#keyAuthArea').show();
						
						demoNone.timer();
					} else {
						newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
					}
					
				}).fail(function(){
					console.log(arguments[1]);
				});
			}
		},
		
		result: function (typ) {
			if(demoNone.validation()) {
				if($('#auth_key').val() == '') {
					$('#keyAuthArea').addClass('pb35').removeClass('pb0');
					$('#auth_key').addClass('fail');
		        	$('.alert.AUTHKEY').text($('#auth_key').data('alert3'));
					
					return false;
				}
				
				$('#nForm').attr('action', '/models/demo/list.do');
				$('#nForm').submit();
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
		        	$('#keyAuthArea').addClass('pb35').removeClass('pb0');
		        	$('#auth_key').addClass('fail');
		        	$('.alert.AUTHKEY').text($('#auth_key').data('alert2'));
		        }

		        if (--timer < 0) {
		            timer = 0;
		            clearInterval(interval);
		        }
		    }, 1000);
		},
		
		issueCheck: function (callback) {
			$('#nForm').basic_post('/auth/check/issueCheck.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					demoNone.result();
				} else {
					$('#keyAuthArea').addClass('pb35').removeClass('pb0');
					$('#auth_key').addClass('fail');
		        	$('.alert.AUTHKEY').text($('#auth_key').data('alert1'));
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		}
	}
	
	
	
	
	