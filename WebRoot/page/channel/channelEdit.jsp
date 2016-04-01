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
<!-- 							        	<fieldset class="fieldset"> -->
<!-- 							            	<legend class="legend"><h2 class="title"><span class="langbox">已选择的终端</span><span class="remind-span"> * </span><a id="selectElev" class="fieldsetBut" href="javascript:;" >选择终端</a><a id="clearAllElev" class="fieldsetBut" href="javascript:;" >清空</a></h2></legend> -->
<!-- 							            		<div class="fieldset-body" id="J_SelectedList"></div> -->
<!-- 					           			</fieldset> -->
							            <fieldset class="fieldset">
							            	<legend class="legend">渠道信息</legend> 
								            <div class="form-group form-grid form-group-set-user">
										        <ul class="list-unstyled">
								                    <li class="form-item">
											  			<input class="input-text" type="password" autocomplete="off" style="display: none;"/>
											  		</li>
								                    <li class="form-item form-item-companyName">
												        <label class="form-label" for="password"><span class="remind-span">*</span><span class="langbox">公司名称</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="companyName" name="companyName" autocomplete="off" /></div>
												        </div>
											        </li>
								                    <li class="form-item form-item-address">
												        <label class="form-label" for="address"><span class="remind-span">*</span><span class="langbox" >地址</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text" type="text" id="address" name="address" autocomplete="off" />
												        </div>
											        </li>
											        <li class="form-item form-item-phone">
												        <label class="form-label" for="phone"><span class="remind-span">*</span><span class="langbox">电话</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="phone" name="phone" autocomplete="off" /></div>
												        </div>
											        </li>
											        <li class="form-item form-item-contact">
												        <label class="form-label" for="contact"><span class="remind-span">*</span><span class="langbox">联系人</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="contact" name="contact" autocomplete="off" /></div>
												        </div>
											        </li>
											        <li class="form-item form-item-companyName">
												        <label class="form-label" for="password"><span class="remind-span">*</span><span class="langbox">渠道号</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="channelNo" name="channelNo" autocomplete="off" /></div>
												        </div>
											        </li>
										        </ul>
									        </div>
								        </fieldset>
								        <fieldset class="fieldset">
							            	<legend class="legend">选择角色信息</legend> 
								            <div class="form-group form-grid form-group-set-user">
