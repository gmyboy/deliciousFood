(function () {
	var TD_TYPE_CTRL = 0; //目标设备类型：控制器
	
    function MonitorController(opts) {
    	this.options = $.extend(true, {}, this.defaults, opts);
    	this.protocols = new Protocol(); //协议构造函数
    	this.dataParsing = new DataParsing(); //实时数据解析构造函数
    	this.ws = null; //装载应用服务端websokect
    	this.rdtsWSObj = {}; //装载RDTS服务端websokect {host+':'+port: new Websocket()}
    	this.connectData = {}; //发送设备信息给应用服务端后，应用服务端返回的直连rdts数据, 如：{deviceSerial+tdSerial: {JSON}}
    	this.serials = {}; //装载每个RDTS服务端websokect通道，所对应的采集设备列号+目标设备序列号{host+':'+port: [deviceSerial+tdSerial, deviceSerial+tdSerial, deviceSerial+tdSerial]}
    	this.timeIds = []; //装载心跳包的ids
    	this.medias = []; //装载媒体播放器
    	
    	if(this.options.autoBuildWS){
    		this.buildWS();
    	}
    }

    MonitorController.prototype = {
        constructor: MonitorController,
        
        //默认值
        defaults: {
        	wsUrl: loginData.getWSDomain('monitor', 'websocket'), //应用服务器websocket地址
        	autoBuildWS: true, //是否自动创建websocket
        	deviceInfos: [], //装载设备信息，用于发送请求实时数据所需要的数据[{'deviceSerial': v.regCode,'tdSerial': v.address,'ctrlType': v.ctrlType,'type': v.type,'elevatorStatus': value.elevatorStatus, 'id': '1234546'}]
        	tdType: TD_TYPE_CTRL, //请求数据的目标设备类型, 0: 控制器, 1:摄像头, 2:麦克风
        	dnss: false, //是否需要检验sid
        	tagValues: [], //请求的tag值, 1:实时数据, 2:内召, 3:外召(上下召), 4:端子状态, 5:统计数据, 10+:功能号码, 15：功能码组端子参数，如果没有此值默认为所有的tagvalues
        	onopen: function(){}, //websockect通道打开时
        	realtimeDataHandler: function(data, id, tagValue){}, // 实时数据返回后的回调函数，参数：第一个：解析后的数据，第二个，tagValue值，第三个，id:deviceSerial+tdSerial+type 
    		videoDataHandler: function(data){}, //视频直连rdts数据
    		audioDataHandler: function(data){}, //音频直连rdts数据
    		cmdDataHandler: function(data){}, //远程指令返回数据
    		singleDataHandler: function(data){} //信号强度返回数据
        },
        
        //设置设备信息deviceInfos
        setDeviceInfos: function(info){
        	if(!info){
        		return;
        	}
        	
        	this.options.deviceInfos.push(info);
        },
        
        //创建应用服务端websokect通道
        buildWS: function(rdtsWSKey) {
            if (!window.PROTOCOLS) {
                Debug.log('没有找到协议!');
                return;
            }

            /****
            readyState的值表示：
            0	CONNECTING		连接尚未建立
            1	OPEN			WebSocket的链接已经建立
            2	CLOSING			连接正在关闭
            3	CLOSED			连接已经关闭或不可用
            ****/
            var _this = this;
            
            if(!window.WebSocket){
        		return;
        	}
            
            _this.ws = new WebSocket(_this.options.wsUrl);

            _this.ws.onopen = function(e) {
                Debug.log('应用服务器websocket连接成功.');
                
                //控制器
                if(_this.options.tdType === TD_TYPE_CTRL){
                	_this.sendMessageToAPP();
                }
                
                //执行WebSocket时执行回调函数
                if(typeof _this.options.onopen === 'function'){
                	_this.options.onopen(_this.ws);
                }

                //每隔25秒发心跳包，防止websocket关闭 
                _this.timeIds.push(Common.sendHeartbeatPackets(_this.ws, 'app'));
            };

            _this.ws.onmessage = function(e) {
                var data = Common.stringToJSON(e.data);
                var isFun = null;
                
                //实时数据请求响应 
                if (data.msgType === 'GET_TD_REALTIME_DATA_RSP' && data.errorCode === 0) {
                    Debug.log('接收应用服务器数据：' + Common.JSONToString(data));
                    _this.buildRdtsWS(data);
                }
                
                //视频
                else if (data.msgType === 'VIDEO_VIEW_RSP') {
                	Debug.log('接收应用服务器视频响应：' + Common.JSONToString(data));

                	isFun = typeof _this.options.videoDataHandler == 'function';
                    if (isFun) {
                		_this.options.videoDataHandler(data);
                    }
                }

                //音频
                else if (data.msgType === 'AUDIO_VIEW_RSP') {
                	Debug.log('接收应用服务器音频响应：' + Common.JSONToString(data));
                	
                	isFun = typeof _this.options.audioDataHandler == 'function';
                    if (isFun) {
                		_this.options.audioDataHandler(data);
                    }
                }

                //远程指令
                else if (data.transferMsgType === 82) {
                    Debug.log('应用服务器远程指令透传：' + Common.JSONToString(data));
                    
                    isFun = typeof _this.options.cmdDataHandler == 'function';
                    if (isFun) {
                		_this.options.cmdDataHandler(data);
                    }
                }
                
                //实时数据信号强度(实时数据信号强度)
                else if (data.msgType === 'GET_SINGLE_DATA') {
                	Debug.log('接收应用服务器信号数据：' + Common.JSONToString(data));
                	
                	isFun = typeof _this.options.singleDataHandler == 'function';
                    if (isFun) {
                		_this.options.singleDataHandler(data);
                    }
                }
            };

            _this.ws.onclose = function(e) {
                setTimeout(
                	function(){
                		_this.buildWS();
                		Debug.log('应用服务器websocket连接关闭.');
                	},
                	50000
                );
            };

            _this.ws.onerror = function(e) {
                Debug.log('应用服务器websocket出错，正在关闭...');
                _this.ws.close();
            };
        },
        
        //向APP服务器发送数据 
        sendMessageToAPP: function(rdtsWSKey) {
            if (this.options.deviceInfos.length === 0) {
                Debug.log('没有可用的数据,停止向应用服务器发送数据!');
                return;
            }

            var _this = this;
            var value = null;
            var businessId = '';
            var deviceSerial = '';
            var tdSerial = '';
            var type = 0;
            var ctrlType = '';
            var fun = null;
            var serials = null; //如果有rdtsWSKey参数，发送rdtsWSKey下面装载设备的对应信息（用于当RDTS中断时，重连）
            
            if(rdtsWSKey && this.serials[rdtsWSKey]){
            	serials = this.serials[rdtsWSKey];
            }
            
            var eachDeviceInfos = function(i) {
                if (i >= _this.options.deviceInfos.length) {
                    return;
                }
                
                value = _this.options.deviceInfos[i];
                businessId = value.id; //业务实体id, 比如电梯id, 空压机id 
                deviceSerial = value.deviceSerial;
                tdSerial = value.tdSerial;
                type = value.type;
                ctrlType = value.ctrlType;
                fun = arguments.callee;
                i++;

                //rdt重连时，只发送rdtsWSKey下面装载设备的对应信息
                if (serials && $.inArray(deviceSerial + tdSerial, serials) === -1) {
                    fun(i);
                    return;
                }

                if (!deviceSerial) {
                    Debug.log('id为：' + businessId + '的业务实体没有找到采集设备序列号(deviceSerial).');
                    fun(i);
                    return;
                }

                if (!tdSerial) {
                	Debug.log('id为：' + businessId + '的业务实体没有找到目标设备序列号(tdSerial).');
                    fun(i);
                    return;
                }

                var params = Common.getFullData({
                    "msgType": "GET_TD_REALTIME_DATA_REQ",
                    "deviceSerial": deviceSerial,
                    "tdSerial": tdSerial,
                    "tdDataTags": _this.getTdDataTags(ctrlType),
                    "dnss": _this.options.dnss
                });

                _this.ws.send(Common.JSONToString(params));
                Debug.log('向应用服务器发送数据：' + Common.JSONToString(params));
                
                setTimeout(function() {
                    fun(i);
                }, 200);
            }

            eachDeviceInfos(0); //用延迟模拟循环而不用原生的for、each等方法是为了防止websockect在某些浏览器发送时落单现象
        },
        
        //创建RDTS服务端websokect通道
        buildRdtsWS: function(data) {
            var _this = this,
	            host = data.rdtsHost,
	            port = data.rdtsWsPort,
	            deviceSerial = data.deviceSerial,
	            tdSerial = data.tdSerial,
	            securityCode = data.securityCode,
	            rdtsWSKey = host + ':' + port,
	            connectDataKey = deviceSerial + tdSerial,
	            currentRdtsWS = _this.rdtsWSObj[rdtsWSKey],
	            currentConnectData = _this.connectData[connectDataKey];

            if (currentRdtsWS) {
            	_this.sendMessageToRDTS([data], rdtsWSKey, currentRdtsWS);
            	
            	if(!currentConnectData){
            		_this.connectData[connectDataKey] = data;
            		_this.serials[rdtsWSKey].push(connectDataKey);
            	}
                
            	return;
            }
            
            if(!window.WebSocket){
        		return;
        	}
            
            _this.rdtsWSObj[rdtsWSKey] = new WebSocket(Common.getRDTSWSDomain(host, port));
            _this.connectData[connectDataKey] = data;
            
            currentRdtsWS = _this.rdtsWSObj[rdtsWSKey],
            currentConnectData = _this.connectData[connectDataKey];
            _this.serials[rdtsWSKey] = [connectDataKey];

            currentRdtsWS.onopen = function(e) {
                Debug.log('rdts服务器:' + rdtsWSKey + '连接成功！');
                _this.sendMessageToRDTS(rdtsWSKey);
                _this.timeIds.push(Common.sendHeartbeatPackets(currentRdtsWS, 'rdts:' + rdtsWSKey));
            };

            currentRdtsWS.onmessage = function(e) {
                var data = Common.stringToJSON(e.data);

                //实时数据请求响应
                if (data.msgType === 'TD_REALTIME_DATA_ESTABLISH_RSP') {
                    Debug.log('rdts服务器:' + rdtsWSKey + '实时数据请求响应：' + data.value);
                }

                //心跳响应
                if (data.msgType === 'SERVER_HEARTBEAT_RSP') {
                    Debug.log('rdts服务器:' + rdtsWSKey + '心跳响应：' + data.value);
                }

                //实时数据透传数据
                if (data.msgType === 'DEVICE_DATA_TRANSFER') {
                    Debug.log('rdts服务器:' + rdtsWSKey + '实时数据透传：' + Common.JSONToString(data));
                    
                    var id = data.deviceSerial + data.tdSerial + TD_TYPE_CTRL;
                    _this.dataParsing.addData({
                        "id": id,
                        "dataSource": data,
                        "ctrlType": _this.getCtrlType(id)
                    });

                    //屏蔽非本实例tag数据，以防止队列满
                    var inTags = !!(_this.options.tagValues && $.inArray(data.tdDataTags * 1, _this.options.tagValues) !== -1);
                    var isFun = typeof _this.options.realtimeDataHandler == 'function';
                    if (inTags && isFun) {
                		_this.options.realtimeDataHandler(_this.dataParsing.getFirstData(id, data.tdDataTags), data.tdDataTags, id);
                    }
                }
            };

            currentRdtsWS.onclose = function(e) {
                if(!_this.ws || _this.ws.readyState !== 1){
                	setTimeout(
                		function(){
                			_this.buildWS(rdtsWSKey);
                			Debug.log('应用服务器websokect连接关闭，正在重连...');
                		},
                		50000
                	)
                	return;
                }
                
            	if (_this.ws && _this.ws.readyState === 1 && !_this.isLeavePage) {
                    Debug.log('rdts服务器:' + rdtsWSKey + '连接关闭，正在重连...');
                    _this.sendMessageToAPP(rdtsWSKey);
                    return;
                }
                
            	Debug.log('rdts服务器:' + rdtsWSKey + '连接关闭.');
            };

            currentRdtsWS.onerror = function(e) {
                Debug.log('rdts服务器:' + rdtsWSKey + 'Websokect出错，正在关闭...');
                currentRdtsWS.close();
            };
        },
        
        /* 向RDTS服务器发送数据 */
        sendMessageToRDTS: function(rdtsWSKey) {
        	var _this = this;
        	var data = _this.serials[rdtsWSKey];
        	if(!data || data.length == 0){
        		return;
        	}
        	
        	$.each(
        		data,
        		function(i, v){
        			var connectData = _this.connectData[v];
        			if(!connectData){
        				return true;
        			}
        			
        			var params = Common.getFullData({
                        "securityCode": connectData.securityCode,
                        "msgType": "TD_REALTIME_DATA_ESTABLISH_REQ"
                    });
                	
        			_this.rdtsWSObj[rdtsWSKey].send(Common.JSONToString(params));
                    
                    Debug.log('向rdts服务器' + rdtsWSKey + ', 发送数据：' + Common.JSONToString(params));       
                    
                	delete _this.connectData[v];
        		}
        	);
        },
        
        //返回tdTdDataTags
        getTdDataTags: function(ctrlType){
        	var tdDataTags = [];
        	//如果this.options.tagValues值为空或者是空数组则请求所有的tagvalues
        	if(!this.options.tagValues || this.options.tagValues.length === 0){
        		this.options.tagValues = this.protocols.getTagValues(ctrlType);
        	}
        	
        	if(!this.options.tagValues || this.options.tagValues.length === 0){
        		return;
        	}
        	
        	for(var i=0, len = this.options.tagValues.length; i < len; i++){
        		tdDataTags.push({
        			"value": this.options.tagValues[i],
                    "samplingPeriod": this.protocols.getSamplingPeriod(ctrlType, this.options.tagValues[i]) || 0
        		});
        	}
        	return tdDataTags;
        },
        
        //返回控制器类型
        getCtrlType: function(id){
        	for(var i=0, len = this.options.deviceInfos.length; i < len; i++){
        		if(this.options.deviceInfos[i].deviceSerial + this.options.deviceInfos[i].tdSerial + this.options.deviceInfos[i].type === id){
        			return this.options.deviceInfos[i].ctrlType;
        		}
        	}
        },
        
        //设置deviceInfos
        setDeviceInfos: function(deviceInfos){
        	if(!$.isArray(deviceInfos)){
        		deviceInfos = [deviceInfos];
        	}
        	
        	this.options.deviceInfos = deviceInfos;
        	
        	if (this.ws && this.ws.readyState === 1) {
        		this.sendMessageToAPP();
        	}
        },

        //绑定离开页面之前事件
        beforeunload: function(){
        	isLeavePage = true;
        	this.destroy();
        },
        
        //销毁所有数据
        destroy: function(){
        	this.destroyMedia();
        	
        	//关闭与应用服务器的websocket通道
        	if (this.ws && this.ws.readyState === 1) {
                this.ws.close();
            }
        	
        	//关闭与应用服务器的websocket通道
            $.each(
                this.rdtsWSObj,
                function(i, rdtsWS) {
                    if (rdtsWS) {
                        rdtsWS.close();
                    }
                }
            );
            
            //清除timeIds
            $.each(
            	this.timeIds,
            	function(i, timeId){
            		clearTimeout(timeId);
            	}
            );
            
        	this.medias = null;
            this.protocols = null;
            this.dataParsing = null;
            this.rdtsWSObj = null;
            this.connectData = null;
            this.serials = null;
            this.timeIds = null;
        },
        
        //销毁视频插件
        destroyMedia: function(){
        	$.each(
				this.medias,
				function (i, v) {
				    v.mediaPlayer.destroy();
				}
			);
        },
        
        //返回应用服务端websokect通道
        getWS: function(){
        	return this.ws;
        },
        
        //返回rdts服务端websokect通道 key = host + ':' + port
        getRdtsWS: function(key){
        	return this.rdtsWSObj[key];
        },
        
        //返回视频对象
        getMedia: function(mediaId){
        	if(mediaId){
        		return this.medias[mediaId];
        	}
        	return this.medias;
        },
        
        //返回协议实例
        getProtocols: function(){
        	return this.protocols;
        },
        
        //返回实时数据解析实例
        getDataParsing: function(){
        	return this.dataParsing;
        }
    };

    window.MonitorController = MonitorController;

})();