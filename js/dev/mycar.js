
	let mycarInfo = newriver.mycarInfo = {
		init: function () {
			mycarInfo.proc();
			mycarInfo.validation();
			
			$('#vehic_no').on('focusin focusout keyup keydown', function () {
				mycarInfo.validation();
			});
			
			$('#subject').on('focusin focusout keyup keydown', function () {
				mycarInfo.validation();
			});
			
			$('.deleteCar').off('click').on('click', function () {
				newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
						{ 'cont' : '내 차 정보를 삭제하시겠습니까?', 'action1' : 'newriver.mycarInfo.deleteProc();' });
			});
		},
		
		proc: function () {
			$('#confirm').off('click').on('click', function () {
				if($(this).hasClass('c5') && mycarInfo.validation()) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : '내 차 정보를 수정하시겠습니까?', 'action1' : 'newriver.mycarInfo.confirmProc();' });
				}
			});
		},
		
		confirmProc: function () {
			$('#nForm').basic_post('/mycar/info/proc.do', $('#nForm').serialize(), 'json').done(function (data) {
				newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, 
						{ 'cont' : data.msg, 'action1' : data.code, 'action2' : 'location.href = \'/mycar/info/info.do\'' });
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		deleteProc: function () {
			$('#query').val('DELETE');
			$('#nForm').basic_post('/mycar/info/proc.do', $('#nForm').serialize(), 'json').done(function (data) {
				newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, 
						{ 'cont' : data.msg, 'action1' : data.code, 'action2' : 'location.href = \'/mycar/info/info.do\'' });
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		validation: function () {
			let valid = true;
			
			/*
			if($('#vehic_no').val() != '' || $('#subject').val() != '') {
				
			} else {
				valid = false;
			}
			*/
			
			if(valid) {
				$('#confirm').addClass('c5').removeClass('c4');
			} else {
				$('#confirm').addClass('c4').removeClass('c5');
			}
			
			return valid;
		}
	}
	
	let odometer = newriver.odometer = {
			init: function () {
				odometer.proc();
			},
			
			proc: function () {
				$('.odoUpt').off('click').on('click', function () {
					let valid = true;
					let odometer = $(this).data('odometer');
					let msg = '주행거리를 입력해주세요.';
					
					if($('#odometer').val() == '') {
						newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : msg });
						valid = false;
						return false;
					}
					
					else {
						if($('#odometer').val() == 0) {
							newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : '0이상의 주행거리를 입력해주세요.' });
							valid = false;
							return false;
						}
						
						else if($('#odometer').val() <= odometer) {
							newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : '현재 주행거리보다 작게 입력할 수 없습니다.' });
							valid = false;
							return false;
						}
						
						else {
							if(valid) {
								newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
										{ 'cont' : '주행거리를 수정하시겠습니까?', 'action1' : 'newriver.odometer.confirmProc();' });
							}
						}
					}
				});
			},
			
			confirmProc: function () {
				$('#bForm').basic_post('/mycar/info/proc.do', $('#bForm').serialize(), 'json').done(function (data) {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, 
							{ 'cont' : data.msg, 'action1' : data.code, 'action2' : '$(".layer-back").remove(); location.reload();' });
					
				}).fail(function(){
					console.log(arguments[1]);
				});
			}
		}