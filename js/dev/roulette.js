
	var isRun = false;
	let rouletteEvent = newriver.rouletteEvent = {
		init: function () {
			$(window).on('load', function(){
				$('#header').removeClass('bg').addClass('fullbg')
				rouletteEvent.setRoullet();
			});
		},
		
		setRoullet: function(){
			var flag = false;
			var trg = $('.wheel_trg');
			var img = $('.wheel_img');

			var prizeAngle, prizeName = "";
			
			$('#popComp').removeClass('open');

			trg.one('click', function(){
				if(!flag) {
					flag = true;

					$.ajax({
						url: '/evncou/custom/rouletteProc.do',
						type: 'post',
						dataType : "json",
						success: function(data) {						
							if(data.code == "0000") {					
								prizeAngle = data.prizeAngle;
								prizeName = data.prizeName;
								
								img.css({
									'transform': 'rotate(' + prizeAngle + 'deg)'
								});
								
								$('.prize').html(prizeName);
								
								var prizeImg = $('<img src="/resources/web/images/temp/event/roulette/pop_'+ prizeAngle +'.jpg">');
								var prizeTitile = data.prizeTitle;
								$('.pop_head').append(prizeTitile);
								$('#img').append(prizeImg);
								
								setTimeout(function() {
									$('#popComp').addClass('open');
								}, 4500);						
							} else {
																	
							}
						}
					})
				} 				
			});
			
			$('.btn_confirm').on('click', function(e){
				if (!$(e.target).closest('.pop_inner').length){					
					$('#popComp').removeClass('open');					
				}
				location.href = "/evncou/custom/rouletteEvent.do";
			});
		},
	}
	
	let rouletteComp = newriver.rouletteComp = {
			init: function () {
				$('#header').removeClass('bg').addClass('fullbg')
			},
		}