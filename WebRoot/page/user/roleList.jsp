<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="../base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="../base/include.jsp"></jsp:include>
</head>
<body class="sys sys-role sys-role-list">
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
                            <div class="box box-role-list" id="J_Box">
                                <div class="box-body" id="J_BoxBody">
                                    <form action="/sys/role/role!roleList.do" method="post" class="form form-search" id="J_SearchForm">
							            <div class="form-group form-grid form-group-search form-group-search-role-list">
									        <ul class="list-inline list-autowidth">
							                    <li class="form-item form-item-role-name">
											        <label class="form-label" for="roleName"><span class="langbox" data-lang="roleName"></span><span class="langbox" data-lang="commonColon"></span></label>
											        <div class="form-element">
												        <div class="f-fix"><input class="input-text" type="text" id="roleName" name="roleName" /></div>
											        </div>
										        </li>
										        <li class="form-item form-item-role-name">
											        <label class="form-label" for="roleDescription"><span class="langbox" data-lang="roleDescription"></span><span class="langbox" data-lang="commonColon"></span></label>
											        <div class="form-element">
												        <div class="f-fix"><input class="input-text" type="text" id="roleDescription" name="roleDescription" /></div>
											        </div>
										        </li>
							                    <li class="form-item form-item-btn">
							                        <div class="form-element">
							                        	<div class="f-fix">
									                        <button type="submit" class="btn btn-middle btn-primary" id="J_SearchSubmit"><span><span data-lang="buttonSearch"></span></span></button>
								                        	<button type="reset" class="btn btn-middle btn-default" id="J_SearchRest"><span><span data-lang="buttonRest"></span></span></button>
							                    		</div>
							                    	</div>
							                    </li>	        
									        </ul>
								        </div>
							        </form>
							        
		                            <div class="toolbar" id="J_ToolBar"></div>
                                    
                                    <div class="data-grid-box" id="w" data-rule="resize"><table cellpadding="0" cellspacing="0" class="table" id="J_DataGrid"></table></div>
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
    	new Page({
    		menuOpts:{showMenuType:[1, 2, 5, 7, 8, 9]}
    	});
    	
    	var $dataGrid = $('#J_DataGrid'),
			postUrl = "/androidManager/roleAction!roleList.do",
			postData = null;
    	
		setDataGrid(postUrl, postData);

	    formEvents();
	    
		operationEvents();
	    
	    /* datagrid参数配置 */
	    function setDataGrid(queryURL, queryData) {
			var setting = {
				url: queryURL,
				queryParams: queryData,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
	                { field: 'roleName', title: Lang.roleName, width: 200 },
	                { field: 'roleAcountCount', title: Lang.roleAcountCount, width: 200,formatter: getRoleAcountCount },
	                { field: 'roleDescription', title: Lang.roleDescription, width: 200 },
	                { field: 'lastUpdatePerson', title: Lang.lastUpdatePerson, width: 100, align: 'center' },
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 100, align: 'center', sortable:true }
				]],
				onChangePageSize: function(pageSize){
					alert(pageSize);	
				}
			};
			
			Common.datagrid(setting);
	    }
	    
	    function getRoleAcountCount(value){
	    	if(value === ''){
	    		return;
	    	}
	    	return '<span>' + (value || 0) + '</span>';
	    }
	    
	    /* 搜索表单的事件绑定 */
	    function formEvents(){
	    	$("#J_SearchForm").submit(function (e) {
		        e.preventDefault();
		        var params = $(this).serializeObject();
		        setDataGrid(postUrl, params);
		    });
	    	
	    	$("#J_SearchRest").click(function(e){
	    		setDataGrid(postUrl, postData);
	    	});
	    }
		
	    /* 操作按钮事件绑定 */
	    function operationEvents(){
		    $("#J_ToolBar button").click(function(e){
		    	var menuNO = Common.stringToNumber($(this).attr('data-menu-number'));
		    	var url = $(this).attr('data-href');
		    	var row = $dataGrid.datagrid("getSelected");
		    	if(!row){
	    			msgDialog(Lang.msgPleaseSelectDataFirst, Lang.alertTitlePrompt, 'warning');
        			return false;
	    		}
		    	
		    	//编辑
		    	if(menuNO === 1210){
		    		Common.edit(url, 'id', $dataGrid);
		    		return;	
		    	}
		    	
		    	//角色菜单
		    	if(menuNO === 1250){
		    		Common.edit(url, ['id', 'roleName'], $dataGrid);
		    		return;	
		    	}
		    	
		    	//删除
		    	if(menuNO === 1230){
		    		var row = $dataGrid.datagrid("getSelected");
					confirmDialog(Lang.msgDoYouWantToDelete, Lang.alertTitlePrompt, function() {
			            Common.getDataByAjax("/androidManager/roleAction!delete.do",{'id':row.id}, function(res){
							if(res.success){
		                        msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
		                            setDataGrid(postUrl, $("#J_SearchForm").serialize());
		                        });
		                    }else{
		                      simpleDialog(res.msg);
		                    }		            	
						});
					});
		    		return;	
		    	}
		    	//查看用户
		    	if(menuNO===1240){
		    			var dialog = new Dialog({
		    			title:"查看用户信息",
		    			width:600,
		    			height:300,
		    			buttons : [
							{text : "取消", styleName : 'btn-default', click : function(d){d.close();}}
						],
						content: getLinkElevator(row)
		    		});
		    		dialog.open();	
					setPopupDatagrid(row);	    		
		    		return;
		    	}
		    });
	    }
	    
	   	function getLinkElevator(){
	    	return $('<table cellpadding="0" cellspacing="0" class="table" id="J_PopupDataGrid"></table>');
	    }
	    
	   //设置弹出窗的表格
	   function setPopupDatagrid(row){
	   		var queryPopupURL = '/androidManager/roleAction!userRoleList.do';
			var queryPopupData = {'id': row.id};
			var setting = {
				url: queryPopupURL,
				queryParams: queryPopupData,
				pageSize:10,
				columns:[[
					{ field: 'userName', title: Lang.userName, width: 80 },  
	                { field: 'fullName', title: Lang.employeeName, width: 80 },
	                { field: 'creater', title: '创建人', width: 80 },
	                { field: 'createTime', title: '创建时间', width: 80 }
				]]
			};
			Common.datagrid(setting, $('#J_PopupDataGrid'));
	   }

    })();
</script>
</html>