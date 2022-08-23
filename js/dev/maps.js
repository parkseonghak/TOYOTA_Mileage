
	let getValid = false;
	let nmaps = newriver.nmaps = {
		init : function (targetCallback, targetCallback2) {
			nmaps.getLocation(targetCallback, targetCallback2);
			nmaps.getLocationRefresh(targetCallback, targetCallback2);
		},
		
		getLocationRefresh : function (targetCallback, targetCallback2) {
			$('.btn_refresh').off('click').on('click', function() {
				if((latitude == '37.50168' && longitude == '127.037') || (latitude == '' && longitude == '')) {
					newriver.ajaxpopup.open('/agree/update/locate.do', { backgroundClose : false });
				}
//				if($.cookie('uuid') == '0B537F0A-8F43-45A4-BC4D-92558FE8BFD2' //KILLBE
//					|| $.cookie('uuid') == 'fc77492f2df59131203076865f4f33d1' //QA
//					|| $.cookie('uuid') == '5a551ec319ff7f9760154f44e68b11bc' //QA
//					|| $.cookie('uuid') == '254bce1d73c1625a43671b7b61f011fd' //아이아라
//					|| $.cookie('uuid') == 'FF21DA07-8B16-4700-AD44-31A622CBE523' //아이아라
//					|| $.cookie('uuid') == 'c408a83934781abc8f46a5e0bbf83b20' //sb
//					|| $.cookie('uuid') == '19CB3A32-4956-456C-A307-6012593FCBD8' //ys
//					|| $.cookie('uuid') == 'fc77492f2df59131203076865f4f33d1' //v40
//					|| isPC
//				) {
//				}
				
				nmaps.getLocation(targetCallback, targetCallback2);
			});
		},
		
		getLocation : function (targetCallback, targetCallback2) {
			$('#loaderDim').show();
			setTimeout(function () {
				let lng = $.cookie('longitude');
				let lat = $.cookie('latitude');
				
				lat = latitude == '' ? 37.501639 : latitude;
				lng = longitude == '' ? 127.037881 : longitude;
				
				if(lng != 127.037881 && lat != 37.501639) {
					$('#srchLat').val(lat);
					$('#srchLng').val(lng);
					nmaps.searchDetailAddrFromCoords(lng, lat, targetCallback);
					$('#loaderDim').fadeOut();
				}
				
				else {
					$('#srchLat').val('37.501639');
					$('#srchLng').val('127.037881');
					nmaps.callback(targetCallback2);
					$('#loaderDim').fadeOut();
				}
			}, 1000);
		},
		
		callback: function (callFunction) {
			callFunction();
		},

		searchDetailAddrFromCoords : function (lng, lat, callback) {
			if(typeof daum != 'undefined') {
				let geocoder = new daum.maps.services.Geocoder();
				// 좌표로 법정동 상세 주소 정보를 요청합니다
				geocoder.coord2Address(lng, lat, callback);
			}
		},

		basicMap : function (lat, lng) {
			var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
			var options = { //지도를 생성할 때 필요한 기본 옵션
				center: new daum.maps.LatLng(lat, lng), //지도의 중심좌표.
				level: 1, //지도의 레벨(확대, 축소 정도)
				disableDoubleClickZoom: true,
				draggable: true,
				scrollwheel: true
			};

			var map = new daum.maps.Map(container, options);
			var markerPosition = new daum.maps.LatLng(lat, lng); 

			// 마커를 생성합니다
			var marker = new daum.maps.Marker({
			    position: markerPosition
			});

			// 마커가 지도 위에 표시되도록 설정합니다
			marker.setMap(map);
		}
	}
	
	
	
	
	
	
	
	