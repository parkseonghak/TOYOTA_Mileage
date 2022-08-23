
	let main = newriver.main = {
		init: function () {
		},
		
		ajaxPlace: function () {
			$('#nForm').basic_post('/main/place.do', $('#nForm').serialize(), 'json').done(function(data){
				let folder = data.place.fileInfo.folder;
				let fileName = data.place.fileInfo.sf_nm
				let fullName = '/upload/'+folder+'/'+fileName;
				
				$('#place_img').css('background-image', 'url("'+fullName+'")');
				$('#place_tit').text(data.place.subject);
				$('#place_sdate').text('영업시간  '+data.place.sdate);
				//$('#place_link').attr('href', '/models/demo/info.do');
				$('#place_link').attr('href', '/toyota/place/view.do?idx='+data.place.idx);
				$('#place_numbers').attr('href', 'tel:'+data.place.numbers);
				$('#loaderDim').fadeOut();
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		ajaxCenter: function () {
			$('#nForm').basic_post('/main/center.do', $('#nForm').serialize(), 'json').done(function(data){
				$('#center_tit').text(data.center.subject);
				$('#center_sdate').text('영업시간  '+data.center.sdate);
				//$('#center_link').attr('href', '/service/center/step1.do?idx='+data.center.idx);
				$('#center_numbers').attr('href', 'tel:'+data.center.numbers);
				$('#loaderDim').fadeOut();
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		callback: function (result, status) {
			$('#addressFull').text(result[0].address.region_1depth_name+' '+result[0].address.region_2depth_name+' '+result[0].address.region_3depth_name);
			$('#sidoName').val(result[0].address.region_1depth_name);
			$('#address').val(result[0].address.region_2depth_name);
			
			main.openApicall();
			main.ajaxPlace();
			if($('.service').length > 0) main.ajaxCenter();
			
			$('#loaderDim').fadeOut();
		},
		
		callback2: function () {
			$('#address').text('서울 강남구 역삼동');
			$('#sidoName').val('서울');
			$('#address').val('강남구');
			
			main.openApicall();
			main.ajaxPlace();
			if($('.service').length > 0) main.ajaxCenter();
			
			$('#loaderDim').fadeOut();
		},
		
		openApicall: function () {
			main.fineDust();
			main.findTemper();
			$('#loaderDim').fadeOut();
		},
		
		fineDust: function () {
			$('#nForm').basic_post('/main/fineDust.do', $('#nForm').serialize(), 'json').done(function(data){
				if(data.pm10Grade1hText.length > 0) {
					$('.fineDustTxt').text('미세먼지 농도 : '+data.pm10Grade1hText).addClass('m-active');
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		},
		
		findTemper: function () {
			$('#nForm').basic_post('/main/findTemper.do', $('#nForm').serialize(), 'json').done(function(data){
				if(data.temper.length > 0) {
					$('.findTemper').text(data.temper).addClass('hit');
				}
				
			}).fail(function(){
				console.log(arguments[1]);
			});
		}
	}
	