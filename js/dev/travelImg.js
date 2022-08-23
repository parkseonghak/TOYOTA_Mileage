
	let travelImg = newriver.travelImg = {
		init: function() {
			$(".btnUpFile").bind("click", function() {
				$("#fForm > input[type=file]").data('target', $(this).attr('id'));
				$("#fForm > input[type=file]").click(); 
			});

			$("#fForm > input[type=file]").bind("change", function() {
				let target = $(this).data('target');
				
				 var ext = $(this).val().split('.').pop().toLowerCase();
				 if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
					 alert('gif,png,jpg,jpeg 파일만 업로드 할수 있습니다.');
					 $(this).val("");
					 return;
				 }
				 
				$("#fForm").ajaxSubmit({
					url: "/toyota/travelog/upload.do",
					type: "post",
					dataType: "json",
					contentType: false,
					processData: false,
					success: function(result) {
						if(result.flag) {
							for(var i = 0 ; i < result.files.length ; i++) {
								var file = result.files[i];

								$("#"+target+"_idx").val(0);
								$("#"+target+"_reply_idx").val(0);
								$("#"+target+"_attachFile_rname").val(file.attachFile_rname);
								$("#"+target+"_attachFile_sname").val(file.attachFile_sname);
								$("#"+target+"_file_size").val(file.file_size);
								//$("#"+target+"_imageSort").val(i + 1);
								$("#"+target+"_path").val(file.path);
								$("#"+target+"_newFile").val("Y");								
								$('#'+target+' > .plus').hide();
								$('#'+target+' > .del').show();
								$('#'+target).css('background-image', "url('/upload/temp/"+file.path + file.attachFile_sname+"')");
							}
						}
					},
					error: function(jqXHR) {
						console.log(jqXHR.responseText);
					}
				});
				
				$(this).val("");
			});

			$(".btnDelFile").bind("click", function(e) {
				e.stopPropagation();
				
				let target = $(this).data('target');
				let parameter = { 
					"idx" : $("#"+target +" > input[name=idx]").val(), 
					"path" : $("#"+target +" > input[name=path]").val(), 
					"attachFile_sname" : $("#"+target +" > input[name=attachFile_sname]").val() 
				};
				
				$.ajax({
					url: "/toyota/travelog/delete.do",
					type: "post",
					data: parameter,
					dataType: "json",
					success: function(result) {
						//newriver.ajaxpopup.open('/agree/modal/alert.do', { backgroundClose : false }, { 'cont' : result.msg });

						if(result.flag) {
							$("#"+target+"_idx").val("0");
							$("#"+target+"_reply_idx").val("0");
							$("#"+target+"_attachFile_rname").val("");
							$("#"+target+"_attachFile_sname").val("");
							$("#"+target+"_file_size").val("0");
							$("#"+target+"_imageSort").val("0");
							$("#"+target+"_path").val("");
							$("#"+target+"_newFile").val("");
							$('#'+target).css('background-image', '');
							$('#'+target + ' > .plus').show();
							$('#'+target + ' > .del').hide();
						}
					},
					error : function(request, status, error) {
						console.log("code : " + request.status + "\nmessage : " + request.responseText + "\nerror : " + error);
					}
				});
			});
		},

		/**
		 * #JQUERY
		 * 용량 단위
		 * @return {String}
		 *
		 */
		formatFileSize: function(value) {
			var size = value,
				count = 0,
				unit = "B";

			if(size > 1024) {
				while(size > 1024 && count < 8) {
					size = size / 1024;
					count++;
				}
			}

			switch(count) {
				case 1 :
					unit = "KB";
					break;
				case 2 :
					unit = "MB";
					break;
				case 3 :
					unit = "GB";
					break;
				case 4 :
					unit = "TB";
					break;
				case 5 :
					unit = "PB";
					break;
				case 6 :
					unit = "EB";
					break;
				case 7 :
					unit = "ZB";
					break;
				case 8 :
					unit = "YB";
					break;
				default : break;
			}

			size = size.toString().indexOf(".") > -1 ? size.toFixed(1) : size;

			return size + " " + unit;
		}

	};
