<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title>您还没有登录或登录已超时，请重新登录。</title>
    <style>
      *{
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          -o-box-sizing: border-box;
          -ms-box-sizing: border-box;
          box-sizing: border-box;
      }
      .msgbox{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -365px;
        margin-top: -110px;
        background: url(/lib/base/images/error.png) no-repeat 0 0;
        width: 730px;
        height: 220px;
        padding: 20px 50px 20px 200px;
      }
      .msgbox .title{
        font-family: "Microsoft YaHei";
        font-size: 24px;
        color: #189da2;
        font-weight: normal;
        margin-bottom: 30px;
      }
      .msgbox .content{
        color: #555;
        font-size: 14px;
        line-height: 24px;
      }
      .msgbox p{
        margin: 0;
      }
      a{
        color:#0081cc;
        text-decoration:none;
      }
    </style>
  </head>
<%
	String contextPath = request.getContextPath();
	int index = contextPath.lastIndexOf("/");
	String sysPath =contextPath.substring(0, index);
%>
  <body>
    <div class="msgbox">
      <h1 class="title">您还没有登录或登录已超时。</h1>
      <div class="content">
        您可以：<br />
        <ul>
          <li><a href="/login.jsp" id="returnHome">重新登录</a></li>
        </ul>
      </div>
    </div>
  </body>
  <script>
//   	if(window.localStorage){
//   		var url = localStorage.getItem('loginUrl');
//   		url = url.replace(/\"/g, '');
//   		document.getElementById('returnHome').href = url;
//   	}
  </script>
</html>
