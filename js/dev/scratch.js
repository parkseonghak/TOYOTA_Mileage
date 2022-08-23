
	var isRun = false;
	let scratchEvent = newriver.scratchEvent = {
		init: function () {
			$(window).on('load', function(){
				scratchEvent.setScratch();
			});
		},
		
		setScratch: function(){
			let fileName = $('#product_file_name').val();
			
			$('.scratch_area').wScratchPad({
				bg: '/resources/web/images/temp/event/scratch/'+fileName+'.jpg',
				fg: '/resources/web/images/temp/event/scratch/scratch_area.jpg',
				scratchMove: function (e, percent) {
					if ( percent > 50 ) {
						if( isRun == false ) {
							isRun = true;								
							this.clear();							
							scratchEvent.eventProc();													
						}
					}
				},
				size: 40
			});
		},
		
		eventProc: function(){			
			$('#nForm').basic_post('/evncou/custom/scratchEventProc.do', $('#nForm').serialize(), 'json').done(function (data) {
				if(data.code == "0000") {
					location.href="/evncou/custom/scratchWin.do?idx=" + data.idx
				} else {			
					newriver.ajaxpopup.open('/evncou/custom/scratchInputKey/wrong.do', {backgroundClose: false}, {'cont' : data.msg});
				}
			}).fail(function(){
				console.log(arguments[1]);
			});	
		}
	}
	
	let scratchWin = newriver.scratchWin = {
			init: function () {
				$('#btn_sc_confirm').on('click', function () {
					newriver.ajaxpopup.open('/evncou/custom/scratchPopup/confirm.do', {backgroundClose: false}, {'action1' : 'newriver.scratchWin.compSC();'});
				});
			},
			
			compSC: function(){
				$('#nForm').basic_post('/evncou/custom/scratchEventCsCheckProc.do', $('#nForm').serialize(), 'json').done(function (data) {
					location.href="/evncou/custom/scratchWin.do?idx=" + data.idx
				}).fail(function(){
					console.log(arguments[1]);
				});
			}
		}