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
													<label for="fullName" class="form-label"><span class="langbox">型号</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="upgrade.model" id="model" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">商家</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="upgrade.merchants" id="merchants" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">版本号</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="upgrade.version" id="appVersion" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">升级类型</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix">
							                            	<select class="select form-selected" name="upgrade.mode" id="mode">
							                            	 	<option value="" data-lang="pleaseSelect"  selected="selected"></option>
								                                <option value="0">增量升级</option>
								                                <option value="1">完整升级</option>
							                            	</select>
							                            </div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">状态</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix">
							                            	<select class="select form-selected" name="upgrade.status" id="status">
							                            	 	<option value="" data-lang="pleaseSelect"  selected="selected"></option>
								                                <option value="0">暂存</option>
								                                <option value="1">审核中</option>
								                                <option value="2">审核通过</option>
								                                <option value="-1">审核未通过</option>
								                                <option value="3">停用</option>
								                                <option value="4">激活</option>
							                            	</select>
							                            </div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">标题</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="upgrade.title" id="title" /></div>
							                        </div>
												</li>
												<li class="form-item form-item-fullName">
													<label for="fullName" class="form-label"><span class="langbox">内容</span><span class="langbox" data-lang="commonColon"></span></label>
													<div class="form-element">
							                            <div class="f-fix"><input type="text" class="input-text" name="upgrade.content" id="content" /></div>
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
			postUrl = "/androidManager/upgrade!upgradeList.do",
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
				onSelect: selectHandler,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
					{ field: 'model', title: '型号', width: 80 },
		            { field: 'merchants', title: '商家', width: 80 },  
	                { field: 'version', title: '版本号', width: 80 }, 
	                { field: 'utc', title: 'utc', width: 80 }, 
	                { field: 'mode', title: '升级类型', width: 80,formatter: getType,align: 'center' }, 
	                { field: 'increaseVersion', title: '原基础版本号', width: 80 }, 
	                { field: 'fileSize', title: '文件大小(KB)', width: 50,formatter: getFileLengthToKb }, 
	                { field: 'title', title: '标题', width: 80 },  
	                { field: 'content', title: '内容', width: 150 },
	                { field: 'status', title: '状态', width: 50 ,formatter: getStatus,align: 'center'},
	                { field: 'lastUpdater', title: Lang.lastUpdatePerson, width: 70, align: 'center' },
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 70, align: 'center', sortable:true }
				]]
			};
			Common.datagrid(setting);
	    }
	    
	    /* 将文件大小转换为kb显示*/
		function getFileLengthToKb(value, rows){
			value=Common.stringToNumber(value);
			value=(value/1024).toFixed(2);
			return value;
		}
		
		function getStatus(value, rows){
			return Common.getUpgradeStatus(value);
		}
		
		function getType(value, rows){
// 			if(value==0){
// 				return '增量升级';
// 			}else{
// 				return '完整升级';
// 			}
			num = Common.stringToNumber(value);
	    	switch(num){
	    		case 0 :
	    			return '<span class="tag tag-blue-green tag-width">增量升级</span>';
	    			break;
	    		case 1 :
	    			return '<span class="tag tag-success tag-width">完整升级</span>';
	    			break;
	    		default :
	    			return num;
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
		    	if(menuNO === 5120){
		    		Common.edit('/page/upgrade/upgradeEdit.jsp?menuNO=5120', 'id', $dataGrid);
		    		return;	
		    	}
		    	
		    	//删除
		    	if(menuNO === 5130){
		    		var row = $dataGrid.datagrid("getSelected");
			        Common.remove('/androidManager/upgrade!deleteUpgrade.do', 'id', $dataGrid);
		    		return;	
		    	}
		    	//审批
		    	if(menuNO === 5140){
		    		var mediaInfo = Common.getDataByAjax('/androidManager/upgrade!getById.do', {'id':row.id});
		    		var dialog = new Dialog({
		    			title :'软件包信息',
						width :1000,
						height:500,
						buttons: [
							{text:Lang.buttonSubmit, click:function(e){postApproveCompleteback(e);}, styleName:'btn-success'},
							{text:Lang.buttonCancel, click:function(e){e.close();}, styleName:'btn-default'}
		    			], 
		                content: getInfoView(mediaInfo,1)
					});
					dialog.open();
					approveCompleteFormEvents(dialog);
					return;
		    	}
		    	//停用
		    	if(menuNO === 5150){
		    		var statusStr = '确定停用该软件包？';
			    	confirmDialog(statusStr, Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/upgrade!updateStatus.do', {'id':row.id,'status':3}, function(res){
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
		    	//发布
		    	if(menuNO === 5160){
		    		var statusStr = '确定发布该软件包？';
			    	confirmDialog(statusStr, Lang.alertTitlePrompt, function() {
				    	Common.getDataByAjax('/androidManager/upgrade!updateStatus.do', {'id':row.id,'status':4}, function(res){
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
		    	//查看
		    	if(menuNO === 5170){
		    		var mediaInfo = Common.getDataByAjax('/androidManager/upgrade!getById.do', {'id':row.id});
		    		var dialog = new Dialog({
		    			title :'软件包信息',
						width :1000,
						height:400,
						buttons: [
							{text:Lang.buttonCancel, click:function(e){e.close();}, styleName:'btn-default'}
		    			], 
		                content: getInfoView(mediaInfo,0)
					});
					dialog.open();
					return;
				}
		    	
		    });
	    }
	    /* datagrid选中一行事件 */
        function selectHandler(rowIndex, rowData) {
			var status  = rowData.status;
			//5140审批  5150 停用 5160 激活
			if(status ==0){//暂存
				$('[data-menu-number="5120"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5140"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5150"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5160"]').attr('disabled', true).addClass('disabled').css('cursor', 'default');
			}else if(status == 1){//审核
				$('[data-menu-number="5120"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5140"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5150"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5160"]').attr('disabled', true).addClass('disabled').css('cursor', 'default');
			}else if(status == 2){//审批通过
				$('[data-menu-number="5120"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5140"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5150"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5160"]').attr('disabled', false).removeClass('disabled').css('cursor', 'default');
			}else if(status == 3){//停用
				$('[data-menu-number="5120"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5140"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5150"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5160"]').attr('disabled', true).addClass('disabled').css('cursor', 'default');
			}else if(status == 4){//发布
				$('[data-menu-number="5120"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5140"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5150"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5160"]').attr('disabled', true).addClass('disabled').css('cursor', 'default');
			}else if(status ==-1){//打回
				$('[data-menu-number="5120"]').attr('disabled', false).removeClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5140"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5150"]').attr('disabled', true).addClass('disabled').css('cursor', 'pointer');
		    	$('[data-menu-number="5160"]').attr('disabled', true).addClass('disabled').css('cursor', 'default');
			}
        }

		/* 审核 ----回调 */
	    function postApproveCompleteback(){
	    	confirmDialog(Lang.isApproveSubmit, Lang.alertTitlePrompt, function() {
	        	$('#approveCompleteForm').submit();
	    	});
	    }
	    
	    /* 审核----提交 */
	    function approveCompleteFormEvents(dialog){
	    	var $approveCompleteForm = $('#approveCompleteForm');	
	    	$approveCompleteForm.validate({
	 	        rules: {
	 	        	approveStatus: "required"
	 	        },
	 	        submitHandler: function (form) {
	 	        	
	 	            data = $approveCompleteForm.serializeObject();         
	 	            Common.getDataByAjax('/androidManager/upgrade!updateApprove.do', data, function(res){
	 					if(res.success){
	 						msgDialog(res.msg, '', '', function(){
	 						    //审批提交成功，并重新回到查询列表页面
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

	    /* 配置信息内容*/
	   function getInfoView(obj,type){
		   var appeove = '';
		   if(type == 1){
			   appeove ='<fieldset class="fieldset">'+
		   			'<legend class="legend">'+Lang.mediaApproveInfo+'</legend>' + 
						'<form id="approveCompleteForm" class="form form-search" method="post">' + 
							 '<input type="hidden" name="id" value="'+obj.id+'">'+
							 '<ul class="list-unstyled">' + 
								'<li class="form-item">' + 
									'<label class="form-label" for="alarmTel1"><span class="remind-span">*</span><span class="langbox">'+Lang.approvesResult+'</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
									'<div class="form-element">' + 
			                            '<div class="f-fix">'+
					                   		'<input type="radio" name="status" id="approveStatus1" value="2" checked /><span class="radio-text">'+Lang.mediaApprovePass+'</span>'+
					                   		'<input type="radio" name="status" id="approveStatus2" value="-1" /><span class="radio-text">'+Lang.mediaApproveRollBack+'</span>'+
										'</div>' + 
			                        '</div>' + 
								'</li>' +
								'<li class="form-item">' + 
									'<label class="form-label" for="alarmTel1"><span class="langbox">'+Lang.approveMsg+'</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
									'<div class="form-element">' + 
			                            '<div class="f-fix">'+
			                            	'<textarea class="textarea" id="approveComment1" name="approveContent"></textarea>'+									
			                            '</div>' + 
			                        '</div>' + 
								'</li>' +
				             '</ul>'+
			     		'</form>'+
		    			'</fieldset>';
			}
			var $html = $('<div class="form-group form-grid form-group-search form-media-background">' +
		        	'<fieldset class="fieldset">'+
					'<legend class="legend">软件包信息</legend>' + 
		               '<ul class="list-inline form-list-col form-list-col2">' + 
							'<li class="form-item">' + 
								'<label class="form-label" for="name"><span class="langbox">型号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
								'<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.model+'</span></div>' + 
		                        '</div>' + 
							'</li>' +
							'<li class="form-item">' + 
								'<label class="form-label" for="type"><span class="langbox">商家</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
								'<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="type1">'+(obj.merchants||'')+'</span></div>' + 
		                        '</div>' + 
							'</li>' +
							'<li class="form-item">' + 
								'<label class="form-label" for="type"><span class="langbox">utc(系统包生成时间)</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
								'<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="type1">'+(obj.utc||'')+'</span></div>' + 
		                        '</div>' + 
							'</li>' +
		               		'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">版本号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
			                     '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.version+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">升级类型</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
			                     '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+getType(obj.mode)+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">原基础版本号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
			                     '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.increaseVersion+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">android版本号</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.androidVersion+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           		'</ul>'+
		           		'<ul class="list-unstyled">' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox"> 文件名称</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.fileName+'</span>'+
		                            '<a  class="value" class="link" href='+obj.fileUrl+'>下载</a>'+
		                            '</div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           		'</ul>'+
		           		'<ul class="list-inline form-list-col form-list-col2">' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">文件类型</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.fileType+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">文件大小(KB)</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+getFileLengthToKb(obj.fileSize)+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">创建时间</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.createTime+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		               		'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">发布时间</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
			                     '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+(obj.releaseDate||'')+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">状态</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+Common.getUpgradeStatus(obj.status)+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		       			'</ul>'+
		       		   	'<ul class="list-unstyled">' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">升级标题</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.title+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		           			'<li class="form-item form-item-type">' + 
		                       ' <label for="type" class="form-label"><span class="langbox">升级内容</span><span class="langbox">'+Lang.commonColon+'</span></label>' + 
		                       '<div class="form-element">' + 
		                            '<div class="f-fix"><span class="value" id="name1">'+obj.content+'</span></div>' + 
		                        '</div>' + 
		           			'</li>' + 
		       			'</ul>'+
					'</fieldset>'+appeove+
					'</div>');
  	    	return $html;
  	    } ;

    })();
</script>
</html>