<!-- 											        <li class="form-item form-item-role-name"> -->
<!-- 												        <label class="form-label" for="roleName"><span class="remind-span">*</span><span class="langbox" data-lang="roleName"></span><span class="langbox" data-lang="commonColon"></span></label> -->
<!-- 												        <div class="form-element"> -->
<!-- 													        <div class="f-fix"><input class="input-text" type="text" id="roleName" name="roleName" /></div> -->
<!-- 												        </div> -->
<!-- 												    </li> -->
<!-- 											        <li class="form-item form-item-role-description"> -->
<!-- 												        <label class="form-label" for="roleDescription"><span class="langbox" data-lang="roleDescription"></span><span class="langbox" data-lang="commonColon"></span></label> -->
<!-- 												        <div class="form-element"> -->
<!-- 								                            <div class="f-fix"><textarea class="textarea" style="height: 50px" id="roleDescription" name="roleDescription"></textarea></div> -->
<!-- 												        </div> -->
<!-- 											        </li> -->
											        <li class="form-item">
				        								<label class="form-label" for="roleId"><span class="remind-span">*</span><span class="langbox" data-lang="roleName"></span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
								                        	<div class="f-fix" id="J_RoleItems"></div>
								                        </div>
											        </li>
									        </div>
								        </fieldset>
								        <fieldset class="fieldset">
							            	<legend class="legend">新增用户信息</legend> 
								            <div class="form-group form-grid form-group-set-user">
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
												        <label class="form-label" for="password1"><span class="remind-span">*</span><span class="langbox">确认密码</span><span class="langbox" data-lang="commonColon"></span></label>
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
									        </div>
								        </fieldset>
								        <div class="actions actions-style">
								        	<button type="submit" class="btn btn-success" id="J_Submit"><span><span data-lang="buttonSubmit"></span></span></button>
					                        <a href="/page/channel/channelList.jsp?menuNO=2100" class="btn btn-default J_PreviousLink" id="J_Cancel"><span><span data-lang="buttonCancel"></span></span></a>
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
	        userId = null,
	        userName = '',
			data = null,
			
		$form = $('#J_PostForm');
		
		//获取终端列表
			postUrl = '/androidManager/terminalAction!terminalList.do',
			postData = null,
    		tagUi = new TagUI({
                selectedElement: $('#J_SelectedList'),
                placeholderMsg: '请选择相应的终端',
                idField: 'id',
                fieldName: 'tmIds',
                datagrid: $('#J_DataGrid'),
                singleSelect: false,
                showField: {
                    text: ['vn'], //tag显示文字的字段名，可以是字符串也可以是数组['factoryNO', 'aliasOfAddress']
                    title: 'vn' //tag鼠标移上去title显示文字的字段名，可以是字符串也可以是数组
                },
                //保证在编辑状态下还有校验功能
             	removeTagCallback: removeTagHandler
            }),
	        jumpUrl = '';
	        
	        var selectElevList = new Array(), //在弹出的广告列表中中选中的电梯
      		delSelectElevList = new Array();//需要取消的广告列表

    	setFormAction();
    	
    	if (isEditPage()) {
    		editHandler();
	    }
		jumpUrl = Common.pieceUrl(jumpUrl);
		
		setSelectElev();
    	
	    formEvents();
		
		resetLayout();
	
		//判断是否为编辑页面
	    function isEditPage(){
	    	return id;
	    }
	   
	    setRadioList();
	    
	    //编辑处理函数
	    function editHandler(){
	        data = Common.getDataByAjax("/androidManager/channelAction!getById.do", {'id': id});
	        if(data){
		        if(data.user){
	        		userName = data.user.userName;
		        	fullName = data.user.fullName;
	        	}
// 		        roleName = data.role.roleName;
// 		        roleDescription=data.role.roleDescription;
		        userId = data.userId;
		        var elevList = data.tmList;
		        $.each(
		        	elevList,
                    function (i, v) {
                        tagUi.addTag(v, true, false);
                    }
                );
				setFormValues(data);
		        Common.addHiddenField(getPostFields(), $form);
		        $('.f-resetPassword').removeClass('hidden');
	        }
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
	    	if(menuNO === 2120){
	    		url = '/androidManager/channelAction!add.do';
	    	}
	    	//修改
			if(menuNO === 2110){
	    		url = '/androidManager/channelAction!update.do';
	    	}
			$form.attr('action', url);
	    }
				
		//设置表单值
		function setFormValues(data){
			if(!data){
				return;
			}
			if(data.user){
				$('#userName').val(data.user.userName);
				$('#fullName').val(data.user.fullName);
				$('#password').val(data.user.password);
				$('#password1').val(data.user.password);
			}
// 			$('#roleName').val(data.role.roleName);
// 			$('#roleDescription').val(data.role.roleDescription);
			Common.fillValueToElement(data);
		}
		
		//获取隐藏域的字段对象
		function getPostFields(){
			var postFields = {'id':id};
	        return postFields;
		}
		
		 function setDataGrid(queryURL, queryData) {
			var setting = {
				url: queryURL,
                rownumbers: true,
				queryParams: queryData,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				onLoadSuccess: successHandler,
                onSelect: selectHandler,
                onUnselect: unselectHandler,
                onSelectAll: selectAllHandler,
                onUnselectAll: unselectAllHandler,
				pageSize:10,
				pageList:[10,50,100,200,500],
				showColumns: true,
				singleSelect: false,
				columns:[[
					{ field: 'checkbox', checkbox:true },
                	{ field: 'vc', title: '应用版本号', width: 80 }, 
	                { field: 'vn', title: '应用版本名', width: 80 }, 
	                { field: 'model', title: '手机型号', width: 40 }, 
	                { field: 'phone', title: '手机号码', width: 100 }, 
	                { field: 'width', title: '宽度', width: 80 }, 
	                { field: 'height', title: '高度', width: 80 }, 
	                { field: 'osv', title: 'android版本', width: 80 }, 
	                { field: 'beforePushDate', title: '上次推送时间', width: 70,align: 'center',sortable:true }, 
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 70, align: 'center', sortable:true }
				]]
			};
			Common.datagrid(setting,$("#J_DataGridBox"));
	    }
		/* datagrid加载完成后的事件 */
        function successHandler(){
        	var selectElevListTmp = selectElevList.concat();
        	var delSelectElevListTmp = delSelectElevList.concat();
        	var $dataGrid = $("#J_DataGridBox");
        	var selectedIds = tagUi.getSelectedIdsArray();
        	$.each(
        		selectedIds,
              	function(i,v){
              		$dataGrid.datagrid('selectRecord', v);
              	}
             );
        	selectElevList = selectElevListTmp;
        	delSelectElevList = delSelectElevListTmp;
        } 
        
        /* datagrid点击事件 */
        function selectHandler(rowIndex, rowData) 
   		{

   			var index = getIndexInArray(delSelectElevList,rowData);
   			if(index != -1)
			{
   				delSelectElevList.splice(index,1);
			}
   			else
			{
   				if(getIndexInArray(selectElevList,rowData) === -1)
   	       		{
   	        		selectElevList.push(rowData);
   	       		}
			}
        	
        }  
        
         function unselectHandler(rowIndex, rowData) 
         {
       	 	var index = getIndexInArray(selectElevList,rowData);
       	 	if(index != -1)
 			{
        		 selectElevList.splice(index,1);
 			}
       	 	else
   	 		{
	       	 	if(getIndexInArray(delSelectElevList,rowData) === -1)
	       		{
		       		delSelectElevList.push(rowData);
	       		}
   	 		}
        }
        
        function selectAllHandler(rows) {
 			 $.each(
                rows,
                function (i, v) {
                	var index = getIndexInArray(delSelectElevList,v);
           			if(index != -1)
        			{
           				delSelectElevList.splice(v,1);
        			}
           			else{
           				if(getIndexInArray(selectElevList,v) === -1 && !isInTagUi(tagUi.getSelectedIdsArray(),v.id))
                   		{
                    		selectElevList.push(v);
                   		}
       				}
                	
                }
            );
        }
        
        function unselectAllHandler(rows) {
			$.each(
                    rows,
                    function (i, v) {
                    	var index = getIndexInArray(selectElevList,v);
                   	 	if(index != -1)
             			{
                    		 selectElevList.splice(index,1);
             			}
                   	 	else
              	 		{
    	              	 	if(getIndexInArray(delSelectElevList,v) === -1 && isInTagUi(tagUi.getSelectedIdsArray(),v.id))
    	              		{
    	       	       			delSelectElevList.push(v);
    	              		}
              	 		}
                    }
                );
        } 
        
         function getIndexInArray(array,rowData)
        {
        	var index = -1;
        	$.each(array,function(i,v){
        		if(v.id === rowData.id)
       			{
        			index = i;
       			}
        	});
        	return index;
        }
        
         function isInTagUi(array,id)
        {
        	var result = false;
        	$.each(array,function(i,v)
   			{
   				if(v === id)
				{
   					result =  true;
   					return;
				}
   			});
        	return result;
        }
          /* tag删除事件的回调处理函数 ,保证在编辑过程中也必须有选择的终端才能*/
        function removeTagHandler(rowData) {
            $('input[name="tmIds"]').rules("remove");
            $('input[name="tmIds"]').rules("add", { required: isRequired()});
        }
        
         /* 重设布局 */
    	 function resetLayout(){
    		 var $dataGrid = $("#J_DataGridBox");
    		layoutSize.setPartOfResizeHeight($('#J_UpkeepBatch'), $('#J_BlockUpkeepBatch'), $('#J_BlockSelectedList'));
        	layoutSize.setPartOfResizeHeight($('#J_SelectList'), $('#J_BlockSelectList'), $('#J_SearchFormSidebar'));
        	$dataGrid.datagrid('resize');
        } 
        
        //设置选择终端事件
    	function setSelectElev(){
    		$("#selectElev").click(function(){
				 dialog = new Dialog({
					title : '选择终端',
					width:800,
					height:320,
					buttons : [
						{text : "确定", styleName : 'btn-success', click : function(dialog){refreshTagUi(dialog);}},
						{text : "取消", styleName : 'btn-default', click : function(d){d.close();}}
					],
					content: getLinkAgentInfo()
				});
				dialog.open();
				selectElevList.length = 0;
	        	delSelectElevList.length = 0;
				bindEventOfMoreSwitch();
				setDataGrid(postUrl, postData);
    		});
    		$("#clearAllElev").click(function(){
    			tagUi.removeAllTags();
    			resetLayout();
    		});
    	}
    	
    	function getLinkAgentInfo(){
   
        //获取终端搜索页面
   				var $html = $('<div class="datagrid-box datagrid-rescue-popup"><table cellpadding="0" cellspacing="0" class="table" id="J_DataGridBox"></table></div>'	
   			);
   		return $html;
   	  }
   	  
   	   //刷新tagUi
        function refreshTagUi(dialog)
        {
        	//先添加
        	$.each(selectElevList,function (i, v){
        		 tagUi.addTag(v);
        	});
        	
        	//再删除
        	$.each(delSelectElevList,function (i, v){
        		 tagUi.removeTag(v.id);
       		});
        	resetLayout();
        	dialog.close();
        }
		//表单事件
	    function formEvents(){
		    $form.validate({
		        rules: {
		            companyName: "required",
		            address : "required",
		            contact: "required",
		            channelNo:"required",
		            phone:{
		            	required:true,
		            	tel:true
		            },
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
		            userName: "required", 
		        	id: "required"
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
	                        		Common.jump("/page/channel/channelList.jsp?menuNO=2100");
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
				data = Common.getDataByAjax(url, {'page':1, 'rows':10000,isDefault:1}),
				list = data ? data.rows : null,
				isDisabled = data.isDefault ? true : false;
	        if(!list){
	        	return;
	        }
        
			Common.setRadioByList(list, ['id', 'roleName','','roleDescription'], $checkboxElement, getIdsArray(), isDisabled);
		}
		
		//获取对应的ID并存放在数组里
		function getIdsArray(){
			if(!userId) {
				return null;
			}
			var url = '/androidManager/roleAction!getRoleListByUserId.do',
				data = Common.getDataByAjax(url, {'userId': userId}),
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