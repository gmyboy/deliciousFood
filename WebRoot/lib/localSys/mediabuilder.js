(function(){
	/* 创建媒体弹窗 */
    function MediaBuilder(opts){
    	this.options = $.extend(true, {}, opts);
    	
    	this.medias = {};
    	this.ws = this.options.ws || null;
    	this.wsHeartbeatPacketsID = 0;
    	this.isLeavePage = false; //是否离开页面，如果离开页面，websokect调用onclose时不执行函数
    	
    	this.currentMediaBoxId = ''; //装载当前创建的mediaboxId
    	
    	this.init();
    }
    
    MediaBuilder.prototype = {
    	constract: MediaBuilder,
    	
    	init: function(){
    		this.initWebsocket();
		},
    	
		buildMediaDialog: function(opts){
			if(!opts){
				return;
			}
    		var _this = this,
	            row = opts.row,
	    		regCode = row.regCode,
	    		tdAddress = row.tdAddress || 1,
	    		autoRecord = opts.autoRecord,
	    		buttons = opts.buttons || [{text:Lang.buttonCancel, click:function(e){e.close();}, styleName:'btn-default'}];
    		
			var dialog = new Dialog({
    			title : opts.title || Lang.acceptVoiceRequests,
    			width : opts.width || 400,
    			height : opts.height || 450,
    			showMask: false, //是否显示遮罩
    			buttons : buttons,
    			mediaBox: true,
    			onClose: function(e){
    				if(typeof opts.onClose === 'function'){
    					opts.onClose(e);
    				}
    				
    				var $dlg = e.getDialogElement(),
    	    			$msgObj = $dlg.find(".dialog-tips");
    				
    				$msgObj.html('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.windowClosing + '</span>');
		
    				var mediaId = regCode + tdAddress;
					_this.destroyMedia(mediaId);
    			}
    		});
    		
    		dialog.open();
    		
    		this.buildMedias(row, dialog.getDialogElement().find('.dialog-body'), autoRecord);
    	},
		 /* 创建媒体播放器 */
        buildMedias: function(row, element, autoRecord){
 	        element = element || $('#medias');

 	        var html = '';
            var $newVideo = null;
            var mediaId = '';
            var num = 0;
            var videoboxId = '';
            var deviceSerial = row.regCode;
            var mainDeviceSerial = row.mainRegCode || deviceSerial;
            var tdAddress = row.tdAddress;
            var title = row.title || row.aliasOfAddress || row.factoryNO || "";
            var showText = row.registerCode || title;
            var autoOpenAudio = (row.autoOpenAudio == false) ? false : true;
            var autoOpenVideo = (row.autoOpenVideo == true) ? true : false;
            var volumeInValue = row.volumeInValue  ?  row.volumeInValue : 1;
            var volumeOutValue = row.volumeOutValue  ?  row.volumeOutValue : 1;
            var _this = this;
            
            element.empty();

          	mediaId = mainDeviceSerial + tdAddress;
          	videoboxId = 'videoBox'+mediaId;
           	html = '<div class="block block-video" id="'+videoboxId+'" data-videobox="true" data-id="'+mediaId+'">' +
           			'<div class="block-heading block-heading-background">' +
						'<h2 class="block-title title-folat" title="' + title + '">'+
							'<span class="media-text">' + title + '</span>'+
						'</h2>' +
						'<div class="status-bar-right" data-regcode="' + deviceSerial + '">' +
							'<i class="icon icon-signal-strength" data-class="icon icon-signal-strength" data-signal-strength="true"></i>' +
			                '<span class="internet-type type-size" data-internet-type="true"></span>' +
			            '</div>' +
					'</div>' +
					'<div class="block-body">' +
						'<div class="video-box" id="J_VideoBox">' +
							'<div class="video-objects clearfix">' +
								'<object class="video-object J_VideoObject" codebase="'+URL.MedioOcxOldVersion+'" classid="CLSID:A84B401B-87E6-46ee-BD0E-D0D738608FB0">' +
									'<div class="no-support J_NoSupport">未检测到视频播放控件,请检查浏览器的安全设置，或者点击<a href="'+URL.MediaOcx+'">下载</a>安装<a href="'+Common.pieceUrl(URL.VideoDownloadHelp)+'" target="_blank">查看帮助</a></div>' +
									'<param name="allowscriptaccess" value="always">' +
								'</object>' +
								'<object class="audio-object J_AudioObject" codebase="'+URL.AudioOcxVersion+'" classid="CLSID:0B188903-8310-47a5-81A7-878B16C1B997"></object>' +
							'</div>' +
							'<ul class="player">' +
								'<li class="player-item player-item-play J_PlayButton" title="' + Lang.play + '"><span class="lang-box">' + Lang.play + '</span></li>' +
								'<li class="player-item player-item-pause J_PauseButton hidden" title="' + Lang.pause + '"><span class="lang-box">' + Lang.pause + '</span></li>' +
								'<li class="player-item player-item-stop J_StopButton" title="' + Lang.stop + '"><span class="lang-box">' + Lang.stop + '</span></li>' +
								'<li class="player-item player-item-record J_RecordButton" title="' + Lang.record + '"><span class="lang-box">' + Lang.record + '</span></li>' +
								'<li class="player-item player-item-recording J_RecordStopButton hidden" title="' + Lang.stop + '"><span class="lang-box">' + Lang.stop + '</span></li>' +
								'<li class="player-item player-item-picshot J_PicshotButton" title="' + Lang.picshot + '"><span class="lang-box">' + Lang.picshot + '</span></li>' +
								'<li class="player-item player-item-voice J_VoiceButton" title="' + Lang.voice + '"><span class="lang-box" data-lang="voice">' + Lang.voice + '</span></li>' +
								'<li class="player-item player-item-voiceing J_VoiceStopButton hidden" title="' + Lang.stop + '"><span class="lang-box">' + Lang.stop + '</span></li>' +
								'<li class="player-item player-item-volume">'+
									'<div class="volume volume-in" data-name="volumeIn"><div class="volume-name">'+Lang.volumeMicrophone+Lang.commonColon+'</div><div class="volume-image"></div><div class="volume-value"></div></div>'+
									'<div class="volume volume-out" data-name="volumeOut"><div class="volume-name">'+Lang.volumeHorn+Lang.commonColon+'</div><div class="volume-image"></div><div class="volume-value"></div></div>'+
								'</li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</div>';
           	
           var $html = $(html);
 	
           $html.appendTo(element);
           
           this.currentMediaBoxId = videoboxId;

           this.medias[mediaId] = new MediaController({
        	   'elementID': videoboxId,
               'aliasOfAddress': showText,
               'autoRecord': autoRecord || false,
               'sendVideoDataCallback': function () {
                   var params = Common.getFullData({
                   	  'msgType': 'VIDEO_VIEW_REQ',
                       'deviceSerial': mainDeviceSerial,
                       'cameraSerial': tdAddress,
                       'connType': 0, //0  TCP，1 UDP
                       'viewType': 0, //0 直播，1 点播
                       'resolution': 1, //1 - QCIF、 2 - CIF、 3 - DCIF、 4 - D1
                       'fileName': ''
                   });

                   params = JSON.stringify(params);
                   _this.ws.send(params);
                   Debug.log('向服务端发送视频数据：' + params);
               },
               'sendVoiceDataCallback': function () {
                   var params = Common.getFullData({
                   	'msgType': 'AUDIO_VIEW_REQ',
                       'deviceSerial': mainDeviceSerial,
                       'microphoneSerial': tdAddress,
                       'connType': 0, //0  TCP，1 UDP
                       'broadcast': 0, //0：不广播 1：广播，不开启客户端音频
                       'channel': 1, //1：单声道 2：立体音
                       'sampling': 0
                   });

                   params = JSON.stringify(params);
                   _this.ws.send(params);
                   Debug.log('向服务端发送音频数据：' + params);
               },
               'enableVolumeControllerCallback': function(id){
            	   _this.enableVolumeController(id, volumeInValue, volumeOutValue);
               },
			   'disableVolumeControllerCallback': function(id){
				   _this.disableVolumeController(id);
              }
           });

           var elementMedia = document.getElementById(_this.currentMediaBoxId);
           
           if(_this.ws && _this.ws.readyState == 1){
        	   /* 是否开启视频请求 */
               if(elementMedia && autoOpenVideo){
    				var _thisVideoPlayButton = elementMedia.getElementsByTagName('li')[0];
    				_thisVideoPlayButton.click();
               }
        	   
        	   /* 是否开启语音请求 */
               if(elementMedia && autoOpenAudio){
    				var _thisAudioPlayButton = elementMedia.getElementsByTagName('li')[6];
    				_thisAudioPlayButton.click();
               }
               
               /* 请求信号强度 */
               (function(){
        		   _this.getSignalLength(mainDeviceSerial);
        		   _this.signalTimeId = setTimeout(arguments.callee, 1000*60*10);
        	   })();
               
           }else{
        	   setTimeout(function(){
	           		if(_this.ws && _this.ws.readyState === 1){	           			
	           			/* 是否开启视频请求 */
	           			if(elementMedia && autoOpenVideo){
	           				var _thisVideoPlayButton = elementMedia.getElementsByTagName('li')[0];
	           				_thisVideoPlayButton.click();
	           			}

	           			/* 是否开启语音请求 */
	                    if(elementMedia && autoOpenAudio){
	         				var _thisAudioPlayButton = elementMedia.getElementsByTagName('li')[6];
	         				_thisAudioPlayButton.click();
	                    }
	                    
	                    /* 请求信号强度 */
	                    (function(){
	             		   _this.getSignalLength(mainDeviceSerial);
	             		   _this.signalTimeId = setTimeout(arguments.callee, 1000*60*10);
	             	   })();
	           			
	           			clearTimeout(_this.checkWSTimeId);
	           			return;
	           		}           		
	           		_this.checkWSTimeId = setTimeout(arguments.callee, 1000);
           		}, 1000);
           }

 		 return true;
 	  },
 	  
 	 /* 初始化websocket */
     initWebsocket: function() {
          if(this.ws && this.ws.readyState == 1){
          	return ;
          }
          var _this = this;
          /****
          readyState的值表示：
          0	CONNECTING		连接尚未建立
          1	OPEN			WebSocket的链接已经建立
          2	CLOSING			连接正在关闭
          3	CLOSED			连接已经关闭或不可用
          ****/
          clearTimeout(_this.wsHeartbeatPacketsID);
          
          if(!window.WebSocket){
	      	return;
	      }
          
          this.ws = new WebSocket(loginData.getWSDomain('monitor', 'websocket'));
          this.ws.onopen = function (e) {
              Debug.log('app连接成功.');
              
              /* 每隔25秒发心跳包，防止websocket关闭 */
              _this.wsHeartbeatPacketsID = Common.sendHeartbeatPackets(_this.ws, 'app');
          };

          this.ws.onmessage = function (e) {
              var data = e.data;
              data = typeof data == 'string' ? JSON.parse(data) : data;
              
              /* 视频 */
              if (data.msgType === 'VIDEO_VIEW_RSP') {
              	Debug.log('接收app视频响应：' + JSON.stringify(data));
              	_this.addVideoData(data);
              }

              /* 音频 */
              if (data.msgType === 'AUDIO_VIEW_RSP') {
              	Debug.log('接收app音频响应：' + JSON.stringify(data));
              	_this.addAudioData(data);
              }
              
              // 实时数据信号强度(实时数据信号强度)
              if(data.msgType === 'GET_SINGLE_DATA') {
            	Debug.log('接收信号强度响应：' + JSON.stringify(data));
              	_this.setInternetType({value: _this.getSignalType(data.signalType)}, data.regCode);
              	_this.setSignalStrength({escapeValue: data.signalValue}, data.signalType, data.regCode);
              };
          }
          this.ws.onclose = function (e) {
              Debug.log('appWebsokect连接关闭.');
              if(!_this.isLeavePage){
              	Debug.log('appWebsokect连接关闭.正在重连');
              	_this.initWebsocket();
              }
          };

          this.ws.onerror = function (e) {
              Debug.log('appWebsocket出错，正在关闭...');
              this.ws.close();
          };
      },
      
     /* 往音频控件添加数据 */
     addAudioData: function(data){
    	var mediaId = data.deviceSerial + data.microphoneSerial;
       	if(this.medias[mediaId]){
       		this.medias[mediaId].addAudioData(data);
	        return false;
       	}
     },
      
     /* 往视频控件添加数据 */
     addVideoData: function(data){
    	var mediaId = data.deviceSerial + data.cameraSerial;
       	if(this.medias[mediaId]){
       		this.medias[mediaId].addVideoData(data);
	        return false;
       	}
     },
 	  
 	 /* 开启音量控制 */
     enableVolumeController: function(id, volumeInValue, volumeOutValue){
			$html = $('#'+id);
			var mediaId = $html.attr('data-id');
			var _this = this;
        
        	/* 麦克风音量控制 */
            $html.find('[data-name="volumeIn"] .volume-image').slidy({
            	theme: {
            		image: loginData.getResourcePath() + '/lib/base/images/volume_bar_blue.png',
            		width: 168,
            		height: 34
            	},
            	maxval: 1.9,
            	interval: 0.1,
            	defaultValue: volumeInValue,
            	finishedCallback: function (value) {
            		if(value >= 1){
            			value = (value * 10 - 10 + 1).toFixed(0);
            		}else{
            			value = value.toFixed(1);	
            		}
					
            		var mediaPlayer = _this.medias[mediaId];
            		if(mediaPlayer){
            			mediaPlayer.setWaveInStrong(value);
            		}
            	},
            	moveCallback: function (value) {
            		if(value >= 1){
            			value = (value * 10 - 10 + 1);
            		}
            		$html.find('[data-name="volumeIn"] .volume-value').text(value.toFixed(1));
            	}
           	});
            
            /* 喇叭音量控制 */
            $html.find('[data-name="volumeOut"] .volume-image').slidy({
            	theme: {
            		image: loginData.getResourcePath() + '/lib/base/images/volume_bar_blue.png',
            		width: 168,
            		height: 34
            	},
            	maxval: 1.9,
            	interval: 0.1,
            	defaultValue: volumeOutValue,
            	finishedCallback: function (value) {
            		if(value >= 1){
            			value = (value * 10 - 10 + 1).toFixed(0);
            		}else{
            			value = value.toFixed(1);	
            		}
            		
            		var mediaPlayer = _this.medias[mediaId];
            		if(mediaPlayer){
            			mediaPlayer.setWaveOutStrong(value);
            		}
            	},
            	moveCallback: function (value) {
            		if(value >= 1){
            			value = (value * 10 - 10 + 1);
            		}
            		$html.find('[data-name="volumeOut"] .volume-value').text(value.toFixed(1));
            	}
           	});
        },
    	
      /* 关闭音量控制 */
      disableVolumeController:function(id){
			$('#'+id).find('.player-item-volume .volume-image').html('');
      },
      
      //返回网络类型
      getSignalType : function(value){
      	var typs = {'1':'2G', '2':'3G', '3':'wifi', '4':'以太网'};
      	return typs[value + ''];
      },
      
      /* 设置网络类型 */
      setInternetType: function(o, regCode) {
    	  var e = $('[data-regcode="'+regCode+'"] [data-internet-type]');
      	  if (e.length === 0) {
              return;
          }
          
          var oValue = e.text();
          var value = o.value;
          
          if(oValue === value){
          	return;
          }
          
          var eValue = o.escapeValue;
          if(eValue == 4){
          	value = '<span style="font-size:7px">'+value+'</span>';
          }
          e.html(value);
      },
      
      /* 设置信号强度 */
      setSignalStrength: function(o, internetType, regCode) {
    	  var e = $('[data-regcode="'+regCode+'"] [data-signal-strength]');
      	  if (e.length === 0) {
              return;
          }
          
          var value = o.escapeValue;
          var oClass = e.attr('[data-class]');

          //3：wifi
          if (internetType == 3) {
				var v = Math.round((value+94) / 94 * 100);
				var gridNum = 4,
					fullNum = 100;
				
				if (v <= 0) {
					if(e.hasClass('icon-signal-wifi0')){
	            		return;
	            	}
	                e.attr('class', oClass).addClass('icon-signal-wifi0');
				} else if (v <= (fullNum / gridNum) * 1) {
					if(e.hasClass('icon-signal-wifi1')){
	            		return;
	            	}
	                e.attr('class', oClass).addClass('icon-signal-wifi1');
				} else if ((v <= (fullNum / gridNum) * 2) && (v > (fullNum / gridNum) * 1)) {
					if(e.hasClass('icon-signal-wifi2')){
	            		return;
	            	}
	                e.attr('class', oClass).addClass('icon-signal-wifi2');
				} else if ((v <= (fullNum / gridNum) * 3) && (v > (fullNum / gridNum) * 2)) {
					if(e.hasClass('icon-signal-wifi3')){
	            		return;
	            	}
	                e.attr('class', oClass).addClass('icon-signal-wifi3');
				} else if ((v <= (fullNum / gridNum) * 4) && (v > (fullNum / gridNum) * 3)) {
					if(e.hasClass('icon-signal-wifi4')){
	            		return;
	            	}
	                e.attr('class', oClass).addClass('icon-signal-wifi4');
				}
				return;
          }

          //4：以太网
          if (internetType == 4) {
          	e.attr('class', oClass).addClass('icon-ethernet');
          	return;
          }

          //1：2g, 2:3g
          var v = Math.round(value / 31 * 100);
          var gridNum = 5,
              fullNum = 100;
          
          if (v <= 0) {
          	if(e.hasClass('icon-signal-mobile-network0')){
          		return;
          	}
              e.attr('class', oClass).addClass('icon-signal-mobile-network0');
          } else if (v <= (fullNum / gridNum) * 1) {
          	if(e.hasClass('icon-signal-mobile-network1')){
          		return;
          	}
              e.attr('class', oClass).addClass('icon-signal-mobile-network1');
          } else if ((v <= (fullNum / gridNum) * 2) && (v > (fullNum / gridNum) * 1)) {
          	if(e.hasClass('icon-signal-mobile-network2')){
          		return;
          	}
              e.attr('class', oClass).addClass('icon-signal-mobile-network2');
          } else if ((v <= (fullNum / gridNum) * 3) && (v > (fullNum / gridNum) * 2)) {
          	if(e.hasClass('icon-signal-mobile-network3')){
          		return;
          	}
              e.attr('class', oClass).addClass('icon-signal-mobile-network3');
          } else if ((v <= (fullNum / gridNum) * 4) && (v > (fullNum / gridNum) * 3)) {
          	if(e.hasClass('icon-signal-mobile-network4')){
          		return;
          	}
              e.attr('class', oClass).addClass('icon-signal-mobile-network4');
          } else if ((v <= (fullNum / gridNum) * 5) && (v > (fullNum / gridNum) * 4)) {
          	if(e.hasClass('icon-signal-mobile-network5')){
          		return;
          	}
              e.attr('class', oClass).addClass('icon-signal-mobile-network5');
          }
      },
      
      //websocket请求信号强度
      getSignalLength:function(regCode){
      	var _this = this;

		var data={
        		"deviceSerial":	regCode,
        		"msgType":"DEVICE_DATA_TRANSFER",
        		"tdSerial":'',
        		"transferData":"",
        		"sid":loginData.getSID(),
        		"transferMsgType":51
        	};
    	data = Common.JSONToString(data);
    	
    	if (_this.ws && _this.ws.readyState === 1) {
    		_this.ws.send(data);
    		Debug.log('请求信号强度:' + data);
    	}else{
    		Debug.log('websocket不可用');
    	}

      },
      
      //返回medias
      getMedias: function(){
    	  return this.medias;
      },

      //销毁medias[]数组中的数据
      destroyMedia: function(mediaId){
    	  if(this.medias[mediaId]){
    		  this.medias[mediaId].destroy();
    		  delete this.medias[mediaId];
			  return;
    	  }else{
    		  for(var key in this.medias){
    			  if(this.medias.hasOwnProperty(key)){
    				  this.medias[key].destroy();
    				  delete this.medias[key];
    			  }
    		  }
    		  this.medias = {};
    	  }
       }
    }
    
    window.MediaBuilder = MediaBuilder;
})();