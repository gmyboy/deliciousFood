<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="../base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="../base/include.jsp"></jsp:include>
</head>
<body class="sys sys-role-menu sys-role-menu-edit">
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
                            <div class="box box-set-role-menu" id="J_Box">
						        <div class="box-body" id="J_BoxBody">
							        <div class="form-box" data-rule="resize">
							        <form method="post" class="form" id="J_PostForm">
							            <fieldset class="fieldset">
							            	<legend class="legend" data-lang="roleMenuInfo"></legend> 
								            <div class="form-group form-grid form-group-set-role-menu">
										        <ul class="list-unstyled">
								                     <li class="form-item form-item-role-name">
												        <label class="form-label" for="roleName"><span class="langbox" data-lang="roleName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="roleName" name="roleName" /></div>
												        </div>
											        </li>
								                    <li class="form-item form-item-menu-name">
												        <label class="form-label" for="menuName"><span class="langbox" data-lang="menuName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
								                        	<div class="f-fix" id="J_Menus"></div>
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
    	
    	setCheckboxList();
	
	    formEvents();
	    

	    //判断是否为编辑页面
	    function isEditPage(){
	    	return id;
	    }
	    
	    //编辑处理函数
	    function editHandler(){
	        data = Common.getDataByAjax('/androidManager/roleAction!getById.do', {'id': id});
	        if(data){
		        setFormValues(data);        	
	        }
	    }
		
	    //设置表单的action
	    function setFormAction(){
	    	var url = '';
			if(menuNO === 1250){
	    		url = '/androidManager/roleAction!grantRoleMenu.do';
	    	}
			$form.attr('action', url);
	    }
	    
	    //设置表单值
	    function setFormValues(data) {
	        if (!data) {
	            return;
	        }
	        $('#roleName').val(data.roleName).attr('disabled', true).addClass('disabled');
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
		        	menuName: "required"
		        },
		        submitHandler: function (form) {
		            var url = $form.attr('action'),
		                data = $.extend(getPostFields(), getMenuData());
					
		            Common.getDataByAjax(url, data, function(res){
						if(res.success){
                        msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
                            Common.jump('/page/user/roleList.jsp?menuNO=1200');
                        });
                    }else{
                      simpleDialog(res.msg);
                    }		            	
					});
		        }
		    });
	    }
	    
	    //获取菜单值的对象
	    function getMenuData(){
	    	var menuNOs = [];
	    	$.each(
	    		$('#J_Menus input[type="checkbox"]:checked'),
	    		function(i, obj){
	    			menuNOs.push($(obj).val());
	    		}
	    	);
	    	return {'menuNOs': menuNOs.join(',')};
	    }
	    
	  	//生成checkbox
		function setCheckboxList(){
			var $checkboxElement = $("#J_Menus"),
	    		url = '/androidManager/roleAction!getMenuTree.do',
				dataMenu = Common.getDataByAjax(url, {'page':1, 'rows':10000, 'roleId':id}),
				list = dataMenu ? dataMenu.rows : null;
				isDisabled = data.isDefault ? true : false;
				
	        if(!list){
	        	return;
	        }
        
			Common.setCheckboxTreeByList(list, ['menuNO', 'menuName','menuDescription'], $checkboxElement, getIdsArray(), isDisabled);
			
			 //展开/收缩事件绑定
	        $('.form-multiple-list .plus-minus').click(function (e) {  
	            var $parentElement = $(this).parent().parent('.form-multiple-item'),
					$subElement = $parentElement.children('.form-multiple-list');

	            if ($(this).hasClass('minus')) {
	                $subElement.slideUp('fast', function(){
	                	layoutSize.init();
	                });
	                $(this).removeClass('minus').text('+');
	            } else {
	                $subElement.slideDown('fast', function(){
	                	layoutSize.init();
	                });
	                $(this).addClass('minus').text('-');
	            }
	            
	            return false;
	        });

	        //checkbox多选框事件绑定
	        $('.form-multiple-label').click(function (e) {
	            var isChecked = $(this).children('[type="checkbox"]').attr("checked") == 'checked',
					$selfCheckbox = $(this).children('[type="checkbox"]'),
					$siblingCheckboxs = $(this).parent('.form-multiple-item').parent('.form-multiple-list').find('[type="checkbox"]'),
					$childrenCheckboxs = $(this).next('.form-multiple-list').find('[type="checkbox"]'),
					$parentCheckbox = $(this).parents('.form-multiple-list').prev('.form-multiple-label').children('[type="checkbox"]'),
					$parentsCheckboxs = $(this).parents('.form-multiple-item').children('.form-multiple-label').find('[type="checkbox"]'),
					$ischildren = $(this).next('.form-multiple-list').length > 0;

	            if (isChecked) {
	                $childrenCheckboxs.attr("checked", true);
	                $parentsCheckboxs.attr("checked", true);
	            } else {
	                $childrenCheckboxs.attr("checked", false);
	            }
	        });
		}
		
		//获取对应的ID并存放在数组里
		function getIdsArray(){
			if(!id) {
				return null;
			}
			
			var url = '/androidManager/roleAction!menuList.do',
				data = Common.getDataByAjax(url, {'page':1, 'rows':10000, 'id': id}),
				list = data ? data.rows : null,
				idsArray = [];
			
            if (!list) {
            	return;
            }
            
            $.each(
				list,
				function (index, value) {
				    idsArray.push(value.menuNO);
				}
			);
			
			return idsArray;
		}
		
    })();
</script>
</html>