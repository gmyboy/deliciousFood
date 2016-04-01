<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<jsp:include page="base/meta.jsp"></jsp:include>
<title></title>
<jsp:include page="base/include.jsp"></jsp:include>
</head>
<body class="sys sys-user sys-user-list">
	<div class="loading-page" id="J_LoadPage"></div>
    <div class="content-page" id="J_ContentPage">
        <!--E 页头-->
        <jsp:include page="base/header.jsp"></jsp:include>
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
                                	<div class="box-body" id="J_BoxBody">
<!-- 							        	<div class="fieldset-group" data-rule="resize"> -->
							        		<fieldset class="fieldset">
												<legend class="legend" data-lang="welcomeInfo"></legend>
												<div class="box-welcome">
													<span class="employee-name J_EmployeeName"></span>，
													<span class="welcome-words" id="J_WelcomeWords"></span>。
												</div>
											</fieldset>
<!-- 							        	</div> -->
						        	</div>
	                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar col-left" id="J_ColLeft">
                        <jsp:include page="base/left.jsp"></jsp:include>
                    </div>
                </div>
            </div>
        </div>
        <!--E 主体二栏左布局-->

        <!--S 页脚-->
        <jsp:include page="base/footer.jsp"></jsp:include>
        <!--E 页脚-->

    </div>
</body>
<script>
    (function () {
    	/* 执行页面公共方法 */
    	new Page({
    		menuOpts:{showMenuType:[1, 2, 5, 7, 9]}
    	});
    })();
</script>
</html>
