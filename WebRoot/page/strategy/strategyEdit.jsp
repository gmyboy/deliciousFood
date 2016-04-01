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
							        	<fieldset class="fieldset">
							            	<legend class="legend"><h2 class="title"><span class="langbox">已选择的广告</span><span class="remind-span"> * </span><a id="selectElev" class="fieldsetBut" href="javascript:;" >选择广告</a><a id="clearAllElev" class="fieldsetBut" href="javascript:;" >清空</a></h2></legend>
							            		<div class="fieldset-body" id="J_SelectedList"></div>
					           			</fieldset>
							            <fieldset class="fieldset">
							            	<legend class="legend">广告策略</legend> 
								            <div class="form-group form-grid form-group-set-user">
										        <ul class="list-unstyled">
								                    <li class="form-item">
											  			<input class="input-text" type="password" autocomplete="off" style="display: none;"/>
											  		</li>
								                    <li id="J_password" class="form-item form-item-name">
												        <label class="form-label" for="name"><span class="remind-span">*</span><span class="langbox">策略名称</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text" type="text" id="name" name="name" autocomplete="off" /></div>
												        </div>
											        </li>
								                    <li class="form-item form-item-address">
												        <label class="form-label" for="startTime"><span class="remind-span">*</span><span class="langbox" >开始时间</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text input-date input-start" type="text" id="startTime" name="startTime" autocomplete="off" />
												        </div>
											        </li>
											        <li class="form-item form-item-phone">
												        <label class="form-label" for="endTime"><span class="remind-span">*</span><span class="langbox">结束时间</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <div class="f-fix"><input class="input-text input-date input-start" type="text" id="endTime" name="endTime" autocomplete="off" /></div>
												        </div>
											        </li>
										        </ul>
									        </div>
								        </fieldset>
					        	<fieldset class="fieldset">
					            <legend class="legend">选择终端</legend>
                                        <div class="form-group form-grid form-group-search form-group-search-user-list">
                                        	<ul class="list-inline list-autowidth">
<!--   											<ul class="list-inline form-list-col form-list-col4"> -->
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
												<li class="form-item form-item-btn">
							                        <div class="form-element">
							                        	<div class="f-fix">
								                        	<button type="button" class="btn btn-middle btn-primary" id="J_SearchSubmit"><span><span data-lang="buttonSearch"></span></span></button>
								                        	<button type="button" class="btn btn-middle btn-default" id="J_SearchRest"><span><span data-lang="buttonRest"></span></span></button>
							                        	</div>
							                        </div>							                        
							                    </li>
							                </ul>
							            </div>
<!--                                     	<div class="data-grid-box" id="J_DataGridBox1" data-rule="resize" style="height: 400px"><table cellpadding="0" cellspacing="0" class="table" id="J_DataGrid1"></table></div> -->
                                    	<div class="data-grid-box" id="J_DataGridBox1" style="height: 300px">
											<table cellpadding="0" cellspacing="0" class="table" id="J_DataGrid1"></table>
										</div>
							        	</fieldset>
							        	<div class="actions actions-style">
								        	<button type="submit" class="btn btn-success" id="J_Submit"><span><span data-lang="buttonSubmit"></span></span></button>
					                        <a href="/page/strategy/strategyList.jsp?menuNO=8200" class="btn btn-default J_PreviousLink" id="J_Cancel"><span><span data-lang="buttonCancel"></span></span></a>
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
		<%-- <div class="hidden" id = "searchMainBox" >
       		<jsp:include page="../base/elevSearchMain.jsp"></jsp:include>
        </div> --%>
    </div>
</body>

