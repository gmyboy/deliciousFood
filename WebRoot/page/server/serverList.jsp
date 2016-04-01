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
													<label for="fullName" class="form-label"><span class="langbox" >服务器地址</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="serverUrl" id="serverUrl" /></div>
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
    		menuOpts:{showMenuType:[1, 2, 5, 7, 8, 9]}
    	});
    	
    	var $dataGrid = $('#J_DataGrid'),
			postUrl = "/androidManager/serverAction!serverList.do",
			postData = null;
    	
		setDataGrid(postUrl, postData);
		
	    formEvents();
	    
	    operationEvents();
	    
		/* datagrid参数配置 */
	    function setDataGrid(queryURL, queryData) {
			var setting = {
				url: queryURL,
                rownumbers: true,
				queryParams: queryData,
				onLoadSuccess:onLoadSuccess,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
	                { field: 'serverUrl', title: '服务器地址', width: 80 },  
	                { field: 'status', title: '服务器状态', width: 60, formatter: getStatus,align:'center' },
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 120, align: 'center', sortable:true }
				]]
			};
			Common.datagrid(setting);
			//Common.datagrid(setting);
	    }
		
	    function getStatus(value, rows) {
            return Common.getChannelStatus(value);
        }
	    /* datagrid加载完成后的事件 */
        function onLoadSuccess(){
        	//成功加载之后 查看是否没有记录
// 	    	Common.showPagerNumb($dataGrid.treegrid('getData').length);
	    	
//         	$dataGrid.treegrid('collapseAll');
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
		    	//编辑
		    	if(menuNO === 4110){
		    		Common.edit('/page/server/serverEdit.jsp?menuNO=4110', 'id', $dataGrid);
		    		return;	
		    	}
		    	
		    	if(menuNO === 4140){
		    		var statusStr = '';
		    		if(row.status == 1){
		    			statusStr='确定停用该服务器信息？';
		    		}else{
		    			statusStr='确定启用该服务器信息？';
		    		}
			    	confirmDialog(statusStr, Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/serverAction!updateStatus.do', {'id':row.id}, function(res){
							if(res.success){
		                        msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
		                        	$dataGrid.datagrid('reload');
		                        });
		                    }else{
		                       simpleDialog(res.msg);
		                    }		            	
						});
			    	});
		    	}
		    	// 新增
		    	if(menuNO === 4130){
		    		Common.edit('/page/serverEdit.jsp', 'id', $dataGrid);
		    		return;	
		    	}
		    	
		    	//删除
		    	if(menuNO === 4120){
			        Common.remove('/androidManager/serverAction!delete.do', 'id', $dataGrid);
		    		return;	
		    	}
		    });
	    }

    })();
</script>
</html>
