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
                                    <form action="/sys/strategy/strategy!getStrategyList.do" method="post" class="form form-search" id="J_SearchForm">
                                        <div class="form-group form-grid form-group-search form-group-search-user-list">
							             <!-- <ul class="list-inline form-list-col form-list-col4"> -->
							                
							                <ul class="list-inline list-autowidth">
												<li class="form-item form-item-name">
													<label for="name" class="form-label"><span class="langbox">策略名称</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="name" id="name" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-status">
													<label for="status" class="form-label"><span class="langbox">状态</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix">
							                            	<select class="select form-selected" name="status" id="status">
							                            	 	<option value="" data-lang="pleaseSelect"  selected="selected"></option>
								                                <option value="0">关闭</option>
								                                <option value="1">暂停</option>
								                                <option value="2">激活</option>
							                            	</select>
							                            </div>
							                        </div>
												</li>
												<li class="form-item form-item-startTime">
													<label for="startTime" class="form-label"><span class="langbox">创建时间</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix">
							                            <input class="input-text input-date input-start" type="text" id="startTime" name="startTime" />-
							                            <input class="input-text input-date input-start" type="text" id="endTime" name="endTime" />
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
    	
//     	$('#startTime,#endTime').datetimepicker({ lang: 'ch', format: 'Y-m-d',timepicker:false});
    	$("#startTime,#endTime").datepicker();
    	
    	var $dataGrid = $('#J_DataGrid'),
			postUrl = "/androidManager/strategyAction!getStrategyList.do",
			postData = null;
    	
		setDataGrid(postUrl, postData);
		
	    formEvents();
	    
	    operationEvents();
	    
		/* datagrid参数配置 */
	    function setDataGrid(queryURL, queryData) {
			var setting = {
				url: queryURL,
                rownumbers: true,
                onSelect: selectHandler,
				queryParams: queryData,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
	                { field: 'name', title: '策略名称', width: 80 },  
	                { field: 'startTime', title: '开始时间', width: 80 },
	                { field: 'endTime', title: '结束时间', width: 80 },
	                { field: 'status', title:'状态', width: 70, align: 'center',formatter: getStatus },
	                { field: 'createTime', title: '创建时间', width: 120, align: 'center', sortable:true },
	               { field: 'lastUpdater', title: Lang.lastUpdatePerson, width: 70, align: 'center' },
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 120, align: 'center', sortable:true }
				]]
			};
			Common.datagrid(setting);
			//Common.datagrid(setting);
	    }
	    function getStatus(value, rows) {
            return Common.getStrategyStatus(value);
        }
        
        /* datagrid选中一行事件 */
        function selectHandler(rowIndex, rowData) {
			var status  = rowData.status;
			if(status === 0){
		    	$('[data-menu-number="8240"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="8250"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="8260"]').attr('disabled', true).addClass('disabled').css('cursor', 'default');
			}else if(status === 1){
		    	$('[data-menu-number="8240"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="8250"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="8260"]').attr('disabled', false).removeClass('disabled').css('cursor', 'default');
			}else if(status === 2){
		    	$('[data-menu-number="8240"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="8250"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="8260"]').attr('disabled', true).addClass('disabled').css('cursor', 'default');
			}
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
			    if (!row) {
			        msgDialog(Lang.msgPleaseSelectDataFirst, Lang.alertTitlePrompt, 'warning');
			        return false;
			    }
		    	
		    	//编辑
		    	if(menuNO === 8210){
		    		Common.edit('/page/strategy/strategyEdit.jsp?menuNO=8210', 'id', $dataGrid);
		    		return;	
		    	}
		    	if(menuNO === 8220){
		    		Common.edit('/page/channel/strategyEdit.jsp?menuNO=8220', 'id', $dataGrid);
		    		return;	
		    	}
		    	if(menuNO === 8240){
			    	confirmDialog('确定停用该策略信息？', Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/strategyAction!updateStatus.do', {'id':row.id,'bottomType':0}, function(res){
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
		    	if(menuNO === 8250){
			    	confirmDialog('确定暂停该策略信息？', Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/strategyAction!updateStatus.do', {'id':row.id,'bottomType':1}, function(res){
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
		    	if(menuNO === 8260){
			    	confirmDialog('确定激活该策略信息？', Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/strategyAction!updateStatus.do', {'id':row.id,'bottomType':2}, function(res){
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
		    	//删除
		    	if(menuNO === 8230){
		    		var row = $dataGrid.datagrid("getSelected");
			        Common.remove('/androidManager/strategyAction!delete.do', 'id', $dataGrid);
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
