
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title></title>

<link rel="stylesheet" href="lib/base/css/reset.css">
<link rel="stylesheet" href="lib/base/css/base.css">
<link rel="stylesheet" href="lib/base/css/login.css">
<script src="lib/base/js/jquery-1.8.0.min.js"></script>
<script src="lib/base/js/jquery.cookie.js"></script>
<script src="lib/base/js/jquery.md5.js"></script>
<script src="lib/autocomplete/jquery.validate.js"></script>
<script src="lib/sys/lang-zh_CN.js"></script>
<script src="lib/sys/common.js"></script>
<script src="lib/sys/form.js"></script>
<script src="lib/sys/logindata.js"></script>
<script src="lib/localSys/lang-zh_CN.js"></script>
<link rel="shortcut icon" href="favicon.ico" />
</head>
<body class="login">
<div class="content-page invisible" id="J_ContentPage"> 
	<div class="main" id="J_Main">
		<div class="box-page-header">
		    <h2 class="box-header-title site-title">
		         <img class="logo-img" src="" height="60" id="J_LogoImg" />
		         <span class="logo-text" id="J_LogoText"></span>
		    </h2>
		</div>
		<form action="" method="post" name="loginForm" id="J_PostForm" class="form">
		<div class="box-page" id="J_BackgroundColor">
			<div class="box-page-content">
				<img id="J_BackgroundImg" class="login-img" src="" width="1000" height="600"/>
				<div class="box box-login clearfix">
					<div class="box-heading">
		                <h2 class="box-title site-title" data-lang="userLoginName"></h2>
					</div>
					<div class="box-body">
		                <div class="text text-center" id="J_Mssage"></div>
						<div class="form-group form-group-login">
							<ul class="list-unstyled">
		                        <li class="form-item form-item-username">
									<label class="form-label form-label-icon" for="userName"><span class="langbox" data-lang="userName"></span><span class="langbox" data-lang="commonColon"></span></label>
									<div class="form-element">
										<div class="f-fix"><input class="input-text" type="text" id="userName" name="login_user_name" placeholder="{*userName*}" autocomplete="off" /></div>
									</div>
								</li>
								<li class="form-item form-item-password">
									<label class="form-label form-label-icon" for="password"><span class="langbox" data-lang="password"></span><span class="langbox" data-lang="commonColon"></span></label>
									<div class="form-element">
										<div class="f-fix"><input class="input-text" type="password" id="password" name="login_pass_word" placeholder="{*password*}" autocomplete="off" /></div>
									</div>
								</li>
<!-- 		                        <li class="form-item form-item-remember"> -->
<!-- 									<label class="form-label assist" for="remember"><span class="langbox" data-lang="rememberUserName"></span><span class="langbox" data-lang="commonColon"></span></label> -->
<!-- 									<div class="form-element"> -->
<!-- 										<div class="f-fix"> -->
<!-- 											<label for="isRemember"> -->
<!-- 			                                    <input class="input-checkbox" value="1" type="checkbox" id="isRemember" name="isRemember" checked /> -->
<!-- 			                                    <span class="checkbox-text"><span class="langbox" data-lang="rememberUserName"></span></span> -->
<!-- 			                                </label> -->
<!-- 		                                </div> -->
<!-- 									</div> -->
<!-- 								</li> -->
							</ul>
						</div>
					</div>
					<div class="box-footer">
						<button type="submit" class="btn btn-success" id="J_SubmitButton"><span><span id="J_SubmitText" data-lang="buttonSignIn"></span></span></button>
					</div>
				</div>
			</div>
		</div>
		</form>
		<div class="box-page-foorer">
			<div class="layout">
		         <p class="copyright" id="J_Copyright">
		              <span class="copy" id="J_Copy">&copy; 2015</span>
		              <span class="company-name J_CompanyName"></span>
		              <!--<span class="icp" id="J_ICP">粤ICP备12007869号</span>-->
		         </p>
		            
		         <div class="company-info" id="J_CompanyInfo">
		              <span class="address" id="J_CompanyAddressBox"><span data-lang="address"></span><span data-lang="commonColon"></span><span id="J_CompanyAddress"></span></span>
		              <span class="tel" id="J_CompanyTelBox"><span data-lang="companyTel"></span><span data-lang="commonColon"></span><span id="J_CompanyTel"></span></span>
		              <span class="fax" id="J_CompanyFaxBox"><span data-lang="companyFax"></span><span data-lang="commonColon"></span><span id="J_CompanyFax"></span></span>
		         </div>
		    </div>
		</div>
	</div>
</div>
</body>