<script>
    (function () {
    	/* 执行页面公共方法 */
    	var page = new Page({
    		menuOpts:{showMenuType:[1, 2, 8, 9]}
    	});
    	    	
    	$("#startTime,#endTime").datepicker();
    	
    	page.setCurrentPageUrl();
    	
    	/*终端信息列表*/
    	setDataGrid1("/androidManager/terminalAction!terminalList.do", null);
		
	    formEvents1();
	    function setDataGrid1(queryURL, queryData) {
			var setting = {
				url: queryURL,
                rownumbers: true,
				queryParams: queryData,
				sortName:"lastUpdateTime",
				sortOrder:"desc",
				columns:[[
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
			Common.datagrid(setting,$("#J_DataGrid1"));
	    }
	    function formEvents1(){
	    	$("#J_SearchSubmit").click(function (e) {
		        e.preventDefault();
		        var params = $("#J_PostForm").serializeObject();
		        setDataGrid1('/androidManager/terminalAction!terminalList.do', params);
		    });
	    	
	    	$("#J_SearchRest").click(function(e){
	    		$("#imei").val('');
	    		$("#imsi").val('');
	    		$("#merchants").val('');
	    		$("#mobile").val('');
	    		$("#sysVersion").val('');
	    		$("#sdkVersion").val('');
	    		$("#region").val('');
	    		setDataGrid1('/androidManager/terminalAction!terminalList.do', null);
	    	});
	    }
    	/*广告信息列表*/
    	var param = page.getUrlParams(),
    		menuNO = Common.stringToNumber(param.menuNO),
	        id = param.id,
	        userName = '',
			data = null,
			$form = $('#J_PostForm'),
			//获取广告列表
			postUrl = '/androidManager/advertising!advertisingList.do',
			postData = null,
    		tagUi = new TagUI({
                selectedElement: $('#J_SelectedList'),
                placeholderMsg: '请选择相应的广告内容',
                idField: 'id',
                fieldName: 'adIds',
                datagrid: $('#J_DataGrid'),
                singleSelect: false,
                showField: {
                    text: ['title'], //tag显示文字的字段名，可以是字符串也可以是数组['factoryNO', 'aliasOfAddress']
                    title: 'title' //tag鼠标移上去title显示文字的字段名，可以是字符串也可以是数组
                },
                //保证在编辑状态下还有校验功能
             	removeTagCallback: removeTagHandler
            }),
	        jumpUrl = '';
	        
        var selectElevList = new Array(), //在弹出的广告列表中中选中的电梯
     		delSelectElevList = new Array();//需要取消的广告列表
      		
    	$('#name').val('');
    	$('#startTime').val('');
    	$('#endTime').val('');
    	$('#createTime').val('');

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
	    
	    //编辑处理函数
	    function editHandler(){
	        data = Common.getDataByAjax("/androidManager/strategyAction!getById.do", {'id': id});
	       	if(data){ 
	        //获取该广告策略所绑定广告信息   	
        	var elevList = data.adList;
	        $.each(
	        	elevList,
                   function (i, v) {
                       tagUi.addTag(v, true, false);
                   }
            );
			setFormValues(data);
	        Common.addHiddenField(getPostFields(), $form);
	    }
	    }
	    
		//设置表单的action
	    function setFormAction(){
	    	var url = '';
	    	//新增
	    	if(menuNO === 8220){
	    		url = '/androidManager/strategyAction!add.do';
	    	}
	    	//修改
			if(menuNO === 8210){
	    		url = '/androidManager/strategyAction!update.do';
	    	}
			$form.attr('action', url);
	    }
	    
	    //设置表单值
	    function setFormValues(data) {
	        if (!data) {
	            return;
	        }
	        var queryDate = JSON.parse(data.query.searchJson);
	        $('#imei').val(queryDate.imei);
	    	$('#imsi').val(queryDate.imsi);
	    	$('#model').val(queryDate.model);
	    	$('#phone').val(queryDate.phone);
	        Common.fillValueToElement(data);
	        var params = $("#J_PostForm").serializeObject();
		    setDataGrid1('/androidManager/terminalAction!terminalList.do', params);
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
	                { field: 'title', title: '标题', width: 80 },  
	                { field: 'type', title: '类型', width: 80 },
	                { field: 'content', title: '内容', width: 200 },
	                { field: 'status', title: '状态', width: 50,formatter: getAdvertisingStatus },
	                { field: 'lastUpdater', title: Lang.lastUpdatePerson, width: 70, align: 'center' },
	                { field: 'lastUpdateTime', title: Lang.lastUpdateTime, width: 120, align: 'center', sortable:true }
				]]
			};
			Common.datagrid(setting,$("#J_DataGridBox"));
	    }
	    
	    function getAdvertisingStatus(value, rows){
			return Common.getAdvertisingStatus(value);
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
		function selectHandler(rowIndex, rowData) {
			var index = getIndexInArray(delSelectElevList, rowData);
			if (index != -1) {
				delSelectElevList.splice(index, 1);
			} else {
				if (getIndexInArray(selectElevList, rowData) === -1) {
					selectElevList.push(rowData);
				}
			}
		}

		
		function unselectHandler(rowIndex, rowData) {
			var index = getIndexInArray(selectElevList, rowData);
			if (index != -1) {
				selectElevList.splice(index, 1);
			} else {
				if (getIndexInArray(delSelectElevList, rowData) === -1) {
					delSelectElevList.push(rowData);
				}
			}
		}

		function selectAllHandler(rows) {
			$.each(rows, function(i, v) {
				var index = getIndexInArray(delSelectElevList, v);
				if (index != -1) {
					delSelectElevList.splice(v, 1);
				} else {
					if (getIndexInArray(selectElevList, v) === -1
							&& !isInTagUi(tagUi.getSelectedIdsArray(), v.id)) {
						selectElevList.push(v);
					}
				}
			});
		}

		function unselectAllHandler(rows) {
			$.each(rows, function(i, v) {
				var index = getIndexInArray(selectElevList, v);
				if (index != -1) {
					selectElevList.splice(index, 1);
				} else {
					if (getIndexInArray(delSelectElevList, v) === -1
							&& isInTagUi(tagUi.getSelectedIdsArray(), v.id)) {
						delSelectElevList.push(v);
					}
				}
			});
		}

		function getIndexInArray(array, rowData) {
			var index = -1;
			$.each(array, function(i, v) {
				if (v.id === rowData.id) {
					index = i;
				}
			});
			return index;
		}

		function isInTagUi(array, id) {
			var result = false;
			$.each(array, function(i, v) {
				if (v === id) {
					result = true;
					return;
				}
			});
			return result;
		}
		
		/* tag删除事件的回调处理函数 ,保证在编辑过程中也必须有选择的电梯才能*/
		function removeTagHandler(rowData) {
			$('input[name="adIds"]').rules("remove");
			$('input[name="adIds"]').rules("add", {
				required : isRequired()
			});
		}

		/* 重设布局 */
		function resetLayout() {
			var $dataGrid = $("#J_DataGridBox");
			layoutSize.setPartOfResizeHeight($('#J_UpkeepBatch'),
					$('#J_BlockUpkeepBatch'), $('#J_BlockSelectedList'));
			layoutSize.setPartOfResizeHeight($('#J_SelectList'),
					$('#J_BlockSelectList'), $('#J_SearchFormSidebar'));
			$dataGrid.datagrid('resize');
		}

		//设置选择广告事件
		function setSelectElev() {
			$("#selectElev").click(function() {
				dialog = new Dialog({
					title : '选择广告',
					width : 800,
					height : 320,
					buttons : [ {
						text : "确定",
						styleName : 'btn-success',
						click : function(dialog) {
							refreshTagUi(dialog);
						}
					}, {
						text : "取消",
						styleName : 'btn-default',
						click : function(d) {
							d.close();
						}
					} ],
					content : getLinkAgentInfo()
				});
				dialog.open();
				selectElevList.length = 0;
				delSelectElevList.length = 0;
				bindEventOfMoreSwitch();
				setDataGrid(postUrl, {
					'ad.status' : 1
				});
			});
			$("#clearAllElev").click(function() {
				tagUi.removeAllTags();
				resetLayout();
			});
		}

		function getLinkAgentInfo() {
			//获取广告搜索页面
			var $html = $('<div class="datagrid-box datagrid-rescue-popup"><table cellpadding="0" cellspacing="0" class="table" id="J_DataGridBox"></table></div>');
			return $html;
		}

		//刷新tagUi
		function refreshTagUi(dialog) {
			//先添加
			$.each(selectElevList, function(i, v) {
				tagUi.addTag(v);
			});

			//再删除
			$.each(delSelectElevList, function(i, v) {
				tagUi.removeTag(v.id);
			});
			resetLayout();
			dialog.close();
		}
		
		//表单事件
		function formEvents() {
			
			$form.validate({
				rules : {
					adIds : {
						required : isRequired()
					},
					name : "required",
					startTime : "required",
					endTime : "required",
				},
				submitHandler : function(form) {
					var url = $form.attr('action'), 
					data = $form.serializeObject();
					var rowsTotal = $("#J_DataGrid1").datagrid("getData").total;
					if (rowsTotal == 0) {
						simpleDialog("终端列表不能为空");
						return;
					}
					$(".actions-style").append('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingSubmitData+'</span>');
	 	            $("#J_Submit").attr('disabled', true).addClass('disabled');
	 	            $("#J_Cancel").attr('disabled', true).addClass('disabled');
					
					Common.getDataByAjax(url,data,function(res) {
						if (res.success) {
							msgDialog(res.msg,Lang.alertTitlePrompt,'info',function() {
								if (param['autoClose']) {
									window.opener = null;
									window.open('','_self','');
									window.close();
								} else {
									Common.jump("/androidManager/page/strategy/strategyList.jsp?menuNO=8200");
								}
							});
						} else {
							simpleDialog(res.msg);
							$("#J_Submit").attr('disabled', false).removeClass('disabled');
				 	        $("#J_Cancel").attr('disabled', false).removeClass('disabled');
				 	        $(".text-primary").remove();
						}
					});
				}
			});
		}
		
		//是否是必填
		function isRequired() {
			if ($('#J_TagHiddenField').val() == ''
					&& tagUi.getInitSelectedIdsArray().length === 0) {
				return true;
			}
			return false;
		}
	})();
</script>
</html>