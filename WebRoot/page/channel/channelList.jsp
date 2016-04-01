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
                                    <form action="" method="post" class="form form-search" id="J_SearchForm">
                                        <div class="form-group form-grid form-group-search form-group-search-user-list">
							                <ul class="list-inline list-autowidth">
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">公司名称</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="companyName" id="companyName" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">地址</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="address" id="address" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">联系人</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="contact" id="contact" /></div>
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
			postUrl = "/androidManager/channelAction!channelList.do",
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
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
					{ field: 'channelNo', title: '渠道号', width: 80 },
	                { field: 'companyName', title: '公司名称', width: 80 },
	                { field: 'address', title: '地址', width: 80 },
	                { field: 'phone', title:'电话', width: 70, align: 'center' },
	                { field: 'contact', title: '联系人', width: 120, align: 'center'},
	                { field: 'status', title: '状态', width: 30, formatter: getStatus,align:'center' },
	                { field: 'lastUpdater', title: Lang.lastUpdatePerson, width: 70, align: 'center' },
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 70, align: 'center', sortable:true }
				]]
			};
			Common.datagrid(setting);
	    }
	    
	     function getStatus(value, rows) {
            return Common.getChannelStatus(value);
        }
		
	    /* 搜索表单的事件绑定 */
	    function formEvents(){
	    	$("#J_SearchForm").submit(function (e) {
		        e.preventDefault();
		        var params = $(this).serializeObject();
		        console.log(postUrl);
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
		    	if(menuNO === 2110){
		    		Common.edit('/page/channel/channelEdit.jsp?menuNO=2110', 'id', $dataGrid);
		    		return;	
		    	}
		    			    	
		    	//停/启用
		    	if(menuNO === 2140){
		    		var statusStr = '';
		    		if(row.status == 1){
		    			statusStr='确定停用该渠道信息？';
		    		}else{
		    			statusStr='确定启用该渠道信息？';
		    		}
			    	confirmDialog(statusStr, Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/channelAction!updateStatus.do', {'id':row.id}, function(res){
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
		    	
		    	//渠道绑定终端
		    	if(menuNO === 2150){
		    		var channel = Common.getDataByAjax("/androidManager/channelAction!getById.do", {'id': row.id});
		    		var dialog = new Dialog({
		    			title :'绑定终端信息',
						width :1000,
						height:600,
						buttons: [
							{text:Lang.buttonSubmit, click:function(e){postApproveCompleteback(e);}, styleName:'btn-success'},
							{text:Lang.buttonCancel, click:function(e){e.close();}, styleName:'btn-default'}
		    			], 
		                content: getInfoView(channel)
					});
					dialog.open();
					setFormValues(channel);
    				formEvents1();
    				approveCompleteFormEvents(dialog);
					return;
		    	}
		    	
		    	//删除
		    	if(menuNO === 2130){
		    		var row = $dataGrid.datagrid("getSelected");
			        Common.remove('/androidManager/channelAction!delete.do', 'id', $dataGrid);
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
		    	document.location.href=Common.pieceUrl(URL.ExportUser)+"&"+getParams;
		    	return false;
		    });
	    }

		//设置表单值
	    function setFormValues(data) {
	        if (data.query) {
	        	if(data.query.searchJson){
		        	var terData = JSON.parse(data.query.searchJson);
			        $('#terId').val(terData.id);
			    	$('#model').val(terData.model);
			    	$('#phone').val(terData.phone);
			    	$('#channelNo').val(terData.channelNo);
			    	$('#apps').val(terData.apps);
			    	$('#province').val(terData.province);
	        	}
	        }
	        var params = $("#J_SearchForm1").serializeObject();
		    setDataGrid1('/androidManager/terminalAction!terminalList.do', params);
	    }
	    
    	function approveCompleteFormEvents(dialog){
    	  	var $approveCompleteForm = $("#J_SearchForm1");
	    	$approveCompleteForm.validate({
	 	        submitHandler: function (form) {
	 	        	var rowsTotal = $("#J_DataGrid1").datagrid("getData").total;
					if (rowsTotal == 0) {
						simpleDialog("终端列表不能为空");
						return true;
					}
	 	            data = $approveCompleteForm.serializeObject();         
	 	            Common.getDataByAjax('/androidManager/channelAction!bindTerminal.do', data, function(res){
	 					if(res.success){
	 						msgDialog(res.msg, '', '', function(){
	 							dialog.close();
	 							setDataGrid(postUrl, $("#J_SearchForm").serializeObject());
	 						});
	 					}else{
	 						simpleDialog(res.msg);
	 					}
	 				});
	 	        }
	 	    });
	    }
			
    	function postApproveCompleteback(){
	    	confirmDialog('是否确认将查询出来的终端信息绑定到该渠道上？', Lang.alertTitlePrompt, function() {
	    		$("#J_SearchForm1").submit();
	    	});
	    }
		    
    	function setDataGrid1(queryURL, queryData) {
			var setting = {
				url: queryURL,
                rownumbers: true,
				queryParams: queryData,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
					{ field: 'id', title: '终端ID', width: 30 }, 
					{ field: 'channel', title: '渠道号', width: 50 },
					{ field: 'province', title: '省份', width: 50 }, 
					{ field: 'model', title: '终端型号', width: 80 }, 
					{ field: 'phone', title: '手机号码', width: 60 }, 
 	                { field: 'net', title: '网络类型', width: 40 }, 
	                { field: 'beforePushDate', title: '上次推送时间', width: 70,align: 'center'}, 
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 70, align: 'center'}
				]]
			};
			Common.datagrid(setting,$("#J_DataGrid1"));
   		}
   		
   		function formEvents1(){
	    	$("#J_SearchSubmit1").click(function (e) {
		        e.preventDefault();
		        var params = $("#J_SearchForm1").serializeObject();
		        setDataGrid1('/androidManager/terminalAction!terminalList.do', params);
		    });
	    	
	    	$("#J_SearchRest1").click(function(e){
	    		setDataGrid1('/androidManager/terminalAction!terminalList.do', null);
	    	});
	    }
	    
    	function getInfoView(obj){
   			var $html=$('<div class="form-group form-grid form-group-set-user">'+
   					'<fieldset class="fieldset">'+
		          		'<legend class="legend">渠道信息</legend>' + 
			              	'<ul class="list-inline form-list-col form-list-col4">' +
									'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox" >渠道号:</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
					                      ' <div class="f-fix">'+obj.channelNo+'</div>'+
					                    '</div>'+
									'</li>'+									
									'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox" >公司名称:</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
					                      ' <div class="f-fix">'+obj.companyName+'</div>'+
					                    '</div>'+
									'</li>'+
				                	'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox">电话:</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
				                         '   <div class="f-fix">'+obj.phone+'</div>'+
				                       ' </div>'+
									'</li>'+
									'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox" >联系人:</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
				                            '<div class="f-fix">'+obj.contact+'</div>'+
				                       ' </div>'+
									'</li>'+
				             '</ul>'+
				             '<ul class="list-inline form-list-col form-list-col2">' +
				               		'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox">地址:</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
				                            '<div class="f-fix">'+obj.address+'</div>'+
				                        '</div>'+
									'</li>'+
				             '</ul>'+
				            '</<fieldset>'+
				            	'</div>'+
   					'<form action="" method="post" class="form form-search" id="J_SearchForm1">'+
   					'<div class="form-group form-grid form-group-search form-group-search-user-list">'+
                        '<fieldset class="fieldset">'+
		          		'<legend class="legend"><font color="red">此处操作是将按条件查询出来的终端绑定到该渠道信息上，请慎重选择！</font></legend>' + 
			              	'<ul class="list-inline form-list-col form-list-col4">' +
			              			'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox" >终端Id</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
					                      ' <div class="f-fix"><input type="text" class="input-text" name="ter.id" id="terId" /></div>'+
					                   ' </div>'+
									'</li>'+
									'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox" >终端型号</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
					                      ' <div class="f-fix"><input type="text" class="input-text" name="ter.model" id="model" /><input type="hidden" class="input-text" name="id" value="'+obj.id+'" /></div>'+
					                   ' </div>'+
									'</li>'+
									'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox">手机号码</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
				                            '<div class="f-fix"><input type="text" class="input-text" name="ter.phone" id="phone" /></div>'+
				                        '</div>'+
									'</li>'+
									'<li class="form-item form-item-btn">'+
				                      '  <div class="form-element">'+
				                        '	<div class="f-fix">'+
					                        	'<button type="button" class="btn btn-middle btn-primary" id="J_SearchSubmit1"><span><span >提交</span></span></button>'+
					                        	'<button type="reset" class="btn btn-middle btn-default" id="J_SearchRest1"><span><span >重置</span></span></button>'+
				                        	'</div>'+
				                       ' </div>	'+						                        
				                   ' </li>'+
				             '</ul>'+
			              	 '<ul class="list-inline form-list-col form-list-col4">' +
				                	'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox">渠道号</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
				                         '   <div class="f-fix"><input type="text" class="input-text" name="ter.channelNo" id="channelNo" /></div>'+
				                       ' </div>'+
									'</li>'+
									'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox" >app包名</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
				                            '<div class="f-fix"><input type="text" class="input-text" name="ter.apps" id="apps" /></div>'+
				                       ' </div>'+
									'</li>'+
									'<li class="form-item form-item-fullName">'+
										'<label for="fullName" class="form-label"><span class="langbox" >省份</span><span class="langbox" data-lang="commonColon"></span></label>'+
										'<div class="form-element">'+
				                            '<div class="f-fix"><input type="text" class="input-text" name="ter.province" id="province" /></div>'+
				                       ' </div>'+
									'</li>'+
				               ' </ul>'+
				               '</<fieldset>'+
				            '</div>'+
				            '</form>'+
				            '<div class="data-grid-box" id="J_DataGridBox1" style="height: 300px">'+
								'<table cellpadding="0" cellspacing="0" class="table" id="J_DataGrid1"></table>'+
							'</div>');
				            return $html;
    		}
    })();
</script>
</html>
