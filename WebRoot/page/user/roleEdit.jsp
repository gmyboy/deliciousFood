<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="../base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="../base/include.jsp"></jsp:include>
</head>
<body class="sys sys-role sys-role-edit">
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
                            <div class="box box-set-role" id="J_Box">
						        <div class="box-body" id="J_BoxBody">
							        <div class="form-box" data-rule="resize">
							        	<form method="post" class="form" id="J_PostForm">
								            <fieldset class="fieldset">
								            	<legend class="legend" data-lang="roleInfo"></legend> 
									            <div class="form-group form-grid form-group-set-user">
											        <ul class="list-unstyled">
									                    <li class="form-item form-item-role-name">
													        <label class="form-label" for="roleName"><span class="remind-span">*</span><span class="langbox" data-lang="roleName"></span><span class="langbox" data-lang="commonColon"></span></label>
													        <div class="form-element">
														        <div class="f-fix"><input class="input-text" type="text" id="roleName" name="roleName" /></div>
													        </div>
												        </li>
												        <li class="form-item form-item-role-description">
													        <label class="form-label" for="roleDescription"><span class="langbox" data-lang="roleDescription"></span><span class="langbox" data-lang="commonColon"></span></label>
													        <div class="form-element">
									                            <div class="f-fix"><textarea class="textarea" id="roleDescription" name="roleDescription"></textarea></div>
													        </div>
												        </li>
											        </ul>
										        </div>
									        </fieldset>
									        <div class="actions actions-style">
									        	<button type="submit" class="btn btn-success" id="J_Submit"><span><span data-lang="buttonSubmit"></span></span></button>
						                        <a href="/page/user/roleList.jsp?menuNO=1200" class="btn btn-default J_PreviousLink" id="J_Cancel"><span><span data-lang="buttonCancel"></span></span></a>
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

    	setFormAction();
    	
    	if (isEditPage()) {
    		editHandler();
	    }
	
	    formEvents();
	    

	    //判断是否为编辑页面
	    function isEditPage(){
	    	return id;
	    }
	    
	    //编辑处理函数
	    function editHandler(){
	        data = Common.getDataByAjax("/androidManager/roleAction!getById.do", {'id': id});
	        if(data){
		        setFormValues(data);        	
	        }
	        Common.addHiddenField(getPostFields(), $form);
	    }
		
	    //设置表单的action
	    function setFormAction(){
	    	var url = '';
	    	if(menuNO === 1220){
	    		url = '/androidManager/roleAction!save.do';
	    	}
	    	
			if(menuNO === 1210){
	    		url = '/androidManager/roleAction!update.do';
	    	}
			
			$form.attr('action', url);
	    }
	    
	    //设置表单值
	    function setFormValues(data) {
	        if (!data) {
	            return;
	        }
	        Common.fillValueToElement(data);
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
		                data = $form.serialize();
		                
	        		$(".actions-style").append('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingSubmitData+'</span>');
	 	            $("#J_Submit").attr('disabled', true).addClass('disabled');
	 	            $("#J_Cancel").attr('disabled', true).addClass('disabled');
		                
		            Common.getDataByAjax(url, data, function(res){
						if(res.success){
	                        msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
	                            Common.jump('/page/user/roleList.jsp?menuNO=1200');
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
		
    })();
</script>
</html>