<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String fileUrl = request.getParameter("fileUrl");
	String width = request.getParameter("width");
	String height = request.getParameter("height");
	String endSecend = request.getParameter("endSecend");
	double jw = Double.parseDouble(width) - 20;
	double jh = Double.parseDouble(height) - 20;
	String isIE = request.getParameter("isIE");
%>
<!DOCTYPE HTML>
<html class="lang-zh-CN" lang="zh-CN">
<head>
<title></title>
</head>
<body class="vlc-page" style="padding: 0;margin: 0;">
	<div id="J_InstallAlert" style="width:<%=jw %>px;height:<%=jh %>px;border:1px solid #ddd;margin-left:4px;margin-top:10px;" >
		<span style="color: #e60012;font-size: 13px;">未检测到视频播放控件,请检查浏览器的安全设置，或者点击<a href="http://resource.dataserver.cn/lib/vlc/vlc-2.1.5-win32.zip" >下载</a>安装</span>
	</div>
	<%if(isIE.equals("1")){ %>
	<div class="vlcbox vlc-IE hidden" id="IEContainer">
		<object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" width="<%=width %>" height="<%=height %>" id="vlc" events="True">
			<param name="MRL" value="<%=fileUrl %>" />
			<param name="ShowDisplay" value="True" />
			<param name="AutoLoop" value="true" />
			<param name="AutoPlay" value="true" />
			<param name="Volume" value="80" />
			<param name="toolbar" value="false" />
			<param name='fullscreen' value="false" />
			<param name="StartTime" value="0" />
		</object>
	</div>
	<%}else{ %>
	<div class="vlcbox hidden" id="FFContainer">
		<embed type="application/x-vlc-plugin" name="video" controls=console autoplay="true" loop="true" width="<%=width %>px" height="<%=height %>px" src="<%=fileUrl %>" id="vlc" />
	</div>
	<%}%>
</body>
<script>
(function () {
	
	if (!! window.ActiveXObject || "ActiveXObject" in window) {
		isInsalledIEVLC();
    } else {
    	isInsalledFFVLC();
    }
	
	endMediaPlay();

	/* IE浏览器监测是否安装VLC插件 */
	function isInsalledIEVLC(){ 
	    
	    var vlcObj = null;
	    var vlcInstalled= false;
	    
        vlcObj = new ActiveXObject("VideoLAN.Vlcplugin.2"); 
        if(vlcObj != null ){ 
            vlcInstalled = true 
        }
        
	    var IEContainerId = document.getElementById('IEContainer');
	    var installAlertId = document.getElementById('J_InstallAlert');
	    if(vlcInstalled){
	    	IEContainerId.style.display = "";
	    	installAlertId.style.display = "none";
	    }
	} 
	/* 其他浏览器监测是否安装VLC插件 */
	function isInsalledFFVLC(){
		 var vlcInstalled = false; 
	     var numPlugins=navigator.plugins.length;
	     for(i=0;i<numPlugins;i++){
	          plugin=navigator.plugins[i];
	          if(plugin.name.indexOf("VideoLAN") > -1 || plugin.name.indexOf("VLC") > -1){            
	        	  vlcInstalled = true;
	        }
	     }
	     var FFContainerId = document.getElementById('FFContainer');
	     var installAlertId = document.getElementById('J_InstallAlert');
	     if(vlcInstalled){
	    	 FFContainerId.style.display = "";
	    	installAlertId.style.display = "none";
	     }
	}

	/* 播放列表预览结束时间对视频的处理操作 */
	function endMediaPlay(){
		var endSecond = <%=endSecend%>;
		if(endSecond){
			setTimeout(function(){
				  var vlc = document.getElementById('vlc');
				  if(vlc && vlc.playlist){
		     		 vlc.playlist.stop();  
		     	  }
			},endSecond*1000);
		}
	}
	
})();

</script>
</html>
