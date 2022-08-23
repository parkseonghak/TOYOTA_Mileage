
	let board = newriver.board = {
		init : function () {
			board.typeSearch();
			
			$('#submitBtn').off('click').on('click', function () {
				board.ajaxList('empty');
			});
		},
		
		initForm: function () {
			$('#page').val('1');
			board.ajaxList('empty');
		},
		
		ajaxList: function (type) {
			let tmpdr = $('#tmpdr').val();
			
			$('#nForm').basic_post(tmpdr+'/listAjax.do', $('#nForm').serialize(), 'html').done(function(data){
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
		
		typeSearch: function () {
			// toyota > news
			$('#tabArea1 ul li').off('click').on('click', function () {
				$('#srchType').val($(this).data('val'));
				$(this).addClass('on').siblings().removeClass('on');
				
				board.initForm();
			});
			
			// event/coupon > event
			$('#tabArea2 ul li').off('click').on('click', function () {
				$('#srchEnd_yn').val($(this).data('val'));
				$(this).addClass('on').siblings().removeClass('on');
				
				board.initForm();
			});
		}
	}
	
	
	
	
	
	
	
	