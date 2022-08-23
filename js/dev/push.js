
	let push = newriver.push = {
		init : function () {
			push.readUpdate();
		},
		
		ajaxList: function (type) {
			$('#sForm').basic_post('/alert/listAjax.do', $('#sForm').serialize(), 'html').done(function(data){
				if(type === 'empty') {
					$('#dataList').empty().append(data);
				}
				else {
					$('#dataList').append(data);
				}
				
				$('.btn_view').off('click').on('click', function () {
					$(this).find('.cont').slideToggle(600);
				});
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		readUpdate: function () {
			$('#sForm').basic_post('/alert/updateRead.do', $('#sForm').serialize(), 'html').done(function(data){
			}).fail(function(){
				console.log(arguments[1]);
			});
		}

	}