<script>
	var loginData = new LoginData();
    (function () {
    	
    	setBasicInfo();
    	
    	displayText();
        
        displayAttrText();
		
		/* 输入框右侧的移除功能 */
		new InputUI();
		
		displayContentPage();
    	
        bindEventOfForm();
        
        setMainCSS();
        
        $(window).resize(function(e){
        	setMainCSS();
        });
        
        /* 调整Main绝对定位 */
        function setMainCSS(){
        	var winHeight = $(window).height();
        	var bodyHeight = $('#J_Main').outerHeight();
        	
        	if(winHeight < bodyHeight){
	        	$('#J_Main').removeClass('main-position');
        	}else{
        		$('#J_Main').addClass('main-position');
        	}
        }
        
        
        /* 填充自定义信息 */
        function setBasicInfo() {
        	var companyName = loginData.getCompanyName(),
        		websiteName = loginData.getWebsiteName(),
	            companyAddress = loginData.getCompanyAddress(),
	            				
        		/* 自定义项 */
        		logoImg = loginData.getLogoImg(),
        		backImg = loginData.getBackImg(),
        		backColor = loginData.getBackColor();
        		
            $('.J_CompanyName').text(companyName);
	        $('#J_LogoImg').attr('src', '/lib/base/images/logo.jpg').attr('title', websiteName).attr('alt', websiteName);
            $('#J_LogoText').text("");
			
            if(!companyAddress){
            	$('#J_CompanyAddressBox').addClass('hidden');
            }else{
	            $('#J_CompanyAddress').text(companyAddress);
            }
            
            $('#J_CompanyTelBox').addClass('hidden');
            $('#J_CompanyFaxBox').addClass('hidden');
                        
            $('#J_BackgroundImg').attr('src', '/lib/base/images/home2.jpg');
            $('#J_BackgroundColor').css('background-color', '#FFFFFF');
        }

        
        /* 显示页面中的文字 */
        function displayText() {
            var elements = $('[data-lang]'),
                langName = '',
                text = '';

            if (!elements.length) {
                return;
            }

            $.each(
                elements,
                function (index, value) {
                    langName = $(value).data('lang');
                    text = Lang[langName];
                    if (text) {
                        $(value).text(text).attr('title', text);
                    }
                }
            );
            
            
        }
        
        /* 显示页面中属性中的文字 */
        function displayAttrText() {
            var attrs = ['placeholder', 'title', 'alt'],
                reg = /\{\*(.+)\*\}/g,
                elements = null,
                langName = '',
                text = '';

            $.each(
                attrs,
                function (index, value) {
                    elements = $('[' + value + ']');
                    if (elements.length == 0) {
                        return true;
                    }
                    $.each(
                        elements,
                        function (idx, val) {
                            langName = $(val).attr(value).replace(reg, '$1');
                            text = Lang[langName];
                            if (text) {
                                $(val).attr(value, text);
                            }
                        }
                    )
                }
            );
        }

        /* 显示内容主体 */
        function displayContentPage() {
            $('#J_LoadPage').fadeOut('fast');
            $('#J_ContentPage').removeClass('invisible');
        }
        
        /* 表单提交 */
        function bindEventOfForm() {
            var userNameCookie = $.cookie('userName');
            $("#userName").focus();
            if (userNameCookie) {
                $("#userName").val(userNameCookie);
                $("#password").focus();
            }
            var $form = $('#J_PostForm');
            $form.submit(function (e) {
                e.preventDefault();

                var $msgObj = $('#J_Mssage'),
					$submitButton = $("#J_SubmitButton"),
					$userName = $('#userName'),
					$password = $('#password');
                	$checkCode = $('#J_checkCode');

                if (!$userName.val()) {
                    $msgObj.attr('class', '').addClass('text text-center text-danger').html(Lang.msgUserNameCannotEmpty);
                    $userName.focus();
                    return;
                }

                if (!$password.val()) {
                    $msgObj.attr('class', '').addClass('text text-center text-danger').html(Lang.msgPasswordCannotEmpty);
                    $password.focus();
                    return;
                }
                                
                var postURL = '/androidManager/loginAction!login.do?from=web',
					postData = {'name': $userName.val(),'password': $.md5($password.val()),'checkCode':$checkCode.val(),'isRemember': $('[name="isRemember"]:checked').val()},
                    jumpUrl = 'page/home.jsp';

                $.ajax({
                    url: postURL,
                    type: 'post',
                    data: postData,
                    beforeSend: function () {
                        $msgObj.attr('class', '').addClass('text text-center text-primary').html('<i class="icon icon-loading"></i>' + Lang.msgSigninWaitting);
                        $submitButton.attr('disabled', true).addClass('disabled');
                    },
                    success: function (data, status) {
                        data = Common.stringToJSON(data);
                        
                        $submitButton.attr('disabled', false).removeClass('disabled');
                        if(data.success) {
	                        if (postData.isRemember) {
	                            $.cookie('userName', postData.userName, { expires: 365, path: '/' });
	                        } else {
	                            $.cookie('userName', null);
	                        }
	                        $msgObj.attr('class', '').addClass('text text-center text-success').html(data.msg + Lang.msgLoadingData);
	                        loginData.removeCacheData();
	                        loginData.setCacheData(data.obj);
	                        loginData.setLoginUrl(location.href);
	                        $msgObj.html(Lang.msgJumpin);
	                        location.href = jumpUrl;
                        }else{
                        	$msgObj.attr('class', '').addClass('text text-center text-danger').html(data.msg);
                        }
                    },
                    error: function () {
                        $msgObj.removeClass('text-success').addClass('text text-center text-danger').html(Lang.msgRequestFailed);
                        $submitButton.attr('disabled', false).removeClass('disabled');
                    }
                });
            });
        }
    })();
</script>
</html>