<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="../base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="../base/include.jsp"></jsp:include>
</head>
<body class="sys sys-user sys-user-list">
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
                            <div class="box box-user-list" id="J_Box">
                                <div class="box-body" id="J_BoxBody">
                                    <form action="/sys/user/user!userList.do" method="post" class="form form-search" id="J_SearchForm">
                                        <div class="form-group form-grid form-group-search form-group-search-user-list">
							                <ul class="list-inline list-autowidth">
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox" data-lang="userName"></span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="userName" id="userName" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox" data-lang="employeeName"></span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="fullName" id="fullName" /></div>
							                        </div>
												</li>
							                    <li class="form-item">
								                     <label class="form-label" for="startTime"><span class="langbox">登陆时间</span><span class="langbox" data-lang="commonColon"></span></label>
								                    <div class="form-element">
				                                        <div class="f-fix">
				                                        	<input class="input-text input-date input-start" style="width: 150px" type="text" id="startTime" name="startTime" />
				                                        	-
				                                        	<input class="input-text input-date input-end" style="width: 150px" type="text" id="endTime" name="endTime" />
				                                        </div>
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
		                            
                                    <div class="data-grid-box" id="J_DataGridBox" data-rule="resize"><table cellpadding="0" cellspacing="0" class="table" id="J_DataGrid"></table></div>
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
    		menuOpts:{showMenuType:[1, 2, 5, 7 , 8 , 9]}
    	});
    	
    	var $dataGrid = $('#J_DataGrid'),
			postUrl = "/androidManager/log!loginLogList.do",
			postData = null;
    	
		setDataGrid(postUrl, postData);
		
		$('#startTime, #endTime').datetimepicker({
	           showSecond: true,
	           timeFormat: 'hh:mm:ss',
	           stepHour: 1,
	           stepMinute: 1,
	           stepSecond: 1
       	});
       		
	    formEvents();
	    
	    operationEvents();
	    
		/* datagrid参数配置 */
	    function setDataGrid(queryURL, queryData) {
			var setting = {
				url: queryURL,
                rownumbers: true,
				queryParams: queryData,
				sortName:"createTime",
				sortOrder:"desc",
				columns:[[
	                { field: 'userName', title: Lang.userName, width: 100 },  
	                { field: 'fullName', title: Lang.employeeName, width: 100 },
	                { field: 'ip', title: '登陆IP', width: 100 },
	                { field: 'address', title: 'IP所在地', width: 200 },
	                { field: 'createTime', title: '登陆时间', width: 70, align: 'center', sortable:true  }
				]]
			};
			Common.datagrid(setting);
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
		    	
		    	//编辑
		    	if(menuNO === 1110){
		    		Common.edit('/appManager/page/user/userEdit.jsp?menuNO=1110', 'id', $dataGrid);
		    		return;	
		    	}
		    	
		    	//用户角色
		    	if(menuNO === MenuNumber.UserRoleEdit){
		    		Common.edit('/page/userEdit.jsp', 'id', $dataGrid);
		    		return;	
		    	}
		    	
		    	//删除
		    	if(menuNO === 1130){
		    		var row = $dataGrid.datagrid("getSelected");
			        Common.remove('/appManager/userAction!delete.do', 'id', $dataGrid);
		    		return;	
		    	}
		    });
		    //导出excel
		    $('[data-menu-number="'+MenuNumber.ExportUser+'"]').click(function(e){
		    	e.preventDefault();
		    	var url = $(this).attr('href');
		    	var params = $("#J_SearchForm").serializeObject();
		    	var getParams="";
				$.each(params,function(i,v){
					getParams+=i+"="+encodeURI(encodeURI(v))+"&"; //js的encodeURI需要两次编码，具体原理请百度
				});
		    	//alert(Common.pieceUrl(URL.ExportUser)+"&"+getParams)
		    	document.location.href=Common.pieceUrl(URL.ExportUser)+"&"+getParams;
		    	return false;
		    });
	    }

    })();
</script>
</html>
