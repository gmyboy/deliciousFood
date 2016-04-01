<%@ page import="cn.inovance.iotas.web.common.util.PropertiesUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String resourcePath = PropertiesUtils.getProperties().getProperty("resource");
	String version = PropertiesUtils.getProperties().getProperty("version");
 %>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="../base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="../base/include.jsp"></jsp:include>
</head>
<body class="baseinfo baseinfo-building baseinfo-building-edit">
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
                            <div class="box-layout" id="J_BoxLayout" data-rule="resizeSimple">
						        <div class="layout-main" id="J_LayoutMain">
						        <form method="post" class="form" id="J_PostForm">
						        	<fieldset class="fieldset">
						            	<legend class="legend"><h2 class="title"><span class="langbox" data-lang="selectedElevator"></span><span class="remind-span"> * </span><a id="selectElev" class="fieldsetBut" href="javascript:;" >选择电梯</a><a id="clearAllElev" class="fieldsetBut" href="javascript:;" >清空</a></h2></legend>
						            	<div class="fieldset-body" id="J_SelectedList"></div>
					           		</fieldset>
						            <fieldset class="fieldset">
						            	<legend class="legend" data-lang="mediaRangeInfo"></legend>
							               <div class="block block-contract" id="J_BlockContract">
				                           
				                            <div class="block-body">
												<div class="form-group form-grid form-group-set-trapped-people" id="J_TrappedPeople">
													<ul class="list-unstyled">
						                               
						                                <li class="form-item form-item-contract-NO">
										                    <label class="form-label" for="contractNO"><span class="remind-span">*</span><span class="langbox" data-lang="mediaRangeName"></span><span class="langbox" data-lang="commonColon"></span></label>
										                    <div class="form-element">
											                    <div class="f-fix"><input class="input-text" type="text" id="name" name="name" /></div>
										                    </div>
									                    </li>
						                              
						                                 <li class="form-item form-item-version-context">
												             <label class="form-label" for="upLoadApkversionContext"><span class="remind-span"></span><span class="langbox" data-lang="inspectionDescription"></span><span class="langbox" data-lang="commonColon"></span></label>
												             <div class="form-element">
													              <div class="f-fix"><textarea class="textarea" id="remark" name="remark"></textarea></div>
												             </div>
											              </li>      						                              
						                            </ul>
												</div>
				                            </div>
				                        </div>
							        </fieldset>
							        <div class="actions actions-style">
							        	     <input type="hidden"  name="approveStatus" id="approveStatus" value="0"/>
								        	 <button type="button" class="btn btn-success" id="J_Submit1"><span><span data-lang="mediaApproveTemporary"></span></span></button>
								        	 <button type="button" class="btn btn-success" id="J_Submit2"><span><span data-lang="submitApprove"></span></span></button>
				                        <a href="#" class="btn btn-default J_PreviousLink" id="J_Cancel" data-url=""><span><span data-lang="buttonCancel"></span></span></a>
							        	<span class="text" id="J_SendMsg"></span>
							        </div>
						        </form>
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
        
        <div class="hidden" id = "searchMainBox" >
       	<jsp:include page="../base/elevSearchMain.jsp"></jsp:include>
        </div>

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
			parentId = '0',
			data = null,
			$form = $('#J_PostForm'),
			$dataGrid = $('#J_DataGrid'),
			//获取有设备的电梯列表地址
			postUrl = URL.ElevMediaMainList,
			postData = {"flag":"mediaRange"},
			tagUi = new TagUI({
                selectedElement: $('#J_SelectedList'),
                placeholderMsg: Lang.pleaseSelectHasMainElevator,
                idField: 'id',
                fieldName: 'elevIds',
                datagrid: $('#J_DataGrid'),
                singleSelect: false,
//                	groupField: 'buildingName',
//                	groupTitleTemplate: '楼盘名称：{*buildingName*}',
                showField: {
                    text: ['factoryNO', 'aliasOfAddress'], //tag显示文字的字段名，可以是字符串也可以是数组['factoryNO', 'aliasOfAddress']
                    title: 'aliasOfAddress' //tag鼠标移上去title显示文字的字段名，可以是字符串也可以是数组
                },
                //保证在编辑状态下还有校验功能
             	removeTagCallback: removeTagHandler
            }),
	        jumpUrl = '';
      	
      	var selectElevList = new Array(), //在弹出的电梯列表中中选中的电梯
      		delSelectElevList = new Array();//需要取消的电梯列表
      		
        //获取弹出框的HTML内容
      	var  highSearchHtml = $("#searchMainBox").html();
      	
      	$("#searchMainBox").remove();
      	
      	
      	//点击更多筛选动态变换dialog高度
    	$(".switch-link").live('click',function(){
   		if($(".dialog-body").height() < 450)
		{
  			$(".dialog-body").height(450);
		}
   		else
		{
  			$(".dialog-body").height(380);
		}
      	});
      	
      	
    	setFormAction();
    	
    	if (isEditPage()) {
    		editHandler();
	    }
    	
    	jumpUrl = Common.pieceUrl(jumpUrl);
    	
        setSelectElev();
    	
    	setCancelUrl();
    
	    formEvents();
	    
	    resetLayout();
	    
	    //设置取消按钮的url
	    function setCancelUrl(){
	    	var cancelUrl = URL.GetMediaRangeList;
	    	switch(menuNO){
	    		case MenuNumber.mediaRangeAdd:
	    		//取消后跳转到媒体投放范围管理列表页面
	    			 cancelUrl = URL.GetMediaRangeList;
	    			 break;
	    	}
	    	//cancelUrl = Common.pieceUrl(cancelUrl);
	    	$("#J_Cancel").attr("href",Common.pieceUrl(cancelUrl));
	    	return cancelUrl;
	    }
	    
	    //判断是否为编辑页面
	    function isEditPage(){
	    	return (menuNO === MenuNumber.mediaRangeEdit) && id;
	    	
	    }
	    
	    //跳转到编辑页面的时候，自动异步查询该记录所绑定的电梯
	    function editHandler(){
	        data = Common.getDataByAjax(URL.GetMediaRangeByIdElev, {'id': id});
	        
	        if(data){ 
	        //获取该媒体投放范围所绑定电梯信息   	
	        	var elevList = data.elevList;
		        $.each(
		        	elevList,
                    function (i, v) {
                        tagUi.addTag(v, true, false);
                    }
                );
              
              
		        setFormValues(data);
	        }
	        //添加隐藏域
	        Common.addHiddenField(getPostFields(), $form);
	    }
		
	     //设置表单的action地址
	    function setFormAction(){
	    	var url = '';
	    	//如果是媒体范围添加
	    	if(menuNO == MenuNumber.mediaRangeAdd){
            	url = URL.AddMediaRange;
            }
            
            //如果是媒体范围编辑
            if(menuNO == MenuNumber.mediaRangeEdit){
            	url = URL.EditMediaRange;
            }	
			$form.attr('action', url);
		    url= Common.pieceUrl(url);
		   
	    }
	    
	    //设置表单值
	    function setFormValues(data) {
	        if (!data) {
	            return;
	        }
	        Common.fillValueToElement(data);
	    }
	
	    //获取隐藏域的字段对象
	    function getPostFields() {
	        var postFields = { 'id': id };
	        return postFields;
	    }

	    //表单验证
	    function formEvents(){    
	       
	        /*暂存用0表示*/
	    	$('#J_Submit1').click(function (e) {
	    		$("#approveStatus").val(0);
	    		$form.submit();
		    });

	    	/*提交审核用1来表示*/
	    	$('#J_Submit2').click(function (e) {
	    		confirmDialog(Lang.submitApproveTitle, Lang.alertTitlePrompt, function() {
		    		$("#approveStatus").val(1);
		    		$form.submit();
	        	});
		    });    
		    
	    	$form.validate({
               rules: {
                    elevIds: { required: isRequired() },
                    name: "required"
             
                },
		        submitHandler: function (form) {
		        //在编辑后的提交过程中再加一次验证，必须要选择电梯才能进行更新       
		            var url = $form.attr('action'),
		                data = $form.serialize();
		                jumpUrl = Common.pieceUrl(setCancelUrl());
		                
						$(".actions-style").append('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingSubmitData+'</span>');
		 	            $("#J_Submit1").attr('disabled', true).addClass('disabled');
		 	            $("#J_Submit2").attr('disabled', true).addClass('disabled');
		 	            $("#J_Cancel").attr('disabled', true).addClass('disabled');

		                Common.getDataByAjax(url, data, function(res){
		                    if(res.success){
		                        msgDialog(res.msg, Lang.alertTitlePrompt, 'info', function(){
		                            Common.jump(jumpUrl);
		                        });
		                    }else{
		                      	simpleDialog(res.msg);
				 	            $("#J_Submit1").attr('disabled', false).removeClass('disabled');
				 	            $("#J_Submit2").attr('disabled', false).removeClass('disabled');
				 	            $("#J_Cancel").attr('disabled', false).removeClass('disabled');
				 	            $(".text-primary").remove();
		                    }
						});
		        }
		    });
	    }
	    
      //是否是必填
        function isRequired() {
            if ($('#J_TagHiddenField').val() == '' && tagUi.getInitSelectedIdsArray().length === 0) {
                return true;
            }
            return false;
        }
     
       /* 设置datagrid参数 */
        function setDataGrid(queryURL, queryData) {
            //$dataGrid.append($('<style>.pagination-info{display:none;}</style>'));
            var setting = {
                url: queryURL,
                queryParams: queryData,
                onLoadSuccess: successHandler,
                onSelect: selectHandler,
                onUnselect: unselectHandler,
                onSelectAll: selectAllHandler,
                onUnselectAll: unselectAllHandler,
                singleSelect: false,
                pageSize:100,
                pageList:[10,50,100,200,500],
                columns: [[
                	{ field: 'checkbox', checkbox:true },
                    { field: 'factoryNO', title: Lang.factoryNO, width: 50 ,sortable:true},
                    { field: 'aliasOfAddress', title: Lang.aliasOfAddress, width: 77 ,sortable:true},
                    { field: 'useCompanyName',title:Lang.customerCompanyName, width: 75,sortable:true },
                    { field: 'lastUpkeepTime', title: Lang.lastUpkeepEndTime, width: 50 ,sortable:true},
                    { field: 'address', title: Lang.address, width: 100,sortable:true},
					{ field: 'regCode', title: Lang.mediaDeviceRegistCode, width: 100,sortable:true }
				]],
				showColumns: true
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
           			else
       				{
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
         
        /* tag删除事件的回调处理函数 ,保证在编辑过程中也必须有选择的电梯才能*/
        function removeTagHandler(rowData) {
            /*
            var index = $dataGrid.datagrid('getRowIndex', rowData.id);
            if (index || index == 0) {
                $dataGrid.datagrid('unselectRow', index);
            }
            */     
            $('input[name="elevIds"]').rules("remove");
            $('input[name="elevIds"]').rules("add", { required: isRequired()});
        }
        
              /* 重设布局 */
    	 function resetLayout(){
    		 var $dataGrid = $("#J_DataGridBox");
    		layoutSize.setPartOfResizeHeight($('#J_UpkeepBatch'), $('#J_BlockUpkeepBatch'), $('#J_BlockSelectedList'));
        	layoutSize.setPartOfResizeHeight($('#J_SelectList'), $('#J_BlockSelectList'), $('#J_SearchFormSidebar'));
        	$dataGrid.datagrid('resize');
        } 
        	//设置选择电梯事件
    	function setSelectElev()
    	{
    	
    		$("#selectElev").click(function(){
    		 
				 dialog = new Dialog({
					title : Lang.elevatorList,
					width:1200,
					height:380,
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
				elevListAddressCtrl = new AddressController({provinceId:'province', cityId:'city', areaId:'area'});
				setDataGrid(postUrl, postData);
    		});
    		$("#clearAllElev").click(function(){
    			tagUi.removeAllTags();
    			resetLayout();
    		});
    	}
    	/**
    	*	生成dialog的内容
    	**/
   	  function getLinkAgentInfo()
   	  {
   
        //获取电梯搜索页面
   		var $html = $('<form id="J_SearchrrrrForm" class="form form-search" method="post">'+highSearchHtml+'</form>'+
   				'<div class="datagrid-box datagrid-rescue-popup"><table cellpadding="0" cellspacing="0" class="table" id="J_DataGridBox"></table></div>'	
   			);
   	  
 
   		//绑定提交事件
    	$html.find('#J_ToolBarSearch').click(function (e) {
    		e.preventDefault();
	        var params = $("#J_SearchrrrrForm").serializeObject();

	        
	        if(params.elevStatus || params.deviceStatus){
	         	params.boundDeviceFlag = "Y";
	        }
	        //必须添加投放范围的筛选条件才可以
	        params.flag=postData.flag;
	       
	        setDataGrid(postUrl, params);
	    });
   		
    	//绑定重置事件
    	$html.find('#J_SearchRest').click(function(e){
    		elevListAddressCtrl.clearValues();
    		setDataGrid(postUrl, postData);
    	});
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
    
    })();
</script>
</html>