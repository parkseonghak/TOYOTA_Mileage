
	let place = newriver.place = {
		init: function () {
			place.placeSearch();
			
			$('#submitBtn').off('click').on('click', function () {
				place.initForm();
			});
		},
		
		initForm: function () {
			$('#page').val('1');
			place.ajaxList('empty');
			$('#loaderDim').fadeOut();
		},
		
		ajaxList: function (type) {
			$('#nForm').basic_post('/toyota/place/listAjax.do', $('#nForm').serialize(), 'html').done(function(data){
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
		
		placeSearch: function () {
			$('#sltOpt li').off('click').on('click', function () {
				$('#srchPlace').val($(this).data('val'));
				$('.selected').text($(this).data('title'));
				
				place.initForm();
			});
		},

		callback : function (result, status) {
			if(status != undefined) {
				$('#currentPlace').text(result[0].address.region_1depth_name+' '+result[0].address.region_2depth_name);
			}
			place.initForm();
		},
		
		callback2 : function () {
			$('#currentPlace').text('서울 강남구');
			place.initForm();
		}
	}
	
	
	
	
	
	
	
	