<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>登录test</title>
	<script src="lib/base/js/jquery-1.8.0.min.js"></script>
	<script src="lib/base/js/jquery.ajaxfileupload.js"></script> 

</head>
<body>
<form method="post" id="J_PostForm" action='/androidManager/fileAction!uploadImg.do'>
	用户名：<input id="userName" type="text" value=""/>
	密码：<input id="password" type="text" value=""/>
	<input id="submitBtn" type="button" value="提交" onclick="clickSubmitBtn()">
	<br/>
	
	<div id="androidUpload" style="float:left;">
		<input type="file" class="valid" id="androidfile" name="androidfile" accept="image/*">
		<span class="text">只能上传后缀为.jpg .jpeg .bmp .gif .png .icon的图片文件</span>
	</div>
	<br/>
	
	<button type="button" id="J_Submit1" onclick="uploadImg()"><span><span>提交</span></span></button>
</form>
	
</body>
<script>
	$form = $('#J_PostForm');
	/* 上传图片 */
	function uploadImg(){
		var url = $form.attr('action');
		
	    var data = $form.serializeObject();
	  	var picfileIds = [];
		picfileIds.push('androidfile');
		
		$.ajaxFileUpload({
	    	url:  url,
	        secureuri: false,
	        fileElementId: picfileIds,
	        dataType: 'json',
	        data: data,
	        success: function (data, status) {
	        	alert(JSON.stringify(data));
	        },
	        error: function (data, status, e) {
	        	
	        }
	    });
	}

	/* ajax请求 */
	function clickSubmitBtn(){
		var name = $("#userName").val();
		var password = $("#password").val();
		/* alert(name); */
		var postURL = '/androidManager/fileAction!logout.do?from=web';
		var postData = {'name': name,'password': password};
		$.ajax({
            url: postURL,
            dataType: 'json',
            type: 'post',
            data: postData,
            success: function (data, status) {
                alert(JSON.stringify(data));
            },
            error: function () {
                
            }
        });
	}
</script>
</html>