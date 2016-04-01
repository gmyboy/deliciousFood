(function(){
	window.JpalyerPreview = JpalyerPreview;
	
	function JpalyerPreview(opts){
		this.options = $.extend(true, {}, opts);
		this.screenWidth = 328;
		this.screenHeight = 485;
		this.playListData = null;
		
		this.bar = document.getElementById("J_Bar");
		this.totalMinute = document.getElementById("totalMinute");
		this.curMinute = document.getElementById("curMinute");
		
		this.init();
	}

	JpalyerPreview.prototype.init = function(){
		this.initDiv();
		this.initPlaylist();
		this.bindEvents();
	};
	
	JpalyerPreview.prototype.bindEvents = function(){
		var _this = this;
		$('#J_PlayAgin').click(function(){
			$('#J_playListView').removeClass('hidden');
	    	$('#J_finishedPlayTip').addClass('hidden');
	    	_this.bar.style.width = '0%';
	    	
    		_this.buildPlayList();
    	});
	};

	 /* 初始化布局 */
	JpalyerPreview.prototype.initDiv = function(){
		var adbackgroundimage = $("#adbackgroundimage");
	    var adbackground = $("#adbackground");
	    var vlc = $("#vlc");
	    adbackground.css({"overflow":"hidden","width":this.screenWidth + "px","height":this.screenHeight + "px","top":0,"left":0,"textAlign":"left"});
	    vlc.css("background","#ccc");
	    adbackgroundimage.css({"width":this.screenWidth + "px","height":this.screenHeight + "px","zIndex":1});
	};

	JpalyerPreview.prototype.initPlaylist = function(){
		var _this = this;
		if(this.playListData){
			this.buildPlayList();
		}else{
			Common.getDataByAjax(URL.GetPlaylistView, {'id': this.options.id},function(data){
				_this.playListData = data;
				_this.buildPlayList();
			});
		}
	};

	/* 初始化播放列表 */
	JpalyerPreview.prototype.buildPlayList = function(){
		if(!this.playListData){
			return;
		}
		
		var data = this.playListData;
		var playLimitSum = 0;
		var uiPosition = data.uiPosition;
		var _this = this;
		
		if(!uiPosition){
			uiPosition = '0,0,0,0';
		}
		var uiX = uiPosition.split(",")[0]/1080*this.screenWidth;
		var uiY = uiPosition.split(",")[1]/1920*this.screenHeight;
		var uiWidth = uiPosition.split(",")[2]/1080*this.screenWidth;
		var uiHeight = uiPosition.split(",")[3]/1920*this.screenHeight;

		$('#J_UI').css({'left':uiX+"px",'top':uiY+"px","z-index":10,'width':uiWidth + "px",'height': uiHeight + "px",'line-height': uiHeight + "px"});
		
		var advertisingList = data.advertisingList;
		var picPosition = 0;  //默认图片在下半部分
		
	    for(var i=0;i<advertisingList.length;i++){
	    	var advertisingObj = advertisingList[i];
	    	
	    	playLimitSum += advertisingObj.playLimit;
			
	    	for(var j=0;j<advertisingObj.adDetailList.length;j++){
				var detail = advertisingObj.adDetailList[j];
				var startSecond = detail.startSecond;
				var endSecend = detail.playLimit - 0.5;
				var fileName = detail.sourceMaterialName;
				var filePath = detail.fileUrl;
				var type = detail.sourceMaterialType;
				var videoPosition = detail.videoPosition;
				var filesrc = detail.fileUrl;
				if(type == 1){
					var videoY =  videoPosition.split(",")[1];
					if(parseInt(videoY) >= ((1920-parseInt(uiPosition.split(",")[3]))/2)){
						picPosition = 1;
					}
					_this.startVideo(filesrc, startSecond, endSecend, videoPosition);
				}else if(type ==2){
					_this.startAudio(filesrc, startSecond, endSecend);
				}else if(type ==3){
					var resolution = detail.resolution;  //resolution是图片的分辨率
					var wid = parseInt(resolution.split(":")[0]);
					var hei = parseInt(resolution.split(":")[1]);
					_this.startPic(filesrc, startSecond, endSecend, wid, hei, picPosition); 
				}
			}
	    }
	    /* 播放完毕后，点击重新播放按钮，重新触发事件 */
	    setTimeout(function(){
	    	$('#J_playListView').addClass('hidden');
	    	$('#J_finishedPlayTip').removeClass('hidden');
	    }, playLimitSum*1000);
	        
		/* 创建播放进度*/
	    this.buildProcessBar(data.playLimit);
	};
	
	/* 播放视频 */
	JpalyerPreview.prototype.startVideo = function(videosrc, startSecond, endSecend, videoPosition){
		var _this = this;
		//0,0,1080,1920
		var pos = videoPosition.split(',');
		var realX = pos[0]/1080*this.screenWidth;
		var realY = pos[1]/1920*this.screenHeight;
		var realWidOffset = pos[2]/1080*this.screenWidth;
		var realHeightOffset = pos[3]/1920*this.screenHeight;
		setTimeout(function(){
			_this.setVideo(videosrc,realX,realY,realWidOffset,realHeightOffset,endSecend);
			setTimeout(function(){
		    	$('#vlcDiv').empty();
			},endSecend*1000);
		}, startSecond*1000); 
	};
	
	/* 播放语音 */
	JpalyerPreview.prototype.startAudio = function(audiosrc, startSecond, endSecend){
		var _this = this;
		setTimeout(function(){
			_this.setAudio(audiosrc,endSecend);
			setTimeout(function(){
		    	$('#vlcDiv').empty();
			},endSecend*1000);
		}, startSecond*1000); 
	};
	
	/* 播放图片 */
	JpalyerPreview.prototype.startPic = function(picsrc, startSecond, endSecend,wid, hei, picPosition){
		var realX = 0;
		var realY = 0;
		var _this = this;
		
		var realWidOffset = wid/1080*this.screenWidth;
		var realHeightOffset = hei/1920*this.screenHeight;
		
		if(picPosition == 0){
			realX = 0;
			realY = 0;
		}else{
			realX = 0;
			realY = this.screenHeight - realHeightOffset;
		}
		
		setTimeout(function(){
			_this.setPic(picsrc,realX,realY,realWidOffset,realHeightOffset);
			setTimeout(function(){
				$('#adbackgroundimage').attr("src",'');
				$('#adbackgroundimage').addClass('hidden');
			},endSecend*1000);
		}, startSecond*1000); 
	};
	
	/* 设置视频 */
	JpalyerPreview.prototype.setVideo = function(videosrc, x, y,width,height,endSecend) {
		$('#iframeId').attr('src','');
		$('#vlcDiv').empty();
		this.getVLCPlayer(videosrc,width,height,endSecend);
		
		setTimeout(
			function(){
				var offset=$('.dialog').offset();
				$('.dialog').offset({top: offset.top-1, left: offset.left});
			}
		, 300);
		
		var  vlcDiv=$("#vlcDiv");
	    vlcDiv.css({'left':(x-1)+"px",'top':y+"px","z-index":1000});
	    if (width != null) {
	    	vlcDiv.css("width",width+"px");
	    	$("#vlc").css("width",width+"px");
	    }
	    if (height != null) {
	    	vlcDiv.css("height",height+"px");
	    	$("#vlc").css("height",height+"px");
	    }
	};
	
	/* 设置视频 */
	JpalyerPreview.prototype.setAudio = function(audiosrc,endSecend){
		$('#iframeId').attr('src','');
		$('#vlcDiv').empty();
		this.getVLCPlayer(audiosrc,1,1,endSecend);
		
		setTimeout(
			function(){
				var offset=$('.dialog').offset();
				$('.dialog').offset({top: offset.top-1, left: offset.left});
			}
		, 300);
	};
	
	/* 设置图片 */
	JpalyerPreview.prototype.setPic = function(picsrc, x, y,width,height) {
		var abImgDiv=$("#adbackgroundimage");
		abImgDiv.attr("src",'');
		abImgDiv.removeClass('hidden');
	    abImgDiv.css({"left":x+"px","bottom":y+"px"});
	    if (width != null) {
	    	abImgDiv.css("width",width+"px");
	    }
	    if (height != null) {
	    	abImgDiv.css("height",height+"px");
	    }
	    abImgDiv.attr("src",picsrc);
	};
	
	/* 创建VLC播放器 */
	JpalyerPreview.prototype.getVLCPlayer = function(fileUrl,width,height,endSecend){
		//判断浏览器是IE还是其它(1:IE、2:其它)
	    var isIE = 0;
		   	if (!! window.ActiveXObject || "ActiveXObject" in window) {
		   		isIE = 1;
		    } else {
		    	isIE = 2;
		    }
	    var url = Common.pieceUrl('/media/page/base/vlcPlayer.jsp') + '&fileUrl=' + fileUrl + '&width=' + width + '&height=' + height+'&endSecend='+endSecend+'&isIE='+isIE;
	   	var $html = $('<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="' + url + '" id="iframeId"></iframe>');
	   	$html.appendTo($('#vlcDiv'));
	};
	
	/* 创建播放进度条 */
	JpalyerPreview.prototype.buildProcessBar = function(playLimit){
	    var i = 0;
		var addWidth = 100/playLimit;
	    var _this = this;
	    
	    this.totalMinute.innerHTML = playLimit;
	    
	    var timeId = setTimeout(function(){
	    	if(i == playLimit-1){
	    		_this.bar.style.width = "100%";  
	   	    }else{
	   	    	_this.bar.style.width=parseInt(_this.bar.style.width) + addWidth + "%";  
		    }
		    
	    	_this.curMinute.innerHTML = i+1;
		    
		    if(i >= playLimit-1){  
		      clearTimeout(timeId); 
		      return; 
		    } 
		    
	    	i++;
	    	
	    	timeId = setTimeout(arguments.callee, 1000);
	    }, 0); 
	};
})();

