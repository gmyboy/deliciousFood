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
							            	<legend class="legend">升级软件包基本信息</legend> 
								            <div class="form-group form-grid form-group-set-user">
										        <ul class="list-unstyled">
										        	<li class="form-item" id="liTitle">
												        <label class="form-label" for="password1" style="width: 150px"><span class="remind-span">*</span><span class="langbox">型号</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text" type="text" id="model" name="model"/>
												        </div>
											        </li>
											        <li class="form-item" id="liTitle">
												        <label class="form-label" for="password1" style="width: 150px"><span class="remind-span">*</span><span class="langbox">商家</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
<!-- 													        <input class="input-text" type="text" id="merchants" name="merchants"/> -->
													        <select class="select" id="merchants" name="merchants">
									            			</select>
												        </div>
											        </li>
											        <li class="form-item" id="liTitle">
												        <label class="form-label" for="password1" style="width: 150px"><span class="remind-span">*</span><span class="langbox">版本号</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text" type="text" id="version" name="version"/>
												        </div>
											        </li>
											        <li class="form-item">
												        <label class="form-label" for="fullName" style="width: 150px"><span class="remind-span">*</span><span class="langbox">升级类型</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <label ><input type="radio" name="mode" id="mode1" value="1" />完整升级</label>&nbsp;&nbsp;
	                   										<label ><input type="radio" name="mode" id="mode2" value="0" />增量升级</label>
												        </div>
											        </li>
											        <li class="form-item" id="liIncreaseVersion" style="display: none;">
												        <label class="form-label" for="password1" style="width: 150px"><span class="remind-span">*</span><span class="langbox">增量升级基本版本号</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text" type="text" id="increaseVersion" name="increaseVersion"/>
												        </div>
											        </li>
											        <li class="form-item" id="liDetails" >
												        <label class="form-label" for="fullName" style="width: 150px"><span class="remind-span">*</span><span class="langbox">utc(系统包生成时间)</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text" type="text" id="utc" name="utc"/>
												        </div>
											        </li>
											        <li class="form-item" id="liTitle">
												        <label class="form-label" for="password1" style="width: 150px"><span class="remind-span">*</span><span class="langbox">android版本号</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text" type="text" id="androidVersion" name="androidVersion"/>
												        </div>
											        </li>
								                    <li class="form-item" id="liTitle">
												        <label class="form-label" for="password1" style="width: 150px"><span class="remind-span">*</span><span class="langbox">升级标题</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <input class="input-text" type="text" id="title" name="title"/>
												        </div>
											        </li>
											        <li class="form-item" id="liDetails" >
												        <label class="form-label" for="fullName" style="width: 150px"><span class="remind-span">*</span><span class="langbox">升级内容</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
													        <textarea class="textarea" id="content" name="content" style="width: 500px;height: 200px"></textarea>
												        </div>
											        </li>
											        <li class="form-item" id="liApp" >
												        <label class="form-label" for="fullName" style="width: 150px"><span class="remind-span">*</span><span class="langbox">android文件</span><span class="langbox" data-lang="commonColon"></span></label>
												        <div class="form-element">
												        	<div class="filetipsbox">
												        		<div id="androidUploadAgain" style="display:none;">
												        			<span id="androidElement"></span>
												        		    <a href="javascript:;" class="link" data-cols="2">重新上传</a>
												        		</div>
												        		<div id="androidUpload" style="float:left;">
													        		<input type="file" class="valid" id="androidfile" name="androidfile" accept="*"/>
												        		</div>
												        	</div>
												        </div>
											        </li>
										        </ul>
									        </div>
								        </fieldset>
								        <div class="actions actions-style">
					                        <input type="hidden"  name="status" id="status" value="0"/>
								        	<button type="button" class="btn btn-success" id="J_Submit1"><span><span>暂存</span></span></button>
								        	<button type="button" class="btn btn-success" id="J_Submit2"><span><span>提交审核</span></span></button>
					                        <a href="/page/upgrade/upgradeList.jsp?menuNO=5100" class="btn btn-default J_PreviousLink" id="J_Cancel"><span><span data-lang="buttonCancel"></span></span></a>
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
    	
    	var param = page.getUrlParams(),
    		menuNO = Common.stringToNumber(param.menuNO),
	        id = param.id,
	        userName = '',
			data = null,
			picNum = 0;
			runTimeNum = 0;
			timeNum = 0;
			oldMode=null;
			$form = $('#J_PostForm');
        
	    formEvents();
	    
		$("#utc").datetimepicker({
            showSecond: true,
            timeFormat: 'hh:mm:ss',
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1
        });
		
    	if (isEditPage()) {
    		//编辑页面
    		data = Common.getDataByAjax("/androidManager/upgrade!getById.do", {'id': id});
	        if(data){
		        setFormValues(data);  
		        oldMode = data.mode;
	        }
	        //app文件
			$("#androidElement").html(data.fileName);
			$("#androidUploadAgain").show();
			$("#androidUpload").hide();
			//升级模式
			if(data.mode == 1){
				$("#mode1").attr("checked","checked");
				$("#mode1").trigger("click");
			}else{
				$("#mode2").attr("checked","checked");
				$("#mode2").trigger("click");
			}
	        Common.addHiddenField(getPostFields(), $form);
    		$form.attr('action', '/androidManager/upgrade!update.do');
	    }else{
	    	//新增页面
	    	$form.attr('action', '/androidManager/upgrade!save.do');
	    }
	
		//判断是否为编辑页面
	    function isEditPage(){
	    	return id;
	    }
	    
		//获取隐藏域的字段对象
		function getPostFields(){
			var postFields = { 'id': id, 'userName': userName };
	        return postFields;
		}
				
		//设置表单值
		function setFormValues(data){
			if(!data){
				return;
			}
			Common.fillValueToElement(data);
		}
		
		//表单事件
	    function formEvents(){
	    
	    	$("[name=mode]").live('click',function(){
				if($(this).val()==0){
					$("#liIncreaseVersion").show();
				}else{
					$("#liIncreaseVersion").hide();
				}
			});
	    
	    	if(loginData.getLoginCompanyName()=='平台管理'){
	    		setMesters();
	    	}else{
	    		$("#merchants").append("<option value='"+loginData.getLoginCompanyName()+"'>"+loginData.getLoginCompanyName()+"</option>");
	    	}
	    	/*暂存*/
	    	$('#J_Submit1').click(function (e) {
	    		$("#status").val(0);
	    		$form.submit();
		    });

	    	/*提交审核*/
	    	$('#J_Submit2').click(function (e) {
	        	confirmDialog(Lang.submitApproveTitle, Lang.alertTitlePrompt, function() {
		    		$("#status").val(1);
		    		$form.submit();
	        	});
		    });
		    
		    $form.validate({
		        rules: {
		        	merchants: "required",
		        	appVersion: "required",
		        	androidVersion:"required",
		        	upgradeTitle:"required",
		        	upgradeContent:"required",
		        	androidfile:{
				      required:true
				    },
		        	download:"required",
				    model:"required",
				    mode:"required",
				    increaseVersion:"required"
		        },
		        submitHandler: function (form) {
		        	var url = $form.attr('action'),
		                data = $form.serializeObject();
		        	  var picfileIds = [];
		 				picfileIds.push('androidfile');
		 				
		 			$(".actions-style").append('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingSubmitData+'</span>');
	 	            $("#J_Submit1").attr('disabled', true).addClass('disabled');
	 	            $("#J_Submit2").attr('disabled', true).addClass('disabled');
	 	            $("#J_Cancel").attr('disabled', true).addClass('disabled');
		 				
		            $.ajaxFileUpload({
		            	url:  url,
				        secureuri: false,
				        fileElementId: picfileIds,
				        dataType: 'JSON',
				        data: data,
				        success: function (data, status) {
				        	data = typeof data === 'string' ? JSON.parse(data) : data;
				        	if(data.success){
	 	                        msgDialog(data.msg, Lang.alertTitlePrompt, 'info', function(){
	                            	Common.jump("/page/upgrade/upgradeList.jsp?menuNO=5100");
	                        	});
							}else{
								simpleDialog(data.msg);
				 	            $("#J_Submit1").attr('disabled', false).removeClass('disabled');
				 	            $("#J_Submit2").attr('disabled', false).removeClass('disabled');
				 	            $("#J_Cancel").attr('disabled', false).removeClass('disabled');
				 	            $(".text-primary").remove();
							}
				        },
				        error: function (data, status, e) {
				        	
				        }
				    });
		        }
		    });
		}
		
		//超链接点击事件绑定
		$(".link").live('click',function(){
			var dataCols = $(this).attr("data-cols");
			//app文件重新上传
			if(dataCols == '2'){
				$(this).parent().next().show();
				$(this).parent().hide();
			}
		});
		
		$(".input-text-number").live("blur",function(e){
			if(this.value){
				$(this).val(parseInt(this.value));
			}else{
				$(this).val(0);
			}
		});
				
		function setMesters(){
			var mestersList = Common.getDataByAjax("/androidManager/channelAction!channelList.do", {'status':1,'page':0, 'rows':0,'sortName':'name','sortOrder':'asc'});
			var ph ='';
	    	if(mestersList.rows){
		    	if(mestersList.rows.length>5){
		    		ph = '100';
		    	}else{
		    		ph = 'auto';
		    	}
				Common.setSelectByList(mestersList.rows, ['companyName','companyName'], 'merchants',$('#merchants'));
	    	}
		}
		
		//自动匹配商家
		function setUpkeepCompany() {
			Common.autocomplete({
				fieldName : 'companyName',//当前input 输入的搜索名，传入后台参数
				url : "/androidManager/channelAction!channelList.do",//请求后台的URL
				forceMatching : false,
				max : 20,
				extraParams : {
					rows : 10,
					type : 2
				},
				parse : function(data) {
					data = typeof data === 'string' ? JSON.parse(data) : data;
					return $.map(data.rows, function(row) {
						return {
							data : row,
							value : row.companyName,
							result : row.companyName
						};
					});
				},
				formatItem : function(row, i, max) {
					return row.companyName;
				}
			}, $('#merchants'));//当前input ID
		}
		
	})();
</script>
</html>