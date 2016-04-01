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
                                    <form action="/androidManager/terminalAction!terminalList.do" method="post" class="form form-search" id="J_SearchForm">
                                        <div class="form-group form-grid form-group-search form-group-search-user-list">
							                <ul class="list-inline list-autowidth">
<!--   											<ul class="list-inline form-list-col form-list-col4"> -->
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox" >终端ID</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="ter.id" id="model" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox" >手机型号</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="ter.model" id="model" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">手机号码</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="ter.mobile" id="mobile" /></div>
							                        </div>
												</li>
							                	<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">imei</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="ter.imei" id="imei" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox" >imsi</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="ter.imsi" id="imsi" /></div>
							                        </div>
												</li>
<!-- 												<li class="form-item form-item-fullName"> -->
<!-- 													<label for="fullName" class="form-label"><span class="langbox">系统版本号</span><span class="langbox" data-lang="commonColon"></span></label> -->
<!-- 													<div class="form-element"> -->
<!-- 							                            <div class="f-fix"><input type="text" class="input-text" name="sysVersion" id="sysVersion" /></div> -->
<!-- 							                        </div> -->
<!-- 												</li> -->
<!-- 												<li class="form-item form-item-fullName"> -->
<!-- 													<label for="fullName" class="form-label"><span class="langbox" >skd版本号</span><span class="langbox" data-lang="commonColon"></span></label> -->
<!-- 													<div class="form-element"> -->
<!-- 							                            <div class="f-fix"><input type="text" class="input-text" name="sdkVersion" id="sdkVersion" /></div> -->
<!-- 							                        </div> -->
<!-- 												</li> -->
<!-- 												<li class="form-item form-item-fullName"> -->
<!-- 													<label for="fullName" class="form-label"><span class="langbox" >国家地区</span><span class="langbox" data-lang="commonColon"></span></label> -->
<!-- 													<div class="form-element"> -->
<!-- 							                            <div class="f-fix"><input type="text" class="input-text" name="region" id="region" /></div> -->
<!-- 							                        </div> -->
<!-- 												</li> -->
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
			postUrl = "/androidManager/terminalAction!terminalList.do",
			postData = null;
    	
		setDataGrid(postUrl, postData);
		
	    formEvents();
	    
	    operationEvents();
	    
		/* datagrid参数配置 */
	    function setDataGrid(queryURL, queryData) {
			var setting = {
				url: queryURL,
                rownumbers: false,
				queryParams: queryData,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
					{ field: 'id', title: '终端ID', width: 30 }, 
					{ field: 'channelNo', title: '渠道号', width: 50 },
					{ field: 'province', title: '省份', width: 50 }, 
					{ field: 'brand', title: '品牌', width: 50 }, 
					{ field: 'model', title: '手机型号', width: 80 }, 
					{ field: 'phone', title: '手机号码', width: 60 }, 
					{ field: 'imei', title: 'imei', width: 70 }, 
 	                { field: 'imsi', title: 'imsi', width: 70 }, 
 	                { field: 'net', title: '网络类型', width: 40 }, 
	                { field: 'vc', title: '应用版本号', width: 50 }, 
	                { field: 'vn', title: '应用版本名', width: 50 }, 
	                { field: 'width', title: '宽度', width: 30 }, 
	                { field: 'height', title: '高度', width: 30 }, 
	                { field: 'osv', title: 'android版本', width: 50 }, 
	                { field: 'status', title: '状态', width: 50, formatter: getStatus,align:'center' },
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 70, align: 'center'}
				]]
			};
			Common.datagrid(setting);
			//Common.datagrid(setting);
	    }
	     function getStatus(value, rows) {
            return Common.getChannelStatus(value);
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
		    	//删除
		    	if(menuNO === 3110){
		    		var row = $dataGrid.datagrid("getSelected");
			        Common.remove('/androidManager/terminalAction!delTerminalById.do', 'id', $dataGrid);
		    		return;	
		    	}
		    	//查看app列表
		    	if(menuNO===3120){
		    			var dialog = new Dialog({
		    			title:"终端app信息",
		    			width:800,
		    			height:350,
		    			buttons : [
							{text : "取消", styleName : 'btn-default', click : function(d){d.close();}}
						],
						content: getLinkElevator(row)
		    		});
		    		dialog.open();	
					setPopupDatagrid(row);	    		
		    		return;
		    	}
		    	// 查看
		    	if(menuNO === 3130){
		    		var mediaInfo = Common.getDataByAjax('/androidManager/terminalAction!getTerminalAndDevceInfo.do', {'id':row.id});
		    		var dialog = new Dialog({
		    			title :'终端信息',
						width :800,
						height:420,
						buttons: [
							{text:Lang.buttonCancel, click:function(e){e.close();}, styleName:'btn-default'}
		    			], 
		                content: getInfoView(mediaInfo)
					});
					dialog.open();
					return;
				}
				if(menuNO === 3140){
		    		var statusStr = '';
		    		if(row.status == 1){
		    			statusStr='确定停用该终端信息？';
		    		}else{
		    			statusStr='确定启用该终端信息？';
		    		}
			    	confirmDialog(statusStr, Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/terminalAction!updateStatus.do', {'id':row.id}, function(res){
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
		    });
			
	    }
	    function getLinkElevator(){
	    	return $('<table cellpadding="0" cellspacing="0" class="table" id="J_PopupDataGrid"></table>');
	    }
		
		//设置弹出窗的表格
	   function setPopupDatagrid(row){
	   		var queryPopupURL = '/androidManager/terminalAction!applicationList.do';
			var queryPopupData = {'id': row.id};
			var setting = {
				url: queryPopupURL,
				queryParams: queryPopupData,
				pageSize:10,
				columns:[[
					{ field: 'app', title: '应用包名', width: 100 },  
	                { field: 'vc', title: '版本号', width: 50 },
	                { field: 'vn', title: '版本名', width: 50 },
	                { field: 'operate', title: '状态', width: 50 },  
	                { field: 'createTime', title: '创建时间', width: 80 }
				]]
			};
			Common.datagrid(setting, $('#J_PopupDataGrid'));
	   }
		
	   /* 配置信息内容*/
	   function getInfoView(obj){
			var $html = $('<div class="form-group form-grid form-group-search form-media-background">' +
		            	'<fieldset class="fieldset">'+
	            			'<legend class="legend">终端信息</legend>' + 
				               '<ul class="list-inline form-list-col form-list-col3">' + 
				               		'<li class="form-item">' + 
										'<label class="form-label" for="name"><span class="langbox">品牌</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
										'<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.brand==undefined?'':obj.terminal.brand)+'</span></div>' + 
				                        '</div>' + 
									'</li>' +
									'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">手机型号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.model==undefined?'':obj.terminal.model)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
			                   		'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">手机号码</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.mobile==undefined?'':obj.terminal.mobile)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">省份</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.province==undefined?'':obj.terminal.province)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">城市</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.district==undefined?'':obj.terminal.district)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">运营商</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.iso==undefined?'':obj.terminal.iso)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">基带版本</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.basebandVersion==undefined?'':obj.terminal.basebandVersion)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">内核版本</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.kernelVersion==undefined?'':obj.terminal.kernelVersion)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
				               		'<li class="form-item">' + 
										'<label class="form-label" for="name"><span class="langbox">应用包名</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
										'<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.appName==undefined?'':obj.terminal.appName)+'</span></div>' + 
				                        '</div>' + 
									'</li>' +
									'<li class="form-item">' + 
										'<label class="form-label" for="name"><span class="langbox">应用版本号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
										'<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.vc==undefined?'':obj.terminal.vc)+'</span></div>' + 
				                        '</div>' + 
									'</li>' +
									'<li class="form-item">' + 
										'<label class="form-label" for="name"><span class="langbox">应用版本名</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
										'<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.vn==undefined?'':obj.terminal.vn)+'</span></div>' + 
				                        '</div>' + 
									'</li>' +
									'<li class="form-item">' + 
										'<label class="form-label" for="name"><span class="langbox">网络类型</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
										'<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.net==undefined?'':obj.terminal.net)+'</span></div>' + 
				                        '</div>' + 
									'</li>' +
									'<li class="form-item">' + 
										'<label class="form-label" for="name"><span class="langbox">imei</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
										'<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.imei==undefined?'':obj.terminal.imei)+'</span></div>' + 
				                        '</div>' + 
									'</li>' +
									'<li class="form-item">' + 
										'<label class="form-label" for="type"><span class="langbox">imsi</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
										'<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="type1">'+(obj.terminal.imsi==undefined?'':obj.terminal.imsi)+'</span></div>' + 
				                        '</div>' + 
									'</li>' +
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">系统总内存</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.totalMemory==undefined?'':obj.terminal.totalMemory)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">当前可用内存大小</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.availMemory==undefined?'':obj.terminal.availMemory)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">手机总内存</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.memorySize==undefined?'':obj.terminal.memorySize)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">可用的内存空间</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.availMemorySize==undefined?'':obj.terminal.availMemorySize)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">sd卡总内存</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.sdSize==undefined?'':obj.terminal.sdSize)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">sd卡可用内存</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.sdAvailSize==undefined?'':obj.terminal.sdAvailSize)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">手机宽度</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.width==undefined?'':obj.terminal.width)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">手机高度</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.height==undefined?'':obj.terminal.height)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">本地语言</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.lang==undefined?'':obj.terminal.lang)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
			                   		'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">商家名称</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
					                     '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.merchants==undefined?'':obj.terminal.merchants)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
			                   		'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">mac</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.mac==undefined?'':obj.terminal.mac)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">安卓系统版本</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.osv==undefined?'':obj.terminal.osv)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">国家地区</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.region==undefined?'':obj.terminal.region)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">系统版本号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.sysVersion==undefined?'':obj.terminal.sysVersion)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">sdk版本号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.sdkVersion==undefined?'':obj.terminal.sdkVersion)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">商家版本号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.merchantsVersion==undefined?'':obj.terminal.merchantsVersion)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
// 		                   			'<li class="form-item form-item-type">' + 
// 				                       ' <label for="type" class="form-label"><span class="langbox">类型</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
// 				                       '<div class="form-element">' + 
// 				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.model==undefined?'':obj.terminal.model)+'</span></div>' + 
// 				                        '</div>' + 
// 		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">时区</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.timeZone==undefined?'':obj.terminal.timeZone)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">创建时间</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.createTime==undefined?'':obj.terminal.createTime)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">最后更新时间</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.lastUpdateTime==undefined?'':obj.terminal.lastUpdateTime)+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
		                   			'<li class="form-item form-item-type">' + 
				                       ' <label for="type" class="form-label"><span class="langbox">状态</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
				                       '<div class="form-element">' + 
				                            '<div class="f-fix"><span class="value" id="name1">'+(obj.terminal.status==1?'<span class="tag tag-success tag-width">启用</span>':'<span class="tag tag-danger tag-width">停用</span>')+'</span></div>' + 
				                        '</div>' + 
		                   			'</li>' + 
								'</ul>' + 
							'</<fieldset>'+
							'</div>');
  	    	return $html;
  	    } ;
    })();
</script>
</html>
