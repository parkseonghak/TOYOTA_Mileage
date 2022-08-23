
	let manual = newriver.manual = {
		init: function () {			
			$('#submitBtn').off('click').on('click', function () {
				manual.initForm();
			});
			
			$('#sltCarName').off('change').on('change', function(){
				manual.initForm();
			});
		},
		
		initForm: function () {			
			manual.ajaxList('empty');
			
		},
		
		ajaxList: function (type) {
			$('#nForm').basic_post('/models/manual/listAjax.do', $('#nForm').serialize(), 'html').done(function(data){
				if(type === 'empty') {
					$('#dataList').empty().append(data);
				}
				else {
					$('#dataList').append(data);
				}
			}).fail(function(){
				console.log(arguments[1]);
			});
		}
	}
	
	
	
	
	
	
	
	