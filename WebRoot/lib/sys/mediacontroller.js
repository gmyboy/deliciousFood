(function () {
	var audioResCode = '';
    window.audioConnRspCode = function(code){
    	if(window.console){
    		console.log('code:'+ code);
    	}
    	audioResCode = code;
    	msgDialog(code);
    	/*
    	var obj = {1: '系统内部错误', 2: '安全码无效', 3: '设备未连接', 4: '设备语音占线', '设备语音忙': '设备语音占线'};
    	alert(obj[code]);
    	*/
    }
    
    function MediaController(opts) {
        /****
        opts:{
            'elementID': 'J_VideoBox', 
            'aliasOfAddress': '具体位置别名',
            'sendVideoDataCallback': function () { }, 
            'sendVoiceDataCallback': function () { },
            'enableVolumeControllerCallback': function () {},
            'disableVolumeControllerCallback': function () {}
        }
        ****/
        this.opts = opts;
        this.element = document.getElementById(this.opts.elementID || 'J_VideoBox');
        this.videoElement = this.getElement('J_VideoObject', 'object');
        this.audioElement = this.getElement('J_AudioObject', 'object');
        this.playButton = this.getElement('J_PlayButton', 'li');
        this.pauseButton = this.getElement('J_PauseButton', 'li');
        this.stopButton = this.getElement('J_StopButton', 'li');
        this.recordButton = this.getElement('J_RecordButton', 'li');
        this.recordStopButton = this.getElement('J_RecordStopButton', 'li');
        this.picshotButton = this.getElement('J_PicshotButton', 'li');
        this.voiceButton = this.getElement('J_VoiceButton', 'li');
        this.voiceStopButton = this.getElement('J_VoiceStopButton', 'li');
        this.volumeController = this.getElement('J_VolumeController', 'li');
        this.CALL_JS = 1;
        this.NO_CALL_JS = 2;
        this.videoData = null;
        this.audioData = null;
        this.init();
    }

    MediaController.prototype = {
        constructor: MediaController,
        init: function () {
        	//非IE浏览器提示不支持此插件
            if(!(!!window.ActiveXObject || "ActiveXObject" in window)){
                var noSupport= this.getElement('J_NoSupport');
                noSupport.innerHTML = Lang.noSupport;
                return;
            }

            //绑定事件
            var _this = this;
            this.playButton.onclick = function () {
                if (typeof _this.opts.sendVideoDataCallback == 'function') {
                    _this.opts.sendVideoDataCallback();
                    return;
                }
                Debug.log('没有发送视频数据的回调函数');
            };
            this.pauseButton.onclick = function () {
                _this.pauseCtrl();
            };
            this.stopButton.onclick = function () {
                _this.stopCtrl(_this.CALL_JS);
            };
            this.recordButton.onclick = function () {
                _this.recordCtrl();
            };
            this.recordStopButton.onclick = function () {
                _this.recordStopCtrl();
            };
            this.picshotButton.onclick = function () {
                _this.picshotCtrl();
            };
            this.voiceButton.onclick = function () {
                if (typeof _this.opts.sendVoiceDataCallback == 'function') {
                    _this.opts.sendVoiceDataCallback();
                }else{
                    Debug.log('没有发送音频数据的回调函数');
                    return;
                }
                
                _this.enableVolumeController();
            };
            this.voiceStopButton.onclick = function () {
                _this.voiceStopCtrl();
                
                _this.disableVolumeController();
                
            };
            
            //页面关闭之前销毁控件
            window.onbeforeunload = function() {
            	_this.destroy();
            }
        },

        destroy: function () {
            this.stopCtrl(this.NO_CALL_JS);
            this.voiceStopCtrl();
            this.videoElement = null;
            this.audioElement = null;
        },

        addVideoData: function (data) {
            this.videoData = data;
            this.playCtrl();
        },

        addAudioData: function (data) {
            this.audioData = data;
            this.voiceCtrl();
        },

        playCtrl: function () {
            if (!this.videoData || this.videoElement == null || this.videoElement.object == null) {
                return;
            }

            this.videoElement.sessionid = this.videoData.securityCode;
            this.videoElement.passport = this.videoData.cameraSerial;
            this.videoElement.object.InitVideoCtrl(this.videoData.mddsHost, this.videoData.mddsPort, this.videoData.securityCode, this.videoData.cameraSerial);
            this.videoElement.object.SetElevatorCode(this.opts.aliasOfAddress || (this.videoData.deviceSerial + '#' + this.videoData.cameraSerial));
            this.videoElement.object.Run();
            
            if(window.console){
            	console.log('playedWidth:'+this.videoElement.offsetWidth+',playedHeigth:'+this.videoElement.offsetHeight);
            }
            
            this.videoElement.status = true;

            this.pauseButton.className = this.pauseButton.className.replace(/\shidden/g, '');
            this.playButton.className = this.playButton.className + ' hidden';
            
            //是否打开录像
            if(this.opts.autoRecord){
                var _this = this;
                
                setTimeout(function(){
                    var status = _this.videoElement.object.GetVideoRunStatus() * 1;
                    if (status != 2) {
                        setTimeout(arguments.callee, 500);
                        return;
                    }
                    _this.recordCtrl();
                }, 500);
            }
        },

        pauseCtrl: function () {
            if (this.videoElement == null || this.videoElement.status != true) {
                return;
            }

            var status = this.videoElement.object.GetVideoRunStatus() * 1;
            if (status != 2) {
                return;
            }

            if (this.videoElement.object != null) {
                this.videoElement.Pause();
            }

            this.recordStopCtrl();
            this.videoElement.status = false;

            this.playButton.className = this.playButton.className.replace(/\shidden/g, '');
            this.pauseButton.className = this.pauseButton.className + ' hidden';
        },

        stopCtrl: function (callJS) {
            if (callJS === 2) {
                this.NO_CALL_JS = this.NO_CALL_JS + 1;
            } else if (callJS === 3) {
                return;
            }

            try {
                if (this.videoElement == null) {
                    return;
                }
                if (this.videoElement.object != null) {
                	if(window.console){
                		console.log('callJS:' + callJS + '，找到object，停止视频中...');
                	}
                    this.videoElement.object.Stop(callJS);
                }

                this.videoElement.status = false;
                this.recordStopCtrl();

                this.playButton.className = this.playButton.className.replace(/\shidden/g, '');
                this.pauseButton.className = this.pauseButton.className + ' hidden';
            } catch (e) {}
        },

        recordCtrl: function () {
            if (this.videoElement == null || this.videoElement.status != true) {
                return;
            }

            var status = this.videoElement.object.GetVideoRunStatus() * 1;
            if (status != 2) {
                return;
            }

            this.videoElement.StartRecord();

            this.recordStopButton.className = this.recordStopButton.className.replace(/\shidden/g, '');
            this.recordButton.className = this.recordButton.className + ' hidden';
        },

        recordStopCtrl: function () {
            if (this.videoElement == null) {
                return;
            }

            this.videoElement.StopRecord();

            this.recordButton.className = this.recordButton.className.replace(/\shidden/g, '');
            this.recordStopButton.className = this.recordStopButton.className + ' hidden';
        },

        picshotCtrl: function () {
            if (this.videoElement == null || !this.videoElement.object == null) {
                return;
            }

            this.videoElement.SnapOnePic();
        },

        voiceCtrl: function () {
        	audioResCode = '';
        	
        	if (!this.audioData || this.audioElement == null || this.audioElement.status == true || this.audioElement.object == null) {
                return;
            }

            this.audioElement.StartAudio(this.audioData.mddsHost, this.audioData.mddsPort, this.audioData.securityCode, 0, 1, 1, 0);

            this.voiceStopButton.className = this.voiceStopButton.className.replace(/\shidden/g, '');
            this.voiceButton.className = this.voiceButton.className + ' hidden';
            
            var _this = this;
            setTimeout(function(){
            	if(audioResCode === '设备语音忙'){
            		_this.voiceButton.className = _this.voiceButton.className.replace(/\shidden/g, '');
            		_this.voiceStopButton.className = _this.voiceStopButton.className + ' hidden';
            		return;
            	}
            	setTimeout(arguments.callee, 1000);
            }, 1000);
        },

        voiceStopCtrl: function () {
            if (this.audioElement == null || this.audioElement.object == null) {
                return;
            }

            this.audioElement.StopAudio();

            this.voiceButton.className = this.voiceButton.className.replace(/\shidden/g, '');
            this.voiceStopButton.className = this.voiceStopButton.className + ' hidden';
        },

        snapImgFilePath: function (path) {
            alert("Img path:" + path);
        },

        recodeFlvFilePath: function (path) {
            alert("Flv path:" + path);
        },
        
        enableVolumeController: function(){
            if(this.opts.enableVolumeControllerCallback && typeof this.opts.enableVolumeControllerCallback == 'function'){
                this.opts.enableVolumeControllerCallback(this.opts.elementID);
            }
        },
        
        disableVolumeController: function(){
            if(this.opts.disableVolumeControllerCallback && typeof this.opts.disableVolumeControllerCallback == 'function'){
                this.opts.disableVolumeControllerCallback(this.opts.elementID);
            }
        },
        
        setWaveOutStrong: function (volume) {
            if (this.audioElement == null || this.audioElement.object == null) {
                return;
            }
            
            this.audioElement.SetWaveOutStrong(volume);
        },

        setWaveInStrong: function (volume) {
            if (this.audioElement == null || this.audioElement.object == null) {
                return;
            }
            
            this.audioElement.SetWaveInStrong(volume);
        },

        getElement: function (className, tagName) {
            return getElementsByClassName(className, tagName, this.element)[0];
        }
    }
    window.MediaController = MediaController;

    /* 选择className一组nodelist */
    function getElementsByClassName(cssName, tagName, parentElement) {
        if (!cssName) {
            return;
        }
        tagName = tagName || '*';
        parentElement = parentElement || document;

        if (document.getElementsByClassName) {
            return parentElement.getElementsByClassName(cssName);
        }

        var tags = parentElement.getElementsByTagName(tagName);
        var nodeList = [];

        for (var i = 0, len = tags.length; i < len; i++) {
            if (tags[i].className.search(cssName) != -1) {
                nodeList.push(tags[i]);
            }
        }

        return nodeList;
    }
})();