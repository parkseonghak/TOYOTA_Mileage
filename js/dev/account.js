
	let account = newriver.account = {
		init : function () {
			account.view();
			account.proc();
			account.remove();
			
			$('.type_change').off('click').on('click', function () {
				$(this).addClass('on').siblings().removeClass('on');
				
				$('#page').val('1');
				$('#srchType').val($(this).data('val'));
				
				account.ajaxList('empty');
			});
		},
		
		proc: function () {
			let msg = '차계부를 등록하시겠습니까?';
			
			if ($('#idx').val() > 0) {
				msg = '차계부를 수정하시겠습니까?';
			}
			
			$('#procAccount').off('click').on('click', function () {
				if($(this).hasClass('c5')) {
					newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
							{ 'cont' : msg, 'action1' : 'newriver.account.confirmProc();' });
				}
			})
		},
		
		confirmProc: function () {
			if($('#l_amt').val() == '') {
				$('#l_amt').val(0);
			}
			if($('#l_amount').val() == '') {
				$('#l_amount').val(0);
			}
			
			$('#nForm').basic_post('/mycar/account/proc.do', $('#nForm').serialize(), 'json').done(function (data) {
				newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, 
						{ 'cont' : data.msg, 'action1' : data.code, 'action2' : 'location.href = \'/mycar/account/info.do?prev=complete\'' });
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		remove: function () {
			$('.delete').off('click').on('click', function (e) {
				e.stopPropagation();
				
				let idx = $(this).data('val');
				newriver.ajaxpopup.open('/agree/modal/confirm.do', { backgroundClose : false }, 
						{ 'cont' : '차계부를 삭제하시겠습니까?', 'action1' : 'newriver.account.confirmRemove('+idx+');' });
			})
		},
		
		confirmRemove: function (idx) {
			$('#idx').val(idx);
			$('#sForm').basic_post('/mycar/account/delete.do', $('#sForm').serialize(), 'json').done(function (data) {
				newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, 
						{ 'cont' : data.msg, 'action1' : '0000', 'action2' : '$(\'#sForm\').submit();' });
				
			}).fail(function(){
				console.log(arguments[1]);
				
			});
		},
		
		ajaxList: function (type) {
			$('#sForm').basic_post('/mycar/account/listAjax.do', $('#sForm').serialize(), 'html').done(function(data){
				if(type === 'empty') {
					$('#dataList').empty().append(data);
				}
				else {
					$('#dataList').append(data);
				}
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		view: function () {
			$('.view').off('click').on('click', function () {
				let idx = $(this).data('idx');
				location.href = '/mycar/account/write.do?idx='+idx;
			});
		}
	}

	let accountWrite = newriver.accountWrite = {
		init : function (type) {
			newriver.accountWrite.selectDelete();
			
			$('.numberText').on('focusin focusout keyup keydown', function () {
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
			
			$('.validText').on('focusin focusout keyup keydown', function () {
				accountWrite.validation(type);
			});
		},
		
		validation: function (type) {
			let valid = true;
			
			if ($('#odometer').val() == '' || $('#datePick_dev').val() == '' || $('#amt').val() == '') {
				valid = false;
			}
			
			if ($('#odometer').val() == 0 || $('#amt').val() == 0) {
				valid = false;
			}
			
			if(type == '13102') {
				if($('#contents').val() == '' || $('#selects').val() == '') {
					valid = false;
				}
			}
			
			else if(type == '13103') {
				if($('#contents').val() == '') {
					valid = false;
				}
			}
			
			if(valid) {
				$('#procAccount').addClass('c5').removeClass('c4');
			} else {
				$('#procAccount').removeClass('c5').addClass('c4');
			}
			
			return valid;
		},
		
		tunePopupCallback: function (arr_sum) {
			let arr_cd = []
				,arr_nm = []
				,top_nm = ''
				,htm = '';
			
			if (arr_sum.length > 0) {
				for (let ob of arr_sum) {
					arr_cd.push(ob.split(':::')[0]);
					arr_nm.push(ob.split(':::')[1]);
					
					htm += '<li>'+ob.split(':::')[1]+'<button type="button" class="btn_del selectDel" data-cd="'+ob.split(':::')[0]+'" data-nm="'+ob.split(':::')[1]+'">삭제</button></li>';
					
					if(arr_cd.indexOf('13212') > -1) {
						$('#etc').val(ob.split(':::')[1]);
					}
				}
				
				top_nm = arr_nm[0];
				if(arr_nm.length > 1) {
					top_nm = top_nm + ' 외 ' + (arr_nm.length-1);
				}
				
				$('#selects').val(arr_cd);
				$('#contents').val(top_nm);
				$('#contents_span').text(top_nm);
				$('#selectList').empty().append(htm);
				$('.popupTune').addClass('selected');
				
				newriver.accountWrite.validation('13102');
				newriver.accountWrite.selectDelete();
			}
		},
		
		selectDelete: function () {
			$('.selectDel').off('click').on('click', function () {
				$(this).parent().remove();
				
				if($('#selectList li').length > 0) {
					let top_nm = '', arr_cd = [];
					$('#selectList li').each(function (i) {
						arr_cd.push($(this).children().data('cd'));
						if(i == 0) {
							top_nm = $(this).children().data('nm');
							top_nm += $('#selectList li').length > 1 ? ' 외 ' + ($('#selectList li').length-1) : '';
							$('#contents').val(top_nm);
							$('#contents_span').text(top_nm);
						}
						
						if($(this).children().data('cd') == '13212') {
							$('#etc').val('');
						}
					});
					$('#selects').val(arr_cd);
					$('.popupTune').addClass('selected');
					
				} else {
					$('#selects').val('');
					$('#contents_span').text('정비 항목을 선택하세요.');
					$('#contents').val('');
					$('#etc').val('');
					$('.popupTune').removeClass('selected');
				}
				
				newriver.accountWrite.validation('13102');
			});
		}
		
	}
	
	
	
	
	
	
	
	