//实时数据监控类
(function() {
    function RealtimeDataMonitor(opts) {
        this.options = $.extend(true, RealtimeDataMonitor.defaults, opts);
        this.dataParsing = new DataParsing();
        this.page = new Page(this.options.pageOpts);
        this.queryParams = {
            page: 1,
            rows: 24,
            boundDeviceFlag: 'Y',
            sort: 2,
            networkStatus: 0
        };
        this.postData = this.getPostData(true); //装载当前所传参数
        this.deviceInfos = {}; //装载当前页列表数据精简版
        this.elevIds = []; //装载当前页电梯Ids
        this.floorsInfo = null; //装载楼层对照信息
        this.isLeavePage = false; //是否离开页面，如果离开页面，websokect调用onclose时不执行函数
        this.timeIds = []; //装载ws心跳timeids
        this.rdtsTimeIds = []; //装载rdts心跳timeids
        this.signalTimeId = 0; //装载信号强度的timeid
        this.queryNumber = 0; //装载列表请求次数
        this.layoutSize = layoutSize;
        this.ws = null; //与应用服务端的websokect通道
        this.rdtsWS = {}; //装载rdtsWS的对象，{"host : port" : new websokect()}
        this.rdtsTD = {}; //装载设备序列号
        this.appData = {}; //应用服务端返回的数据
        this.redressStatus = {}; //检验电梯状态  redressStatus{tdId:{checking:0,chuankou:0,failureCode:0},...}
        this.gifRandomCodes = {}; //装载每个电梯对应加载图片后面加的随机数，此功能为了防止同一个URL的GIF图片缓存后，导致的开关门互相受影响的BUG {regCode: 'EDSD552014'}
        this.DOMS = {}; //装载当前页面所有需要频繁操作的DOM对象，比如楼层显示、信号强度、类型，开关门等
        this.checkWSTimeId = 0;


        this.init();
    }
    
    changeEventOfSwitchButton({btnId:"J_ToolBarSearch"});

    //默认设置
    RealtimeDataMonitor.defaults = {
        pageOpts: {
            menuOpts: {
                showMenuType: [1, 2, 5, 7, 9]
            }
        }, //页面公共构造函数
        url: URL.GetElevatorMonitorList, //数据请求ACTION
        listElement: $('#J_MonitorBox'),
        queryParams: {
            page: 1,
            rows: 30,
            boundDeviceFlag: 'Y'
        }, //参数
        tdType: 0, //0:控制器,1:视频, 这个页面只取控制器数据
        pagebarElement: $('#J_PageBar'), //装载分页工具条的元素对象
        pagebar: {
            callback: function() {
                return;
            }, //为翻页调用次函数。
            prev_text: "«",
            next_text: "»",
            items_per_page: 30,
            num_edge_entries: 2, //两侧首尾分页条目数
            num_display_entries: 6, //连续分页主体部分分页条目数
            current_page: 0 //当前页索引
        }
    }

    RealtimeDataMonitor.prototype = {
        constructor: RealtimeDataMonitor,
        
        init: function() {
        	this.buildWS();
            this.restListLayout();
            this.initData();
            this.intervalHandler();
            this.bindEventOfSearch();
            this.bindEvents();
        },
        
        //获取完整的请求参数
        getPostData: function(isNeedParams){
        	if(!isNeedParams){
        		return $.extend({}, this.queryParams);
        	}
        	
            var param = this.page.getUrlParams();
            var elevStatus = param.elevStatus;
            var deviceStatus = param.deviceStatus;
            var tempParams = $.extend({}, this.queryParams);
            
            //接受URL带过来的参数
            if (elevStatus) {
                $('#elevStatus').val(elevStatus);
                tempParams.elevStatus = elevStatus;
            }
            if (deviceStatus) {
                $('#deviceStatus').val(deviceStatus);
                tempParams.deviceStatus = deviceStatus;
            }
            
            return tempParams;
        },

        //重设列表布局，根据当前窗口的宽度计算显示的item数，以及设置相关的CSS
        restListLayout: function() {
            var monitorBoxWidth = $('#J_MonitorBox').width(),
                monitorBoxHeight = $('#J_MonitorBox').height(),
                itemHeight = 240,
                marginValue = 5,
                halfMargin = 0,
                itemWidth = 180 + marginValue * 2,
                rows = 3,
                cols = 0;

            //当显示三行列表后的高度大于当前的box的高度则表示会出现滚动条，则参考宽度要-18即滚动条的宽度
            if (itemHeight * rows > monitorBoxHeight) {
                monitorBoxWidth = monitorBoxWidth - 20;
            }

            cols = Math.floor(monitorBoxWidth / itemWidth);
            remainder = monitorBoxWidth - itemWidth * cols;
            halfMargin = marginValue + Math.floor(remainder / cols / 2);

            this.postData.rows = rows * cols;

            if ($('#monitorItemCSS').length > 0) {
                $('#monitorItemCSS').remove();
            }

            $('<style id="monitorItemCSS">.monitor-item{ margin-left:' + halfMargin + 'px;margin-right:' + halfMargin + 'px; }</style>').appendTo($(document.head));
        },
        
        //请求数据
        initData: function(pageIndex) {
            var _this = this;
            var url = _this.options.url;

            var loadingBox = Common.addLoadingBox(Lang.loading, $('#J_Box'));

            _this.postData.page = pageIndex || 1;

            Common.getDataByAjax(url, _this.postData, function(data) {

                Common.removeLoadingBox(loadingBox);

                data = Common.stringToJSON(data);

                if (!data) {
                    return;
                }

                //total为0则显示没找到数据提示
                if (data.total == 0) {
                    _this.options.listElement.html('<div class="msg">' + Lang.msgNotFound + '</div>');
                    return;
                }

                //第一次加载的时候初始化分页工具栏
                if (_this.queryNumber === 0) {
                    _this.initPagination(data.total);
                    _this.setPagerInfo(1, data.total);
                    _this.queryNumber++;
                }

                var rows = data.rows;

                if (rows && rows.length === 0) {
                    //Debug.log('返回的数据列表为空');
                    return;
                }

                _this.dataListHandler(rows);
            });
        },

        //数据处理
        dataListHandler: function(data) {
            var _this = this;
            _this.options.listElement.empty();

            var $monitorList = $('<ul class="monitor-list"></ul>');

            $.each(
                data,
                function(index, value) {
                    _this.elevIds.push(value.id);
                    _this.setDeviceInfos(value, value.tdList, _this.options.tdType);                    
                    _this.buildHTML(value).appendTo($monitorList);
                }
            );

            _this.options.listElement.append($monitorList);

            _this.layoutSize.init();
            
            _this.isLeavePage = false;  
            _this.setFloorsInfo();

            //判断与应用服务端websokect的通道是否已经建立
            if (_this.ws && _this.ws.readyState === 1) {
            	//请求实时数据
                _this.sendMessageToAPP();
                //请求信号强度
                _this.querySignalLength();
                clearTimeout(_this.signalTimeId);
                setTimeout(function() {
                    _this.updateDeviceStatus();
                    _this.signalTimeId = setTimeout(arguments.callee, 1000 * 60 * 10);
                }, 1000 * 60 * 10);
            }else{
            	setTimeout(function(){
            		if(_this.ws && _this.ws.readyState === 1){
            			//请求实时数据
            			_this.sendMessageToAPP();
            			//请求信号强度
                        _this.querySignalLength();
                        clearTimeout(_this.signalTimeId);
                        setTimeout(function() {
                            _this.updateDeviceStatus();
                            _this.signalTimeId = setTimeout(arguments.callee, 1000 * 60 * 10);
                        }, 1000 * 60 * 10);
            			clearTimeout(_this.checkWSTimeId);
            			return;
            		}           		
            		_this.checkWSTimeId = setTimeout(arguments.callee, 1000);
            	}, 1000);
            }
        },

        //分页配置
        initPagination: function(total) {
            var _this = this;
            this.options.pagebarElement.pagebar(total, {
                prev_text: "«",
                next_text: "»",
                items_per_page: this.postData.rows,
                num_edge_entries: 2, //两侧首尾分页条目数
                num_display_entries: 6, //连续分页主体部分分页条目数
                current_page: 0, //当前页索引
                callback: function(index, jq) {
                    _this.resetData(index);
                    _this.initData(index);
                    _this.setPagerInfo(index, total);
                }
            });
        },
        
        //获取每页显示的内容数量
        setPagerInfo: function(pageIndex, total) {
            var startCount = 0;
            var endCount = 0;
            var pageSize = this.postData.rows;
            var totalPage = Math.ceil(total / pageSize);
            if (0 === totalPage) {
                totalPage = 1;
            }
            
            startCount = (pageIndex - 1) * pageSize + 1;

            if (pageIndex == totalPage) {
                endCount = total;
            } else {
                endCount = pageIndex * pageSize;
            }

            $("#pageNumber").html(startCount);
            $("#pageData").html(endCount);
            $("#totalData").html(total);
        },

        //设置当前页的数据
        setDeviceInfos: function(value, tdList) {
            if (!tdList || tdList.length == 0) {
                return;
            }

            var _this = this;
            $.each(
                tdList,
                function(i, v) {
                    if (v.type === _this.options.tdType) {
                        _this.deviceInfos[v.regCode + v.address + v.type] = {
                            'deviceSerial': v.regCode,
                            'tdSerial': v.address,
                            'ctrlType': v.ctrlType,
                            'type': v.type,
                            'elevatorStatus': value.elevatorStatus,
                            'internetType': ''
                        };
                        return false;
                    }
                }
            );
        },

        //设置电梯的状态
        setRedressStatus: function(tdId) {
            if (this.redressStatus[tdId]) {
                return;
            }

            this.redressStatus[tdId] = {
                "upkeep": 0,
                "chuankou": 0,
                "failureCode": 0
            }
        },

        //创建列表HTML
        buildHTML: function(value) {

            var _this = this;
            var id = value.id ? value.id : 0,
                aliasOfAddress = value.aliasOfAddress ? value.aliasOfAddress : '',
                factoryNO = value.factoryNO ? value.factoryNO : '',
                elevatorStatus = value.elevatorStatus,
                elevatorStatusHTML = Common.getTransformElevatorStatus(elevatorStatus),
                statusClassOfLi = 'elevator-monitor-item-normal', //'elevator-monitor-item-fault','elevator-monitor-item-offline',
                elevType = value.elevatorType, //1直梯，2扶梯
                defaultImg = elevType === 2 ? 'escalator-stop' : 'elevator-closed',
                title = Lang.factoryNO + Lang.commonColon,
                href = Common.pieceUrl(URL.MonitorOfDetails) + '&elevId=' + value.id,
                floorActiveClass = ' floor-arrow-active',
                floorNumber = '&nbsp',
                addedClass = value.isFavorite ? 'my-favorite-active' : '',
                favoriteTitle = addedClass ? Lang.delToMyFavorite : Lang.addToMyFavorite,
                hiddenClass = addedClass ? '' : 'hidden',
                $item = '',
                tdId = _this.getTdIdByTdList(value.tdList, _this.options.tdType),
                regCode = value.regCode;

            $item = $('<li class="monitor-item ' + statusClassOfLi + '" data-tdid="' + tdId + '" data-monitor-item="true" data-id="' + id + '" data-regcode="' + regCode + '" data-elev-type="'+elevType+'">' +
                '       <div class="statusbar">' +
                '           <div class="status-bar-left" data-statusbar-left="true">' +
                '               <i class="icon-elev" data-class="icon-elev" data-chuankoutongxin="true"></i>' +
                '				<i class="icon-elev" data-class="icon-elev" data-jianxiu="true"></i>' +
                '				<i class="icon-elev" data-class="icon-elev" data-guzhang="true"></i>' +
                '           </div>' +
                '           <div class="status-bar-right" data-statusbar-right="true">' +
                '                <i class="icon icon-signal-strength" data-class="icon icon-signal-strength" data-signal-strength="true"></i>' +
                '                <span class="internet-type" data-internet-type="true"></span>' +
                '           </div>' +
                '       </div>' +
                '		<div class="monitor-info">' +
                '			<a class="monitor-small-image" target="_blank" data-monitor-image="true" data-class="monitor-small-image" href="' + href + '" title="' + title + factoryNO + '"><img src="/sys/resource/base/skin/default/images/'+defaultImg+'.gif" alt="' + title + factoryNO + '" width="104" height="140" data-image="true" data-elev-type="'+elevType+'" data-status="00"></a>' +
                '			<div class="monitor-realtime-data">' +
                '				<div class="f-fix">' +
                '					<ul class="list-unstyled display-list">' +
                '						<li class="display-item display-item-direction" data-direction="true" data-elev-type="'+elevType+'"><i class="icon" data-class="icon"></i></li>' +
                '						<li class="display-item display-item-number"><span class="floor-number" data-floor-number="true">' + floorNumber + '</span></li>' +
                '					</ul>' +
                '					<p class="device-status" data-device-status="true" data-status="'+elevatorStatus+'">' + elevatorStatusHTML + '</p>' +
                '				</div>' +
                '			</div>' +
                '		</div>' +
                '		<h2 class="monitor-title" data-monitor-title="true"><a class="elevator-monitor-link" target="_blank" href="' + href + '" title="' + factoryNO + " | " + aliasOfAddress + '">' + factoryNO + ' | ' + aliasOfAddress + '</a></h2>' +
                '		<div class="actions ' + hiddenClass + '" data-hidden="' + (hiddenClass ? 'false' : 'true') + '">' +
                '			<a href="' + Common.pieceUrl(URL.MonitorOfMyFavorite) + '" class="my-favorite ' + addedClass + '" title="' + favoriteTitle + '" data-id="' + id + '" data-myfavorite="true">' + favoriteTitle + '</a>' +
                '		</div>' +
                '</li>');

            //绑定添加hover事件
            $item.hover(
                function() {
                    var $element = $(this).find('.actions');
                    if ($element.attr('data-hidden') === 'true') {
                        return false;
                    }
                    $element.removeClass('hidden');
                },
                function() {
                    var $element = $(this).find('.actions');
                    if ($element.attr('data-hidden') === 'true') {
                        return false;
                    }
                    $element.addClass('hidden');
                }
            );

            //添加、取消关注
            $item.find('[data-myfavorite]').click(function(e) {
                e.preventDefault();
                var $this = $(this);
                var isAdded = $this.hasClass('my-favorite-active');
                var url = isAdded ? URL.CancelElevatorMonitorOfMyFavorite : URL.AddElevatorMonitorOfMyFavorite;
                var params = {
                    'elevId': $this.attr('data-id')
                };

                Common.getDataByAjax(url, params, function(data) {
                    if (data.success) {
                        if (isAdded) {
                            $this.parents('.actions').addClass('hidden').attr('data-hidden', 'false');
                            $this.removeClass('my-favorite-active').attr('title', Lang.addToMyFavorite);
                            _this.resetData();
                            _this.initData();
                        } else {
                            $this.parents('.actions').removeClass('hidden').attr('data-hidden', 'true');
                            $this.addClass('my-favorite-active').attr('title', Lang.delToMyFavorite);
                        }

                        msgDialog(data.msg, Lang.alertTitlePrompt, 'success');
                    } else {
                        msgDialog(data.msg, Lang.alertTitlePrompt, 'danger');
                    }
                });
            });

            //设置DOMS
            _this.setDOMS(tdId, $item);
            
            //设置电梯状态
            _this.setRedressStatus(tdId);

            return $item;
        },
        
        //将页面上需要修改的DOM元素存起来
        setDOMS: function(tdId, $obj) {
            if (tdId in this.DOMS) {
                //Debug.log('key已经存在!');
                return;
            }

            this.DOMS[tdId] = {
            	self: $obj,
                chuankoutongxin: $obj.find('[data-chuankoutongxin="true"]'),
                jianxiu: $obj.find('[data-jianxiu="true"]'),
                guzhang: $obj.find('[data-guzhang="true"]'),
                signalStrength: $obj.find('[data-signal-strength="true"]'),
                internetType: $obj.find('[data-internet-type="true"]'),
                image: $obj.find('[data-image="true"]'),
                direction: $obj.find('[data-direction="true"] .icon'),
                floorNumber: $obj.find('[data-floor-number="true"]'),
                deviceStatus: $obj.find('[data-device-status="true"]')
            }
        },

        //间隔时间去取数据并填充
        intervalHandler: function() {
            var _this = this;
            setTimeout(function() {
                var tagValue = _this.getTagValue();
                var data = _this.dataParsing.getAllData();
                var id = '';
                var realtimeData = '';
                var deviceSerial = '';
                var tdSerial = '';
                var type = '';

                $.each(
                    _this.deviceInfos,
                    function(key, v) {
                    	id = v.deviceSerial + v.tdSerial + v.type;
                        realtimeData = data[id] ? (data[id][tagValue] ? data[id][tagValue].pop() : null) : null;
                        if (!realtimeData) {
                            //Debug.log('没有取到解析好的实时数据.' + new Date().toLocaleTimeString());
                            return true;
                        }
                        _this.fillRealTimeData(realtimeData, id, v.deviceSerial);
                        data[id][tagValue].length = 0;
                    }
                );
                setTimeout(arguments.callee, 1000);
            }, 1000);
        },

        bindEventOfSearch: function() {
            bindEventOfMoreSwitch();
            var _this = this;
            var addressCtrl = new AddressController({
                provinceId: 'province',
                cityId: 'city',
                areaId: 'area'
            });

            //搜索
            $('#J_SearchForm').submit(function(e) {
                e.preventDefault();
                _this.resetData();
                _this.postData = $.extend({}, _this.getPostData(false), $(this).serializeObject());
                _this.queryNumber = 0;
                _this.initData();
            });

            //重置
            $("#J_SearchRest").click(function(e) {
                addressCtrl.clearValues();
                _this.resetData();
                _this.postData = _this.getPostData(false);
                _this.queryNumber = 0;
                _this.initData();
            });
            
            
            //初始化排序
            if (this.queryParams.sort) {
                $('.box-ul-order li[data-value="' + this.queryParams.sort + '"]').addClass('select-border');
                $('.box-ul-order li[data-value="' + this.queryParams.sort + '"] .icon').removeClass('hidden');
            }
            
            //排序点击事件
            $('#J_iconOrderBy').click(function() {
                $('#J_boxMonitorData').toggle();
            });
            
            $('#J_boxMonitorData li').click(function(e){
                var $self = $(this);
                _this.postData.sort = $(this).attr('data-value') * 1;
                _this.resetData();
                _this.initData();
                
                $('.box-ul-order li').removeClass('select-border');
                $('.box-ul-order li .icon').addClass('hidden');
                
                $self.addClass('select-border');
                $self.find('.icon').removeClass('hidden');
            });
        },
        
        //绑定事件
        bindEvents: function() {
            var _this = this;
            $(window).resize(function(e) {
                _this.restListLayout();
            });

            window.onbeforeunload = function(e) {
                _this.isLeavePage = true;
                _this.clearData();
            };
        },

        //创建应用服务端websokect通道
        buildWS: function() {
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

            if (!window.WebSocket) {
                return;
            }

            _this.ws = new WebSocket(loginData.getWSDomain('monitor', 'websocket'));

            _this.ws.onopen = function(e) {
                Debug.log('app连接成功.');
                /* 每隔25秒发心跳包，防止websocket关闭 */
                _this.timeIds.push(Common.sendHeartbeatPackets(_this.ws, 'app'));
            };

            _this.ws.onmessage = function(e) {
                var data = e.data;
                data = Common.stringToJSON(data);
                
                /* 实时数据请求响应 */
                if (data.msgType === 'GET_TD_REALTIME_DATA_RSP' && data.errorCode === 0) {
                    Debug.log('接收app数据：' + Common.JSONToString(data));
                    _this.buildRdtsWS(data);
                }

                // 实时数据信号强度(实时数据信号强度)
                else if (data.msgType === 'GET_SINGLE_DATA') {
                    Debug.log('接收信号数据：' + Common.JSONToString(data));
                    var tdIds = _this.getTdIdsByRegCode(data.regCode);
                    _this.setInternetType({value: _this.getSignalType(data.signalType)}, tdIds);
                    _this.setSignalStrength({escapeValue: data.signalValue}, tdIds);
                }
            };

            _this.ws.onclose = function(e) {
                Debug.log('app连接关闭.');
            };

            _this.ws.onerror = function(e) {
                Debug.log('appWebsocket出错，正在关闭...');
                _this.ws.close();
            };
        },

        //创建RDTS服务端websokect通道
        buildRdtsWS: function(data) {
            var _this = this,
                host = data.rdtsHost,
                port = data.rdtsWsPort,
                deviceSerial = data.deviceSerial,
                tdSerial = data.tdSerial,
                securityCode = data.securityCode,
                wsURL = host + ':' + port,
                rdtsWS = _this.rdtsWS[wsURL],
                rdtsTD = _this.rdtsTD[wsURL],
                wsUrlData = _this.appData[wsURL];

            if (rdtsWS && rdtsTD) {
                if ($.inArray(deviceSerial + tdSerial, rdtsTD) != 1) {
                    rdtsTD.push(deviceSerial + tdSerial);
                }
                if (rdtsWS.readyState == 1) {
                    _this.sendMessageToRDTS([data], wsURL, rdtsWS);
                } else {
                    wsUrlData.push(data);
                }
                return;
            }

            if (!window.WebSocket) {
                return;
            }

            rdtsWS = _this.rdtsWS[wsURL] = new WebSocket(Common.getRDTSWSDomain(host, port));
            rdtsTD = _this.rdtsTD[wsURL] = [deviceSerial + tdSerial];
            wsUrlData = _this.appData[wsURL] = [data];

            rdtsWS.onopen = function(e) {
                Debug.log('rdts' + host + ':' + port + '连接成功！');
                _this.sendMessageToRDTS(wsUrlData, wsURL, rdtsWS);
                _this.rdtsTimeIds.push(Common.sendHeartbeatPackets(rdtsWS, 'rdts:' + host + ':' + port));
            };

            rdtsWS.onmessage = function(e) {
                var data = Common.stringToJSON(e.data);
                //实时数据请求响应
                if (data.msgType === 'TD_REALTIME_DATA_ESTABLISH_RSP') {
                    Debug.log('rdts' + host + ':' + port + '实时数据请求响应：' + data.value);
                    return;
                }

                //心跳响应
                if (data.msgType === 'SERVER_HEARTBEAT_RSP') {
                    Debug.log('rdts' + host + ':' + port + '心跳响应：' + data.value);
                    return;
                }

                //实时数据透传数据
                if (data.msgType === 'DEVICE_DATA_TRANSFER') {
                    //屏蔽非本页定义的tag数据，以防止队列满
                    if (data.tdDataTags * 1 !== 1) {
                        return;
                    }

                    Debug.log('rdts' + host + ':' + port + '实时数据透传：' + Common.JSONToString(data));
                    var id = _this.getTdId(data, _this.options.tdType);
                    _this.dataParsing.addData({
                        "id": id,
                        "dataSource": data,
                        "ctrlType": _this.getCtrlTypeById(id)
                    });
                    return;
                }
                
                Debug.log('收到rdts数据并且未处理：' + e.data);
            };

            rdtsWS.onclose = function(e) {
                if (_this.ws && _this.ws.readyState === 1 && !_this.isLeavePage) {
                    Debug.log('rdts' + host + ':' + port + '连接关闭，清除数据');
                    //_this.sendMessageToAPP(rdtsTD);
                    _this.clearData(wsURL);
                    return;
                }
                Debug.log('rdts' + host + ':' + port + '连接关闭.');
            };

            rdtsWS.onerror = function(e) {
                Debug.log('rdts' + host + ':' + port + 'Websokect出错，正在关闭...');
                rdtsWS.close();
            };
        },

        /* 向RDTS服务器发送数据 */
        sendMessageToRDTS: function(data, wsURL, rdtsWS) {
            var temp = [];
            $.each(
                data,
                function(i, v) {
                    if ((v.rdtsHost + ':' + v.rdtsWsPort) != wsURL) {
                        return true;
                    }

                    var params = {
                        "securityCode": v.securityCode,
                        "msgType": "TD_REALTIME_DATA_ESTABLISH_REQ"
                    };

                    params = Common.JSONToString(Common.getFullData(params));

                    rdtsWS.send(params);

                    Debug.log('向rdts' + v.rdtsHost + ':' + v.rdtsWsPort + '发送数据：' + params);

                    temp.push(i);
                }
            );

            $.each(
                temp,
                function(i, v) {
                    data.splice(v, 1);
                }
            );
        },

        /* 向APP服务器发送数据 */
        sendMessageToAPP: function(devices) {
            var _this = this;
            var protocols = new Protocol();
            var tagValue = _this.getTagValue();
            var ctrlType = 0;
            var samplingPeriod = 0;
            var deviceSerial = '';
            var tdSerial = '';
            var type = 0;
            var id = '';
            
            $.each(
            	_this.deviceInfos,
            	function(key, value){
                    deviceSerial = value.deviceSerial;
                    tdSerial = value.tdSerial;
                    type = value.type;
                    id = deviceSerial + tdSerial + type;
                    
            		//如果采集离线，不请求实时数据
                    if (value.elevatorStatus * 1 === 2) {
                        return true;
                    }
                    
                    //如果有devices参数，防止其它设备发送给APP应用服务器（用于当RDTS中断时，重连）
                    if (typeof devices === 'string' && devices !== id) {
                        return true;
                    }
                    
                    if (devices instanceof Array && $.inArray(id, devices) === -1) {
                        return true;
                    }

                    ctrlType = value.ctrlType;
                    samplingPeriod = protocols.getSamplingPeriod(ctrlType, tagValue);

                    if (!deviceSerial) {
                        Debug.log('deviceSerial:' + deviceSerial + '数据类型：' + typeof deviceSerial + '，已返回！');
                        return true;
                    }

                    if (!tdSerial) {
                        Debug.log('tdSerial:' + tdSerial + '数据类型：' + typeof tdSerial + '，已返回！');
                        return true;
                    }

                    if (!tagValue && tagValue != 0) {
                        Debug.log('tagValue:' + tagValue + '数据类型：' + typeof tagValue + '，已返回！');
                        return true;
                    }

                    if (!samplingPeriod && samplingPeriod != 0) {
                        Debug.log('samplingPeriod:' + samplingPeriod + '数据类型：' + typeof samplingPeriod + '，已返回！');
                        return true;
                    }

                    var params = {
                        "msgType": "GET_TD_REALTIME_DATA_REQ",
                        "deviceSerial": deviceSerial,
                        "tdSerial": tdSerial,
                        "tdDataTags": [{
                            "value": tagValue,
                            "samplingPeriod": samplingPeriod
                        }]
                    };

                    params = Common.JSONToString(Common.getFullData(params));

                    _this.ws.send(params);

                    Debug.log('向app发送数据：' + params);
                    
            	}
        	);
        },

        //填充实时数据
        fillRealTimeData: function(data, tdId, regCode) {
            if (!data) {
                Debug.log('未取到数据！');
                return;
            }

            if (!tdId) {
                Debug.log('未指定ID！');
                return;
            }

            var element = $('[data-tdid=' + tdId + ']');
            var elevType = element.attr('data-elev-type');
            if (element.length == 0) {
                Debug.log('页面未找对应元素！');
                return;
            }
            
            //如果设备离线，不填充实时数据
            if (this.DOMS[tdId].deviceStatus.text === '离线') {
                return;
            }

            var _this = this;
            var flag = false;
            var upkeepStatus = 0;
            var communicationStatus = 0;
            var faultStatus = 0;
            $.each(
                data,
                function(i, o) {
                    if (o.name == '运行方向') {
                        _this.setDirection(o.escapeValue, tdId);
                    } else if (o.name == '楼层') {
                        _this.setFloor(o.escapeValue, tdId);
                    } else if (o.name == '开关门状态') {
                        _this.setDoorStatus(o.escapeValue, tdId);
                    } else if (o.name == '检修状态') {
                        _this.setJianxiu(o, tdId);

                        if (o.escapeValue == 1) {
                            upkeepStatus = 2;
                        } else {
                            upkeepStatus = 1;
                        }

                        if (_this.redressStatus[tdId]) {
                            if (_this.redressStatus[tdId].upkeep != upkeepStatus) {
                                _this.redressStatus[tdId].upkeep = upkeepStatus;
                                flag = true;
                            }

                        } else {
                            _this.redressStatus[tdId].upkeep = upkeepStatus;
                            flag = true;
                        }

                    } else if (o.name == '串口通信异常') {
                        _this.setChuankoutongxin(o, tdId);

                        if (o.escapeValue == 1) {
                            communicationStatus = 2;
                        } else {
                            communicationStatus = 1;
                        }

                        if (_this.redressStatus[tdId]) {
                            if (_this.redressStatus[tdId].chuankou != communicationStatus) {
                                _this.redressStatus[tdId].chuankou = communicationStatus;
                                flag = true;
                            }
                        } else {
                            _this.redressStatus[tdId].chuankou = communicationStatus;
                            flag = true;
                        }

                    } else if (o.name == '电梯故障代码' || o.name == '故障代码') {
                        _this.setFault(o, tdId);

                        if (o.escapeValue != 0) {
                            faultStatus = 2;
                        } else {
                            faultStatus = 1;
                        }

                        if (_this.redressStatus[tdId]) {
                            if (_this.redressStatus[tdId].failureCode != faultStatus) {
                                _this.redressStatus[tdId].failureCode = faultStatus;
                                flag = true;
                            }
                        } else {
                            _this.redressStatus[tdId].failureCode = faultStatus;
                            flag = true;
                        }

                    } else if (o.name == '网络类型') {
                        _this.setInternetType(o, tdId);
                    } else if (o.name == '信号强度') {
                        _this.setSignalStrength(o, tdId);
                    }
                    //扶梯
                    else if (elevType==2 && (o.name == '扶梯上行' || o.name == '扶梯下行' || o.name == '运行状态')) {
                    	_this.setEscalatorStatus(o, tdId);
                    }
                    
                }
            );


            if (flag) {
            	Debug.log("向app服务器发送电梯状态的更新信息!");
                _this.ws.send(Common.JSONToString({
                    'msgType': 'UPDATE_ELEV_STATUS',
                    'regCode': regCode,
                    'faultStatus': faultStatus, //（1.正常 2.故障）
                    'upkeepStatus': upkeepStatus, //（1.正常 2.检修）
                    'communicationStatus': communicationStatus //(1.正常 2.串口通信异常)
                }));
            }
        },

        //设置默认显示样式(g2128 2015-11-02 14:18)
        setDefaultDisplayStyle: function(tdId) {
            if (!tdId) {
                Debug.log('未指定ID！');
                return;
            }
            var element = $('[data-tdId=' + tdId + ']');
            if (element.length == 0) {
                Debug.log('页面未找对应元素！');
                return;
            }
            if (!(tdId in this.DOMS)) {
                return;
            }

            var _this = this;
            var dom = this.DOMS[tdId];
            //设置运行方向(默认停止)
            _this.setDirection('00', tdId);

            //设置楼层(默认没有)
            var e = dom.floorNumber;
            e.text("");
            //设置开关门状态（默认关门）
            _this.setDoorStatus('00', tdId);
            //设置检修状态(默认无检修)
            var e = dom.jianxiu;
            if (e.hasClass('icon-elev-jianxu-active')) {
                e.removeAttr('title');
                e.attr('class', e.attr('data-class'));
            }

            //设置串口通信异常
            e = dom.chuankoutongxin;
            if (e.hasClass('icon-elev-chuankoutongxin-active')) {
                e.removeAttr('title');
                e.attr('class', e.attr('data-class'));
            }

            //设置故障
            e = dom.guzhang;
            if (e.hasClass('icon-elev-guzhang-active')) {
                e.removeAttr('title');
                e.attr('class', e.attr('data-class'));
            }
            //设置网络类型
            e = dom.internetType;
            e.html("");

            //设置信号强度
            e = dom.signalStrength;
            e.removeAttr('title');
            e.attr('class', e.attr('data-class'));
        },

        //设置楼层对照
        setFloorsInfo: function() {
            if (this.elevIds.length == 0) {
                return;
            }

            var _this = this;
            var params = {
                'elevIds': _this.elevIds.join(',')
            };

            Common.getDataByAjax(URL.GetDisplayFloorMap, params, function(data) {
                if (!data) {
                    return;
                }
                _this.floorsInfo = data;
            });
        },

        //获取楼层对照数据
        getDisplayFloor: function(floor, elevId) {
            if (!this.floorsInfo) {
                Debug.log('没有楼层对照信息');
                return floor;
            }
            var floorList = this.floorsInfo[elevId] ? this.floorsInfo[elevId].rows : null;
            if (!floorList || floorList.length == 0) {
                return floor;
            }

            var newFloor = floor;
            $.each(
                floorList,
                function(i, v) {
                    if (v.realFloor == floor && v.displayFloor != '') {
                        newFloor = v.displayFloor;
                    }
                }
            );

            return newFloor;
        },

        //判断是否有控制器
        hasCtrlType: function(tdList) {
            var flag = false;
            if (!tdList || tdList.length == 0) {
                return flag;
            }
            $.each(
                tdList,
                function(i, v) {
                    if (v.type == 0 && v.ctrlType) {
                        flag = true;
                        return false;
                    }
                }
            );
            return flag;
        },

        //根据电梯ID获取相关className
        getClassNameByElevatorId: function(elevatorID) {
            if (!favoriteElevatorIds || favoriteElevatorIds.length == 0) {
                return '';
            }
            if ($.inArray(elevatorID, favoriteElevatorIds) != -1) {
                return 'my-favorite-active';
            }
        },

        //返回网络类型
        getSignalType: function(value) {
            var typs = {
                '1': '2G',
                '2': '3G',
                '3': 'wifi',
                '4': '以太网'
            };
            return typs[value];
        },

        //根据设备序列号与地址码获取网络类型
        getInternetType: function(id) {
            return this.getValueById(id, 'internetType');
        },
        
        //根据设备类型返回唯一ID，0:控制器, 1:视频        
        getTdIdByTdList: function(tdInfos, type) {
            var id = '';
            if (tdInfos && tdInfos.length > 0) {
                $.each(
                    tdInfos,
                    function(i, v) {
                        if (v.type === type) {
                            id = v.regCode + v.address + v.type;
                            return false;
                        }
                    }
                );
            }
            return id;
        },

        /* 获取唯一标识，采集设备 + 目标设备ID + 目标设备类型*/
        getTdId: function(data, type) {
            return data.deviceSerial + data.tdSerial + (data.type ? data.type : type);
        },

        /* 获取协议tag值 */
        getTagValue: function() {
            return TdSerialTag.RealTimeData;
        },

        /* 通过唯一id获取ctrlType */
        getCtrlTypeById: function(id) {
            return this.getValueById(id, 'ctrlType');
        },

        /* 根据唯一ID获取字段值 */
        getValueById: function(id, key) {
            if (!id) {
                return '';
            }
            if(this.deviceInfos[id]){
            	return this.deviceInfos[id][key];
            }else{
            	return '';
            }
        },
        
        /* 根据regCode查找tdId */
        getTdIdsByRegCode: function(regCode){
        	if(!regCode){
        		return;
        	}
        	var tdIds = [];
        	$.each(this.deviceInfos, function(key, v){
        		if(v.deviceSerial == regCode){
        			tdIds.push(key);
        		}
        	});
        	
        	return tdIds;
        },

        /* 故障状态 */
        setFault: function(o, tdId) {
            if (!(tdId in this.DOMS)) {
                return;
            }

            var e = this.DOMS[tdId].guzhang,
                value = o.escapeValue;

            if (value != 0) {
                if (e.hasClass('icon-elev-guzhang-active')) {
                    return;
                }
                e.attr('title', Lang.guzhangError);
                e.addClass('icon-elev-guzhang-active');
            } else {
                if (!e.hasClass('icon-elev-guzhang-active')) {
                    return;
                }
                e.removeAttr('title');
                e.attr('class', e.attr('data-class'));
            }
        },

        /* 设置状态样式 */
        setStatus: function(value, tdId) {
            //null:未绑定设备 1:在线, 2:离线
            if (!(tdId in this.DOMS)) {
                return;
            }

            var e = this.DOMS[tdId].deviceStatus;
            var status = e.attr('data-status');
            var text = Common.getTransformElevatorStatus(value);
            
            if(status == value){
                return false;             
            }

            e.html(text);
            return true;
        },

        /* 设置当前楼层 */
        setFloor: function(value, tdId) {
            if (!value) {
                return;
            }

            if (!(tdId in this.DOMS)) {
                return;
            }

            var e = this.DOMS[tdId].floorNumber;
            var self = this.DOMS[tdId].self;
            var elevId = self.attr('data-id');

            e.text(this.getDisplayFloor(value, elevId));
        },

        /* 设置电梯运行方向样式 */
        setDirection: function(value, tdId) {
            if (!(tdId in this.DOMS)) {
                return;
            }

            var e = this.DOMS[tdId].direction;
            var oClass = e.attr('data-class');

            //停止
            if (value == '00') {
                if (e.attr('class') === oClass) {
                    return;
                }
                e.attr('class', oClass);
                return;
            }
            //下行
            if (value == '01') {
                if (e.hasClass('icon-direction-down')) {
                    return;
                }
                e.attr('class', oClass).addClass('icon-direction-down');
                return;
            }
            //上行
            if (value == '10') {
                if (e.hasClass('icon-direction-up')) {
                    return;
                }
                e.attr('class', oClass).addClass('icon-direction-up');
                return;
            }
            //无意义
            if (value == '11') {
                if (e.attr('class') === e.attr('data-class')) {
                    return;
                }
                e.attr('class', oClass).attr('class', e.attr('data-class'));
                return;
            }
        },
        
        /* 设置扶梯运行方法以及上下行状态  */
        setEscalatorStatus: function(o, tdId){
        	if (!(tdId in this.DOMS)) {
                return;
            }
        	
        	var value = o.escapeValue;
        	var name = o.name;
        	var e = this.DOMS[tdId].direction;
        	var oClass = e.attr('data-class');
        	var eImage = this.DOMS[tdId].image;
        	var statusImage = e.attr('data-status');
        	var randomCode = Common.randomCode(3, 10);
        	
        	//IE9,10,11针对缓存的GIF图片不播放动画,这里屏蔽IE浏览器，IE浏览器每次都使用新的URL
            if (!( !! window.ActiveXObject || "ActiveXObject" in window)) {
                if (this.gifRandomCodes[tdId]) {
                    randomCode = this.gifRandomCodes[tdId];
                } else {
                    this.gifRandomCodes[tdId] = randomCode;
                }
            }
        	
        	//运行状态
        	if(name == '运行状态'){
        		//运行
        		if(value == '1'){
        			
        		}
        		
        		//停止
        		else if(value == '0'){
        			 if (e.attr('class') === oClass) {
                         return;
                     }
        			 e.attr('class', oClass);
        			 
        			 if (statusImage == '00') {
                         //Debug.log('00扶梯停止状态存在，返回!' + tdId + '状态');
                         return;
                     }
                     eImage.attr('src', '');
                     eImage.attr({
                     	'data-status': '00',
                         'src': '/sys/resource/base/skin/default/images/escalator-stop.gif?radom=' + randomCode
                     });
        		}
        		
        		//无意义
        		else{
        			
        		}
        		
        		return;
        	}
        	
        	//扶梯上行
        	if(name == '扶梯上行'){
        		//上行
        		if(value == '1'){
        			if (e.hasClass('icon-direction-up')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-direction-up');
                    
                    if (statusImage == '10') {
                        //Debug.log('10扶梯上行状态存在，返回!' + tdId + '状态');
                        return;
                    }
                    eImage.attr('src', '');
                    eImage.attr({
                    	'data-status': '10',
                        'src': '/sys/resource/base/skin/default/images/escalator-up.gif?radom=' + randomCode
                    });
        		}
        		
        		else{
        			
        		}
        		
        		return;
        	}

        	//扶梯下行
        	if(name == '扶梯下行'){
        		//下行
        		if(value == '1'){
        			if (e.hasClass('icon-direction-down')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-direction-down');
                    
                    if (statusImage == '01') {
                        //Debug.log('01扶梯下行状态存在，返回!' + tdId + '状态');
                        return;
                    }
                    eImage.attr('src', '');
                    eImage.attr({
                    	'data-status': '01',
                        'src': '/sys/resource/base/skin/default/images/escalator-down.gif?radom=' + randomCode
                    });
        		}
        		
        		else{
        			
        		}
        		
        		return;
        	}
        },
 
        /* 设置开关门状态样式 */
        setDoorStatus: function(value, tdId) {
            if (!(tdId in this.DOMS)) {
                return;
            }

            var e = this.DOMS[tdId].image;
            var status = e.attr('data-status');
            var randomCode = Common.randomCode(3, 10);
            
            //IE9,10,11针对缓存的GIF图片不播放动画,这里屏蔽IE浏览器，IE浏览器每次都使用新的URL
            if (!( !! window.ActiveXObject || "ActiveXObject" in window)) {
                if (this.gifRandomCodes[tdId]) {
                    randomCode = this.gifRandomCodes[tdId];
                } else {
                    this.gifRandomCodes[tdId] = randomCode;
                }
            }

            //关门
            if (value == '00' || value == '10') {
                if (status == '00') {
                    //Debug.log('00关门状态已存在，返回!' + tdId + '状态');
                    return;
                }
                e.attr('src', '');
                e.attr({
                	'data-status': '00',
                    'src': '/sys/resource/base/skin/default/images/elevator-closing.gif?radom=' + randomCode
                });
                //Debug.log('00关门状态已修改------------' + tdId + '状态');
                return;
            }
            //开门
            if (value == '11' || value == '01') {
                if (status == '11') {
                    //Debug.log('11开门状态已存在，返回!' + tdId + '状态');
                    return;
                }
                e.attr('src', '');
                e.attr({
                	'data-status': '11',
                    'src': '/sys/resource/base/skin/default/images/elevator-opening.gif?radom=' + randomCode
                });
                //Debug.log('11开门状态已修改------------' + tdId + '状态');
                return;
            }
            /*
            //关门中...
            if (value == '10') {
            	if(status == '10'){
            		Debug.log('10关门中...状态已存在，返回!' + tdId+'状态');
            		return;
            	}
            	e.attr({
            		'src': '/sys/resource/base/skin/default/images/elevator-closing.gif?radom=' + randomCode,
            		'data-status': '10'
            	});
            	Debug.log('10关门中...状态已修改------------' + tdId+'状态');
            	return;
            }
            //开门中...
            if (value == '01') {
            	if(status == '01'){
            		Debug.log('01开门中...状态已存在，返回!' + tdId+'状态');
            		return;
            	}
            	e.attr({
            		'src': '/sys/resource/base/skin/default/images/elevator-opening.gif?radom=' + randomCode,
            		'data-status': '01'
            	});
            	Debug.log('01开门中...状态已修改------------' + tdId+'状态');
            	return;
            }
            */
        },

        /* 设置检修 */
        setJianxiu: function(o, tdId) {
            if (!(tdId in this.DOMS)) {
                return;
            }

            var e = this.DOMS[tdId].jianxiu,
                value = o.escapeValue;

            if (value == 1) {
                if (e.hasClass('icon-elev-jianxu-active')) {
                    return;
                }
                e.attr('title', Lang.stateOfRepair);
                e.addClass('icon-elev-jianxu-active');
            } else {
                if (!e.hasClass('icon-elev-jianxu-active')) {
                    return;
                }
                e.removeAttr('title');
                e.attr('class', e.attr('data-class'));
            }
        },

        /* 设置串口通信 */
        setChuankoutongxin: function(o, tdId) {
            if (!(tdId in this.DOMS)) {
                return;
            }

            var e = this.DOMS[tdId].chuankoutongxin,
                value = o.escapeValue;

            if (value == 1) {
                if (e.hasClass('icon-elev-chuankoutongxin-active')) {
                    return;
                }
                e.attr('title', Lang.chuanKouTongXinError);
                e.addClass('icon-elev-chuankoutongxin-active');
            } else {
                if (!e.hasClass('icon-elev-chuankoutongxin-active')) {
                    return;
                }
                e.removeAttr('title');
                e.attr('class', e.attr('data-class'));
            }
        },

        /* 设置网络类型 */
        setInternetType: function(o, tdIds) {
        	if(typeof tdIds === 'string'){
        		tdIds = [tdIds];
        	}
        	
        	var _this = this;
        	$.each(tdIds, function(i, tdId){
        		if (!(tdId in _this.DOMS)) {
                    return true;
                }
        		var e = _this.DOMS[tdId].internetType;
                var oValue = e.text();
                var value = o.value;

                if (oValue === value) {
                    return;
                }

                _this.deviceInfos[tdId].internetType = value;
                
                var eValue = o.escapeValue;
                if (eValue == 4) {
                    value = '<span style="font-size:7px">' + value + '</span>';
                }
                e.html(value);	      		
        	});
        },

        /* 设置信号强度 */
        setSignalStrength: function(o, tdIds) {
        	if(typeof tdIds === 'string'){
        		tdIds = [tdIds];
        	}
        	
        	var _this = this;
        	$.each(tdIds, function(i, tdId){
        		if (!(tdId in _this.DOMS)) {
                    return;
                }

                var e = _this.DOMS[tdId].signalStrength;
                var value = o.escapeValue;
                var oClass = e.attr('[data-class]');
                var internetType = _this.deviceInfos[tdId] ? _this.deviceInfos[tdId].internetType : 0;

                //3：wifi
                if (internetType == 3) {
                    var v = Math.round((value + 94) / 94 * 100);
                    var gridNum = 4,
                        fullNum = 100;

                    if (v <= 0) {
                    	return;
                        if (e.hasClass('icon-signal-wifi0')) {
                            return;
                        }
                        e.attr('class', oClass).addClass('icon-signal-wifi0');
                    } else if (v <= (fullNum / gridNum) * 1) {
                        if (e.hasClass('icon-signal-wifi1')) {
                            return;
                        }
                        e.attr('class', oClass).addClass('icon-signal-wifi1');
                    } else if ((v <= (fullNum / gridNum) * 2) && (v > (fullNum / gridNum) * 1)) {
                        if (e.hasClass('icon-signal-wifi2')) {
                            return;
                        }
                        e.attr('class', oClass).addClass('icon-signal-wifi2');
                    } else if ((v <= (fullNum / gridNum) * 3) && (v > (fullNum / gridNum) * 2)) {
                        if (e.hasClass('icon-signal-wifi3')) {
                            return;
                        }
                        e.attr('class', oClass).addClass('icon-signal-wifi3');
                    } else if ((v <= (fullNum / gridNum) * 4) && (v > (fullNum / gridNum) * 3)) {
                        if (e.hasClass('icon-signal-wifi4')) {
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
                	return;
                    if (e.hasClass('icon-signal-mobile-network0')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-signal-mobile-network0');
                } else if (v <= (fullNum / gridNum) * 1) {
                    if (e.hasClass('icon-signal-mobile-network1')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-signal-mobile-network1');
                } else if ((v <= (fullNum / gridNum) * 2) && (v > (fullNum / gridNum) * 1)) {
                    if (e.hasClass('icon-signal-mobile-network2')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-signal-mobile-network2');
                } else if ((v <= (fullNum / gridNum) * 3) && (v > (fullNum / gridNum) * 2)) {
                    if (e.hasClass('icon-signal-mobile-network3')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-signal-mobile-network3');
                } else if ((v <= (fullNum / gridNum) * 4) && (v > (fullNum / gridNum) * 3)) {
                    if (e.hasClass('icon-signal-mobile-network4')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-signal-mobile-network4');
                } else if ((v <= (fullNum / gridNum) * 5) && (v > (fullNum / gridNum) * 4)) {
                    if (e.hasClass('icon-signal-mobile-network5')) {
                        return;
                    }
                    e.attr('class', oClass).addClass('icon-signal-mobile-network5');
                }
        	});          
        },

        //websocket请求信号强度
        querySignalLength: function() {
            var _this = this;
            $.each(
                _this.deviceInfos,
                function(key, v) {
                    //如果采集设备在线才去请求设备信号强度
                    if (v.elevatorStatus == 1) {
                        var data = {
                            "deviceSerial": v.deviceSerial,
                            "msgType": "DEVICE_DATA_TRANSFER",
                            "tdSerial": '',
                            "transferData": "",
                            "sid": loginData.getSID(),
                            "transferMsgType": 51
                        };

                        data = Common.JSONToString(data);

                        if (_this.ws && _this.ws.readyState === 1) {
                            _this.ws.send(data);
                            Debug.log('请求信号强度:' + data);
                        } else {
                            Debug.log('websocket不可用');
                        }
                    }

                }
            );
        },

        //更新设备状态
        updateDeviceStatus: function() {
            var _this = this;
            var params = {
                'elevIds': _this.elevIds.join(',')
            };
            Common.getDataByAjax(URL.UpdateElevStatus, params, function(data) {
                if(!data){
                	return;
                }
                
                var rows = data.rows;
                var tdIds = [];
                if(!rows || rows.length === 0){
                	return;
                }
                
                $.each(rows, function(i, v) {
                    //更新状态
                	var tdId = _this.getTdIdByTdList(v.tdList, _this.options.tdType);
                    var isSuccess = _this.setStatus(v.elevatorStatus, tdId);

                    //之前为离线，现在为在线的
                    if(isSuccess && v.elevatorStatus * 1 === 1){
                    	if(_this.setDeviceInfos[tdId]){
                    		_this.setDeviceInfos[tdId].elevatorStatus = v.elevatorStatus;
                    	}
                    	tdIds.push(tdId);
                    }

                    //之前在线的，现在为离线
                    if (isSuccess && v.elevatorStatus * 2 === 2) {
                        _this.setDefaultDisplayStyle(tdId);
                    }
                });
                
                if(tdIds.length > 0 && _this.ws && _this.ws.readyState === 1){
                	Debug.log('请求到之前为离线的设备，重发...');               
                	_this.sendMessageToAPP(tdIds);	                	
                }
                
                //请求信号强度
                _this.querySignalLength();
            });
        },

        //重设数据
        resetData: function(pageIndex) {
            if (pageIndex == 1) {
                this.queryNumber = 0;
            }
            this.elevIds = [];
            this.deviceInfos = {};
            this.isLeavePage = true;
            
            this.clearData();
        },
        
        //清除数据
        clearData: function(wsURL) {
            //关闭单个rdtsWebsokect通道
            if (wsURL) {
                var rdtsWS = this.rdtsWS[wsURL];
                if (rdtsWS) {
                    rdtsWS.close();
                }
                rdtsWS = null;
                this.rdtsTD[wsURL] = null;
                this.appData[wsURL] = null;
                return;
            }

            //关闭所有rdtsWebsokect
            $.each(
                this.rdtsWS,
                function(i, rdtsWS) {
                    if (rdtsWS) {
                        rdtsWS.close();
                    }
                }
            );

            //清除所有rdtsTimeIds
            $.each(
                this.rdtsTimeIds,
                function(i, v) {
                    clearTimeout(v);
                }
            );

            //清空装载对象
            this.rdtsWS = {};
            this.rdtsTD = {};
            this.appData = {};
            this.redressStatus = {};
            this.DOMS = {};
        }
    }

    window.RealtimeDataMonitor = RealtimeDataMonitor;
})();