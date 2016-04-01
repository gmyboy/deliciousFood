<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="../base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="../base/include.jsp"></jsp:include>
</head>
<body class="sys sys-user sys-user-edit">
	<div class="loading-page" id="J_LoadPage"></div>
	<div class="content-page" id="J_ContentPage">
		<!--E 页头-->
		<jsp:include page="../base/header.jsp"></jsp:include>
		<!--E 页头-->

		<!--S 主体二栏左布局-->
		<div class="main" id="J_Main">
			<div class="wrapper">
				<div class="layout layout-col-two-left" id="J_MainLayout">
					<div class="col-main" id="J_ColMain">
						<div class="col-main-wrapper">
							<div class="shell" id="J_Shell"></div>
							<div class="box box-set-user" id="J_Box">
								<div class="box-body" id="J_BoxBody">
									<div class="form-box" data-rule="resize">
										<form method="post" class="form" id="J_PostForm">
											<fieldset class="fieldset">
												<legend class="legend" data-lang="userInfo"></legend>
												<div class="form-group form-grid form-group-set-user">
													<ul class="list-unstyled">
														<li class="form-item"><input class="input-text"
															type="password" autocomplete="off" style="display: none;" />
														</li>
														<li class="form-item form-item-user"><label
															class="form-label" for="userName"><span
																class="remind-span">*</span><span class="langbox">服务器地址</span><span
																class="langbox" data-lang="commonColon"></span>
														</label>
															<div class="form-element">
																<div class="f-fix">
																	<input class="input-text" type="text" id="serverUrl" name="serverUrl" autocomplete="off" /> 
																</div>
															</div></li>
														<li class="form-item"><label class="form-label"
															for="roleId"><span class="remind-span">*</span><span
																class="langbox">状态</span><span class="langbox"
																data-lang="commonColon"></span>
														</label>
															<div class="form-element">
																<ul class="form-multiple-list form-multiple-grid">
																	<li class="form-multiple-item">
																		<label for="roleName0" class="form-multiple-label text-overflow" title="超级管理员">
																			<input class="radio" id="status1" name="status" value="1"   type="radio" checked="checked" >
																			<span class="checkbox-text">启用</span><br> <span
																	</label></li>
																	<li class="form-multiple-item">
																		<label for="roleName7bbb0b8dbe664851a62b555040f886b7" class="form-multiple-label text-overflow" title="aofl">
																			<input class="radio" id="status0" name="status" value="0" type="radio">
																			<span class="checkbox-text">停用</span><br>
																		</label>
																	</li>
																</ul>
															</div></li>
													</ul>
												</div>
											</fieldset>
											<div class="actions actions-style">
												<button type="submit" class="btn btn-success" id="J_Submit">
													<span><span data-lang="buttonSubmit"></span>
													</span>
												</button>
												<a href="/page/server/serverList.jsp?menuNO=4100" class="btn btn-default J_PreviousLink" id="J_Cancel">
													<span><span data-lang="buttonCancel"></span>
												</span>
												</a>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="sidebar col-left" id="J_ColLeft">
						<jsp:include page="../base/left.jsp"></jsp:include>
					</div>
				</div>
			</div>
		</div>
		<!--E 主体二栏左布局-->

		<!--S 页脚-->
		<jsp:include page="../base/footer.jsp"></jsp:include>
		<!--E 页脚-->

	</div>
</body>

<script>
	(function() {
		/* 执行页面公共方法 */
		var page = new Page({
			menuOpts : {
				showMenuType : [ 1, 2, 8, 9 ]
			}
		});
		page.setCurrentPageUrl();

		var param = page.getUrlParams(), menuNO = Common.stringToNumber(param.menuNO), id = param.id, userName = '', data = null,


		$form = $('#J_PostForm');

		$('#serverUrl').val('');

		setFormAction();

		if (isEditPage()) {
			editHandler();
		}
	    formEvents();
		//判断是否为编辑页面
		function isEditPage() {
			return id;
		}

		//编辑处理函数
		function editHandler() {
			data = Common.getDataByAjax("/androidManager/serverAction!getById.do", {
				'id' : id
			});
			if (data) {
				serverUrl = data.serverUrl;
				status = data.status;
				if(status==0){
					$("#status0").attr("checked","checked");
				}else{
					$("#status1").attr("checked","checked");
				}
				setFormValues(data);
				$('.f-resetPassword').removeClass('hidden');
			}

			Common.addHiddenField(getPostFields(), $form);

		}


		//获取隐藏域的字段对象
		function getPostFields() {
			var postFields = {
				'id' : id
			};
			return postFields;
		}

		//设置表单值
		function setFormValues(data) {
			if (!data) {
				return;
			}
			var disabled = data['isDefault'] ? true : false, disabledClass = disabled ? 'disabled' : '';
			$('#serverUrl').val(data['serverUrl']);

			Common.fillValueToElement(data);
		}
		//设置表单的action
	    function setFormAction(){
	    	var url = '';
	    	//新增
	    	if(menuNO === 4130){
	    		url = '/androidManager/serverAction!add.do';
	    	}
	    	//修改
			if(menuNO === 4110){
	    		url = '/androidManager/serverAction!update.do';
	    	}
			$form.attr('action', url);
	    }
		//表单事件
		function formEvents() {
			$form.validate({
						rules : {
							serverUrl : "required"
						},
						submitHandler : function(form) {
							var url = $form.attr('action'),
							// 		                data = $form.serializeObject();
							data = $.extend($form.serializeObject(),getIdsData());
							Common.getDataByAjax(url, data, function(res){
								if(res.success){
		                        msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
		                        	if(param['autoClose']){
		                        		window.opener = null;  
		                                window.open('','_self','');  
		                        		window.close();
		                        	}else{
		                        		Common.jump("/page/server/serverList.jsp?menuNO=4100");
		                        	}
		                        });
			                    }else{
			                      simpleDialog(res.msg);
			                    }		            	
							});
						}
					});
		}

		//获取角色值的对象
		function getIdsData() {
			var ids = [];
			var val_payPlatform = $('input:radio:checked').val(); 
			return {
				'status' : val_payPlatform
			};
		}

	})();
</script>
</html>