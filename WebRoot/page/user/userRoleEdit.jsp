<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="../base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="../base/include.jsp"></jsp:include>
</head>
<body class="sys sys-user-role sys-user-role-edit">
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
                            <div class="box box-set-user-role" id="J_Box">
						        <div class="box-body" id="J_BoxBody">
							        <div class="form-box" data-rule="resize">
							        <form method="post" class="form" id="J_PostForm">
							            <fieldset class="fieldset">
							            	<legend class="legend" data-lang="userRoleInfo"></legend> 
								            <div class="form-group form-grid form-group-set-user-role">
										        <ul class="list-unstyled">
								                     <li class="form-item form-item-user-name">
				        								<label class="form-label" for="userName"><span class="langbox" data-lang="userName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="userName" name="userName" /></div>
												        </div>
											        </li>
								                    <li class="form-item">
				        								<label class="form-label" for="roleId"><span class="langbox" data-lang="roleName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
								                        	<div class="f-fix" id="J_RoleItems"></div>
								                        </div>
											        </li>
										        </ul>
									        </div>
								        </fieldset>
								        <div class="actions actions-style">
								        	<button type="submit" class="btn btn-success" id="J_Submit"><span><span data-lang="buttonSubmit"></span></span></button>
					                        <a href="#" class="btn btn-default J_PreviousLink" id="J_Cancel" data-url="UserList"><span><span data-lang="buttonCancel"></span></span></a>
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
    		menuNO = Common.stringToNumber(param['menuNO']),
	        id = param['id'],
			data = null,
			$form = $('#J_PostForm');
    	
    	var loginData = new LoginData();
    	var userId = loginData.getUserId();

    	setFormAction();
    	
    	if (isEditPage()) {
    		editHandler();
	    }
    	
    	if(userId == 1){
    		setCheckboxList();
    	}else{
    		setRadioList();
    	}
    	
	    formEvents();
	    

	    //判断是否为编辑页面
	    function isEditPage(){
	    	return (menuNO === MenuNumber.UserRoleEdit) && id;
	    }
	    
	    //编辑处理函数
	    function editHandler(){
	        data = Common.getDataByAjax(URL.GetUserById, {'id': id});
	        
	        if(data){
		        setFormValues(data);        	
	        }
	    }
		
	    //设置表单的action
	    function setFormAction(){
	    	var url = '';
			if(menuNO === MenuNumber.UserRoleEdit){
	    		url = URL.EditUserRole;
	    	}
			
			$form.attr('action', url);
	    }
	    
	    //设置表单值
	    function setFormValues(data) {
	        if (!data) {
	            return;
	        }
	
	        $('#userName').val(data.userName).attr('disabled', true).addClass('disabled');
	    }
	
	    //获取隐藏域的字段对象
	    function getPostFields() {
	        var postFields = { 'id': id };
	        return postFields;
	    }

	    //表单事件
	    function formEvents(){
	    	$form.validate({
		        rules: {
		        	roleName: "required"
		        },
		        submitHandler: function (form) {
		            var url = $form.attr('action'),
		                data = $.extend(getPostFields(), getIdsData());
		                jumpUrl = Common.pieceUrl(URL.UserList);
					
		            Common.getDataByAjax(url, data, function(res){
						if(res.success){
                        msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
                            Common.jump(jumpUrl);
                        });
                    }else{
                      simpleDialog(res.msg);
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
	    		url = URL.GetRoleList,
				data = Common.getDataByAjax(url, {'page':1, 'rows':10000}),
				list = data ? data.rows : null,
				isDisabled = data.isDefault ? true : false;
        
	        if(!list){
	        	return;
	        }
        
			Common.setRadioByList(list, ['id', 'roleName','','roleDescription'], $checkboxElement, getIdsArray(), isDisabled);
		}
	  	
	  	//生成checkbox
	  	function setCheckboxList(){
	  		var $checkboxElement = $("#J_RoleItems"),
    		url = URL.GetRoleList,
			data = Common.getDataByAjax(url, {'page':1, 'rows':10000}),
			list = data ? data.rows : null,
			isDisabled = data.isDefault ? true : false;
    
	        if(!list){
	        	return;
	        }
	    
			Common.setCheckboxByList(list, ['id', 'roleName','','roleDescription'], $checkboxElement, getIdsArray(), isDisabled);
	  	}
		
		//获取对应的ID并存放在数组里
		function getIdsArray(){
			if(!id) {
				return null;
			}
			
			var url = URL.GetRoleListByUserId,
				data = Common.getDataByAjax(url, {'page':1, 'rows':10000, 'userId': id}),
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