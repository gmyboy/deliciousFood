<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
								                    <li class="form-item">
											  			<input class="input-text" type="password" autocomplete="off" style="display: none;"/>
											  		</li>
								                    <li class="form-item form-item-user">
												        <label class="form-label" for="userName"><span class="remind-span">*</span><span class="langbox" data-lang="userName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix">
													        	<input class="input-text" type="text" id="userName" name="userName" autocomplete="off" />
													        	<span class="f-resetPassword hidden"><a id="resetPassword" href="javascript:;" data-lang="resetPassword"></a></span>
													        </div>
												        </div>
											        </li>
											        
								                    <li id="J_password" class="form-item form-item-password">
												        <label class="form-label" for="password"><span class="remind-span">*</span><span class="langbox" data-lang="password"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="password" id="password" name="password" autocomplete="off" /></div>
												        </div>
											        </li>
								                    <li class="form-item form-item-password">
												        <label class="form-label" for="password1"><span class="remind-span">*</span><span class="langbox" data-lang="passwordComfirm"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
												        	<div class="f-fix">
													        	<input class="input-text" type="password" id="password1" name="password1" autocomplete="off" />
													        </div>
												        </div>
											        </li>
											        <li class="form-item form-item-fullName">
												        <label class="form-label" for="fullName"><span class="remind-span">*</span><span class="langbox" data-lang="employeeName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="fullName" name="fullName" autocomplete="off" /></div>
												        </div>
											        </li>
											        <li class="form-item">
				        								<label class="form-label" for="roleId"><span class="remind-span">*</span><span class="langbox" data-lang="roleName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
								                        	<div class="f-fix" id="J_RoleItems"></div>
								                        </div>
											        </li>
										        </ul>
									        </div>
								        </fieldset>
								        <div class="actions actions-style">
								        	<button type="submit" class="btn btn-success" id="J_Submit"><span><span data-lang="buttonSubmit"></span></span></button>
					                        <a href="/page/user/userList.jsp?menuNO=1100" class="btn btn-default J_PreviousLink" id="J_Cancel"><span><span data-lang="buttonCancel"></span></span></a>
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
    (function () {
    	/* 执行页面公共方法 */
    	var page = new Page({
    		menuOpts:{showMenuType:[1, 2, 8, 9]}
    	});
    	
    	page.setCurrentPageUrl();
    	
    	var param = page.getUrlParams(),
    		menuNO = Common.stringToNumber(param.menuNO),
	        id = param.id,
	        userName = '',
			data = null,
			
		$form = $('#J_PostForm');
    	
    	$('#userName').val('');
    	$('#password').val('');
    	$('#password1').val('');

    	setFormAction();
    	
    	if (isEditPage()) {
    		editHandler();
	    }
	
	    formEvents();
	
		//判断是否为编辑页面
	    function isEditPage(){
	    	return id;
	    }
	    
	    //生成选择角色按钮
	    setRadioList();
	    
	    
	    //编辑处理函数
	    function editHandler(){
	        data = Common.getDataByAjax("/androidManager/userAction!getById.do", {'id': id});
	        if(data){
	        	userName = data.userName;
		        fullName = data.fullName;
		        setFormValues(data);  
		        $('.f-resetPassword').removeClass('hidden');   	
	        }
	
	        Common.addHiddenField(getPostFields(), $form);
	        
	        $('#password').val('');
	        $('#password1').val('');
	        $('#password').parents('li').eq(0).hide();
	        $('#password1').parents('li').eq(0).hide();
	    }
	    
	    $('#resetPassword').click(function(){
	    	$('#password').val('');
	        $('#password1').val('');
	        $('#password').parents('li').eq(0).toggle();
	        $('#password1').parents('li').eq(0).toggle();
	    });
	    
		//设置表单的action
	    function setFormAction(){
	    	var url = '';
	    	//新增
	    	if(menuNO === 1120){
	    		url = '/androidManager/userAction!add.do';
	    	}
	    	//修改
			if(menuNO === 1110){
	    		url = '/androidManager/userAction!update.do';
	    	}
			$form.attr('action', url);
	    }
	    
		//获取隐藏域的字段对象
		function getPostFields(){
			var postFields = { 'id': id, 'userName': userName };
	        return postFields;
		}
				
		//设置表单值
		function setFormValues(data){
			if(!data){
				return;
			}
			var disabled = data['isDefault'] ? true : false,
				disabledClass = disabled ? 'disabled' : '';
			
			$('#userName').val(data['userName']);
			$('#password').val(data['password']);
			$('#password1').val(data['password']);
			
			Common.fillValueToElement(data);
			
	        $("#userName").attr('disabled', true).addClass('disabled');
		}
		
		//表单事件
	    function formEvents(){
		    $form.validate({
		        rules: {
		            userName: "required",
		            password : {
		            	required : true,
						letterAndNumber: true,
						specialCharacters: true,
						rangelength : [ 8, 20 ]
					},
		            password1: {
		                required: true,
		                equalTo: '#password'
		            },
		            fullName: "required",
		            phone:{
		            	required:true,
		            	mobile:true
		            },
		            id: "required",
		        },
		        messages:{
		        	password1: {
                    	equalTo: Lang.msgPasswordContracePasswordComfirm
                    }
		        },
		        submitHandler: function (form) {
		        	var url = $form.attr('action'),
		                data = $.extend($form.serializeObject(), getIdsData());
		        	if(data.password != null){
		        		data.password = $.md5(data.password);
			        	delete data.password1;
	        		}
	        		
	        		$(".actions-style").append('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingSubmitData+'</span>');
	 	            $("#J_Submit").attr('disabled', true).addClass('disabled');
	 	            $("#J_Cancel").attr('disabled', true).addClass('disabled');
	        		
		            Common.getDataByAjax(url, data, function(res){
						if(res.success){
                        	msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
	                        	if(param['autoClose']){
	                        		window.opener = null;  
	                                window.open('','_self','');  
	                        		window.close();
	                        	}else{
	                        		Common.jump("/page/user/userList.jsp?menuNO=1100");
	                        	}
                        	});
	                    }else{
	                     		simpleDialog(res.msg);
	                     		$("#J_Submit").attr('disabled', false).removeClass('disabled');
				 	            $("#J_Cancel").attr('disabled', false).removeClass('disabled');
				 	            $(".text-primary").remove();
	                    }            	
					});
		        }
		    });
		}
		
		//获取角色值的对象
	    function getIdsData(){
	    	var ids = [];    	
	    	var $objs = $('#J_RoleItems input:checked');
	    	
	    	$.each(
	    		$objs,
	    		function(i, obj){
	    			ids.push($(obj).val());
	    		}
	    	);
	    	return {'roleIds': ids.join(',')};
	    }
		
		
		//生成radio
		function setRadioList(){
			var $checkboxElement = $("#J_RoleItems"),
	    		url = '/androidManager/roleAction!roleList.do',
				data = Common.getDataByAjax(url, {'page':1, 'rows':10000}),
				list = data ? data.rows : null,
				isDisabled = data.isDefault ? true : false;
        
	        if(!list){
	        	return;
	        }
        
			Common.setRadioByList(list, ['id', 'roleName','','roleDescription'], $checkboxElement, getIdsArray(), isDisabled);
		}
		
		//获取对应的ID并存放在数组里
		function getIdsArray(){
			if(!id) {
				return null;
			}
			var url = '/androidManager/roleAction!getRoleListByUserId.do',
				data = Common.getDataByAjax(url, {'userId': id}),
				list = data ? data.rows : null,
				idsArray = [];
							
            if (!list) {
            	return;
            }
            $.each(
				list,
				function (index, value) {
				    idsArray.push(value.id);
				}
			);
			return idsArray;
		}
    })();
</script>
</html>