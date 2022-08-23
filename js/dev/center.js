
	let center = newriver.center = {
		init: function () {
			center.placeSearch();
		},
		
		initForm: function () {
			$('#page').val('1');
			center.ajaxList('empty');
		},
		
		placeSearch: function () {
			$('#sltOpt li').off('click').on('click', function () {
				$('#srchPlace').val($(this).data('val'));
				$('.selected').text($(this).data('title'));
				
				center.initForm();
			});
		},
		
		ajaxList: function (type) {
			$('#nForm').basic_post('/service/center/listAjax.do', $('#nForm').serialize(), 'html').done(function(data){
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
		
		callback : function (result, status) {
			if(status != undefined) {
				$('#currentPlace').text(result[0].address.region_1depth_name+' '+result[0].address.region_2depth_name);
			}
			center.initForm();
			$('#loaderDim').fadeOut();
		},
		
		callback2 : function () {
			$('#currentPlace').text('서울 강남구');
			center.initForm();
			$('#loaderDim').fadeOut();
		}
	}
	
	let apply = newriver.apply = {
		init: function () {
			newriver.loginAction();
		},
		
		step1_validation: function () {
			let valid = true;
			
			if ($('#datePick_dev').val() == '') {
				valid = false;
			}
			
			/*
			if ($('#apply_tm').val() == '') {
				valid = false;
			}
			*/
			
			if (valid) {
				$('#nextStep').addClass('c2').removeClass('c1');
			} else {
				$('#nextStep').addClass('c1').removeClass('c2');
			}
			
			return valid;
		},
		
		step2_validation: function () {
			let valid = true;

			if($('.inspect_type:checked').length == 0) {
				valid = false;
			}
			
			if (valid) {
				$('#nextStep').addClass('c2').removeClass('c1');
			} else {
				$('#nextStep').addClass('c1').removeClass('c2');
			}
			
			return valid;
		},
		
		proc: function () {
			$('#nextStep').off('click').on('click', function () {
				if(apply.step2_validation() && $(this).hasClass('c2')) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : $('#center_name').text()+'<br>예약 신청을 하시겠습니까?', 'action1' : 'newriver.apply.confirmProc();' });
				}
			});
		},
		
		confirmProc: function () {
			$('#nForm').basic_post('/service/center/proc.do', $('#nForm').serialize(), 'json').done(function (data) {
				if (data.code === '0000') {
					location.href = "/service/center/complete.do?idx="+data.idx;
				} else {
					newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : data.msg });
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		}
	}
	
	
	
	
	
	