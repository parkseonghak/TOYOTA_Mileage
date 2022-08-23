
	
	let quizEvent = newriver.quizEvent = {
		init: function () {
			$(window).on('load', function(){
				quizEvent.setQuiz();
				quizEvent.setAnswer();
				quizEvent.setAnswerInit();
			});
		},
		
		setQuiz: function(){
			$('.btn_submit').off().on('click', function(e){
				
				if($('#answer1').val() == '' || $('#answer2').val() == '' || $('#answer3').val() == '' || $('#answer4').val() == '' ) {
					newriver.ajaxpopup.open('/evncou/custom/scratchPopup/wrong.do', {backgroundClose: false}, {'cont' : '모든 답변을 선택 후 응모 가능합니다.' });
				}
				else {				
					$('#dForm').basic_post('/evncou/custom/quizProc.do', $('#dForm').serialize(), 'json').done(function(data){
						if(data.code == '0000') {
							newriver.ajaxpopup.open('/evncou/custom/scratchPopup/notlogin.do', {backgroundClose: false}, {'cont' : '로그인 후 응모 할 수 있습니다.', 'action1' : '0000', 'action2' : 'location.href="/auth/sign.do?returnUrl=/evncou/custom/quizEvent.do";'});						
						} else if(data.code == '9999'){
							newriver.ajaxpopup.open('/evncou/custom/scratchPopup/wrong.do', {backgroundClose: false}, {'cont' : '이미 응모하신 이벤트 입니다.' });							
						} else if(data.code == '1111') {
							newriver.ajaxpopup.open('/evncou/custom/scratchPopup/wrong.do', {backgroundClose: false}, {'cont' : '정상적으로 응모 되셨습니다.<br/>(맞춘 정답갯수: ' + data.count +'개)' });
						} else {
							newriver.ajaxpopup.open('/evncou/custom/scratchPopup/wrong.do', {backgroundClose: false}, {'cont' : '에러가 발생하였습니다. 다시 참여해주시기 바랍니다.' });
						}
						
						quizEvent.setAnswerInit();
					}).fail(function(){				
						console.log(arguments[1]);
					});
				}
			});
		},
		
		setAnswer: function() {
			$('input[name="quiz01"]').on('click', function(){
				$('#answer1').attr("value",$(this).val());
			});
			
			$('input[name="quiz02"]').on('click', function(){
				$('#answer2').attr("value",$(this).val());
			});
			
			$('input[name="quiz03"]').on('click', function(){
				$('#answer3').attr("value",$(this).val());
			});
			
			$('input[name="quiz04"]').on('click', function(){
				$('#answer4').attr("value",$(this).val());
			});
		},
		
		setAnswerInit: function() {
			$('input[name="quiz01"]').prop('checked', false);
			$('input[name="quiz02"]').prop('checked', false);
			$('input[name="quiz03"]').prop('checked', false);
			$('input[name="quiz04"]').prop('checked', false);
		}
	}
	